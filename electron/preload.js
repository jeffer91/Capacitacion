/* =========================================================
Nombre completo: preload.js
Ubicación: /electron/preload.js
Función:
- Exponer funciones seguras al renderer.
- Evitar acceso directo a Node desde la interfaz.
========================================================= */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('CapacitacionElectron', {
  getAppInfo: () => ({
    name: 'Capacitación Docente',
    version: '0.2.0',
    runtime: 'electron'
  }),

  ping: async () => ipcRenderer.invoke('app:ping'),

  getPaths: async () => ipcRenderer.invoke('app:get-paths')
});
