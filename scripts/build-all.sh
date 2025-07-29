#!/bin/bash

echo "🚀 Iniciando build para todas as plataformas..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Limpar builds anteriores
log "Limpando builds anteriores..."
rm -rf dist/
rm -rf out/
rm -rf android/app/build/
rm -rf ios/App/build/

# Build web
log "🌐 Construindo versão web..."
npm run export
if [ $? -eq 0 ]; then
    success "Build web concluído"
else
    error "Falha no build web"
    exit 1
fi

# Build Android
log "🤖 Construindo APK para Android..."
if [ -d "android" ]; then
    npm run build:android
    if [ $? -eq 0 ]; then
        success "APK Android gerado em android/app/build/outputs/apk/release/"
    else
        error "Falha no build Android"
    fi
else
    warning "Pasta android não encontrada. Execute: npx cap add android"
fi

# Build iOS (apenas no macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    log "🍎 Construindo IPA para iOS..."
    if [ -d "ios" ]; then
        npm run build:ios
        if [ $? -eq 0 ]; then
            success "IPA iOS gerado"
        else
            error "Falha no build iOS"
        fi
    else
        warning "Pasta ios não encontrada. Execute: npx cap add ios"
    fi
else
    warning "Build iOS disponível apenas no macOS"
fi

# Build Windows
log "🪟 Construindo instalador Windows..."
npm run build:windows
if [ $? -eq 0 ]; then
    success "Instalador Windows gerado em dist/"
else
    error "Falha no build Windows"
fi

# Build macOS (apenas no macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    log "🍎 Construindo DMG para macOS..."
    npm run build:mac
    if [ $? -eq 0 ]; then
        success "DMG macOS gerado em dist/"
    else
        error "Falha no build macOS"
    fi
else
    warning "Build macOS disponível apenas no macOS"
fi

# Build Linux
log "🐧 Construindo pacote Linux..."
npm run build:linux
if [ $? -eq 0 ]; then
    success "Pacote Linux gerado em dist/"
else
    error "Falha no build Linux"
fi

log "🎉 Build completo! Verifique a pasta dist/ para os instaladores."

# Listar arquivos gerados
echo ""
log "📦 Arquivos gerados:"
find dist/ -name "*.exe" -o -name "*.dmg" -o -name "*.pkg" -o -name "*.deb" -o -name "*.AppImage" 2>/dev/null | while read file; do
    size=$(du -h "$file" | cut -f1)
    echo "  📄 $(basename "$file") ($size)"
done

find android/app/build/outputs/apk/release/ -name "*.apk" 2>/dev/null | while read file; do
    size=$(du -h "$file" | cut -f1)
    echo "  📱 $(basename "$file") ($size)"
done
