/* =========================================================
Nombre completo: menu-superior.estado.js
Ubicación: /menu-superior/menu-superior.estado.js
Función:
- Mantener el estado visible del menú superior.
- Registrar pantalla activa, período activo, runtime y alertas.
========================================================= */
(function registerMenuSuperiorEstado(window) {
  'use strict';

  function createEstadoInicial() {
    return {
      pantallaActual: 'Inicio',
      subtitulo: 'Bloque 2',
      periodoActivo: 'Sin período activo',
      runtime: 'Validando entorno...',
      alertas: [],
      ultimaAccion: 'Aplicación iniciada'
    };
  }

  function createEstadoManager() {
    const state = createEstadoInicial();
    const listeners = [];

    function notify() {
      listeners.forEach((listener) => listener(Object.assign({}, state)));
    }

    function set(partialState) {
      Object.assign(state, partialState || {});
      notify();
    }

    function subscribe(listener) {
      if (typeof listener === 'function') {
        listeners.push(listener);
        listener(Object.assign({}, state));
      }
    }

    return {
      getState: () => Object.assign({}, state),
      set,
      subscribe
    };
  }

  window.CapacitacionMenuSuperiorEstado = {
    createEstadoManager
  };
})(window);
