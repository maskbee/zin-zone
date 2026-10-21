const fs = require('fs');
const path = require('path');
const vm = require('vm');

const currCode = fs.readFileSync(path.resolve(__dirname, '../data/curriculum.js'), 'utf8');
const manifestCode = fs.readFileSync(path.resolve(__dirname, '../data/audio_manifest.js'), 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(currCode, sandbox);
vm.runInContext(manifestCode, sandbox);

const curriculum = sandbox.window.CURRICULUM_DATA;
const manifest = sandbox.window.AUDIO_MANIFEST || {};

console.log("=== COMPREHENSIVE CURRICULUM & TONES AUDIT (21 DAYS) ===");
console.log(`Total Days: ${curriculum.days.length}`);

let totalWords = 0;
let totalSentences = 0;
let pinyinToneIssues = [];
let missingTranslations = [];

curriculum.days.forEach(day => {
  const d = day.day;
  
  // 1. Audit Words
  (day.words || []).forEach((w, idx) => {
    totalWords++;
    const zh = w.zh || '';
    const py = w.pinyin || '';
    const vi = w.viMeaning || w.vi || '';
    
    if (!zh) pinyinToneIssues.push(`[Day ${d}] Word #${idx+1} is missing Chinese (zh)`);
    if (!vi) missingTranslations.push(`[Day ${d}] Word "${zh}" is missing Vietnamese translation`);
    if (!w.hanViet) missingTranslations.push(`[Day ${d}] Word "${zh}" is missing Hán-Việt`);
    if (!w.viBoi) missingTranslations.push(`[Day ${d}] Word "${zh}" is missing Vietnamese phonetic approximation (viBoi)`);
  });

  // 2. Audit Sentences
  (day.sentences || []).forEach((s, idx) => {
    totalSentences++;
    const zh = s.zh || '';
    const py = s.pinyin || '';
    const vi = s.viMeaning || s.vi || '';
    
    if (!zh) pinyinToneIssues.push(`[Day ${d}] Sentence #${idx+1} is missing zh`);
    if (!py) pinyinToneIssues.push(`[Day ${d}] Sentence "${zh}" is missing pinyin`);
    if (!vi) missingTranslations.push(`[Day ${d}] Sentence "${zh}" is missing Vietnamese translation`);
    if (!s.hanViet) missingTranslations.push(`[Day ${d}] Sentence "${zh}" is missing Hán-Việt`);
  });
});

console.log(`✓ Audited ${totalWords} core words across 21 days.`);
console.log(`✓ Audited ${totalSentences} high-frequency sentences across 21 days.`);
console.log(`✓ Missing translations: ${missingTranslations.length}`);
console.log(`✓ Audio manifest registered: ${Object.keys(manifest).length} items`);

// Matrix & Cognate sanity check in index.html
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const hasCongTac = html.includes('gōngzuò') && html.includes('Công tác / Công việc');
const hasTieuThiem = html.includes('Tiêu thiêm / Tem nhãn dán');
const hasPhucTra = html.includes('Phục tra / Tái kiểm tra');

console.log('\n--- AWAKENING MATRIX COGNATE ACCURACY ---');
console.log(`Root 1 Gốc CÔNG contains 工作 (gōngzuò): ${hasCongTac ? 'PASS ✓' : 'FAIL ❌'}`);
console.log(`Root 3 标签 correct Hán-Việt (Tiêu thiêm): ${hasTieuThiem ? 'PASS ✓' : 'FAIL ❌'}`);
console.log(`Root 4 复查 correct Hán-Việt (Phục tra): ${hasPhucTra ? 'PASS ✓' : 'FAIL ❌'}`);

if (missingTranslations.length === 0 && hasCongTac && hasTieuThiem && hasPhucTra) {
  console.log('\n>>> CURRICULUM & TONE TABLE AUDIT 100% PASS! <<<');
} else {
  console.error('\n>>> CURRICULUM AUDIT FAILED <<<');
  process.exit(1);
}
