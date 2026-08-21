// Formateador-ISO8583/src/FieldEditor.jsx - Editor categorizado de campos ISO 8583
import { For, Show } from 'solid-js';
import { MTI_DESCRIPTIONS, RESPONSE_CODE_DESCRIPTIONS } from './iso8583Engine.js';

export default function FieldEditor(props) {
  const getFieldValue = (fieldNum) => {
    return props.fields && props.fields[fieldNum] ? props.fields[fieldNum].valor || '' : '';
  };

  const handleFieldChange = (fieldNum, value) => {
    props.onUpdateField(fieldNum, value);
  };

  const handleTokenChange = (tokenId, value) => {
    props.onUpdateToken(tokenId, value);
  };

  const getTokenValue = (tokenId) => {
    const tokens = props.tokens || [];
    const t = tokens.find(x => x.id === tokenId);
    return t ? t.valor || '' : '';
  };

  return (
    <div className="space-y-6">
      {/* Category Selection Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => props.onSelectCategory('header')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition ${
            props.category === 'header'
              ? 'bg-indigo-600 text-white shadow'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          ⚙️ Header & MTI
        </button>
        <button
          onClick={() => props.onSelectCategory('transaccion')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition ${
            props.category === 'transaccion'
              ? 'bg-indigo-600 text-white shadow'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          💳 Transacción & Montos
        </button>
        <button
          onClick={() => props.onSelectCategory('compra')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition ${
            props.category === 'compra'
              ? 'bg-indigo-600 text-white shadow'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          🔑 Detalles de Compra
        </button>
        <button
          onClick={() => props.onSelectCategory('comercio')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition ${
            props.category === 'comercio'
              ? 'bg-indigo-600 text-white shadow'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          🏪 Datos del Comercio
        </button>
        <button
          onClick={() => props.onSelectCategory('tokens')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition ${
            props.category === 'tokens'
              ? 'bg-purple-600 text-white shadow'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          🏷️ Sub-Tokens BBVA (F63)
        </button>
        <button
          onClick={() => props.onSelectCategory('todos')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition ${
            props.category === 'todos'
              ? 'bg-slate-700 text-white shadow'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          🌐 Todos los Campos (F1..F128)
        </button>
      </div>

      {/* Category Editors */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        {/* Category: Header & MTI */}
        <Show when={props.category === 'header'}>
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Header ISO (9 posiciones) y Tipo de Mensaje (MTI - 4 posiciones)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Header ISO (025000077)
                </label>
                <input
                  type="text"
                  maxLength={9}
                  value={props.header || ''}
                  onInput={(e) => props.onUpdateHeader(e.target.value)}
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-indigo-600 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-[10px] text-slate-400">Pos 1-2: Prod, Pos 3-4: Release, Pos 5-7: Status, Pos 8: Origen, Pos 9: Resp</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  MTI - Tipo de Mensaje (0200, 0210, 0420)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={props.mti || ''}
                  onInput={(e) => props.onUpdateMti(e.target.value)}
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-indigo-600 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-[10px] text-emerald-500 font-medium">
                  {MTI_DESCRIPTIONS[props.mti] || ''}
                </span>
              </div>
            </div>
          </div>
        </Show>

        {/* Category: Transacción & Montos */}
        <Show when={props.category === 'transaccion'}>
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Datos Financieros y Tiempos de Transacción
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Field 3: Processing Code */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">
                  F3 - Processing Code (6 chars)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={getFieldValue(3)}
                  onInput={(e) => handleFieldChange(3, e.target.value)}
                  placeholder="003000"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-[10px] text-slate-400">Ej: 003000 (Compra Tarjeta)</span>
              </div>

              {/* Field 4: Amount */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">
                  F4 - Amount (12 dígitos con centavos)
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={getFieldValue(4)}
                  onInput={(e) => handleFieldChange(4, e.target.value)}
                  placeholder="000000030000"
                  className="w-full font-mono text-sm font-bold text-amber-600 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-[10px] text-slate-400">000000030000 = $300.00</span>
              </div>

              {/* Field 11: STAN */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">
                  F11 - STAN (6 chars)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={getFieldValue(11)}
                  onInput={(e) => handleFieldChange(11, e.target.value)}
                  placeholder="905745"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Field 7: Txn DateTime */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">
                  F7 - Fecha/Hora Transmisión (10 chars: MMDDhhmmss)
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={getFieldValue(7)}
                  onInput={(e) => handleFieldChange(7, e.target.value)}
                  placeholder="0714171606"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Field 12: Local Time */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">
                  F12 - Hora Local (6 chars: hhmmss)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={getFieldValue(12)}
                  onInput={(e) => handleFieldChange(12, e.target.value)}
                  placeholder="111539"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Field 13: Local Date */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">
                  F13 - Fecha Local (4 chars: MMDD)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={getFieldValue(13)}
                  onInput={(e) => handleFieldChange(13, e.target.value)}
                  placeholder="0714"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </Show>

        {/* Category: Detalles de Compra */}
        <Show when={props.category === 'compra'}>
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Respuesta, Tarjeta y Terminal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Field 39: Response Code */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">
                  F39 - Response Code (2 chars)
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={getFieldValue(39)}
                  onInput={(e) => handleFieldChange(39, e.target.value)}
                  placeholder="00"
                  className="w-full font-mono text-sm font-bold text-emerald-600 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-[10px] text-slate-400">00 = Approved, 49 = Special ISO, 91 = Offline</span>
              </div>

              {/* Field 37: Folio RRN */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">
                  F37 - Retrieval Ref / Folio (12 chars)
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={getFieldValue(37)}
                  onInput={(e) => handleFieldChange(37, e.target.value)}
                  placeholder="001631346105"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Field 38: Auth Code */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">
                  F38 - Authorization Code (6 chars)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={getFieldValue(38)}
                  onInput={(e) => handleFieldChange(38, e.target.value)}
                  placeholder="000000"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Field 35: Track 2 / PAN */}
              <div className="space-y-1 col-span-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-500">
                  F35 - Track 2 Data / PAN (LLVAR)
                </label>
                <input
                  type="text"
                  value={getFieldValue(35)}
                  onInput={(e) => handleFieldChange(35, e.target.value)}
                  placeholder="554629******2353=****"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Field 22: Entry Mode */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">
                  F22 - POS Entry Mode (3 chars)
                </label>
                <input
                  type="text"
                  maxLength={3}
                  value={getFieldValue(22)}
                  onInput={(e) => handleFieldChange(22, e.target.value)}
                  placeholder="010"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-[10px] text-slate-400">010 = Card on File / Manual, 050 = Chip</span>
              </div>

              {/* Field 41: Terminal ID */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">
                  F41 - Terminal ID (16 chars)
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={getFieldValue(41)}
                  onInput={(e) => handleFieldChange(41, e.target.value)}
                  placeholder="0000000000124033"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Field 49: Currency Code */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">
                  F49 - Moneda (3 chars)
                </label>
                <input
                  type="text"
                  maxLength={3}
                  value={getFieldValue(49)}
                  onInput={(e) => handleFieldChange(49, e.target.value)}
                  placeholder="484"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-[10px] text-slate-400">484 = MXN, 840 = USD</span>
              </div>
            </div>
          </div>
        </Show>

        {/* Category: Datos del Comercio */}
        <Show when={props.category === 'comercio'}>
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Afiliación, Nombre y Giro del Comercio
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field 43: Merchant Location */}
              <div className="space-y-1 col-span-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-500">
                  F43 - Card Acceptor Name / Location (40 chars)
                </label>
                <input
                  type="text"
                  maxLength={40}
                  value={getFieldValue(43)}
                  onInput={(e) => handleFieldChange(43, e.target.value)}
                  placeholder="UNPSP                 DF           MEXMX"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Field 48: Retailer Data / Afiliación */}
              <div className="space-y-1 col-span-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-500">
                  F48 - Afiliación / Retailer Data (LLLVAR)
                </label>
                <input
                  type="text"
                  value={getFieldValue(48)}
                  onInput={(e) => handleFieldChange(48, e.target.value)}
                  placeholder="8946354            00010001"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Field 18: Merchant Type */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">
                  F18 - Merchant Type (MCC: 4 chars)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={getFieldValue(18)}
                  onInput={(e) => handleFieldChange(18, e.target.value)}
                  placeholder="5399"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Field 32: Acquiring Inst */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">
                  F32 - Acquiring Inst ID Code (LLVAR)
                </label>
                <input
                  type="text"
                  value={getFieldValue(32)}
                  onInput={(e) => handleFieldChange(32, e.target.value)}
                  placeholder="10034567901"
                  className="w-full font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </Show>

        {/* Category: Sub-Tokens Campo 63 */}
        <Show when={props.category === 'tokens'}>
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
              <span>Sub-Tokens del Campo 63 (BBVA Bancomer)</span>
              <span className="text-xs font-normal text-purple-600 bg-purple-50 dark:bg-purple-950 px-2.5 py-1 rounded-lg border border-purple-200">
                Formato ! ID + Longitud + Valor
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Token Q1 */}
              <div className="space-y-1 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <label className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Token Q1 - Modo de Autorización
                </label>
                <input
                  type="text"
                  value={getTokenValue('Q1')}
                  onInput={(e) => handleTokenChange('Q1', e.target.value)}
                  placeholder="90"
                  className="w-full font-mono text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Token Q2 */}
              <div className="space-y-1 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <label className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Token Q2 - Identificador Medio de Acceso
                </label>
                <input
                  type="text"
                  value={getTokenValue('Q2')}
                  onInput={(e) => handleTokenChange('Q2', e.target.value)}
                  placeholder="09"
                  className="w-full font-mono text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-[10px] text-slate-400">09 = Comercio Electrónico</span>
              </div>

              {/* Token RJ */}
              <div className="space-y-1 col-span-1 md:col-span-2 bg-indigo-50/50 dark:bg-indigo-950/30 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <label className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  Token RJ - Protocolo 3DS 2.0 (Anexo V BBVA)
                </label>
                <input
                  type="text"
                  value={getTokenValue('RJ')}
                  onInput={(e) => handleTokenChange('RJ', e.target.value)}
                  placeholder="2 ae37f673-cd20-4e7c-b244-e792df5e2b66"
                  className="w-full font-mono text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-[10px] text-indigo-500">
                  Formato: 2 caracteres Versión 3DS + 36 caracteres UUID DS-TXN-ID + 2 caracteres futuros
                </span>
              </div>

              {/* Token C0 */}
              <div className="space-y-1 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <label className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Token C0 - Validaciones CVV/CAVV
                </label>
                <input
                  type="text"
                  value={getTokenValue('C0')}
                  onInput={(e) => handleTokenChange('C0', e.target.value)}
                  placeholder="**** 001          5  1 2 2"
                  className="w-full font-mono text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Token C4 */}
              <div className="space-y-1 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <label className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Token C4 - Datos de Terminal
                </label>
                <input
                  type="text"
                  value={getTokenValue('C4')}
                  onInput={(e) => handleTokenChange('C4', e.target.value)}
                  placeholder="102510023660"
                  className="w-full font-mono text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Token R7 */}
              <div className="space-y-1 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <label className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Token R7 - Bonus Merchant / Campañas
                </label>
                <input
                  type="text"
                  value={getTokenValue('R7')}
                  onInput={(e) => handleTokenChange('R7', e.target.value)}
                  placeholder="S"
                  className="w-full font-mono text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Token CE */}
              <div className="space-y-1 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <label className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Token CE - Datos Cifrados
                </label>
                <input
                  type="text"
                  value={getTokenValue('CE')}
                  onInput={(e) => handleTokenChange('CE', e.target.value)}
                  placeholder="01kBNnCDvCPMtJmT9q..."
                  className="w-full font-mono text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </Show>

        {/* Category: Todos los Campos (F1..F128) */}
        <Show when={props.category === 'todos'}>
          <div className="space-y-4">
            {props.renderAllFieldsEditor()}
          </div>
        </Show>
      </div>
    </div>
  );
}
