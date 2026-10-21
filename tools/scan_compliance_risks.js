const fs = require('fs');
const path = require('path');
const vm = require('vm');

const currCode = fs.readFileSync(path.resolve(__dirname, '../data/curriculum.js'), 'utf8');
const indexHtml = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(currCode, sandbox);
const curriculum = sandbox.window.CURRICULUM_DATA;

console.log("=== SCANNING FOR COPYWRITING & LEGAL RISKS ===");

// 1. Scan SpicyHooks for 18+, sexual innuendo, vulgarity, or extreme violence
const sensitivePatterns = [
  { pattern: /cà|thốn|dái|buốt háng/i, category: 'Bộ phận nhạy cảm / Thô tục nhẹ' },
  { pattern: /ngực|mông|bóp|sờ|ôm ấp|gợi cảm/i, category: 'Tình dục / Khiêu dâm hóa' },
  { pattern: /gái|đĩ|cave|mại dâm|chân dài|bao nuôi/i, category: 'Nhân phẩm / Giới tính' },
  { pattern: /chém|giết|máu me|chặt tay|chặt chân|róc thịt/i, category: 'Bạo lực rùng rợn' },
  { pattern: /tiểu nhân|nịnh|bợ đít|quỳ lạy|hối lộ|đút lót/i, category: 'Hành vi tiêu cực công xưởng' }
];

const flaggedHooks = [];

curriculum.days.forEach(day => {
  (day.sentences || []).forEach(s => {
    const hook = s.spicyHook || '';
    const tactic = s.bossTactic || '';
    const fullText = `${hook} ${tactic}`;
    
    sensitivePatterns.forEach(sp => {
      if (sp.pattern.test(fullText)) {
        flaggedHooks.push({
          day: day.day,
          id: s.id,
          zh: s.zh,
          viBoi: s.viBoi,
          viMeaning: s.viMeaning,
          category: sp.category,
          hook: hook,
          tactic: tactic
        });
      }
    });
  });
});

console.log(`\n1. Found ${flaggedHooks.length} flagged sentence memory hooks in data/curriculum.js:`);
const uniqueHooks = Array.from(new Set(flaggedHooks.map(f => f.id)))
  .map(id => flaggedHooks.find(f => f.id === id));

uniqueHooks.forEach(h => {
  console.log(`\n[Day ${h.day} - ${h.id}] ${h.zh} (${h.viBoi} - ${h.viMeaning})`);
  console.log(`  Category: ${h.category}`);
  console.log(`  SpicyHook: "${h.hook}"`);
  if (h.tactic) console.log(`  BossTactic: "${h.tactic}"`);
});

// 2. Scan Landing Page & Splash for Absolute Guarantees / High-risk Earnings claims
console.log("\n=================================================");
console.log("2. Landing Page & Marketing Copy Claims Audit:");

const claimPatterns = [
  { pattern: /15[-–\s]*25\s*TRIỆU/i, label: 'Cam kết mức lương 15-25 triệu/tháng' },
  { pattern: /lên tổ trưởng/i, label: 'Cam kết thăng chức tổ trưởng sau 21 ngày' },
  { pattern: /3\.?000 từ cốt lõi/i, label: 'Cam kết nạp 3000 từ trong 21 ngày' },
  { pattern: /hoàn tiền 100%/i, label: 'Cam kết hoàn tiền 100% nếu không giao tiếp được' },
  { pattern: /trí nhớ vĩnh viễn/i, label: 'Tuyên bố "Trí nhớ vĩnh viễn"' },
  { pattern: /1 lần là nhớ/i, label: 'Tuyên bố "1 lần là nhớ"' },
  { pattern: /70% thiên phú/i, label: 'Tuyên bố "Kích hoạt 70% thiên phú"' },
  { pattern: /kiểm tra máy zin/i, label: 'Liên kết kinh doanh điện thoại cũ (Máy Zin)' }
];

claimPatterns.forEach(cp => {
  const matches = (indexHtml.match(new RegExp(cp.pattern, 'gi')) || []).length;
  console.log(`  - [${cp.label}]: ${matches} occurrences in index.html`);
});
