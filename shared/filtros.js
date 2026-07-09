/* =========================================================
Nombre completo: filtros.js
Ubicación: /shared/filtros.js
Función:
- Filtrar registros por texto libre.
- Reutilizar búsquedas simples en tablas de Base Local.
========================================================= */
(function registerSharedFiltros(window) {
  'use strict';

  function matchesQuery(record, query) {
    const cleanQuery = (query || '').toString().toLowerCase().trim();
    if (!cleanQuery) return true;
    return JSON.stringify(record || {}).toLowerCase().includes(cleanQuery);
  }

  function filterByQuery(records, query) {
    return (records || []).filter((record) => matchesQuery(record, query));
  }

  window.SharedFiltros = {
    matchesQuery,
    filterByQuery
  };
})(window);
