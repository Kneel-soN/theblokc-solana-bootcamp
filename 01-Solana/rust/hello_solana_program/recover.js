// recover.js
import 'dotenv/config'
const bs58 = require('bs58');
const fs = require('fs');
b = bs58.decode(process.env.spk);
j = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT);
fs.writeFileSync('key.json', `[${j}]`); 
