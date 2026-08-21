// Formateador-ISO8583/src/AllFieldsEditor.jsx - Tabla completa para añadir, editar o borrar cualquier campo ISO
import { createSignal, For } from 'solid-js';
import { EGLOBAL_FIELD_DEFS } from './iso8583Engine.js';

export default function AllFieldsEditor(props) {
  const [newFieldId, setNewFieldId] = createSignal('');
  const [newFieldValue, setNewFieldValue] = createSignal('');

  const activeFieldsList = () => {
    if (!props.fields) return [];
    return Object.values(props.fields).sort((a, b) => a.id - b.id);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    const id = parseInt(newFieldId(), 10);
    if (isNaN(id) || id < 2 || id > 128) return;

    props.onUpdateField(id, newFieldValue());
    setNewFieldId('');
    setNewFieldValue('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
            Tabla de Campos Activos ({activeFieldsList().length})
          </h3>
          <p className="text-xs text-slate-500">
            Cualquier modificación recalcula el Bitmap de forma automática.
          </p>
        </div>
      </div>

      {/* Formulario para añadir un nuevo campo */}
      <form onSubmit={handleAddField} className="flex flex-wrap items-end gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="w-24">
          <label className="text-[10px] font-bold uppercase text-slate-400">Num. Campo</label>
          <input
            type="number"
            min="2"
            max="128"
            value={newFieldId()}
            onInput={(e) => setNewFieldId(e.target.value)}
            placeholder="ej: 54"
            className="w-full font-mono text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 focus:outline-none"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-[10px] font-bold uppercase text-slate-400">Valor del Campo</label>
          <input
            type="text"
            value={newFieldValue()}
            onInput={(e) => setNewFieldValue(e.target.value)}
            placeholder="Valor a incluir..."
            className="w-full font-mono text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!newFieldId()}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg transition disabled:opacity-40"
        >
          + Agregar Campo
        </button>
      </form>

      {/* Tabla de Campos */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800/80 uppercase tracking-wider text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <th className="px-3 py-2 w-14">Field</th>
              <th className="px-3 py-2">Nombre E-Global</th>
              <th className="px-3 py-2 w-24">Formato</th>
              <th className="px-3 py-2">Valor Actual</th>
              <th className="px-3 py-2 w-14 text-center">Borrar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 bg-white dark:bg-slate-900">
            <For each={activeFieldsList()}>
              {(field) => {
                const def = EGLOBAL_FIELD_DEFS[field.id] || { nombre: `Campo ${field.id}`, format: field.type };
                return (
                  <tr className="hover:bg-indigo-50/50 dark:hover:bg-slate-800/60">
                    <td className="px-3 py-2 font-bold text-indigo-600 dark:text-indigo-400">
                      F{field.id}
                    </td>
                    <td className="px-3 py-2 font-sans font-medium text-slate-800 dark:text-slate-200">
                      {def.nombre}
                    </td>
                    <td className="px-3 py-2 text-slate-500">
                      {def.format || field.type}
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={field.valor || ''}
                        onInput={(e) => props.onUpdateField(field.id, e.target.value)}
                        className="w-full font-mono text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button
                        onClick={() => props.onRemoveField(field.id)}
                        className="p-1 text-slate-400 hover:text-red-600 transition"
                        title="Eliminar campo"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              }}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
}
