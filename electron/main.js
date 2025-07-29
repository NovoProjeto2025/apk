const { app, BrowserWindow, Menu, shell, dialog } = require("electron")
const { autoUpdater } = require("electron-updater")
const path = require("path")
const isDev = require("electron-is-dev")

let mainWindow

// Configuração do auto-updater
autoUpdater.checkForUpdatesAndNotify()

function createWindow() {
  // Criar a janela principal
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, "../public/logo.png"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
    },
    titleBarStyle: "default",
    show: false,
  })

  // Carregar o app
  const startUrl = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../out/index.html")}`

  mainWindow.loadURL(startUrl)

  // Mostrar quando estiver pronto
  mainWindow.once("ready-to-show", () => {
    mainWindow.show()

    if (isDev) {
      mainWindow.webContents.openDevTools()
    }
  })

  // Configurar menu
  const template = [
    {
      label: "Arquivo",
      submenu: [
        {
          label: "Novo Pedido",
          accelerator: "CmdOrCtrl+N",
          click: () => {
            mainWindow.webContents.send("new-order")
          },
        },
        { type: "separator" },
        {
          label: "Sair",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
          click: () => {
            app.quit()
          },
        },
      ],
    },
    {
      label: "Editar",
      submenu: [
        { role: "undo", label: "Desfazer" },
        { role: "redo", label: "Refazer" },
        { type: "separator" },
        { role: "cut", label: "Recortar" },
        { role: "copy", label: "Copiar" },
        { role: "paste", label: "Colar" },
      ],
    },
    {
      label: "Visualizar",
      submenu: [
        { role: "reload", label: "Recarregar" },
        { role: "forceReload", label: "Forçar Recarga" },
        { role: "toggleDevTools", label: "Ferramentas do Desenvolvedor" },
        { type: "separator" },
        { role: "resetZoom", label: "Zoom Normal" },
        { role: "zoomIn", label: "Aumentar Zoom" },
        { role: "zoomOut", label: "Diminuir Zoom" },
        { type: "separator" },
        { role: "togglefullscreen", label: "Tela Cheia" },
      ],
    },
    {
      label: "Ajuda",
      submenu: [
        {
          label: "Sobre Bebidas ON",
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: "info",
              title: "Sobre Bebidas ON",
              message: "Bebidas ON v2.0.0",
              detail:
                "Sistema completo para gestão do seu negócio de bebidas.\n\nDesenvolvido por GV SOFTWARE\n© 2025 Todos os direitos reservados.",
            })
          },
        },
        {
          label: "Suporte",
          click: () => {
            shell.openExternal("https://github.com/gvsoftware/bebidas-on/issues")
          },
        },
      ],
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // Interceptar links externos
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: "deny" }
  })
}

// Eventos do app
app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Auto-updater events
autoUpdater.on("update-available", () => {
  dialog.showMessageBox(mainWindow, {
    type: "info",
    title: "Atualização disponível",
    message: "Uma nova versão está disponível. Será baixada em segundo plano.",
    buttons: ["OK"],
  })
})

autoUpdater.on("update-downloaded", () => {
  dialog
    .showMessageBox(mainWindow, {
      type: "info",
      title: "Atualização pronta",
      message: "A atualização foi baixada. Reinicie o aplicativo para aplicar.",
      buttons: ["Reiniciar", "Depois"],
    })
    .then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall()
      }
    })
})
