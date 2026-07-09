/* =========================================================
Nombre completo: utils.js
Ubicación: /shared/utils.js
Función:
- Proveer utilidades generales reutilizables.
- Crear identificadores, clonar objetos y validar valores.
========================================================= */
(function registerSharedUtils(window) {
  'use strict';

  function uid(prefix) {
    const safePrefix = prefix || 'id';
    const random = Math.random().toString(36).slice(2, 10);
    return `${safePrefix}_${Date.now()}_${random}`;
  }

  function nowISO() {
    return new Date().toISOString();
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function isPlainObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  function safeString(value) {
    if (value === null || value === undefined) return '';
    return String(value).trim();
  }

  function coalesce(value, fallback) {
    return value === null || value === undefined || value === '' ? fallback : value;
  }

  window.SharedUtils = {
    uid,
    nowISO,
    clone,
    isPlainObject,
    safeString,
    coalesce
  };
})(window);
