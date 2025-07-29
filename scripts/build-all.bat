@echo off
echo 🚀 Iniciando build para todas as plataformas...

REM Limpar builds anteriores
echo Limpando builds anteriores...
if exist dist rmdir /s /q dist
if exist out rmdir /s /q out
if exist android\app\build rmdir /s /q android\app\build

REM Build web
echo 🌐 Construindo versão web...
call npm run export
if %errorlevel% neq 0 (
    echo ❌ Falha no build web
    exit /b 1
)
echo ✅ Build web concluído

REM Build Android
echo 🤖 Construindo APK para Android...
if exist android (
    call npm run build:android
    if %errorlevel% equ 0 (
        echo ✅ APK Android gerado
    ) else (
        echo ❌ Falha no build Android
    )
) else (
    echo ⚠️ Pasta android não encontrada. Execute: npx cap add android
)

REM Build Windows
echo 🪟 Construindo instalador Windows...
call npm run build:windows
if %errorlevel% equ 0 (
    echo ✅ Instalador Windows gerado em dist/
) else (
    echo ❌ Falha no build Windows
)

echo 🎉 Build completo! Verifique a pasta dist/ para os instaladores.
pause
