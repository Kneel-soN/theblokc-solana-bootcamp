// recover.js
const bs58 = require('bs58');
const fs = require('fs');
b = bs58.decode('2749aGqtrsDEViPc67oQrfEH53DfQpEdV8Y2HkCJa5dxV3kDg7Y7F79rm4r6ymDKNjn7cFt5bdC9RKSmcYCKYwzj');
j = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT);
fs.writeFileSync('key.json', `[${j}]`); 