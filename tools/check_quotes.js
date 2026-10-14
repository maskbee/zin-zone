const fs = require('fs');
const vm = require('vm');
const code = fs.readFileSync('data/curriculum.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const curr = sandbox.window.CURRICULUM_DATA;

let count = 0;
curr.days.forEach(d => {
  if (d.sentences) {
    d.sentences.forEach(s => {
      const text = s.audioText || s.zh;
      if (text.includes("'") || text.includes('"') || text.includes('\\')) {
        console.log(`Day ${d.day} sentence has quotes: ${s.id} -> ${text}`);
        count++;
      }
    });
  }
});
console.log('Total sentences with quotes:', count);
