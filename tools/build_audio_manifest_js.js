const fs = require('fs');

const manifestRaw = JSON.parse(fs.readFileSync('data/audio_manifest.json', 'utf8'));

function extractPronunciationText(text) {
  if (!text) return '';
  const str = String(text).trim();
  const zhMatches = str.match(/[\u4e00-\u9fa5]+/g);
  if (zhMatches && zhMatches.length > 0) {
    return zhMatches.join('');
  }
  return str;
}

const completeMap = {};

for (const [key, path] of Object.entries(manifestRaw)) {
  completeMap[key] = path;
  const clean = extractPronunciationText(key);
  if (clean) {
    completeMap[clean] = path;
  }
}

const jsContent = `// Auto-generated High-Definition Neural Studio Audio Manifest
// Voice: zh-CN-XiaoxiaoNeural (Ultra-natural Studio Mandarin, same timbre as vocabulary cards)
window.AUDIO_MANIFEST = ${JSON.stringify(completeMap, null, 2)};
`;

fs.writeFileSync('data/audio_manifest.js', jsContent, 'utf8');
console.log('Generated data/audio_manifest.js with', Object.keys(completeMap).length, 'mappings');
