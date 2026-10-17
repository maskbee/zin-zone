const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Find all onclick, onchange, oninput, onkeydown
const eventRe = /on(?:click|change|input|keydown)=["']([^"']+)["']/gi;
let m;
const calledFns = new Set();
while ((m = eventRe.exec(content)) !== null) {
  const code = m[1];
  const fnMatches = code.match(/([a-zA-Z0-9_$]+)\s*\(/g) || [];
  fnMatches.forEach(f => calledFns.add(f.replace('(', '').trim()));
}

console.log('Total event handler functions called:', calledFns.size);

// Extract all defined function names in JS
const allScripts = Array.from(content.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)).map(m => m[1]).join('\n;\n');
const defRe = /(?:function\s+([a-zA-Z0-9_$]+)|(?:window|this)\.([a-zA-Z0-9_$]+)\s*=|class\s+[a-zA-Z0-9_$]+\s*\{)/g;
const defFns = new Set();
while ((m = defRe.exec(allScripts)) !== null) {
  if (m[1]) defFns.add(m[1]);
  if (m[2]) defFns.add(m[2]);
}

// Builtins to ignore
const builtins = new Set(['alert', 'prompt', 'confirm', 'reload', 'parseInt', 'parseFloat', 'close']);

const missing = [];
for (const fn of calledFns) {
  if (!defFns.has(fn) && !builtins.has(fn)) {
    // Check if it's a method on an object like location.reload
    if (!allScripts.includes(fn)) {
      missing.push(fn);
    }
  }
}

console.log('Functions called:', Array.from(calledFns));
if (missing.length > 0) {
  console.log('\n❌ POTENTIAL MISSING FUNCTIONS:', missing);
} else {
  console.log('\n✓ PASS: All event handler functions are accounted for in JavaScript!');
}
