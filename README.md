# Capacitación Docente

Aplicación de escritorio en Electron para gestionar el proceso de capacitación docente.

## Bloque 1

Este bloque crea la base funcional de Electron:

- `package.json`
- `index.html`
- `app.js`
- `app.css`
- `electron/main.js`
- `electron/preload.js`
- `electron/electron.ipc.js`

## Ejecutar en local

```bash
npm install
npm start
```

## Objetivo de la app

La aplicación estará organizada por pantallas y carpetas independientes. La Base Local recibirá datos normalizados del proceso, y las pantallas de reportes e informe final consultarán esa base para generar documentos institucionales en PDF.
