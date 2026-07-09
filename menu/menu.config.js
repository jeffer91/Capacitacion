/* =========================================================
Nombre completo: menu.config.js
Ubicación: /menu/menu.config.js
Función:
- Definir las opciones principales de navegación.
- Centralizar nombres de pantallas y rutas internas.
- Evitar que el menú dependa de textos quemados en app.js.
========================================================= */
(function registerMenuConfig(window) {
  'use strict';

  window.CapacitacionMenuConfig = {
    appName: 'Capacitación Docente',
    processName: 'Proceso de Capacitación Docente',
    activeBlock: 'Bloque 3',
    version: '0.3.0',
    items: [
      {
        id: 'inicio',
        label: 'Inicio',
        description: 'Resumen general de la aplicación',
        status: 'activo'
      },
      {
        id: 'proceso-capacitacion-docente',
        label: 'Proceso de Capacitación Docente',
        description: 'Vista general del proceso institucional',
        status: 'preparado'
      },
      {
        id: 'base-local',
        label: 'Base Local',
        description: 'Consulta de datos normalizados',
        status: 'activo'
      },
      {
        id: 'carga-guiada',
        label: 'Carga Guiada',
        description: 'Carga por etapas del proceso',
        status: 'pendiente'
      },
      {
        id: 'validaciones-globales',
        label: 'Validaciones Globales',
        description: 'Revisión de errores y faltantes',
        status: 'pendiente'
      },
      {
        id: 'generar-reportes',
        label: 'Generar Reportes',
        description: 'Reporte individual por docente en PDF',
        status: 'pendiente'
      },
      {
        id: 'informe-final',
        label: 'Informe Final',
        description: 'Informe institucional consolidado',
        status: 'pendiente'
      }
    ]
  };
})(window);
