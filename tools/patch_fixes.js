// tools/patch_fixes.js
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Add hidden targets for pwaInstallBanner and inputCustomModel if missing
if (!html.includes('id="pwaInstallBanner"')) {
  html = html.replace(
    '<!-- Application Logic -->',
    '<!-- Hidden Accessibility & System State Targets -->\n  <div id="pwaInstallBanner" class="hidden" style="display:none;" aria-hidden="true"></div>\n  <input type="hidden" id="inputCustomModel" value="" aria-hidden="true">\n\n  <!-- Application Logic -->'
  );
}

// 2. Add playVictory and playWrong to GameSoundFX if missing from the class definition
if (!html.includes('playVictory() {')) {
  const target = '      playChest() {';
  const addition = '      playVictory() {\n        if (!this.enabled) return;\n        this.playChest();\n      }\n      playWrong() {\n        if (!this.enabled) return;\n        this.playError();\n      }\n';
  html = html.replace(target, addition + target);
}

// 3. Null safe requestCustomSourcing
const oldReq = "const model = document.getElementById('inputCustomModel').value.trim() || 'Dòng máy yêu cầu';";
const newReq = "const inputEl = document.getElementById('inputCustomModel');\n      const model = (inputEl ? inputEl.value.trim() : '') || 'Dòng máy yêu cầu';";
if (html.includes(oldReq)) {
  html = html.replace(oldReq, newReq);
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Patch successfully applied to index.html!');
