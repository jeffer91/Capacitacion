/* =========================================================
Nombre completo: baselocal.seed.js
Ubicación: /base-local/baselocal.seed.js
Función:
- Crear datos de prueba controlados para verificar Base Local.
- Permitir comprobar tablas sin cargar documentos reales todavía.
========================================================= */
(function registerBaseLocalSeed(window) {
  'use strict';

  function cargarDatosDemo() {
    const DB = window.BaseLocalDB;
    const stats = DB.stats();

    if (stats.docentes || stats.capacitaciones || stats.documentos) {
      return {
        ok: false,
        message: 'La Base Local ya tiene datos. No se cargó demo para evitar duplicados.'
      };
    }

    const carrera = DB.insert('carreras', {
      nombre: 'ENFERMERÍA',
      coordinacion: 'Coordinación de Carrera',
      estado: 'ACTIVA'
    });

    const docente = DB.insert('docentes', {
      nombres: 'DOCENTE DEMO CAPACITACIÓN',
      cedula: '0000000000',
      carrera: carrera.nombre,
      dedicacion: 'Tiempo completo',
      estado: 'ACTIVO'
    });

    const capacitacion = DB.insert('capacitaciones', {
      nombre: 'Competencias Docentes y Diseño de Materiales Didácticos',
      tipo: 'Genérica',
      modalidad: 'Virtual',
      horas: 40,
      periodo: 'Demo 2026',
      estado: 'EJECUTADA'
    });

    DB.insert('documentos', {
      tipo: 'informe-final-capacitacion',
      nombreArchivo: 'demo-informe-final.pdf',
      periodo: 'Demo 2026',
      estadoValidacion: 'OK',
      fechaCarga: window.SharedUtils.nowISO()
    });

    DB.insert('participantes', {
      docenteId: docente.id,
      capacitacionId: capacitacion.id,
      estado: 'APROBADO',
      certificado: 'SI'
    });

    return {
      ok: true,
      message: 'Datos demo cargados correctamente.'
    };
  }

  window.BaseLocalSeed = {
    cargarDatosDemo
  };
})(window);
