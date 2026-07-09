/* =========================================================
Nombre completo: baselocal.import.js
Ubicación: /base-local/baselocal.import.js
Función:
- Importar respaldos JSON de Base Local.
- Validar estructura mínima antes de guardar.
========================================================= */
(function registerBaseLocalImport(window) {
  'use strict';

  function parseBackupText(text) {
    const payload = JSON.parse(text);
    const data = payload.data || payload;

    if (!data.tables) {
      throw new Error('El archivo no tiene estructura válida de Base Local.');
    }

    return data;
  }

  function importFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const data = parseBackupText(reader.result);
          const state = window.BaseLocalDB.importState(data);
          resolve(state);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error('No se pudo leer el archivo JSON.'));
      reader.readAsText(file, 'utf-8');
    });
  }

  window.BaseLocalImport = {
    parseBackupText,
    importFromFile
  };
})(window);
