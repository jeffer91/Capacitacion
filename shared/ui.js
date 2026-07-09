/* =========================================================
Nombre completo: ui.js
Ubicación: /shared/ui.js
Función:
- Centralizar funciones visuales pequeñas.
- Escapar texto antes de pintarlo en HTML.
- Mostrar mensajes temporales dentro de la app.
========================================================= */
(function registerSharedUI(window, document) {
  'use strict';

  function escapeHtml(value) {
    return (value === null || value === undefined ? '' : String(value))
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function toast(message, type) {
    const node = document.createElement('div');
    node.className = `app-toast app-toast-${type || 'info'}`;
    node.textContent = message;
    document.body.appendChild(node);
    window.setTimeout(() => node.remove(), 2600);
  }

  function setText(selector, text, root) {
    const scope = root || document;
    const node = scope.querySelector(selector);
    if (node) node.textContent = text;
  }

  window.SharedUI = {
    escapeHtml,
    toast,
    setText
  };
})(window, document);
