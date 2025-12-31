# Ambiente MuDevs

Este é o ambiente de desenvolvimento MuDevs, criado a partir da versão otimizada do Server Manager Modern Client.

## Data de Criação
30 de dezembro de 2025

## Versão Base
- Projeto: mu-server-manager-modern-client
- Versão: 1.0.0
- Status: Versão otimizada com melhorias de GPU

## Otimizações Aplicadas

### GPU e Performance
- ✅ Animações infinitas removidas (neon, botões, engrenagem)
- ✅ Blur reduzido e estático (sem animação)
- ✅ `will-change` removido onde não necessário
- ✅ Cleanup completo de recursos ao fechar aplicação
- ✅ `requestAnimationFrame` cancelado no cleanup

### Funcionalidades
- ✅ Versão ADMIN com auto-click ativo
- ✅ Todas as funções lógicas preservadas
- ✅ Cleanup de recursos relacionado à GPU implementado

## Estrutura
```
MuDevs/
├── src/              # Código fonte React
├── electron/         # Processo principal Electron
├── native/           # Addons nativos (win-window)
├── build/            # Ícones e assets
└── package.json      # Dependências
```

## Próximos Passos
1. Instalar dependências: `npm install`
2. Desenvolvimento: `npm run dev`
3. Build: `npm run build`
4. Distribuição: `npm run dist`
