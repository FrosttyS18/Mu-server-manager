================================================================================
                        MU SERVER MANAGER - VERSÃO LEGACY
================================================================================

Aplicação desktop para Windows que gerencia múltiplos processos de servidores 
do jogo MU Online com interface moderna, sistema de auto-restart inteligente, 
monitoramento em tempo real e backup de banco de dados.

⚠️ VERSÃO LEGACY - Compatível com Windows 7/8/10 (Electron 30.5.1)

================================================================================
📋 CARACTERÍSTICAS
================================================================================

✅ Gerenciamento completo de processos (Start/Stop/Restart)
✅ Auto-restart inteligente com sistema de fila
✅ Monitoramento em tempo real (CPU e RAM)
✅ Controle de janelas via Win32 API (Show/Hide)
✅ Backup MySQL e MSSQL
✅ Interface moderna com tema dark
✅ Drag & Drop para reordenar processos
✅ Sistema de notificações (Toast)
✅ Watchdog para detectar crashes (inclusive pelo Task Manager)
✅ Compatível com Windows 7 e 8 (diferencial desta versão)

================================================================================
🏗️ STACK TÉCNICO
================================================================================

Frontend:  React 19.2.0 + Vite 7.2.4
Desktop:   Electron 30.5.1 (LEGACY - Windows 7/8 support)
Styling:   TailwindCSS 4.1.18
Build:     Electron Builder 25.1.8

Dependências Principais:
- mssql (12.2.0) - SQL Server
- mysql2 (3.16.0) - MySQL
- pidusage (4.0.1) - Monitoramento de processos
- Native Addons C++ (win-window) - Controle Win32 API

================================================================================
🚀 INSTALAÇÃO E USO
================================================================================

INSTALAR DEPENDÊNCIAS:
----------------------
npm install

MODO DESENVOLVIMENTO:
---------------------
npm run app
# Inicia Vite dev server + Electron em modo debug

BUILD PRODUÇÃO:
---------------
npm run build:electron
# Gera instalador em: release/Instalador Legacy/Server Manager Legacy-1.0.0-Setup.exe

OUTROS COMANDOS:
----------------
npm run dev               # Apenas Vite dev server
npm run build             # Build frontend apenas
npm run build:electron:dir # Build sem criar instalador

================================================================================
📁 ESTRUTURA DO PROJETO
================================================================================

mu-server-manager-legacy/
├── electron/
│   ├── main.cjs          # Processo principal (IPC, spawn, watchdog)
│   ├── preload.cjs       # Bridge seguro (contextBridge)
│   └── splash.html       # Tela de splash
├── src/
│   ├── App.jsx           # Componente principal (3015 linhas)
│   ├── hooks/
│   │   ├── useCrashDetection.js  # Auto-restart e fila
│   │   ├── useProcesses.js       # Gerenciamento de processos
│   │   ├── useMetrics.js         # Monitoramento CPU/RAM
│   │   └── useGlowPointer.js     # Efeito spotlight
│   ├── components/
│   │   ├── Modals/
│   │   │   ├── CrashModal.jsx    # Modal de crash com fila
│   │   │   └── ConfirmModal.jsx  # Modal de confirmação
│   │   ├── CustomSelect.jsx      # Select customizado
│   │   └── Icon.jsx              # Componente de ícones
│   └── assets/           # Imagens e ícones
├── native/
│   ├── win-window/       # Addon C++ para Win32 (ShowWindow)
│   └── hello-addon/      # Addon exemplo
├── build/
│   └── icon.ico          # Ícone do app
├── release/              # Output do build
│   ├── Instalador Legacy/
│   └── Portable Legacy/
├── electron-builder.yml  # Config de build
└── package.json

================================================================================
🔧 PROCESSOS GERENCIADOS (PADRÃO)
================================================================================

1. ChatServe.exe      - Servidor de chat
2. ConnectServe.exe   - Servidor de conexão
3. DataServer.exe     - Servidor de dados
4. ExDataServer.exe   - Servidor de dados estendido
5. JoinServer.exe     - Servidor de entrada
6. GameServer.exe     - Servidor principal do jogo
7. GameServerCS.exe   - Servidor Castle Siege

Nota: Você pode adicionar processos customizados pela interface.

================================================================================
⚙️ FUNCIONALIDADES PRINCIPAIS
================================================================================

1. GERENCIAMENTO DE PROCESSOS
------------------------------
- Start/Stop/Restart individual
- Start All/Stop All/Restart All (com delay de 2s)
- Show All/Hide All Windows (via Win32 API)
- Drag & Drop para reordenar
- Adicionar/Remover processos customizados

2. AUTO-RESTART INTELIGENTE
----------------------------
- Detecta crashes automaticamente
- Sistema de fila para múltiplos crashes simultâneos
- Até 3 tentativas automáticas com countdown (10s normal, 5s se 3+ na fila)
- Modal de intervenção manual após 3 falhas
- Watchdog que detecta processos mortos a cada 2s (inclusive Task Manager)
- Debounce para evitar detecção duplicada

3. MONITORAMENTO EM TEMPO REAL
-------------------------------
- CPU% de cada processo
- RAM (MB) de cada processo
- PID e status (Running/Stopped)
- Atualização a cada 1 segundo

4. BACKUP DE BANCO DE DADOS
----------------------------
- Suporta MySQL e MSSQL
- Configuração via modal (Host, Port, User, Password, DB)
- Execução com feedback de progresso

5. INTERFACE UI/UX
------------------
- Tema dark com gradientes e backdrop blur
- Spotlight effect (glow que segue o mouse)
- Toast notifications (máximo 3 simultâneos)
- Console modal com histórico de logs
- Sidebar com nome do servidor + logo customizável
- Persistência de configurações no localStorage

================================================================================
🔌 ELECTRON IPC API
================================================================================

HANDLERS (Main → Renderer):
---------------------------
- process-start          → Inicia processo
- process-stop           → Para processo
- get-process-metrics    → Retorna CPU/RAM
- show-window            → Mostra janela do processo
- hide-window            → Oculta janela do processo
- database-backup        → Executa backup

EVENTS (Main → Renderer):
-------------------------
- process-exited         → Notifica quando processo termina

================================================================================
⚠️ DIFERENÇAS DA VERSÃO MODERNA
================================================================================

VERSÃO LEGACY (Esta):
---------------------
- Electron 30.5.1
- Compatível com Windows 7/8/10/11
- Menor tamanho de build
- Algumas features limitadas do Electron mais recente

VERSÃO MODERNA:
---------------
- Electron 39.2.7
- Apenas Windows 10/11
- Recursos mais recentes do Electron
- Melhor performance

QUAL ESCOLHER?
--------------
- Use LEGACY se precisa suportar Windows 7/8
- Use MODERNA se seus usuários têm Windows 10/11

================================================================================
🚨 SOLUÇÃO DE PROBLEMAS
================================================================================

PROBLEMA: "Cannot find module './lib/...'"
SOLUÇÃO: Verifique asarUnpack no electron-builder.yml

PROBLEMA: Botões não funcionam
SOLUÇÃO: Limpe cache (delete node_modules, dist, release) e rebuilde

PROBLEMA: Auto-restart não detecta crashes
SOLUÇÃO: Confirme que watchdog está rodando (veja console do Electron)

PROBLEMA: Build muito grande
SOLUÇÃO: Confirme otimizações no electron-builder.yml

PROBLEMA: "Não funciona no Windows 7"
SOLUÇÃO: Esta versão LEGACY foi feita para isso. Se não funcionar, verifique
         se tem .NET Framework 4.5+ instalado

================================================================================
🎨 ÍCONES E ASSETS
================================================================================

ÍCONE DO APP (OBRIGATÓRIO):
---------------------------
Arquivo: build/icon.ico
Formato: ICO multi-size (16, 32, 48, 64, 128, 256px)
Como criar: https://icoconvert.com/

O ícone atual já está configurado e pronto para uso.

================================================================================
📦 BUILD E DISTRIBUIÇÃO
================================================================================

GERAR INSTALADOR:
-----------------
npm run build:electron

OUTPUT:
-------
release/Instalador Legacy/Server Manager Legacy-1.0.0-Setup.exe  # Instalador
release/Portable Legacy/                                         # Portátil

TAMANHO APROXIMADO:
-------------------
Instalador: ~130-180 MB (menor que a versão moderna)
Instalado: ~280-350 MB

REQUISITOS DO SISTEMA:
----------------------
- Windows 7 SP1 ou superior (32/64-bit)
- 2 GB RAM mínimo (4 GB recomendado)
- 500 MB espaço em disco
- .NET Framework 4.5+ (Windows 7)

================================================================================
🔑 INFORMAÇÕES TÉCNICAS IMPORTANTES
================================================================================

1. STALE CLOSURES:
------------------
Este projeto usa processesRef (useRef) para evitar stale closures.
SEMPRE acesse processes via processesRef.current em callbacks.

2. SISTEMA DE FILA:
-------------------
- crashQueueRef gerencia crashes múltiplos
- processingQueueRef evita countdown simultâneo
- processNextInQueue() processa sequencialmente

3. WATCHDOG:
------------
Roda a cada 2s no main process para detectar processos mortos que não
acionam o event 'exit' (ex: kill pelo Task Manager).

4. NATIVE ADDONS:
-----------------
win-window está configurado em asarUnpack para funcionar em produção.
Compilado com node-gyp (ABI 127) para Electron 30.

5. DELAY ENTRE STARTS:
----------------------
2-3s entre cada processo em "Start All" para evitar race conditions.
3.5s após start individual para dar tempo do modal MUDEVS aparecer.

================================================================================
📝 NOTAS DE DESENVOLVIMENTO
================================================================================

PADRÕES DE CÓDIGO:
------------------
- useState para UI state
- useRef para valores mutáveis (evita stale closures)
- useCallback para funções que são dependencies
- useEffect para side effects e cleanup

DEBUGGING:
----------
Em desenvolvimento, DevTools abre automaticamente.
Em produção, DevTools está desabilitado.

PERFORMANCE:
------------
- Métricas atualizadas a cada 1s (ajustável)
- Watchdog roda a cada 2s (ajustável)
- Toast auto-dismiss após 4s
- Máximo 50 logs no console modal

COMPATIBILIDADE WINDOWS 7:
---------------------------
Esta versão foi testada e é compatível com Windows 7 SP1.
Certifique-se de ter .NET Framework 4.5+ instalado.

================================================================================
📄 LICENÇA
================================================================================

Veja LICENSE.txt para detalhes.

================================================================================
🆘 SUPORTE
================================================================================

Para problemas, bugs ou sugestões, consulte a documentação completa em:
RESUMO_PROJETO_MU_SERVER_MANAGER.md (na raiz do projeto)

================================================================================
Desenvolvido com ❤️ para a comunidade MU Online
Versão Legacy - Suporte para Windows 7/8
================================================================================
