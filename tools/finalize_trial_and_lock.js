// tools/finalize_trial_and_lock.js
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Update checkDeviceLicense step 3
const oldStep3 = `      // 3. Unauthorized visitor: Show gatekeeper modal and lock page
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
      return false;`;

const newStep3 = `      // 3. Visitor without license: Keep Day 1 free trial accessible
      updateLicenseBadge(null);
      updateTrialBannerState(false);
      if (forceModal && modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        switchGatekeeperTab('online');
      }
      return false;`;

if (html.includes(oldStep3)) {
  html = html.replace(oldStep3, newStep3);
  console.log('Successfully updated checkDeviceLicense step 3!');
} else {
  // Try normalized replacement
  const normHtml = html.replace(/\r\n/g, '\n');
  const normOld = oldStep3.replace(/\r\n/g, '\n');
  if (normHtml.includes(normOld)) {
    html = normHtml.replace(normOld, newStep3.replace(/\r\n/g, '\n'));
    console.log('Successfully updated checkDeviceLicense step 3 (normalized)!');
  } else {
    console.warn('Could not match oldStep3');
  }
}

// 2. Update selectDay
const oldSelectDay = `    function selectDay(dayNum) {
      currentDay = Math.max(1, Math.min(21, dayNum));
      renderDayTabs();
      renderDayContent();
    }`;

const newSelectDay = `    function selectDay(dayNum) {
      if (dayNum > 1 && !isDeviceLicensed()) {
        showToast(\`🔒 Day \${dayNum} thuộc Bản Quyền VIP. Mở khóa online 399k hoặc nhập mã kích hoạt!\`, 'info');
        openGatekeeperModal('online');
        return;
      }
      currentDay = Math.max(1, Math.min(21, dayNum));
      renderDayTabs();
      renderDayContent();
    }`;

if (html.includes(oldSelectDay)) {
  html = html.replace(oldSelectDay, newSelectDay);
  console.log('Successfully updated selectDay!');
} else {
  const normHtml = html.replace(/\r\n/g, '\n');
  const normOld = oldSelectDay.replace(/\r\n/g, '\n');
  if (normHtml.includes(normOld)) {
    html = normHtml.replace(normOld, newSelectDay.replace(/\r\n/g, '\n'));
    console.log('Successfully updated selectDay (normalized)!');
  } else {
    console.warn('Could not match oldSelectDay');
  }
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Finalize trial and lock script done!');
