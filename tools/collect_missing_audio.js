const fs = require('fs');
const path = require('path');

// 1. Read curriculum
const curriculumText = fs.readFileSync('data/curriculum.js', 'utf8');
const curriculumMatch = curriculumText.match(/window\.CURRICULUM_DATA\s*=\s*(\{[\s\S]*?\});/);
const curriculum = (new Function('return ' + curriculumMatch[1]))();

// 2. Read index.html for BOSS_CRISES and awakening
const indexHtml = fs.readFileSync('index.html', 'utf8');

const missingItems = [];
const seenTexts = new Set();

function addCandidate(id, text, type = 'sentences') {
  if (!text) return;
  const clean = text.replace(/^[0-9\.\s\-\—\:\：]+/, '').replace(/[\r\n\t]+/g, ' ').trim();
  if (!clean || seenTexts.has(clean)) return;
  seenTexts.add(clean);

  const fileExists = fs.existsSync(path.join('audio', type, `${id}.mp3`));
  missingItems.push({
    id,
    text: clean,
    type,
    exists: fileExists
  });
}

// Slot Machine combinations
if (curriculum.frameworks) {
  curriculum.frameworks.forEach(f => {
    f.slots.forEach((s, idx) => {
      let fullZh = '';
      if (f.id === 'frame_1') fullZh = `我想${s.zh}`;
      else if (f.id === 'frame_2') fullZh = `有没有${s.zh}？`;
      else if (f.id === 'frame_3') fullZh = `这个多少${s.zh}？`;
      else if (f.id === 'frame_4') fullZh = `因为${s.causeZh}，所以${s.resZh}`;
      else if (f.id === 'frame_5') fullZh = `请帮我${s.zh}`;

      addCandidate(`slot_${f.id}_${idx}`, fullZh, 'sentences');
    });
  });
}

// Boss Crises
const bossCrisisRegex = /zh:\s*'([^']+)'/g;
// Let's parse BOSS_CRISES directly from index.html
const bossSection = indexHtml.match(/const BOSS_CRISES = (\[[\s\S]*?\]);/);
if (bossSection) {
  const crises = (new Function('return ' + bossSection[1]))();
  crises.forEach(c => {
    addCandidate(`crisis_boss_${c.id}`, c.zh, 'sentences');
    c.answers.forEach((a, aIdx) => {
      addCandidate(`crisis_ans_${c.id}_${aIdx}`, a.text, 'sentences');
    });
  });
}

// Boss Catchphrases (if any missing)
if (curriculum.bossCatchphrases) {
  curriculum.bossCatchphrases.forEach((b, idx) => {
    addCandidate(`boss_${idx + 1}`, b.zh, 'sentences');
  });
}

// Awakening runes
const runeMatch = indexHtml.match(/const AWAKENING_RUNES = (\[[\s\S]*?\]);/);
if (runeMatch) {
  const runes = (new Function('return ' + runeMatch[1]))();
  runes.forEach((r, idx) => {
    addCandidate(`rune_${idx + 1}`, r.char, 'words');
  });
}

// Awakening cognates
const cognateMatch = indexHtml.match(/const AWAKENING_COGNATES = (\[[\s\S]*?\]);/);
if (cognateMatch) {
  const cognates = (new Function('return ' + cognateMatch[1]))();
  cognates.forEach((c, idx) => {
    addCandidate(`cognate_${idx + 1}`, c.zh, 'words');
  });
}

console.log('Total candidates found:', missingItems.length);
const needGen = missingItems.filter(i => !i.exists);
console.log('Candidates missing audio on disk:', needGen.length);
console.log(JSON.stringify(needGen.map(i => ({ id: i.id, text: i.text })), null, 2));

fs.writeFileSync('tools/extra_to_generate.json', JSON.stringify(needGen, null, 2));
