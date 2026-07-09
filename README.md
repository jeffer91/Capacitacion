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

## Bloque 3

Este bloque crea la Base Local y utilidades compartidas:

- `shared/constants.js`
- `shared/utils.js`
- `shared/fechas.js`
- `shared/normalizadores.js`
- `shared/codigos.js`
- `shared/ui.js`
- `shared/tablas.js`
- `shared/filtros.js`
- `shared/storage.js`
- `shared/logger.js`
- `base-local/baselocal.schema.js`
- `base-local/baselocal.db.js`
- `base-local/baselocal.seed.js`
- `base-local/baselocal.search.js`
- `base-local/baselocal.import.js`
- `base-local/baselocal.export.js`
- `base-local/baselocal.backup.js`
- `base-local/baselocal.view.js`
- `base-local/baselocal.js`
- `base-local/baselocal.css`
- `base-local/baselocal.html`

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

La aplicación estará organizada por pantallas y carpetas independientes. La Base Local recibe datos normalizados del proceso y metadatos de carga; no guarda archivos completos en esta fase. Las pantallas de reportes e informe final consultarán esa base para generar documentos institucionales en PDF.
