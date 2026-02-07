import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverInfo = {
  name: "server-manager",
  version: "0.1.0",
};

const defaultWorkspaceRoot = path.resolve(__dirname, "..", "..", "..", "..");
const workspaceRoot = normalizePath(process.env.WORKSPACE_ROOT || defaultWorkspaceRoot);

function normalizePath(p) {
  return path.resolve(p);
}

function toPosixPath(p) {
  return p.replaceAll("\\", "/");
}

function safeResolve(relativeOrAbsolutePath) {
  const resolved = path.isAbsolute(relativeOrAbsolutePath)
    ? path.resolve(relativeOrAbsolutePath)
    : path.resolve(workspaceRoot, relativeOrAbsolutePath);

  const root = workspaceRoot.endsWith(path.sep) ? workspaceRoot : workspaceRoot + path.sep;
  if (resolved !== workspaceRoot && !resolved.startsWith(root)) {
    throw new Error("Caminho fora do WORKSPACE_ROOT");
  }
  return resolved;
}

function sha256Buffer(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

async function readFileBuffer(p) {
  return fs.promises.readFile(p);
}

async function fileExists(p) {
  try {
    await fs.promises.access(p);
    return true;
  } catch {
    return false;
  }
}

async function statSafe(p) {
  try {
    return await fs.promises.stat(p);
  } catch {
    return null;
  }
}

function shouldIgnoreDir(name) {
  const ignored = new Set([
    "node_modules",
    ".git",
    "dist",
    "dist-ssr",
    "out",
    "release",
    "build-temp",
    "release-temp",
    "userData",
    ".vscode",
  ]);
  return ignored.has(name);
}

function shouldIgnorePathSegments(segments) {
  for (const seg of segments) {
    if (shouldIgnoreDir(seg)) return true;
  }
  if (segments.includes("native") && (segments.includes("build") || segments.includes("bin"))) return true;
  return false;
}

function globToRegExp(globPattern) {
  const escaped = globPattern
    .replaceAll("\\", "/")
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replaceAll("**/", "(?:.+/)?")
    .replaceAll("**", ".*")
    .replaceAll("*", "[^/]*")
    .replaceAll("?", "[^/]");
  return new RegExp(`^${escaped}$`, "i");
}

async function walkFiles(rootDir, options) {
  const {
    maxDepth,
    includeFiles,
    includeDirs,
    glob,
    limit,
  } = options;

  const results = [];
  const matcher = glob ? globToRegExp(glob) : null;
  const start = path.resolve(rootDir);

  async function visit(current, depth) {
    if (limit != null && results.length >= limit) return;

    const rel = path.relative(start, current);
    const relSegments = rel ? rel.split(path.sep) : [];
    if (shouldIgnorePathSegments(relSegments)) return;

    const entries = await fs.promises.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      if (limit != null && results.length >= limit) return;
      if (shouldIgnoreDir(entry.name)) continue;

      const fullPath = path.join(current, entry.name);
      const relPath = path.relative(start, fullPath);
      const posixRel = toPosixPath(relPath);
      const passesGlob = matcher ? matcher.test(posixRel) : true;

      if (entry.isDirectory()) {
        if (includeDirs && passesGlob) {
          results.push({
            path: posixRel,
            type: "dir",
          });
        }

        if (maxDepth == null || depth < maxDepth) {
          await visit(fullPath, depth + 1);
        }
        continue;
      }

      if (entry.isFile()) {
        if (includeFiles && passesGlob) {
          results.push({
            path: posixRel,
            type: "file",
          });
        }
      }
    }
  }

  await visit(start, 0);
  return results;
}

function toolText(text) {
  return { content: [{ type: "text", text }] };
}

function jsonRpcResult(id, result) {
  return { jsonrpc: "2.0", id, result };
}

function jsonRpcError(id, code, message, data) {
  const error = { code, message };
  if (data !== undefined) error.data = data;
  return { jsonrpc: "2.0", id, error };
}

function writeMessage(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

const tools = [
  {
    name: "repo_list",
    title: "Listar repositório",
    description: "Lista arquivos/pastas do workspace com filtros e limite.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        root: { type: "string", description: "Diretório relativo ao WORKSPACE_ROOT." },
        maxDepth: { type: "integer", minimum: 0 },
        includeFiles: { type: "boolean", default: true },
        includeDirs: { type: "boolean", default: false },
        glob: { type: "string", description: "Glob tipo **/*.cjs" },
        limit: { type: "integer", minimum: 1, maximum: 50000, default: 5000 },
      },
    },
    handler: async (args) => {
      const root = typeof args?.root === "string" ? args.root : ".";
      const maxDepth = Number.isInteger(args?.maxDepth) ? args.maxDepth : null;
      const includeFiles = args?.includeFiles !== false;
      const includeDirs = args?.includeDirs === true;
      const glob = typeof args?.glob === "string" && args.glob.trim() ? args.glob.trim() : null;
      const limit = Number.isInteger(args?.limit) ? args.limit : 5000;

      const dir = safeResolve(root);
      const st = await statSafe(dir);
      if (!st || !st.isDirectory()) {
        throw new Error("Diretório inválido");
      }

      const items = await walkFiles(dir, { maxDepth, includeFiles, includeDirs, glob, limit });
      return toolText(JSON.stringify({
        workspaceRoot: toPosixPath(workspaceRoot),
        root: toPosixPath(path.relative(workspaceRoot, dir)),
        count: items.length,
        items,
      }, null, 2));
    },
  },
  {
    name: "repo_find",
    title: "Encontrar paths",
    description: "Encontra arquivos/pastas por glob dentro do workspace.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["glob"],
      properties: {
        glob: { type: "string" },
        root: { type: "string" },
        maxDepth: { type: "integer", minimum: 0 },
        limit: { type: "integer", minimum: 1, maximum: 50000, default: 5000 },
      },
    },
    handler: async (args) => {
      const glob = String(args?.glob || "").trim();
      if (!glob) throw new Error("glob é obrigatório");
      const root = typeof args?.root === "string" ? args.root : ".";
      const maxDepth = Number.isInteger(args?.maxDepth) ? args.maxDepth : null;
      const limit = Number.isInteger(args?.limit) ? args.limit : 5000;
      const dir = safeResolve(root);
      const st = await statSafe(dir);
      if (!st || !st.isDirectory()) throw new Error("Diretório inválido");

      const items = await walkFiles(dir, {
        maxDepth,
        includeFiles: true,
        includeDirs: true,
        glob,
        limit,
      });

      return toolText(JSON.stringify({
        root: toPosixPath(path.relative(workspaceRoot, dir)),
        glob,
        count: items.length,
        items,
      }, null, 2));
    },
  },
  {
    name: "repo_read",
    title: "Ler arquivo",
    description: "Lê um arquivo do workspace com controle de linhas.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["path"],
      properties: {
        path: { type: "string" },
        startLine: { type: "integer", minimum: 1, default: 1 },
        maxLines: { type: "integer", minimum: 1, maximum: 2000, default: 200 },
      },
    },
    handler: async (args) => {
      const relPath = String(args?.path || "");
      const startLine = Number.isInteger(args?.startLine) ? args.startLine : 1;
      const maxLines = Number.isInteger(args?.maxLines) ? args.maxLines : 200;
      if (!relPath) throw new Error("path é obrigatório");

      const full = safeResolve(relPath);
      const st = await statSafe(full);
      if (!st || !st.isFile()) throw new Error("Arquivo inválido");

      const buf = await readFileBuffer(full);
      const text = buf.toString("utf8");
      const lines = text.split(/\r?\n/);
      const startIdx = Math.max(0, startLine - 1);
      const endIdx = Math.min(lines.length, startIdx + maxLines);
      const slice = lines.slice(startIdx, endIdx);
      const out = slice
        .map((line, i) => `${String(startLine + i).padStart(6, " ")}→${line}`)
        .join("\n");

      return toolText(out);
    },
  },
  {
    name: "hash_file",
    title: "Hash de arquivo",
    description: "Calcula SHA-256 de um arquivo.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["path"],
      properties: {
        path: { type: "string" },
      },
    },
    handler: async (args) => {
      const relPath = String(args?.path || "");
      if (!relPath) throw new Error("path é obrigatório");
      const full = safeResolve(relPath);
      const st = await statSafe(full);
      if (!st || !st.isFile()) throw new Error("Arquivo inválido");
      const buf = await readFileBuffer(full);
      const hash = sha256Buffer(buf);
      return toolText(JSON.stringify({ path: toPosixPath(path.relative(workspaceRoot, full)), sha256: hash }, null, 2));
    },
  },
  {
    name: "compare_files",
    title: "Comparar arquivos",
    description: "Compara 2 arquivos por hash e aponta a primeira linha diferente.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["a", "b"],
      properties: {
        a: { type: "string" },
        b: { type: "string" },
      },
    },
    handler: async (args) => {
      const aRel = String(args?.a || "");
      const bRel = String(args?.b || "");
      if (!aRel || !bRel) throw new Error("a e b são obrigatórios");

      const aFull = safeResolve(aRel);
      const bFull = safeResolve(bRel);
      const [aSt, bSt] = await Promise.all([statSafe(aFull), statSafe(bFull)]);
      if (!aSt?.isFile() || !bSt?.isFile()) throw new Error("Arquivos inválidos");

      const [aBuf, bBuf] = await Promise.all([readFileBuffer(aFull), readFileBuffer(bFull)]);
      const aHash = sha256Buffer(aBuf);
      const bHash = sha256Buffer(bBuf);
      const equal = aHash === bHash;

      let firstDiff = null;
      if (!equal) {
        const aLines = aBuf.toString("utf8").split(/\r?\n/);
        const bLines = bBuf.toString("utf8").split(/\r?\n/);
        const max = Math.max(aLines.length, bLines.length);
        for (let i = 0; i < max; i++) {
          if ((aLines[i] ?? "") !== (bLines[i] ?? "")) {
            firstDiff = {
              line: i + 1,
              a: aLines[i] ?? null,
              b: bLines[i] ?? null,
            };
            break;
          }
        }
      }

      return toolText(JSON.stringify({
        a: toPosixPath(path.relative(workspaceRoot, aFull)),
        b: toPosixPath(path.relative(workspaceRoot, bFull)),
        equal,
        aSha256: aHash,
        bSha256: bHash,
        firstDiff,
      }, null, 2));
    },
  },
  {
    name: "list_ipc_contract",
    title: "Listar contrato IPC",
    description: "Lista canais IPC no electron/main.cjs e invocações do preload.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        project: {
          type: "string",
          enum: ["modern-client", "MuDevs", "legacy", "app"],
          default: "modern-client",
        },
      },
    },
    handler: async (args) => {
      const project = String(args?.project || "modern-client");
      const projectDir =
        project === "MuDevs"
          ? "MuDevs"
          : project === "legacy"
            ? "mu-server-manager-legacy"
            : project === "app"
              ? "mu-server-manager-app"
              : "mu-server-manager-modern-client";

      const mainPath = safeResolve(path.join(projectDir, "electron", "main.cjs"));
      const preloadPath = safeResolve(path.join(projectDir, "electron", "preload.cjs"));
      const [mainOk, preloadOk] = await Promise.all([fileExists(mainPath), fileExists(preloadPath)]);
      if (!mainOk) throw new Error("main.cjs não encontrado");
      if (!preloadOk) throw new Error("preload.cjs não encontrado");

      const [mainText, preloadText] = await Promise.all([
        fs.promises.readFile(mainPath, "utf8"),
        fs.promises.readFile(preloadPath, "utf8"),
      ]);

      const handleRe = /ipcMain\.handle\(\s*["'`]{1}([^"'`]+)["'`]{1}/g;
      const onRe = /ipcMain\.on\(\s*["'`]{1}([^"'`]+)["'`]{1}/g;
      const invokeRe = /ipcRenderer\.invoke\(\s*["'`]{1}([^"'`]+)["'`]{1}/g;
      const sendRe = /ipcRenderer\.send\(\s*["'`]{1}([^"'`]+)["'`]{1}/g;

      const channels = {
        ipcMainHandle: Array.from(mainText.matchAll(handleRe)).map((m) => m[1]),
        ipcMainOn: Array.from(mainText.matchAll(onRe)).map((m) => m[1]),
        ipcRendererInvoke: Array.from(preloadText.matchAll(invokeRe)).map((m) => m[1]),
        ipcRendererSend: Array.from(preloadText.matchAll(sendRe)).map((m) => m[1]),
      };

      for (const k of Object.keys(channels)) {
        channels[k] = Array.from(new Set(channels[k])).sort((a, b) => a.localeCompare(b));
      }

      return toolText(JSON.stringify({
        project,
        projectDir,
        files: {
          main: toPosixPath(path.relative(workspaceRoot, mainPath)),
          preload: toPosixPath(path.relative(workspaceRoot, preloadPath)),
        },
        channels,
      }, null, 2));
    },
  },
  {
    name: "detect_auto_hide",
    title: "Detectar auto-hide",
    description: "Procura lógica de auto-hide por PID no electron/main.cjs.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        project: {
          type: "string",
          enum: ["modern-client", "MuDevs", "legacy", "app"],
          default: "modern-client",
        },
      },
    },
    handler: async (args) => {
      const project = String(args?.project || "modern-client");
      const projectDir =
        project === "MuDevs"
          ? "MuDevs"
          : project === "legacy"
            ? "mu-server-manager-legacy"
            : project === "app"
              ? "mu-server-manager-app"
              : "mu-server-manager-modern-client";

      const mainPath = safeResolve(path.join(projectDir, "electron", "main.cjs"));
      if (!(await fileExists(mainPath))) throw new Error("main.cjs não encontrado");
      const mainText = await fs.promises.readFile(mainPath, "utf8");
      const lines = mainText.split(/\r?\n/);

      const hits = [];
      for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        if (l.includes("setWindowVisibleByPid") || l.includes("windowsHide") || l.includes("hidden")) {
          const context = lines.slice(Math.max(0, i - 3), Math.min(lines.length, i + 4));
          hits.push({ line: i + 1, text: l.trim(), context });
        }
      }

      return toolText(JSON.stringify({
        project,
        file: toPosixPath(path.relative(workspaceRoot, mainPath)),
        hitCount: hits.length,
        hits,
      }, null, 2));
    },
  },
  {
    name: "list_build_config",
    title: "Listar build config",
    description: "Extrai pontos relevantes do electron-builder.yml.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        project: {
          type: "string",
          enum: ["modern-client", "MuDevs", "legacy", "app"],
          default: "modern-client",
        },
      },
    },
    handler: async (args) => {
      const project = String(args?.project || "modern-client");
      const projectDir =
        project === "MuDevs"
          ? "MuDevs"
          : project === "legacy"
            ? "mu-server-manager-legacy"
            : project === "app"
              ? "mu-server-manager-app"
              : "mu-server-manager-modern-client";

      const ymlPath = safeResolve(path.join(projectDir, "electron-builder.yml"));
      if (!(await fileExists(ymlPath))) throw new Error("electron-builder.yml não encontrado");
      const text = await fs.promises.readFile(ymlPath, "utf8");
      const lines = text.split(/\r?\n/);

      const keys = ["asar", "asarUnpack", "files", "extraResources", "win", "nsis", "appId", "productName"];
      const extracted = [];
      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        for (const k of keys) {
          if (trimmed === `${k}:` || trimmed.startsWith(`${k}: `)) {
            extracted.push({ line: i + 1, text: lines[i] });
          }
        }
      }

      return toolText(JSON.stringify({
        project,
        file: toPosixPath(path.relative(workspaceRoot, ymlPath)),
        highlights: extracted,
      }, null, 2));
    },
  },
  {
    name: "compare_backend_parity",
    title: "Comparar paridade de backend",
    description: "Compara MuDevs vs modern-client (electron + native) e resume diferenças.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        leftProject: {
          type: "string",
          enum: ["MuDevs", "modern-client", "legacy", "app"],
          default: "MuDevs",
        },
        rightProject: {
          type: "string",
          enum: ["MuDevs", "modern-client", "legacy", "app"],
          default: "modern-client",
        },
        limit: { type: "integer", minimum: 1, maximum: 20000, default: 5000 },
      },
    },
    handler: async (args) => {
      const leftProject = String(args?.leftProject || "MuDevs");
      const rightProject = String(args?.rightProject || "modern-client");
      const limit = Number.isInteger(args?.limit) ? args.limit : 5000;

      const mapDir = (p) =>
        p === "MuDevs"
          ? "MuDevs"
          : p === "legacy"
            ? "mu-server-manager-legacy"
            : p === "app"
              ? "mu-server-manager-app"
              : "mu-server-manager-modern-client";

      const leftDir = safeResolve(mapDir(leftProject));
      const rightDir = safeResolve(mapDir(rightProject));
      const leftKeyDirs = ["electron", "native"];
      const rightKeyDirs = ["electron", "native"];

      async function listKeyFiles(projectRoot, keyDirs) {
        const files = new Map();
        for (const d of keyDirs) {
          const abs = path.join(projectRoot, d);
          const st = await statSafe(abs);
          if (!st?.isDirectory()) continue;
          const items = await walkFiles(abs, {
            maxDepth: null,
            includeFiles: true,
            includeDirs: false,
            glob: null,
            limit,
          });
          for (const it of items) {
            const rel = toPosixPath(path.join(path.relative(projectRoot, abs), it.path));
            files.set(rel, path.join(abs, it.path.replaceAll("/", path.sep)));
          }
        }

        for (const extra of ["package.json", "electron-builder.yml"]) {
          const extraPath = path.join(projectRoot, extra);
          if (await fileExists(extraPath)) {
            files.set(extra, extraPath);
          }
        }

        return files;
      }

      const [leftFiles, rightFiles] = await Promise.all([
        listKeyFiles(leftDir, leftKeyDirs),
        listKeyFiles(rightDir, rightKeyDirs),
      ]);

      const allKeys = Array.from(new Set([...leftFiles.keys(), ...rightFiles.keys()])).sort((a, b) => a.localeCompare(b));
      const onlyLeft = [];
      const onlyRight = [];
      const changed = [];
      const equal = [];

      for (const key of allKeys) {
        const a = leftFiles.get(key);
        const b = rightFiles.get(key);
        if (!a) {
          onlyRight.push(key);
          continue;
        }
        if (!b) {
          onlyLeft.push(key);
          continue;
        }
        const [aBuf, bBuf] = await Promise.all([readFileBuffer(a), readFileBuffer(b)]);
        const aHash = sha256Buffer(aBuf);
        const bHash = sha256Buffer(bBuf);
        if (aHash === bHash) {
          equal.push(key);
        } else {
          changed.push({ path: key, leftSha256: aHash, rightSha256: bHash });
        }
      }

      const leftMain = path.join(leftDir, "electron", "main.cjs");
      const rightMain = path.join(rightDir, "electron", "main.cjs");
      const signals = {
        leftAutoHide: null,
        rightAutoHide: null,
        leftCleanupSteps: null,
        rightCleanupSteps: null,
      };
      if ((await fileExists(leftMain)) && (await fileExists(rightMain))) {
        const [l, r] = await Promise.all([fs.promises.readFile(leftMain, "utf8"), fs.promises.readFile(rightMain, "utf8")]);
        signals.leftAutoHide = /setTimeout\(\s*\(\)\s*=>[\s\S]*?setWindowVisibleByPid\([\s\S]*?,\s*false\s*\)/.test(l);
        signals.rightAutoHide = /setTimeout\(\s*\(\)\s*=>[\s\S]*?setWindowVisibleByPid\([\s\S]*?,\s*false\s*\)/.test(r);
        signals.leftCleanupSteps = /Passo\s+1\/6|Passo\s+6\/6/.test(l);
        signals.rightCleanupSteps = /Passo\s+1\/6|Passo\s+6\/6/.test(r);
      }

      return toolText(JSON.stringify({
        leftProject,
        rightProject,
        leftDir: toPosixPath(path.relative(workspaceRoot, leftDir)),
        rightDir: toPosixPath(path.relative(workspaceRoot, rightDir)),
        stats: {
          equal: equal.length,
          changed: changed.length,
          onlyLeft: onlyLeft.length,
          onlyRight: onlyRight.length,
        },
        signals,
        onlyLeft: onlyLeft.slice(0, 2000),
        onlyRight: onlyRight.slice(0, 2000),
        changed: changed.slice(0, 2000),
      }, null, 2));
    },
  },
];

const toolIndex = new Map(tools.map((t) => [t.name, t]));

async function handleRequest(req) {
  const { id, method, params } = req;
  try {
    if (method === "initialize") {
      return jsonRpcResult(id, {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {
            listChanged: false,
          },
        },
        serverInfo,
      });
    }

    if (method === "tools/list") {
      return jsonRpcResult(id, {
        tools: tools.map(({ handler, ...tool }) => tool),
      });
    }

    if (method === "tools/call") {
      const name = params?.name;
      const args = params?.arguments;
      if (typeof name !== "string") {
        return jsonRpcError(id, -32602, "Parâmetros inválidos");
      }
      const tool = toolIndex.get(name);
      if (!tool) {
        return jsonRpcError(id, -32601, "Tool não encontrada", { name });
      }

      const result = await tool.handler(args);
      return jsonRpcResult(id, result);
    }

    if (method === "ping") {
      return jsonRpcResult(id, {});
    }

    return jsonRpcError(id, -32601, "Método não encontrado");
  } catch (err) {
    return jsonRpcError(id, -32603, "Erro interno", {
      message: err?.message || String(err),
    });
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity,
});

rl.on("line", async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  let req;
  try {
    req = JSON.parse(trimmed);
  } catch {
    return;
  }

  if (!req || req.jsonrpc !== "2.0" || typeof req.method !== "string") return;
  if (req.id === undefined) return;

  const res = await handleRequest(req);
  if (res) writeMessage(res);
});

rl.on("close", () => {
  process.exit(0);
});

