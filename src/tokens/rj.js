// Formateador-ISO8583/src/tokens/rj.js - Parser Token RJ (3DS 2.0)
export class TokenRJParser {
  constructor() {
    this.mastercardValues = {
      '0': 'Desconocido',
      '1': '3-D Secure Version 1.0 (3DS 1.0)',
      '2': 'EMV 3-D Secure (3DS 2.0)'
    };

    this.visaValues = {
      '0': '3DS 1.02',
      '1': '3DS 2.0 Challenge Flow - Passcode estático',
      '2': '3DS 2.0 Challenge Flow - OTP por SMS',
      '3': '3DS 2.0 Challenge Flow - OTP por Key Fob / Lector',
      '4': '3DS 2.0 Challenge Flow - OTP por App',
      '5': '3DS 2.0 Challenge Flow - OTP por otro método',
      '6': '3DS 2.0 Challenge Flow - KBA (Knowledge-Based Auth)',
      '7': '3DS 2.0 Challenge Flow - OOB Biométrico',
      '8': '3DS 2.0 Challenge Flow - OOB Login en App',
      '9': '3DS 2.0 Challenge Flow - OOB Otro método',
      'A': '3DS 2.0 Challenge Flow - Cualquier método',
      'B': '3DS Método no reconocido',
      'D': '3DS 2.0 Frictionless Flow - RBA Review',
      'E': '3DS 2.0 Attempts Server',
      'F': '3DS 2.0 Frictionless Flow - RBA (Risk-Based Auth)'
    };
  }

  parse(rawValue) {
    if (!rawValue || rawValue.length < 38) {
      return { error: `Token RJ corto: ${rawValue?.length || 0} chars (mínimo 38)` };
    }

    const rj1 = rawValue.substr(0, 2).trim();
    const rj2 = rawValue.substr(2, 36).trim();
    const rj3 = rawValue.length >= 40 ? rawValue.substr(38, 2).trim() : '';

    return {
      rj1: {
        raw: rj1,
        descripcion: this.getRJ1Description(rj1),
        esMastercard: ['0', '1', '2'].includes(rj1),
        esVisa: ['0','1','2','3','4','5','6','7','8','9','A','B','D','E','F'].includes(rj1)
      },
      rj2: {
        raw: rj2,
        descripcion: rj2 ? 'DS-TXN-ID (Directory Server Transaction ID)' : 'No presente',
        esUUID: this.isValidUUID(rj2)
      },
      rj3: { raw: rj3, descripcion: rj3 === '' ? 'Espacios (uso futuro)' : `Valor: ${rj3}` },
      valido: true
    };
  }

  getRJ1Description(code) {
    if (this.mastercardValues[code]) return `[MasterCard] ${this.mastercardValues[code]}`;
    if (this.visaValues[code]) return `[Visa] ${this.visaValues[code]}`;
    return `Valor: "${code}"`;
  }

  isValidUUID(str) {
    if (!str || str.length !== 36) return false;
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
  }
}

export const tokenRJParser = new TokenRJParser();
export default TokenRJParser;
