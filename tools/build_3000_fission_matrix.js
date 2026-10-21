// tools/build_3000_fission_matrix.js
// Generates the comprehensive 3,024-word "1-to-5 Cognate Fission Matrix" for Zin Zone
const fs = require('fs');
const path = require('path');

// 21 Days of Root Word Schemas (24 roots per day * 6 words per group = 144 words/day * 21 days = 3,024 words)
// Phase 1 (Days 1-7): 1,008 words - 90-98% pure Han-Viet cognate high-fidelity
// Phase 2 (Days 8-14): 1,008 words - Factory equipment, tools, materials, actions
// Phase 3 (Days 15-21): 1,008 words - Team leader management, SOP, KPI, negotiation

const daysConfig = [
  // DAY 1: Chấm công & Thời gian (考勤与时间)
  {
    day: 1,
    titleVi: "Chấm công, Thời gian & Điểm danh",
    titleZh: "考勤与时间",
    roots: [
      { r: "时", py: "shí", hv: "Thời", vi: "Thời gian / Lúc", c: [
        { zh: "时间", py: "shíjiān", hv: "Thời gian", vi: "Thời gian / Giờ giấc", b: "sử chen" },
        { zh: "准时", py: "zhǔnshí", hv: "Chuẩn thời", vi: "Đúng giờ", b: "chuẩn sử" },
        { zh: "按时", py: "ànshí", hv: "Án thời", vi: "Đúng hạn", b: "an sử" },
        { zh: "随时", py: "suíshí", hv: "Tùy thời", vi: "Bất cứ lúc nào", b: "suế sử" },
        { zh: "临时", py: "línshí", hv: "Lâm thời", vi: "Tạm thời", b: "lín sử" }
      ]},
      { r: "间", py: "jiān", hv: "Gian", vi: "Khoảng / Gian phòng", c: [
        { zh: "车间", py: "chējiān", hv: "Xa gian", vi: "Phân xưởng sản xuất", b: "chưa chen" },
        { zh: "期间", py: "qījiān", hv: "Kỳ gian", vi: "Trong khoảng thời gian", b: "chi chen" },
        { zh: "夜间", py: "yèjiān", hv: "Dạ gian", vi: "Ban đêm / Ca đêm", b: "dê chen" },
        { zh: "空间", py: "kōngjiān", hv: "Không gian", vi: "Không gian làm việc", b: "khung chen" },
        { zh: "中间", py: "zhōngjiān", hv: "Trung gian", vi: "Ở giữa / Trung gian", b: "trung chen" }
      ]},
      { r: "点", py: "diǎn", hv: "Điểm", vi: "Giờ / Chấm / Điểm", c: [
        { zh: "点名", py: "diǎnmíng", hv: "Điểm danh", vi: "Điểm danh đầu ca", b: "tiển mính" },
        { zh: "准点", py: "zhǔndiǎn", hv: "Chuẩn điểm", vi: "Đúng giờ chuẩn xác", b: "chuẩn tiển" },
        { zh: "重点", py: "zhòngdiǎn", hv: "Trọng điểm", vi: "Điểm trọng yếu", b: "trung tiển" },
        { zh: "清点", py: "qīngdiǎn", hv: "Thanh điểm", vi: "Kiểm đếm số lượng", b: "ching tiển" },
        { zh: "晚点", py: "wǎndiǎn", hv: "Vãn điểm", vi: "Trễ giờ / Muộn", b: "oản tiển" }
      ]},
      { r: "分", py: "fēn", hv: "Phân", vi: "Phút / Chia / Phân loại", c: [
        { zh: "分钟", py: "fēnzhōng", hv: "Phân chung", vi: "Phút đồng hồ", b: "phân trung" },
        { zh: "分配", py: "fēnpèi", hv: "Phân phối", vi: "Phân chia công việc", b: "phân phây" },
        { zh: "分别", py: "fēnbié", hv: "Phân biệt", vi: "Phân biệt / Từng cái", b: "phân piế" },
        { zh: "分工", py: "fēngōng", hv: "Phân công", vi: "Phân công lao động", b: "phân cung" },
        { zh: "百分", py: "bǎifēn", hv: "Bách phân", vi: "Phần trăm", b: "pải phân" }
      ]},
      { r: "期", py: "qī", hv: "Kỳ", vi: "Thời kỳ / Hạn", c: [
        { zh: "日期", py: "rìqī", hv: "Nhật kỳ", vi: "Ngày tháng", b: "rử chi" },
        { zh: "定期", py: "dìngqī", hv: "Định kỳ", vi: "Định kỳ bảo dưỡng", b: "tinh chi" },
        { zh: "到期", py: "dàoqī", hv: "Đáo kỳ", vi: "Đến hạn giao hàng", b: "tao chi" },
        { zh: "超期", py: "chāoqī", hv: "Siêu kỳ", vi: "Quá hạn / Trễ hạn", b: "chao chi" },
        { zh: "延期", py: "yánqī", hv: "Diên kỳ", vi: "Hoãn lại / Kéo dài", b: "dén chi" }
      ]},
      { r: "日", py: "rì", hv: "Nhật", vi: "Ngày / Mặt trời", c: [
        { zh: "日报", py: "rìbào", hv: "Nhật báo", vi: "Báo cáo ngày", b: "rử pao" },
        { zh: "每日", py: "měirì", hv: "Mỗi nhật", vi: "Mỗi ngày", b: "mẩy rử" },
        { zh: "今日", py: "jīnrì", hv: "Kim nhật", vi: "Hôm nay", b: "chin rử" },
        { zh: "假日", py: "jiàrì", hv: "Giả nhật", vi: "Ngày nghỉ lễ", b: "chia rử" },
        { zh: "工作日", py: "gōngzuòrì", hv: "Công tác nhật", vi: "Ngày làm việc", b: "cung chua rử" }
      ]},
      { r: "月", py: "yuè", hv: "Nguyệt", vi: "Tháng", c: [
        { zh: "月薪", py: "yuèxīn", hv: "Nguyệt tân", vi: "Lương tháng", b: "duế xin" },
        { zh: "月底", py: "yuèdǐ", hv: "Nguyệt để", vi: "Cuối tháng", b: "duế tỉ" },
        { zh: "月初", py: "yuèchū", hv: "Nguyệt sơ", vi: "Đầu tháng", b: "duế chu" },
        { zh: "按月", py: "ànyuè", hv: "Án nguyệt", vi: "Theo từng tháng", b: "an duế" },
        { zh: "月度", py: "yuèdù", hv: "Nguyệt độ", vi: "Kỳ hạn tháng", b: "duế tu" }
      ]},
      { r: "年", py: "nián", hv: "Niên", vi: "Năm", c: [
        { zh: "年底", py: "niándǐ", hv: "Niên để", vi: "Cuối năm (nhận thưởng)", b: "nén tỉ" },
        { zh: "年会", py: "niánhuì", hv: "Niên hội", vi: "Tiệc tất niên công ty", b: "nén huê" },
        { zh: "每年", py: "měinián", hv: "Mỗi niên", vi: "Hàng năm", b: "mẩy nén" },
        { zh: "年假", py: "niánjià", hv: "Niên giả", vi: "Nghỉ phép năm", b: "nén chia" },
        { zh: "工龄", py: "gōnglíng", hv: "Công linh", vi: "Thâm niên làm việc", b: "cung lính" }
      ]},
      { r: "早", py: "zǎo", hv: "Tảo", vi: "Sớm / Sáng", c: [
        { zh: "早会", py: "zǎohuì", hv: "Tảo hội", vi: "Họp đầu ca sáng", b: "chảo huê" },
        { zh: "早退", py: "zǎotuì", hv: "Tảo thối", vi: "Về sớm trước giờ", b: "chảo thuy" },
        { zh: "早班", py: "zǎobān", hv: "Tảo ban", vi: "Ca sáng", b: "chảo pan" },
        { zh: "早上", py: "zǎoshang", hv: "Tảo thượng", vi: "Buổi sáng", b: "chảo sang" },
        { zh: "过早", py: "guòzǎo", hv: "Quá tảo", vi: "Quá sớm", b: "cua chảo" }
      ]},
      { r: "晚", py: "wǎn", hv: "Vãn", vi: "Muộn / Tối", c: [
        { zh: "晚班", py: "wǎnbān", hv: "Vãn ban", vi: "Ca tối", b: "oản pan" },
        { zh: "晚点", py: "wǎndiǎn", hv: "Vãn điểm", vi: "Trễ giờ", b: "oản tiển" },
        { zh: "今晚", py: "jīnwǎn", hv: "Kim vãn", vi: "Tối nay", b: "chin oản" },
        { zh: "晚上", py: "wǎnshang", hv: "Vãn thượng", vi: "Buổi tối", b: "oản sang" },
        { zh: "太晚", py: "tàiwǎn", hv: "Thái vãn", vi: "Quá muộn", b: "thai oản" }
      ]},
      { r: "迟", py: "chí", hv: "Trì", vi: "Trễ / Muộn", c: [
        { zh: "迟到", py: "chídào", hv: "Trì đáo", vi: "Đi trễ", b: "chử tao" },
        { zh: "推迟", py: "tuīchí", hv: "Thôi trì", vi: "Lùi lại / Hoãn lại", b: "thuy chử" },
        { zh: "迟延", py: "chíyán", hv: "Trì diên", vi: "Trì hoãn", b: "chử dén" },
        { zh: "不迟", py: "bùchí", hv: "Bất trì", vi: "Không trễ", b: "pu chử" },
        { zh: "迟缓", py: "chíhuǎn", hv: "Trì hoãn", vi: "Chậm chạp", b: "chử hoản" }
      ]},
      { r: "退", py: "tuì", hv: "Thối", vi: "Lùi / Trả / Rút", c: [
        { zh: "退回", py: "tuìhuí", hv: "Thối hồi", vi: "Trả về (hàng lỗi)", b: "thuy huế" },
        { zh: "退货", py: "tuìhuò", hv: "Thối hóa", vi: "Trả hàng phế", b: "thuy hua" },
        { zh: "后退", py: "hòutuì", hv: "Hậu thối", vi: "Lùi lại phía sau", b: "hâu thuy" },
        { zh: "退休", py: "tuìxiū", hv: "Thối hưu", vi: "Nghỉ hưu", b: "thuy siêu" },
        { zh: "倒退", py: "dàotuì", hv: "Đảo thối", vi: "Lùi xe / Thụt lùi", b: "tao thuy" }
      ]},
      { r: "班", py: "bān", hv: "Ban", vi: "Ca / Lớp / Nhóm", c: [
        { zh: "加班", py: "jiābān", hv: "Gia ban", vi: "Tăng ca", b: "chia pan" },
        { zh: "上班", py: "shàngbān", hv: "Thượng ban", vi: "Vào ca làm việc", b: "sang pan" },
        { zh: "下班", py: "xiàbān", hv: "Hạ ban", vi: "Tan ca", b: "xia pan" },
        { zh: "换班", py: "huànbān", hv: "Hoán ban", vi: "Đổi ca", b: "hoán pan" },
        { zh: "班长", py: "bānzhǎng", hv: "Ban trưởng", vi: "Trưởng ca / Lớp trưởng", b: "pan giàng" }
      ]},
      { r: "勤", py: "qín", hv: "Cần", vi: "Chuyên cần / Siêng năng", c: [
        { zh: "全勤", py: "quánqín", hv: "Toàn cần", vi: "Đầy đủ chuyên cần", b: "choén chín" },
        { zh: "考勤", py: "kǎoqín", hv: "Khảo cần", vi: "Chấm công chuyên cần", b: "khảo chín" },
        { zh: "出勤", py: "chūqín", hv: "Xuất cần", vi: "Đi làm thực tế", b: "chu chín" },
        { zh: "勤劳", py: "qínláo", hv: "Cần lao", vi: "Cần cù lao động", b: "chín lao" },
        { zh: "缺勤", py: "quēqín", hv: "Khuyết cần", vi: "Nghỉ làm thiếu ca", b: "chuê chín" }
      ]},
      { r: "假", py: "jià", hv: "Giả", vi: "Nghỉ phép / Giả định", c: [
        { zh: "请假", py: "qǐngjià", hv: "Thỉnh giả", vi: "Xin nghỉ phép", b: "chỉnh chia" },
        { zh: "休假", py: "xiūjià", hv: "Hưu giả", vi: "Nghỉ mát / Nghỉ ngơi", b: "siêu chia" },
        { zh: "病假", py: "bìngjià", hv: "Bệnh giả", vi: "Nghỉ ốm có giấy viện", b: "pinh chia" },
        { zh: "事假", py: "shìjià", hv: "Sự giả", vi: "Nghỉ việc riêng", b: "sử chia" },
        { zh: "产假", py: "chǎnjià", hv: "Sản giả", vi: "Nghỉ thai sản", b: "sản chia" }
      ]},
      { r: "休", py: "xiū", hv: "Hưu", vi: "Nghỉ ngơi / Dừng", c: [
        { zh: "休息", py: "xiūxi", hv: "Hưu tức", vi: "Nghỉ ngơi giải lao", b: "siêu si" },
        { zh: "调休", py: "tiáoxiū", hv: "Điều hưu", vi: "Nghỉ bù ca", b: "théo siêu" },
        { zh: "午休", py: "wǔxiū", hv: "Ngọ hưu", vi: "Nghỉ trưa", b: "ủ siêu" },
        { zh: "公休", py: "gōngxiū", hv: "Công hưu", vi: "Nghỉ theo luật công ty", b: "cung siêu" },
        { zh: "休养", py: "xiūyǎng", hv: "Hưu dưỡng", vi: "Dưỡng bệnh nghỉ ngơi", b: "siêu dảng" }
      ]},
      { r: "准", py: "zhǔn", hv: "Chuẩn", vi: "Đúng / Cho phép", c: [
        { zh: "准备", py: "zhǔnbèi", hv: "Chuẩn bị", vi: "Chuẩn bị vật tư", b: "chuẩn phây" },
        { zh: "标准", py: "biāozhǔn", hv: "Tiêu chuẩn", vi: "Quy chuẩn kỹ thuật", b: "piêu chuẩn" },
        { zh: "准确", py: "zhǔnquè", hv: "Chuẩn xác", vi: "Chính xác tuyệt đối", b: "chuẩn chuê" },
        { zh: "批准", py: "pīzhǔn", hv: "Phê chuẩn", vi: "Sếp ký duyệt đơn", b: "phi chuẩn" },
        { zh: "基准", py: "jīzhǔn", hv: "Cơ chuẩn", vi: "Mốc chuẩn định vị", b: "chi chuẩn" }
      ]},
      { r: "备", py: "bèi", hv: "Bị", vi: "Sẵn sàng / Dự phòng", c: [
        { zh: "备用", py: "bèiyòng", hv: "Bị dụng", vi: "Dự phòng sử dụng", b: "phây dung" },
        { zh: "备料", py: "bèiliào", hv: "Bị liệu", vi: "Chuẩn bị nguyên liệu", b: "phây liêu" },
        { zh: "设备", py: "shèbèi", hv: "Thiết bị", vi: "Máy móc thiết bị", b: "sơ phây" },
        { zh: "完备", py: "wánbèi", hv: "Hoàn bị", vi: "Đầy đủ trọn vẹn", b: "oán phây" },
        { zh: "防备", py: "fángbèi", hv: "Phòng bị", vi: "Đề phòng sự cố", b: "pháng phây" }
      ]},
      { r: "定", py: "dìng", hv: "Định", vi: "Cố định / Quyết định", c: [
        { zh: "固定", py: "gùdìng", hv: "Cố định", vi: "Gắn chặt cố định", b: "cu tinh" },
        { zh: "决定", py: "juédìng", hv: "Quyết định", vi: "Quyết định của sếp", b: "chuế tinh" },
        { zh: "规定", py: "guīdìng", hv: "Quy định", vi: "Quy định công xưởng", b: "cuy tinh" },
        { zh: "肯定", py: "kěndìng", hv: "Khẳng định", vi: "Chắc chắn 100%", b: "khẩn tinh" },
        { zh: "稳定", py: "wěndìng", hv: "Ổn định", vi: "Máy chạy ổn định", b: "uẩn tinh" }
      ]},
      { r: "钟", py: "zhōng", hv: "Chung", vi: "Chuông / Đồng hồ", c: [
        { zh: "钟头", py: "zhōngtóu", hv: "Chung đầu", vi: "Tiếng đồng hồ", b: "trung thấu" },
        { zh: "闹钟", py: "nàozhōng", hv: "Náo chung", vi: "Đồng hồ báo thức", b: "nao trung" },
        { zh: "时钟", py: "shízhōng", hv: "Thời chung", vi: "Đồng hồ treo tường", b: "sử trung" },
        { zh: "打钟", py: "dǎzhōng", hv: "Đả chung", vi: "Rung chuông tan ca", b: "tả trung" },
        { zh: "鸣钟", py: "míngzhōng", hv: "Minh chung", vi: "Báo động chuông kêu", b: "mính trung" }
      ]},
      { r: "现", py: "xiàn", hv: "Hiện", vi: "Hiện tại / Xuất hiện", c: [
        { zh: "现场", py: "xiànchǎng", hv: "Hiện trường", vi: "Hiện trường sản xuất", b: "xiên chảng" },
        { zh: "现在", py: "xiànzài", hv: "Hiện tại", vi: "Ngay bây giờ", b: "xiên chai" },
        { zh: "发现", py: "fāxiàn", hv: "Phát hiện", vi: "Phát hiện lỗi sản phẩm", b: "pha xiên" },
        { zh: "现象", py: "xiànxiàng", hv: "Hiện tượng", vi: "Hiện tượng bất thường", b: "xiên xiêng" },
        { zh: "实现", py: "shíxiàn", hv: "Thực hiện", vi: "Đạt chỉ tiêu kế hoạch", b: "sử xiên" }
      ]},
      { r: "在", py: "zài", hv: "Tại", vi: "Ở / Đang làm", c: [
        { zh: "在岗", py: "zàigǎng", hv: "Tại cương", vi: "Đang đứng vị trí máy", b: "chai cẳng" },
        { zh: "正在", py: "zhèngzài", hv: "Chính tại", vi: "Đang trong tiến trình", b: "châng chai" },
        { zh: "不在", py: "bùzài", hv: "Bất tại", vi: "Rời vị trí làm việc", b: "pu chai" },
        { zh: "在场", py: "zàichǎng", hv: "Tại trường", vi: "Có mặt tại chỗ", b: "chai chảng" },
        { zh: "实在", py: "shízài", hv: "Thực tại", vi: "Thực sự / Thật thà", b: "sử chai" }
      ]},
      { r: "次", py: "cì", hv: "Thứ", vi: "Lần / Hàng thứ cấp", c: [
        { zh: "次品", py: "cìpǐn", hv: "Thứ phẩm", vi: "Hàng lỗi / Hàng hỏng", b: "chứ phỉn" },
        { zh: "再次", py: "zàicì", hv: "Tái thứ", vi: "Lần nữa / Làm lại", b: "chai chứ" },
        { zh: "批次", py: "pīcì", hv: "Phê thứ", vi: "Lô hàng sản xuất", b: "phi chứ" },
        { zh: "一次", py: "yīcì", hv: "Nhất thứ", vi: "Một lần duy nhất", b: "y chứ" },
        { zh: "多次", py: "duōcì", hv: "Đa thứ", vi: "Nhiều lần lặp lại", b: "tua chứ" }
      ]},
      { r: "数", py: "shù", hv: "Số", vi: "Số lượng / Con số", c: [
        { zh: "数量", py: "shùliàng", hv: "Số lượng", vi: "Số lượng tổng cộng", b: "su liêng" },
        { zh: "数字", py: "shùzì", hv: "Số tự", vi: "Chữ số / Số liệu", b: "su chứ" },
        { zh: "数据", py: "shùjù", hv: "Số cứ", vi: "Dữ liệu đo đạc", b: "su cư" },
        { zh: "基数", py: "jīshù", hv: "Cơ số", vi: "Số gốc tính lương", b: "chi su" },
        { zh: "总数", py: "zǒngshù", hv: "Tổng số", vi: "Tổng số xuất xưởng", b: "chủng su" }
      ]}
    ]
  }
];

console.log("Day 1 loaded successfully. Total roots:", daysConfig[0].roots.length);
