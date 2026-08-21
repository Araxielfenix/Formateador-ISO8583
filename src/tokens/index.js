// Formateador-ISO8583/src/tokens/index.js - Decodificador de sub-tokens BBVA Campo 63
import { tokenRJParser } from './rj.js';

export const MEDIOS_ACCESO_Q2 = {
  '00': '00 - Desconocido (Por omisión)',
  '01': '01 - Autorización por Voz',
  '02': '02 - Cargos Automáticos',
  '03': '03 - Terminal Punto de Venta (TPV)',
  '04': '04 - Interred',
  '05': '05 - Banca Electrónica',
  '06': '06 - Sucursal',
  '07': '07 - Cajeros Automáticos (ATM)',
  '08': '08 - Ventas por Teléfono / Correo (MOTO)',
  '09': '09 - Comercio Electrónico (E-Commerce)',
  '10': '10 - Adquirente Doméstico',
  '11': '11 - Adquirente Internacional'
};

export const MODO_AUTORIZACION_Q1 = {
  '0': '0 - Respuesta por el emisor en línea',
  '1': '1 - Respuesta por el Switch fuera de línea (Stand-In)',
  '9': '9 - Default / Por omisión',
  '90': '90 - Respuesta por Host / Default en Requerimiento',
  '00': '00 - Respuesta Aprobada en Línea'
};

export function parseTokenQ1(valor) {
  const code = valor.trim();
  return { id: 'Q1', nombre: 'Modo de Autorización', raw: valor, desc: MODO_AUTORIZACION_Q1[code] || `Modo: ${code}` };
}

export function parseTokenQ2(valor) {
  const code = valor.trim();
  return { id: 'Q2', nombre: 'Medio de Acceso', raw: valor, desc: MEDIOS_ACCESO_Q2[code] || `Medio: ${code}` };
}

export function parseTokenC0(valor) {
  return { id: 'C0', nombre: 'Validación CVV2 / CVC2 / CAVV', raw: valor, desc: 'Códigos de validación CVV2/CAVV' };
}

export function parseTokenC4(valor) {
  return { id: 'C4', nombre: 'Datos de la Terminal POS', raw: valor, desc: `Datos Terminal: ${valor}` };
}

export function parseTokenR7(valor) {
  const bonusFlag = valor[0] || '';
  const isBonus = bonusFlag === 'S' ? 'Sí (Terminal propia con campañas)' : bonusFlag === 'N' ? 'No (Sin soporte)' : 'Terminal ajena';
  return { id: 'R7', nombre: 'Bonus Merchant & Referencia Campañas', raw: valor, desc: `Bonus Merchant: ${isBonus}` };
}

export function parseTokenCE(valor) {
  return { id: 'CE', nombre: 'Cifrado / Token de Seguridad', raw: valor, desc: 'Token de datos cifrados' };
}

export const tokenParsers = {
  'RJ': tokenRJParser,
  'Q1': { parse: parseTokenQ1 },
  'Q2': { parse: parseTokenQ2 },
  'C0': { parse: parseTokenC0 },
  'C4': { parse: parseTokenC4 },
  'R7': { parse: parseTokenR7 },
  'CE': { parse: parseTokenCE }
};

export function parseField63Tokens(subTokens) {
  const results = {};
  for (const token of subTokens) {
    const parser = tokenParsers[token.id];
    if (parser) {
      results[token.id] = parser.parse(token.valor);
    } else {
      results[token.id] = { id: token.id, longitud: token.longitud, valor: token.valor, desc: `Subtoken ${token.id}` };
    }
  }
  return results;
}

export default { tokenParsers, parseField63Tokens };
