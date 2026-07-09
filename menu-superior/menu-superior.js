/* =========================================================
Nombre completo: menu-superior.js
Ubicación: /menu-superior/menu-superior.js
Función:
- Renderizar la barra superior de la aplicación.
- Mostrar pantalla activa, estado del entorno y acciones rápidas.
========================================================= */
(function registerMenuSuperior(window) {
  'use strict';

  function createMenuSuperior(options) {
    const root = options.root;
    const estadoManager = options.estadoManager;
    const acciones = options.acciones || [];

    if (!root || !estadoManager) {
      throw new Error('MenuSuperior requiere root y estadoManager.');
    }

    function render(state) {
      const accionesHtml = acciones.map((accion) => `
        <button class="topbar-button" data-action="${accion.id}" ${accion.enabled ? '' : 'disabled'}>
          ${accion.label}
        </button>
      `).join('');

      const alertaTexto = state.alertas && state.alertas.length
        ? `${state.alertas.length} alerta(s)`
        : 'Sin alertas';

      root.innerHTML = `
        <div class="topbar-heading">
          <span class="eyebrow">${state.subtitulo}</span>
          <h2 id="screen-title">${state.pantallaActual}</h2>
          <p class="topbar-note">${state.ultimaAccion}</p>
        </div>

        <div class="topbar-meta" aria-label="Estado de la aplicación">
          <span id="runtime-status" class="status-pill ready">${state.runtime}</span>
          <span class="status-pill">${state.periodoActivo}</span>
          <span class="status-pill">${alertaTexto}</span>
        </div>

        <div class="topbar-actions" aria-label="Acciones rápidas">
          ${accionesHtml}
        </div>
      `;

      root.querySelectorAll('[data-action]').forEach((button) => {
        const action = acciones.find((item) => item.id === button.dataset.action);
        if (action && action.enabled) {
          button.addEventListener('click', action.run);
        }
      });
    }

    estadoManager.subscribe(render);

    return {
      render: () => render(estadoManager.getState())
    };
  }

  window.CapacitacionMenuSuperior = {
    createMenuSuperior
  };
})(window);
