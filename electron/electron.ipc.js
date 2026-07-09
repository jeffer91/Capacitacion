/* =========================================================
Nombre completo: electron.ipc.js
Ubicación: /electron/electron.ipc.js
Función:
- Registrar canales IPC iniciales de la app.
- Preparar comunicación segura entre renderer y proceso principal.
========================================================= */
const { app, ipcMain } = require('electron');

function registerIpcHandlers() {
  ipcMain.handle('app:ping', async () => ({ ok: true, message: 'pong' }));

  ipcMain.handle('app:get-paths', async () => ({
    userData: app.getPath('userData'),
    documents: app.getPath('documents'),
    downloads: app.getPath('downloads')
  }));
}

module.exports = {
  registerIpcHandlers
};
