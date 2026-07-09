/* =========================================================
Nombre completo: baselocal.search.js
Ubicación: /base-local/baselocal.search.js
Función:
- Buscar registros en todas las tablas de Base Local.
- Filtrar por tabla y texto libre.
========================================================= */
(function registerBaseLocalSearch(window) {
  'use strict';

  function search(query, tableName) {
    const state = window.BaseLocalDB.getState();
    const tables = tableName && tableName !== 'todas'
      ? [tableName]
      : Object.keys(state.tables);

    return tables.reduce((acc, currentTable) => {
      const rows = state.tables[currentTable] || [];
      acc[currentTable] = window.SharedFiltros.filterByQuery(rows, query);
      return acc;
    }, {});
  }

  window.BaseLocalSearch = {
    search
  };
})(window);
