/* =========================================================
Nombre completo: baselocal.view.js
Ubicación: /base-local/baselocal.view.js
Función:
- Renderizar la pantalla visual de Base Local.
- Mostrar estadísticas, buscador, tablas y acciones principales.
========================================================= */
(function registerBaseLocalView(window) {
  'use strict';

  const tableColumns = {
    documentos: [
      { key: 'tipo', label: 'Tipo' },
      { key: 'nombreArchivo', label: 'Archivo origen' },
      { key: 'periodo', label: 'Período' },
      { key: 'estadoValidacion', label: 'Validación' }
    ],
    docentes: [
      { key: 'nombres', label: 'Docente' },
      { key: 'cedula', label: 'Cédula' },
      { key: 'carrera', label: 'Carrera' },
      { key: 'estado', label: 'Estado' }
    ],
    carreras: [
      { key: 'nombre', label: 'Carrera' },
      { key: 'coordinacion', label: 'Coordinación' },
      { key: 'estado', label: 'Estado' }
    ],
    capacitaciones: [
      { key: 'nombre', label: 'Capacitación' },
      { key: 'tipo', label: 'Tipo' },
      { key: 'modalidad', label: 'Modalidad' },
      { key: 'horas', label: 'Horas' },
      { key: 'estado', label: 'Estado' }
    ],
    participantes: [
      { key: 'docenteId', label: 'Docente ID' },
      { key: 'capacitacionId', label: 'Capacitación ID' },
      { key: 'estado', label: 'Estado' },
      { key: 'certificado', label: 'Certificado' }
    ],
    reportes: [
      { key: 'docenteId', label: 'Docente ID' },
      { key: 'periodo', label: 'Período' },
      { key: 'estado', label: 'Estado' },
      { key: 'fechaGeneracion', label: 'Fecha' }
    ],
    auditoria: [
      { key: 'accion', label: 'Acción' },
      { key: 'detalle', label: 'Detalle' },
      { key: 'fecha', label: 'Fecha' }
    ]
  };

  function renderStats(stats) {
    const labels = window.BaseLocalSchema.TABLES;
    return Object.keys(stats).map((tableName) => `
      <article class="baselocal-stat">
        <strong>${stats[tableName]}</strong>
        <span>${window.SharedUI.escapeHtml(labels[tableName].label)}</span>
      </article>
    `).join('');
  }

  function renderTabs(activeTable) {
    const labels = window.BaseLocalSchema.TABLES;
    return Object.keys(labels).map((tableName) => `
      <button class="baselocal-tab ${tableName === activeTable ? 'active' : ''}" data-table="${tableName}">
        ${window.SharedUI.escapeHtml(labels[tableName].label)}
      </button>
    `).join('');
  }

  function renderTable(activeTable, query) {
    const rows = window.BaseLocalSearch.search(query, activeTable)[activeTable] || [];
    const columns = tableColumns[activeTable] || [];
    return window.SharedTablas.renderTable({
      columns,
      rows,
      emptyText: 'Todavía no hay datos en esta tabla.'
    });
  }

  function createView(root, estadoManager) {
    let activeTable = 'documentos';
    let query = '';

    function notify(message) {
      if (estadoManager) {
        estadoManager.set({ ultimaAccion: message });
      }
      window.SharedUI.toast(message, 'info');
    }

    function render() {
      const state = window.BaseLocalDB.init();
      const stats = window.BaseLocalDB.stats();
      const meta = state.meta;

      root.innerHTML = `
        <div class="baselocal-layout">
          <section class="baselocal-hero">
            <div>
              <span class="eyebrow">Bloque 3</span>
              <h3>Base Local</h3>
              <p>
                Guarda datos normalizados del proceso de capacitación docente. En esta fase no guarda archivos completos; solo datos limpios y metadatos de carga.
              </p>
            </div>
            <div class="baselocal-actions">
              <button class="primary-button" data-action="demo">Cargar demo</button>
              <button class="secondary-button" data-action="export">Exportar JSON</button>
              <label class="secondary-button file-button">
                Importar JSON
                <input type="file" data-action="import" accept="application/json,.json" />
              </label>
              <button class="danger-button" data-action="clear">Reiniciar</button>
            </div>
          </section>

          <section class="baselocal-meta">
            <span><strong>Versión:</strong> ${window.SharedUI.escapeHtml(meta.version)}</span>
            <span><strong>Período:</strong> ${window.SharedUI.escapeHtml(meta.periodoActivo)}</span>
            <span><strong>Actualizado:</strong> ${window.SharedUI.escapeHtml(window.SharedFechas.formatDateTime(meta.actualizadoEn))}</span>
          </section>

          <section class="baselocal-stats">
            ${renderStats(stats)}
          </section>

          <section class="baselocal-panel">
            <div class="baselocal-toolbar">
              <div class="baselocal-tabs">${renderTabs(activeTable)}</div>
              <input class="baselocal-search" type="search" value="${window.SharedUI.escapeHtml(query)}" placeholder="Buscar en la tabla activa..." />
            </div>
            <div class="baselocal-table-target">
              ${renderTable(activeTable, query)}
            </div>
          </section>
        </div>
      `;

      bindEvents();
    }

    function bindEvents() {
      root.querySelectorAll('[data-table]').forEach((button) => {
        button.addEventListener('click', () => {
          activeTable = button.dataset.table;
          render();
        });
      });

      const searchInput = root.querySelector('.baselocal-search');
      if (searchInput) {
        searchInput.addEventListener('input', (event) => {
          query = event.target.value;
          const target = root.querySelector('.baselocal-table-target');
          target.innerHTML = renderTable(activeTable, query);
        });
      }

      const demoButton = root.querySelector('[data-action="demo"]');
      if (demoButton) {
        demoButton.addEventListener('click', () => {
          const result = window.BaseLocalSeed.cargarDatosDemo();
          notify(result.message);
          render();
        });
      }

      const exportButton = root.querySelector('[data-action="export"]');
      if (exportButton) {
        exportButton.addEventListener('click', () => {
          const fileName = window.BaseLocalExport.downloadJSON();
          notify(`Respaldo generado: ${fileName}`);
        });
      }

      const importInput = root.querySelector('[data-action="import"]');
      if (importInput) {
        importInput.addEventListener('change', async (event) => {
          const file = event.target.files && event.target.files[0];
          if (!file) return;

          try {
            await window.BaseLocalImport.importFromFile(file);
            notify('Base Local importada correctamente.');
            render();
          } catch (error) {
            window.SharedUI.toast(error.message, 'error');
          }
        });
      }

      const clearButton = root.querySelector('[data-action="clear"]');
      if (clearButton) {
        clearButton.addEventListener('click', () => {
          const confirmed = window.confirm('Esto reiniciará los datos normalizados de Base Local. ¿Deseas continuar?');
          if (!confirmed) return;
          window.BaseLocalDB.clearAll();
          notify('Base Local reiniciada.');
          render();
        });
      }
    }

    render();

    return {
      render
    };
  }

  window.BaseLocalView = {
    createView
  };
})(window);
