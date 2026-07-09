/* =========================================================
Nombre completo: main.js
Ubicación: /electron/main.js
Función:
- Levantar la aplicación Electron.
- Crear la ventana principal.
- Cargar index.html.
- Mantener configuración segura para el renderer.
========================================================= */
const path = require('path');
const { app, BrowserWindow } = require('electron');
const { registerIpcHandlers } = require('./electron.ipc');

const isDev = !app.isPackaged;

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1366,
    height: 820,
    minWidth: 1100,
    minHeight: 700,
    show: false,
    backgroundColor: '#f4f7fb',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    if (isDev) {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  });

  return mainWindow;
}

app.whenReady().then(() => {
  registerIpcHandlers();
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
