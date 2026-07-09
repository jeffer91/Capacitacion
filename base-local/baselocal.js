/* =========================================================
Nombre completo: baselocal.js
Ubicación: /base-local/baselocal.js
Función:
- Inicializar el módulo Base Local.
- Montar la pantalla cuando el router active la vista correspondiente.
- Exponer funciones públicas para otros módulos.
========================================================= */
(function registerBaseLocalApp(window) {
  'use strict';

  let mountedRoot = null;
  let currentView = null;

  function mount(root, options) {
    if (!root) return null;

    if (mountedRoot === root && currentView) {
      currentView.render();
      return currentView;
    }

    mountedRoot = root;
    window.BaseLocalDB.init();
    currentView = window.BaseLocalView.createView(root, options && options.estadoManager);
    return currentView;
  }

  function getStats() {
    return window.BaseLocalDB.stats();
  }

  function getState() {
    return window.BaseLocalDB.getState();
  }

  window.BaseLocalApp = {
    mount,
    getStats,
    getState
  };
})(window);
