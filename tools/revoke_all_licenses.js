// tools/revoke_all_licenses.js
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

console.log('Applying global license revocation barrier and test reset mechanisms...');

// 1. Add global revocation barrier right after urlParams definition
const revocationBarrierCode = `    // Global Authorization Revocation Barrier: Automatically revoke all test licenses across all devices
    const GLOBAL_REVOCATION_VERSION = 'v20261019_global_reset_all_devices';
    if (safeStorage.getItem('zin_revocation_checkpoint') !== GLOBAL_REVOCATION_VERSION) {
      safeStorage.removeItem('zin_device_license');
      safeStorage.removeItem('zin_my_referral_code');
      safeStorage.setItem('zin_revocation_checkpoint', GLOBAL_REVOCATION_VERSION);
      console.log('[ZinZone Security] All previous test licenses revoked. Ready for paid conversion verification.');
    }

    // Manual Reset via URL parameter (?reset_license=1 or ?clear_auth=1)
    if (urlParams.get('reset_license') === '1' || urlParams.get('clear_license') === '1' || urlParams.get('clear_auth') === '1') {
      safeStorage.removeItem('zin_device_license');
      safeStorage.removeItem('zin_my_referral_code');
      try {
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) {}
    }\n\n`;

if (!html.includes('GLOBAL_REVOCATION_VERSION')) {
  const target = "const snParam = urlParams.get('sn') || '';";
  html = html.replace(target, target + '\n\n' + revocationBarrierCode);
  console.log('Added GLOBAL_REVOCATION_VERSION barrier and URL reset parameter.');
}

// 2. Remove automatic native app auto-licensing bypass in checkDeviceLicense
const oldNativeBypass = `      // 0. Official Native APK / Bundled App Container Auto-Activation
      // When running inside the official Zin Zone Android App (zone.zin.app), auto-activate
      const isNativeApp = navigator.userAgent.indexOf('ZinZoneApp') !== -1 ||
                          params.get('mode') === 'app' ||
                          params.get('mode') === 'native_app';
      if (isNativeApp) {
        let appToken = safeStorage.getItem('zin_device_license');
        if (!appToken || !isValidLicenseToken(appToken)) {
          let modelTag = 'OFFICIAL-APP';
          const uaMatch = navigator.userAgent.match(/Android[^;]+;\\s*([^;)]+)/i);
          if (uaMatch && uaMatch[1]) {
            modelTag = uaMatch[1].replace(/[^a-zA-Z0-9]/g, '').substring(0, 16).toUpperCase() || 'OFFICIAL-APP';
          }
          appToken = \`ZZ-APP-\${modelTag}-2026\`;
          safeStorage.setItem('zin_device_license', appToken);
        }
        let myRef = safeStorage.getItem('zin_my_referral_code');
        if (!myRef || myRef === 'ZIN-8899') {
          myRef = params.get('my_ref') || deriveReferralCodeFromToken(appToken);
          safeStorage.setItem('zin_my_referral_code', myRef);
        }
        if (modal) {
          modal.style.display = 'none';
        }
        document.body.style.overflow = '';
        updateLicenseBadge(appToken);
        updateReferralCodeDisplay();
        return true;
      }`;

const newNativeHandling = `      // 0. Explicit license reset trigger via URL parameter
      if (params.get('reset_license') === '1' || params.get('clear_auth') === '1') {
        safeStorage.removeItem('zin_device_license');
        safeStorage.removeItem('zin_my_referral_code');
        showToast('🛡️ Đã hủy toàn bộ bản quyền trên máy này!', 'info');
      }`;

if (html.includes(oldNativeBypass)) {
  html = html.replace(oldNativeBypass, newNativeHandling);
  console.log('Removed auto-licensing bypass so that native app and PWA start as unlicensed trial.');
} else {
  // Normalize line endings and try
  const normHtml = html.replace(/\r\n/g, '\n');
  const normOld = oldNativeBypass.replace(/\r\n/g, '\n');
  if (normHtml.includes(normOld)) {
    html = normHtml.replace(normOld, newNativeHandling.replace(/\r\n/g, '\n'));
    console.log('Removed auto-licensing bypass (normalized line endings).');
  } else {
    console.warn('Could not locate oldNativeBypass verbatim.');
  }
}

// 3. Update promptAdminKey to support typing "RESET" or "CLEAR" to revoke license
const oldPromptAdmin = `    function promptAdminKey() {
      const code = prompt('🔑 Nhập mã kích hoạt quản trị viên / kỹ thuật viên:');
      if (code) {
        const input = document.getElementById('inputLicenseKey');
        if (input) input.value = code;
        handleActivateLicense();
      }
    }`;

const newPromptAdmin = `    function promptAdminKey() {
      const code = prompt('🔑 Nhập mã kích hoạt quản trị viên (hoặc gõ "RESET" để hủy toàn bộ bản quyền thiết bị):');
      if (code) {
        const clean = code.trim().toUpperCase();
        if (clean === 'RESET' || clean === 'CLEAR') {
          safeStorage.removeItem('zin_device_license');
          safeStorage.removeItem('zin_my_referral_code');
          showToast('🛡️ Đã hủy toàn bộ bản quyền thiết bị! Đang làm mới...', 'info');
          setTimeout(() => window.location.reload(true), 700);
          return;
        }
        const input = document.getElementById('inputLicenseKey');
        if (input) input.value = code;
        handleActivateLicense();
      }
    }`;

if (html.includes(oldPromptAdmin)) {
  html = html.replace(oldPromptAdmin, newPromptAdmin);
  console.log('Updated promptAdminKey with RESET option.');
} else {
  const normHtml = html.replace(/\r\n/g, '\n');
  const normOld = oldPromptAdmin.replace(/\r\n/g, '\n');
  if (normHtml.includes(normOld)) {
    html = normHtml.replace(normOld, newPromptAdmin.replace(/\r\n/g, '\n'));
    console.log('Updated promptAdminKey with RESET option (normalized).');
  }
}

// 4. Update badge click handler when licensed to offer a one-tap revocation for test verification
const oldBadgeClick = "badge.onclick = () => showToast(`Thiết bị chính hãng đã kích hoạt: ${name}`, 'success');";
const newBadgeClick = `badge.onclick = () => {
            if (confirm(\`Thiết bị đang có bản quyền: \${name}.\\n\\nBạn có muốn HỦY BẢN QUYỀN trên máy này để quay về trạng thái DÙNG THỬ (xác minh trang thanh toán 299k) không?\`)) {
              safeStorage.removeItem('zin_device_license');
              safeStorage.removeItem('zin_my_referral_code');
              showToast('🛡️ Đã hủy bản quyền thiết bị!', 'info');
              setTimeout(() => window.location.reload(true), 600);
            }
          };`;

if (html.includes(oldBadgeClick)) {
  html = html.replace(oldBadgeClick, newBadgeClick);
  console.log('Updated license badge click to allow 1-tap revocation.');
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully written revocation and reset logic to index.html!');
