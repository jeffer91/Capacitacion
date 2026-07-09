/* =========================================================
Nombre completo: menu.js
Ubicación: /menu/menu.js
Función:
- Renderizar el menú principal lateral.
- Escuchar clics de navegación.
- Marcar la pantalla activa.
========================================================= */
(function registerMenu(window) {
  'use strict';

  function statusLabel(status) {
    const labels = {
      activo: 'Activo',
      preparado: 'Preparado',
      pendiente: 'Pendiente'
    };

    return labels[status] || 'Pendiente';
  }

  function createMenu(options) {
    const root = options.root;
    const config = options.config;
    const router = options.router;

    if (!root || !config || !router) {
      throw new Error('Menu requiere root, config y router.');
    }

    function render(activeId) {
      const itemsHtml = config.items.map((item) => `
        <button class="nav-item ${item.id === activeId ? 'active' : ''}" data-view="${item.id}" title="${item.description}">
          <span class="nav-label">${item.label}</span>
          <small class="nav-status nav-status-${item.status}">${statusLabel(item.status)}</small>
        </button>
      `).join('');

      root.innerHTML = `
        <div class="brand-block">
          <div class="brand-mark">UGPA</div>
          <div>
            <h1>${config.appName}</h1>
            <p>${config.processName}</p>
          </div>
        </div>

        <nav class="main-nav" aria-label="Menú principal">
          ${itemsHtml}
        </nav>
      `;

      root.querySelectorAll('.nav-item').forEach((button) => {
        button.addEventListener('click', () => {
          setActive(button.dataset.view);
        });
      });
    }

    function setActive(viewId) {
      router.goTo(viewId);
      render(viewId);
    }

    render('inicio');

    return {
      render,
      setActive
    };
  }

  window.CapacitacionMenu = {
    createMenu
  };
})(window);
