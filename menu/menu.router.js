/* =========================================================
Nombre completo: menu.router.js
Ubicación: /menu/menu.router.js
Función:
- Controlar navegación interna sin recargar la ventana Electron.
- Pintar el contenido principal según la pantalla seleccionada.
- Avisar al menú superior cuando cambia la pantalla activa.
========================================================= */
(function registerMenuRouter(window) {
  'use strict';

  const views = {
    inicio: {
      title: 'Inicio',
      subtitle: 'Bloque 2',
      html: `
        <h3>Menú y menú superior conectados</h3>
        <p>
          Este bloque organiza la navegación de la aplicación. Ahora el menú principal y la barra superior trabajan como módulos separados.
        </p>
        <div class="grid-cards">
          <article><strong>Menú principal</strong><span>Controla las pantallas centrales de la app.</span></article>
          <article><strong>Menú superior</strong><span>Muestra pantalla activa, estado y acciones rápidas.</span></article>
          <article><strong>Ruta preparada</strong><span>El siguiente bloque conectará la Base Local.</span></article>
        </div>
      `
    },
    'proceso-capacitacion-docente': {
      title: 'Proceso de Capacitación Docente',
      subtitle: 'Proceso principal',
      html: `
        <h3>Proceso de Capacitación Docente</h3>
        <p>
          Esta será la pantalla central del proceso. Mostrará etapas, avance, documentos cargados y alertas generales.
        </p>
        <div class="process-flow">
          <div><strong>1</strong><span>Carga por etapas</span></div>
          <div><strong>2</strong><span>Base Local</span></div>
          <div><strong>3</strong><span>Validaciones</span></div>
          <div><strong>4</strong><span>Reportes PDF</span></div>
        </div>
      `
    },
    'base-local': {
      title: 'Base Local',
      subtitle: 'Pendiente Bloque 3',
      html: `
        <h3>Base Local</h3>
        <p>
          En el Bloque 3 se creará la base para guardar datos normalizados, buscar información y alimentar los reportes.
        </p>
      `
    },
    'carga-guiada': {
      title: 'Carga Guiada',
      subtitle: 'Pendiente Bloque 5',
      html: `
        <h3>Carga Guiada</h3>
        <p>
          Esta pantalla pedirá documentos por etapas del proceso. No generará reportes; solo extraerá y normalizará datos.
        </p>
      `
    },
    'validaciones-globales': {
      title: 'Validaciones Globales',
      subtitle: 'Pendiente Bloque 6',
      html: `
        <h3>Validaciones Globales</h3>
        <p>
          Aquí se revisarán faltantes, períodos, códigos, firmantes y coherencia de datos antes de generar documentos.
        </p>
      `
    },
    'generar-reportes': {
      title: 'Generar Reportes',
      subtitle: 'Pendiente Bloque 7',
      html: `
        <h3>Generar Reportes</h3>
        <p>
          Esta pantalla consultará la Base Local, verificará que el docente tenga información suficiente y generará el PDF individual.
        </p>
      `
    },
    'informe-final': {
      title: 'Informe Final',
      subtitle: 'Pendiente Bloque 8',
      html: `
        <h3>Informe Final Institucional</h3>
        <p>
          Esta pantalla consolidará la información validada para generar el informe final institucional en PDF.
        </p>
      `
    }
  };

  function createRouter(options) {
    const contentNode = options.contentNode;
    const titleNode = options.titleNode;
    const onChange = options.onChange || function noop() {};

    if (!contentNode || !titleNode) {
      throw new Error('MenuRouter requiere contentNode y titleNode.');
    }

    function goTo(viewId) {
      const view = views[viewId] || views.inicio;
      titleNode.textContent = view.title;
      contentNode.innerHTML = view.html;
      onChange(viewId, view);
      return view;
    }

    return {
      goTo,
      getView: (viewId) => views[viewId] || views.inicio,
      getViews: () => Object.assign({}, views)
    };
  }

  window.CapacitacionMenuRouter = {
    createRouter
  };
})(window);
