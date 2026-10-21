/**
 * tools/split_scripts.js
 * Cleanly partitions inline scripts in index.html into 5 dedicated modules:
 * 1. js/app-license.js
 * 2. js/app-audio.js
 * 3. js/app-gamification.js
 * 4. js/app-curriculum.js
 * 5. js/app-ui.js
 *
 * Replaces Tailwind CDN with compiled CSS link.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const indexPath = path.join(__dirname, '../index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

const jsDir = path.join(__dirname, '../js');
if (!fs.existsSync(jsDir)) {
  fs.mkdirSync(jsDir, { recursive: true });
}

// 1. Locate Script 4 (Splash Script)
const s4Start = indexHtml.indexOf('<script>\n    (function() {\n      let currentSplashSlide = 1;');
if (s4Start === -1) {
  console.error('Could not locate Script 4 in index.html');
  process.exit(1);
}
const s4End = indexHtml.indexOf('</script>', s4Start) + 9;
const splashCode = indexHtml.substring(s4Start + 8, s4End - 9).trim();

// 2. Locate Script 5 (Main Script)
const s5Start = indexHtml.indexOf('<script>\n    // Safe LocalStorage Sandbox');
if (s5Start === -1) {
  console.error('Could not locate Script 5 in index.html');
  process.exit(1);
}
const s5End = indexHtml.indexOf('</script>', s5Start) + 9;
const mainCode = indexHtml.substring(s5Start + 8, s5End - 9).trim();

console.log('Script 4 extracted:', splashCode.length, 'chars');
console.log('Script 5 extracted:', mainCode.length, 'chars');

// 3. Locate slice markers in mainCode
const pSound = mainCode.indexOf('// RETRO ARCADE SOUND ENGINE');
const pParticle = mainCode.indexOf('// PARTICLE ENGINE (CONFETTI');
const pAwakening = mainCode.indexOf('// HÁN-VIỆT COGNITIVE AWAKENING ENGINE');
const pBoss = mainCode.indexOf('// BOSS BATTLE ARENA ENGINE');
const pTabs = mainCode.indexOf('// Switch Main Tabs');
const pAudioPool = mainCode.indexOf('// HIGH-PERFORMANCE PRE-CACHED ATOMIC AUDIO ENGINE');
const pMastered = mainCode.indexOf('function isSentenceMastered');
const pBonus = mainCode.indexOf('function updateBonusCalculator');

if ([pSound, pParticle, pAwakening, pBoss, pTabs, pAudioPool, pMastered, pBonus].some(p => p === -1)) {
  console.error('Failed to locate one or more section markers in mainCode!');
  process.exit(1);
}

// Module 1: License & Device Security
const codeLicense = `/**
 * js/app-license.js
 * Device Licensing, Cloudflare D1 Server Verification & Gatekeeper Checks
 */

${mainCode.substring(0, pSound).trim()}

// Ensure global accessibility for legacy and event handlers
window.safeStorage = safeStorage;
`;

// Module 2: Audio Engine & Speech
const codeAudio = `/**
 * js/app-audio.js
 * Retro Arcade WebAudio Engine + Atomic Pre-Cached Audio Pool + Tam Đoạn Ma Âm
 */

${mainCode.substring(pSound, pParticle).trim()}

${mainCode.substring(pAudioPool, pMastered).trim()}

// Ensure global accessibility for legacy and event handlers
window.soundFX = soundFX;
window.sfx = soundFX;
`;

// Module 3: Gamification Core
const codeGamification = `/**
 * js/app-gamification.js
 * Gamification Core: Particles, Boss Arena, Mystery Chests, Factions, Player Profile
 */

${mainCode.substring(pParticle, pAwakening).trim()}

${mainCode.substring(pBoss, pTabs).trim()}

// Ensure global accessibility for legacy and event handlers
window.particleEngine = particleEngine;
`;

// Module 4: Curriculum & Awakening
const codeCurriculum = `/**
 * js/app-curriculum.js
 * Hán-Việt Cognitive Awakening Engine + 21-Day Dynamic Curriculum Renderer
 */

${mainCode.substring(pAwakening, pBoss).trim()}

${mainCode.substring(pMastered, pBonus).trim()}
`;

// Module 5: UI & Modals Controller
const codeUI = `/**
 * js/app-ui.js
 * Primary UI Controller: Splash Carousel, Tabs, Modals, Install Banners, DOM Init
 */

// --- STARTUP SPLASH CAROUSEL CONTROLLER ---
${splashCode}

// --- TAB SWITCHING & MODAL CONTROLS ---
${mainCode.substring(pTabs, pAudioPool).trim()}

// --- VIRAL SHARING, JOBS, PWA INSTALL & INITIALIZATION ---
${mainCode.substring(pBonus).trim()}
`;

const modules = [
  { file: 'app-license.js', code: codeLicense },
  { file: 'app-audio.js', code: codeAudio },
  { file: 'app-gamification.js', code: codeGamification },
  { file: 'app-curriculum.js', code: codeCurriculum },
  { file: 'app-ui.js', code: codeUI }
];

// Validate syntax before writing
modules.forEach(m => {
  try {
    new vm.Script(m.code, { filename: m.file });
    console.log('✓ Validated syntax: ' + m.file + ' (' + m.code.length + ' chars)');
  } catch (err) {
    console.error('✗ Syntax error in ' + m.file + ':', err.message);
    process.exit(1);
  }
});

// Write module files
modules.forEach(m => {
  fs.writeFileSync(path.join(jsDir, m.file), m.code, 'utf8');
  console.log('✓ Written: js/' + m.file);
});

// Update index.html
// 1. Replace Tailwind CDN
let updatedHtml = indexHtml.replace(
  '<script defer src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>',
  '<link rel="stylesheet" href="css/app.css?v=20261021_v1">'
);

// 2. Remove Script 4 (Splash) by exact indices
const updatedS4Start = updatedHtml.indexOf('<script>\n    (function() {\n      let currentSplashSlide = 1;');
const updatedS4End = updatedHtml.indexOf('</script>', updatedS4Start) + 9;
updatedHtml = updatedHtml.substring(0, updatedS4Start) + updatedHtml.substring(updatedS4End);

// 3. Replace Script 5 (Main) with modular script tags
const updatedS5Start = updatedHtml.indexOf('<script>\n    // Safe LocalStorage Sandbox');
const updatedS5End = updatedHtml.indexOf('</script>', updatedS5Start) + 9;

const scriptTags = `<!-- ========================================== -->
  <!-- MODULAR ZIN ZONE APPLICATION SCRIPTS       -->
  <!-- ========================================== -->
  <script defer src="js/app-license.js?v=20261021_v1"></script>
  <script defer src="js/app-audio.js?v=20261021_v1"></script>
  <script defer src="js/app-gamification.js?v=20261021_v1"></script>
  <script defer src="js/app-curriculum.js?v=20261021_v1"></script>
  <script defer src="js/app-ui.js?v=20261021_v1"></script>`;

updatedHtml = updatedHtml.substring(0, updatedS5Start) + scriptTags + updatedHtml.substring(updatedS5End);

fs.writeFileSync(indexPath, updatedHtml, 'utf8');
console.log('✓ Updated index.html successfully!');
