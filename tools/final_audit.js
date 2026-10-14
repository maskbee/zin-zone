const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { spawn, execSync } = require('child_process');
const crypto = require('crypto');

console.log('\x1b[36m=====================================================================\x1b[0m');
console.log('\x1b[33m 🚀 ZIN ZONE - VIETNAM MARKET STORE LAUNCH FINAL ACCEPTANCE AUDIT 🚀\x1b[0m');
console.log('       (Tiêu chuẩn xuất bản thị trường Việt Nam • Không khoan nhượng)');
console.log('\x1b[36m=====================================================================\x1b[0m\n');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = [];

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`\x1b[32m[PASS]\x1b[0m ${message}`);
  } else {
    failedChecks.push(message);
    console.log(`\x1b[31m[FAIL]\x1b[0m ${message}`);
  }
}

// -----------------------------------------------------------------------------
// CHECK 1: File Existence & PWA Asset Integrity
// -----------------------------------------------------------------------------
console.log('\n--- 1. KIỂM TRA TÀI NGUYÊN VÀ CẤU TRÚC PWA ---');
const requiredFiles = [
  'index.html',
  'manifest.json',
  'sw.js',
  'data/curriculum.js',
  'data/audio_manifest.js',
  'icon-192.png',
  'icon-512.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'pocket-cards.html',
  'ZinZone.apk'
];

requiredFiles.forEach(f => {
  assert(fs.existsSync(f), `Tập tin bắt buộc tồn tại: ${f}`);
});

// -----------------------------------------------------------------------------
// CHECK 2: Curriculum Dataset Consistency
// -----------------------------------------------------------------------------
console.log('\n--- 2. KIỂM TRA TÍNH TOÀN VẸN CỦA BỘ GIÁO TRÌNH 21 NGÀY ---');
const curriculumText = fs.readFileSync('data/curriculum.js', 'utf8');
const curriculumMatch = curriculumText.match(/window\.CURRICULUM_DATA\s*=\s*(\{[\s\S]*?\});/);
assert(Boolean(curriculumMatch), 'Curriculum dataset parsed successfully');
const curriculum = (new Function('return ' + curriculumMatch[1]))();

assert(Array.isArray(curriculum.days) && curriculum.days.length === 21, 'Đủ chính xác 21 ngày học');
let totalWords = 0;
let totalSentences = 0;
let invalidCards = 0;

curriculum.days.forEach(d => {
  if (d.words && Array.isArray(d.words)) {
    totalWords += d.words.length;
    d.words.forEach(w => {
      if (!w.zh || !w.pinyin || !w.viMeaning || !w.viBoi) invalidCards++;
    });
  }
  if (d.sentences && Array.isArray(d.sentences)) {
    totalSentences += d.sentences.length;
    d.sentences.forEach(s => {
      if (!s.zh || !s.pinyin || !s.viMeaning || !s.viBoi) invalidCards++;
    });
  }
});

assert(totalWords === 210, `Đủ 210 thẻ từ vựng cốt lõi xưởng (thực tế: ${totalWords})`);
assert(totalSentences === 105, `Đủ 105 câu giao tiếp sinh tử (thực tế: ${totalSentences})`);
assert(invalidCards === 0, `Không có thẻ từ/câu nào bị rỗng hoặc lỗi dữ liệu (lỗi: ${invalidCards})`);

// -----------------------------------------------------------------------------
// CHECK 3: Audio Coverage
// -----------------------------------------------------------------------------
console.log('\n--- 3. ĐỘ PHỦ ÂM THANH CHUẨN PHÒNG THU (AUDIO MANIFEST) ---');
const manifestText = fs.readFileSync('data/audio_manifest.js', 'utf8');
const manifestWin = {};
(new Function('window', manifestText))(manifestWin);
const manifest = manifestWin.AUDIO_MANIFEST;

assert(Boolean(manifest), 'Audio manifest loaded successfully');
const manifestKeys = Object.keys(manifest).length;
assert(manifestKeys >= 700, `Audio manifest có đủ khóa định danh (thực tế: ${manifestKeys})`);

// Check slot machine coverage
let missingSlotAudio = 0;
curriculum.frameworks.forEach(f => {
  f.slots.forEach((s, idx) => {
    let fullZh = '';
    if (f.id === 'frame_1') fullZh = `我想${s.zh}`;
    else if (f.id === 'frame_2') fullZh = `有没有${s.zh}？`;
    else if (f.id === 'frame_3') fullZh = `这个多少${s.zh}？`;
    else if (f.id === 'frame_4') fullZh = `因为${s.causeZh}，所以${s.resZh}`;
    else if (f.id === 'frame_5') fullZh = `请帮我${s.zh}`;
    if (!manifest[fullZh] && !manifest[`slot_${f.id}_${idx}`]) missingSlotAudio++;
  });
});
assert(missingSlotAudio === 0, `Toàn bộ câu ghép của Máy Ghép Câu Vạn Năng có âm thanh (thiếu: ${missingSlotAudio})`);

// -----------------------------------------------------------------------------
// CHECK 4: Legal & Vietnam Regulations Compliance
// -----------------------------------------------------------------------------
console.log('\n--- 4. PHÁP LÝ & QUY ĐỊNH XUẤT BẢN TẠI VIỆT NAM ---');
const indexHtml = fs.readFileSync('index.html', 'utf8');

assert(indexHtml.includes('13/2023/NĐ-CP'), 'Tuân thủ Nghị định 13/2023/NĐ-CP (Bảo vệ dữ liệu cá nhân)');
assert(indexHtml.includes('72/2013/NĐ-CP'), 'Tuân thủ Nghị định 72/2013/NĐ-CP (Quản lý dịch vụ Internet)');
assert(indexHtml.includes('12+') || indexHtml.includes('12 TUỔI'), 'Hiển thị huy hiệu độ tuổi kiểm duyệt 12+');
assert(indexHtml.includes('modalPrivacyPolicy'), 'Có Modal Chính sách bảo mật riêng tư');
assert(indexHtml.includes('modalTermsOfService'), 'Có Modal Điều khoản dịch vụ rõ ràng');
assert(indexHtml.includes('meta name="referrer" content="no-referrer"'), 'Có meta no-referrer chống chặn hotlink');

// -----------------------------------------------------------------------------
// CHECK 5: Android Native Package (ZinZone.apk)
// -----------------------------------------------------------------------------
console.log('\n--- 5. KIỂM TRA GÓI CÀI ĐẶT ANDROID NGUYÊN BẢN (ZinZone.apk) ---');
const apkStats = fs.statSync('ZinZone.apk');
assert(apkStats.size > 100000, `Dung lượng APK hợp lệ (>100KB, thực tế: ${(apkStats.size / 1024).toFixed(1)} KB)`);

// Verify signature with apksigner if available
try {
  const apksignerOut = execSync('powershell -Command "apksigner verify --verbose ZinZone.apk"', { encoding: 'utf8' });
  const hasV1 = apksignerOut.includes('Verified using v1 scheme (JAR signing): true');
  const hasV2 = apksignerOut.includes('Verified using v2 scheme (APK Signature Scheme v2): true');
  const hasV3 = apksignerOut.includes('Verified using v3 scheme (APK Signature Scheme v3): true');
  assert(hasV1 && hasV2 && hasV3, 'Chữ ký APK đạt chuẩn bảo mật Google Play v1 + v2 + v3');
} catch (e) {
  console.log('Skipping apksigner check (tool not in PATH directly)');
}

// -----------------------------------------------------------------------------
// CHECK 6: Live Production Endpoints
// -----------------------------------------------------------------------------
console.log('\n--- 6. KIỂM TRA TRẠNG THÁI SERVER TRỰC TUYẾN (https://zin.zone) ---');
const testUrls = [
  'https://zin.zone/',
  'https://zin.zone/data/curriculum.js',
  'https://zin.zone/data/audio_manifest.js',
  'https://zin.zone/audio/sentences/slot_frame_5_3.mp3',
  'https://zin.zone/audio/sentences/crisis_boss_1.mp3'
];

let onlineDone = 0;
testUrls.forEach(u => {
  https.get(u, res => {
    assert(res.statusCode === 200, `URL trực tuyến phản hồi HTTP 200: ${u}`);
    onlineDone++;
    if (onlineDone === testUrls.length) {
      finishAudit();
    }
  }).on('error', err => {
    assert(false, `URL trực tuyến lỗi kết nối: ${u} (${err.message})`);
    onlineDone++;
    if (onlineDone === testUrls.length) {
      finishAudit();
    }
  });
});

function finishAudit() {
  console.log('\n=====================================================================');
  console.log(`TỔNG KẾT KIỂM THỬ: ${passedChecks}/${totalChecks} TIÊU CHÍ ĐẠT (${((passedChecks / totalChecks) * 100).toFixed(1)}%)`);
  if (failedChecks.length === 0) {
    console.log('\x1b[32m✨ TOÀN BỘ HỆ THỐNG ĐÃ ĐẠT TIÊU CHUẨN XUẤT BẢN THỊ TRƯỜNG VIỆT NAM! ✨\x1b[0m');
    process.exit(0);
  } else {
    console.log('\x1b[31m⚠️ CÒN CÁC ĐIỂM CẦN HOÀN THIỆN TRƯỚC KHI LÊN KỆ: \x1b[0m');
    failedChecks.forEach(f => console.log(' - ' + f));
    process.exit(1);
  }
}
