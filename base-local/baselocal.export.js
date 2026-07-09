/* =========================================================
Nombre completo: baselocal.export.js
Ubicación: /base-local/baselocal.export.js
Función:
- Exportar la Base Local como JSON.
- Descargar respaldos sin guardar archivos completos de origen.
========================================================= */
(function registerBaseLocalExport(window, document) {
  'use strict';

  function buildBackup() {
    return {
      exportadoEn: window.SharedUtils.nowISO(),
      app: window.SharedConstants.APP_NAME,
      version: window.SharedConstants.APP_VERSION,
      data: window.BaseLocalDB.getState()
    };
  }

  function downloadJSON() {
    const backup = buildBackup();
    const fileName = `${window.SharedConstants.BACKUP_PREFIX}_${new Date().toISOString().slice(0, 10)}.json`;
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    return fileName;
  }

  window.BaseLocalExport = {
    buildBackup,
    downloadJSON
  };
})(window, document);
