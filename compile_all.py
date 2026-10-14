# -*- coding: utf-8 -*-
"""
compile_all.py
Merges Phase 1, Phase 2, Phase 3, and Frameworks.
Generates:
- data/curriculum.js
- CURRICULUM_FULL.md
"""
import json
import os
from data_phase1 import PHASE_1_DAYS
from data_phase2 import PHASE_2_DAYS
from data_phase3 import PHASE_3_DAYS
from data_frameworks import UNIVERSAL_FRAMEWORKS, BOSS_CATCHPHRASES, HAN_VIET_HACKS

all_days = PHASE_1_DAYS + PHASE_2_DAYS + PHASE_3_DAYS
assert len(all_days) == 21, f"Expected 21 days, got {len(all_days)}"

curriculum_dataset = {
    "titleZh": "邪修汉语·21天工厂升职记",
    "titleVi": "Tiếng Trung Tà Đạo - 21 Ngày Thăng Chức Nhà Máy Hoa Kiều",
    "subtitleZh": "跳过拼音直接干，靠汉越外挂与工厂实战，21天拿下管理层！",
    "subtitleVi": "Bỏ qua phát âm hàn lâm, kích hoạt 60% Hán Việt, 21 ngày đổi đời làm Tổ trưởng!",
    "totalDays": 21,
    "phases": [
        {
            "id": 1,
            "titleZh": "第一阶段：生存模式（Day 1 - 7）",
            "titleVi": "Giai đoạn 1: Sinh tồn (Day 1 - 7)",
            "descZh": "生存保命，听懂指令，不被骂，不扣全勤奖！",
            "descVi": "Sinh tồn giữ mạng, nghe chuẩn mệnh lệnh, không bị mắng, giữ trọn tiền chuyên cần!"
        },
        {
            "id": 2,
            "titleZh": "第二阶段：主动出击（Day 8 - 14）",
            "titleVi": "Giai đoạn 2: Chủ động xuất kích (Day 8 - 14)",
            "descZh": "能汇报、能求助、能提问，展现担当与执行力！",
            "descVi": "Biết báo cáo, biết cầu cứu, biết đếm hàng, khẳng định năng lực gánh team!"
        },
        {
            "id": 3,
            "titleZh": "第三阶段：升职加薪（Day 15 - 21）",
            "titleVi": "Giai đoạn 3: Thăng chức tăng lương (Day 15 - 21)",
            "descZh": "向上管理，酒桌艺术，争取加薪，拿下组长帅印！",
            "descVi": "Lấy lòng sếp lớn, nuốt trọn văn hóa bàn nhậu, vòi tăng lương, nhận quyết định bổ nhiệm tổ trưởng!"
        }
    ],
    "frameworks": UNIVERSAL_FRAMEWORKS,
    "bossCatchphrases": BOSS_CATCHPHRASES,
    "hanVietHacks": HAN_VIET_HACKS,
    "days": all_days
}

# 1. Generate data/curriculum.js
os.makedirs("data", exist_ok=True)
json_str = json.dumps(curriculum_dataset, ensure_ascii=False, indent=2)
js_content = f"// Generated Curriculum Data for Tiếng Trung Tà Đạo 21 Ngày\nwindow.CURRICULUM_DATA = {json_str};\n"

with open("data/curriculum.js", "w", encoding="utf-8") as f:
    f.write(js_content)
print("Successfully generated data/curriculum.js")

# 2. Generate CURRICULUM_FULL.md
md_lines = []
md_lines.append(f"# 《{curriculum_dataset['titleZh']}》")
md_lines.append(f"## {curriculum_dataset['titleVi']}")
md_lines.append(f"> **核心口号**：{curriculum_dataset['subtitleZh']}")
md_lines.append(f"> **Khẩu hiệu cốt lõi**：{curriculum_dataset['subtitleVi']}\n")
md_lines.append("---\n")
md_lines.append("## 目录 / MỤC LỤC TỔNG QUAN\n")
for p in curriculum_dataset["phases"]:
    md_lines.append(f"### {p['titleZh']} / {p['titleVi']}")
    md_lines.append(f"*{p['descZh']} / {p['descVi']}*\n")
    for d in all_days:
        if d["phase"] == p["id"]:
            md_lines.append(f"- **Day {d['day']}**: {d['titleZh']} ({d['titleVi']}) - *{d['targetZh']}*")
    md_lines.append("")

md_lines.append("---\n")
md_lines.append("## 五大万能句型框架 / 5 KHUNG CÂU VẠN NĂNG TRÊN CHUYỀN\n")
for f_item in UNIVERSAL_FRAMEWORKS:
    md_lines.append(f"### {f_item['titleZh']} / {f_item['titleVi']}")
    md_lines.append(f"- **Công thức**: `{f_item['formula']}`")
    md_lines.append(f"- **Phiên âm bồi**: `{f_item['formulaBoi']}`")
    md_lines.append(f"- **Tác dụng**: {f_item['explanationVi']} ({f_item['explanationZh']})\n")

md_lines.append("---\n")
md_lines.append("## 华人工厂管理者高频口头禅 / KHẨU ĐẦU THIỀN CỦA SẾP HOA\n")
for c in BOSS_CATCHPHRASES:
    md_lines.append(f"- **{c['zh']}** (`{c['pinyin']}` / *{c['viBoi']}*): {c['viMeaning']}")
    md_lines.append(f"  - 👉 **Phản xạ đối đáp**: {c['reaction']}\n")

md_lines.append("---\n")
md_lines.append("## 21天完整实战课程正文 / NỘI DUNG CHI TIẾT 21 NGÀY\n")

for d in all_days:
    md_lines.append(f"### Day {d['day']}: {d['titleZh']} | {d['titleVi']}\n")
    md_lines.append(f"> 🎯 **Mục tiêu hôm nay**: {d['targetVi']}")
    md_lines.append(f"> 🎯 **今日目标**: {d['targetZh']}\n")
    
    md_lines.append("#### 5 Câu Khẩu Quyết Sống Còn / 5 核心句\n")
    for i, s in enumerate(d["sentences"], 1):
        md_lines.append(f"**{i}. {s['zh']}** (`{s['pinyin']}`)")
        md_lines.append(f"- 🗣️ **Phiên âm bồi siêu chuẩn**: **{s['viBoi']}**")
        md_lines.append(f"- 🧬 **Mã Hán - Việt**: {s['hanViet']}")
        md_lines.append(f"- 💡 **Nghĩa tiếng Việt**: {s['viMeaning']}")
        md_lines.append(f"- 🔥 **Mẹo nhớ tà đạo 18+ (Cực bựa & Bắn thẳng vào não)**: {s['spicyHook']}")
        md_lines.append(f"- 🧠 **Tâm lý chiến & Thời điểm tung chiêu**: {s['bossTactic']}")
        md_lines.append("")
        
    md_lines.append("#### 10 Từ Vựng Thay Thế Bổ Trợ / 10 替换词\n")
    md_lines.append("| Chữ Hán | Pinyin | Phiên âm bồi | Âm Hán Việt | Nghĩa tiếng Việt | Ví dụ thực chiến |")
    md_lines.append("|---|---|---|---|---|---|")
    for w in d["words"]:
        md_lines.append(f"| **{w['zh']}** | {w['pinyin']} | {w['viBoi']} | {w['hanViet']} | {w['viMeaning']} | `{w['example']}` |")
    md_lines.append("")

    md_lines.append(f"#### 📖 Chuyện Tà Đạo Xâu Chuỗi: {d['story']['title']}\n")
    md_lines.append(f"{d['story']['content']}\n")

    md_lines.append(f"#### ⚡ Thử Thách Thực Chiến Hôm Nay\n")
    md_lines.append(f"- **Nhiệm vụ (Tiếng Việt)**: {d['mission']['taskVi']}")
    md_lines.append(f"- **今日任务 (中文)**: {d['mission']['taskZh']}\n")
    md_lines.append("---\n")

with open("CURRICULUM_FULL.md", "w", encoding="utf-8") as f:
    f.write("\n".join(md_lines))
print("Successfully generated CURRICULUM_FULL.md")
