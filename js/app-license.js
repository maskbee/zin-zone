/**
 * js/app-license.js
 * Device Licensing, Cloudflare D1 Server Verification & Gatekeeper Checks
 */

// Safe LocalStorage Sandbox (Prevents Private Browsing Quota & Security Crashes)
    const safeStorage = {
      getItem(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
      },
      setItem(key, val) {
        try { localStorage.setItem(key, val); } catch (e) { console.warn('Storage write fallback:', e); }
      },
      removeItem(key) {
        try { localStorage.removeItem(key); } catch (e) {}
      }
    };

    // Parse URL params for referral code & device serial (Hoisted to top for global safety)
    const urlParams = new URLSearchParams(window.location.search);
    const incomingRef = urlParams.get('ref') || ''; // The friend who referred this user
    if (incomingRef) {
      safeStorage.setItem('zin_incoming_referrer', incomingRef.trim().toUpperCase());
    }
    const snParam = urlParams.get('sn') || '';

    // Global Authorization Revocation Barrier: Automatically revoke all test licenses across all devices
    const GLOBAL_REVOCATION_VERSION = 'v20261019_global_reset_all_devices';
    if (safeStorage.getItem('zin_revocation_checkpoint') !== GLOBAL_REVOCATION_VERSION) {
      safeStorage.removeItem('zin_device_license');
      safeStorage.removeItem('zin_my_referral_code');
      safeStorage.setItem('zin_revocation_checkpoint', GLOBAL_REVOCATION_VERSION);
    }

    // Manual Reset via URL parameter (?reset_license=1 or ?clear_auth=1)
    if (urlParams.get('reset_license') === '1' || urlParams.get('clear_license') === '1' || urlParams.get('clear_auth') === '1') {
      safeStorage.removeItem('zin_device_license');
      safeStorage.removeItem('zin_my_referral_code');
      try {
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) {}
    }



    // --- VIP GIFT LICENSE & DEVICE GATEKEEPER SYSTEM (BẢN QUYỀN QUÀ TẶNG KÈM MÁY CHÍNH HÃNG) ---

function isValidLicenseToken(token) {
      if (!token) return false;
      const clean = token.trim().toUpperCase();
      if (/^ZZ-IPHONE-[A-Z0-9_\-]+$/i.test(clean)) return true;
      if (/^ZZ-APP-[A-Z0-9_\-]+$/i.test(clean)) return true;
      if (/^ZZ-[A-Z0-9_\-]+-[A-F0-9]{4,16}$/i.test(clean)) return true;
      if (/^ZZ-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(clean)) return true;
      return false;
    }

    function deriveReferralCodeFromToken(token) {
      if (!token) return '';
      const clean = token.trim().toUpperCase();

      // 1. If standard hardware token (e.g. ZZ-Xiaomi-RedmiK60-4B9E28F1 or ZZ-22127RK46C-C4D28A9B)
      const parts = clean.split('-');
      if (parts.length >= 3) {
        const tail = parts[parts.length - 1];
        if (tail.length >= 4 && tail !== '2026' && !/^\d{4}$/.test(tail)) {
          return `ZIN-${tail.substring(0, 4)}`;
        }
        for (let i = parts.length - 2; i >= 1; i--) {
          const p = parts[i];
          if (p.length >= 4 && !['VIP', 'APP', 'ADMIN', 'IPHONE', 'ANDROID'].includes(p)) {
            return `ZIN-${p.substring(p.length - 4)}`;
          }
        }
      }

      // 2. Deterministic 4-char alphanumeric hash for master tokens or other tokens
      let hash = 5381;
      for (let i = 0; i < clean.length; i++) {
        hash = ((hash << 5) + hash) + clean.charCodeAt(i);
        hash = hash & hash;
      }
      const hex = Math.abs(hash).toString(16).toUpperCase().padStart(4, '0');
      return `ZIN-${hex.substring(0, 4)}`;
    }

    function getMyDeviceReferralCode() {
      // 1. Explicitly passed in URL during activation
      const urlMyRef = urlParams.get('my_ref') || urlParams.get('device_ref') || urlParams.get('ref_code');
      if (urlMyRef) {
        const clean = urlMyRef.trim().toUpperCase();
        safeStorage.setItem('zin_my_referral_code', clean);
        return clean;
      }

      // 2. Saved in storage
      let savedRef = safeStorage.getItem('zin_my_referral_code');
      const savedLicense = safeStorage.getItem('zin_device_license') || urlParams.get('token') || urlParams.get('license');

      // Derive code from valid license if savedRef is missing
      if (!savedRef && savedLicense && isValidLicenseToken(savedLicense)) {
        savedRef = deriveReferralCodeFromToken(savedLicense);
        safeStorage.setItem('zin_my_referral_code', savedRef);
        return savedRef;
      }

      if (savedRef) return savedRef;

      // 3. Fallback before binding
      return '';
    }

    function updateReferralCodeDisplay() {
      const myCode = getMyDeviceReferralCode();
      const refUrl = `https://zin.zone?ref=${myCode}`;

      const codeEl = document.getElementById('displayRefCode');
      if (codeEl) codeEl.textContent = myCode;

      const urlEl = document.getElementById('displayRefUrl');
      if (urlEl) urlEl.textContent = refUrl;

      const badgeCodeText = document.getElementById('badgeRefCodeText');
      if (badgeCodeText) badgeCodeText.textContent = `MÃ GIẢM GIÁ: ${myCode}`;

      const badgeRefSub = document.getElementById('badgeRefCodeSub');
      if (badgeRefSub) badgeRefSub.textContent = myCode;

      const qrImg = document.getElementById('badgeQrCodeImg');
      const qrText = document.getElementById('badgeQrCodeText');
      if (qrImg) {
        qrImg.onload = () => {
          qrImg.classList.remove('hidden');
          if (qrText) qrText.classList.add('hidden');
        };
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(refUrl)}`;
      }
    }

    function formatDeviceDisplayName(token) {
      if (!token) return 'Máy Chính Hãng';
      const clean = token.toUpperCase();
      if (clean.includes('22127RK46C') || clean.includes('REDMIK60PRO') || clean.includes('REDMI-K60')) return 'Redmi K60 Pro';
      if (clean.includes('23013PC75G') || clean.includes('POCOF5PRO') || clean.includes('POCO-F5')) return 'POCO F5 Pro';
      if (clean.includes('IPHONE')) return 'iPhone VIP';
      return 'Máy Chính Hãng';
    }

    function getOrCreateDeviceId() {
      let devId = safeStorage.getItem('zin_device_id');
      if (!devId) {
        devId = 'dev_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
        safeStorage.setItem('zin_device_id', devId);
      }
      return devId;
    }

    function isDeviceLicensed() {
      const savedToken = safeStorage.getItem('zin_license_token');
      const savedLicense = safeStorage.getItem('zin_device_license');
      return !!(savedToken && savedLicense);
    }

    async function verifyLicenseWithServer() {
      const token = safeStorage.getItem('zin_license_token');
      const deviceId = getOrCreateDeviceId();
      if (!token) return false;

      // Graceful offline fallback: factory dorm or workshop with no internet
      if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        return true;
      }

      try {
        const res = await fetch(`/api/verify?token=${encodeURIComponent(token)}&device_id=${encodeURIComponent(deviceId)}`, {
          cache: 'no-store'
        });
        const data = await res.json();
        if (!data || !data.valid) {
          // Server revoked license or device mismatch detected!
          safeStorage.removeItem('zin_license_token');
          safeStorage.removeItem('zin_device_license');
          updateLicenseBadge(null);
          updateTrialBannerState(false);
          return false;
        }
        return true;
      } catch (err) {
        // Network unreachable: allow offline study with valid signed token
        return true;
      }
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

    let selectedOnlinePlan = 'single';

    function selectOnlinePlan(plan) {
      selectedOnlinePlan = plan;
      const btnSingle = document.getElementById('btnPlanSingle');
      const btnCombo = document.getElementById('btnPlanCombo');
      const qrImg = document.getElementById('gateQrImage');
      const amountEl = document.getElementById('gateTransferAmount');

      if (plan === 'single') {
        if (btnSingle) {
          btnSingle.className = 'p-3 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-left transition relative';
        }
        if (btnCombo) {
          btnCombo.className = 'p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left transition relative hover:border-slate-700';
        }
        if (qrImg) qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=0822262695';
        if (amountEl) amountEl.textContent = '299.000 đ';
      } else {
        if (btnCombo) {
          btnCombo.className = 'p-3 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-left transition relative';
        }
        if (btnSingle) {
          btnSingle.className = 'p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left transition relative hover:border-slate-700';
        }
        if (qrImg) qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=0822262695';
        if (amountEl) amountEl.textContent = '499.000 đ';
      }
    }

    // Auto countdown timer & fake ticker for gatekeeper modal
    (function initGateTimer() {
      let seconds = 8075; // ~02:14:35
      setInterval(() => {
        seconds--;
        if (seconds <= 0) seconds = 8075;
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        const el = document.getElementById('gateCountdown');
        if (el) el.textContent = `${h}:${m}:${s}`;
      }, 1000);

      const fakeTickers = [
        'Vũ Văn A (Foxconn KCN Quế Võ) vừa kích hoạt • 2 phút trước',
        'Trần Thị B (Luxshare KCN Vân Trung) vừa kích hoạt • 4 phút trước',
        'Lê Văn C (Samsung KCN Yên Phong) vừa kích hoạt • 7 phút trước',
        'Nguyễn Thị D (Goertek KCN Quế Võ) vừa kích hoạt • 9 phút trước',
        'Phạm Văn H (KCN Tiên Sơn) vừa mua Combo 2 người • 12 phút trước'
      ];
      let tIdx = 0;
      setInterval(() => {
        tIdx = (tIdx + 1) % fakeTickers.length;
        const el = document.getElementById('gateLiveTicker');
        if (el) el.textContent = fakeTickers[tIdx];
      }, 6000);
    })();

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
      copyToClipboard('0822262695', 'Đã sao chép Số điện thoại Ví ZaloPay: 0822.262.695 (ZHOU YI)!');
      const label = document.getElementById('btnCopyBankLabel');
      if (label) label.textContent = '✓ Đã Sao Chép SĐT ZaloPay: 0822.262.695 (ZHOU YI)';
    }

    function checkDeviceLicense(forceModal = false) {
      const modal = document.getElementById('gatekeeperModal');
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get('token') || params.get('license') || params.get('activate');

      // 0. Explicit license reset trigger via URL parameter
      if (params.get('reset_license') === '1' || params.get('clear_auth') === '1') {
        safeStorage.removeItem('zin_license_token');
        safeStorage.removeItem('zin_device_license');
        safeStorage.removeItem('zin_my_referral_code');
        showToast('🛡️ Đã hủy toàn bộ bản quyền trên máy này!', 'info');
      }

      // 1. URL Token parameter auto-activation via server API
      if (tokenFromUrl) {
        const cleanKey = tokenFromUrl.trim().toUpperCase();
        const deviceId = getOrCreateDeviceId();
        try {
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (e) {}

        fetch('/api/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: cleanKey, device_id: deviceId })
        }).then(res => res.json()).then(data => {
          if (data && data.success) {
            safeStorage.setItem('zin_license_token', data.token);
            safeStorage.setItem('zin_device_license', data.code);
            safeStorage.setItem('zin_device_id', deviceId);
            const myRef = deriveReferralCodeFromToken(data.code);
            safeStorage.setItem('zin_my_referral_code', myRef);
            if (modal) modal.style.display = 'none';
            document.body.style.overflow = '';
            showToast(`🎉 Kích hoạt máy thành công qua liên kết đối tác!`, 'success');
            updateLicenseBadge(data.code);
            updateReferralCodeDisplay();
          } else {
            showToast('⚠️ Liên kết kích hoạt không hợp lệ hoặc đã dùng trên máy khác.', 'error');
          }
        }).catch(() => {});
        return true;
      }

      // 2. Local storage check + server verification
      const savedToken = safeStorage.getItem('zin_license_token');
      const savedLicense = safeStorage.getItem('zin_device_license');
      if (savedToken && savedLicense) {
        let myRef = safeStorage.getItem('zin_my_referral_code');
        if (!myRef) {
          myRef = deriveReferralCodeFromToken(savedLicense);
          safeStorage.setItem('zin_my_referral_code', myRef);
        }
        if (modal) modal.style.display = 'none';
        document.body.style.overflow = '';
        updateLicenseBadge(savedLicense);
        updateReferralCodeDisplay();

        // Asynchronously verify with server
        verifyLicenseWithServer();
        return true;
      }

      // 3. Visitor without license: Keep Day 1 free trial accessible
      updateLicenseBadge(null);
      updateTrialBannerState(false);
      if (forceModal && modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        switchGatekeeperTab('online');
      }
      return false;
    }

    async function handleActivateLicense() {
      const input = document.getElementById('inputLicenseKey');
      const errorMsg = document.getElementById('licenseErrorMsg');
      if (!input) return;

      const key = input.value.trim().toUpperCase();
      if (!key) {
        if (errorMsg) {
          errorMsg.textContent = '⚠️ Vui lòng nhập mã kích hoạt.';
          errorMsg.classList.remove('hidden');
        }
        return;
      }

      const deviceId = getOrCreateDeviceId();
      if (errorMsg) {
        errorMsg.textContent = '⏳ Đang kết nối máy chủ xác thực...';
        errorMsg.className = 'text-xs text-amber-300 font-bold mt-2 text-center';
        errorMsg.classList.remove('hidden');
      }

      try {
        const res = await fetch('/api/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: key, device_id: deviceId })
        });
        const data = await res.json();

        if (res.ok && data.success && data.token) {
          safeStorage.setItem('zin_license_token', data.token);
          safeStorage.setItem('zin_device_license', data.code);
          safeStorage.setItem('zin_device_id', deviceId);
          const myRef = deriveReferralCodeFromToken(data.code);
          safeStorage.setItem('zin_my_referral_code', myRef);

          if (errorMsg) errorMsg.classList.add('hidden');
          const modal = document.getElementById('gatekeeperModal');
          if (modal) modal.style.display = 'none';
          document.body.style.overflow = '';
          
          if (typeof soundFX !== 'undefined' && soundFX.playVictory) soundFX.playVictory();
          if (typeof particleEngine !== 'undefined' && particleEngine.burst) {
            particleEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 'gold', 50);
          }
          
          showToast(`🎉 KÍCH HOẠT THÀNH CÔNG! Bản quyền đã liên kết với máy này.`, 'success');
          updateLicenseBadge(data.code);
          updateReferralCodeDisplay();
        } else {
          if (errorMsg) {
            errorMsg.textContent = '❌ ' + (data.error || 'Mã không hợp lệ hoặc đã được sử dụng trên máy khác.');
            errorMsg.className = 'text-xs text-rose-400 font-bold mt-2 text-center';
            errorMsg.classList.remove('hidden');
          }
          if (typeof soundFX !== 'undefined' && soundFX.playWrong) soundFX.playWrong();
        }
      } catch (err) {
        if (errorMsg) {
          errorMsg.textContent = '⚠️ Không thể kết nối tới máy chủ kích hoạt. Vui lòng kiểm tra kết nối mạng.';
          errorMsg.className = 'text-xs text-rose-400 font-bold mt-2 text-center';
          errorMsg.classList.remove('hidden');
        }
        if (typeof soundFX !== 'undefined' && soundFX.playWrong) soundFX.playWrong();
      }
    }

    function showStoreLocatorFromGate() {
      const gate = document.getElementById('gatekeeperModal');
      if (gate) {
        gate.classList.add('hidden');
        gate.style.display = 'none';
      }
      switchMainTab('hot');
      showToast('📍 Đã chuyển đến danh sách Cửa Hàng Trả Góp & Điểm Hẹn Ủy Quyền!', 'info');
    }

        function updateTrialBannerState(isLicensed) {
      const banner = document.getElementById('trialUnlockBanner');
      if (!banner) return;
      if (isLicensed) {
        const myRef = getMyDeviceReferralCode();
        banner.className = 'p-3 rounded-2xl bg-slate-900/60 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md';
        banner.innerHTML = `
          <div class="flex items-center gap-2.5">
            <span class="text-emerald-400 text-lg">🛡️</span>
            <div>
              <div class="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                <span>BẢN QUYỀN VIP TRỌN ĐỜI ĐÃ KÍCH HOẠT</span>
                <span class="px-1.5 py-0.2 rounded bg-emerald-500/20 text-[10px] font-mono">100% MỞ KHÓA</span>
              </div>
              <p class="text-[11px] text-slate-400 mt-0.5">Mã giới thiệu của máy: <strong class="text-amber-400 font-mono font-bold">[${myRef}]</strong> (Nhận 200k khi bạn bè mua máy tại quán)</p>
            </div>
          </div>
          <button onclick="switchMainTab('share')" class="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/30 flex items-center justify-center gap-1 transition shrink-0">
            <span>🎁</span>
            <span>Chia Sẻ Nhận 200k</span>
          </button>
        `;
      }
    }

    function updateLicenseBadge(token) {
      const badge = document.getElementById('headerBadgeLicense');
      if (badge) {
        if (token && isValidLicenseToken(token)) {
          const name = formatDeviceDisplayName(token);
          const shortName = name.replace(/^(Máy\s+|Điện\s+thoại\s+)/i, '');
          badge.className = 'h-7 sm:h-auto px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-slate-950/80 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer';
          badge.onclick = () => {
            if (confirm(`Thiết bị đang có bản quyền: ${name}.\n\nBạn có muốn HỦY BẢN QUYỀN trên máy này để quay về trạng thái DÙNG THỬ (xác minh trang thanh toán 299k) không?`)) {
              safeStorage.removeItem('zin_device_license');
              safeStorage.removeItem('zin_my_referral_code');
              showToast('🛡️ Đã hủy bản quyền thiết bị!', 'info');
              setTimeout(() => window.location.reload(true), 600);
            }
          };
          badge.innerHTML = `
            <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span class="hidden sm:inline">${name} • Đã Kích Hoạt</span>
            <span class="sm:hidden text-[10px] font-bold text-emerald-400 whitespace-nowrap">${shortName}</span>
          `;
          updateTrialBannerState(true);
        } else {
          badge.className = 'h-7 sm:h-auto px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold text-xs flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer hover:bg-amber-500/30 transition';
          badge.onclick = () => openGatekeeperModal('online');
          badge.innerHTML = `
            <span class="text-xs">⚡</span>
            <span class="hidden sm:inline">Dùng Thử • Mở Khóa VIP</span>
            <span class="sm:hidden text-[10px] font-bold text-amber-300 whitespace-nowrap">Mở Khóa VIP</span>
          `;
          updateTrialBannerState(false);
        }
      }
    }

    // --- Global State ---
    let currentDay = 1;
    const storageKey = 'zin_zone_progress_v2';
    let progressData = {};
    try {
      progressData = JSON.parse(safeStorage.getItem(storageKey) || '{}');
    } catch (e) {
      progressData = {};
    }
    let currentTab = 'learn';

    // =========================================================================

// Ensure global accessibility for legacy and event handlers
window.safeStorage = safeStorage;
