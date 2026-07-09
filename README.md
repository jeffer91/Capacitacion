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

## Bloque 2

Este bloque separa y conecta la navegación:

- `menu/menu.config.js`
- `menu/menu.router.js`
- `menu/menu.js`
- `menu/menu.css`
- `menu/menu.html`
- `menu-superior/menu-superior.estado.js`
- `menu-superior/menu-superior.acciones.js`
- `menu-superior/menu-superior.js`
- `menu-superior/menu-superior.css`
- `menu-superior/menu-superior.html`

## Ejecutar en local

```bash
npm install
npm start
```

## Revisar sintaxis

```bash
npm run check
```

## Objetivo de la app

La aplicación estará organizada por pantallas y carpetas independientes. La Base Local recibirá datos normalizados del proceso, y las pantallas de reportes e informe final consultarán esa base para generar documentos institucionales en PDF.
