---
name: "ipc-contract-guard"
description: "Valida e protege o contrato IPC (handlers/payloads/eventos). Invoque ao mudar preload/main, adicionar handlers ou investigar quebra entre renderer e main."
---

# IPC Contract Guard

Objetivo: manter o contrato entre renderer ↔ preload ↔ main consistente, evitando que mudanças em um lado quebrem o outro.

## O que validar

- Nomes dos canais IPC (`ipcMain.handle/on` e `ipcRenderer.invoke/on/send`).
- Formato dos payloads (campos obrigatórios/opcionais e defaults).
- Semântica dos retornos (`{ ok, error, ... }`), inclusive erros e flags.
- Eventos emitidos do main para o renderer (ex.: `process-exited`, `metrics-update`).

## Procedimento

1. Mapear o contrato atual
   - Listar handlers existentes no main.
   - Listar funções expostas no preload.
2. Confirmar alinhamento
   - Cada função exposta chama o canal certo.
   - O renderer usa apenas o que o preload expõe.
3. Mudanças seguras
   - Evoluir payload com compatibilidade (adicionar campos opcionais antes de tornar obrigatório).
   - Manter shape do retorno ou migrar chamadores na mesma alteração.
4. Validação
   - Lint/typecheck/test/build.

## Saída esperada

- Tabela curta “canal → payload → retorno/evento”.
- Lista de incompatibilidades encontradas e patch proposto.
