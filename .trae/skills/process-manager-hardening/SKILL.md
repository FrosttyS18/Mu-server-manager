---
name: "process-manager-hardening"
description: "Endurece start/stop/restart, watchdog e crash detection. Invoque ao mexer no gerenciamento de processos ou investigar crashes, fila e estados manuais."
---

# Process Manager Hardening

Objetivo: melhorar robustez do gerenciamento de processos (spawn/taskkill), detecção de crash e reconciliação de estado entre main e renderer.

## Pontos críticos

- `manualStop` vs crash real (não disparar auto-restart em stop manual).
- Watchdog vs evento `exit` (dupla detecção e debounce).
- Fila de crashes (processamento sequencial, sem deadlock).
- Visibilidade de janela (show/hide) e timing.

## Procedimento

1. Mapear o fluxo real
   - start → running map → exit/watchdog → evento → atualização no renderer.
2. Regras de consistência
   - Nunca assumir que `exit` sempre dispara.
   - Evitar “stale state” no renderer (usar refs quando necessário).
3. Ajustar com mudanças pequenas
   - Um risco por vez: watchdog, debounce, stop manual, cleanup.
4. Validar comportamento
   - Simular kill via task manager (quando possível).
   - Confirmar que flags do evento batem com o esperado.

## Saída esperada

- Lista de invariantes do fluxo.
- Patch mínimo com validação.
