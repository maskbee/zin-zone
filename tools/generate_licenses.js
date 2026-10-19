/**
 * tools/generate_licenses.js
 * Command-line tool to generate valid Zin Zone activation codes.
 * 
 * Usage:
 *   node tools/generate_licenses.js --count=10 --channel=VIP
 *   node tools/generate_licenses.js --count=50 --channel=QUEVO --out=licenses.txt
 */

const fs = require('fs');
const path = require('path');

function randomHex(length = 4) {
  const chars = '0123456789ABCDEF';
  let res = '';
  for (let i = 0; i < length; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

function generateCode(channel = 'VIP') {
  const cleanChannel = channel.toUpperCase().replace(/[^A-Z0-9]/g, '') || 'VIP';
  const seg1 = randomHex(4);
  const seg2 = randomHex(4);
  return `ZZ-${cleanChannel}-${seg1}-${seg2}`;
}

const args = process.argv.slice(2);
let count = 1;
let channel = 'VIP';
let outFile = null;

args.forEach(arg => {
  if (arg.startsWith('--count=')) {
    count = parseInt(arg.split('=')[1], 10) || 1;
  } else if (arg.startsWith('--channel=')) {
    channel = arg.split('=')[1];
  } else if (arg.startsWith('--out=')) {
    outFile = arg.split('=')[1];
  }
});

console.log(`\n========================================`);
console.log(`🔑 ZIN ZONE LICENSE KEY GENERATOR`);
console.log(`Channel: [${channel}] | Count: [${count}]`);
console.log(`========================================\n`);

const codes = [];
for (let i = 1; i <= count; i++) {
  const code = generateCode(channel);
  const url = `https://zin.zone?token=${code}`;
  codes.push({ index: i, code, url });
  console.log(`${String(i).padStart(3, ' ')}. ${code}  -->  ${url}`);
}

if (outFile) {
  const filePath = path.resolve(process.cwd(), outFile);
  const content = codes.map(c => `${c.code}\t${c.url}`).join('\n');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n[✓] Saved ${count} codes to ${filePath}`);
}

console.log(`\n[✓] Done! All codes comply with isValidLicenseToken regex.\n`);
