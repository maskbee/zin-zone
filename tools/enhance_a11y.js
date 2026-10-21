const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

console.log("Applying Phase 6 Accessibility & Mobile Scaling Enhancements...");

// 1. Viewport scaling: allow pinch-to-zoom for low-vision users
html = html.replace(
  '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">',
  '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">'
);

// 2. Add role="status" aria-live="polite" to toast notification
html = html.replace(
  '<div id="toastNotification"',
  '<div id="toastNotification" role="status" aria-live="polite"'
);

// 3. Modals: add role="dialog" aria-modal="true"
const modalTargets = [
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

modalTargets.forEach(id => {
  const target = `id="${id}" class="fixed`;
  const repl = `id="${id}" role="dialog" aria-modal="true" class="fixed`;
  if (html.includes(target) && !html.includes(`id="${id}" role="dialog"`)) {
    html = html.replace(target, repl);
    console.log(`✓ Added role="dialog" to ${id}`);
  }
});

// 4. Modal Close Buttons: expand touch target to min 44x44px and add aria-label="Đóng cửa sổ"
const closeBtnPattern = /<button\s+onclick="(close[a-zA-Z0-9]+)\(\)"\s+class="absolute top-4 right-4 text-slate-400 hover:text-white text-lg w-8 h-8 rounded-full[^"]*">✕<\/button>/g;

html = html.replace(closeBtnPattern, (match, fnName) => {
  return `<button onclick="${fnName}()" aria-label="Đóng cửa sổ" title="Đóng" class="absolute top-3 right-3 text-slate-400 hover:text-white text-lg min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-slate-800 transition active:scale-95">✕</button>`;
});

// 5. Onboarding dot buttons
for (let s = 1; s <= 4; s++) {
  const dotTarget = `<button onclick="setOnboardingStep(${s})" id="onboardingDot_${s}"`;
  const dotRepl = `<button onclick="setOnboardingStep(${s})" id="onboardingDot_${s}" aria-label="Bước ${s}"`;
  if (html.includes(dotTarget) && !html.includes(`aria-label="Bước ${s}"`)) {
    html = html.replace(dotTarget, dotRepl);
    console.log(`✓ Added aria-label to onboardingDot_${s}`);
  }
}

// 6. Form inputs and selects: add aria-label
const inputLabels = {
  'id="audioRepeatMode"': 'id="audioRepeatMode" aria-label="Chế độ lặp âm thanh"',
  'id="speechRateSelect"': 'id="speechRateSelect" aria-label="Tốc độ phát âm"',
  'id="frameworkSelect"': 'id="frameworkSelect" aria-label="Chọn mẫu câu công xưởng"',
  'id="slotWordSelect"': 'id="slotWordSelect" aria-label="Chọn từ vựng thay thế"',
  'id="referralSlider"': 'id="referralSlider" aria-label="Số người giới thiệu ước tính"',
  'id="jobRegionSelect"': 'id="jobRegionSelect" aria-label="Lọc việc làm theo khu vực KCN"',
  'id="inputApplicantName"': 'id="inputApplicantName" aria-label="Họ và tên ứng viên"',
  'id="inputApplicantPhone"': 'id="inputApplicantPhone" aria-label="Số điện thoại hoặc Zalo ứng viên"',
  'id="selectApplicantProgress"': 'id="selectApplicantProgress" aria-label="Tiến độ học tiếng Trung hiện tại"',
  'id="inputDeviceVerifyCode"': 'id="inputDeviceVerifyCode" aria-label="Mã định danh hoặc kích hoạt máy"',
  'id="inputLicenseKey"': 'id="inputLicenseKey" aria-label="Mã kích hoạt Zin Zone"'
};

Object.entries(inputLabels).forEach(([target, repl]) => {
  if (html.includes(target) && !html.includes(`${target} aria-label`)) {
    html = html.replace(target, repl);
    console.log(`✓ Added aria-label to ${target}`);
  }
});

// 7. Focus visibility CSS for accessibility
const focusStyle = `
    /* Keyboard Focus Visibility for WCAG 2.4.7 */
    :focus-visible {
      outline: 2px solid #fbbf24 !important;
      outline-offset: 2px !important;
    }
    :focus:not(:focus-visible) {
      outline: none !important;
    }
`;

if (!html.includes('Keyboard Focus Visibility for WCAG 2.4.7')) {
  html = html.replace('/* iOS Safari Clean Custom Select Dropdowns */', focusStyle + '    /* iOS Safari Clean Custom Select Dropdowns */');
  console.log('✓ Added :focus-visible accessibility style');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ index.html successfully updated with Phase 6 Accessibility & Mobile Scaling!');
