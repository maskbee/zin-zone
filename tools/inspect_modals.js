const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const modalIds = [
  'jobModal',
  'modalInstallGuide',
  'modalMysteryChest',
  'modalFactionWars',
  'modalPlayerProfile',
  'modalPrivacyPolicy',
  'modalTermsOfService',
  'gatekeeperModal',
  'modalDeviceVerificationResult',
  'modalDealerPartner',
  'modalOnboardingFlow'
];

modalIds.forEach(id => {
  const idx = html.indexOf(`id="${id}"`);
  if (idx !== -1) {
    const start = html.lastIndexOf('<div', idx);
    const end = html.indexOf('>', idx) + 1;
    console.log(`[${id}]:\n`, html.substring(start, end));
  } else {
    console.log(`[${id}]: NOT FOUND`);
  }
});
