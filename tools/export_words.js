const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('data/curriculum.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const curr = sandbox.window.CURRICULUM_DATA;
const items = [];

if (curr.days) {
  curr.days.forEach(d => {
    if (d.words) {
      d.words.forEach((w, idx) => {
        const text = w.zh.trim();
        items.push({
          id: `w_d${d.day}_${idx + 1}`,
          text: text,
          day: d.day
        });
      });
    }
  });
}

fs.writeFileSync('tools/words_to_generate.json', JSON.stringify(items, null, 2), 'utf8');
console.log('Exported', items.length, 'words to tools/words_to_generate.json');
