const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('data/curriculum.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const curr = sandbox.window.CURRICULUM_DATA;
const items = [];

// 1. Sentences
if (curr.days) {
  curr.days.forEach(d => {
    if (d.sentences) {
      d.sentences.forEach(s => {
        const text = s.audioText || s.zh;
        items.push({
          id: s.id,
          text: text,
          day: d.day
        });
      });
    }
  });
}

// 2. Boss catchphrases
if (curr.bossCatchphrases) {
  curr.bossCatchphrases.forEach((b, idx) => {
    items.push({
      id: `boss_${idx + 1}`,
      text: b.zh,
      type: 'boss'
    });
  });
}

fs.writeFileSync('tools/sentences_to_generate.json', JSON.stringify(items, null, 2), 'utf8');
console.log('Exported', items.length, 'items to tools/sentences_to_generate.json');
