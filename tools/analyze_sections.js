const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all section/tab elements
const lines = html.split('\n');
console.log('=== Tab and Section Search ===');
lines.forEach((line, idx) => {
  if (line.includes('id="tab-') || line.includes('id="sec-') || line.includes('switchMainTab(')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});

// Also check for any overflow-hidden on outer containers
console.log('\n=== Elements with overflow-hidden ===');
lines.forEach((line, idx) => {
  if (line.includes('overflow-hidden') || line.includes('overflow-y-hidden') || line.includes('h-screen')) {
    console.log(`${idx + 1}: ${line.trim().slice(0, 120)}`);
  }
});
