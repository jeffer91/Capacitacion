/* =========================================================
Nombre completo: constants.js
Ubicación: /shared/constants.js
Función:
- Centralizar constantes globales de la app.
- Definir llaves de almacenamiento local.
- Evitar textos y valores repetidos en distintos módulos.
========================================================= */
(function registerSharedConstants(window) {
  'use strict';

  window.SharedConstants = {
    APP_NAME: 'Capacitación Docente',
    APP_VERSION: '0.3.0',
    STORAGE_PREFIX: 'capacitacion_docente',
    BASE_LOCAL_KEY: 'capacitacion_docente_base_local_v1',
    BACKUP_PREFIX: 'respaldo_capacitacion_docente',
    DEFAULT_PERIOD: 'Sin período activo',
    DOCUMENT_TYPES: [
      'deteccion-necesidades',
      'plan-capacitacion',
      'planificacion-capacitacion',
      'informe-final-capacitacion',
      'instrumento-evaluacion',
      'informe-impacto',
      'evidencia-anexo'
    ],
    STATUS: {
      OK: 'OK',
      WARNING: 'ADVERTENCIA',
      ERROR: 'ERROR',
      PENDING: 'PENDIENTE'
    }
  };
})(window);
