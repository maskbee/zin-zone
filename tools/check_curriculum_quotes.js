global.window = global;
require('../data/curriculum.js');
const data = window.CURRICULUM_DATA;

let issues = 0;
data.days.forEach(d => {
  d.words.forEach(w => {
    if (w.zh.includes("'") || w.zh.includes('"')) {
      console.log(`Day ${d.day} word has quote:`, w.zh);
      issues++;
    }
  });
  d.sentences.forEach(s => {
    if (s.audioText.includes("'") || s.audioText.includes('"')) {
      console.log(`Day ${d.day} sentence audioText has quote:`, s.audioText);
      issues++;
    }
  });
});

console.log('Total quote issues in words/sentences:', issues);
