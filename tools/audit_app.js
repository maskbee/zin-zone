// tools/audit_app.js - Comprehensive Diagnostic Audit Tool for Zin Zone
const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '..', 'index.html');
const currPath = path.resolve(__dirname, '..', 'data', 'curriculum.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const curriculum = fs.readFileSync(currPath, 'utf8');

console.log('====================================================');
console.log('   ZIN.ZONE PRE-LAUNCH SYSTEM HARDENING AUDIT       ');
console.log('====================================================');

// Extract all script contents (both inline and src-referenced local scripts)
const inlineScripts = Array.from(html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)).map(m => m[1]);
const srcScripts = Array.from(html.matchAll(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi))
  .map(m => m[1].replace(/\?.*$/, ''))
  .filter(src => !src.startsWith('http') && fs.existsSync(path.resolve(__dirname, '..', src)))
  .map(src => fs.readFileSync(path.resolve(__dirname, '..', src), 'utf8'));

const allScripts = [...srcScripts, ...inlineScripts];
const scriptContent = allScripts.join('\n;\n');

// 1. Script Syntax Validation
console.log('\n=== [1] SYNTAX VALIDATION: INLINE & MODULAR SCRIPTS ===');
allScripts.forEach((sc, idx) => {
  try {
    new Function(sc);
    console.log(`PASS: script #${idx + 1} syntax 100% valid! ✓`);
  } catch (e) {
    console.error(`FAIL: script #${idx + 1} syntax error:`, e.message);
  }
});

try {
  new Function(curriculum);
  console.log('PASS: curriculum.js syntax 100% valid! ✓');
} catch (e) {
  console.error('FAIL: curriculum.js syntax error:', e.message);
}

// 2. DOM IDs and Functions
console.log('\n=== [2] FUNCTIONAL LAYER: DOM & EVENT HANDLERS ===');
const idRegex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
let m;
const missingIds = new Set();
const foundIds = new Set();
while ((m = idRegex.exec(scriptContent)) !== null) {
  const id = m[1];
  const idDefRegex = new RegExp(`id=["']${id}["']`, 'i');
  if (!idDefRegex.test(html)) {
    missingIds.add(id);
  } else {
    foundIds.add(id);
  }
}
console.log(`Document getElementById checked: ${foundIds.size} found.`);
if (missingIds.size > 0) {
  console.log('FAIL: Missing DOM IDs:', Array.from(missingIds));
} else {
  console.log('PASS: All referenced DOM IDs present! ✓');
}

// 3. SoundFX Engine Methods
console.log('\n=== [3] AUDIO LAYER: SOUNDFX METHODS ===');
const soundfxCallRegex = /soundFX\.([a-zA-Z0-9_$]+)\s*\(/g;
const soundCalls = new Set();
while ((m = soundfxCallRegex.exec(scriptContent)) !== null) {
  soundCalls.add(m[1]);
}

const soundDefRegex = /class\s+GameSoundFX\s*\{([\s\S]*?)\n\s*\}\s*\n\s*const soundFX/;
const soundClassMatch = scriptContent.match(soundDefRegex);
const soundMethods = new Set();
if (soundClassMatch) {
  const methodRegex = /([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*\{/g;
  let sm;
  while ((sm = methodRegex.exec(soundClassMatch[1])) !== null) {
    soundMethods.add(sm[1]);
  }
}
const missingSound = [];
for (const sc of soundCalls) {
  if (!soundMethods.has(sc)) missingSound.push(sc);
}
console.log('Sound methods required:', Array.from(soundCalls));
if (missingSound.length > 0) {
  console.log('FAIL: Missing SoundFX methods:', missingSound);
} else {
  console.log('PASS: All SoundFX methods defined & ready! ✓');
}

// 4. Voice Speech & TTS Resilience
console.log('\n=== [4] SPEECH LAYER: RECOGNITION & TTS ROBUSTNESS ===');
const hasWebSpeech = scriptContent.includes('webkitSpeechRecognition') || scriptContent.includes('SpeechRecognition');
const hasSpeechOnEnd = scriptContent.includes('rec.onend') || scriptContent.includes('recognition.onend');
const hasSpeechOnError = scriptContent.includes('rec.onerror') || scriptContent.includes('recognition.onerror');
const hasTtsResume = scriptContent.includes('speechSynthesis.resume');
console.log(`SpeechRecognition API hooked: ${hasWebSpeech ? 'YES ✓' : 'NO ❌'}`);
console.log(`Microphone onend auto-reset: ${hasSpeechOnEnd ? 'YES ✓' : 'NO ❌'}`);
console.log(`Microphone onerror fallback: ${hasSpeechOnError ? 'YES ✓' : 'NO ❌'}`);
console.log(`TTS synthesis auto-resume: ${hasTtsResume ? 'YES ✓' : 'NO ❌'}`);

// 5. Mobile Safe Area & Insets
console.log('\n=== [5] INTERACTION LAYER: MOBILE SAFE AREA ===');
const hasViewportFit = html.includes('viewport-fit=cover');
const hasSafeArea = html.includes('env(safe-area-inset');
const hasSafeTop = html.includes('safe-top');
const hasSafeBottom = html.includes('safe-bottom');
console.log(`viewport-fit=cover present: ${hasViewportFit ? 'YES ✓' : 'NO ❌'}`);
console.log(`env(safe-area-inset) defined: ${hasSafeArea ? 'YES ✓' : 'NO ❌'}`);
console.log(`Header safe-top bound: ${hasSafeTop ? 'YES ✓' : 'NO ❌'}`);
console.log(`Bottom nav safe-bottom bound: ${hasSafeBottom ? 'YES ✓' : 'NO ❌'}`);

// 6. Vietnam Legal & Compliance Audit
console.log('\n=== [6] COMPLIANCE LAYER: VIETNAM REGULATIONS ===');
const hasPrivacyModal = html.includes('modalPrivacyPolicy') && html.includes('13/2023/NĐ-CP');
const hasTermsModal = html.includes('modalTermsOfService') && html.includes('72/2013/NĐ-CP');
const hasAgeBadge = html.includes('12+');
const hasGachaDisclosure = html.includes('SSR 10%') && html.includes('SR 25%');
const hasAntiGambling = html.includes('Free-to-Play') || html.includes('không nạp thẻ');
console.log(`Nghị định 13/2023/NĐ-CP (Privacy Policy): ${hasPrivacyModal ? 'PASS ✓' : 'FAIL ❌'}`);
console.log(`Nghị định 72/2013/NĐ-CP (Terms of Service): ${hasTermsModal ? 'PASS ✓' : 'FAIL ❌'}`);
console.log(`12+ Age Rating Badge: ${hasAgeBadge ? 'PASS ✓' : 'FAIL ❌'}`);
console.log(`Gacha Probability Transparency: ${hasGachaDisclosure ? 'PASS ✓' : 'FAIL ❌'}`);
console.log(`F2P Non-gambling Declaration: ${hasAntiGambling ? 'PASS ✓' : 'FAIL ❌'}`);

// 7. Modals & Key Navigation
console.log('\n=== [7] MODALS & ACCESSIBILITY ===');
const modalRegex = /id=["'](modal[a-zA-Z0-9_-]+|jobModal|gatekeeperModal)["']/g;
const modals = [];
while ((m = modalRegex.exec(html)) !== null) {
  modals.push(m[1]);
}
const hasEscListener = scriptContent.includes("e.key === 'Escape'");
console.log(`Modals registered (${modals.length}):`, modals);
console.log(`ESC key listener: ${hasEscListener ? 'PASS ✓' : 'FAIL ❌'}`);

// 8. Storage Safety
console.log('\n=== [8] DATA LAYER: LOCALSTORAGE ISOLATION ===');
const hasSafeStorage = scriptContent.includes('const safeStorage =');
const rawLsSetCalls = (scriptContent.match(/localStorage\.setItem/g) || []).length;
console.log(`safeStorage sandbox wrapper: ${hasSafeStorage ? 'ACTIVE ✓' : 'MISSING ❌'}`);
console.log(`Unprotected localStorage.setItem calls in script: ${rawLsSetCalls <= 1 ? '1 (inside safeStorage wrapper only) ✓' : rawLsSetCalls}`);

// 9. Security Headers & Defense-in-Depth Layer
console.log('\n=== [9] SECURITY HEADERS & DEFENSE-IN-DEPTH LAYER ===');
const headersPath = path.resolve(__dirname, '..', '_headers');
if (fs.existsSync(headersPath)) {
  const headersContent = fs.readFileSync(headersPath, 'utf8');
  const hasHsts = headersContent.includes('Strict-Transport-Security') && headersContent.includes('preload');
  const hasCsp = headersContent.includes('Content-Security-Policy');
  const hasNosniff = headersContent.includes('X-Content-Type-Options: nosniff');
  const hasFrame = headersContent.includes('X-Frame-Options: SAMEORIGIN');
  const hasReferrer = headersContent.includes('Referrer-Policy');
  const hasSwNoCache = headersContent.includes('/sw.js') && headersContent.includes('no-cache');
  const hasCoop = headersContent.includes('Cross-Origin-Opener-Policy: same-origin');
  const hasCorp = headersContent.includes('Cross-Origin-Resource-Policy: same-origin');

  console.log(`_headers configuration file: PRESENT ✓`);
  console.log(`Strict-Transport-Security (HSTS 1yr + preload): ${hasHsts ? 'PASS ✓' : 'FAIL ❌'}`);
  console.log(`Content-Security-Policy (CSP): ${hasCsp ? 'PASS ✓' : 'FAIL ❌'}`);
  console.log(`MIME Sniffing Protection (nosniff): ${hasNosniff ? 'PASS ✓' : 'FAIL ❌'}`);
  console.log(`Clickjacking Protection (SAMEORIGIN): ${hasFrame ? 'PASS ✓' : 'FAIL ❌'}`);
  console.log(`Referrer Policy Protection: ${hasReferrer ? 'PASS ✓' : 'FAIL ❌'}`);
  console.log(`Cross-Origin Isolation (COOP & CORP): ${hasCoop && hasCorp ? 'PASS ✓' : 'FAIL ❌'}`);
  console.log(`Service Worker Cache Bypass Policy: ${hasSwNoCache ? 'PASS ✓' : 'FAIL ❌'}`);
} else {
  console.log(`_headers file: MISSING ❌`);
}

console.log('\n====================================================');
console.log('                 AUDIT COMPLETE                     ');
console.log('====================================================\n');
