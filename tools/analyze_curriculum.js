// tools/analyze_curriculum.js
const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.resolve(__dirname, '..', 'data', 'curriculum.js'), 'utf8');
const sandbox = { window: {} };
new Function('window', code)(sandbox.window);
const cur = sandbox.window.CURRICULUM_DATA;

console.log('Title (VI):', cur.titleVi);
console.log('Total Days declared:', cur.totalDays);

let totalDayWords = 0;
let totalDaySentences = 0;
let dayStats = [];

(cur.days || []).forEach(d => {
  const words = d.words || [];
  const sentences = d.sentences || [];
  totalDayWords += words.length;
  totalDaySentences += sentences.length;
  dayStats.push({
    day: d.day,
    phase: d.phase,
    titleVi: d.titleVi,
    titleZh: d.titleZh,
    wordsCount: words.length,
    sentencesCount: sentences.length,
    sampleWords: words.slice(0, 3).map(w => w.zh || w.word || '')
  });
});

console.log('\n--- 21 DAYS WORD COUNT STATS ---');
dayStats.forEach(s => {
  console.log(`Day ${String(s.day).padStart(2, ' ')} [P${s.phase}] ${s.titleVi} (${s.titleZh}) -> ${s.wordsCount} words | ${s.sentencesCount} sentences | Samples: ${s.sampleWords.join(', ')}`);
});

let totalFrameworkSlots = 0;
(cur.frameworks || []).forEach(f => {
  totalFrameworkSlots += (f.slots || []).length;
});

let totalBossPhrases = (cur.bossCatchphrases || []).length;
let totalHanVietHacks = (cur.hanVietHacks || []).length;

console.log('\n--- TOTAL VOCABULARY IN CURRICULUM ---');
console.log(`21 Days Words (curriculum.days.words): ${totalDayWords}`);
console.log(`21 Days Sentences (curriculum.days.sentences): ${totalDaySentences}`);
console.log(`Framework Slots: ${totalFrameworkSlots}`);
console.log(`Boss Catchphrases: ${totalBossPhrases}`);
console.log(`Han Viet Hacks: ${totalHanVietHacks}`);
console.log(`GRAND TOTAL Explicit Words in Data: ${totalDayWords + totalFrameworkSlots}`);
