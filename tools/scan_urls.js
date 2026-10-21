const fs = require('fs');
const path = require('path');

const scanFiles = [
  'index.html',
  'pocket-cards.html',
  '404.html',
  'sw.js',
  'js/app-license.js',
  'js/app-audio.js',
  'js/app-gamification.js',
  'js/app-curriculum.js',
  'js/app-ui.js',
  'data/curriculum.js',
  'data/audio_manifest.js'
];

const urlRegex = /https?:\/\/[^\s"'`<>)]+/g;
const urlsByDomain = {};

scanFiles.forEach(f => {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    let m;
    while ((m = urlRegex.exec(text)) !== null) {
      const clean = m[0].replace(/[.,;:]+$/, '');
      try {
        const u = new URL(clean);
        const domain = u.origin;
        if (!urlsByDomain[domain]) urlsByDomain[domain] = [];
        urlsByDomain[domain].push({ file: f, url: clean });
      } catch (e) {}
    }
  }
});

console.log('=== EXTERNAL ORIGINS DETECTED ===');
Object.keys(urlsByDomain).sort().forEach(domain => {
  console.log(`\nOrigin: ${domain} (${urlsByDomain[domain].length} references)`);
  const samples = urlsByDomain[domain].slice(0, 3);
  samples.forEach(s => console.log(`   [${s.file}] ${s.url}`));
});
