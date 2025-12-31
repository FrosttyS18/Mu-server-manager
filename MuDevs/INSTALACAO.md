# 🛡️ Como Instalar o Server Manager

## ⚠️ Aviso Importante sobre Segurança

### Por que o Windows Defender bloqueia?

O **Server Manager** é um aplicativo **100% seguro** (verificado por 65 antivírus), mas o Windows Defender pode bloqueá-lo porque:

- ❌ Não possui assinatura digital ($500-1000/ano)
- ❌ É classificado como "Publisher desconhecido"
- ❌ Poucas pessoas baixaram ainda

**Isso NÃO significa que é um vírus!**

---

## ✅ Prova de Segurança

**VirusTotal: 0/65 antivírus detectaram ameaças**

🔗 Link do scan: https://www.virustotal.com/gui/file/d2322c96b47d58c9b3c7fadd33860f7db54da5ca664bf89cb3176f7adb99123

---

## 📦 Opções de Instalação

Você tem **2 versões** disponíveis:

### 🆕 **NSIS Installer** (Recomendado)
- Arquivo: `Server Manager-1.0.0-Setup.exe`
- Instala no sistema
- Cria atalhos automaticamente
- Desinstalador completo

### 🔧 **MSI Installer** (Mais confiável no Windows)
- Arquivo: `Server Manager-1.0.0.msi`
- Windows Installer nativo
- Geralmente **menos bloqueios** do Defender
- Integração completa com Windows

---

## 🚀 Como Instalar - Passo a Passo

### **Método 1: Desbloquear antes de executar** ✅ Mais fácil

1. **Baixe** o instalador (`.exe` ou `.msi`)
2. **Clique com botão direito** no arquivo
3. Clique em **"Propriedades"**
4. Na aba **"Geral"**, procure por **"Desbloquear"** na parte inferior
5. Marque a caixa **"Desbloquear"**
6. Clique em **"OK"** ou **"Aplicar"**
7. **Execute** o instalador normalmente

---

### **Método 2: Executar mesmo assim**

1. **Execute** o instalador
2. Quando aparecer a tela **"O Windows protegeu seu PC"**:

```
┌─────────────────────────────────────────┐
│  O Windows protegeu seu PC              │
│                                         │
│  O Windows SmartScreen impediu o        │
│  início de um aplicativo não            │
│  reconhecido...                         │
│                                         │
│        [Não executar]                   │
│        [Mais informações] ← CLIQUE AQUI│
└─────────────────────────────────────────┘
```

3. Clique em **"Mais informações"**
4. Clique em **"Executar assim mesmo"**

---

### **Método 3: Adicionar exceção no Windows Defender** (Definitivo)

Se você confia no aplicativo e não quer ver avisos toda vez:

1. Abra **Configurações do Windows** (Win + I)
2. Vá em **"Privacidade e segurança"** → **"Segurança do Windows"**
3. Clique em **"Proteção contra vírus e ameaças"**
4. Role até **"Configurações de proteção contra vírus e ameaças"**
5. Clique em **"Gerenciar configurações"**
6. Role até **"Exclusões"**
7. Clique em **"Adicionar ou remover exclusões"**
8. Clique em **"Adicionar uma exclusão"** → **"Pasta"**
9. Selecione a pasta onde o app foi instalado (geralmente `C:\Users\[VOCÊ]\AppData\Local\Programs\Server Manager`)

---

## 🎯 Qual Instalador Usar?

| Característica | NSIS (.exe) | MSI |
|----------------|-------------|-----|
| **Confiabilidade** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Bloqueios do Defender** | Mais comum | Menos comum |
| **Tamanho** | ~100 MB | ~100 MB |
| **Desinstalação** | Completa | Completa |
| **Recomendado para** | Usuários avançados | **Todos os usuários** |

**💡 Dica:** Se o `.exe` for bloqueado, tente o `.msi`!

---

## ❓ Perguntas Frequentes

### **P: Por que o Discord bloqueia o arquivo?**
**R:** Discord bloqueia arquivos `.exe` por política padrão. Use:
- Upload no Google Drive/OneDrive
- Compacte em `.zip` com senha
- Compartilhe o link do VirusTotal junto

### **P: Meu antivírus deletou o arquivo!**
**R:** Adicione uma exceção no seu antivírus antes de baixar novamente.

### **P: É seguro instalar mesmo com o aviso?**
**R:** **SIM!** O aplicativo foi scaneado por 65 antivírus diferentes e nenhum encontrou ameaças. O aviso é apenas por falta de assinatura digital.

### **P: O que é assinatura digital?**
**R:** É um certificado caro ($500-1000/ano) que "comprova" a identidade do desenvolvedor. Como este é um projeto open-source/pessoal, não foi investido em certificado ainda.

---

## 🛠️ Suporte

Se encontrar problemas durante a instalação:

1. Verifique se seu Windows está atualizado
2. Desabilite temporariamente outros antivírus (Avast, AVG, etc)
3. Execute o instalador **como Administrador** (botão direito → "Executar como administrador")
4. Tente a versão **MSI** se a versão **NSIS** não funcionar

---

## 📝 Informações Técnicas

- **Desenvolvido com:** Electron + React
- **Versão do Electron:** 39.2.7
- **Plataforma:** Windows 10/11 (64-bit)
- **Tamanho instalado:** ~250 MB
- **Requisitos:** Windows 10 1809+ ou Windows 11

---

**Desenvolvido por Dev-Frostty** 🚀

**Versão:** 1.0.0  
**Data:** Dezembro 2025
