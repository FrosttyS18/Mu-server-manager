# MU Server Manager Modern

Aplicação desktop para Windows que gerencia múltiplos processos de servidores do jogo MU Online.

- **Versão do app:** 2.0.0
- **Distribuição:** MSI (Windows x64)

## Principais recursos

- Start/Stop/Restart individual e em lote
- Auto-restart com fila e limite de tentativas
- Watchdog no processo principal (detecta encerramentos “forçados”)
- Monitoramento de CPU/RAM por processo
- Controle de janela via Win32 (mostrar/ocultar)
- Backup de banco: SQL Server (mssql) e MySQL (mysql2)
- UI moderna (tema dark, toasts, console de logs, sidebar customizável)

## Stack

- Frontend: React 19 + Vite 7
- Desktop: Electron 39
- Styling: TailwindCSS 4
- Build: electron-builder 25 (MSI)

## Requisitos

- Windows 10/11 (x64)
- Node.js 20+ (recomendado) e npm

Para compilar addons nativos localmente (node-gyp):

- Python 3
- Visual Studio Build Tools (C++ Desktop)

## Como rodar (dev)

Instale as dependências:

```bash
npm install
```

Rodar o app em desenvolvimento (Vite + Electron):

```bash
npm run app
```

Comandos úteis:

```bash
npm run dev
npm run electron
npm run lint
```

## Build (MSI)

Gera o build de produção e o instalador MSI:

```bash
npm run build:electron
```

Saída gerada em:

- `dist-electron/Server Manager Modern-<version>-Setup.msi`
- `dist-electron/win-unpacked/` (diretório empacotado, gerado junto do MSI)

## Estrutura do projeto

```text
mu-server-manager-modern-client/
├─ electron/
│  ├─ main.cjs            # Processo principal (IPC, spawn, watchdog)
│  ├─ preload.cjs         # Bridge seguro (contextBridge)
│  ├─ splash.html
│  └─ splash.css
├─ src/
│  ├─ App.jsx             # UI principal
│  ├─ main.jsx            # Bootstrap React
│  ├─ hooks/              # Hooks (crash detection, métricas, etc.)
│  ├─ components/         # Componentes (modais, ícones, selects)
│  ├─ i18n/               # Traduções
│  └─ assets/             # Ícones e imagens
├─ native/
│  ├─ win-window/         # Addon C++ (Win32 window control)
│  └─ hello-addon/        # Addon de exemplo
├─ build/                 # Recursos do app (ícones)
├─ scripts/               # Scripts utilitários (geração de ícones)
├─ electron-builder.yml
├─ eslint.config.js
├─ vite.config.js
├─ package.json
└─ package-lock.json
```

Notas:

- `dist/` e `dist-electron/` são saídas de build e não devem ser versionadas.

## Electron IPC (contrato)

Handlers (Main → Renderer):

- `process-start` → inicia processo
- `process-stop` → para processo
- `get-process-metrics` → retorna CPU/RAM
- `show-window` → mostra a janela do processo
- `hide-window` → oculta a janela do processo
- `database-backup` → executa backup

Events (Main → Renderer):

- `process-exited` → notifica término/crash

## Contribuindo

- Abra uma issue descrevendo o problema/feature.
- Faça um fork e crie uma branch.
- Rode `npm run lint` antes do PR.

## Licença

Veja [LICENSE.txt](./LICENSE.txt).
