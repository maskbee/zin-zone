// tools/deep_audit.js
const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '..', 'index.html');
const currPath = path.resolve(__dirname, '..', 'data', 'curriculum.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const curriculum = fs.readFileSync(currPath, 'utf8');

console.log('=== [DEEP AUDIT START] ===');

// 1. Check sections
const tabs = ['check', 'hot', 'learn', 'share', 'jobs'];
tabs.forEach(t => {
  const hasSec = html.includes(`id="section-${t}"`) || html.includes(`id='section-${t}'`);
  console.log(`Tab section-${t}:`, hasSec ? 'OK' : 'MISSING!');
});

// 2. Extract script content
const scriptMatch = html.match(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/i);
const script = scriptMatch ? scriptMatch[1] : '';

// 3. Test script execution in virtual DOM / window context
const windowMock = {
  location: { search: '?mode=app', hash: '' },
  navigator: { userAgent: 'ZinZoneApp Android' },
  speechSynthesis: {
    speak: () => {},
    cancel: () => {},
    resume: () => {},
    pause: () => {},
    paused: false,
    getVoices: () => []
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  addEventListener: () => {},
  removeEventListener: () => {},
  scrollTo: () => {},
  innerWidth: 375,
  innerHeight: 812,
  matchMedia: () => ({ matches: false }),
  CURRICULUM_DATA: null
};

// Evaluate curriculum first
eval(`(function(window){ ${curriculum} })(windowMock)`);
console.log('Curriculum loaded in mock:', !!windowMock.CURRICULUM_DATA);

// Check all getElementById in script
const idRegex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
let m;
const missingIds = [];
while ((m = idRegex.exec(script)) !== null) {
  const id = m[1];
  if (!html.includes(`id="${id}"`) && !html.includes(`id='${id}'`)) {
    missingIds.push(id);
  }
}
console.log('Missing DOM IDs:', missingIds);

// Check all onclick in html
const onclickRegex = /onclick=["']([^"']+)["']/g;
const calledExpressions = [];
while ((m = onclickRegex.exec(html)) !== null) {
  calledExpressions.push(m[1]);
}
console.log(`Total onclick handlers: ${calledExpressions.length}`);

// Look for potential syntax errors or unhandled references in onclick
calledExpressions.forEach(expr => {
  // Check if expr references an undefined function
  const funcMatch = expr.match(/^([a-zA-Z0-9_$]+)\s*\(/);
  if (funcMatch) {
    const fnName = funcMatch[1];
    if (fnName === 'if') return;
    const hasDef = script.includes(`function ${fnName}`) || script.includes(`${fnName} =`) || script.includes(`const ${fnName} =`);
    if (!hasDef) {
      console.log('POTENTIALLY UNDEFINED onclick handler:', fnName, 'in', expr);
    }
  }
});

console.log('=== [DEEP AUDIT FINISHED] ===');
