---
name: "release-build-audit"
description: "Audita build/release do Electron (asar/asarUnpack/artefatos). Invoque ao mexer em electron-builder, ao falhar build, ou quando dev ≠ prod."
---

# Release Build Audit

Objetivo: garantir que o comportamento do app empacotado (prod) seja o mesmo do dev, principalmente em relação a paths, native modules e arquivos incluídos.

## O que checar

- `electron-builder.yml`: `files`, `asarUnpack`, `directories.output`.
- Carregamento de `preload.cjs` e `main.cjs`.
- Caminho de carregamento do addon nativo em prod (`app.asar.unpacked`).

## Procedimento

1. Mapear diferenças dev vs prod
   - URLs (`localhost`) vs `dist/index.html`.
2. Verificar inclusão no build
   - `native/**/*.node` e dependências necessárias.
3. Validar geração do artefato
   - Rodar build do projeto conforme scripts.
4. Checar sintomas comuns
   - Addon não carrega, preload não expõe API, paths quebrados.

## Saída esperada

- Lista do que precisa entrar no build e por quê.
- Patch do `electron-builder.yml` quando necessário.
