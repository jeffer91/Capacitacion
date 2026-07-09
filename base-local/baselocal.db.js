/* =========================================================
Nombre completo: baselocal.db.js
Ubicación: /base-local/baselocal.db.js
Función:
- Administrar la Base Local en localStorage.
- Guardar solo datos extraídos y normalizados.
- Mantener metadatos de carga sin guardar archivos completos.
========================================================= */
(function registerBaseLocalDB(window) {
  'use strict';

  const KEY = window.SharedConstants.BASE_LOCAL_KEY;

  function ensureStateShape(state) {
    const base = window.BaseLocalSchema.createEmptyState();
    const current = state && state.tables ? state : base;

    Object.keys(base.tables).forEach((tableName) => {
      if (!Array.isArray(current.tables[tableName])) {
        current.tables[tableName] = [];
      }
    });

    current.meta = Object.assign({}, base.meta, current.meta || {});
    return current;
  }

  function load() {
    const state = window.SharedStorage.getJSON(KEY, null);
    return ensureStateShape(state);
  }

  function save(state) {
    const nextState = ensureStateShape(state);
    nextState.meta.actualizadoEn = window.SharedUtils.nowISO();
    window.SharedStorage.setJSON(KEY, nextState);
    return nextState;
  }

  function init() {
    const state = load();
    save(state);
    return state;
  }

  function getState() {
    return load();
  }

  function list(tableName) {
    const state = load();
    return window.SharedUtils.clone(state.tables[tableName] || []);
  }

  function addAudit(state, accion, detalle) {
    state.tables.auditoria.unshift({
      id: window.SharedUtils.uid('audit'),
      accion,
      detalle,
      fecha: window.SharedUtils.nowISO()
    });

    state.tables.auditoria = state.tables.auditoria.slice(0, 80);
  }

  function insert(tableName, record) {
    const state = load();
    if (!state.tables[tableName]) {
      throw new Error(`Tabla no permitida: ${tableName}`);
    }

    const nextRecord = Object.assign({}, record, {
      id: record.id || window.SharedUtils.uid(tableName),
      creadoEn: record.creadoEn || window.SharedUtils.nowISO(),
      actualizadoEn: window.SharedUtils.nowISO()
    });

    state.tables[tableName].unshift(nextRecord);
    addAudit(state, 'CREAR_REGISTRO', `Tabla: ${tableName}`);
    save(state);
    return nextRecord;
  }

  function update(tableName, id, patch) {
    const state = load();
    const rows = state.tables[tableName] || [];
    const index = rows.findIndex((row) => row.id === id);

    if (index < 0) return null;

    rows[index] = Object.assign({}, rows[index], patch, {
      actualizadoEn: window.SharedUtils.nowISO()
    });

    addAudit(state, 'ACTUALIZAR_REGISTRO', `Tabla: ${tableName}`);
    save(state);
    return rows[index];
  }

  function remove(tableName, id) {
    const state = load();
    const rows = state.tables[tableName] || [];
    const before = rows.length;
    state.tables[tableName] = rows.filter((row) => row.id !== id);

    if (state.tables[tableName].length !== before) {
      addAudit(state, 'ELIMINAR_REGISTRO', `Tabla: ${tableName}`);
      save(state);
      return true;
    }

    return false;
  }

  function clearAll() {
    const state = window.BaseLocalSchema.createEmptyState();
    addAudit(state, 'REINICIAR_BASE_LOCAL', 'Base Local reiniciada por el usuario.');
    save(state);
    return state;
  }

  function stats() {
    const state = load();
    const result = {};
    Object.keys(state.tables).forEach((tableName) => {
      result[tableName] = state.tables[tableName].length;
    });
    return result;
  }

  function importState(payload) {
    const state = ensureStateShape(payload);
    addAudit(state, 'IMPORTAR_BASE_LOCAL', 'Importación JSON realizada.');
    return save(state);
  }

  window.BaseLocalDB = {
    init,
    getState,
    save,
    list,
    insert,
    update,
    remove,
    clearAll,
    stats,
    importState
  };
})(window);
