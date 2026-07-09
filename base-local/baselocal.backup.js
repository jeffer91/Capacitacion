/* =========================================================
Nombre completo: baselocal.backup.js
Ubicación: /base-local/baselocal.backup.js
Función:
- Preparar funciones de respaldo de Base Local.
- Generar snapshots internos para futuras restauraciones.
========================================================= */
(function registerBaseLocalBackup(window) {
  'use strict';

  function createSnapshot(label) {
    return {
      id: window.SharedUtils.uid('snapshot'),
      label: label || 'Respaldo manual',
      fecha: window.SharedUtils.nowISO(),
      data: window.BaseLocalDB.getState()
    };
  }

  window.BaseLocalBackup = {
    createSnapshot
  };
})(window);
