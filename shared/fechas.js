/* =========================================================
Nombre completo: fechas.js
Ubicación: /shared/fechas.js
Función:
- Normalizar y presentar fechas en formato institucional.
- Evitar formatos inconsistentes entre módulos.
========================================================= */
(function registerSharedFechas(window) {
  'use strict';

  function toDate(value) {
    if (!value) return null;
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function formatDate(value) {
    const date = toDate(value);
    if (!date) return 'Sin fecha';
    return date.toLocaleDateString('es-EC', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  function formatDateTime(value) {
    const date = toDate(value);
    if (!date) return 'Sin fecha';
    return date.toLocaleString('es-EC', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  window.SharedFechas = {
    toDate,
    formatDate,
    formatDateTime,
    todayISO
  };
})(window);
