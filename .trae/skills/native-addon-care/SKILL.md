---
name: "native-addon-care"
description: "Altera addons nativos com segurança (Win32/node-gyp/asarUnpack). Invoque ao mexer em native/**, ABI, carregamento dev/prod ou bugs de janela."
---

# Native Addon Care

Objetivo: fazer mudanças seguras nos módulos nativos (ex.: win-window) sem quebrar build, empacotamento e compatibilidade do Electron.

## Procedimento

1. Confirmar compatibilidade
   - Versão do Electron/Node ABI alvo.
   - Caminho de carregamento em dev e em prod (asar.unpacked).
2. Mudanças pequenas
   - Alterar uma responsabilidade por vez.
   - Evitar alterações de assinatura pública sem migrar chamadores.
3. Build e empacotamento
   - Validar `binding.gyp` e a inclusão em `asarUnpack`.
   - Garantir que o `.node` é copiado no build final.
4. Validação
   - Compilar addon quando necessário e validar chamadas via IPC.

## Saída esperada

- Patch mínimo, com verificação de build/pack.
