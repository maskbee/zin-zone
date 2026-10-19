/**
 * tools/apply_v26_updates.js
 * Applies user-requested refinements to index.html:
 * 1. Startup Splash: 3 slides focused on Tà Tu Hán Ngữ & Siêu Trí Nhớ (Liên tưởng, phóng đại, bản năng, 1 lần nhớ vĩnh viễn, củng cố Ma Âm).
 * 2. Payment Modal: ZaloPay as the ONLY payment channel + Jump to Zalo to claim activation key + Private fish pond onboarding.
 * 3. Phone shops use activation codes.
 * 4. Install guide modal: Apple .mobileconfig direct install guide + Android APK direct install guide.
 * 5. Floating App Install Bar for mobile web visitors.
 */

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
let content = fs.readFileSync(indexPath, 'utf8');

console.log('[1/5] Updating Startup Splash Slides...');

// 1. Splash Slide 1, 2, 3 content update
const oldSlide1Pattern = /<!-- ================= SLIDE 1: HUYẾT MẠCH THỨC TỈNH ================= -->[\s\S]*?<!-- ================= SLIDE 2: VỨT BÚT ĐI ================= -->/;
const newSlide1Content = `<!-- ================= SLIDE 1: TÀ TU HÁN NGỮ - ĐỘC CHIÊU HACK NÃO ================= -->
          <div id="splashSlide_1" class="splash-slide-panel">
            <!-- Artwork 1: Brain Exploding with Hyperlink Neural Fireworks -->
            <div class="splash-art-box" style="background:linear-gradient(180deg, rgba(69,26,3,0.3) 0%, rgba(2,6,23,0.7) 100%); border-color:rgba(245,158,11,0.35);">
              <div style="display:flex; align-items:center; justify-content:center; gap:12px; font-size:22px; padding:2px 0;">
                <span style="padding:6px 10px; border-radius:12px; background:rgba(245,158,11,0.2); border:1px solid rgba(251,191,36,0.4); color:#fde047;">🧠</span>
                <span style="color:rgba(245,158,11,0.7); font-size:14px; font-weight:900;">⚡⚡⚡</span>
                <span style="padding:6px 10px; border-radius:12px; background:rgba(239,68,68,0.2); border:1px solid rgba(248,113,113,0.4); color:#fca5a5;">💥</span>
              </div>
              <!-- Contrast Box -->
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:6px; font-size:10.5px;">
                <div style="padding:4px 6px; border-radius:6px; background:rgba(15,23,42,0.9); border:1px solid rgba(244,63,94,0.3); color:#fca5a5;">
                  <span style="display:block; font-weight:800;">❌ Học vẹt sách vở</span>
                  <span style="font-size:9.5px; color:#94a3b8;">Đọc 50 lần vẫn quên</span>
                </div>
                <div style="padding:4px 6px; border-radius:6px; background:rgba(15,23,42,0.9); border:1px solid rgba(16,185,129,0.4); color:#6ee7b7;">
                  <span style="display:block; font-weight:800;">⚡ Tà Tu Zin Zone</span>
                  <span style="font-size:9.5px; color:#fde047; font-weight:800;">1 chiêu chọc trúng huyệt</span>
                </div>
              </div>
            </div>

            <!-- Main Vietnamese Text 1 -->
            <h2 class="splash-title-text" style="color:#fbbf24;">
              Tà tu Hán ngữ: Không học vẹt như trẻ con! Đột phá phản xạ bằng độc chiêu dị biệt.
            </h2>
            <p class="splash-desc-text">
              Vứt bỏ sách vở giáo điều buồn ngủ! Zin Zone dẫn dắt bạn tu luyện tà đạo: đập nát tư duy cũ, dùng siêu liên tưởng, phóng đại cực độ và va chạm cảm xúc kích thích bản năng để "khắc sâu vào não ngay lần đầu tiên"!
            </p>
            <div class="splash-tag-pill" style="background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.35); color:#fde047;">
              <span>🔥 Tà Tu Đột Phá</span> • <span>Nói Không Với Học Vẹt</span>
            </div>
          </div>

          <!-- ================= SLIDE 2: SIÊU KÍCH THÍCH - 1 LẦN NHỚ VĨNH VIỄN ================= -->`;

content = content.replace(oldSlide1Pattern, newSlide1Content);

const oldSlide2Pattern = /<!-- ================= SLIDE 2: SIÊU KÍCH THÍCH - 1 LẦN NHỚ VĨNH VIỄN ================= -->[\s\S]*?<!-- ================= SLIDE 3: THÀNH NGHIỆN THÔNG QUAN ================= -->/;
const newSlide2Content = `<!-- ================= SLIDE 2: SIÊU KÍCH THÍCH - 1 LẦN NHỚ VĨNH VIỄN ================= -->
          <div id="splashSlide_2" class="splash-slide-panel hidden">
            <!-- Artwork 2: Instinct Hormone & Sensory Collision -->
            <div class="splash-art-box" style="background:linear-gradient(180deg, rgba(8,51,68,0.3) 0%, rgba(2,6,23,0.7) 100%); border-color:rgba(6,182,212,0.35);">
              <div style="display:flex; align-items:center; justify-content:center; gap:12px; font-size:22px; padding:2px 0;">
                <span style="padding:6px 10px; border-radius:12px; background:rgba(225,29,72,0.2); border:1px solid rgba(244,63,94,0.4); color:#fda4af;" title="Kích thích bản năng">🔞</span>
                <span style="color:#22d3ee; font-size:14px; font-weight:900;">➔➔➔</span>
                <span style="padding:6px 10px; border-radius:12px; background:rgba(6,182,212,0.2); border:1px solid rgba(34,211,238,0.4); color:#67e8f9;" title="Khắc sâu vỏ não">🧠</span>
              </div>
              <!-- Spicy Hook Examples -->
              <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:6px; margin-top:6px; font-size:10.5px;">
                <div style="padding:4px 6px; border-radius:6px; background:rgba(15,23,42,0.9); border:1px solid rgba(245,158,11,0.25); color:#e2e8f0;">
                  <span style="display:block; color:#fbbf24; font-weight:800;">打卡 (Đá cà)</span>
                  <span style="font-size:9.5px; color:#94a3b8;">Quẹt thẻ = thốn buốt rốn</span>
                </div>
                <div style="padding:4px 6px; border-radius:6px; background:rgba(15,23,42,0.9); border:1px solid rgba(6,182,212,0.25); color:#e2e8f0;">
                  <span style="display:block; color:#22d3ee; font-weight:800;">加班 (Gia ban)</span>
                  <span style="font-size:9.5px; color:#94a3b8;">Tăng ca = Đấm mặt sếp vòi tiền</span>
                </div>
              </div>
            </div>

            <!-- Main Vietnamese Text 2 -->
            <h2 class="splash-title-text" style="color:#22d3ee;">
              Liên tưởng quái chiêu, kích thích bản năng: Nghe đúng 1 lần là nhớ vĩnh viễn!
            </h2>
            <p class="splash-desc-text">
              Vỏ não chỉ khắc ghi những gì cực sốc, hài hước, tình dục hoặc chạm tới bản năng sinh tồn! Mỗi từ vựng công xưởng được gắn kèm kíp nổ liên tưởng độc chiêu, nghe 1 lần nhớ cả đời. Muốn quên cũng không quên nổi!
            </p>
            <div class="splash-tag-pill" style="background:rgba(6,182,212,0.12); border:1px solid rgba(6,182,212,0.35); color:#67e8f9;">
              <span>⚡ Siêu Ký Ức Bản Năng</span> • <span>Nghe 1 Lần Nhớ Cả Đời</span>
            </div>
          </div>

          <!-- ================= SLIDE 3: CỦNG CỐ MA ÂM - PHẢN XẠ TRỌN ĐỜI ================= -->`;

content = content.replace(oldSlide2Pattern, newSlide2Content);

const oldSlide3Pattern = /<!-- ================= SLIDE 3: CỦNG CỐ MA ÂM - PHẢN XẠ TRỌN ĐỜI ================= -->[\s\S]*?<!-- Main Vietnamese Text 3 \(Exact User Copy\) -->[\s\S]*?<\/div>[\s\S]*?<\/div>/;
const newSlide3Content = `<!-- ================= SLIDE 3: CỦNG CỐ MA ÂM - PHẢN XẠ TRỌN ĐỜI ================= -->
          <div id="splashSlide_3" class="splash-slide-panel hidden">
            <!-- Artwork 3: Acoustic Loop + Supervisor Crown -->
            <div class="splash-art-box" style="background:linear-gradient(180deg, rgba(6,78,59,0.3) 0%, rgba(2,6,23,0.7) 100%); border-color:rgba(16,185,129,0.35);">
              <div style="display:flex; align-items:center; justify-content:center; gap:10px; font-size:22px; padding:2px 0;">
                <span style="padding:6px 10px; border-radius:12px; background:rgba(59,130,246,0.2); border:1px solid rgba(96,165,250,0.4); color:#93c5fd;" title="Vòng lặp Ma Âm">🔄🎧</span>
                <span style="color:#34d399; font-size:12px; font-weight:900; letter-spacing:1px;">21 NGÀY ➔</span>
                <span style="padding:6px 10px; border-radius:12px; background:rgba(245,158,11,0.2); border:1px solid rgba(251,191,36,0.4); color:#fde047;" title="Thăng chức Tổ Trưởng">👑</span>
              </div>
              <!-- 3 Steps -->
              <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:4px; margin-top:6px; font-size:10.5px;">
                <div style="padding:3px 2px; border-radius:6px; background:rgba(15,23,42,0.9); border:1px solid rgba(16,185,129,0.3); color:#e2e8f0;">
                  <span style="display:block; color:#34d399; font-weight:800;">Bước 1</span>
                  <span style="font-size:9.5px; color:#94a3b8;">1 Lần Nhớ Ngay</span>
                </div>
                <div style="padding:3px 2px; border-radius:6px; background:rgba(15,23,42,0.9); border:1px solid rgba(16,185,129,0.3); color:#e2e8f0;">
                  <span style="display:block; color:#34d399; font-weight:800;">Bước 2</span>
                  <span style="font-size:9.5px; color:#94a3b8;">Ma Âm Củng Cố</span>
                </div>
                <div style="padding:3px 2px; border-radius:6px; background:rgba(15,23,42,0.9); border:1px solid rgba(245,158,11,0.3); color:#e2e8f0;">
                  <span style="display:block; color:#fbbf24; font-weight:800;">Bước 3</span>
                  <span style="font-size:9.5px; color:#34d399; font-weight:800;">Trí Nhớ Trọn Đời</span>
                </div>
              </div>
            </div>

            <!-- Main Vietnamese Text 3 -->
            <h2 class="splash-title-text" style="color:#34d399;">
              Vòng lặp Ma Âm củng cố: Khóa chặt vào trí nhớ dài hạn, thăng chức Tổ trưởng!
            </h2>
            <p class="splash-desc-text">
              Ghi nhớ 1 lần kết hợp Ma Âm ba chiều lặp lại đúng nhịp hưng phấn. 21 ngày nuốt trọn 3.000 từ xưởng tự nhiên như hơi thở, phản xạ bật ra tức thì trước mặt sếp. Lương 15 - 25 triệu nằm trong tầm tay!
            </p>
            <div class="splash-tag-pill" style="background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.35); color:#6ee7b7;">
              <span>👑 Trí Nhớ Vĩnh Viễn</span> • <span>Đắc Đạo Tổ Trưởng</span>
            </div>
          </div>`;

content = content.replace(oldSlide3Pattern, newSlide3Content);

// Update button labels in Splash
content = content.replace('TIẾP THEO: VỨT BÚT ĐI', 'TIẾP THEO: KÍCH THÍCH BẢN NĂNG');
content = content.replace('TIẾP THEO: THÀNH NGHIỆN', 'TIẾP THEO: THĂNG CHỨC TỔ TRƯỞNG');
content = content.replace('KÍCH HOẠT 70% THIÊN PHÚ NGAY', 'ĐẮC ĐẠO TÀ TU HÁN NGỮ NGAY');

// Update Splash HUD texts in script
content = content.replace("TẦNG 1: HUYẾT MẠCH THỨC TỈNH", "TẦNG 1: TÀ TU HACK NÃO");
content = content.replace("70% THIÊN PHÚ", "ĐỘT PHÁ TÀ ĐẠO");
content = content.replace("TẦNG 2: GIẢI PHÓNG KHẨU NGỮ", "TẦNG 2: KÍCH THÍCH BẢN NĂNG");
content = content.replace("85% NĂNG LƯỢNG", "1 LẦN LÀ NHỚ");
content = content.replace("TẦNG 3: ĐỘT PHÁ CẢNH GIỚI", "TẦNG 3: CẢNH GIỚI TỔ TRƯỞNG");
content = content.replace("100% ĐẮC ĐẠO", "TRÍ NHỚ VĨNH VIỄN");

console.log('[2/5] Updating Payment Gate Modal to Pure ZaloPay Channel...');

// Replace Tab bar labels
content = content.replace(/💳 Mua Online 299k/g, '💳 Mua Ví ZaloPay 299k');
content = content.replace(/📱 Đổi Máy Nhận 0đ/g, '📱 Mua Máy Tặng Kèm Mã VIP');

// Replace VietQR Box with ZaloPay Payment Box
const oldVietQrPattern = /<!-- VietQR Box -->[\s\S]*?<!-- 5 Core Value Bullets/;
const newZaloPayBox = `<!-- ZaloPay Payment Box (Kênh Thanh Toán Duy Nhất) -->
        <div class="bg-slate-950 p-4 rounded-2xl border-2 border-cyan-500/40 text-center relative overflow-hidden">
          <div class="absolute -right-8 -top-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <!-- Channel Badge -->
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-black mb-3">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>KÊNH THANH TOÁN DUY NHẤT: VÍ ZALOPAY</span>
          </div>

          <p class="text-xs text-slate-300 mb-2 font-medium">
            Quét mã ZaloPay hoặc chuyển vào Số điện thoại Ví ZaloPay bên dưới:
          </p>

          <!-- QR Code Display -->
          <div class="inline-block p-2 bg-white rounded-2xl shadow-xl border-2 border-cyan-400 mx-auto mb-3">
            <img id="gateQrImage" src="https://api.vietqr.io/image/970422-0988888888-compact2.jpg?amount=299000&addInfo=ZINZONE%20VIP" alt="ZaloPay Zin Zone" class="w-36 h-36 sm:w-40 sm:h-40 object-contain mx-auto">
            <div class="mt-1 bg-cyan-600 text-white text-[10px] font-black py-0.5 rounded uppercase tracking-wider">Ví Điện Tử ZaloPay</div>
          </div>
          
          <!-- ZaloPay Account Info -->
          <div class="grid grid-cols-2 gap-2 text-[11px] text-left bg-slate-900/90 p-3 rounded-xl border border-slate-800 mb-3">
            <div>
              <span class="text-slate-500 block text-[10px]">Cổng thanh toán:</span>
              <strong class="text-cyan-400 font-bold">Ví Điện Tử ZaloPay</strong>
            </div>
            <div>
              <span class="text-slate-500 block text-[10px]">Số điện thoại Ví:</span>
              <strong class="text-amber-400 font-mono font-black text-xs sm:text-sm">0988.888.888</strong>
            </div>
            <div>
              <span class="text-slate-500 block text-[10px]">Tên tài khoản:</span>
              <strong class="text-white">ZIN ZONE VIETNAM</strong>
            </div>
            <div>
              <span class="text-slate-500 block text-[10px]">Số tiền cần chuyển:</span>
              <strong id="gateTransferAmount" class="text-emerald-400 font-mono font-black text-xs sm:text-sm">299.000 đ</strong>
            </div>
            <div class="col-span-2 pt-1 border-t border-slate-800 text-[10px] text-slate-400">
              Nội dung chuyển: <strong class="text-amber-300 font-mono">ZIN VIP</strong> hoặc ghi SĐT của bạn
            </div>
          </div>

          <!-- Crucial CTA: Add Zalo to Receive Code and Enter Private Fish Pond -->
          <div class="space-y-2">
            <a href="https://zalo.me/0988888888" target="_blank" rel="noopener noreferrer" class="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 active:scale-98 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/25 transition flex items-center justify-center gap-2">
              <span class="text-base">💬</span>
              <span>BẤM VÀO ĐÂY KẾT BẠN ZALO NHẬN MÃ (30 GIÂY)</span>
            </a>
            <button onclick="copyBankAccountNumber()" class="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition">
              <span>📋</span>
              <span id="btnCopyBankLabel">Sao Chép SĐT ZaloPay: 0988.888.888</span>
            </button>
          </div>

          <!-- Private Fish Pond Guarantee Notice -->
          <div class="mt-2.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10.5px] text-amber-300/90 leading-relaxed text-left">
            ⚡ <strong>BƯỚC BẮT BUỘC:</strong> Sau khi chuyển tiền qua ví ZaloPay, hãy bấm nút vàng ở trên để kết bạn với <strong>Zalo Tổng Đài (0988.888.888)</strong> và gửi ảnh chụp màn hình. Chuyên viên sẽ kích hoạt mã VIP ngay cho bạn và mời bạn vào <strong>Nhóm Kín VIP</strong> hỗ trợ trực tiếp 1-1!
          </div>
        </div>

        <!-- 5 Core Value Bullets`;

content = content.replace(oldVietQrPattern, newZaloPayBox);

// Update value bullets in payment modal to reflect Tà Tu Hán Ngữ
content = content.replace('Đánh thức 70% từ Hán-Việt trong máu: Bạn đã biết nói 70% tiếng Trung mà không cần học vẹt từ con số 0!', 'Độc chiêu Tà Tu Hán Ngữ & Siêu trí nhớ: Liên tưởng quái chiêu, kích thích bản năng, nghe 1 lần là khắc sâu vào vỏ não!');

// Update copy button text and function
content = content.replace("Đã sao chép số tài khoản MB Bank: 0988.888.888!", "Đã sao chép Số điện thoại Ví ZaloPay: 0988.888.888!");
content = content.replace("✓ Đã Sao Chép Số Tài Khoản: 0988.888.888", "✓ Đã Sao Chép SĐT ZaloPay: 0988.888.888");

// Update Panel 3 (Phone store partners)
const oldStorePanelPattern = /<!-- PANEL 3: ĐỔI MÁY NHẬN BẢN QUYỀN 0Đ \(B2B Phone Stores\) -->[\s\S]*?<!-- Modal: Kết Quả Tra Cứu/;
const newStorePanel = `<!-- PANEL 3: MUA ĐIỆN THOẠI TẶNG KÈM MÃ VIP (B2B Phone Stores) -->
      <div id="gatePanelStore" class="hidden text-left space-y-3.5">
        <div class="bg-gradient-to-br from-indigo-950/40 to-slate-950 p-4 rounded-2xl border border-indigo-500/40 text-xs text-slate-300 space-y-2 leading-relaxed">
          <div class="font-black text-amber-400 flex items-center gap-1.5 text-sm">
            <span>🎁</span>
            <span>TẶNG KÈM MÃ BẢN QUYỀN VIP KHI MUA MÁY TẠI ĐỐI TÁC:</span>
          </div>
          <p>
            Bạn mua điện thoại tại các cửa hàng đối tác Zin Zone (hoặc trả góp 0đ qua CCCD)?
          </p>
          <ul class="space-y-1.5 list-disc pl-4 text-slate-300 text-[11px]">
            <li><strong>Tặng kèm 01 Mã Kích Hoạt VIP Zin Zone</strong> được in trên hóa đơn / phiếu bảo hành (Trị giá 1.500.000đ).</li>
            <li><strong>Nhập mã tại Tab "Nhập Mã Đã Có"</strong> để mở khóa trọn đời vĩnh viễn trên máy mới.</li>
            <li><strong>Hỗ trợ trả góp 0đ duyệt trong 5 phút</strong> tại Quế Võ, Yên Phong, Tiên Sơn (Redmi K60, Note 12 Turbo).</li>
          </ul>
        </div>

        <button onclick="closeGatekeeperModal(); switchMainTab('hot');" class="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 font-black text-xs shadow-xl transition flex items-center justify-center gap-2">
          <span>📍</span>
          <span>Xem Danh Sách Cửa Hàng Đối Tác Gần Bạn Nhất</span>
        </button>

        <p class="text-[10px] text-slate-500 text-center">
          * Mỗi điện thoại bán ra được cấp 01 mã kích hoạt độc quyền không trùng lặp.
        </p>
      </div>

    </div>
  </div>

  <!-- Modal: Kết Quả Tra Cứu`;

content = content.replace(oldStorePanelPattern, newStorePanel);

console.log('[3/5] Updating Install Guide Modal with Apple .mobileconfig Direct Install...');

// Update iOS Guide in modalInstallGuide
const oldIosGuidePattern = /<!-- iOS Instructions \(Option A: Safari Add to Home Screen\) -->[\s\S]*?<!-- Android Instructions: Direct Native APK/;
const newIosGuide = `<!-- iOS Instructions (Phương án A: Tệp cấu hình .mobileconfig + Phương án B: Safari) -->
      <div id="guideContentIOS" class="hidden mt-5 text-left bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-4">
        
        <!-- Option 1: Mobileconfig Direct Profile Install -->
        <div class="bg-gradient-to-br from-amber-500/15 via-slate-900 to-amber-600/10 border-2 border-amber-400/80 rounded-2xl p-4 shadow-xl">
          <div class="flex items-center justify-between mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider">
              Khuyên Dùng • Chuẩn Apple iOS
            </span>
            <span class="text-[11px] font-bold text-amber-300">Dung lượng: ~99 KB</span>
          </div>

          <h4 class="text-sm font-black text-white">Cài Tệp Mô Tả ZinZone.mobileconfig</h4>
          <p class="text-[11px] text-slate-300 mt-1 leading-relaxed">
            iPhone tự nhận diện thành WebClip độc lập, <strong class="text-amber-400">biểu tượng Cyber Z Vàng Titan 3D siêu nét</strong>, tự động mở toàn màn hình không có thanh địa chỉ Safari!
          </p>

          <a href="zinzone.mobileconfig" download="zinzone.mobileconfig" class="mt-3.5 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 active:scale-95 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2">
            <span class="text-lg">📲</span>
            <span class="tracking-wide">BẤM TẢI TỆP MÔ TẢ APPLE (.MOBILECONFIG)</span>
          </a>

          <!-- 3 Steps Profile Install Guide -->
          <div class="mt-3 text-[11px] text-slate-300 space-y-2 border-t border-slate-800/80 pt-2.5">
            <div class="flex items-start gap-2 bg-slate-900/80 p-2 rounded-xl">
              <span class="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center shrink-0">1</span>
              <div>Bấm nút vàng ở trên ➔ Bấm <strong>"Cho phép" (Allow)</strong> khi iPhone hiện hộp thoại thông báo tải về hồ sơ.</div>
            </div>
            <div class="flex items-start gap-2 bg-slate-900/80 p-2 rounded-xl">
              <span class="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center shrink-0">2</span>
              <div>Mở <strong>Cài đặt (Settings)</strong> trên iPhone ➔ Nhìn ngay dưới tên iCloud của bạn, bấm vào dòng <strong>"Đã tải về hồ sơ" (Profile Downloaded)</strong>.</div>
            </div>
            <div class="flex items-start gap-2 bg-slate-900/80 p-2 rounded-xl">
              <span class="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black flex items-center justify-center shrink-0">3</span>
              <div>Bấm <strong>"Cài đặt" (Install)</strong> ở góc trên bên phải ➔ Nhập mật mã mở máy ➔ Xong! Biểu tượng vàng xuất hiện ngay ngoài màn hình chính.</div>
            </div>
          </div>
        </div>

        <!-- Option 2: Safari Add to Home Screen -->
        <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-3">
          <button type="button" onclick="const el = document.getElementById('safariGuideFold'); el.classList.toggle('hidden');" class="w-full text-left text-xs font-bold text-slate-400 hover:text-slate-200 flex items-center justify-between">
            <span>Hoặc: Thêm lối tắt nhanh qua Safari (Không tải tệp)</span>
            <span class="text-[10px] text-slate-500">Chi tiết ▼</span>
          </button>
          <div id="safariGuideFold" class="hidden mt-2.5 text-[11px] text-slate-400 space-y-1.5 pt-2 border-t border-slate-800">
            <p>1. Bấm biểu tượng <strong>Chia sẻ (hình vuông mũi tên trỏ lên ⎋)</strong> ở thanh dưới cùng Safari.</p>
            <p>2. Cuộn menu xuống và chọn <strong>"Thêm vào Màn hình chính" (Add to Home Screen)</strong>.</p>
            <p>3. Bấm <strong>"Thêm" (Add)</strong> ở góc trên bên phải để hoàn tất.</p>
          </div>
        </div>

      </div>

      <!-- Android Instructions: Direct Native APK`;

content = content.replace(oldIosGuidePattern, newIosGuide);

console.log('[4/5] Adding Mobile App Install Sticky Banner...');

// Add sticky floating install bar before closing </body> if not present
if (!content.includes('pwaFloatingInstallBar')) {
  const floatingBarHtml = `
  <!-- Floating App Install Sticky Notification for Mobile Browser Visitors -->
  <div id="pwaFloatingInstallBar" class="fixed bottom-16 sm:bottom-4 left-3 right-3 max-w-lg mx-auto z-40 bg-gradient-to-r from-slate-900/95 via-indigo-950/95 to-slate-900/95 border border-amber-500/50 rounded-2xl p-2.5 shadow-2xl backdrop-blur-md flex items-center justify-between gap-2.5 transition-all">
    <div class="flex items-center gap-2.5 overflow-hidden">
      <img src="icons/icon-192.png?v=6" alt="Zin Zone App" class="w-9 h-9 rounded-xl border border-amber-400/60 object-cover shrink-0 shadow">
      <div class="text-left leading-tight truncate">
        <div class="text-[11px] font-black text-amber-300 truncate">Cài Đặt App Zin Zone</div>
        <div class="text-[9.5px] text-slate-400 truncate">Học toàn màn hình • Không giật lag</div>
      </div>
    </div>
    <div class="flex items-center gap-1.5 shrink-0">
      <button onclick="openInstallGuideModal()" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[11px] shadow transition active:scale-95 whitespace-nowrap">
        Cài Ngay (10s)
      </button>
      <button onclick="document.getElementById('pwaFloatingInstallBar').classList.add('hidden')" class="w-6 h-6 rounded-full bg-slate-800 text-slate-400 hover:text-white text-xs flex items-center justify-center" title="Đóng">✕</button>
    </div>
  </div>
`;
  content = content.replace('</body>', floatingBarHtml + '\n</body>');
}

console.log('[5/5] Updating promptAdminKey to link to License Generator Tool...');

// Enhance promptAdminKey to offer link or generate codes
const oldPromptAdminPattern = /function promptAdminKey\(\) \{[\s\S]*?handleActivateLicense\(\);\s*\}/;
const newPromptAdmin = `function promptAdminKey() {
      const code = prompt('🔑 QUẢN TRỊ VIÊN:\\n- Nhập mã bí mật (ADMIN888 / 88888888)\\n- Nhập "GEN" để mở Bộ Tạo Mã VIP\\n- Hoặc gõ "RESET" để hủy toàn bộ bản quyền:');
      if (code) {
        const clean = code.trim().toUpperCase();
        if (clean === 'RESET' || clean === 'CLEAR') {
          safeStorage.removeItem('zin_device_license');
          safeStorage.removeItem('zin_my_referral_code');
          showToast('🛡️ Đã hủy toàn bộ bản quyền thiết bị! Đang làm mới...', 'info');
          setTimeout(() => window.location.reload(true), 700);
          return;
        }
        if (clean === 'GEN' || clean === 'TOOLS' || clean === 'GENERATOR') {
          window.open('tools/license_generator.html', '_blank');
          return;
        }
        if (clean === 'ADMIN888' || clean === '88888888') {
          const genCode = 'ZZ-VIP-' + Math.random().toString(16).substring(2, 6).toUpperCase() + '-' + Math.random().toString(16).substring(2, 6).toUpperCase();
          const action = confirm('🎉 Chào Quản Trị Viên!\\n\\nBạn có muốn mở Bộ Tạo Mã Đầy Đủ (license_generator.html) không?\\n(Bấm OK để mở Bộ Tạo Mã, bấm Hủy để tự động kích hoạt máy này bằng mã ' + genCode + ')');
          if (action) {
            window.open('tools/license_generator.html', '_blank');
            return;
          }
          const input = document.getElementById('inputLicenseKey');
          if (input) input.value = genCode;
          handleActivateLicense();
          return;
        }
        const input = document.getElementById('inputLicenseKey');
        if (input) input.value = code;
        handleActivateLicense();
      }
    }`;

content = content.replace(oldPromptAdminPattern, newPromptAdmin);

// Write updated content back
fs.writeFileSync(indexPath, content, 'utf8');
console.log('✓ Successfully applied all refinements to index.html!');
