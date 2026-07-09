/* =========================================================
Nombre completo: app.js
Ubicación: /app.js
Función:
- Inicializar la interfaz base de la aplicación.
- Conectar menú principal, router, menú superior y módulos activos.
- Verificar si la app corre dentro de Electron.
========================================================= */
(function initCapacitacionApp(window, document) {
  'use strict';

  const runtime = window.CapacitacionElectron || null;
  const config = window.CapacitacionMenuConfig;
  const menuRoot = document.getElementById('menu-root');
  const menuSuperiorRoot = document.getElementById('menu-superior-root');
  const screenContent = document.getElementById('screen-content');

  function assertDependencies() {
    const missing = [];

    if (!config) missing.push('CapacitacionMenuConfig');
    if (!window.CapacitacionMenuRouter) missing.push('CapacitacionMenuRouter');
    if (!window.CapacitacionMenu) missing.push('CapacitacionMenu');
    if (!window.CapacitacionMenuSuperiorEstado) missing.push('CapacitacionMenuSuperiorEstado');
    if (!window.CapacitacionMenuSuperiorAcciones) missing.push('CapacitacionMenuSuperiorAcciones');
    if (!window.CapacitacionMenuSuperior) missing.push('CapacitacionMenuSuperior');

    if (missing.length) {
      throw new Error(`Dependencias no cargadas: ${missing.join(', ')}`);
    }
  }

  function getRuntimeLabel() {
    if (!runtime || !runtime.getAppInfo) {
      return 'Modo navegador';
    }

    const appInfo = runtime.getAppInfo();
    return `${appInfo.runtime || 'electron'} listo · v${appInfo.version || config.version}`;
  }

  function mountActiveModule(viewId, estadoManager) {
    if (viewId === 'base-local' && window.BaseLocalApp) {
      const root = document.getElementById('baselocal-root');
      window.BaseLocalApp.mount(root, { estadoManager });
      const stats = window.BaseLocalApp.getStats();
      estadoManager.set({
        ultimaAccion: `Base Local lista: ${stats.docentes} docente(s), ${stats.capacitaciones} capacitación(es), ${stats.documentos} documento(s).`
      });
    }
  }

  function boot() {
    assertDependencies();

    const estadoManager = window.CapacitacionMenuSuperiorEstado.createEstadoManager();
    const acciones = window.CapacitacionMenuSuperiorAcciones.createAcciones(estadoManager);

    window.CapacitacionMenuSuperior.createMenuSuperior({
      root: menuSuperiorRoot,
      estadoManager,
      acciones
    });

    const router = window.CapacitacionMenuRouter.createRouter({
      contentNode: screenContent,
      titleNode: document.createElement('span'),
      onChange: function onRouteChange(viewId, view) {
        estadoManager.set({
          pantallaActual: view.title,
          subtitulo: view.subtitle || config.activeBlock,
          runtime: getRuntimeLabel(),
          ultimaAccion: `Pantalla activa: ${view.title}`
        });

        mountActiveModule(viewId, estadoManager);
      }
    });

    window.CapacitacionMenu.createMenu({
      root: menuRoot,
      config,
      router
    });

    estadoManager.set({
      runtime: getRuntimeLabel(),
      ultimaAccion: 'Menú principal, menú superior y Base Local listos.'
    });

    router.goTo('inicio');
  }

  document.addEventListener('DOMContentLoaded', boot);
})(window, document);
