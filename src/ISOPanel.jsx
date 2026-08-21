// Formateador-ISO8583/src/ISOPanel.jsx - Dual Panel View (Input vs Output ISO)
import { createSignal } from 'solid-js';

export default function ISOPanel(props) {
  const [copied, setCopied] = createSignal(false);

  const sampleMessages = {
    request: `[T: 00:00:00.000][D: 00000][C:    000000******0000][Iap: iap_BBVEMI-M0-00    ][Lp: 0:I0 ][Rw: W][L:  000]ISO00000000000000000C00000A0000E000000000000000000000000000000000000000000000000000000000000000000000000000000******0000=****0000000000000000000000000000UNPSP                 DF           MEXMX0000000000            00000000000000P000CPAY+0000000000EGLO000000000000000000          000& 0000000000! Q000000 00! Q000000 00! C000000 **** 000          0  0 0 0! C000000 000000000000! R000000              ! CE00000 00kBNnCDvCPMtJmT0q/V+Tr0hB0oJ0                                                                                                                                                                            ! RJ00000 0 ae00f000-cd00-0e0c-b000-e000df0e0b00`,
    response: `[T: 00:00:00.000][D: 00000][C:    000000******0000][Iap: iap_BBVEMI-M0-00    ][Lp: 0:I0 ][Rw: R][L:  000]ISO0000000000000000A00000E00000A0000000000000000000000000000000000000000000000000000000000000000000000000000******0000=****00000000000000000000000000000000000000 0000000EGLO000000000000000000& 0000000000! Q000000 00! Q000000 00! C000000 **** 000          0  0 0 0! C000000 000000000000! R000000              ! RJ00000 0 ae00f000-cd00-0e0c-b000-e000df0e0b00  ! 0000000 C           E     N`
  };

  const handleCopy = () => {
    const text = props.modifiedIso || '';
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/80 p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span className="p-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
              ⚡
            </span>
            Formateador & Reconstructor ISO 8583
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pega una trama original a la izquierda. Edita cualquier campo abajo y obtén el mensaje ISO modificado y recalculado a la derecha.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400">Ejemplos:</span>
          <button
            onClick={() => props.onLoadSample(sampleMessages.request)}
            className="px-3 py-1.5 text-xs font-medium bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-indigo-800 transition"
          >
            Solicitud (0200)
          </button>
          <button
            onClick={() => props.onLoadSample(sampleMessages.response)}
            className="px-3 py-1.5 text-xs font-medium bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 transition"
          >
            Respuesta (0210)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input Textarea */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span>📥</span> Mensaje ISO Original
            </label>
            <span className="text-xs font-mono text-slate-400">
              {props.inputIso ? `${props.inputIso.length} chars` : ''}
            </span>
          </div>
          <textarea
            value={props.inputIso || ''}
            onInput={(e) => props.onInputIsoChange(e.target.value)}
            placeholder="Pega aquí el mensaje ISO 8583 a modificar..."
            className="w-full h-44 font-mono text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-y shadow-inner"
            spellCheck={false}
          />
          <div className="flex gap-2">
            <button
              onClick={props.onParse}
              disabled={!props.inputIso?.trim()}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-xl shadow-md active:scale-95 disabled:opacity-40 transition"
            >
              Parsear Campos para Editar
            </button>
            <button
              onClick={props.onClear}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium text-xs rounded-xl transition"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Right: Output Textarea */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span>✨</span> Mensaje ISO Modificado (Recalculado)
            </label>

            {/* Pretty Print Toggle */}
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={props.isPretty || false}
                onChange={(e) => props.onTogglePretty(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-600"></div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Formatear (Pretty)
              </span>
            </label>
          </div>

          <textarea
            readOnly
            value={props.modifiedIso || ''}
            placeholder="El mensaje modificado se generará aquí en tiempo real al editar campos..."
            className="w-full h-44 font-mono text-xs bg-slate-900 text-emerald-300 border border-slate-700 rounded-xl p-3 focus:outline-none transition resize-y shadow-inner selection:bg-emerald-500 selection:text-white"
            spellCheck={false}
          />

          <div className="flex justify-between items-center">
            <button
              onClick={handleCopy}
              disabled={!props.modifiedIso?.trim()}
              className={`px-5 py-2 rounded-xl text-xs font-medium transition shadow-md ${
                copied()
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20 active:scale-95 disabled:opacity-40'
              }`}
            >
              {copied() ? '✓ Copiado al Portapapeles' : '📋 Copiar Mensaje Modificado'}
            </button>
            <span className="text-xs font-mono text-slate-400">
              {props.modifiedIso ? `${props.modifiedIso.length} chars` : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
