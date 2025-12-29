const path = require("path");
const fs = require("fs");
const { spawn, execFile, spawnSync } = require("child_process");
const { app, BrowserWindow, Menu, ipcMain, dialog, globalShortcut, safeStorage } = require("electron");

// Caminho do win-window que funciona em dev e prod
const isDev = !app.isPackaged;
let winWindow;

if (isDev) {
  // Em desenvolvimento, usa o caminho relativo normal
  winWindow = require("../native/win-window");
} else {
  // Em produção, carrega diretamente o .node desempacotado
  const winWindowNodePath = path.join(process.resourcesPath, "app.asar.unpacked/native/win-window/build/Release/win_window.node");
  winWindow = require(winWindowNodePath);
}

const sql = require("mssql");
const mysql = require("mysql2/promise");
const pidusage = require("pidusage");

let mainWindow = null;
let splashWindow = null;

// =========================
//  Sistema de Logs em Arquivo
// =========================
function getLogsDir() {
  return path.join(app.getPath("userData"), "logs");
}

function ensureLogsDir() {
  const dir = getLogsDir();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

function getTodayLogFile() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const filename = `app-${year}-${month}-${day}.log`;
  return path.join(ensureLogsDir(), filename);
}

function writeLog(type, message) {
  try {
    const logFile = getTodayLogFile();
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    const typeLabel = type === 'sql-server' ? 'SQL Server' : 
                     type === 'mysql' ? 'MySQL' : 
                     type === 'process' ? 'Processo' : 'Sistema';
    
    // SEGURANÇA: Remove caracteres de controle que podem corromper logs
    const sanitizedMessage = String(message).replace(/[\x00-\x1F\x7F]/g, '');
    
    const logLine = `[${timestamp}] [${typeLabel}] ${sanitizedMessage}\n`;
    fs.appendFileSync(logFile, logLine, 'utf-8');
  } catch (err) {
    // Silently fail - não queremos quebrar o app por erro de log
  }
}

function cleanOldLogs() {
  try {
    const logsDir = getLogsDir();
    if (!fs.existsSync(logsDir)) return;

    const files = fs.readdirSync(logsDir);
    const now = Date.now();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;

    for (const file of files) {
      if (!file.endsWith('.log')) continue;
      
      const filePath = path.join(logsDir, file);
      const stats = fs.statSync(filePath);
      const fileAge = now - stats.mtimeMs;

      if (fileAge > thirtyDaysMs) {
        fs.unlinkSync(filePath);
      }
    }
  } catch (err) {
    // Silently fail
  }
}

// =========================
//  Métricas (CPU/RAM) & Monitoramento de Processos
// =========================
let metricsInterval = null;
let processWatchdogInterval = null;

function startMetricsMonitoring() {
  // Limpa interval anterior se existir
  if (metricsInterval) {
    clearInterval(metricsInterval);
  }

  // Atualiza métricas a cada 4 segundos
  metricsInterval = setInterval(async () => {
    if (!mainWindow || mainWindow.isDestroyed()) {
      clearInterval(metricsInterval);
      metricsInterval = null;
      return;
    }

    try {
      const metrics = await collectMetrics();
      // Verifica novamente antes de enviar (pode ter sido destruída durante collectMetrics)
      if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('metrics-update', metrics);
      }
    } catch (err) {
      // Silently fail - metrics não são críticas
    }
  }, 4000);
}

// WATCHDOG: Monitora processos a cada 2 segundos para detectar crashes que o evento 'exit' não captura
function startProcessWatchdog() {
  if (processWatchdogInterval) {
    clearInterval(processWatchdogInterval);
  }

  console.log('[Watchdog] Iniciando monitoramento de processos (verifica a cada 3s)');

  processWatchdogInterval = setInterval(async () => {
    if (!mainWindow || mainWindow.isDestroyed()) {
      clearInterval(processWatchdogInterval);
      processWatchdogInterval = null;
      return;
    }

    const processCount = running.size;
    if (processCount > 0) {
      console.log(`[Watchdog] Verificando ${processCount} processo(s)...`);
    }

    // Verifica cada processo que deveria estar rodando
    for (const [id, info] of running.entries()) {
      if (!info || !info.pid) continue;

      try {
        // Tenta obter estatísticas do processo - se falhar, o processo não existe mais
        await pidusage(info.pid);
        // Processo ainda está rodando, tudo ok
      } catch (err) {
        // Processo não existe mais! Notifica o frontend
        const wasManualStop = info?.manualStop || manualStopsInProgress.has(id);
        running.delete(id);
        
        // Limpa o stop manual pendente (se existir)
        manualStopsInProgress.delete(id);
        
        console.log(`[Watchdog] Processo ${id} (PID ${info.pid}) não está mais rodando. Manual stop: ${wasManualStop}`);
        console.log(`[Watchdog] Error:`, err.message); // Debug adicional
        
        try {
          mainWindow?.webContents?.send("process-exited", { 
            id, 
            pid: info.pid, 
            exitCode: -1, // Código especial para indicar que foi detectado pelo watchdog
            wasManualStop: wasManualStop,
            crashed: !wasManualStop,
            detectedByWatchdog: true
          });
          console.log(`[Watchdog] Evento process-exited enviado para frontend`);
        } catch (sendErr) {
          console.error(`[Watchdog] Erro ao enviar evento:`, sendErr);
        }
      }
    }
  }, 3000); // Verifica a cada 3 segundos
}

async function collectMetrics() {
  const pids = [];
  const processNames = {};

  // Coleta PIDs dos processos em execução
  for (const [id, info] of running.entries()) {
    if (info && info.pid) {
      pids.push(info.pid);
      processNames[info.pid] = id;
    }
  }

  if (pids.length === 0) {
    return {
      totalCpu: 0,
      totalMemory: 0,
      processes: []
    };
  }

  try {
    const stats = await pidusage(pids);
    
    let totalCpu = 0;
    let totalMemory = 0;
    const processes = [];

    for (const pid of pids) {
      if (stats[pid]) {
        const cpu = stats[pid].cpu || 0;
        const memory = stats[pid].memory || 0;
        
        totalCpu += cpu;
        totalMemory += memory;

        processes.push({
          id: processNames[pid],
          pid: pid,
          cpu: cpu,
          memory: memory
        });
      }
    }

    return {
      totalCpu: Math.round(totalCpu * 10) / 10, // Arredonda para 1 casa decimal
      totalMemory: totalMemory,
      processes: processes
    };
  } catch (err) {
    return {
      totalCpu: 0,
      totalMemory: 0,
      processes: []
    };
  }
}

// =========================
//  Persistência (lista)
// =========================
function dataFile() {
  return path.join(app.getPath("userData"), "processes.json");
}

// =========================
//  Persistência (SQL Config)
// =========================
function sqlConfigFile() {
  return path.join(app.getPath("userData"), "sql-config.json");
}

function readSqlConfig() {
  const file = sqlConfigFile();
  try {
    if (!fs.existsSync(file)) return null;
    const raw = fs.readFileSync(file, "utf-8");
    const config = JSON.parse(raw);
    
    // SEGURANÇA: Descriptografa senha se estiver criptografada
    if (config && config.password && typeof config.password === 'object' && config.password.encrypted) {
      try {
        if (safeStorage.isEncryptionAvailable()) {
          const encryptedBuffer = Buffer.from(config.password.data);
          config.password = safeStorage.decryptString(encryptedBuffer);
        } else {
          config.password = '';
        }
      } catch (err) {
        config.password = '';
      }
    }
    
    return config;
  } catch (err) {
    return null;
  }
}

function writeSqlConfig(config) {
  const file = sqlConfigFile();
  try {
    // SEGURANÇA: Criptografa a senha antes de salvar
    const configToSave = { ...config };
    
    if (configToSave.password && safeStorage.isEncryptionAvailable()) {
      try {
        const encryptedBuffer = safeStorage.encryptString(configToSave.password);
        configToSave.password = {
          encrypted: true,
          data: Array.from(encryptedBuffer)
        };
      } catch (err) {
        // Se falhar, não salva a senha
        delete configToSave.password;
      }
    } else if (configToSave.password) {
      delete configToSave.password;
    }
    
    fs.writeFileSync(file, JSON.stringify(configToSave, null, 2), "utf-8");
    return true;
  } catch (err) {
    return false;
  }
}

// =========================
//  SQL Server & MySQL Connections
// =========================
let sqlPool = null; // SQL Server
let mysqlConnection = null; // MySQL
let sqlConnectionLock = false; // MUTEX para prevenir race conditions
let mysqlConnectionLock = false; // MUTEX para prevenir race conditions

async function connectToSql(server, user, password, type = 'sqlserver', port = '') {
  try {
    if (type === 'mysql') {
      return await connectToMySQL(server, user, password, port);
    } else {
      return await connectToSQLServer(server, user, password, port);
    }
  } catch (err) {
    return { ok: false, error: err.message || 'Erro ao conectar' };
  }
}

// SQL Server Connection
async function connectToSQLServer(server, user, password, port = '') {
  // MUTEX: Previne race condition se múltiplas conexões simultâneas
  if (sqlConnectionLock) {
    return { ok: false, error: 'Aguarde, uma operação de conexão já está em andamento...' };
  }

  try {
    sqlConnectionLock = true;

    // Fecha conexão anterior se existir
    if (sqlPool) {
      try {
        if (sqlPool.connected) {
          await sqlPool.close();
        }
      } catch (closeErr) {
        // Ignora erros ao fechar conexão anterior
      } finally {
        sqlPool = null;
      }
    }

    const config = {
      server: server,
      user: user,
      password: password,
      database: 'master',
      options: {
        trustServerCertificate: true,
        encrypt: false,
        enableArithAbort: true,
        connectTimeout: 15000,
        requestTimeout: 15000
      }
    };

    // Se porta foi especificada, adiciona ao config
    if (port && port.trim() !== '') {
      config.port = parseInt(port);
    }

    sqlPool = await sql.connect(config);
    return { ok: true, message: 'Conectado ao SQL Server com sucesso!' };
  } catch (err) {
    
    let friendlyMessage = '';
    
    if (err.code === 'ELOGIN') {
      friendlyMessage = 'Login ou senha incorretos. Verifique suas credenciais.';
    } else if (err.code === 'ETIMEOUT') {
      friendlyMessage = 'Tempo esgotado. Verifique se o SQL Server está rodando.';
    } else if (err.code === 'ESOCKET') {
      friendlyMessage = 'Não foi possível conectar ao servidor. Verifique o nome do servidor.';
    } else if (err.code === 'ENOTFOUND' || err.originalError?.code === 'ENOTFOUND') {
      friendlyMessage = 'Servidor não encontrado. Verifique o nome (ex: localhost\\SQLEXPRESS).';
    } else if (err.message?.includes('Login failed')) {
      friendlyMessage = 'Falha no login. Usuário ou senha incorretos.';
    } else if (err.message?.includes('Cannot open database')) {
      friendlyMessage = 'Não foi possível abrir o database. Verifique as permissões.';
    } else {
      friendlyMessage = 'Erro ao conectar: ' + (err.message || 'Erro desconhecido');
    }
    
    return { ok: false, error: friendlyMessage };
  } finally {
    sqlConnectionLock = false; // Libera o lock
  }
}

// MySQL Connection
async function connectToMySQL(host, user, password, port = '3306') {
  // MUTEX: Previne race condition se múltiplas conexões simultâneas
  if (mysqlConnectionLock) {
    return { ok: false, error: 'Aguarde, uma operação de conexão já está em andamento...' };
  }

  try {
    mysqlConnectionLock = true;

    // Fecha conexão anterior se existir
    if (mysqlConnection) {
      try {
        await mysqlConnection.end();
      } catch (closeErr) {
        // Ignora erros ao fechar conexão anterior
      } finally {
        mysqlConnection = null;
      }
    }

    mysqlConnection = await mysql.createConnection({
      host: host,
      user: user,
      password: password,
      port: parseInt(port) || 3306,
      connectTimeout: 15000
    });

    return { ok: true, message: 'Conectado ao MySQL com sucesso!' };
  } catch (err) {
    
    let friendlyMessage = '';
    
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      friendlyMessage = 'Login ou senha incorretos. Verifique suas credenciais.';
    } else if (err.code === 'ECONNREFUSED') {
      friendlyMessage = 'Conexão recusada. Verifique se o MySQL está rodando na porta ' + (port || '3306') + '.';
    } else if (err.code === 'ETIMEDOUT') {
      friendlyMessage = 'Tempo esgotado. Verifique se o MySQL está acessível.';
    } else if (err.code === 'ENOTFOUND') {
      friendlyMessage = 'Host não encontrado. Verifique o endereço (ex: localhost, 127.0.0.1).';
    } else {
      friendlyMessage = 'Erro ao conectar: ' + (err.message || 'Erro desconhecido');
    }
    
    return { ok: false, error: friendlyMessage };
  } finally {
    mysqlConnectionLock = false; // Libera o lock
  }
}

// Função para listar databases disponíveis
async function listDatabases(type = 'sqlserver') {
  try {
    if (type === 'mysql') {
      if (!mysqlConnection) {
        return { ok: false, error: 'Não conectado ao MySQL' };
      }

      const [rows] = await mysqlConnection.query(
        "SHOW DATABASES WHERE `Database` NOT IN ('information_schema', 'mysql', 'performance_schema', 'sys')"
      );

      const databases = rows.map(row => row.Database);
      return { ok: true, databases };
    } else {
      // SQL Server
      if (!sqlPool || !sqlPool.connected) {
        return { ok: false, error: 'Não conectado ao SQL Server' };
      }

      const result = await sqlPool.request().query(
        "SELECT name FROM sys.databases WHERE database_id > 4 ORDER BY name"
      );

      const databases = result.recordset.map(row => row.name);
      return { ok: true, databases };
    }
  } catch (err) {
    return { ok: false, error: err.message || 'Erro ao listar databases' };
  }
}

async function executeSqlBackup(backupPath, database = 'MuOnline', type = 'sqlserver') {
  try {
    // VALIDAÇÃO: Apenas tipos permitidos
    if (!['sqlserver', 'mysql'].includes(type)) {
      return { ok: false, error: 'Tipo de banco de dados inválido' };
    }

    if (type === 'mysql') {
      return await executeMySQLBackup(backupPath, database);
    } else {
      return await executeSQLServerBackup(backupPath, database);
    }
  } catch (err) {
    return { ok: false, error: err.message || 'Erro ao realizar backup' };
  }
}

// SQL Server Backup
async function executeSQLServerBackup(backupPath, database) {
  try {
    if (!sqlPool || !sqlPool.connected) {
      return { ok: false, error: 'Não conectado ao SQL Server' };
    }

    // SANITIZAÇÃO: Permite apenas caracteres seguros (letras, números, _, -)
    const safeDatabaseName = database.replace(/[^a-zA-Z0-9_-]/g, '');
    if (!safeDatabaseName || safeDatabaseName.length === 0) {
      return { ok: false, error: 'Nome de database contém caracteres inválidos' };
    }

    // VALIDAÇÃO: Previne Path Traversal
    const normalizedPath = path.resolve(path.normalize(backupPath));
    if (!fs.existsSync(normalizedPath)) {
      return { ok: false, error: `Pasta de backup não existe: ${normalizedPath}` };
    }

    // VALIDAÇÃO: Verifica se o database existe
    const checkDb = await sqlPool.request()
      .input('dbname', sql.VarChar, safeDatabaseName)
      .query(`SELECT name FROM sys.databases WHERE name = @dbname`);
    
    if (checkDb.recordset.length === 0) {
      return { ok: false, error: `Database '${safeDatabaseName}' não encontrado no servidor` };
    }

    // Gera nome do arquivo com timestamp LOCAL (formato brasileiro: DD_MM_AAAA)
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timestamp = `${day}_${month}_${year}_${hours}${minutes}${seconds}`;
    const fileName = `${safeDatabaseName}_backup_${timestamp}.bak`;
    
    // SEGURANÇA: Garante que o arquivo está dentro do diretório permitido
    const fullPath = path.resolve(normalizedPath, fileName);
    if (!fullPath.startsWith(normalizedPath)) {
      return { ok: false, error: 'Caminho de backup inválido (tentativa de path traversal detectada)' };
    }

    await sqlPool.request()
      .input('backupPath', sql.NVarChar(4000), fullPath)
      .query(`BACKUP DATABASE [${safeDatabaseName}] TO DISK = @backupPath WITH NOFORMAT, NOINIT, NAME = N'${safeDatabaseName}-Full Database Backup', SKIP, NOREWIND, NOUNLOAD, STATS = 10`);

    return { 
      ok: true, 
      message: 'Backup realizado com sucesso!',
      filePath: fullPath 
    };
  } catch (err) {
    
    let errorMsg = '';
    
    if (err.number === 3201) {
      errorMsg = 'Sem permissão para criar o arquivo. Escolha outra pasta (ex: C:\\Backups).';
    } else if (err.number === 3241) {
      errorMsg = 'Erro ao gravar o arquivo. Verifique o espaço em disco.';
    } else if (err.number === 945) {
      errorMsg = `Database '${database}' não existe ou está inacessível.`;
    } else if (err.number === 3013) {
      errorMsg = 'Backup foi cancelado ou falhou. Verifique o SQL Server.';
    } else if (err.number === 3271) {
      errorMsg = 'Erro de E/S ao gravar o backup. Verifique a pasta e permissões.';
    } else if (err.message?.includes('permission')) {
      errorMsg = 'Sem permissão. Escolha uma pasta como C:\\Backups ou C:\\SQLBackups.';
    } else if (err.message?.includes('denied')) {
      errorMsg = 'Acesso negado à pasta. Use uma pasta no disco C:\\ ou outra com permissão.';
    } else {
      errorMsg = err.message || 'Erro ao realizar backup';
    }
    
    return { ok: false, error: errorMsg };
  }
}

// MySQL Backup (usando mysqldump)
async function executeMySQLBackup(backupPath, database) {
  try {
    if (!mysqlConnection) {
      return { ok: false, error: 'Não conectado ao MySQL' };
    }

    // SANITIZAÇÃO: Permite apenas caracteres seguros (letras, números, _, -)
    const safeDatabaseName = database.replace(/[^a-zA-Z0-9_-]/g, '');
    if (!safeDatabaseName || safeDatabaseName.length === 0) {
      return { ok: false, error: 'Nome de database contém caracteres inválidos' };
    }

    // VALIDAÇÃO: Previne Path Traversal
    const normalizedPath = path.resolve(path.normalize(backupPath));
    if (!fs.existsSync(normalizedPath)) {
      return { ok: false, error: `Pasta de backup não existe: ${normalizedPath}` };
    }

    // VALIDAÇÃO: Verifica se o database existe
    const [databases] = await mysqlConnection.query('SHOW DATABASES LIKE ?', [safeDatabaseName]);
    
    if (databases.length === 0) {
      return { ok: false, error: `Database '${safeDatabaseName}' não encontrado no servidor` };
    }

    // Gera nome do arquivo com timestamp (formato brasileiro)
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timestamp = `${day}_${month}_${year}_${hours}${minutes}${seconds}`;
    const fileName = `${safeDatabaseName}_backup_${timestamp}.sql`;
    
    // SEGURANÇA: Garante que o arquivo está dentro do diretório permitido
    const fullPath = path.resolve(normalizedPath, fileName);
    if (!fullPath.startsWith(normalizedPath)) {
      return { ok: false, error: 'Caminho de backup inválido (tentativa de path traversal detectada)' };
    }

    // SEGURANÇA: Usa prepared statements para identifiers
    const [tables] = await mysqlConnection.query('SHOW TABLES FROM ??', [safeDatabaseName]);
    
    let dumpContent = `-- MySQL Dump\n-- Database: ${safeDatabaseName}\n-- Date: ${now.toLocaleString('pt-BR')}\n\n`;
    dumpContent += `SET FOREIGN_KEY_CHECKS=0;\n\n`;

    // Faz dump de cada tabela
    for (const tableRow of tables) {
      const tableName = Object.values(tableRow)[0];
      // SANITIZAÇÃO: Remove caracteres perigosos do nome da tabela
      const safeTableName = tableName.replace(/[^a-zA-Z0-9_-]/g, '');
      
      // CREATE TABLE
      const [createTable] = await mysqlConnection.query('SHOW CREATE TABLE ??.??', [safeDatabaseName, safeTableName]);
      dumpContent += `-- Table: ${safeTableName}\n`;
      dumpContent += `DROP TABLE IF EXISTS \`${safeTableName}\`;\n`;
      dumpContent += createTable[0]['Create Table'] + ';\n\n';
      
      // INSERT DATA
      const [rows] = await mysqlConnection.query('SELECT * FROM ??.??', [safeDatabaseName, safeTableName]);
      if (rows.length > 0) {
        dumpContent += `-- Data for table: ${safeTableName}\n`;
        for (const row of rows) {
          const values = Object.values(row).map(val => {
            if (val === null) return 'NULL';
            // SEGURANÇA: Usa função nativa de escape do mysql2
            if (typeof val === 'string') {
              // Escape manual mais robusto para caracteres especiais
              return `'${val.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')}'`;
            }
            if (val instanceof Date) return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
            return val;
          }).join(', ');
          dumpContent += `INSERT INTO \`${safeTableName}\` VALUES (${values});\n`;
        }
        dumpContent += '\n';
      }
    }

    dumpContent += `SET FOREIGN_KEY_CHECKS=1;\n`;

    // Salva arquivo
    fs.writeFileSync(fullPath, dumpContent, 'utf-8');

    return { 
      ok: true, 
      message: 'Backup realizado com sucesso!',
      filePath: fullPath 
    };
  } catch (err) {
    
    let errorMsg = '';
    
    if (err.code === 'EACCES' || err.code === 'EPERM') {
      errorMsg = 'Sem permissão para criar o arquivo. Escolha outra pasta (ex: C:\\Backups).';
    } else if (err.code === 'ENOSPC') {
      errorMsg = 'Espaço em disco insuficiente.';
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      errorMsg = `Database '${database}' não existe.`;
    } else {
      errorMsg = err.message || 'Erro ao realizar backup';
    }
    
    return { ok: false, error: errorMsg };
  }
}

// =========================
//  Persistência (delay XML)
// =========================
function delaysFile() {
  return path.join(app.getPath("userData"), "process-delays.xml");
}

function escapeXml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normName(s) {
  return String(s ?? "").trim().toLowerCase();
}

function ensureDelaysFile(processList) {
  const file = delaysFile();
  try {
    if (fs.existsSync(file)) return;

    const defaultDelayMs = 3000;

    const items = Array.isArray(processList) ? processList : [];
    const lines = [];
    const seen = new Set();

    for (const p of items) {
      const n1 = normName(p?.name);
      const n2 = normName(path.basename(p?.path || ""));
      const name = (n2 && n2 !== "null" && n2 !== "undefined") ? n2 : n1;
      if (!name) continue;
      if (seen.has(name)) continue;
      seen.add(name);

      const delay = Number(p?.delayMs ?? defaultDelayMs);
      lines.push(`    <process name="${escapeXml(name)}" delayMs="${Number.isFinite(delay) ? delay : defaultDelayMs}" />`);
    }

    const xml = [
      `<?xml version="1.0" encoding="utf-8"?>`,
      `<config>`,
      `  <defaultDelayMs>${defaultDelayMs}</defaultDelayMs>`,
      `  <processes>`,
      ...(lines.length ? lines : [`    <!-- Exemplo: <process name="GameServer.exe" delayMs="3000" /> -->`]),
      `  </processes>`,
      `</config>`,
      ``,
    ].join("\n");

    fs.writeFileSync(file, xml, "utf-8");
  } catch {
    // ignore
  }
}

function readDelaysXml() {
  const file = delaysFile();
  const out = { defaultDelayMs: 3000, map: new Map() };

  try {
    if (!fs.existsSync(file)) return out;
    const xml = fs.readFileSync(file, "utf-8");

    const m = xml.match(/<defaultDelayMs>\s*(\d+)\s*<\/defaultDelayMs>/i);
    if (m) out.defaultDelayMs = Number(m[1]) || out.defaultDelayMs;

    const tags = xml.match(/<process\b[^>]*\/?>(?:<\/process>)?/gi) || [];
    for (const t of tags) {
      const nameM = t.match(/name\s*=\s*"([^"]+)"/i);
      const delayM = t.match(/delayMs\s*=\s*"([^"]+)"/i);
      if (!nameM) continue;
      const name = normName(nameM[1]);
      const delay = Number(delayM?.[1] ?? "");
      if (!name) continue;
      if (Number.isFinite(delay) && delay >= 0) out.map.set(name, delay);
    }
  } catch {
    // ignore
  }
  return out;
}

function applyDelayOverrides(list) {
  ensureDelaysFile(list);
  const cfg = readDelaysXml();

  return (Array.isArray(list) ? list : []).map((p) => {
    const candidates = [
      normName(p?.name),
      normName(path.basename(p?.path || "")),
    ].filter(Boolean);

    let delay = undefined;
    for (const c of candidates) {
      if (cfg.map.has(c)) {
        delay = cfg.map.get(c);
        break;
      }
    }

    const finalDelay = Number(delay ?? p?.delayMs ?? cfg.defaultDelayMs);
    return { ...p, delayMs: Number.isFinite(finalDelay) ? finalDelay : cfg.defaultDelayMs };
  });
}



function readJsonSafe(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeJsonSafe(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// =========================
//  Runtime (processos)
// =========================
/** @type {Map<string, { pid: number, path: string, child: import("child_process").ChildProcess }>} */
const running = new Map();

// Map para rastrear stops/restarts manuais (evita detecção falsa de crash)
// Key: processId, Value: timestamp do stop manual
const manualStopsInProgress = new Map();

// =========================
//  WinAPI: show/hide window by PID (native addon)
// =========================
async function setWindowVisibleByPid(pid, visible) {
  try {
    const ok = await winWindow.setWindowVisibleByPid(Number(pid), Boolean(visible), 3000);
    return Boolean(ok);
  } catch (e) {
    return false;
  }
}


function createSplashWindow() {
  // Janela de carregamento (splash)
  splashWindow = new BrowserWindow({
    width: 720,
    height: 320, // Aumentado de 260 para 320 para não cortar o conteúdo
    resizable: false,
    movable: true,
    minimizable: false,
    maximizable: false,
    skipTaskbar: true,
    closable: true,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    show: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  splashWindow.loadFile(path.join(__dirname, "splash.html"));

  splashWindow.once("ready-to-show", () => {
    try { splashWindow.show(); } catch {}
  });

  splashWindow.on("closed", () => {
    splashWindow = null;
  });
}

function createWindow() {
  createSplashWindow();

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 740,
    minWidth: 1200,
    minHeight: 740,
    title: "Server Manager",
    show: false,
    frame: false, // Remove a barra de título padrão do Windows
    transparent: true, // REATIVADO - Remove contorno do Windows
    backgroundColor: '#00000000', // Totalmente transparente
    hasShadow: true, // Mantém sombra da janela
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  Menu.setApplicationMenu(null);
  
  // DEV: carrega Vite | PROD: carrega build
  const isDev = process.env.NODE_ENV !== 'production' && !app.isPackaged;
  
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173/");
    // Abre DevTools em desenvolvimento
    mainWindow.webContents.openDevTools();
    
    // Atalho para abrir/fechar DevTools: Ctrl+Shift+D
    globalShortcut.register('CommandOrControl+Shift+D', () => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.toggleDevTools();
      }
    });
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  // Mostra a janela principal quando estiver pronta e fecha o splash
  const closeSplash = () => {
    if (splashWindow && !splashWindow.isDestroyed()) {
      try { splashWindow.destroy(); } catch {}
    }
    splashWindow = null;
  };

// Espera 1 ciclo completo da animação do splash antes de exibir o app
const SPLASH_ANIMATION_MS = 4000; // 4 segundos

let isMainReady = false;
let isSplashCycleDone = false;
let didShowMain = false;

let splashSafety = null;

const showMainAndCloseSplash = () => {
  if (didShowMain) return;
  didShowMain = true;

  if (splashSafety) {
    clearTimeout(splashSafety);
    splashSafety = null;
  }

  try { mainWindow.maximize(); } catch {}
  try { mainWindow.show(); } catch {}
  closeSplash();
};

const maybeShowMain = () => {
  if (didShowMain) return;
  if (isMainReady && isSplashCycleDone) showMainAndCloseSplash();
};

// Timer do ciclo da animação
setTimeout(() => {
  isSplashCycleDone = true;
  maybeShowMain();
}, SPLASH_ANIMATION_MS);

// Safety: se algo travar no carregamento, não deixa splash infinito
splashSafety = setTimeout(() => {
  isMainReady = true;
  isSplashCycleDone = true;
  showMainAndCloseSplash();
}, 20000);

// Main pronto (mas só mostra quando terminar o ciclo do splash)
mainWindow.once("ready-to-show", () => {
  isMainReady = true;
  maybeShowMain();
  
  // Inicia monitoramento de métricas quando a janela estiver pronta
  startMetricsMonitoring();
  
  // Inicia watchdog de processos para detectar crashes não capturados pelo evento 'exit'
  startProcessWatchdog();
});

mainWindow.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
    isMainReady = true;
    maybeShowMain();
  });


  mainWindow.on("closed", () => {
    mainWindow = null;
    
    // Para o monitoramento de métricas quando a janela é fechada
    if (metricsInterval) {
      clearInterval(metricsInterval);
      metricsInterval = null;
    }
    
    // Para o watchdog de processos quando a janela é fechada
    if (processWatchdogInterval) {
      clearInterval(processWatchdogInterval);
      processWatchdogInterval = null;
    }
  });
}

// =========================
//  IPC: lista (persistência)
// =========================
ipcMain.handle("pick-executables", async () => {
  const res = await dialog.showOpenDialog({
    title: "Selecione executáveis (.exe)",
    properties: ["openFile", "multiSelections"],
    filters: [{ name: "Executáveis", extensions: ["exe"] }],
  });
  if (res.canceled) return [];
  return res.filePaths || [];
});

// Selecionar pasta de backup SQL
ipcMain.handle("select-backup-folder", async () => {
  const res = await dialog.showOpenDialog({
    title: "Selecione a pasta para backups do SQL Server",
    properties: ["openDirectory"],
  });
  if (res.canceled) return null;
  return res.filePaths?.[0] || null;
});

// SQL Server - Salvar configurações
ipcMain.handle("sql-save-config", async (_evt, config) => {
  return writeSqlConfig(config);
});

// SQL Server - Carregar configurações
ipcMain.handle("sql-load-config", async () => {
  return readSqlConfig();
});

// SQL Server - Conectar
ipcMain.handle("sql-connect", async (_evt, { type, server, user, password, port }) => {
  return await connectToSql(server, user, password, type, port);
});

// SQL Server - Listar databases disponíveis
ipcMain.handle("sql-list-databases", async (_evt, { type }) => {
  return await listDatabases(type);
});

// SQL Server - Fazer backup
ipcMain.handle("sql-backup", async (_evt, { backupPath, database, type }) => {
  return await executeSqlBackup(backupPath, database, type);
});

// Métricas - Obter métricas atuais sob demanda
ipcMain.handle("get-metrics", async () => {
  return await collectMetrics();
});

// Logs - Escrever log em arquivo
ipcMain.handle("write-log", async (_evt, { type, message }) => {
  writeLog(type, message);
  return true;
});

ipcMain.handle("load-processes", async () => {
  const file = dataFile();
  const data = readJsonSafe(file);

  // null = arquivo não existe (nunca foi salvo)
  if (data === null) return null;

  // se existe mas está inválido, devolve lista vazia
  const list = Array.isArray(data) ? data : [];

  // aplica overrides de delay via XML (editável pelo usuário)
  return applyDelayOverrides(list);
});

ipcMain.handle("save-processes", async (_evt, list) => {
  const file = dataFile();
  const safe = Array.isArray(list) ? list : [];
  writeJsonSafe(file, safe);
  return true;
});

// =========================
//  IPC: start/stop/restart
// =========================
ipcMain.handle("process-start", async (_evt, payload) => {
  const { id, path: exePath, args = "", hidden = true } = payload || {};
  
  // VALIDAÇÕES DE SEGURANÇA
  if (!id || !exePath) return { ok: false, error: "id/path obrigatórios" };
  
  // Valida se é um executável Windows
  if (!exePath.toLowerCase().endsWith('.exe')) {
    return { ok: false, error: "Apenas arquivos .exe são permitidos" };
  }
  
  // Valida se o arquivo existe
  if (!fs.existsSync(exePath)) {
    return { ok: false, error: "Executável não encontrado" };
  }
  
  // Sanitiza argumentos (previne command injection)
  const safeArgs = String(args || "").slice(0, 500); // Max 500 chars
  const argsList = safeArgs.trim() ? safeArgs.split(' ').filter(Boolean) : [];
  
  if (running.has(id)) return { ok: true, pid: running.get(id).pid, already: true };

  try {
    const child = spawn(exePath, argsList, {
      cwd: path.dirname(exePath),
      windowsHide: false, // IMPORTANT: deixa criar a janela, depois escondemos (se hidden=true)
      detached: false,
      stdio: "ignore",
    });

    if (!child.pid) return { ok: false, error: "Falha ao iniciar processo" };

    running.set(id, { 
      pid: child.pid, 
      path: exePath, 
      child,
      manualStop: false // Flag para indicar se foi parado manualmente
    });

    child.on("exit", (code) => {
      const info = running.get(id);
      const wasManualStop = info?.manualStop || manualStopsInProgress.has(id);
      running.delete(id);
      
      // Limpa o stop manual pendente (se existir)
      manualStopsInProgress.delete(id);
      
      console.log(`[Exit Event] Processo ${id} (PID ${child.pid}) encerrou. Code: ${code}, Manual: ${wasManualStop}`);
      
      // Se não foi stop manual, SEMPRE é crash (independente do exit code)
      // Quando mata pelo Gerenciador de Tarefas, pode vir code 0 ou null
      const crashed = !wasManualStop;
      
      try {
        mainWindow?.webContents?.send("process-exited", { 
          id, 
          pid: child.pid, 
          exitCode: code,
          wasManualStop: wasManualStop,
          crashed: crashed,
          detectedByWatchdog: false
        });
      } catch {}
    });
// inicia oculto (estilo SSU)
    if (hidden) {
      // dá um tempinho pra janela existir
      setTimeout(() => {
        setWindowVisibleByPid(child.pid, false);
      }, 250);
    }

    return { ok: true, pid: child.pid };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
});

ipcMain.handle("process-stop", async (_evt, payload) => {
  const { id } = payload || {};
  if (!id) return { ok: false, error: "id obrigatório" };

  const info = running.get(id);
  if (!info?.pid) return { ok: true, already: true };

  // Marca como parada manual antes de matar o processo
  if (info) {
    info.manualStop = true;
  }
  
  // Adiciona no Map de stops manuais (backup caso o info seja deletado antes do exit)
  manualStopsInProgress.set(id, Date.now());

  // taskkill é mais confiável (mata árvore)
  return new Promise((resolve) => {
    execFile("taskkill", ["/PID", String(info.pid), "/T", "/F"], { windowsHide: true }, () => {
      // NÃO deletar aqui! Deixa o evento 'exit' fazer isso
      resolve({ ok: true });
    });
  });
});

ipcMain.handle("process-restart", async (_evt, payload) => {
  const { id, hidden = true } = payload || {};
  if (!id) return { ok: false, error: "id obrigatório" };

  const info = running.get(id);
  const exePath = info?.path;
  if (!exePath) return { ok: false, error: "processo não está rodando (sem path em memória)" };

  // Marca como parada manual antes de matar
  if (info) {
    info.manualStop = true;
  }
  
  // IMPORTANTE: Adiciona no Map de stops manuais para garantir que o evento exit saiba que foi manual
  manualStopsInProgress.set(id, Date.now());

  // para (mata a árvore)
  await new Promise((resolve) => {
    execFile("taskkill", ["/PID", String(info.pid), "/T", "/F"], { windowsHide: true }, () => resolve());
  });
  
  // Aguarda um pouco para o evento exit processar
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Remove da memória (o evento exit já foi processado)
  running.delete(id);

  // inicia novamente
  const child = spawn(exePath, [], {
    cwd: path.dirname(exePath),
    windowsHide: false,
    detached: false,
    stdio: "ignore",
  });

  if (!child.pid) {
    // Remove do Map de stops manuais se falhar ao iniciar
    manualStopsInProgress.delete(id);
    return { ok: false, error: "Falha ao iniciar processo" };
  }

  // Limpa o stop manual pendente agora que reiniciou com sucesso
  manualStopsInProgress.delete(id);

  running.set(id, { 
    pid: child.pid, 
    path: exePath, 
    child,
    manualStop: false
  });
  
  child.on("exit", (code) => {
    const currentInfo = running.get(id);
    const wasManualStop = currentInfo?.manualStop || manualStopsInProgress.has(id);
    running.delete(id);
    
    // Limpa o stop manual pendente
    manualStopsInProgress.delete(id);
    
    console.log(`[Exit Event] Processo ${id} (PID ${child.pid}) encerrou após restart. Code: ${code}, Manual: ${wasManualStop}`);
    
    // Se não foi stop manual, SEMPRE é crash (independente do exit code)
    const crashed = !wasManualStop;
    
    try {
      mainWindow?.webContents?.send("process-exited", { 
        id, 
        pid: child.pid, 
        exitCode: code,
        wasManualStop: wasManualStop,
        crashed: crashed,
        detectedByWatchdog: false
      });
    } catch {}
  });

  if (hidden) {
    setTimeout(() => {
      setWindowVisibleByPid(child.pid, false);
    }, 250);
  }

  return { ok: true, pid: child.pid };
});

// =========================
//  IPC: show/hide windows
// =========================
ipcMain.handle("process-window-show", async (_evt, payload) => {
  const { id } = payload || {};
  const info = running.get(id);
  if (!info?.pid) return { ok: false };
  const ok = await setWindowVisibleByPid(info.pid, true);
  return { ok };
});

ipcMain.handle("process-window-hide", async (_evt, payload) => {
  const { id } = payload || {};
  const info = running.get(id);
  if (!info?.pid) return { ok: false };
  const ok = await setWindowVisibleByPid(info.pid, false);
  return { ok };
});

ipcMain.handle("process-window-show-all", async () => {
  const ids = Array.from(running.keys());
  for (const id of ids) {
    const info = running.get(id);
    if (info?.pid) await setWindowVisibleByPid(info.pid, true);
  }
  return { ok: true };
});

// =========================
//  Auto Click OK (MUDevs dialogs)
// =========================
ipcMain.handle("auto-click-ok", async (_evt, payload) => {
  const { pid, timeoutMs = 2000, retries = 5 } = payload || {};
  if (!pid) return { ok: false, error: "PID é obrigatório" };

  try {
    const ok = await winWindow.autoClickOK(Number(pid), Number(timeoutMs), Number(retries));
    return { ok: Boolean(ok) };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
});

// =========================
//  Window Controls
// =========================
ipcMain.on("window-minimize", () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.minimize();
  }
});

ipcMain.on("window-maximize", () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on("window-toggle-maximize", () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on("window-close", () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.close();
  }
});

// =========================
//  lifecycle
// =========================
app.whenReady().then(() => {
  cleanOldLogs(); // Limpa logs com mais de 30 dias
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Verifica se um processo ainda está rodando
function isProcessRunning(pid) {
  try {
    const result = spawnSync("tasklist", ["/FI", `PID eq ${pid}`, "/NH"], { 
      windowsHide: true,
      encoding: 'utf8'
    });
    return result.stdout && result.stdout.includes(String(pid));
  } catch {
    return false;
  }
}

// Mata todos os processos gerenciados com verificação
async function killAllManagedWithVerification() {
  const KILL_TIMEOUT_MS = 5000; // 5 segundos máximo para matar todos
  const VERIFY_INTERVAL_MS = 200; // Verifica a cada 200ms
  const startTime = Date.now();
  
  console.log(`[Cleanup] Matando ${running.size} processo(s) gerenciado(s)...`);
  
  // Manda sinal de kill para todos
  const pidsToKill = [];
  for (const [id, info] of running.entries()) {
    if (!info?.pid) continue;
    pidsToKill.push({ id, pid: info.pid, name: info.name || 'unknown' });
    
    try {
      console.log(`[Cleanup] Enviando kill para PID ${info.pid} (${info.name})`);
      spawnSync("taskkill", ["/PID", String(info.pid), "/T", "/F"], { windowsHide: true });
    } catch (err) {
      console.log(`[Cleanup] Erro ao matar PID ${info.pid}: ${err.message}`);
    }
  }
  
  // Verifica se todos morreram (com timeout)
  let allDead = false;
  while (!allDead && (Date.now() - startTime) < KILL_TIMEOUT_MS) {
    allDead = true;
    
    for (const { pid, name } of pidsToKill) {
      if (isProcessRunning(pid)) {
        allDead = false;
        console.log(`[Cleanup] Aguardando PID ${pid} (${name}) finalizar...`);
        break;
      }
    }
    
    if (!allDead) {
      await new Promise(resolve => setTimeout(resolve, VERIFY_INTERVAL_MS));
    }
  }
  
  // Verifica final
  const stillRunning = pidsToKill.filter(p => isProcessRunning(p.pid));
  
  if (stillRunning.length > 0) {
    console.warn(`[Cleanup] ⚠️ ${stillRunning.length} processo(s) ainda rodando após timeout:`);
    stillRunning.forEach(p => console.warn(`  - PID ${p.pid} (${p.name})`));
    
    // Força kill agressivo nos que sobraram
    for (const { pid } of stillRunning) {
      try {
        console.log(`[Cleanup] Força kill agressivo PID ${pid}`);
        spawnSync("taskkill", ["/PID", String(pid), "/T", "/F"], { windowsHide: true });
      } catch {}
    }
  } else {
    console.log(`[Cleanup] ✅ Todos os ${pidsToKill.length} processos foram finalizados com sucesso`);
  }
  
  running.clear();
  return stillRunning.length === 0;
}

let isCleaningUp = false; // Flag para garantir cleanup único

async function cleanupOnExit() {
  // Previne execução múltipla
  if (isCleaningUp) {
    console.log('[Cleanup] Já está executando cleanup, ignorando...');
    return;
  }
  isCleaningUp = true;
  
  const cleanupStartTime = Date.now();
  const CLEANUP_MAX_TIME_MS = 10000; // 10 segundos máximo para cleanup total
  
  console.log('═══════════════════════════════════════════════════');
  console.log('[Cleanup] 🧹 INICIANDO LIMPEZA DE RECURSOS...');
  console.log('═══════════════════════════════════════════════════');
  
  try {
    // 1. Para os intervalos PRIMEIRO (antes de matar processos)
    console.log('[Cleanup] Passo 1/6: Parando intervalos...');
    if (metricsInterval) {
      clearInterval(metricsInterval);
      metricsInterval = null;
      console.log('  ✅ Metrics interval limpo');
    }
    
    if (processWatchdogInterval) {
      clearInterval(processWatchdogInterval);
      processWatchdogInterval = null;
      console.log('  ✅ Watchdog interval limpo');
    }
    
    // 2. Mata todos os processos gerenciados COM VERIFICAÇÃO
    console.log('[Cleanup] Passo 2/6: Finalizando processos gerenciados...');
    const allKilled = await Promise.race([
      killAllManagedWithVerification(),
      new Promise((resolve) => setTimeout(() => {
        console.warn('[Cleanup] ⚠️ Timeout ao matar processos!');
        resolve(false);
      }, 7000))
    ]);
    
    if (allKilled) {
      console.log('  ✅ Todos processos finalizados com sucesso');
    } else {
      console.warn('  ⚠️ Alguns processos podem não ter finalizado');
    }
    
    // 3. Fecha conexões SQL (com timeout)
    console.log('[Cleanup] Passo 3/6: Fechando conexão SQL Server...');
    if (sqlPool) {
      try {
        await Promise.race([
          (async () => {
            if (sqlPool.connected) {
              await sqlPool.close();
            }
          })(),
          new Promise((resolve) => setTimeout(resolve, 2000)) // 2s timeout
        ]);
        console.log('  ✅ SQL Server pool fechado');
      } catch (err) {
        console.warn(`  ⚠️ Erro ao fechar SQL Server pool: ${err.message}`);
      }
      sqlPool = null;
    } else {
      console.log('  ℹ️ Sem conexão SQL ativa');
    }
    
    // 4. Fecha MySQL (com timeout)
    console.log('[Cleanup] Passo 4/6: Fechando conexão MySQL...');
    if (mysqlConnection) {
      try {
        await Promise.race([
          mysqlConnection.end(),
          new Promise((resolve) => setTimeout(resolve, 2000)) // 2s timeout
        ]);
        console.log('  ✅ MySQL connection fechada');
      } catch (err) {
        console.warn(`  ⚠️ Erro ao fechar MySQL connection: ${err.message}`);
      }
      mysqlConnection = null;
    } else {
      console.log('  ℹ️ Sem conexão MySQL ativa');
    }
    
    // 5. Remove atalhos globais
    console.log('[Cleanup] Passo 5/6: Removendo atalhos globais...');
    try {
      globalShortcut.unregisterAll();
      console.log('  ✅ Atalhos globais removidos');
    } catch (err) {
      console.warn(`  ⚠️ Erro ao remover atalhos globais: ${err.message}`);
    }
    
    // 6. Fecha e destrói as janelas
    console.log('[Cleanup] Passo 6/6: Fechando janelas...');
    if (splashWindow && !splashWindow.isDestroyed()) {
      try {
        splashWindow.close();
        splashWindow = null;
        console.log('  ✅ Splash window fechada');
      } catch (err) {
        console.warn(`  ⚠️ Erro ao fechar splash window: ${err.message}`);
      }
    }
    
    if (mainWindow && !mainWindow.isDestroyed()) {
      try {
        mainWindow.close();
        mainWindow = null;
        console.log('  ✅ Main window fechada');
      } catch (err) {
        console.warn(`  ⚠️ Erro ao fechar main window: ${err.message}`);
      }
    }
    
    const cleanupDuration = Date.now() - cleanupStartTime;
    console.log('═══════════════════════════════════════════════════');
    console.log(`[Cleanup] ✅ LIMPEZA CONCLUÍDA em ${cleanupDuration}ms`);
    console.log('═══════════════════════════════════════════════════');
    
  } catch (error) {
    console.error('[Cleanup] ❌ ERRO CRÍTICO durante cleanup:', error);
  }
  
  // Garante que cleanup sempre finaliza, mesmo com erro
  const totalTime = Date.now() - cleanupStartTime;
  if (totalTime > CLEANUP_MAX_TIME_MS) {
    console.warn(`[Cleanup] ⚠️ Cleanup demorou ${totalTime}ms (limite: ${CLEANUP_MAX_TIME_MS}ms)`);
  }
}

app.on("before-quit", async (event) => {
  if (!isCleaningUp) {
    event.preventDefault();
    await cleanupOnExit();
    app.quit();
  }
});

app.on("window-all-closed", async () => {
  await cleanupOnExit();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('will-quit', async () => {
  await cleanupOnExit();
});