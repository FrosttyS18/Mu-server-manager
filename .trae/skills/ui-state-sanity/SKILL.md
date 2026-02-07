---
name: "ui-state-sanity"
description: "Reduz bugs de estado no renderer (stale closures/refs/efeitos). Invoque ao mexer no App monolítico, hooks, timers, ou quando estado fica inconsistente."
---

# UI State Sanity

Objetivo: manter o estado do renderer consistente (React), reduzindo riscos típicos do App monolítico e de lógica com timers/listeners.

## Procedimento

1. Identificar pontos de risco
   - `useEffect` com dependências incorretas.
   - callbacks usando estado antigo.
   - timers/listeners sem cleanup.
2. Estratégia segura
   - Preferir `useRef` para estado “sempre atual” em callbacks.
   - Encapsular lógica em hooks quando fizer sentido.
3. Refatoração sem quebra
   - Aplicar a regra de backup ao extrair de arquivo monolítico.
4. Validar
   - Lint/typecheck/test/build.

## Saída esperada

- Lista de riscos encontrados.
- Patch pequeno e verificável.
