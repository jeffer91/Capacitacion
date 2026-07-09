/* =========================================================
Nombre completo: storage.js
Ubicación: /shared/storage.js
Función:
- Encapsular lectura y escritura en localStorage.
- Manejar errores de parseo sin romper la app.
========================================================= */
(function registerSharedStorage(window) {
  'use strict';

  function isAvailable() {
    try {
      const key = '__capacitacion_test__';
      window.localStorage.setItem(key, '1');
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  function getJSON(key, fallback) {
    if (!isAvailable()) return fallback;
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;

    try {
      return JSON.parse(raw);
    } catch (error) {
      console.warn('No se pudo leer JSON local:', key, error);
      return fallback;
    }
  }

  function setJSON(key, value) {
    if (!isAvailable()) return false;
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  function remove(key) {
    if (!isAvailable()) return false;
    window.localStorage.removeItem(key);
    return true;
  }

  window.SharedStorage = {
    isAvailable,
    getJSON,
    setJSON,
    remove
  };
})(window);
