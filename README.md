
# 🌊 Lago Jaboti App

Aplicativo mobile informativo sobre o Lago Jaboti, desenvolvido com **React Native**, **Expo** e **TypeScript**.

## 📱 Executando o app no seu celular

Siga os passos abaixo para rodar o app usando o **Expo Go** no seu dispositivo Android ou iOS:

---

### ✅ 1. Pré-requisitos

- **Node.js** instalado → [Baixar aqui](https://nodejs.org/)
- **npm** (ou **yarn**) instalado
- App **Expo Go** instalado no seu celular:
  - [Play Store (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779)

> ❗ **Você NÃO precisa instalar o `expo-cli` globalmente.** Tudo já está configurado no projeto!

---

### 🚀 2. Instalando dependências

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/lago-jaboti-app.git
cd lago-jaboti-app
```

Instale as dependências:

```bash
npm install
# ou
yarn
```

---

### ▶️ 3. Executando o projeto

Use o script já configurado:

```bash
npm run web
```

Isso abrirá o navegador com o **Expo Developer Tools**. Aponte a câmera do celular para o **QR Code** que aparece ou escaneie direto pelo app **Expo Go**.

🎉 O app abrirá direto no seu celular!

---

### 🛠️ Tecnologias utilizadas

- React Native com Expo
- TypeScript
- React Navigation
- Expo Router

---

### 📂 Estrutura do projeto

```
/assets         → imagens e fontes
/app            → telas e componentes
/app/(drawer)/index.tsx  → tela inicial
/app/(drawer)   → rotas com menu lateral
```

---

### 🧼 Dicas úteis

- Se o app não abrir no celular: feche o Expo Go e escaneie de novo.
- Se estiver em rede diferente (Wi-Fi vs dados), pode não funcionar o QR. Tente com `npx expo start --tunnel` se precisar.

---
