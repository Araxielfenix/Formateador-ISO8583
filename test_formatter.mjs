import { iso8583Engine } from './src/iso8583Engine.js';

const sampleReq = `[T: 11:16:06.764][D: 11044][C:    554629******2353][Iap: iap_BBVEMI-M2-05    ][Lp: 0:I0 ][Rw: W][L:  662]ISO02500007702003238C48128A1801E003000000000030000071417160690574511153907140714539901000111003456790121554629******2353=****0016313461050000000000124033UNPSP                 DF           MEXMX0278946354            00010001484016P387CPAY+0000000019EGLO000000000000000010          379& 0000800379! Q100002 90! Q200002 09! C000026 **** 001          5  1 2 2! C400012 102510023660! R700013              ! CE00202 01kBNnCDvCPMtJmT9q/V+Tr0hB4oJ0                                                                                                                                                                            ! RJ00040 2 ae37f673-cd20-4e7c-b244-e792df5e2b66`;

console.log('--- 1. PARSE ORIGINAL ISO ---');
const parsed = iso8583Engine.parse(sampleReq);
console.log('Header:', parsed.header);
console.log('MTI:', parsed.mti);
console.log('Bitmap:', parsed.primaryBitmapHex);
console.log('Original Amount F4:', parsed.fields[4]?.valor);

console.log('\n--- 2. MODIFY FIELD 4 (AMOUNT) TO $500.00 & TOKEN RJ ---');
const modifiedFields = { ...parsed.fields };
modifiedFields[4] = { id: 4, type: 'fija', valor: '000000050000' };

const rebuiltIso = iso8583Engine.build(parsed.header, parsed.mti, modifiedFields, parsed.tokens);
console.log('Rebuilt ISO string:', rebuiltIso);

console.log('\n--- 3. RE-PARSE REBUILT ISO TO CONFIRM ---');
const reParsed = iso8583Engine.parse(rebuiltIso);
console.log('Re-parsed Amount F4:', reParsed.fields[4]?.valor);
console.log('Re-parsed Bitmap:', reParsed.primaryBitmapHex);
console.log('Re-parsed Token RJ:', reParsed.tokens.find(t => t.id === 'RJ'));
