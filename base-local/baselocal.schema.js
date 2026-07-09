/* =========================================================
Nombre completo: baselocal.schema.js
Ubicación: /base-local/baselocal.schema.js
Función:
- Definir la estructura de datos normalizados de Base Local.
- Mantener tablas permitidas y campos mínimos.
========================================================= */
(function registerBaseLocalSchema(window) {
  'use strict';

  const TABLES = {
    documentos: {
      label: 'Documentos cargados',
      fields: ['id', 'tipo', 'nombreArchivo', 'periodo', 'estadoValidacion', 'fechaCarga']
    },
    docentes: {
      label: 'Docentes',
      fields: ['id', 'nombres', 'cedula', 'carrera', 'dedicacion', 'estado']
    },
    carreras: {
      label: 'Carreras',
      fields: ['id', 'nombre', 'coordinacion', 'estado']
    },
    capacitaciones: {
      label: 'Capacitaciones',
      fields: ['id', 'nombre', 'tipo', 'modalidad', 'horas', 'periodo', 'estado']
    },
    participantes: {
      label: 'Participantes',
      fields: ['id', 'docenteId', 'capacitacionId', 'estado', 'certificado']
    },
    reportes: {
      label: 'Reportes generados',
      fields: ['id', 'docenteId', 'periodo', 'estado', 'fechaGeneracion']
    },
    auditoria: {
      label: 'Auditoría',
      fields: ['id', 'accion', 'detalle', 'fecha']
    }
  };

  function createEmptyState() {
    return {
      meta: {
        version: '0.3.0',
        creadoEn: window.SharedUtils.nowISO(),
        actualizadoEn: window.SharedUtils.nowISO(),
        periodoActivo: window.SharedConstants.DEFAULT_PERIOD
      },
      tables: {
        documentos: [],
        docentes: [],
        carreras: [],
        capacitaciones: [],
        participantes: [],
        reportes: [],
        auditoria: []
      }
    };
  }

  window.BaseLocalSchema = {
    TABLES,
    createEmptyState
  };
})(window);
