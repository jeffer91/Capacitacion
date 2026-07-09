/* =========================================================
Nombre completo: app.js
Ubicación: /app.js
Función:
- Inicializar la interfaz base de la aplicación.
- Verificar si la app corre dentro de Electron.
- Preparar navegación visual temporal para el Bloque 1.
========================================================= */
(function initCapacitacionApp() {
  'use strict';

  const screenTitle = document.getElementById('screen-title');
  const screenContent = document.getElementById('screen-content');
  const runtimeStatus = document.getElementById('runtime-status');
  const navItems = Array.from(document.querySelectorAll('.nav-item'));

  const runtime = window.CapacitacionElectron || null;

  const views = {
    inicio: {
      title: 'Base Electron lista',
      html: `
        <h3>Aplicación base creada</h3>
        <p>
          Este primer bloque deja funcionando la estructura inicial de Electron. En los siguientes bloques se conectará el menú real, la base local y las pantallas del proceso.
        </p>
        <div class="grid-cards">
          <article><strong>Electron</strong><span>Ventana principal, preload seguro e IPC preparados.</span></article>
          <article><strong>Proceso</strong><span>La app queda centrada en Capacitación Docente.</span></article>
          <article><strong>Base Local</strong><span>Se conectará en el bloque 3 para guardar datos normalizados.</span></article>
        </div>
      `
    },
    'base-local': {
      title: 'Base Local',
      html: `
        <h3>Base Local</h3>
        <p>Esta pantalla se implementará en el Bloque 3. Su función será guardar datos normalizados, no archivos completos.</p>
      `
    },
    'carga-guiada': {
      title: 'Carga Guiada',
      html: `
        <h3>Carga Guiada</h3>
        <p>Esta pantalla pedirá documentos por etapas del proceso y enviará datos limpios a la Base Local.</p>
      `
    },
    reportes: {
      title: 'Generar Reportes',
      html: `
        <h3>Generar Reportes</h3>
        <p>Esta pantalla consultará la Base Local y generará el Reporte Individual del docente en PDF.</p>
      `
    },
    'informe-final': {
      title: 'Informe Final',
      html: `
        <h3>Informe Final Institucional</h3>
        <p>Esta pantalla consolidará la información validada de Base Local para generar el PDF institucional.</p>
      `
    }
  };

  function setRuntimeStatus() {
    if (!runtime) {
      runtimeStatus.textContent = 'Modo navegador';
      return;
    }

    const appInfo = runtime.getAppInfo ? runtime.getAppInfo() : null;
    const version = appInfo && appInfo.version ? appInfo.version : '0.1.0';
    runtimeStatus.textContent = `Electron listo · v${version}`;
    runtimeStatus.classList.add('ready');
  }

  function activateView(viewName) {
    const view = views[viewName] || views.inicio;

    screenTitle.textContent = view.title;
    screenContent.innerHTML = view.html;

    navItems.forEach((item) => {
      item.classList.toggle('active', item.dataset.view === viewName);
    });
  }

  navItems.forEach((item) => {
    item.addEventListener('click', () => activateView(item.dataset.view));
  });

  setRuntimeStatus();
  activateView('inicio');
})();
