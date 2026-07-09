/* =========================================================
Nombre completo: normalizadores.js
Ubicación: /shared/normalizadores.js
Función:
- Normalizar nombres, carreras, períodos y textos.
- Preparar datos limpios antes de guardarlos en Base Local.
========================================================= */
(function registerSharedNormalizadores(window) {
  'use strict';

  function normalizeSpaces(value) {
    return (value || '').toString().replace(/\s+/g, ' ').trim();
  }

  function normalizeUpper(value) {
    return normalizeSpaces(value).toUpperCase();
  }

  function normalizeTitle(value) {
    return normalizeSpaces(value).toLowerCase().replace(/\b\p{L}/gu, (letter) => letter.toUpperCase());
  }

  function normalizeCedula(value) {
    return normalizeSpaces(value).replace(/[^0-9A-Za-z-]/g, '');
  }

  function normalizePeriodo(value) {
    return normalizeSpaces(value).replace(/\s*-\s*/g, ' - ');
  }

  function normalizeDocente(input) {
    return {
      nombres: normalizeUpper(input.nombres),
      cedula: normalizeCedula(input.cedula),
      carrera: normalizeUpper(input.carrera),
      dedicacion: normalizeSpaces(input.dedicacion || ''),
      estado: input.estado || 'ACTIVO'
    };
  }

  window.SharedNormalizadores = {
    normalizeSpaces,
    normalizeUpper,
    normalizeTitle,
    normalizeCedula,
    normalizePeriodo,
    normalizeDocente
  };
})(window);
