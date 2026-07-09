/* =========================================================
Nombre completo: tablas.js
Ubicación: /shared/tablas.js
Función:
- Renderizar tablas simples reutilizables.
- Evitar repetir estructura HTML de tablas en cada pantalla.
========================================================= */
(function registerSharedTablas(window) {
  'use strict';

  function renderTable(options) {
    const UI = window.SharedUI;
    const columns = options.columns || [];
    const rows = options.rows || [];
    const emptyText = options.emptyText || 'No hay registros.';

    if (!rows.length) {
      return `<div class="empty-state">${UI.escapeHtml(emptyText)}</div>`;
    }

    const thead = columns.map((column) => `<th>${UI.escapeHtml(column.label)}</th>`).join('');
    const tbody = rows.map((row) => {
      const cells = columns.map((column) => {
        const value = typeof column.value === 'function' ? column.value(row) : row[column.key];
        return `<td>${UI.escapeHtml(value || '')}</td>`;
      }).join('');
      return `<tr>${cells}</tr>`;
    }).join('');

    return `
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr>${thead}</tr></thead>
          <tbody>${tbody}</tbody>
        </table>
      </div>
    `;
  }

  window.SharedTablas = {
    renderTable
  };
})(window);
