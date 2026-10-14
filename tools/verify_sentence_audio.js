const fs = require('fs');
const vm = require('vm');

const currCode = fs.readFileSync('data/curriculum.js', 'utf8');
const manifestCode = fs.readFileSync('data/audio_manifest.js', 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(currCode, sandbox);
vm.runInContext(manifestCode, sandbox);

const curr = sandbox.window.CURRICULUM_DATA;
const manifest = sandbox.window.AUDIO_MANIFEST;

function extractPronunciationText(text) {
  if (!text) return '';
  const str = String(text).trim();
  const zhMatches = str.match(/[\u4e00-\u9fa5]+/g);
  if (zhMatches && zhMatches.length > 0) {
    return zhMatches.join('');
  }
  return str;
}

let tested = 0;
let missing = 0;

curr.days.forEach(d => {
  if (d.sentences) {
    d.sentences.forEach(s => {
      tested++;
      const text = s.audioText || s.zh;
      const clean = extractPronunciationText(text);
      const audioPath = manifest[s.id] || manifest[clean] || manifest[text];
      if (!audioPath) {
        console.log(`[Day ${d.day}] MISSING MANIFEST ENTRY for ${s.id} (${text})`);
        missing++;
      } else if (!fs.existsSync(audioPath)) {
        console.log(`[Day ${d.day}] FILE NOT FOUND ON DISK: ${audioPath}`);
        missing++;
      }
    });
  }
});

console.log(`Verified ${tested} sentences: ${tested - missing} OK, ${missing} missing.`);
