---
name: "sql-backup-basico"
description: "Garante backup SQL/MySQL básico e confiável (sem criptografia). Invoque ao mexer em conexão/backup, timeouts, validação de path ou erros de DB."
---

# SQL Backup Básico (MuOnline)

Objetivo: manter o backup de banco (SQL Server / MySQL) simples e confiável para o uso do MuOnline, sem adicionar criptografia/complexidade desnecessária.

## Princípios

- Sem “moda”: não introduzir criptografia/armazenamento sofisticado de segredo.
- Prioridade é confiabilidade: validação, mensagens claras, e tratamento de erro.

## Procedimento

1. Validar entrada
   - Host/porta/user/password/database.
   - Pasta de backup (existência, normalização).
2. Timeouts e mensagens
   - Evitar travas de UI (timeouts razoáveis).
   - Erros retornam `ok:false` com mensagem amigável.
3. Segurança pragmática
   - Não logar senha.
   - Sanitizar nome de database e caminhos para evitar injection/path traversal.
4. Validar execução
   - Testar fluxo: conectar → listar DBs → backup → validar arquivo gerado.

## Saída esperada

- Patch mínimo e confiável.
- Lista do que foi validado e por quê.
