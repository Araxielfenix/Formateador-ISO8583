// Formateador-ISO8583/src/App.jsx - Componente Principal
import { createSignal, createEffect, Show } from 'solid-js';
import { iso8583Engine } from './iso8583Engine.js';
import ISOPanel from './ISOPanel.jsx';
import FieldEditor from './FieldEditor.jsx';
import AllFieldsEditor from './AllFieldsEditor.jsx';

function App() {
  const [inputIso, setInputIso] = createSignal('');
  const [header, setHeader] = createSignal('025000077');
  const [mti, setMti] = createSignal('0200');
  const [fields, setFields] = createSignal({});
  const [tokens, setTokens] = createSignal([]);
  const [modifiedIso, setModifiedIso] = createSignal('');
  const [isPretty, setIsPretty] = createSignal(false);
  const [category, setCategory] = createSignal('header');
  const [isDarkMode, setIsDarkMode] = createSignal(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Sync dark mode class
  createEffect(() => {
    if (isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode());

  // Parse original ISO string into state
  const handleParse = () => {
    const raw = inputIso();
    if (!raw || !raw.trim()) return;

    const parsed = iso8583Engine.parse(raw);
    if (parsed) {
      setHeader(parsed.header || '025000077');
      setMti(parsed.mti || '0200');
      setFields(parsed.fields || {});
      setTokens(parsed.tokens || []);

      rebuildModifiedISO(parsed.header, parsed.mti, parsed.fields, parsed.tokens);
    }
  };

  const handleLoadSample = (msg) => {
    setInputIso(msg);
    const parsed = iso8583Engine.parse(msg);
    if (parsed) {
      setHeader(parsed.header || '025000077');
      setMti(parsed.mti || '0200');
      setFields(parsed.fields || {});
      setTokens(parsed.tokens || []);

      rebuildModifiedISO(parsed.header, parsed.mti, parsed.fields, parsed.tokens);
    }
  };

  const handleClear = () => {
    setInputIso('');
    setHeader('025000077');
    setMti('0200');
    setFields({});
    setTokens([]);
    setModifiedIso('');
  };

  // Re-build ISO message string when state updates
  const rebuildModifiedISO = (
    currentHeader = header(),
    currentMti = mti(),
    currentFields = fields(),
    currentTokens = tokens()
  ) => {
    const rawBuild = iso8583Engine.build(currentHeader, currentMti, currentFields, currentTokens);
    if (isPretty()) {
      setModifiedIso(iso8583Engine.formatPretty(rawBuild));
    } else {
      setModifiedIso(rawBuild);
    }
  };

  const handleUpdateHeader = (val) => {
    setHeader(val);
    rebuildModifiedISO(val, mti(), fields(), tokens());
  };

  const handleUpdateMti = (val) => {
    setMti(val);
    rebuildModifiedISO(header(), val, fields(), tokens());
  };

  const handleUpdateField = (fieldNum, value) => {
    const updated = { ...fields() };
    if (value === undefined || value === null || value === '') {
      delete updated[fieldNum];
    } else {
      const existing = updated[fieldNum] || {};
      updated[fieldNum] = {
        ...existing,
        id: fieldNum,
        valor: value
      };
    }
    setFields(updated);
    rebuildModifiedISO(header(), mti(), updated, tokens());
  };

  const handleRemoveField = (fieldNum) => {
    const updated = { ...fields() };
    delete updated[fieldNum];
    setFields(updated);
    rebuildModifiedISO(header(), mti(), updated, tokens());
  };

  const handleUpdateToken = (tokenId, value) => {
    const updatedTokens = [...tokens()];
    const idx = updatedTokens.findIndex(t => t.id === tokenId);
    if (idx !== -1) {
      if (!value) {
        updatedTokens.splice(idx, 1);
      } else {
        updatedTokens[idx] = { ...updatedTokens[idx], valor: value, longitud: value.length };
      }
    } else if (value) {
      updatedTokens.push({ id: tokenId, longitud: value.length, valor: value });
    }
    setTokens(updatedTokens);
    rebuildModifiedISO(header(), mti(), fields(), updatedTokens);
  };

  const handleTogglePretty = (val) => {
    setIsPretty(val);
    rebuildModifiedISO(header(), mti(), fields(), tokens());
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 pb-16">
      {/* Navbar Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Araxielfenix/Formateador-ISO8583"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center font-black text-indigo-600 dark:text-indigo-400 text-sm">
                  FMT
                </div>
              </div>
              <div>
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-indigo-200 dark:to-slate-300 bg-clip-text text-transparent">
                  Formateador ISO 8583
                </h1>
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-400 tracking-wider uppercase">
                  E-Global / BBVA Bancomer Editor
                </p>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full border border-indigo-200 dark:border-indigo-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Reconstrucción ISO Dinámica
            </span>

            {/* Links Herramientas */}
            <a
              href="https://araxielfenix.github.io/Analizador/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Analizador
            </a>
            <a
              href="https://araxielfenix.github.io/Comparador/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Comparador
            </a>

            {/* Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors shadow-inner"
              aria-label="Cambiar tema"
            >
              {isDarkMode() ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Dual Panel ISO Input & Output */}
        <ISOPanel
          inputIso={inputIso()}
          modifiedIso={modifiedIso()}
          isPretty={isPretty()}
          onInputIsoChange={setInputIso}
          onParse={handleParse}
          onLoadSample={handleLoadSample}
          onClear={handleClear}
          onTogglePretty={handleTogglePretty}
        />

        {/* Form Editor */}
        <FieldEditor
          header={header()}
          mti={mti()}
          fields={fields()}
          tokens={tokens()}
          category={category()}
          onSelectCategory={setCategory}
          onUpdateHeader={handleUpdateHeader}
          onUpdateMti={handleUpdateMti}
          onUpdateField={handleUpdateField}
          onUpdateToken={handleUpdateToken}
          renderAllFieldsEditor={() => (
            <AllFieldsEditor
              fields={fields()}
              onUpdateField={handleUpdateField}
              onRemoveField={handleRemoveField}
            />
          )}
        />
      </main>
    </div>
  );
}

export default App;
