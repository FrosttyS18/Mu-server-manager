---
name: "refatoracao-segura"
description: "Refatora com segurança e sem quebrar comportamento. Invoque ao pedir refactor/migração de módulo, especialmente em arquivos monolíticos/grandes."
---

# Refatoração Segura

Use esta skill quando o objetivo for refatorar código mantendo o comportamento, com mudanças pequenas, verificáveis e fáceis de reverter.

## Regras inegociáveis

### 1) Preservar comportamento

- Refatoração não muda requisito nem contrato público sem solicitação explícita.
- Se existir risco de breaking change, listar impacto e ajustar os chamadores no mesmo ciclo.

### 2) Regra para arquivo monolítico (obrigatória)

Se a refatoração envolver extrair/organizar um arquivo monolítico (grande, com múltiplas responsabilidades):

1. Criar backup do arquivo monolítico como “fonte de verdade” temporária para consulta/restauração.
2. Criar o(s) módulo(s) novo(s) (arquivo(s) novo(s) com nome e responsabilidade clara).
3. Copiar/migrar o código para o(s) módulo(s) novo(s), mantendo o arquivo monolítico intacto.
4. Ajustar imports/exports e integrar o novo módulo mantendo compatibilidade.
5. Validar funcionamento (build/lint/test/typecheck conforme o projeto).
6. Somente depois remover a duplicata do arquivo monolítico.

O backup só é removido quando a refatoração estiver estável e validada.

## Procedimento padrão (checklist)

1. Mapear o contrato atual
   - Quem chama, o que exporta, quais efeitos colaterais, quais formatos de dados.
2. Definir fronteira da mudança
   - O que entra/sai do módulo, e qual API o restante do sistema vai usar.
3. Refatorar em passos curtos
   - Um passo por commit lógico (mesmo sem commitar), evitando mudanças “gigantes”.
4. Garantir reversibilidade
   - Sempre manter um caminho de rollback simples até validar tudo.
5. Validar com o pipeline do projeto
   - Rodar lint e typecheck (se existirem) e testes relevantes.

## Sinais de alerta (pausar e replanejar)

- Muitos arquivos dependem do módulo e a mudança exige alteração de contrato.
- Há lógica acoplada a estado global/efeitos colaterais não explícitos.
- Não existe teste: priorizar validações rápidas (lint/typecheck/build) e adicionar teste mínimo quando fizer sentido.

## Saída esperada

- Lista curta dos arquivos afetados.
- Diferenças principais e impacto.
- Refatoração aplicada com validação (lint/typecheck/test/build) ou justificativa se algum passo não existir no projeto.
