/* =========================================================
Nombre completo: codigos.js
Ubicación: /shared/codigos.js
Función:
- Generar códigos internos temporales.
- Preparar una capa común para futuros códigos institucionales.
========================================================= */
(function registerSharedCodigos(window) {
  'use strict';

  function pad(value, size) {
    return String(value).padStart(size, '0');
  }

  function createInternalCode(prefix, index) {
    const year = new Date().getFullYear();
    return `${prefix || 'UGPA'}-${year}-${pad(index || 1, 4)}`;
  }

  function createDocumentCode(type, count) {
    const cleanType = (type || 'DOC').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
    return createInternalCode(cleanType, count);
  }

  window.SharedCodigos = {
    createInternalCode,
    createDocumentCode
  };
})(window);
