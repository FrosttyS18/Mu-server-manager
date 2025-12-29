================================================================================
           RESUMO COMPLETO DO PROJETO: MU SERVER MANAGER
================================================================================

================================================================================
🎯 O QUE É O PROJETO
================================================================================

MU Server Manager é uma aplicação desktop para Windows que gerencia múltiplos 
processos de servidores do jogo MU Online. A aplicação permite:

- Iniciar/Parar/Reiniciar servidores individuais ou em lote
- Monitorar em tempo real CPU, RAM e status de cada processo
- Auto-restart inteligente quando um servidor crasha (com sistema de fila)
- Controlar janelas (mostrar/ocultar processos via Win32 API)
- Backup de banco de dados MySQL/MSSQL
- Interface moderna com tema dark e efeitos visuais

================================================================================
🏗️ ARQUITETURA E TECNOLOGIAS
================================================================================

STACK PRINCIPAL:
----------------
- Frontend: React 19.2.0 + Vite 7.2.4
- Desktop: Electron 39.2.7 (versão moderna) / 30.5.1 (legacy)
- Styling: TailwindCSS 4.1.18 + CSS customizado
- Build: Electron Builder 25.1.8

DEPENDÊNCIAS IMPORTANTES:
-------------------------
- mssql (12.2.0) - SQL Server
- mysql2 (3.16.0) - MySQL
- pidusage (4.0.1) - Monitoramento de processos
- @fontsource/inter - Tipografia
- Node.js Native Addons (C++):
  - hello-addon - Addon exemplo
  - win-window - Manipulação de janelas Win32 (ShowWindow, FindWindow)

================================================================================
📁 ESTRUTURA DO PROJETO
================================================================================

mu-server-manager/
├── mu-server-manager-app/          # Versão Moderna (Electron 39)
│   ├── electron/
│   │   ├── main.cjs                # Processo principal do Electron
│   │   ├── preload.cjs             # Preload script (IPC)
│   │   └── splash.html/css         # Tela de splash
│   ├── src/
│   │   ├── App.jsx                 # Componente principal (3015 linhas)
│   │   ├── hooks/
│   │   │   ├── useCrashDetection.js   # Sistema de auto-restart
│   │   │   ├── useProcesses.js        # Gerenciamento de processos
│   │   │   ├── useMetrics.js          # Monitoramento CPU/RAM
│   │   │   └── useGlowPointer.js      # Efeito visual spotlight
│   │   ├── components/
│   │   │   ├── Modals/
│   │   │   │   ├── CrashModal.jsx     # Modal de crash com fila
│   │   │   │   ├── ConfirmModal.jsx   # Modal de confirmação
│   │   │   │   └── index.js
│   │   │   ├── CustomSelect.jsx       # Select customizado
│   │   │   └── Icon.jsx               # Componente de ícones
│   │   └── assets/
│   ├── native/
│   │   ├── win-window/             # Addon C++ para Win32 API
│   │   │   ├── win_window.cc       # Código C++
│   │   │   ├── binding.gyp         # Build config
│   │   │   └── bin/win32-x64-140/  # .node compilado
│   │   └── hello-addon/            # Addon exemplo
│   ├── release/                    # Build final
│   │   └── Server Manager-1.0.0-Setup.exe
│   ├── electron-builder.yml        # Config de build
│   └── package.json
│
└── mu-server-manager-legacy/       # Versão Legacy (Electron 30)
    └── [mesma estrutura]

================================================================================
🔧 FUNCIONALIDADES PRINCIPAIS
================================================================================

1. GERENCIAMENTO DE PROCESSOS
------------------------------
Processos padrão (7):
  - ChatServe.exe
  - ConnectServe.exe
  - DataServer.exe
  - ExDataServer.exe
  - JoinServer.exe
  - GameServer.exe
  - GameServerCS.exe

Operações:
  - Start/Stop/Restart individual
  - Start All/Stop All/Restart All (com delay de 2s entre cada)
  - Show All/Hide All Windows (via Win32 API)
  - Status em tempo real: CPU, RAM, PID

2. SISTEMA DE AUTO-RESTART (CRASH DETECTION)
---------------------------------------------
- Hook: useCrashDetection.js
- Watchdog: Verifica processos a cada 2s (detecta kills pelo Task Manager)
- Fila inteligente: Processa múltiplos crashes sequencialmente
- Tentativas: Até 3 tentativas automáticas com countdown
- Countdown adaptativo:
  * 10s normalmente
  * 5s se 3+ processos na fila
- Intervenção manual: Após 3 falhas, exibe modal com opções:
  * "Tentar Reiniciar Mesmo Assim"
  * "Pular e Continuar" (pula para próximo da fila)
  * "Cancelar Tudo"
- Debounce: Ignora detecções duplicadas (exit event + watchdog)

3. MONITORAMENTO DE MÉTRICAS
-----------------------------
- Hook: useMetrics.js
- IPC: get-process-metrics (a cada 1s)
- Exibe: CPU% e RAM (MB) para cada processo

4. BACKUP DE BANCO DE DADOS
----------------------------
- Suporta: MySQL e MSSQL
- Configuração: Modal com campos Host, Port, User, Password, DB Name
- Execução: Via Electron IPC (database-backup)

5. INTERFACE UI/UX
------------------
- Tema Dark com gradientes e backdrop blur
- Spotlight Effect (glow que segue o mouse)
- Drag & Drop: Reordenar processos (Angular CDK style)
- Toast Notifications: Sistema de notificações
- Sidebar: Nome do servidor + logo customizável (persistido no localStorage)
- Console Modal: Logs de ações (últimas 50 entradas)

================================================================================
🔌 ELECTRON IPC HANDLERS
================================================================================

MAIN PROCESS → RENDERER:
------------------------
Handler                | Descrição
-----------------------|---------------------------------------------------
process-start          | Inicia processo via child_process.spawn
process-stop           | Para processo via taskkill /F /PID
get-process-metrics    | Retorna CPU/RAM via pidusage
show-window            | ShowWindow(hwnd, SW_SHOW) via native addon
hide-window            | ShowWindow(hwnd, SW_HIDE) via native addon
database-backup        | Executa backup MySQL/MSSQL

RENDERER ← MAIN PROCESS (EVENTS):
----------------------------------
Event                  | Descrição
-----------------------|---------------------------------------------------
process-exited         | Notifica quando processo termina (com crashed flag)

================================================================================
🚨 PROBLEMAS CRÍTICOS RESOLVIDOS
================================================================================

1. STALE CLOSURES
-----------------
Problema: Funções acessavam estado antigo de processes
Solução: processesRef = useRef(processes) + sempre usar .current

2. CRASH DETECTION NÃO FUNCIONAVA
----------------------------------
Problema: Dependências circulares em useCallback
Solução: Refatoração completa do useCrashDetection.js

3. TASK MANAGER NÃO DETECTADO
------------------------------
Problema: exit event não dispara em alguns kills
Solução: Watchdog (polling PID via pidusage a cada 2s)

4. FILA DE CRASHES NÃO PROCESSAVA
----------------------------------
Problema: Apenas 1 processo reiniciava, resto travava
Solução: crashQueueRef + processNextInQueue()

5. DUPLA DETECÇÃO DE CRASHES
-----------------------------
Problema: exit event + watchdog disparavam 2x
Solução: recentCrashesRef (debounce de 5s)

================================================================================
📦 BUILD E DEPLOY
================================================================================

COMANDOS:
---------
# Dev mode
npm run app  # Inicia Vite + Electron

# Build
npm run build:electron  # Gera .exe instalador

# Output
release/Server Manager-1.0.0-Setup.exe

ELECTRON BUILDER CONFIG:
------------------------
- ASAR: Habilitado (com asarUnpack para native modules)
- Otimizações: Remove docs, tests, README do node_modules
- Idiomas: Apenas pt-BR e en-US

================================================================================
🎨 PADRÕES DE CÓDIGO
================================================================================

REACT HOOKS:
------------
- useState para UI state
- useRef para valores mutáveis (evita stale closures)
- useCallback para funções que são dependencies
- useEffect para side effects e cleanup

IPC PATTERN:
------------
// Renderer
const result = await window.api.processStart(id, exePath, args);

// Main (preload.cjs)
contextBridge.exposeInMainWorld("api", {
  processStart: (id, exePath, args) => 
    ipcRenderer.invoke("process-start", id, exePath, args)
});

// Main (main.cjs)
ipcMain.handle("process-start", async (evt, id, exePath, args) => {
  // spawn child process...
});

================================================================================
🔑 INFORMAÇÕES CRÍTICAS PARA OUTRA IA
================================================================================

1. SEMPRE usar processesRef.current para acessar lista de processos em 
   funções (não processes diretamente)

2. SISTEMA DE FILA:
   - crashQueueRef gerencia crashes múltiplos
   - processingQueueRef evita countdown simultâneo
   - processNextInQueue() processa sequencialmente

3. WATCHDOG É ESSENCIAL:
   - Detecta processos mortos que exit event perde
   - Roda a cada 2s no main process

4. NATIVE ADDONS:
   - win-window DEVE estar em asarUnpack
   - Compilado com node-gyp (ABI 140)

5. 2 VERSÕES:
   - Moderna: Electron 39 (Windows 10/11)
   - Legacy: Electron 30 (Windows 7/8)

6. TOAST SYSTEM:
   - Máximo 3 toasts simultâneos
   - Auto-dismiss após 4s

7. DELAY ENTRE STARTS:
   - 2-3s entre cada processo em "Start All"
   - 3.5s de delay após start para modal MUDEVS

================================================================================
📝 EXEMPLO DE PROMPT PARA OUTRA IA
================================================================================

Você está trabalhando no projeto MU Server Manager, uma aplicação 
Electron + React que gerencia processos de servidores MU Online.

STACK: React 19, Electron 39, TailwindCSS, Node.js Native Addons (C++)

ARQUIVOS PRINCIPAIS:
- src/App.jsx (3015 linhas) - Componente principal
- src/hooks/useCrashDetection.js - Sistema de auto-restart com fila
- electron/main.cjs - Processo principal (IPC, spawn, watchdog)
- native/win-window/ - Addon C++ para controlar janelas Win32

REGRAS CRÍTICAS:
1. SEMPRE use processesRef.current para acessar processes[]
2. Sistema de fila usa crashQueueRef para múltiplos crashes
3. Watchdog (2s) detecta processos mortos via pidusage
4. Debounce de crashes via recentCrashesRef (5s)
5. Delay de 2s entre processos em startAll/restartAll

CONTEXTO: [descreva sua tarefa específica aqui]

================================================================================
📊 ARQUIVOS-CHAVE E SUAS RESPONSABILIDADES
================================================================================

1. src/App.jsx (3015 linhas)
-----------------------------
- Componente principal da aplicação
- Gerencia estado global de processos
- Implementa todas as operações de Start/Stop/Restart
- Controla modais (Crash, Confirm, Console, Settings, Backup)
- Sistema de Toast notifications
- Drag & Drop para reordenar processos
- Persistência de branding (nome servidor + logo)
- Integração com todos os hooks customizados

IMPORTANTE: Usa processesRef para evitar stale closures em todas as funções
que manipulam processos.

2. src/hooks/useCrashDetection.js (292 linhas)
-----------------------------------------------
- Detecta quando processos crasham
- Implementa sistema de fila para múltiplos crashes
- Countdown automático (10s normal, 5s se 3+ na fila)
- Tentativas de restart (até 3x)
- Modal de intervenção manual após 3 falhas
- Debounce para evitar detecção duplicada
- Callbacks: handleProcessCrash, cancelCrashRestart, skipCrashAndContinue

3. electron/main.cjs (1298 linhas)
-----------------------------------
- Processo principal do Electron
- IPC Handlers para todas as operações
- Spawn de processos via child_process
- Watchdog (polling de PIDs a cada 2s)
- Monitoramento de métricas via pidusage
- Controle de janelas via native addon win-window
- Backup de MySQL/MSSQL
- Splash screen
- Gerencia running Map (id -> {pid, process, manualStop})

4. src/hooks/useProcesses.js
-----------------------------
- Inicialização e persistência da lista de processos
- Sincronização com PIDs do sistema
- Save/Load no localStorage
- Adicionar/Remover processos customizados

5. src/hooks/useMetrics.js
---------------------------
- Polling de métricas a cada 1s
- Atualiza CPU% e RAM(MB) de cada processo
- IPC: get-process-metrics

6. src/components/Modals/CrashModal.jsx (142 linhas)
-----------------------------------------------------
- Exibe countdown de auto-restart
- Mostra tentativas (X/3)
- Exibe fila de processos aguardando (+N na fila)
- Botões: Cancelar, Tentar Reiniciar, Pular e Continuar

7. native/win-window/win_window.cc
-----------------------------------
- Addon C++ para Win32 API
- Funções: ShowWindowByPid, HideWindowByPid
- Usa FindWindow + ShowWindow do Windows

8. electron-builder.yml (50 linhas)
------------------------------------
- Configuração de build
- ASAR habilitado com asarUnpack para:
  * native/**/*.node
  * node_modules/mssql/**/*
  * node_modules/mysql2/**/*
  * node_modules/pidusage/**/*
- Remove arquivos desnecessários (docs, tests, README)
- Idiomas: pt-BR, en-US

================================================================================
🔍 FLUXO DE EXECUÇÃO - CRASH DETECTION E AUTO-RESTART
================================================================================

CENÁRIO: Um processo crasha enquanto está rodando

1. DETECÇÃO DO CRASH:
---------------------
- Processo termina → exit event OU watchdog detecta PID morto
- Main process emite: process-exited { id, pid, exitCode, crashed: true }
- Renderer recebe no useEffect do App.jsx

2. HANDLER DE CRASH:
--------------------
App.jsx chama: handleProcessCrash(id)
  ↓
useCrashDetection.js → handleProcessCrash(processId):
  - Verifica debounce (recentCrashesRef)
  - Incrementa tentativas (restartAttemptsRef)
  - Se < 3 tentativas: adiciona à fila ou inicia countdown
  - Se >= 3 tentativas: modo manual intervention

3. COUNTDOWN:
-------------
startCrashCountdownInternal():
  - Define tempo: 10s (normal) ou 5s (3+ na fila)
  - Exibe CrashModal com countdown
  - Ao chegar em 0 → attemptAutoRestart()

4. TENTATIVA DE RESTART:
-------------------------
attemptAutoRestart(processId, processName, attemptNumber):
  - Chama startOne(processId, { hidden: true })
  - Remove da fila (shift)
  - Chama processNextInQueue() após 500ms

5. PROCESSAMENTO DA FILA:
--------------------------
processNextInQueue():
  - Se fila vazia → para
  - Pega próximo da fila → startCrashCountdownInternal()
  - Repete até esvaziar

CENÁRIO ESPECIAL: Intervenção Manual
-------------------------------------
- Após 3 falhas, exibe modal com 3 opções:
  1. "Cancelar Tudo" → limpa fila, para processamento
  2. "Tentar Reiniciar Mesmo Assim" → força restart, continua fila
  3. "Pular e Continuar" → remove da fila, processa próximo

================================================================================
⚠️ ARMADILHAS COMUNS (GOTCHAS)
================================================================================

1. NÃO USE processes DIRETAMENTE EM CALLBACKS
----------------------------------------------
❌ ERRADO:
const startOne = async (id) => {
  const proc = processes.find(p => p.id === id); // STALE!
}

✅ CORRETO:
const startOne = useCallback(async (id) => {
  const proc = processesRef.current.find(p => p.id === id);
}, [/* dependencies */]);

2. WATCHDOG É OBRIGATÓRIO
--------------------------
Sem o watchdog, processos mortos pelo Task Manager (aba Aplicativos) não são
detectados porque o exit event não dispara.

3. NATIVE ADDONS PRECISAM DE asarUnpack
----------------------------------------
Se não configurar asarUnpack corretamente, o app quebra em produção com:
"Cannot find module './lib/...'"

4. DELAY ENTRE STARTS
----------------------
Iniciar todos os processos sem delay causa race conditions. Use delay de 2-3s.

5. DEBOUNCE DE CRASHES
-----------------------
exit event + watchdog podem disparar 2x para o mesmo crash.
recentCrashesRef resolve isso (ignora detecções < 5s).

6. FILA TRAVA SE NÃO PROCESSAR PRÓXIMO
---------------------------------------
Sempre chame processNextInQueue() após concluir uma tentativa, seja sucesso
ou falha.

================================================================================
🚀 COMANDOS ÚTEIS
================================================================================

# DESENVOLVIMENTO
cd mu-server-manager-app
npm run app                    # Inicia dev mode (Vite + Electron)

# BUILD
npm run build                  # Apenas frontend (Vite)
npm run build:electron         # Build completo + instalador .exe
npm run build:electron:dir     # Build sem criar instalador

# NATIVE ADDONS (Se precisar recompilar)
cd native/win-window
node-gyp rebuild --target=39.2.7 --arch=x64 --dist-url=https://electronjs.org/headers

# LIMPAR CACHE (Se app não atualizar)
# Deletar: node_modules, package-lock.json, dist, release
npm install
npm run build:electron

================================================================================
📞 SUPORTE E TROUBLESHOOTING
================================================================================

PROBLEMA: "Cannot find module './lib/history'"
SOLUÇÃO: Verifique asarUnpack no electron-builder.yml

PROBLEMA: Botões não funcionam / "Processo não encontrado"
SOLUÇÃO: Verifique se está usando processesRef.current

PROBLEMA: Auto-restart não detecta crashes
SOLUÇÃO: Confirme que watchdog está rodando (console do main process)

PROBLEMA: Fila de crashes trava
SOLUÇÃO: Adicione logs em processNextInQueue para debugar fluxo

PROBLEMA: DevTools aparece em produção
SOLUÇÃO: Remova mainWindow.webContents.openDevTools() do else block

PROBLEMA: Build muito grande
SOLUÇÃO: Confirme removePackageScripts: true e exclusões no files[]

================================================================================
📅 HISTÓRICO DE VERSÕES
================================================================================

v1.0.0 (Atual)
--------------
- Sistema completo de gerenciamento de processos
- Auto-restart com fila inteligente
- Watchdog para detecção robusta de crashes
- Backup MySQL/MSSQL
- UI moderna com efeitos visuais
- 2 versões: Moderna (Electron 39) e Legacy (Electron 30)

================================================================================
🧠 PROTOCOLO DE INTERAÇÃO (IMPORTANTE PARA IAs)
================================================================================

Ao trabalhar neste projeto, siga estas diretrizes críticas:

0. ⚠️ REGRA DE OURO - CONFIRMAÇÃO OBRIGATÓRIA ⚠️
------------------------------------------------
ANTES DE ESCREVER QUALQUER CÓDIGO, você DEVE:

1. LER E ENTENDER a solicitação do usuário completamente
2. ANALISAR o código existente relacionado
3. RESPONDER ao usuário explicando:
   - O que você entendeu da tarefa
   - Qual(is) arquivo(s) será(ão) modificado(s)
   - Qual abordagem você vai usar
   - Se há algum risco ou cuidado especial
   - Qual versão será afetada (Modern/Legacy/Ambas)

4. AGUARDAR APROVAÇÃO EXPLÍCITA do usuário antes de prosseguir

EXEMPLO DE RESPOSTA ANTES DE MEXER NO CÓDIGO:
----------------------------------------------
"Entendi que você quer adicionar um botão para limpar todos os logs do 
console modal. Vou modificar:

- src/App.jsx: Adicionar função clearAllLogs e botão no ConsoleModal
- Será apenas na versão MODERNA (confirma?)

A implementação vai:
1. Adicionar useState para controlar logs
2. Criar função clearAllLogs que reseta o array
3. Adicionar botão no modal com confirmação

Posso prosseguir dessa forma?"

NUNCA comece a codar sem essa confirmação. O usuário precisa validar seu 
entendimento primeiro para evitar retrabalho.

1. VALIDAÇÃO DE VERSÃO
----------------------
Antes de gerar ou modificar código, SEMPRE confirme:
- A alteração é para a versão MODERNA (mu-server-manager-app)?
- A alteração é para a versão LEGACY (mu-server-manager-legacy)?
- Ambas as versões precisam ser atualizadas?

NUNCA assuma a versão. Pergunte explicitamente se não estiver claro.

2. VERIFICAÇÃO DE FUNCIONALIDADES
----------------------------------
Antes de criar algo novo, verifique:
- A funcionalidade JÁ ESTÁ IMPLEMENTADA?
- Consulte a seção "FUNCIONALIDADES PRINCIPAIS" deste documento
- Leia o código existente em src/App.jsx e src/hooks/

NÃO reimplemente funcionalidades que já existem. Apenas melhore ou corrija.

3. SEGURANÇA DE PROCESSOS
--------------------------
Ao mexer em gerenciamento de processos, SEMPRE pergunte:
- Estou usando processesRef.current ao invés de processes?
- Esta mudança respeita o sistema de fila de crashes (crashQueueRef)?
- Estou mantendo a compatibilidade com o watchdog?
- Preciso adicionar debounce ou delay?

LEMBRE-SE:
- processes é STALE em callbacks → use processesRef.current
- Sempre processe a fila sequencialmente (processNextInQueue)
- Watchdog e exit event podem disparar juntos (debounce obrigatório)

4. IDIOMA
---------
Responda SEMPRE em Português Brasileiro.
- Comentários no código: português
- Mensagens de toast: português
- Logs de console: português
- Documentação: português

5. TESTES ANTES DE ENTREGAR
----------------------------
Antes de considerar uma tarefa concluída, verifique:
- [ ] Não introduzi stale closures?
- [ ] Testei Start All / Stop All / Restart All?
- [ ] Testei o sistema de auto-restart?
- [ ] Confirmei que watchdog continua funcionando?
- [ ] Verifiquei se há erros no console?
- [ ] Removi console.logs de debug desnecessários?

6. BUILD E PRODUÇÃO
-------------------
Ao fazer mudanças relacionadas a build:
- NUNCA remova configurações de asarUnpack (quebrará native addons)
- NUNCA habilite DevTools em produção
- SEMPRE teste o build antes de entregar
- Verifique se a mudança afeta electron-builder.yml

7. FUNCIONALIDADES JÁ IMPLEMENTADAS (NÃO RECRIAR)
--------------------------------------------------
✅ Start/Stop/Restart (individual e em massa)
✅ Auto-restart com fila inteligente
✅ Watchdog para detectar crashes
✅ Sistema de debounce de crashes
✅ Show/Hide Windows via Win32 API
✅ Monitoramento CPU/RAM em tempo real
✅ Backup MySQL/MSSQL
✅ Drag & Drop de processos
✅ Toast notifications (máximo 3)
✅ Console modal com logs
✅ Branding customizável (nome + logo)
✅ Persistência no localStorage
✅ Modal de crash com fila
✅ Modal de confirmação
✅ Sistema de undo
✅ Loading states em botões

8. ARQUIVOS CRÍTICOS (CUIDADO AO MODIFICAR)
--------------------------------------------
- src/App.jsx (3015 linhas) - Componente principal
- src/hooks/useCrashDetection.js - Sistema de auto-restart
- electron/main.cjs - Processo principal (watchdog aqui)
- electron-builder.yml - Configuração de build (asarUnpack!)
- native/win-window/ - Addon C++ (não modificar sem necessidade)

9. PADRÃO DE COMMIT (SUGESTÃO)
-------------------------------
- feat: Nova funcionalidade
- fix: Correção de bug
- refactor: Refatoração
- docs: Documentação
- build: Mudanças no build
- perf: Performance

Exemplo: "fix: corrige stale closure no startAll"

10. FLUXO DE TRABALHO IDEAL (OBRIGATÓRIO)
------------------------------------------
1. 📖 LEIA a solicitação do usuário com atenção
2. 🔍 ANALISE o código existente relacionado
3. 🧠 ENTENDA completamente o que precisa ser feito
4. ✍️ ESCREVA sua compreensão da tarefa (o que, onde, como)
5. ⏸️ AGUARDE aprovação explícita do usuário
6. ✅ Após aprovado, pergunte qual versão (Modern/Legacy/Ambas)
7. 🔎 Verifique se a feature já existe
8. 💻 Faça a alteração respeitando processesRef e fila
9. 🧪 Teste mentalmente o fluxo (ou peça ao usuário testar)
10. 🧹 Remova logs de debug desnecessários
11. ✔️ Confirme que não quebrou funcionalidades existentes
12. 📦 Entregue e explique o que foi feito

⚠️ ATENÇÃO: Pular os passos 4-5 (confirmar e aguardar) é considerado ERRO 
CRÍTICO e resultará em retrabalho!

================================================================================
⚠️ ARMADILHAS FATAIS (NUNCA FAÇA ISSO)
================================================================================

❌ NUNCA use processes diretamente em callbacks (use processesRef.current)
❌ NUNCA desabilite ASAR sem configurar asarUnpack
❌ NUNCA habilite DevTools em produção
❌ NUNCA inicie todos os processos sem delay (race condition)
❌ NUNCA ignore a fila de crashes (crashQueueRef)
❌ NUNCA remova o watchdog (detecção de Task Manager)
❌ NUNCA compile um projeto sobre o outro (cd .. antes de mudar)
❌ NUNCA assuma a versão (Modern ou Legacy) - sempre confirme

================================================================================
✅ CHECKLIST FINAL ANTES DE ENTREGAR
================================================================================

[ ] Confirmei qual versão estou modificando (Modern/Legacy/Ambas)
[ ] Verifiquei que a funcionalidade não existe
[ ] Usei processesRef.current em vez de processes
[ ] Respeitei o sistema de fila (crashQueueRef)
[ ] Mantive compatibilidade com watchdog
[ ] Removi console.logs de debug desnecessários
[ ] Testei mentalmente o fluxo completo
[ ] Não quebrei funcionalidades existentes
[ ] Respondi em Português Brasileiro
[ ] Expliquei o que foi feito de forma clara

================================================================================
FIM DO DOCUMENTO
================================================================================

