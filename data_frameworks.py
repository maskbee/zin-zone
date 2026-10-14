# -*- coding: utf-8 -*-
"""
data_frameworks.py
5 Khung Câu Vạn Năng (5 万能句型框架) + Cẩm nang khẩu đầu thiền của Sếp Hoa + Bảng tra cứu âm Hán Việt cấp tốc.
"""

UNIVERSAL_FRAMEWORKS = [
    {
        "id": "frame_1",
        "titleZh": "框架一：我要 / 我想 + [动作/事物]",
        "titleVi": "Khung 1: Tôi muốn... (Tuyên bố nhu cầu)",
        "formula": "我要 / 我想 + [Động từ / Danh từ]",
        "formulaBoi": "Ủa dao / Ủa xưởng + [Hành động]",
        "explanationZh": "最直接、最有力的表达方式。华人老板喜欢爽快人，想干什么直接说，不绕弯子。",
        "explanationVi": "Cách biểu đạt thẳng thắn và quyền lực nhất. Sếp người Hoa cực ghét vòng vo tam quốc, muốn gì cứ dõng dạc nói thẳng.",
        "slots": [
            {"zh": "请假", "pinyin": "qǐngjià", "viBoi": "chỉnh giá", "vi": "xin nghỉ phép"},
            {"zh": "加班", "pinyin": "jiābān", "viBoi": "gia ban", "vi": "tăng ca"},
            {"zh": "喝水", "pinyin": "hēshuǐ", "viBoi": "hưa suẩy", "vi": "uống nước"},
            {"zh": "上厕所", "pinyin": "shàng cèsuǒ", "viBoi": "sang chưa sủa", "vi": "đi vệ sinh"},
            {"zh": "换班", "pinyin": "huànbān", "viBoi": "hoán ban", "vi": "đổi ca"},
            {"zh": "当组长", "pinyin": "dāng zǔzhǎng", "viBoi": "đang giũ giàng", "vi": "làm tổ trưởng"},
            {"zh": "多学点", "pinyin": "duō xué diǎn", "viBoi": "tua xuế tiển", "vi": "học thêm"},
            {"zh": "重做", "pinyin": "chóngzuò", "viBoi": "chủng chua", "vi": "làm lại"}
        ]
    },
    {
        "id": "frame_2",
        "titleZh": "框架二：有没有 + [物品/事情]？",
        "titleVi": "Khung 2: Có... không? (Tìm đồ / Hỏi vật tư)",
        "formula": "有没有 + [Danh từ]？",
        "formulaBoi": "Dẩu mấy dẩu + [Đồ vật]?",
        "explanationZh": "排查缺料、索要工具、打听福利的万能问句。只要知道名词就能随便套！",
        "explanationVi": "Câu hỏi vạn năng để tìm đồ, hỏi vật tư, dò la tiền thưởng. Chỉ cần biết tên món đồ là ghép vào hỏi tuốt!",
        "slots": [
            {"zh": "物料", "pinyin": "wùliào", "viBoi": "u liêu", "vi": "nguyên vật liệu"},
            {"zh": "螺丝", "pinyin": "luósī", "viBoi": "luổ sư", "vi": "ốc vít"},
            {"zh": "手套", "pinyin": "shǒutào", "viBoi": "sẩu thao", "vi": "găng tay"},
            {"zh": "胶水", "pinyin": "jiāoshuǐ", "viBoi": "cheo suẩy", "vi": "keo dán"},
            {"zh": "扳手", "pinyin": "bānshou", "viBoi": "pan sẩu", "vi": "cờ lê"},
            {"zh": "纸箱", "pinyin": "zhǐxiāng", "viBoi": "chử xiang", "vi": "thùng carton"},
            {"zh": "奖金", "pinyin": "jiǎngjīn", "viBoi": "chiảng chin", "vi": "tiền thưởng"},
            {"zh": "样品", "pinyin": "yàngpǐn", "viBoi": "dang phỉn", "vi": "hàng mẫu"}
        ]
    },
    {
        "id": "frame_3",
        "titleZh": "框架三：这个 + [物品] + 多少 + [单位]？",
        "titleVi": "Khung 3: Cái này bao nhiêu...? (Hỏi số lượng / Kiểm kê)",
        "formula": "这个 + [Danh từ] + 多少 + [Đơn vị/钱/个]？",
        "formulaBoi": "Chưa cưa + [Đồ vật] + tua sao + [Đơn vị]?",
        "explanationZh": "清点数量、盘点仓库、核实工件数量时的必杀技，展现专业严谨。",
        "explanationVi": "Vũ khí tối thượng khi kiểm kê kho bãi, đếm hàng, hỏi giá. Nói câu này toát lên vẻ chuyên nghiệp sắc bén.",
        "slots": [
            {"zh": "个", "pinyin": "ge", "viBoi": "cưa", "vi": "chiếc / cái"},
            {"zh": "箱", "pinyin": "xiāng", "viBoi": "xiang", "vi": "thùng"},
            {"zh": "公斤", "pinyin": "gōngjīn", "viBoi": "cung chin", "vi": "kilôgam / cân"},
            {"zh": "米", "pinyin": "mǐ", "viBoi": "mỉ", "vi": "mét"},
            {"zh": "双", "pinyin": "shuāng", "viBoi": "soang", "vi": "đôi (giày/găng)"},
            {"zh": "包", "pinyin": "bāo", "viBoi": "pao", "vi": "gói / bao"},
            {"zh": "钱", "pinyin": "qián", "viBoi": "chén", "vi": "tiền (bao nhiêu tiền?)"}
        ]
    },
    {
        "id": "frame_4",
        "titleZh": "框架四：因为 + [原因]，所以 + [结果]",
        "titleVi": "Khung 4: Bởi vì... cho nên... (Báo cáo & Giải thích hợp lý)",
        "formula": "因为 + [Nguyên nhân], 所以 + [Kết quả]",
        "formulaBoi": "Dân uây + [Lý do], sủa ỷ + [Kết quả]",
        "explanationZh": "高情商汇报公式！汇报问题、解释进度慢或提出诉求时，逻辑严密，挑不出毛病。",
        "explanationVi": "Công thức báo cáo đỉnh cao! Giải thích lý do chậm trễ hoặc đề xuất đổi ca mà có cấu trúc này thì sếp chỉ biết gật gù đồng ý.",
        "slots": [
            {"causeZh": "机器坏了", "causeVi": "máy bị hỏng", "resZh": "需要维修", "resVi": "cần gọi thợ bảo trì"},
            {"causeZh": "没有物料", "causeVi": "hết nguyên liệu", "resZh": "我去仓库领", "resVi": "em ra kho lĩnh hàng"},
            {"causeZh": "身体不舒服", "causeVi": "người không khỏe", "resZh": "我想请假", "resVi": "em muốn xin nghỉ"},
            {"causeZh": "零件卡住了", "causeVi": "linh kiện bị kẹt", "resZh": "还要半小时", "resVi": "cần thêm nửa tiếng"},
            {"causeZh": "大家很努力", "causeVi": "anh em rất nỗ lực", "resZh": "今天超产了", "resVi": "hôm nay vượt chỉ tiêu"}
        ]
    },
    {
        "id": "frame_5",
        "titleZh": "框架五：请帮我 + [动作]",
        "titleVi": "Khung 5: Xin giúp tôi... (Cầu cứu & Điều phối)",
        "formula": "请帮我 + [Hành động / Thao tác]",
        "formulaBoi": "Chỉnh bang ủa + [Hành động]",
        "explanationZh": "职场人缘润滑油！向上能谦虚求助，平级能协作求援，当组长后能礼貌指挥下属。",
        "explanationVi": "Chất bôi trơn quan hệ công xưởng! Với cấp trên thì khiêm tốn nhờ chỉ bảo, với đồng nghiệp thì phối hợp nhịp nhàng, làm tổ trưởng thì điều động êm đẹp.",
        "slots": [
            {"zh": "看看这个", "pinyin": "kànkan zhè ge", "viBoi": "khan khan chưa cưa", "vi": "ngó giùm em cái này"},
            {"zh": "叫维修工", "pinyin": "jiào wéixiū gōng", "viBoi": "chéo uấy siêu cung", "vi": "gọi thợ bảo trì giúp em"},
            {"zh": "搬过去", "pinyin": "bān guòqù", "viBoi": "ban cua khuy", "vi": "khiêng giúp sang bên kia"},
            {"zh": "拿一下扳手", "pinyin": "ná yíxià bānshou", "viBoi": "nả ý xa pan sẩu", "vi": "lấy giùm em cái cờ lê"},
            {"zh": "签字", "pinyin": "qiānzì", "viBoi": "chen chư", "vi": "ký tên duyệt giúp em"},
            {"zh": "检查一下", "pinyin": "jiǎnchá yíxià", "viBoi": "chiển chá ý xa", "vi": "kiểm tra lại giùm em"}
        ]
    }
]

BOSS_CATCHPHRASES = [
    {
        "zh": "快点搞！",
        "pinyin": "kuài diǎn gǎo!",
        "viBoi": "Khoái tiển cảo!",
        "viMeaning": "Làm nhanh cái tay lên! (Câu cửa miệng khi giục hàng)",
        "reaction": "Lập tức đáp: '好好，马上搞定！' (Hảo hảo, mả sang cảo định - Dạ vâng, xong ngay đây!)"
    },
    {
        "zh": "搞什么鬼？",
        "pinyin": "gǎo shénme guǐ?",
        "viBoi": "Cảo sấm mơ quẩy?",
        "viMeaning": "Làm cái trò quỷ gì thế này? (Khi xảy ra lỗi phế phẩm)",
        "reaction": "Đừng cãi, cúi đầu đáp: '对不起，我马上改！' (Tuý pu chỉ, ủa mả sang cải!)"
    },
    {
        "zh": "行不行啊？",
        "pinyin": "xíng bù xíng a?",
        "viBoi": "Xính pu xính a?",
        "viMeaning": "Có được không đấy? Làm nổi không đấy?",
        "reaction": "Vỗ ngực dõng dạc: '行！没问题！' (Xính! Mấy uấn thí! - Được chứ sếp! Bao êm!)"
    },
    {
        "zh": "听懂了没有？",
        "pinyin": "tīng dǒng le méiyǒu?",
        "viBoi": "Thính đúng lơ mấy dẩu?",
        "viMeaning": "Nghe có hiểu không hả?",
        "reaction": "Gật đầu: '听懂了，放心！' (Thính đúng lơ, phang xin! - Em hiểu rồi, sếp cứ yên tâm!)"
    },
    {
        "zh": "差不多就行了",
        "pinyin": "chàbuduō jiù xíng le",
        "viBoi": "Cha pu tua chiêu xính lơ",
        "viMeaning": "Tương đối được rồi, không cần quá cầu kỳ đâu.",
        "reaction": "Đáp: '好，明白！' (Hảo, mính pai! - Dạ rõ rồi!)"
    },
    {
        "zh": "辛苦了！",
        "pinyin": "xīnkǔ le!",
        "viBoi": "Xin khủ lơ!",
        "viMeaning": "Vất vả cho mọi người rồi! (Sếp khen cuối ca)",
        "reaction": "Nở nụ cười đáp lại: '老大也辛苦了！' (Lảo ta dể xin khủ lơ! - Đại ca cũng vất vả rồi!)"
    }
]

HAN_VIET_HACKS = [
    {"vi": "Chất lượng", "hanViet": "Chất lượng (chất lượng)", "zh": "质量", "pinyin": "zhìliàng", "viBoi": "chứ liêng"},
    {"vi": "Vấn đề", "hanViet": "Vấn đề (vấn đề)", "zh": "问题", "pinyin": "wèntí", "viBoi": "uấn thí"},
    {"vi": "Sản xuất", "hanViet": "Sản xuất (sản xuất)", "zh": "生产", "pinyin": "shēngchǎn", "viBoi": "sang sản"},
    {"vi": "Kinh lý (Giám đốc)", "hanViet": "Kinh lý (giám đốc)", "zh": "经理", "pinyin": "jīnglǐ", "viBoi": "kinh lỉ"},
    {"vi": "Công ty", "hanViet": "Công ty (công ty)", "zh": "公司", "pinyin": "gōngsī", "viBoi": "cung sư"},
    {"vi": "Cơ khí (Máy móc)", "hanViet": "Cơ khí (máy móc)", "zh": "机器", "pinyin": "jīqì", "viBoi": "chi chi"},
    {"vi": "An toàn", "hanViet": "An toàn (an toàn)", "zh": "安全", "pinyin": "ānquán", "viBoi": "an toàn"},
    {"vi": "Kiểm tra", "hanViet": "Kiểm tra (kiểm tra)", "zh": "检查", "pinyin": "jiǎnchá", "viBoi": "chiển chá"},
    {"vi": "Hợp cách (Đạt chuẩn)", "hanViet": "Hợp cách (đạt chuẩn)", "zh": "合格", "pinyin": "hégé", "viBoi": "hứa cứa"},
    {"vi": "Chuẩn bị", "hanViet": "Chuẩn bị (chuẩn bị)", "zh": "准备", "pinyin": "zhǔnbèi", "viBoi": "chuẩn phây"},
    {"vi": "Ý kiến", "hanViet": "Ý kiến (ý kiến)", "zh": "意见", "pinyin": "yìjiàn", "viBoi": "ý chiển"},
    {"vi": "Thời gian", "hanViet": "Thời gian (thời gian)", "zh": "时间", "pinyin": "shíjiān", "viBoi": "sử chen"}
]
