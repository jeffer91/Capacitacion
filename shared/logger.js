/* =========================================================
Nombre completo: logger.js
Ubicación: /shared/logger.js
Función:
- Registrar eventos básicos de la app.
- Preparar trazabilidad para diagnóstico futuro.
========================================================= */
(function registerSharedLogger(window) {
  'use strict';

  function log(scope, message, data) {
    console.log(`[${scope}] ${message}`, data || '');
  }

  function warn(scope, message, data) {
    console.warn(`[${scope}] ${message}`, data || '');
  }

  function error(scope, message, data) {
    console.error(`[${scope}] ${message}`, data || '');
  }

  window.SharedLogger = {
    log,
    warn,
    error
  };
})(window);
