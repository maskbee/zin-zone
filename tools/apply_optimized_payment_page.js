// tools/apply_optimized_payment_page.js
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

console.log('Upgrading payment page and pricing architecture in index.html...');

// 1. Update trialUnlockBanner text to 299.000đ and reference the offline center savings
const oldTrialDesc = 'Mở khóa trọn bộ 21 ngày & 3000 từ vựng thăng chức: <strong class="text-amber-400">399.000đ</strong> (hoặc nhận MIỄN PHÍ khi đổi máy tại Quán đối tác).';
const newTrialDesc = 'Mở khóa trọn bộ 21 ngày & 3000 từ vựng thăng chức: <strong class="text-amber-400">299.000đ</strong> (Tiết kiệm >2 triệu so với học trung tâm KCN 1.2M/tháng).';
if (html.includes(oldTrialDesc)) {
  html = html.replace(oldTrialDesc, newTrialDesc);
}

const oldTrialBtn = '<span>Mở Khóa Online 399k</span>';
const newTrialBtn = '<span>Mở Khóa Online 299k</span>';
if (html.includes(oldTrialBtn)) {
  html = html.replace(oldTrialBtn, newTrialBtn);
}

// 2. Build the completely optimized Gatekeeper & Payment Modal
const oldModalStart = '<div id="gatekeeperModal"';
const oldModalEnd = '<!-- Modal: Kết Quả Tra Cứu Bản Quyền Điện Tử';

const startIndex = html.indexOf(oldModalStart);
const endIndex = html.indexOf(oldModalEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find gatekeeperModal boundaries.');
  process.exit(1);
}

const optimizedModalMarkup = `<div id="gatekeeperModal" class="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-xl hidden items-center justify-center p-2.5 sm:p-4 overflow-y-auto" style="display: none;" onclick="if(event.target === this) closeGatekeeperModal();">
    <div class="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-amber-500/50 rounded-3xl max-w-xl w-full p-4 sm:p-7 shadow-2xl relative text-center m-auto max-h-[calc(100dvh-1.5rem)] overflow-y-auto no-scrollbar">
      
      <!-- Close Button -->
      <button onclick="closeGatekeeperModal()" class="absolute top-3.5 right-3.5 text-slate-400 hover:text-white text-lg w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center z-10 transition" title="Đóng và tiếp tục dùng thử Day 1">✕</button>

      <!-- Live Social Proof Ticker -->
      <div class="mb-3 py-1 px-2.5 rounded-full bg-slate-950 border border-slate-800/80 inline-flex items-center gap-1.5 text-[11px] text-slate-400 overflow-hidden max-w-full">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
        <span id="gateLiveTicker" class="truncate font-medium text-slate-300">Vũ Văn A (Foxconn KCN Quế Võ) vừa kích hoạt • 2 phút trước</span>
      </div>

      <!-- Main Title & Value Proposition -->
      <div class="flex items-center justify-center gap-2 mb-1">
        <span class="text-xl">⚡</span>
        <h3 class="text-lg sm:text-2xl font-black text-white tracking-tight uppercase">
          ZIN ZONE • Thần Ngữ Tu Chân Ký
        </h3>
      </div>
      <p class="text-xs sm:text-sm font-bold text-amber-300">
        21 NGÀY NẠP THẲNG 3.000 TỪ CỐT LÕI NHÀ XƯỞNG
      </p>
      <div class="inline-block mt-1 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-200">
        Nói tiếng Trung trơn tru → <strong class="text-amber-400 font-black animate-pulse">LÊN TỔ TRƯỞNG LƯƠNG 15 - 25 TRIỆU/THÁNG!</strong>
      </div>

      <!-- 3-Choice Tab Bar -->
      <div class="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold mt-4 mb-4">
        <button id="tabGateOnline" onclick="switchGatekeeperTab('online')" class="flex-1 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow transition text-center px-1 font-black whitespace-nowrap">
          💳 Mua Online 299k
        </button>
        <button id="tabGateCode" onclick="switchGatekeeperTab('code')" class="flex-1 py-2 rounded-lg text-slate-400 hover:text-white transition text-center px-1 font-bold whitespace-nowrap">
          🔑 Nhập Mã Đã Có
        </button>
        <button id="tabGateStore" onclick="switchGatekeeperTab('store')" class="flex-1 py-2 rounded-lg text-slate-400 hover:text-white transition text-center px-1 font-bold whitespace-nowrap">
          📱 Đổi Máy Nhận 0đ
        </button>
      </div>

      <!-- PANEL 1: MUA ONLINE TRỰC TIẾP (299.000đ - ĐỘT PHÁ ANCHOR) -->
      <div id="gatePanelOnline" class="text-left space-y-3.5">
        
        <!-- Realistic Tuition Comparison (Giá thực tế trung tâm vs Zin Zone) -->
        <div class="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
          <div class="font-black text-slate-400 text-[10px] uppercase tracking-wider flex items-center justify-between">
            <span>SO SÁNH HỌC PHÍ THỰC TẾ KHU CÔNG NGHIỆP:</span>
            <span class="text-emerald-400 font-mono font-bold">TIẾT KIỆM > 2.000.000đ</span>
          </div>
          <div class="flex items-center justify-between text-[11px] text-slate-400 pb-1.5 border-b border-slate-800/80">
            <span class="flex items-center gap-1.5"><span class="text-red-400 font-bold">✕</span> Trung tâm tiếng Trung KCN:</span>
            <span class="font-mono line-through text-slate-500">800.000đ - 1.200.000đ / THÁNG</span>
          </div>
          <div class="flex items-center justify-between text-[11px] text-slate-400 pb-1.5 border-b border-slate-800/80">
            <span class="flex items-center gap-1.5"><span class="text-red-400 font-bold">✕</span> Lớp học online qua mạng:</span>
            <span class="font-mono line-through text-slate-500">400.000đ - 600.000đ / THÁNG</span>
          </div>
          <div class="flex items-center justify-between text-xs text-white pt-0.5 font-bold">
            <span class="flex items-center gap-1.5 text-emerald-400"><span>✓</span> ZIN ZONE (DÙNG TRỌN ĐỜI):</span>
            <span class="text-amber-400 font-mono font-black text-sm sm:text-base">CHỈ 299.000đ</span>
          </div>
          <p class="text-[10px] text-slate-400 italic">
            * Tính ra chưa bằng 1/3 tiền học 1 tháng ở trung tâm, không phải đi lại sau ca mệt mỏi!
          </p>
        </div>

        <!-- Urgency Timer & Scarcity Progress Bar -->
        <div class="p-2.5 rounded-xl bg-red-950/30 border border-red-500/30 flex items-center justify-between text-xs">
          <div class="flex items-center gap-1.5 text-red-400 font-bold">
            <span>⏰</span>
            <span>Ưu đãi kết thúc sau:</span>
            <span id="gateCountdown" class="font-mono font-black text-amber-300">02:14:35</span>
          </div>
          <span class="text-[10px] text-amber-300/90 font-mono font-bold">Đã bán 863/1.000 suất</span>
        </div>

        <!-- Plan Toggle: Cá Nhân 299k vs Combo 2 Người 499k -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <button type="button" id="btnPlanSingle" onclick="selectOnlinePlan('single')" class="p-3 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-left transition relative">
            <span class="absolute -top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">Khuyên Dùng</span>
            <div class="font-bold text-white text-xs">1 MÁY CÁ NHÂN</div>
            <div class="text-base sm:text-lg font-black text-emerald-400 font-mono mt-0.5">299.000₫</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Dùng trọn đời vĩnh viễn</div>
          </button>
          <button type="button" id="btnPlanCombo" onclick="selectOnlinePlan('combo')" class="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left transition relative hover:border-slate-700">
            <span class="absolute -top-2 right-2 bg-emerald-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">Tiết Kiệm Thêm 100k</span>
            <div class="font-bold text-slate-300 text-xs">COMBO 2 NGƯỜI</div>
            <div class="text-base sm:text-lg font-black text-emerald-400 font-mono mt-0.5">499.000₫ <span class="text-[10px] font-normal text-slate-400">/ 2 mã</span></div>
            <div class="text-[10px] text-slate-400 mt-0.5">Chỉ 249.000₫/người (Cùng phòng)</div>
          </button>
        </div>

        <!-- VietQR Box -->
        <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <p class="text-xs text-slate-300 mb-2 font-medium">Quét mã VietQR chuyển khoản (Hỗ trợ 40+ ngân hàng & MoMo):</p>
          <div class="inline-block p-2 bg-white rounded-xl shadow-lg border border-slate-700 mx-auto mb-3">
            <img id="gateQrImage" src="https://api.vietqr.io/image/970422-0988888888-compact2.jpg?amount=299000&addInfo=ZINZONE%20VIP" alt="VietQR Zin Zone" class="w-36 h-36 sm:w-40 sm:h-40 object-contain mx-auto">
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
              <strong id="gateTransferAmount" class="text-emerald-400 font-mono font-bold">299.000 đ</strong>
            </div>
          </div>

          <div class="space-y-2">
            <a href="https://zalo.me/0988888888" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 font-black text-xs shadow-lg transition flex items-center justify-center gap-2">
              <span>💬</span>
              <span>Mở Zalo Xác Nhận Chuyển Khoản & Nhận Mã Ngay (30 Giây)</span>
            </a>
            <button onclick="copyBankAccountNumber()" class="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition">
              <span>📋</span>
              <span id="btnCopyBankLabel">Sao Chép Số Tài Khoản: 0988.888.888</span>
            </button>
          </div>
        </div>

        <!-- 5 Core Value Bullets (Tại sao bạn nhận trọn bộ với 299k) -->
        <div class="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs space-y-2">
          <div class="font-bold text-amber-400 text-xs flex items-center gap-1 mb-1">
            <span>🎁</span>
            <span>299.000đ BẠN NHẬN ĐƯỢC TOÀN BỘ VŨ KHÍ NÀY:</span>
          </div>
          <ul class="space-y-1.5 text-slate-300 text-[11px]">
            <li class="flex items-start gap-1.5">
              <span class="text-emerald-400 font-bold">✓</span>
              <span><strong>Đánh thức 70% từ Hán-Việt trong máu:</strong> Bạn đã biết nói 70% tiếng Trung mà không cần học vẹt từ con số 0!</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-emerald-400 font-bold">✓</span>
              <span><strong>Trọn bộ 21 ngày & 3.000 từ vựng công xưởng:</strong> Phát âm Ma Âm 3X liền mạch, phản xạ âm thanh sau 50ms.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-emerald-400 font-bold">✓</span>
              <span><strong>100 câu khẩu lệnh đối đáp quản lý & Sếp Trung:</strong> Tự tin báo cáo, không bị mắng, giữ trọn tiền chuyên cần.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-emerald-400 font-bold">✓</span>
              <span><strong>Học Offline mượt mà:</strong> Mất mạng, sóng yếu trong nhà xưởng hay phòng trọ vẫn học ngon lành.</span>
            </li>
            <li class="flex items-start gap-1.5">
              <span class="text-amber-400 font-bold">🛡️</span>
              <span><strong class="text-amber-300">BẢO HÀNH HOÀN TIỀN 100%:</strong> Hoàn thành 21 ngày nếu không giao tiếp được trong xưởng, hoàn lại 100% tiền qua Zalo!</span>
            </li>
          </ul>
        </div>

        <!-- Trust Badges Under CTA -->
        <div class="pt-1 text-[11px] text-slate-400 text-center space-y-1">
          <div class="flex items-center justify-center gap-2 text-slate-300 font-medium">
            <span>🔒 Thanh toán an toàn VietQR / MB Bank</span>
            <span>•</span>
            <span class="text-emerald-400 font-bold">KHÔNG TỰ ĐỘNG GIA HẠN</span>
          </div>
          <p class="text-[10px] text-slate-500">
            Hỗ trợ kỹ thuật 24/7 qua Hotline Zalo: <strong class="text-amber-400 font-mono">0988.888.888</strong>
          </p>
        </div>

      </div>

      <!-- PANEL 2: NHẬP MÃ KÍCH HOẠT (Nếu đã có mã) -->
      <div id="gatePanelCode" class="hidden text-left space-y-3.5">
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
          <button onclick="switchGatekeeperTab('online')" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs border border-amber-500/30 flex items-center justify-center gap-1.5 transition">
            <span>💳</span>
            <span>Chưa Có Mã? Mua Online Nhanh Chỉ 299.000đ</span>
          </button>
        </div>

        <div class="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Hệ thống đối tác ủy quyền Zin Zone</span>
          <button onclick="promptAdminKey()" class="text-slate-400 hover:text-slate-200 underline">Quản trị viên</button>
        </div>
      </div>

      <!-- PANEL 3: ĐỔI MÁY NHẬN BẢN QUYỀN 0Đ (B2B Phone Stores) -->
      <div id="gatePanelStore" class="hidden text-left space-y-3.5">
        <div class="bg-gradient-to-br from-indigo-950/40 to-slate-950 p-4 rounded-2xl border border-indigo-500/40 text-xs text-slate-300 space-y-2 leading-relaxed">
          <div class="font-black text-amber-400 flex items-center gap-1.5 text-sm">
            <span>🎁</span>
            <span>ĐẶC QUYỀN TẶNG KÈM 1.500.000đ KHI ĐỔI MÁY TẠI QUÁN:</span>
          </div>
          <p>
            Bạn đang có ý định đổi máy mới hoặc lên đời máy xịn cày game (Redmi K60 16GB, Note 12 Turbo)?
          </p>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-300 text-[11px]">
            <li><strong>Tặng 100% Bản Quyền VIP Zin Zone</strong> cài sẵn theo máy vĩnh viễn (Trị giá 1.500.000đ).</li>
            <li><strong>Trả góp 0đ qua CCCD</strong> (FE Credit / Home Credit) duyệt trong 5 phút.</li>
            <li><strong>Cam kết máy zin mộc 100%</strong> kiểm định 32 bước, sai 1 đền 2 tại chỗ.</li>
          </ul>
        </div>

        <button onclick="closeGatekeeperModal(); switchMainTab('hot');" class="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 font-black text-xs shadow-xl transition flex items-center justify-center gap-2">
          <span>📍</span>
          <span>Xem Danh Sách Cửa Hàng Điện Thoại Gần Bạn Nhất</span>
        </button>

        <p class="text-[10px] text-slate-500 text-center">
          * Áp dụng tại toàn bộ chuỗi cửa hàng đối tác Zin Zone khu vực Quế Võ, Yên Phong, Tiên Sơn, Thuận Thành.
        </p>
      </div>

    </div>
  </div>\n\n  `;

html = html.substring(0, startIndex) + optimizedModalMarkup + html.substring(endIndex);
console.log('Successfully replaced gatekeeperModal with high-converting 299k model!');

// 3. Add JS support for plan switching (Single 299k vs Combo 499k) and live ticker/timer
const jsPlanTarget = 'function switchGatekeeperTab(tabName) {';
const newJsPlanSupport = `let selectedOnlinePlan = 'single';

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
        if (qrImg) qrImg.src = 'https://api.vietqr.io/image/970422-0988888888-compact2.jpg?amount=299000&addInfo=ZINZONE%20VIP';
        if (amountEl) amountEl.textContent = '299.000 đ';
      } else {
        if (btnCombo) {
          btnCombo.className = 'p-3 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-left transition relative';
        }
        if (btnSingle) {
          btnSingle.className = 'p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left transition relative hover:border-slate-700';
        }
        if (qrImg) qrImg.src = 'https://api.vietqr.io/image/970422-0988888888-compact2.jpg?amount=499000&addInfo=ZINZONE%20COMBO2';
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
        if (el) el.textContent = \`\${h}:\${m}:\${s}\`;
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

    function switchGatekeeperTab(tabName) {`;

if (!html.includes('let selectedOnlinePlan =')) {
  html = html.replace(jsPlanTarget, newJsPlanSupport);
  console.log('Added selectOnlinePlan, live countdown timer and social proof ticker in JS.');
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully written optimized payment architecture to index.html!');
