/* =========================================================
Nombre completo: menu-superior.acciones.js
Ubicación: /menu-superior/menu-superior.acciones.js
Función:
- Definir acciones rápidas del menú superior.
- Preparar botones reutilizables para validar, guardar y exportar.
========================================================= */
(function registerMenuSuperiorAcciones(window) {
  'use strict';

  function createAcciones(estadoManager) {
    function accionNoDisponible(nombreAccion) {
      estadoManager.set({
        ultimaAccion: `${nombreAccion} estará disponible en un bloque posterior.`
      });
    }

    return [
      {
        id: 'guardar',
        label: 'Guardar',
        enabled: false,
        run: () => accionNoDisponible('Guardar')
      },
      {
        id: 'validar',
        label: 'Validar',
        enabled: false,
        run: () => accionNoDisponible('Validar')
      },
      {
        id: 'exportar',
        label: 'Exportar PDF',
        enabled: false,
        run: () => accionNoDisponible('Exportar PDF')
      }
    ];
  }

  window.CapacitacionMenuSuperiorAcciones = {
    createAcciones
  };
})(window);
