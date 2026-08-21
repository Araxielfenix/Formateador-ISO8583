// src/iso8583Engine.js - Motor de Parsing y Reconstrucción ISO 8583 (E-Global / BBVA Bancomer)

export const EGLOBAL_FIELD_DEFS = {
  1:   { nombre: 'Bitmap Secundario', format: 'AN F 16', type: 'fija', len: 16 },
  3:   { nombre: 'Processing Code (Código de Procesamiento)', format: 'N F 6', type: 'fija', len: 6 },
  4:   { nombre: 'Transaction Amount (Monto)', format: 'N F 12', type: 'fija', len: 12 },
  5:   { nombre: 'Settlement Amount (Monto Liquidación)', format: 'N F 12', type: 'fija', len: 12 },
  7:   { nombre: 'Transmission Date and Time (Fecha/Hora Transmisión)', format: 'N F 10', type: 'fija', len: 10 },
  10:  { nombre: 'Conversion Rate, Cardholder Billing', format: 'N F 8', type: 'fija', len: 8 },
  11:  { nombre: 'System Trace Audit Number (STAN)', format: 'N F 6', type: 'fija', len: 6 },
  12:  { nombre: 'Local Transaction Time (Hora Local)', format: 'N F 6', type: 'fija', len: 6 },
  13:  { nombre: 'Local Transaction Date (Fecha Local)', format: 'N F 4', type: 'fija', len: 4 },
  15:  { nombre: 'Settlement Date (Fecha Liquidación)', format: 'N F 4', type: 'fija', len: 4 },
  17:  { nombre: 'Capture Date (Fecha Captura)', format: 'N F 4', type: 'fija', len: 4 },
  18:  { nombre: 'Merchant Type (Giro del Comercio)', format: 'N F 4', type: 'fija', len: 4 },
  22:  { nombre: 'Point of Service Entry Mode (Modo de Entrada POS)', format: 'N F 3', type: 'fija', len: 3 },
  25:  { nombre: 'Point of Service Condition Code', format: 'N F 2', type: 'fija', len: 2 },
  32:  { nombre: 'Acquiring Institution ID Code', format: 'N V 2:11', type: 'llvar', maxLen: 11 },
  35:  { nombre: 'Track 2 Data (Banda / Tarjeta)', format: 'ANS V 2:37', type: 'llvar', maxLen: 37 },
  37:  { nombre: 'Retrieval Reference Number (Folio / RRN)', format: 'AN F 12', type: 'fija', len: 12 },
  38:  { nombre: 'Authorization Identification Response (Autorización)', format: 'AN F 6', type: 'fija', len: 6 },
  39:  { nombre: 'Response Code (Código de Respuesta)', format: 'AN F 2', type: 'fija', len: 2 },
  41:  { nombre: 'Card Acceptor Terminal ID (ID Terminal POS)', format: 'ANS F 16', type: 'fija', len: 16 },
  43:  { nombre: 'Card Acceptor Name/Location (Nombre y Ubicación Comercio)', format: 'ANS F 40', type: 'fija', len: 40 },
  44:  { nombre: 'Additional Response Data', format: 'ANS V 2:25', type: 'llvar', maxLen: 25 },
  45:  { nombre: 'Track 1 Data', format: 'ANS V 2:76', type: 'llvar', maxLen: 76 },
  48:  { nombre: 'Additional Data - Retailer Data (Afiliación / Datos Comercio)', format: 'ANS V 3:27', type: 'lllvar', maxLen: 999 },
  49:  { nombre: 'Transaction Currency Code (Moneda)', format: 'N F 3', type: 'fija', len: 3 },
  50:  { nombre: 'Settlement Currency Code', format: 'N F 3', type: 'fija', len: 3 },
  52:  { nombre: 'PIN Data (PIN Cifrado)', format: 'AN F 16', type: 'fija', len: 16 },
  53:  { nombre: 'Security-Related Control Information', format: 'N F 16', type: 'fija', len: 16 },
  54:  { nombre: 'Additional Amounts', format: 'ANS V 3:12', type: 'lllvar', maxLen: 12 },
  58:  { nombre: 'Redención de Puntos / Campo 58', format: 'ANS V 3:244', type: 'lllvar', maxLen: 244 },
  59:  { nombre: 'Datos de Campaña / Campo 59', format: 'ANS V 3:999', type: 'lllvar', maxLen: 999 },
  60:  { nombre: 'POS Terminal Data', format: 'ANS V 3:16', type: 'lllvar', maxLen: 16 },
  61:  { nombre: 'POS Card Issuer Category Response Data', format: 'ANS V 3:19', type: 'lllvar', maxLen: 19 },
  62:  { nombre: 'Postal Code (Código Postal)', format: 'ANS V 3:10', type: 'lllvar', maxLen: 10 },
  63:  { nombre: 'POS Additional Data (Tokens BBVA)', format: 'ANS V 3:999', type: 'lllvar', maxLen: 999 },
  70:  { nombre: 'Network Management Information Code', format: 'N F 3', type: 'fija', len: 3 },
  90:  { nombre: 'Original Data Elements', format: 'ANS F 42', type: 'fija', len: 42 },
  103: { nombre: 'Account Identification 2', format: 'ANS V 2:28', type: 'llvar', maxLen: 28 },
  120: { nombre: 'Key Management', format: 'ANS V 3:9', type: 'lllvar', maxLen: 9 },
  123: { nombre: 'Cryptographic Service Message', format: 'ANS V 3:553', type: 'lllvar', maxLen: 553 },
  125: { nombre: 'Settlement Data Management Information', format: 'ANS F 15', type: 'fija', len: 15 }
};

export const MTI_DESCRIPTIONS = {
  '0200': 'Solicitud de Autorización Financiera (0200)',
  '0210': 'Respuesta a Solicitud de Autorización (0210)',
  '0220': 'Notificación de Autorización (Stand-In/Offline)',
  '0221': 'Notificación de Autorización (Re-envío)',
  '0230': 'Respuesta a Notificación de Autorización',
  '0420': 'Solicitud / Notificación de Reverso (0420)',
  '0421': 'Notificación de Reverso (Re-envío)',
  '0430': 'Respuesta a Notificación de Reverso (0430)',
  '0800': 'Solicitud de Administración de Red (Sign-on / Echo)',
  '0810': 'Respuesta de Administración de Red'
};

export const RESPONSE_CODE_DESCRIPTIONS = {
  '00': 'Aprobada (Approved)',
  '01': 'Referir al Emisor (Refer to card issuer)',
  '02': 'Referir al Emisor (Refer to card issuer special)',
  '03': 'Comercio Inválido (Invalid merchant)',
  '04': 'Retener Tarjeta (Pick-up card)',
  '05': 'Transacción No Honrada (Do not honor)',
  '06': 'Error General (Error)',
  '07': 'Retener Tarjeta (Pick-up card special)',
  '08': 'Aprobar con ID (Honor with ID)',
  '12': 'Transacción Inválida (Invalid transaction)',
  '13': 'Monto Inválido (Invalid amount)',
  '14': 'Tarjeta Inválida (Invalid card number)',
  '15': 'Emisor Inexistente (No such issuer)',
  '19': 'Reintentar Transacción (Re-enter transaction)',
  '30': 'Error de Formato (Format error)',
  '39': 'Cuenta de Crédito No Existe (No credit account)',
  '41': 'Tarjeta Perdida (Lost card)',
  '43': 'Tarjeta Robada (Stolen card)',
  '49': 'Reservado para Uso ISO / Proceso Especial',
  '51': 'Fondos Insuficientes (Not sufficient funds)',
  '54': 'Tarjeta Expirada (Expired card)',
  '55': 'PIN Incorrecto (Incorrect PIN)',
  '57': 'Transacción No Permitida en Tarjeta',
  '58': 'Transacción No Permitida en Terminal',
  '61': 'Excede Límite de Retiro',
  '62': 'Tarjeta Restringida',
  '68': 'Tiempo de Espera Agotado (Time Out / Late Reply)',
  '91': 'Switch / Emisor Fuera de Línea (Issuer inoperative)',
  '96': 'Falla de Sistema (System malfunction)',
  'B1': 'Transacción Susceptible de Conversión (Campañas/Puntos)'
};

export class ISO8583Engine {
  hexToBin(hex) {
    return hex.split('').map(h => parseInt(h, 16).toString(2).padStart(4, '0')).join('');
  }

  binToHex(bin) {
    let hex = '';
    for (let i = 0; i < bin.length; i += 4) {
      const chunk = bin.substring(i, i + 4);
      hex += parseInt(chunk, 2).toString(16).toUpperCase();
    }
    return hex;
  }

  formatBitmap(hexStr) {
    if (!hexStr) return '';
    return hexStr.match(/.{1,4}/g)?.join(' ') || hexStr;
  }

  parse(isoMessage) {
    if (!isoMessage || typeof isoMessage !== 'string') {
      return { errors: ['Mensaje vacío'] };
    }

    let cleanMsg = isoMessage.trim();

    // Soportar líneas de log BBVA: [T: ...][L: NNN]ISO...
    const lMatch = cleanMsg.match(/\[L:\s*(\d+)\]ISO(.*)/s);
    if (lMatch) {
      const expectedLen = parseInt(lMatch[1], 10);
      const afterIso = lMatch[2];
      cleanMsg = 'ISO' + afterIso.substring(0, expectedLen);
    } else {
      const isoMatch = cleanMsg.match(/ISO[\s\S]*?(?=\n|\[|$)/);
      if (isoMatch) {
        cleanMsg = isoMatch[0];
      }
    }

    let pos = cleanMsg.indexOf('ISO');
    if (pos === -1) pos = 0;
    else pos += 3;

    const header = cleanMsg.substring(pos, pos + 9);
    pos += 9;

    const mti = cleanMsg.substring(pos, pos + 4);
    pos += 4;

    const primaryBitmapHex = cleanMsg.substring(pos, pos + 16);
    pos += 16;

    let primaryBin = this.hexToBin(primaryBitmapHex);
    let secondaryBitmapHex = null;
    let fullBin = primaryBin;

    if (primaryBin[0] === '1') {
      secondaryBitmapHex = cleanMsg.substring(pos, pos + 16);
      pos += 16;
      fullBin += this.hexToBin(secondaryBitmapHex);
    }

    const fields = {};
    const errors = [];

    for (let i = 0; i < fullBin.length; i++) {
      if (fullBin[i] === '1') {
        const fieldNum = i + 1;
        if (fieldNum === 1) continue; // El bit 1 ya fue procesado como Bitmap Secundario

        const def = EGLOBAL_FIELD_DEFS[fieldNum] || {
          nombre: `Campo ${fieldNum}`,
          format: 'ANS V 3:999',
          type: 'lllvar',
          maxLen: 999
        };

        let dataLen = 0;
        let afterLenPos = pos;

        if (def.type === 'fija') {
          dataLen = def.len;
        } else if (def.type === 'llvar') {
          dataLen = parseInt(cleanMsg.substring(pos, pos + 2), 10);
          afterLenPos = pos + 2;
        } else if (def.type === 'lllvar') {
          dataLen = parseInt(cleanMsg.substring(pos, pos + 3), 10);
          afterLenPos = pos + 3;
        }

        if (isNaN(dataLen) || dataLen < 0) {
          errors.push(`Campo ${fieldNum}: longitud inválida "${dataLen}"`);
          break;
        }

        const value = cleanMsg.substring(afterLenPos, afterLenPos + dataLen);
        pos = afterLenPos + dataLen;

        fields[fieldNum] = {
          id: fieldNum,
          nombre: def.nombre,
          format: def.format,
          longitud: dataLen,
          type: def.type,
          valor: value
        };
      }
    }

    const tokens = fields[63]?.valor ? this.parseField63Tokens(fields[63].valor) : [];

    return {
      raw: cleanMsg,
      header: header || '025000077',
      mti: mti || '0200',
      primaryBitmapHex,
      secondaryBitmapHex,
      fields,
      tokens,
      errors
    };
  }

  parseField63Tokens(data) {
    if (!data) return [];
    const tokens = [];
    const regex = /!\s*([A-Z0-9]{2,3})(\d{5})\s+([^!]*)/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      const [, id, lenStr, value] = match;
      const len = parseInt(lenStr, 10);
      const cleanValue = value.trim().substring(0, len);
      tokens.push({ id, longitud: len, valor: cleanValue });
    }
    return tokens;
  }

  /**
   * Reconstruye el mensaje ISO 8583 completo recalculando bitmaps y prefijos de longitud
   */
  build(header, mti, fieldsDict, tokensArray = []) {
    const cleanHeader = (header || '025000077').padEnd(9, ' ').substring(0, 9);
    const cleanMti = (mti || '0200').padStart(4, '0').substring(0, 4);

    // Si hay tokens en tokensArray, reconstruir el valor del Campo 63
    const fields = { ...fieldsDict };
    if (tokensArray && tokensArray.length > 0) {
      fields[63] = {
        id: 63,
        type: 'lllvar',
        valor: this.buildField63Tokens(tokensArray)
      };
    }

    // Determinar qué bits están presentes (del 1 al 128)
    const activeFieldNums = Object.keys(fields)
      .map(n => parseInt(n, 10))
      .filter(n => n > 1 && fields[n] && fields[n].valor !== undefined && fields[n].valor !== null)
      .sort((a, b) => a - b);

    const hasSecondary = activeFieldNums.some(n => n > 64);
    const totalBits = hasSecondary ? 128 : 64;

    const bitsArray = new Array(totalBits).fill('0');

    if (hasSecondary) {
      bitsArray[0] = '1'; // Bit 1 = 1 para indicar Bitmap Secundario
    }

    activeFieldNums.forEach(n => {
      bitsArray[n - 1] = '1';
    });

    const fullBin = bitsArray.join('');
    const primaryBin = fullBin.substring(0, 64);
    const primaryBitmapHex = this.binToHex(primaryBin);
    
    let secondaryBitmapHex = '';
    if (hasSecondary) {
      const secondaryBin = fullBin.substring(64, 128);
      secondaryBitmapHex = this.binToHex(secondaryBin);
    }

    // Reconstruir el cuerpo de los campos
    let bodyData = '';

    for (let n of activeFieldNums) {
      const fieldObj = fields[n];
      const val = fieldObj.valor || '';
      const def = EGLOBAL_FIELD_DEFS[n] || { type: 'lllvar' };

      if (def.type === 'fija') {
        const expectedLen = def.len || val.length;
        // Rellenar o recortar según especificación
        const formattedVal = val.length > expectedLen 
          ? val.substring(0, expectedLen)
          : val.padEnd(expectedLen, ' ');
        bodyData += formattedVal;
      } else if (def.type === 'llvar') {
        const lenPrefix = val.length.toString().padStart(2, '0');
        bodyData += lenPrefix + val;
      } else if (def.type === 'lllvar') {
        const lenPrefix = val.length.toString().padStart(3, '0');
        bodyData += lenPrefix + val;
      }
    }

    const isoStr = 'ISO' + cleanHeader + cleanMti + primaryBitmapHex + secondaryBitmapHex + bodyData;
    return isoStr;
  }

  buildField63Tokens(tokensArray) {
    let result = '& 0000800379'; // Encabezado de tokens E-Global / BBVA
    for (let t of tokensArray) {
      if (!t.id) continue;
      const cleanVal = t.valor || '';
      const lenStr = cleanVal.length.toString().padStart(5, '0');
      result += `! ${t.id}${lenStr} ${cleanVal}`;
    }
    return result;
  }

  /**
   * Formatea un mensaje ISO 8583 con saltos de línea y etiquetas explicativas (Pretty Print)
   */
  formatPretty(isoStr) {
    const parsed = this.parse(isoStr);
    if (parsed.errors && parsed.errors.length > 0 && !parsed.mti) {
      return isoStr;
    }

    let out = `=== MENSAJE ISO 8583 DESGLOSADO ===\n`;
    out += `[000-003] Prefix: ISO\n`;
    out += `[003-012] Header: ${parsed.header} (Producto: ${parsed.header.substring(0,2)}, Release: ${parsed.header.substring(2,4)}, Estatus: ${parsed.header.substring(4,7)})\n`;
    out += `[012-016] MTI:    ${parsed.mti} (${MTI_DESCRIPTIONS[parsed.mti] || 'Tipo Transacción'})\n`;
    out += `[016-032] Bitmap Primario:   ${parsed.primaryBitmapHex}\n`;
    if (parsed.secondaryBitmapHex) {
      out += `[032-048] Bitmap Secundario: ${parsed.secondaryBitmapHex}\n`;
    }

    out += `\n--- CAMPOS PRESENTES (${Object.keys(parsed.fields).length}) ---\n`;
    const sortedNums = Object.keys(parsed.fields).map(Number).sort((a,b) => a - b);

    for (let n of sortedNums) {
      const f = parsed.fields[n];
      out += `F${n.toString().padStart(2, '0')} [${f.type.toUpperCase()}:${f.longitud}] ${f.nombre}:\n   ↳ "${f.valor}"\n`;
    }

    if (parsed.tokens && parsed.tokens.length > 0) {
      out += `\n--- SUB-TOKENS CAMPO 63 (${parsed.tokens.length}) ---\n`;
      parsed.tokens.forEach(t => {
        out += `! ${t.id} [len:${t.longitud}]: "${t.valor}"\n`;
      });
    }

    return out;
  }
}

export const iso8583Engine = new ISO8583Engine();
export default ISO8583Engine;
