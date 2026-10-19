// tools/apply_dual_engine_upgrade.js
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

console.log('Applying D2C Online + B2B Wholesale Synergy Upgrade...');

// 1. Add Trial Unlock Quick Bar before Day Selector Carousel if missing
if (!html.includes('id="trialUnlockBanner"')) {
  const target = '      <!-- Day Selector Carousel -->';
  const banner = `      <!-- D2C Trial & VIP Unlock Quick Bar -->
      <div id="trialUnlockBanner" class="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-indigo-500/15 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <div class="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-xl shrink-0">
            ⚡
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <span id="trialBannerTitle" class="text-xs sm:text-sm font-black text-white">Bạn Đang Dùng Thử Miễn Phí (Day 1 & Hán-Việt 70%)</span>
              <span id="trialBannerBadge" class="text-[10px] px-2 py-0.5 rounded font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">0 ĐỒNG</span>
            </div>
            <p id="trialBannerDesc" class="text-[11px] text-slate-300 mt-0.5">
              Mở khóa trọn bộ 21 ngày & 3000 từ vựng thăng chức: <strong class="text-amber-400">399.000đ</strong> (hoặc nhận MIỄN PHÍ khi đổi máy tại Quán đối tác).
            </p>
          </div>
        </div>
        <div id="trialBannerActions" class="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button onclick="openGatekeeperModal('online')" class="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 font-black text-xs transition shadow-md flex items-center justify-center gap-1.5 whitespace-nowrap">
            <span>🚀</span>
            <span>Mở Khóa Online 399k</span>
          </button>
          <button onclick="switchMainTab('hot')" class="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold text-xs transition flex items-center justify-center gap-1 whitespace-nowrap">
            <span>📱</span>
            <span>Đổi Máy 0đ</span>
          </button>
        </div>
      </div>\n\n`;
  html = html.replace(target, banner + target);
}

// 2. Replace gatekeeperModal with 3-tab powerhouse (Online VietQR 399k / Code / Store)
const oldModalStart = '<div id="gatekeeperModal" class="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto" style="display: none;">';
const oldModalEnd = '<!-- Modal: Kết Quả Tra Cứu Bản Quyền Điện Tử';

const newModalMarkup = `<div id="gatekeeperModal" class="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-xl hidden items-center justify-center p-3 sm:p-4 overflow-y-auto" style="display: none;" onclick="if(event.target === this) closeGatekeeperModal();">
    <div class="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/50 rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative text-center m-auto max-h-[calc(100dvh-2rem)] overflow-y-auto">
      
      <!-- Close Button -->
      <button onclick="closeGatekeeperModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white text-lg w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center z-10" title="Đóng và tiếp tục dùng thử Day 1">✕</button>

      <!-- Header: Logo & Gold Glow -->
      <div class="relative mx-auto mb-3 w-16 h-16">
        <div class="w-full h-full rounded-2xl bg-gradient-to-tr from-amber-500 via-emerald-400 to-cyan-500 p-[2px] shadow-xl shadow-amber-500/30">
          <div class="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl font-black text-amber-400">
            Z
          </div>
        </div>
        <div class="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-slate-900 flex items-center gap-0.5 shadow">
          <span>🔒 VIP</span>
        </div>
      </div>

      <h3 class="text-xl sm:text-2xl font-black text-white tracking-tight">
        Mở Khóa Toàn Bộ 21 Ngày Thăng Chức
      </h3>
      <p class="text-xs text-slate-400 mt-1 mb-4">
        Zin Zone • Nạp thẳng 3.000 từ vựng công xưởng & phản xạ âm thanh 50ms
      </p>

      <!-- 3-Choice Tab Bar -->
      <div class="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold mb-4">
        <button id="tabGateOnline" onclick="switchGatekeeperTab('online')" class="flex-1 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow transition text-center px-1 font-black whitespace-nowrap">
          💳 Mua Online 399k
        </button>
        <button id="tabGateCode" onclick="switchGatekeeperTab('code')" class="flex-1 py-2 rounded-lg text-slate-400 hover:text-white transition text-center px-1 font-bold whitespace-nowrap">
          🔑 Nhập Mã
        </button>
        <button id="tabGateStore" onclick="switchGatekeeperTab('store')" class="flex-1 py-2 rounded-lg text-slate-400 hover:text-white transition text-center px-1 font-bold whitespace-nowrap">
          📱 Đổi Máy 0đ
        </button>
      </div>

      <!-- PANEL 1: MUA ONLINE TRỰC TIẾP (399.000đ) -->
      <div id="gatePanelOnline" class="text-left space-y-3">
        <div class="bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border border-amber-500/30 p-3 rounded-2xl flex items-center justify-between">
          <div>
            <span class="text-[10px] font-black uppercase text-amber-400 tracking-wider">Ưu Đãi Trực Tiếp Trên App</span>
            <div class="flex items-baseline gap-2 mt-0.5">
              <span class="text-lg font-black text-emerald-400 font-mono">399.000₫</span>
              <span class="text-xs text-slate-500 line-through font-mono">1.500.000₫</span>
              <span class="text-[10px] bg-red-500/20 text-red-300 font-bold px-1.5 py-0.5 rounded border border-red-500/30">-73%</span>
            </div>
          </div>
          <span class="text-xs text-slate-300 font-medium text-right">Dùng Vĩnh Viễn<br><span class="text-[10px] text-amber-400">Không Phí Tháng</span></span>
        </div>

        <!-- VietQR Box -->
        <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <p class="text-xs text-slate-300 mb-2 font-medium">Quét mã VietQR chuyển khoản (Hỗ trợ 40+ ngân hàng & MoMo):</p>
          <div class="inline-block p-2 bg-white rounded-xl shadow-lg border border-slate-700 mx-auto mb-3">
            <img src="https://api.vietqr.io/image/970422-0988888888-compact2.jpg?amount=399000&addInfo=ZINZONE%20VIP" alt="VietQR Zin Zone 399k" class="w-40 h-40 object-contain mx-auto">
          </div>
          
          <div class="grid grid-cols-2 gap-2 text-[11px] text-left bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 mb-3">
            <div>
              <span class="text-slate-500 block text-[10px]">Ngân hàng:</span>
              <strong class="text-white">MB Bank (Quân Đội)</strong>
            </div>
            <div>
              <span class="text-slate-500 block text-[10px]">Số tài khoản:</span>
              <strong class="text-amber-400 font-mono">0988.888.888</strong>
            </div>
            <div>
              <span class="text-slate-500 block text-[10px]">Chủ tài khoản:</span>
              <strong class="text-white">ZIN ZONE VIETNAM</strong>
            </div>
            <div>
              <span class="text-slate-500 block text-[10px]">Số tiền:</span>
              <strong class="text-emerald-400 font-mono">399.000 đ</strong>
            </div>
          </div>

          <div class="space-y-2">
            <a href="https://zalo.me/0988888888" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 font-black text-xs shadow-lg transition flex items-center justify-center gap-2">
              <span>💬</span>
              <span>Mở Zalo Xác Nhận Chuyển Khoản & Nhận Mã Ngay</span>
            </a>
            <button onclick="copyBankAccountNumber()" class="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition">
              <span>📋</span>
              <span id="btnCopyBankLabel">Sao Chép Số Tài Khoản: 0988.888.888</span>
            </button>
          </div>
        </div>

        <p class="text-[11px] text-slate-400 text-center italic">
          * Sau khi chuyển khoản, hệ thống kích hoạt tự động qua Zalo trong 1 - 3 phút!
        </p>
      </div>

      <!-- PANEL 2: NHẬP MÃ KÍCH HOẠT (Nếu đã có mã) -->
      <div id="gatePanelCode" class="hidden text-left space-y-3">
        <div class="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
          💡 Nhập mã kích hoạt được in trên hóa đơn mua máy hoặc do tổng đài Zin Zone gửi qua Zalo của bạn.
        </div>

        <div>
          <label class="block text-[11px] font-bold text-slate-300 mb-1.5">
            🔑 Mã Kích Hoạt Bản Quyền VIP:
          </label>
          <div class="relative">
            <input id="inputLicenseKey" type="text" placeholder="Ví dụ: ZZ-VIP-8888 hoặc nhập mã..." 
                   class="w-full bg-slate-900 border border-amber-500/40 focus:border-amber-400 rounded-xl pl-4 pr-28 py-3 text-sm text-amber-300 font-mono font-bold placeholder-slate-600 outline-none transition uppercase shadow-inner"
                   onkeydown="if(event.key === 'Enter') handleActivateLicense();">
            <button onclick="handleActivateLicense()" class="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs transition shadow flex items-center gap-1">
              <span>🚀</span>
              <span>Kích Hoạt</span>
            </button>
          </div>
          <p id="licenseErrorMsg" class="hidden text-xs text-rose-400 font-bold mt-2 text-center"></p>
        </div>

        <div class="pt-2">
          <button onclick="switchGatekeeperTab('online')" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs border border-amber-500/30 flex items-center justify-center gap-1.5">
            <span>💳</span>
            <span>Chưa Có Mã? Mua Online Nhanh Chỉ 399.000đ</span>
          </button>
        </div>

        <div class="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Hệ thống đối tác ủy quyền Zin Zone</span>
          <button onclick="promptAdminKey()" class="text-slate-400 hover:text-slate-200 underline">Quản trị viên</button>
        </div>
      </div>

      <!-- PANEL 3: ĐỔI MÁY NHẬN BẢN QUYỀN 0Đ (B2B Phone Stores) -->
      <div id="gatePanelStore" class="hidden text-left space-y-3">
        <div class="bg-gradient-to-br from-indigo-950/40 to-slate-950 p-4 rounded-2xl border border-indigo-500/40 text-xs text-slate-300 space-y-2 leading-relaxed">
          <div class="font-black text-amber-400 flex items-center gap-1.5 text-sm">
            <span>🎁</span>
            <span>ĐẶC QUYỀN TẶNG KÈM 1.500.000đ KHI ĐỔI MÁY:</span>
          </div>
          <p>
            Bạn đang có ý định đổi máy mới hoặc lên đời máy xịn cày game (Redmi K60 16GB, Note 12 Turbo)?
          </p>
          <ul class="space-y-1 list-disc pl-4 text-slate-300 text-[11px]">
            <li><strong>Tặng 100% Bản Quyền VIP Zin Zone</strong> cài sẵn theo máy vĩnh viễn.</li>
            <li><strong>Trả góp 0đ qua CCCD</strong> (FE Credit / Home Credit) duyệt trong 5 phút.</li>
            <li><strong>Cam kết máy zin mộc 100%</strong> kiểm định 32 bước, sai 1 đền 2.</li>
          </ul>
        </div>

        <button onclick="closeGatekeeperModal(); switchMainTab('hot');" class="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 font-black text-xs shadow-xl transition flex items-center justify-center gap-2">
          <span>📍</span>
          <span>Xem Danh Sách Cửa Hàng Điện Thoại Đối Tác Gần Bạn</span>
        </button>

        <p class="text-[10px] text-slate-500 text-center">
          * Áp dụng tại toàn bộ chuỗi cửa hàng đối tác Zin Zone khu vực Quế Võ, Yên Phong, Tiên Sơn.
        </p>
      </div>

    </div>
  </div>\n\n  `;

// Cut old modal out and replace with new modal
const modalStartIndex = html.indexOf(oldModalStart);
const modalEndIndex = html.indexOf(oldModalEnd);
if (modalStartIndex !== -1 && modalEndIndex !== -1) {
  html = html.substring(0, modalStartIndex) + newModalMarkup + html.substring(modalEndIndex);
  console.log('Successfully replaced gatekeeperModal markup!');
} else {
  console.warn('Could not locate old modal boundary precisely.');
}

// 3. Update JavaScript logic for checking license, tabs, and day lock
const oldJsLogicTarget = '    function checkDeviceLicense() {';
const newJsLogic = `    function isDeviceLicensed() {
      const savedLicense = safeStorage.getItem('zin_device_license');
      return !!(savedLicense && isValidLicenseToken(savedLicense));
    }

    function openGatekeeperModal(tab = 'online') {
      const modal = document.getElementById('gatekeeperModal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        switchGatekeeperTab(tab);
      }
    }

    function closeGatekeeperModal() {
      const modal = document.getElementById('gatekeeperModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    }

    function switchGatekeeperTab(tabName) {
      const tabs = ['online', 'code', 'store'];
      tabs.forEach(t => {
        const btn = document.getElementById('tabGate' + t.charAt(0).toUpperCase() + t.slice(1));
        const panel = document.getElementById('gatePanel' + t.charAt(0).toUpperCase() + t.slice(1));
        if (t === tabName) {
          if (btn) btn.className = 'flex-1 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow transition text-center px-1 font-black whitespace-nowrap';
          if (panel) { panel.classList.remove('hidden'); panel.style.display = 'block'; }
        } else {
          if (btn) btn.className = 'flex-1 py-2 rounded-lg text-slate-400 hover:text-white transition text-center px-1 font-bold whitespace-nowrap';
          if (panel) { panel.classList.add('hidden'); panel.style.display = 'none'; }
        }
      });
    }

    function copyBankAccountNumber() {
      copyToClipboard('0988888888', 'Đã sao chép số tài khoản MB Bank: 0988.888.888!');
      const label = document.getElementById('btnCopyBankLabel');
      if (label) label.textContent = '✓ Đã Sao Chép Số Tài Khoản: 0988.888.888';
    }

    function checkDeviceLicense(forceModal = false) {`;

if (!html.includes('function isDeviceLicensed()')) {
  html = html.replace(oldJsLogicTarget, newJsLogic);
  console.log('Added isDeviceLicensed, openGatekeeperModal, closeGatekeeperModal, switchGatekeeperTab.');
}

// 4. Update checkDeviceLicense behavior when unlicensed
const oldUnlicensedTarget = `      // 3. Unauthorized visitor: Show gatekeeper modal and lock page
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
      return false;`;

const newUnlicensedTarget = `      // 3. Visitor without license: Keep Day 1 free trial accessible
      updateLicenseBadge(null);
      updateTrialBannerState(false);
      if (forceModal && modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        switchGatekeeperTab('online');
      }
      return false;`;

if (html.includes(oldUnlicensedTarget)) {
  html = html.replace(oldUnlicensedTarget, newUnlicensedTarget);
  console.log('Updated checkDeviceLicense to preserve Day 1 Free Trial.');
}

// 5. Update updateTrialBannerState & updateLicenseBadge
const oldBadgeTarget = `    function updateLicenseBadge(token) {
      const badge = document.getElementById('headerBadgeLicense');
      if (badge) {
        const name = formatDeviceDisplayName(token);
        const shortName = name.replace(/^(Máy\\s+|Điện\\s+thoại\\s+)/i, '');
        badge.innerHTML = \`
          <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span class="hidden sm:inline">\${name} • Đã Kích Hoạt</span>
          <span class="sm:hidden text-[10px] font-bold text-emerald-400 whitespace-nowrap">\${shortName}</span>
        \`;
      }
    }`;

const newBadgeLogic = `    function updateTrialBannerState(isLicensed) {
      const banner = document.getElementById('trialUnlockBanner');
      if (!banner) return;
      if (isLicensed) {
        const myRef = getMyDeviceReferralCode();
        banner.className = 'p-3 rounded-2xl bg-slate-900/60 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md';
        banner.innerHTML = \`
          <div class="flex items-center gap-2.5">
            <span class="text-emerald-400 text-lg">🛡️</span>
            <div>
              <div class="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                <span>BẢN QUYỀN VIP TRỌN ĐỜI ĐÃ KÍCH HOẠT</span>
                <span class="px-1.5 py-0.2 rounded bg-emerald-500/20 text-[10px] font-mono">100% MỞ KHÓA</span>
              </div>
              <p class="text-[11px] text-slate-400 mt-0.5">Mã giới thiệu của máy: <strong class="text-amber-400 font-mono font-bold">[\${myRef}]</strong> (Nhận 200k khi bạn bè mua máy tại quán)</p>
            </div>
          </div>
          <button onclick="switchMainTab('share')" class="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/30 flex items-center justify-center gap-1 transition shrink-0">
            <span>🎁</span>
            <span>Chia Sẻ Nhận 200k</span>
          </button>
        \`;
      }
    }

    function updateLicenseBadge(token) {
      const badge = document.getElementById('headerBadgeLicense');
      if (badge) {
        if (token && isValidLicenseToken(token)) {
          const name = formatDeviceDisplayName(token);
          const shortName = name.replace(/^(Máy\\s+|Điện\\s+thoại\\s+)/i, '');
          badge.className = 'h-7 sm:h-auto px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-slate-950/80 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer';
          badge.onclick = () => showToast(\`Thiết bị chính hãng đã kích hoạt: \${name}\`, 'success');
          badge.innerHTML = \`
            <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span class="hidden sm:inline">\${name} • Đã Kích Hoạt</span>
            <span class="sm:hidden text-[10px] font-bold text-emerald-400 whitespace-nowrap">\${shortName}</span>
          \`;
          updateTrialBannerState(true);
        } else {
          badge.className = 'h-7 sm:h-auto px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold text-xs flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer hover:bg-amber-500/30 transition';
          badge.onclick = () => openGatekeeperModal('online');
          badge.innerHTML = \`
            <span class="text-xs">⚡</span>
            <span class="hidden sm:inline">Dùng Thử • Mở Khóa VIP</span>
            <span class="sm:hidden text-[10px] font-bold text-amber-300 whitespace-nowrap">Mở Khóa VIP</span>
          \`;
          updateTrialBannerState(false);
        }
      }
    }`;

if (html.includes('const badge = document.getElementById(\'headerBadgeLicense\');')) {
  // Replace the old updateLicenseBadge block
  const startIdx = html.indexOf('function updateLicenseBadge(token) {');
  const endIdx = html.indexOf('// --- Global State ---');
  if (startIdx !== -1 && endIdx !== -1) {
    html = html.substring(0, startIdx) + newBadgeLogic + '\n\n    ' + html.substring(endIdx);
    console.log('Replaced updateLicenseBadge with trial/VIP status switcher!');
  }
}

// 6. Update renderDayTabs and selectDay to lock Day 2..21
const oldSelectDayTarget = `    function selectDay(dayNum) {
      currentDay = Math.max(1, Math.min(21, dayNum));
      renderDayTabs();
      renderDayContent();
    }`;

const newSelectDayLogic = `    function selectDay(dayNum) {
      if (dayNum > 1 && !isDeviceLicensed()) {
        showToast(\`🔒 Day \${dayNum} thuộc Bản Quyền VIP. Hãy mở khóa online 399k hoặc nhập mã!\`, 'info');
        openGatekeeperModal('online');
        return;
      }
      currentDay = Math.max(1, Math.min(21, dayNum));
      renderDayTabs();
      renderDayContent();
    }`;

if (html.includes(oldSelectDayTarget)) {
  html = html.replace(oldSelectDayTarget, newSelectDayLogic);
  console.log('Updated selectDay to protect Day 2-21 while keeping Day 1 100% free.');
}

// Update renderDayTabs item markup to show lock icon
const oldRenderDayItem = `btn.innerHTML = \`<span>Day \${d.day}</span><span class="text-[10px] opacity-75 font-normal">(\${d.titleVi.split(' ')[0]})</span>\`;`;
const newRenderDayItem = `const isLocked = d.day > 1 && !isDeviceLicensed();
        btn.innerHTML = \`<span>Day \${d.day}</span>\${isLocked ? '<span class="text-[11px] text-amber-400">🔒</span>' : ''}<span class="text-[10px] opacity-75 font-normal">(\${d.titleVi.split(' ')[0]})</span>\`;`;

if (html.includes(oldRenderDayItem)) {
  html = html.replace(oldRenderDayItem, newRenderDayItem);
  console.log('Updated renderDayTabs with lock icons for unlicensed users.');
}

// 7. Update section-hot wholesale synergy card
const hotHeroTarget = '<div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 p-6 sm:p-8 shadow-2xl mb-8">';
const wholesaleSynergyCard = `<div class="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border-2 border-amber-500/50 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
      <div class="flex items-start gap-3 w-full md:w-auto">
        <span class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-xl shrink-0">🤝</span>
        <div>
          <div class="flex items-center gap-2">
            <h4 class="text-sm sm:text-base font-black text-white">Chính Sách Tiếp Sức Chủ Quán Điện Thoại KCN</h4>
            <span class="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-slate-950">B2B SỈ</span>
          </div>
          <p class="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Nhập sỉ máy nguyên zin từ Zin Zone được <strong>TẶNG KÈM 01 MÃ BẢN QUYỀN VIP (1.500.000đ/máy)</strong>. Giúp cửa hàng của bạn thoát khỏi cuộc chiến phá giá máy trần, bán chênh thêm <strong>400.000đ - 500.000đ/máy</strong> và được Zin Zone điều hướng khách TikTok vào tận quán!
          </p>
        </div>
      </div>
      <button onclick="openDealerPartnerModal('Đại Lý Sỉ KCN')" class="w-full md:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 font-black text-xs shadow-lg transition whitespace-nowrap flex items-center justify-center gap-1.5 shrink-0">
        <span>💬</span>
        <span>Liên Hệ Nhập Sỉ & Khóa Khu Vực</span>
      </button>
    </div>\n\n    ` + hotHeroTarget;

if (!html.includes('Chính Sách Tiếp Sức Chủ Quán Điện Thoại KCN')) {
  html = html.replace(hotHeroTarget, wholesaleSynergyCard);
  console.log('Added B2B wholesale synergy card to section-hot.');
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Dual-Engine D2C + B2B upgrade applied successfully!');
