# 📱 Bebidas ON - Guia de Instalação

## 🌐 Instalação Web (PWA) - RECOMENDADO

### Android
1. Abra o Chrome no seu celular
2. Acesse: `https://bebidas-on.vercel.app`
3. Toque no menu (⋮) → "Adicionar à tela inicial"
4. Confirme "Instalar"
5. O app aparecerá na tela inicial como um app nativo

### iOS
1. Abra o Safari no seu iPhone/iPad
2. Acesse: `https://bebidas-on.vercel.app`
3. Toque no botão compartilhar (□↗)
4. Selecione "Adicionar à Tela de Início"
5. Confirme "Adicionar"

### Desktop (Windows/Mac/Linux)
1. Abra o Chrome, Edge ou Firefox
2. Acesse: `https://bebidas-on.vercel.app`
3. Clique no ícone de instalação na barra de endereço
4. Clique "Instalar"
5. O app será instalado como programa nativo

---

## 📱 Instalação Mobile (APK/IPA)

### Android (APK)
1. **Download:** [Bebidas-ON-v2.0.0.apk](releases/android/app-release.apk)
2. **Tamanho:** ~15MB
3. **Requisitos:** Android 7.0+ (API 24)

**Instalação:**
\`\`\`bash
# Via ADB (para desenvolvedores)
adb install app-release.apk

# Via arquivo
1. Baixe o APK
2. Ative "Fontes desconhecidas" nas configurações
3. Toque no arquivo APK
4. Confirme a instalação
\`\`\`

### iOS (IPA)
1. **Download:** [Bebidas-ON-v2.0.0.ipa](releases/ios/Bebidas-ON.ipa)
2. **Tamanho:** ~20MB
3. **Requisitos:** iOS 12.0+

**Instalação:**
\`\`\`bash
# Via TestFlight (recomendado)
1. Instale o TestFlight da App Store
2. Use o link de convite fornecido
3. Instale o app pelo TestFlight

# Via Xcode (desenvolvedores)
1. Conecte o dispositivo
2. Abra o Xcode
3. Window → Devices and Simulators
4. Arraste o IPA para o dispositivo
\`\`\`

---

## 💻 Instalação Desktop

### Windows
1. **Download:** [Bebidas-ON-Setup-2.0.0.exe](releases/windows/Bebidas-ON-Setup-2.0.0.exe)
2. **Tamanho:** ~120MB
3. **Requisitos:** Windows 10+

**Instalação:**
```powershell
# Instalação silenciosa
Bebidas-ON-Setup-2.0.0.exe /S

# Instalação normal
1. Execute o instalador
2. Siga o assistente de instalação
3. Escolha o diretório (padrão: C:\Program Files\Bebidas ON)
4. Confirme a instalação
