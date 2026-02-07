---
name: "paridade-mudevs-modern"
description: "Compara MuDevs vs modern-client no backend e sincroniza correções. Invoque ao portar mudanças entre versões ou evitar divergência de funcionamento."
---

# Paridade MuDevs ↔ Modern Client (Backend)

Objetivo: garantir que o funcionamento do backend (Electron main/preload, IPC e addons nativos) esteja alinhado entre MuDevs e mu-server-manager-modern-client.

## Escopo

- Electron main process: handlers IPC, spawn/taskkill, watchdog, métricas, cleanup/lifecycle.
- Preload (contextBridge): contrato exposto ao renderer.
- Native addons: win-window e demais módulos nativos (ABI, asarUnpack, carregamento dev/prod).

## Procedimento

1. Definir baseline
   - MuDevs é a referência do comportamento atual.
2. Comparar artefatos críticos
   - Hash/compare de electron/main.cjs e electron/preload.cjs.
   - Hash/compare de native/**.
3. Classificar diferenças
   - Diferença de funcionamento (alta prioridade): muda runtime, fluxo, timers, IPC, flags.
   - Diferença de build/dev (média): DevTools, caminhos de output, logs.
   - Diferença cosmética (baixa): mensagens/strings.
4. Sincronizar com mudanças mínimas
   - Portar a correção para modern-client mantendo API/contrato.
5. Validar
   - Rodar lint/typecheck/test/build conforme scripts do projeto.

## Saída esperada

- Lista objetiva de diferenças por arquivo.
- Indicação do que afeta funcionamento.
- Patch aplicado no modern-client quando necessário.
