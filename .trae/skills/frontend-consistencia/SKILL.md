---
name: "frontend-consistencia"
description: "Garante consistência de UI/estado e padrões do repo. Invoque ao criar features React no App.jsx, adicionar componentes/hooks, ou refatorar UX sem quebrar comportamento."
---

# Frontend Consistência

## Objetivo

Padronizar mudanças no renderer (React) para manter o código limpo, consistente e fácil de manter, com foco em segurança de estado e UX.

## Quando invocar

- Ao criar features de UI no renderer (especialmente em App.jsx monolítico).
- Ao adicionar fluxo com múltiplos estados (abas, filtros, modais, timers, drag & drop).
- Ao mexer em persistência (IPC/localStorage) ou em listas com reordenação.

## Regras do repo

- Não adicionar comentários.
- Manter padrão de hooks e callbacks já usados (useRef para estado atual, useCallback para handlers).
- Evitar side-effects sem cleanup (event listeners, timers).
- Não assumir libs externas; usar o que já existe no projeto.

## Checklist de implementação

- Mapear fluxos que mudam estado (UI ↔ IPC ↔ persistência).
- Garantir IDs estáveis (sem colisões) para entidades de runtime.
- Separar “config persistida” de “estado runtime” (running, selected, checked).
- Evitar salvar estado runtime em disco.
- Validar em dev com Electron + Vite.
- Rodar lint antes de finalizar.

## Padrões práticos

- Preferir adaptadores para não reescrever o App inteiro de uma vez.
- Atualizações que precisam enxergar “estado atual” dentro de callbacks devem usar refs.
- Para UX crítica (ex.: fechar aba), sempre usar confirmação quando houver risco de perda.

