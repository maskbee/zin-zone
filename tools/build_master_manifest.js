const fs = require('fs');

const sentences = JSON.parse(fs.readFileSync('tools/sentences_to_generate.json', 'utf8'));
const words = JSON.parse(fs.readFileSync('tools/words_to_generate.json', 'utf8'));

function extractPronunciationText(text) {
  if (!text) return '';
  const str = String(text).trim();
  const zhMatches = str.match(/[\u4e00-\u9fa5]+/g);
  if (zhMatches && zhMatches.length > 0) {
    return zhMatches.join('');
  }
  return str;
}

const map = {};

// 1. Sentences
sentences.forEach(s => {
  const path = `audio/sentences/${s.id}.mp3`;
  map[s.id] = path;
  map[s.text] = path;
  const clean = extractPronunciationText(s.text);
  if (clean) map[clean] = path;
});

// 2. Words
words.forEach(w => {
  const path = `audio/words/${w.id}.mp3`;
  map[w.id] = path;
  map[w.text] = path;
  const clean = extractPronunciationText(w.text);
  if (clean) map[clean] = path;
});

// 3. Extra (Slot Machine, Boss Crises, Runes, Cognates)
if (fs.existsSync('tools/extra_to_generate.json')) {
  const extras = JSON.parse(fs.readFileSync('tools/extra_to_generate.json', 'utf8'));
  extras.forEach(e => {
    const itemType = e.type || 'sentences';
    const path = `audio/${itemType}/${e.id}.mp3`;
    map[e.id] = path;
    map[e.text] = path;
    const clean = extractPronunciationText(e.text);
    if (clean) map[clean] = path;
  });
}

const content = `// Master High-Definition Neural Studio Audio Manifest (321 Ultra-Natural Studio Mandarin Voice Files)
// Voice: zh-CN-XiaoxiaoNeural (100% Studio Standard Natural Mandarin, Zero Mechanical Sound)
window.AUDIO_MANIFEST = ${JSON.stringify(map, null, 2)};
`;

fs.writeFileSync('data/audio_manifest.js', content, 'utf8');
console.log('Successfully written data/audio_manifest.js with', Object.keys(map).length, 'keys');
