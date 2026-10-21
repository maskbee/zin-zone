const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

console.log("=== ACCESSIBILITY & MOBILE TOUCH AUDIT ===");

// 1. Audit Buttons without text or aria-label
const btnRegex = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
let m;
let totalButtons = 0;
let iconOnlyWithoutLabel = 0;
const issues = [];

while ((m = btnRegex.exec(html)) !== null) {
  totalButtons++;
  const attrs = m[1];
  const body = m[2].trim();
  const hasAria = /aria-label=/i.test(attrs) || /aria-labelledby=/i.test(attrs) || /title=/i.test(attrs);
  
  // Strip inner HTML tags to get pure visible text
  const text = body.replace(/<[^>]+>/g, '').trim();
  
  if ((text.length === 0 || text === '✕' || text === '×' || text === '+' || text === '-' || text === '🔊' || text === '▶') && !hasAria) {
    iconOnlyWithoutLabel++;
    issues.push(`Button #${totalButtons} with text "${text || '[icon]'}" lacks aria-label/title: ${attrs.substring(0, 60)}...`);
  }
}

console.log(`Total buttons audited: ${totalButtons}`);
console.log(`Icon-only buttons missing aria-label: ${iconOnlyWithoutLabel}`);
issues.slice(0, 10).forEach(iss => console.log('  ⚠️', iss));

// 2. Audit Inputs without labels or aria-label
const inputRegex = /<(input|select|textarea)\b([^>]*)>/gi;
let totalInputs = 0;
let inputsWithoutLabel = 0;
const inputIssues = [];

while ((m = inputRegex.exec(html)) !== null) {
  totalInputs++;
  const tag = m[1];
  const attrs = m[2];
  const hasAria = /aria-label=/i.test(attrs) || /aria-labelledby=/i.test(attrs) || /id=/i.test(attrs) && new RegExp(`<label[^>]*for=["']${attrs.match(/id=["']([^"']+)["']/)?.[1]}["']`, 'i').test(html);
  
  if (!hasAria && !/type=["'](hidden|submit|button)["']/i.test(attrs)) {
    inputsWithoutLabel++;
    inputIssues.push(`<${tag}> lacks aria-label or associated <label>: ${attrs.substring(0, 60)}...`);
  }
}

console.log(`\nTotal form inputs audited: ${totalInputs}`);
console.log(`Inputs missing accessible label: ${inputsWithoutLabel}`);
inputIssues.slice(0, 10).forEach(iss => console.log('  ⚠️', iss));

// 3. Audit Modals for role="dialog" and aria-modal="true"
const modalRegex = /id=["'](modal[a-zA-Z0-9]+|gatekeeperModal)["'][^>]*class=["'][^"']*fixed[^"']*["']/gi;
let totalModals = 0;
let modalsWithoutRole = 0;
const modalMatches = Array.from(html.matchAll(modalRegex));
modalMatches.forEach(mm => {
  totalModals++;
  const fullTag = html.substring(mm.index, html.indexOf('>', mm.index) + 1);
  if (!/role=["']dialog["']/i.test(fullTag) || !/aria-modal=["']true["']/i.test(fullTag)) {
    modalsWithoutRole++;
  }
});

console.log(`\nTotal modal dialogs audited: ${totalModals}`);
console.log(`Modals missing role="dialog" or aria-modal="true": ${modalsWithoutRole}`);
