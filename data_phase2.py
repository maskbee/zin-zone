# -*- coding: utf-8 -*-
"""
Phase 2: 主动出击 (Day 8 - 14)
Mục tiêu: Thoát kiếp câm như hến, biết báo cáo tiến độ, biết cầu cứu xin chỉ bảo, đếm hàng tính số, thể hiện năng lực trước mặt cấp trên.
"""

PHASE_2_DAYS = [
    {
        "day": 8,
        "phase": 2,
        "titleZh": "极简自我介绍",
        "titleVi": "Giới thiệu bản thân bá đạo",
        "targetZh": "10秒让中国管理层记住你的名字、工龄和优势，树立靠谱听话的第一印象！",
        "targetVi": "10 giây khiến sếp Hoa nhớ in sâu tên tuổi, thâm niên và độ nhạy việc, đóng đinh ấn tượng 'thằng này ngoan và biết việc'!",
        "sentences": [
            {
                "id": "d8_s1",
                "zh": "我叫阿雄",
                "pinyin": "wǒ jiào Ā Xióng",
                "viBoi": "Ủa chéo A Hùng",
                "hanViet": "Ngã khiếu A Hùng (tôi tên là A Hùng)",
                "viMeaning": "Tôi tên là A Hùng (thay tên bạn vào)",
                "spicyHook": "ỦA CHÉO (ngã chỏng queo)! Vấp ngã chỏng gọng nhưng vẫn ngẩng cao đầu hô vang: TAO LÀ A HÙNG con nhà bà Mạnh, dũng mãnh nhất xưởng!",
                "bossTactic": "Người Hoa thích gọi tên 1 chữ kèm chữ 'A' phía trước (A Hùng, A Dũng, A Linh, A Hoa). Xưng như vậy nghe cực kỳ gần gũi như người nhà.",
                "audioText": "我叫阿雄",
                "tags": ["Xưng hô", "Giao lưu"]
            },
            {
                "id": "d8_s2",
                "zh": "我做这个三年了",
                "pinyin": "wǒ zuò zhè ge sān nián le",
                "viBoi": "Ủa chua chưa cưa san niển lơ",
                "hanViet": "Ngã tác giá cá tam niên liễu (tôi làm cái này 3 năm rồi)",
                "viMeaning": "Tôi làm nghề này 3 năm rồi / Có kinh nghiệm rồi",
                "spicyHook": "ỦA CHUA (tay nghề chua loét ngọt nước) làm CHƯA CƯA (món này) SAN NIỂN LƠ (ba năm ròng rã)! Tay nghề dẻo quẹo như thợ gia truyền!",
                "bossTactic": "Nói câu này khi sếp hỏi ai biết chỉnh máy hoặc ai làm khâu này lâu năm. Số 3 (tam niên) tạo cảm giác cực kỳ dày dạn.",
                "audioText": "我做这个三年了",
                "tags": ["Kinh nghiệm", "Khoe tài"]
            },
            {
                "id": "d8_s3",
                "zh": "我学得很快",
                "pinyin": "wǒ xué de hěn kuài",
                "viBoi": "Ủa xuế tơ hẩn khoái",
                "hanViet": "Ngã học đắc hấn khoái (tôi học rất nhanh)",
                "viMeaning": "Tôi học việc nhanh lắm / Tiếp thu siêu tốc",
                "spicyHook": "HỌC là XUẾ! XUẾ TƠ HẨN KHOÁI: Nhìn lướt qua một cái là KHOÁI, não nhảy số học lỏm siêu tốc, không cần cầm tay chỉ việc lần hai!",
                "bossTactic": "Khi được điều chuyển sang công đoạn mới hoặc sản phẩm mới, vỗ ngực bảo sếp câu này để sếp an tâm bàn giao việc.",
                "audioText": "我学得很快",
                "tags": ["Học hỏi", "Nhanh nhẹn"]
            },
            {
                "id": "d8_s4",
                "zh": "我很听话",
                "pinyin": "wǒ hěn tīng huà",
                "viBoi": "Ủa hẩn thính hoa",
                "hanViet": "Ngã hấn thính thoại (tôi rất nghe lời)",
                "viMeaning": "Tôi rất nghe lời / Rất biết vâng lời",
                "spicyHook": "HẨN THÍNH HOA! Tai chỉ nghe lời sếp rót mật như HOA, sếp bảo đâm đầu vô tường cũng dạ, ngoan như cún cưng trong nhà!",
                "bossTactic": "Sếp người Hoa ghét nhất công nhân bướng bỉnh hay cãi ngang. Tuyên bố 'Ủa hẩn thính hoa' là chiếm trọn 90% cảm tình của sếp.",
                "audioText": "我很听话",
                "tags": ["Ngoan ngoãn", "Lấy lòng"]
            },
            {
                "id": "d8_s5",
                "zh": "请多关照",
                "pinyin": "qǐng duō guān zhào",
                "viBoi": "Chỉnh tua quan chao",
                "hanViet": "Thỉnh đa quan chiếu (xin chiếu cố nhiều)",
                "viMeaning": "Xin sếp/anh em chiếu cố giúp đỡ tôi nhiều ạ!",
                "spicyHook": "Âm Hán Việt: THỈNH ĐA QUAN CHIẾU! CHỈNH cái TÚI QUAN CHAO (đưa mắt nhìn sếp với ánh mắt lấp lánh cầu xin được nâng đỡ chở che)!",
                "bossTactic": "Dùng khi bắt tay sếp mới, ngày đầu nhận việc, hoặc khi được phân công về tổ mới.",
                "audioText": "请多关照",
                "tags": ["Lễ phép", "Ngoại giao"]
            }
        ],
        "words": [
            {"zh": "老员工", "pinyin": "lǎoyuángōng", "viBoi": "Lảo duển cung", "hanViet": "Lão nguyên công", "viMeaning": "Nhân viên cũ / Thợ lâu năm", "example": "我是老员工 (Ủa sư lảo duển cung - Tôi là người cũ ở xưởng)"},
            {"zh": "新手", "pinyin": "xīnshǒu", "viBoi": "Xin sẩu", "hanViet": "Tân thủ", "viMeaning": "Người mới / Mới vào nghề", "example": "他是新手 (Tha sư xin sẩu - Cậu ấy là người mới)"},
            {"zh": "有经验", "pinyin": "yǒu jīngyàn", "viBoi": "Dẩu kinh den", "hanViet": "Hữu kinh nghiệm", "viMeaning": "Có kinh nghiệm", "example": "我很有经验 (Ủa hẩn dẩu kinh den - Tôi rất có kinh nghiệm)"},
            {"zh": "越南人", "pinyin": "yuènánrén", "viBoi": "Duế nán rấn", "hanViet": "Việt Nam nhân", "viMeaning": "Người Việt Nam", "example": "我们是越南人 (Ủa mân sư duế nán rấn - Chúng tôi là người Việt)"},
            {"zh": "勤快", "pinyin": "qínkuài", "viBoi": "Thỉn khoái", "hanViet": "Cần khoái", "viMeaning": "Chăm chỉ / Siêng năng", "example": "做事很勤快 (Chua sư hẩn thỉn khoái - Làm việc rất siêng năng)"},
            {"zh": "负责", "pinyin": "fùzé", "viBoi": "Phu chứa", "hanViet": "Phụ trách", "viMeaning": "Có trách nhiệm", "example": "我很负责 (Ủa hẩn phu chứa - Em làm việc rất có trách nhiệm)"},
            {"zh": "听指挥", "pinyin": "tīng zhǐhuī", "viBoi": "Thính chử huy", "hanViet": "Thính chỉ huy", "viMeaning": "Nghe theo chỉ đạo", "example": "听指挥做 (Thính chử huy chua - Nghe theo chỉ đạo mà làm)"},
            {"zh": "肯学", "pinyin": "kěn xué", "viBoi": "Khẩn xuế", "hanViet": "Khẳng học", "viMeaning": "Chịu khó học hỏi", "example": "我很肯学 (Ủa hẩn khẩn xuế - Em rất chịu khó học)"},
            {"zh": "反应快", "pinyin": "fǎnyìng kuài", "viBoi": "Phản inh khoái", "hanViet": "Phản ứng khoái", "viMeaning": "Nhanh nhạy / Nhanh trí", "example": "他反应快 (Tha phản inh khoái - Cậu ta phản ứng rất lẹ)"},
            {"zh": "技术好", "pinyin": "jìshù hǎo", "viBoi": "Chi su hảo", "hanViet": "Kỹ thuật hảo", "viMeaning": "Tay nghề giỏi / Kỹ thuật cứng", "example": "我技术好 (Ủa chi su hảo - Tay nghề em cứng lắm)"}
        ],
        "story": {
            "title": "Màn Chào Sân Chấn Động Xưởng",
            "content": "Tổng giám đốc bên Trung Quốc mới sang thị sát chuyền. Đến bàn tao, sếp gật đầu nhìn ngực áo. Tao đứng thẳng lưng, mắt sáng ngời dõng dạc: LẢO BẢN HẢO! ỦA CHÉO A HÙNG (我叫阿雄 - em tên A Hùng)! ỦA CHUA CHƯA CƯA SAN NIỂN LƠ (我做这个三年了 - em làm việc này 3 năm rồi)! Thấy sếp mỉm cười gật gù, tao bồi thêm luôn cú knock-out: Sếp cứ giao thêm đồ khó, ỦA XUẾ TƠ HẨN KHOÁI (我学得很快 - em học nhanh như gió)! ỦA HẨN THÍNH HOA (我很听话 - em tuyệt đối nghe lời sếp chỉ đạo)! CHỈNH TUA QUAN CHAO (请多关照 - mong sếp chiếu cố em)! Sếp quay sang bảo quản đốc: Thằng này có khí chất, cho nó làm hạt giống tương lai!"
        },
        "mission": {
            "taskZh": "今天遇到任何一位中国籍主管，微笑着完整说一遍自己的极简介绍！",
            "taskVi": "Hôm nay nếu gặp bất kỳ sếp người Hoa nào, hãy mỉm cười và tự tin bắn bài giới thiệu bản thân 3 câu!"
        }
    },
    {
        "day": 9,
        "phase": 2,
        "titleZh": "求助与确认",
        "titleVi": "Cầu cứu & Xác nhận",
        "targetZh": "遇到不懂绝不瞎搞硬撑，礼貌请教、确认步骤，不出废品就是立大功！",
        "targetVi": "Gặp việc khó không giấu dốt làm bậy, biết mở miệng cầu cứu xin chỉ bảo, không tạo phế phẩm là lập công lớn!",
        "sentences": [
            {
                "id": "d9_s1",
                "zh": "我不会做",
                "pinyin": "wǒ bú huì zuò",
                "viBoi": "Ủa pú huây chua",
                "hanViet": "Ngã bất hội tác (tôi không biết làm)",
                "viMeaning": "Em chưa biết làm cái này / Em không biết làm",
                "spicyHook": "ỦA PÚ HUÂY CHUA (mồm mở to chua lè kêu cứu)! Không biết thì nói không biết, đừng làm liều kẻo đền tiền sặc gạch!",
                "bossTactic": "Nói thật ngay từ đầu khi gặp mã hàng lạ. Sếp người Hoa thà bạn bảo không biết còn hơn bạn tự chế làm hỏng cả lô.",
                "audioText": "我不会做",
                "tags": ["Thật thà", "Cầu cứu"]
            },
            {
                "id": "d9_s2",
                "zh": "请教我",
                "pinyin": "qǐng jiāo wǒ",
                "viBoi": "Chỉnh cheo ủa",
                "hanViet": "Thỉnh giáo ngã (xin dạy tôi)",
                "viMeaning": "Xin dạy cho em / Chỉ giúp em với",
                "spicyHook": "CHỈNH CHEO ỦA: Chắp tay 'thỉnh giáo', xin sư phụ CHÈO lái con đò tri thức thông não cho em, đội ơn sư phụ trọn đời!",
                "bossTactic": "Sau khi nói 'Ủa pú huây chua', tiếp ngay 'Chỉnh cheo ủa'. Người lớn tuổi rất thích cảm giác được làm thầy truyền nghề.",
                "audioText": "请教我",
                "tags": ["Học hỏi", "Cầu thị"]
            },
            {
                "id": "d9_s3",
                "zh": "请再说一遍",
                "pinyin": "qǐng zài shuō yí biàn",
                "viBoi": "Chỉnh chai sua ý piển",
                "hanViet": "Thỉnh tái thuyết nhất biến (xin nói lại một lần)",
                "viMeaning": "Xin sếp nói lại lần nữa giùm em",
                "spicyHook": "CHỈNH CHAI rượu để nghe SUA Ý PIỂN (thuyết lại một biến)! Nghe chưa kịp lọt lỗ tai thì nịnh sếp 'rót lại một biến nữa' cho em thấm!",
                "bossTactic": "Khi sếp nói quá nhanh hoặc nuốt âm, đưa ngón trỏ lên lịch sự: 'Chỉnh chai sua ý piển, xỉa xỉa' (Xin nói lại lần nữa, cảm ơn).",
                "audioText": "请再说一遍",
                "tags": ["Lắng nghe", "Xác nhận"]
            },
            {
                "id": "d9_s4",
                "zh": "是这个吗",
                "pinyin": "shì zhè ge ma",
                "viBoi": "Sư chưa cưa ma",
                "hanViet": "Thị giá cá ma (là cái này hả?)",
                "viMeaning": "Có phải cái này không? / Đúng cái này không?",
                "spicyHook": "SƯ (sư tử) vồ CHƯA CƯA MA (cái của nợ này hả)? Cầm tận tay món đồ giơ lên trước mặt sếp hỏi: 'Sư chưa cưa ma?' cho chắc ăn!",
                "bossTactic": "Cầm chi tiết/ốc vít lên đối chiếu trước mặt sếp trước khi lắp ráp hàng loạt.",
                "audioText": "是这个吗",
                "tags": ["Đảm bảo", "Đúng mẫu"]
            },
            {
                "id": "d9_s5",
                "zh": "我听懂了",
                "pinyin": "wǒ tīng dǒng le",
                "viBoi": "Ủa thính đúng lơ",
                "hanViet": "Ngã thính đổng liễu (tôi nghe hiểu rồi)",
                "viMeaning": "Em nghe hiểu rồi ạ / Em nắm rõ rồi!",
                "spicyHook": "THÍNH ĐÚNG LƠ! Nghe tiếng THÍNH phát là ĐỔNG (đổng ngộ/thông não) ĐÚNG ngay chóc, mắt sáng rực gật đầu cái rụp!",
                "bossTactic": "Khi hiểu thao tác, gật đầu dứt khoát 'Ủa thính đúng lơ, xỉa xỉa lảo bản!' rồi bắt tay vào làm thoăn thoắt.",
                "audioText": "我听懂了",
                "tags": ["Thông suốt", "Tự tin"]
            }
        ],
        "words": [
            {"zh": "怎么弄", "pinyin": "zěnme nòng", "viBoi": "Chẩn mơ nung", "hanViet": "Chẩm ma lộng", "viMeaning": "Làm thế nào / Xử lý sao đây", "example": "这个怎么弄？ (Chưa cưa chẩn mơ nung? - Cái này làm sao đây?)"},
            {"zh": "哪个", "pinyin": "nǎge", "viBoi": "Nả cưa", "hanViet": "Na cá", "viMeaning": "Cái nào vậy", "example": "用哪个？ (Dung nả cưa? - Dùng cái nào?)"},
            {"zh": "对不对", "pinyin": "duì bu duì", "viBoi": "Tuý pu tuý", "hanViet": "Đối bất đối", "viMeaning": "Đúng không / Phải không", "example": "这样对不对？ (Chưa dang tuý pu tuý? - Thế này đúng không?)"},
            {"zh": "慢慢说", "pinyin": "mànman shuō", "viBoi": "Man man sua", "hanViet": "Mạn mạn thuyết", "viMeaning": "Nói từ từ thôi", "example": "请慢慢说 (Chỉnh man man sua - Xin nói từ từ thôi)"},
            {"zh": "听不懂", "pinyin": "tīng bù dǒng", "viBoi": "Thính pu đúng", "hanViet": "Thính bất đổng", "viMeaning": "Nghe không hiểu", "example": "我听不懂 (Ủa thính pu đúng - Em nghe không hiểu)"},
            {"zh": "演示一下", "pinyin": "yǎnshì yíxià", "viBoi": "Dản sư ý xa", "hanViet": "Diễn thị nhất hạ", "viMeaning": "Làm mẫu thao tác một lần", "example": "帮我演示一下 (Bang ủa dản sư ý xa - Làm mẫu cho em coi với)"},
            {"zh": "别生气", "pinyin": "bié shēngqì", "viBoi": "Piế sang chi", "hanViet": "Biệt sinh khí", "viMeaning": "Đừng giận / Đừng bực mình", "example": "师傅别生气 (Sư phu piế sang chi - Sư phụ đừng giận nhen)"},
            {"zh": "记住了", "pinyin": "jìzhù le", "viBoi": "Chi chu lơ", "hanViet": "Ký trụ liễu", "viMeaning": "Ghi nhớ rồi", "example": "我都记住了 (Ủa đâu chi chu lơ - Em nhớ hết rồi ạ)"},
            {"zh": "明白了", "pinyin": "míngbai le", "viBoi": "Mính pai lơ", "hanViet": "Minh bạch liễu", "viMeaning": "Hiểu rõ rồi", "example": "我明白了 (Ủa mính pai lơ - Em hiểu rõ rồi ạ)"},
            {"zh": "再试一次", "pinyin": "zài shì yícì", "viBoi": "Chai sư ý chứ", "hanViet": "Tái thí nhất thứ", "viMeaning": "Thử lại một lần nữa", "example": "让我再试一次 (Rượng ủa chai sư ý chứ - Cho em thử lại lần nữa)"}
        ],
        "story": {
            "title": "Bí Kíp Thỉnh Giáo Sư Phụ Xưởng",
            "content": "Chuyền vừa đổi mã hàng khó nhằn, tao ngắm bản vẽ mà hoa cả mắt. Tao không dám làm liều, khoanh tay đứng cạnh thợ già: Sư phụ ơi, ỦA PÚ HUÂY CHUA (我不会做 - em chưa biết làm)! CHỈNH CHEO ỦA (请教我 - xin chỉ giáo cho em với)! Sư phụ giải thích một tràng tiếng lóng địa phương nhanh như bắn súng liên thanh, tai tao lùng bùng. Tao chắp tay cười tươi: CHỈNH CHAI SUA Ý PIỂN (请再说一遍 - xin nói lại lần nữa giùm em)! Sau đó tao cầm con ốc mẫu giơ lên: SƯ CHƯA CƯA MA (是这个吗 - đúng con này không ạ)? Sư phụ gật đầu lia lịa rồi chỉ mẹo bấm lẫy. Mắt tao sáng rực: ỦA THÍNH ĐÚNG LƠ (我听懂了 - em hiểu thông rồi)! Làm liền 10 cái trơn tru không lỗi, sư phụ gật gù khoái chí!"
        },
        "mission": {
            "taskZh": "今天遇到不懂的操作，坚决不猜，主动向老员工或主管说'请教我'！",
            "taskVi": "Hôm nay nếu có thao tác nào chưa chắc chắn, tuyệt đối không đoán mò, hãy mở miệng nói ngay: '请教我 (Chỉnh cheo ủa)'!"
        }
    },
    {
        "day": 10,
        "phase": 2,
        "titleZh": "汇报工作进度",
        "titleVi": "Báo cáo tiến độ thần tốc",
        "targetZh": "主动汇报'做完了'、'超产了'，把业绩狠狠砸在主管脸上，成为最放心的得力干将！",
        "targetVi": "Chủ động báo cáo 'làm xong rồi', 'vượt sản lượng rồi', quẳng thành tích vào mặt cấp trên, biến mình thành cánh tay mặt đắc lực!",
        "sentences": [
            {
                "id": "d10_s1",
                "zh": "做完了",
                "pinyin": "zuò wán le",
                "viBoi": "Chua oán lơ",
                "hanViet": "Tác hoàn liễu (làm xong rồi)",
                "viMeaning": "Làm xong hết rồi! / Hoàn thành rồi!",
                "spicyHook": "CHUA OÁN LƠ: Cày cuốc xong xuôi như OÁN hận tiêu tan, sung sướng vươn vai ngửa cổ hét to: Tác hoàn liễu - Xong mẹ nó rồi!",
                "bossTactic": "Làm xong sớm hơn kế hoạch 10 phút, đứng lên lau bàn rồi báo sếp 'Chua oán lơ!'. Tiếng nói ngọt ngào nhất mà quản lý muốn nghe.",
                "audioText": "做完了",
                "tags": ["Hoàn thành", "Thắng lợi"]
            },
            {
                "id": "d10_s2",
                "zh": "还没做完",
                "pinyin": "hái méi zuò wán",
                "viBoi": "Hái mấy chua oán",
                "hanViet": "Hoàn một tác hoàn (vẫn chưa làm xong)",
                "viMeaning": "Vẫn chưa làm xong ạ / Đang làm dở",
                "spicyHook": "HÁI MẤY CHUA OÁN: Vẫn còn dở dang chưa hái hết trái chua oán, tay chân thoăn thoắt làm bù kẻo trễ!",
                "bossTactic": "Khi sếp lại hỏi mà chưa xong, bình tĩnh đáp câu này kèm thời gian ước tính (Day 10 câu 4) để sếp không cáu gắt.",
                "audioText": "还没做完",
                "tags": ["Tiến độ", "Trung thực"]
            },
            {
                "id": "d10_s3",
                "zh": "有点问题",
                "pinyin": "yǒu diǎn wèntí",
                "viBoi": "Dẩu tiển uấn thí",
                "hanViet": "Hữu điểm vấn đề (có chút vấn đề)",
                "viMeaning": "Có chút trục trặc / Có vấn đề nhỏ",
                "spicyHook": "Âm Hán Việt: HỮU ĐIỂM VẤN ĐỀ! DẨU TIỂN (dính chút mỡ) UẤN THÍ (vấn đề cấn cấn ngứa ngáy), phải gọi sếp lại xem xét giải quyết!",
                "bossTactic": "Báo cáo sự cố từ trong trứng nước, không để lỗ hổng phình to thành thảm họa.",
                "audioText": "有点问题",
                "tags": ["Trục trặc", "Báo cáo sớm"]
            },
            {
                "id": "d10_s4",
                "zh": "还要半小时",
                "pinyin": "hái yào bàn xiǎoshí",
                "viBoi": "Hái dao ban siểu sử",
                "hanViet": "Hoàn yếu bán tiểu thời (cần thêm nửa tiếng nữa)",
                "viMeaning": "Cần thêm khoảng nửa tiếng nữa là xong",
                "spicyHook": "HÁI DAO mổ BAN SIỂU SỬ (nửa giờ đồng hồ)! Xin sếp thêm nửa tiếng nhát dao chém ngọt là lô hàng đâu vào đấy!",
                "bossTactic": "Đưa ra con số cụ thể ('ban siểu sử' = 30 phút) giúp sếp xếp xe nâng hoặc kế hoạch bốc dỡ hàng hóa chính xác.",
                "audioText": "还要半小时",
                "tags": ["Ước lượng", "Chính xác"]
            },
            {
                "id": "d10_s5",
                "zh": "今天超产了",
                "pinyin": "jīntiān chāochǎn le",
                "viBoi": "Chin thiển thao sản lơ",
                "hanViet": "Kim thiên siêu sản liễu (hôm nay vượt sản lượng rồi)",
                "viMeaning": "Hôm nay vượt chỉ tiêu sản lượng rồi sếp ơi!",
                "spicyHook": "CHIN THIỂN THAO SẢN LƠ: Hôm nay 'THAO' (cày cuốc hùng hục) SIÊU SẢN LƯỢNG nứt cả sàn xưởng! Tiền thưởng ngập tràn trong tài khoản!",
                "bossTactic": "Cuối ca gặp sếp, cười rạng rỡ đập tay nói câu này. Đảm bảo sếp sẽ nhớ mặt bạn khi xét duyệt danh sách thưởng tháng.",
                "audioText": "今天超产了",
                "tags": ["Khoe thành tích", "Ăn thưởng"]
            }
        ],
        "words": [
            {"zh": "进度", "pinyin": "jìndù", "viBoi": "Chin tu", "hanViet": "Tiến độ", "viMeaning": "Tiến độ làm việc", "example": "汇报进度 (Huy pao chin tu - Báo cáo tiến độ)"},
            {"zh": "计划", "pinyin": "jìhuà", "viBoi": "Chi hoa", "hanViet": "Kế hoạch", "viMeaning": "Kế hoạch", "example": "按照计划 (An chao chi hoa - Theo đúng kế hoạch)"},
            {"zh": "完成", "pinyin": "wánchéng", "viBoi": "Oán chấng", "hanViet": "Hoàn thành", "viMeaning": "Hoàn thành", "example": "已经完成了 (Dỉ chinh oán chấng lơ - Đã hoàn thành rồi)"},
            {"zh": "拖延", "pinyin": "tuōyán", "viBoi": "Thua den", "hanViet": "Tha diên", "viMeaning": "Trì hoãn / Chậm trễ", "example": "不要拖延 (Pu dao thua den - Không được chậm trễ)"},
            {"zh": "目标", "pinyin": "mùbiāo", "viBoi": "Mu peo", "hanViet": "Mục tiêu", "viMeaning": "Mục tiêu chỉ tiêu", "example": "达到目标 (Ta tao mu peo - Đạt mục tiêu)"},
            {"zh": "数量够了", "pinyin": "shùliàng gòu le", "viBoi": "Su liêng câu lơ", "hanViet": "Số lượng cấu liễu", "viMeaning": "Đủ số lượng rồi", "example": "数量够了 (Su liêng câu lơ - Đủ số lượng rồi)"},
            {"zh": "还在排队", "pinyin": "hái zài páiduì", "viBoi": "Hái chai phái tuý", "hanViet": "Hoàn tại bài đội", "viMeaning": "Còn đang xếp hàng/chờ khâu trước", "example": "还在排队 (Hái chai phái tuý - Vẫn đang chờ)"},
            {"zh": "马上好", "pinyin": "mǎshàng hǎo", "viBoi": "Mả sang hảo", "hanViet": "Mã thượng hảo", "viMeaning": "Xong ngay đây", "example": "马上好！ (Mả sang hảo! - Xong ngay đây ạ!)"},
            {"zh": "差十个", "pinyin": "chà shí ge", "viBoi": "Cha sử cưa", "hanViet": "Sai thập cá", "viMeaning": "Còn thiếu 10 cái nữa", "example": "还差十个 (Hái cha sử cưa - Còn thiếu 10 cái)"},
            {"zh": "提早完成", "pinyin": "tízǎo wánchéng", "viBoi": "Thí chảo oán chấng", "hanViet": "Đề tảo hoàn thành", "viMeaning": "Xong trước thời hạn", "example": "提早完成了 (Thí chảo oán chấng lơ - Xong sớm trước giờ)"}
        ],
        "story": {
            "title": "Bữa Tiệc Siêu Sản Lượng",
            "content": "Quản đốc đi rảo quanh chuyền với vẻ mặt căng thẳng vì đơn hàng xuất khẩu gấp. Đi ngang bàn tao, sếp hỏi tiến độ. Tao không hề lúng túng: Báo cáo sếp, đợt 1 CHUA OÁN LƠ (做完了 - xong hết rồi)! Đợt 2 HÁI MẤY CHUA OÁN (还没做完 - chưa xong hẳn) vì khuôn đúc DẨU TIỂN UẤN THÍ (有点问题 - có chút trục trặc)! Nhưng em đã xử lý xong, HÁI YAO BAN SIỂU SỬ (还要半小时 - cần thêm nửa tiếng nữa là dứt điểm)! Đến 4h30 chiều, tao chốt sổ báo sếp: CHIN THIỂN THAO SẢN LƠ (今天超产了 - hôm nay vượt chỉ tiêu 15% rồi sếp ơi)! Quản đốc cười toe toét, đập vai tao cái bốp: 'Tối nay tao đãi mày trà sữa!'."
        },
        "mission": {
            "taskZh": "做完手头批次时，不要闷声不响，立刻对班长喊一声'做完了'！",
            "taskVi": "Làm xong lô hàng trên bàn, đừng im ỉm ngồi chơi, hãy ngẩng đầu báo ngay với trưởng ca: '做完了 (Chua oán lơ)'!"
        }
    },
    {
        "day": 11,
        "phase": 2,
        "titleZh": "请假与调换班",
        "titleVi": "Xin nghỉ khéo & Đổi ca êm đẹp",
        "targetZh": " xin nghỉ ốm, việc gấp có tình có lý, hứa bù công dứt khoát, sếp vui vẻ duyệt đơn trong 1 nốt nhạc!",
        "targetVi": "Xin nghỉ bệnh, việc đột xuất hợp tình hợp lý, cam kết cày bù rành mạch, sếp ký duyệt tươi cười không gây khó dễ!",
        "sentences": [
            {
                "id": "d11_s1",
                "zh": "我身体不舒服",
                "pinyin": "wǒ shēntǐ bù shūfu",
                "viBoi": "Ủa sân thỉ pu su phu",
                "hanViet": "Ngã thân thể bất thư phục (người tôi không được khỏe)",
                "viMeaning": "Người em không được khỏe / Em bị ốm",
                "spicyHook": "Âm Hán Việt: THÂN THỂ BẤT THƯ PHỤC! SÂN THỈ PU SU PHU: Thân thể không 'sướng/phê' nổi, người sốt hâm hấp như đống than rực!",
                "bossTactic": "Nói bằng giọng mệt mỏi nhưng chân thành. Quản lý Hoa rất sợ công nhân ngất xỉu tại xưởng gây tai nạn lao động.",
                "audioText": "我身体不舒服",
                "tags": ["Nghỉ ốm", "Sức khỏe"]
            },
            {
                "id": "d11_s2",
                "zh": "家里有急事",
                "pinyin": "jiālǐ yǒu jíshì",
                "viBoi": "Gia lỉ dẩu chí sư",
                "hanViet": "Gia lý hữu cấp sự (trong nhà có việc gấp)",
                "viMeaning": "Nhà em có việc gấp / Việc gia đình đột xuất",
                "spicyHook": "Âm Hán Việt: GIA LÝ HỮU CẤP SỰ! Trong GIA đình có việc CẤP bách rực lửa, phải chạy về cứu trợ khẩn cấp!",
                "bossTactic": "Người Hoa rất coi trọng chữ 'Hiếu' và chuyện gia đình. Nêu lý do này sếp ít khi căn vặn sâu.",
                "audioText": "家里有急事",
                "tags": ["Việc gia đình", "Khẩn cấp"]
            },
            {
                "id": "d11_s3",
                "zh": "我想换班",
                "pinyin": "wǒ xiǎng huànbān",
                "viBoi": "Ủa xưởng hoán ban",
                "hanViet": "Ngã tưởng hoán ban (tôi muốn đổi ca)",
                "viMeaning": "Em muốn xin đổi ca làm việc",
                "spicyHook": "Âm Hán Việt: HOÁN BAN! ỦA XƯỞNG HOÁN BAN: Em muốn 'hoán đổi' ca này lấy ca khác để tiện đường chăm người yêu!",
                "bossTactic": "Tốt nhất là tìm sẵn 1 đồng nghiệp đồng ý đổi ca cùng trước, rồi dắt nhau lên gặp sếp xin chữ ký.",
                "audioText": "我想换班",
                "tags": ["Đổi ca", "Linh hoạt"]
            },
            {
                "id": "d11_s4",
                "zh": "绝不耽误事",
                "pinyin": "jué bù dānwu shì",
                "viBoi": "Chuế pu đan u sư",
                "hanViet": "Tuyệt bất đam ngộ sự (tuyệt đối không trễ việc)",
                "viMeaning": "Tuyệt đối không làm trễ nải công việc đâu sếp!",
                "spicyHook": "CHUẾ PU ĐAN U SƯ: Lời thề đanh thép! Xin nghỉ nhưng việc giao vẫn có người gánh hoặc đã cày xong trước, tuyệt đối không để xưởng chết đứng!",
                "bossTactic": "Câu thần chú bảo hiểm tâm lý cho sếp! Quản lý chỉ sợ dây chuyền bị thiếu người ngưng trệ.",
                "audioText": "绝不耽误事",
                "tags": ["Cam kết", "Uy tín"]
            },
            {
                "id": "d11_s5",
                "zh": "下周我补上",
                "pinyin": "xià zhōu wǒ bǔ shang",
                "viBoi": "Hạ châu ủa pủ sang",
                "hanViet": "Hạ chu ngã bổ thượng (tuần tới tôi bù lại)",
                "viMeaning": "Tuần sau em sẽ cày tăng ca bù lại đủ ạ!",
                "spicyHook": "HẠ CHÂU ỦA PỦ SANG: Tuần sau hạ quyết tâm 'BỔ THƯỢNG', tăng ca cày bù gấp đôi trả nợ công ty sòng phẳng!",
                "bossTactic": "Đưa ra phương án giải quyết dứt điểm. Sếp thấy bạn biết điều và có trách nhiệm, lần sau xin nghỉ cực dễ.",
                "audioText": "下周我补上",
                "tags": ["Cày bù", "Có tâm"]
            }
        ],
        "words": [
            {"zh": "发烧", "pinyin": "fāshāo", "viBoi": "Pha sao", "hanViet": "Phát thiêu", "viMeaning": "Bị sốt", "example": "我发烧了 (Ủa pha sao lơ - Em bị sốt rồi)"},
            {"zh": "头疼", "pinyin": "tóuténg", "viBoi": "Thâu thấng", "hanViet": "Đầu thống", "viMeaning": "Đau đầu", "example": "头很疼 (Thâu hẩn thấng - Đầu đau nhức)"},
            {"zh": "医院", "pinyin": "yīyuàn", "viBoi": "Y duển", "hanViet": "Y viện", "viMeaning": "Bệnh viện", "example": "去医院看病 (Khuy y duển khan pình - Đi viện khám bệnh)"},
            {"zh": "结婚", "pinyin": "jiéhūn", "viBoi": "Chiế huân", "hanViet": "Kết hôn", "viMeaning": "Đám cưới / Lấy vợ gả chồng", "example": "亲戚结婚 (Thin thi chiế huân - Họ hàng cưới xin)"},
            {"zh": "办手续", "pinyin": "bàn shǒuxù", "viBoi": "Pan sẩu suy", "hanViet": "Biện thủ tục", "viMeaning": "Làm thủ tục giấy tờ", "example": "去办手续 (Khuy pan sẩu suy - Đi làm thủ tục)"},
            {"zh": "替我顶班", "pinyin": "tì wǒ dǐngbān", "viBoi": "Thi ủa đỉnh ban", "hanViet": "Thế ngã đỉnh ban", "viMeaning": "Trực ca thay tôi / Làm thế ca", "example": "阿雄替我顶班 (A Hùng thi ủa đỉnh ban - A Hùng làm thế ca em)"},
            {"zh": "签字", "pinyin": "qiānzì", "viBoi": "Chen chư", "hanViet": "Thiêm tự", "viMeaning": "Ký tên duyệt", "example": "请老板签字 (Chỉnh lảo bản chen chư - Xin sếp ký tên duyệt)"},
            {"zh": "批假", "pinyin": "pījià", "viBoi": "Phi giá", "hanViet": "Phê giả", "viMeaning": "Duyệt đơn nghỉ phép", "example": "谢谢主管批假 (Xỉa xỉa chủng quản phi giá - Cảm ơn sếp duyệt đơn)"},
            {"zh": "临时", "pinyin": "línshí", "viBoi": "Lín sử", "hanViet": "Lâm thời", "viMeaning": "Đột xuất / Tạm thời", "example": "临时有事 (Lín sử dẩu sư - Đột xuất có việc)"},
            {"zh": "扣就扣吧", "pinyin": "kòu jiù kòu ba", "viBoi": "Khâu chiêu khâu ba", "hanViet": "Khấu tựu khấu ba", "viMeaning": "Trừ tiền thì trừ vậy", "example": "扣就扣吧 (Khâu chiêu khâu ba - Thôi trừ lương thì đành chịu)"}
        ],
        "story": {
            "title": "Nghệ Thuật Xin Nghỉ Đi Đám Cưới Bạn Thân",
            "content": "Tuần sau thằng bạn nối khố cưới vợ dưới quê, tao cần nghỉ thứ 7. Chiều thứ 4 tao đã gạ được thằng Tuấn trực thế ca. Tao cầm tờ đơn lên phòng sếp, cúi người nhỏ nhẹ: Báo cáo sếp, thứ 7 này GIA LỈ DẨU CHÍ SƯ (家里有急事 - nhà em có việc hệ trọng đột xuất)! ỦA XƯỞNG HOÁN BAN (我想换班 - em xin đổi sang ca chủ nhật)! Em đã nhờ Tuấn trực thay, cam kết CHUẾ PU ĐAN U SƯ (绝不耽误事 - tuyệt đối không trễ nải chuyền hàng)! Sang HẠ CHÂU ỦA PỦ SANG (下周我补上 - tuần sau em cày tăng ca bù trả nợ công ty)! Sếp ngẩng lên nhìn thấy kế hoạch chu đáo không có kẽ hở, mỉm cười quẹt bút CHEN CHƯ (签字 - ký roẹt) duyệt ngay!"
        },
        "mission": {
            "taskZh": "尝试用中文向中国主管或人事说明换班理由，必须带上一句'绝不耽误事'！",
            "taskVi": "Nếu có việc cần xin đổi ca hoặc về sớm, hãy dùng câu '绝不耽误事 (Chuế pu đan u sư)' để thuyết phục cấp trên!"
        }
    },
    {
        "day": 12,
        "phase": 2,
        "titleZh": "数字与数量",
        "titleVi": "Con số & Số lượng xưởng",
        "targetZh": "秒杀工厂常用计数与量词，清点库存对账分毫不差，数字脱口而出！",
        "targetVi": "Làm chủ các con số và lượng từ xưởng sản xuất, đếm hàng kiểm kê chính xác từng con ốc, đối thoại số liệu mượt mà!",
        "sentences": [
            {
                "id": "d12_s1",
                "zh": "多少个",
                "pinyin": "duōshao ge",
                "viBoi": "Tua sao cưa",
                "hanViet": "Đa thiểu cá (bao nhiêu cái?)",
                "viMeaning": "Bao nhiêu cái? / Mấy cái vậy?",
                "spicyHook": "TUA SAO CƯA: ĐU SAO CHÉN! Đua xe rủ gái đi ăn chè, ăn xong hỏi bà chủ: Bao nhiêu cái chè, hết TUA SAO CƯA?",
                "bossTactic": "Hỏi số lượng trước khi đóng thùng: 'I pan tua sao cưa?' (Một khay bao nhiêu cái?).",
                "audioText": "多少个",
                "tags": ["Số lượng", "Hỏi đếm"]
            },
            {
                "id": "d12_s2",
                "zh": "一百个",
                "pinyin": "yì bǎi ge",
                "viBoi": "Ý pải cưa",
                "hanViet": "Nhất bách cá (một trăm cái)",
                "viMeaning": "Một trăm cái / Đủ 100 chiếc",
                "spicyHook": "Âm Hán Việt: NHẤT BÁCH CÁ! Ý PẢI CƯA: Một bọc 100 cái bánh bao, ăn no vỡ bụng!",
                "bossTactic": "Số chẵn thường dùng: 10 = Sử, 50 = Ủ sử, 100 = Ý pải, 1000 = Ý chen.",
                "audioText": "一百个",
                "tags": ["Đếm hàng", "Tròn số"]
            },
            {
                "id": "d12_s3",
                "zh": "差五个",
                "pinyin": "chà wǔ ge",
                "viBoi": "Cha ủ cưa",
                "hanViet": "Sai ngũ cá (thiếu năm cái)",
                "viMeaning": "Còn thiếu 5 cái nữa mới đủ",
                "spicyHook": "CHA Ủ CƯA: Thiếu cha nó mất 5 đứa con rồi! Đếm khay thiếu mất 5 cái, hô to CHA Ủ CƯA để bên dập cấp bù!",
                "bossTactic": "Cấu trúc vàng: 'Chà + [Số] + cưa' = Thiếu X cái. Ví dụ: Chà lẻng cưa (thiếu 2 cái), Chà sử cưa (thiếu 10 cái).",
                "audioText": "差五个",
                "tags": ["Thiếu hụt", "Báo số"]
            },
            {
                "id": "d12_s4",
                "zh": "这一箱",
                "pinyin": "zhè yì xiāng",
                "viBoi": "Chưa ý xiang",
                "hanViet": "Giá nhất tương (nguyên thùng này)",
                "viMeaning": "Cái thùng này / Nguyên cả thùng này",
                "spicyHook": "CHƯA Ý XIANG: Chưa kịp xi nhan thì cả XIANG (thùng hàng) đổ nhào! Chỉ tay vào nguyên một thùng carton to đùng!",
                "bossTactic": "Chỉ tay vào pallet hoặc kiện hàng: 'Chưa ý xiang, ý pải cưa' (Thùng này có 100 cái).",
                "audioText": "这一箱",
                "tags": ["Quy cách", "Thùng kiện"]
            },
            {
                "id": "d12_s5",
                "zh": "数量不够",
                "pinyin": "shùliàng bú gòu",
                "viBoi": "Su liêng pú câu",
                "hanViet": "Số lượng bất cấu (số lượng không đủ)",
                "viMeaning": "Số lượng chưa đủ / Hụt số lượng rồi",
                "spicyHook": "Âm Hán Việt: SỐ LƯỢNG BẤT CẤU! SU LIÊNG PÚ CÂU: Số lượng hàng hóa không đủ 'cấu véo', thiếu hụt tùm lum!",
                "bossTactic": "Khi nhận hàng từ tổ trước giao sang, đếm thấy thiếu là phải nói câu này ngay trước mặt giao nhận để lập biên bản.",
                "audioText": "数量不够",
                "tags": ["Kiểm kê", "Hụt hàng"]
            }
        ],
        "words": [
            {"zh": "一千", "pinyin": "yìqiān", "viBoi": "Ý chen", "hanViet": "Nhất thiên", "viMeaning": "Một nghìn (1000)", "example": "一千个 (Ý chen cưa - Một nghìn chiếc)"},
            {"zh": "一万", "pinyin": "yíwàn", "viBoi": "Ý oan", "hanViet": "Nhất vạn", "viMeaning": "Mười nghìn (10.000)", "example": "一共一万个 (Ý cung ý oan cưa - Tổng cộng 10 ngàn cái)"},
            {"zh": "几公斤", "pinyin": "jǐ gōngjīn", "viBoi": "Chỉ cung chin", "hanViet": "Kỷ công cân", "viMeaning": "Mấy cân / Mấy kilôgam", "example": "重几公斤？ (Chủng chỉ cung chin? - Nặng mấy cân?)"},
            {"zh": "几米", "pinyin": "jǐ mǐ", "viBoi": "Chỉ mỉ", "hanViet": "Kỷ mễ", "viMeaning": "Mấy mét", "example": "长几米？ (Tráng chỉ mỉ? - Dài mấy mét?)"},
            {"zh": "一卷", "pinyin": "yì juǎn", "viBoi": "Ý chuẩn", "hanViet": "Nhất quyển", "viMeaning": "Một cuộn (băng dính/dây cáp)", "example": "拿一卷胶带 (Nả ý chuẩn cheo tai - Lấy 1 cuộn băng dính)"},
            {"zh": "双", "pinyin": "shuāng", "viBoi": "Soang", "hanViet": "Song", "viMeaning": "Đôi / Cặp (giày/găng tay)", "example": "一双手套 (Ý soang sẩu thao - Một đôi găng tay)"},
            {"zh": "件", "pinyin": "jiàn", "viBoi": "Chen", "hanViet": "Kiện", "viMeaning": "Chiếc / Cái / Chi tiết", "example": "五件零件 (Ủ chen lính chiển - 5 cái linh kiện)"},
            {"zh": "包", "pinyin": "bāo", "viBoi": "Pao", "hanViet": "Bao", "viMeaning": "Gói / Bao", "example": "一大包 (Ý ta pao - Một bao lớn)"},
            {"zh": "盘", "pinyin": "pán", "viBoi": "Phán", "hanViet": "Bàn", "viMeaning": "Khay / Đĩa hàng", "example": "端一盘过来 (Đoan ý phán cua lai - Bưng 1 khay qua đây)"},
            {"zh": "盘点", "pinyin": "pándiǎn", "viBoi": "Phán tiển", "hanViet": "Bàn điểm", "viMeaning": "Kiểm kê kho bãi", "example": "月底盘点 (Duế tỉ phán tiển - Cuối tháng kiểm kê)"}
        ],
        "story": {
            "title": "Vụ Án 5 Con Ốc Lạc Loài",
            "content": "Bên kho xe nâng chở tới một kiện hàng đóng đai sắt. Quản đốc cầm phiếu hỏi tao: TUA SAO CƯA (多少个 - bao nhiêu cái)? Tao mở sổ đọc: Theo quy cách là Ý PẢI CƯA (一百个 - một trăm cái) trong CHƯA Ý XIANG (这一箱 - thùng này)! Nhưng khi tao bóc niêm phong đếm từng khay thì phát hiện: SU LIÊNG PÚ CÂU (数量不够 - số lượng không đủ rồi sếp ơi)! Hiện tại CHA Ủ CƯA (差五个 - đang thiếu đúng 5 cái)! Quản đốc ký biên bản phạt bên cung ứng, vỗ vai tao: Mắt mày như cú vọ, kiểm hàng chuẩn đét không thoát 1 con ruồi!"
        },
        "mission": {
            "taskZh": "盘点自己手头工序的半成品，用中文向组长汇报数量，例如'还差十个'！",
            "taskVi": "Đếm thử số hàng trên bàn của bạn, báo cho tổ trưởng bằng câu tiếng Trung: '还差...个 (Hái cha ... cưa)'!"
        }
    },
    {
        "day": 13,
        "phase": 2,
        "titleZh": "日期与交期",
        "titleVi": "Ngày tháng & Chạy deadline",
        "targetZh": "搞清交货期限、加班安排与发薪吉日，把握时间节奏，掌握打工命脉！",
        "targetVi": "Hiểu rõ hạn chót xuất hàng, lịch tăng ca cuối tuần và ngày phát lương thần thánh. Nắm chắc mạch đập sinh tử của xưởng!",
        "sentences": [
            {
                "id": "d13_s1",
                "zh": "今天必须要",
                "pinyin": "jīntiān bìxū yào",
                "viBoi": "Chin thiển pi suy dao",
                "hanViet": "Kim thiên tất tu yếu (hôm nay bắt buộc phải có)",
                "viMeaning": "Hôm nay bắt buộc phải xong / Đơn gấp trong ngày!",
                "spicyHook": "Âm Hán Việt: KIM THIÊN TẤT TU YẾU! CHIN THIỂN PI SUY DAO: Hôm nay mà không giao hàng là 'bị xui xẻo' ăn đòn hội đồng!",
                "bossTactic": "Sếp gõ bàn nói câu này tức là đơn khẩn cấp container đang chờ ngoài cổng, phải dồn 100% công lực làm trước.",
                "audioText": "今天必须要",
                "tags": ["Đơn gấp", "Hạn chót"]
            },
            {
                "id": "d13_s2",
                "zh": "明天早上交",
                "pinyin": "míngtiān zǎoshang jiāo",
                "viBoi": "Mính thiển chảo sang cheo",
                "hanViet": "Minh thiên tảo thượng giao (sáng mai giao hàng)",
                "viMeaning": "Sáng mai phải giao hàng rồi",
                "spicyHook": "MÍNH THIỂN (mai) CHẢO SANG (sáng sớm) CHEO (giao nộp)! Bình minh vừa hé mắt là phải nộp mạng lô hàng này!",
                "bossTactic": "Báo lại tiến độ cho ca đêm: 'Ca đêm nhớ dứt điểm vì mính thiển chảo sang cheo'.",
                "audioText": "明天早上交",
                "tags": ["Giao hàng", "Hẹn giờ"]
            },
            {
                "id": "d13_s3",
                "zh": "几点交货",
                "pinyin": "jǐ diǎn jiāohuò",
                "viBoi": "Chỉ tiển cheo hua",
                "hanViet": "Kỷ điểm giao hóa (mấy giờ giao hàng?)",
                "viMeaning": "Mấy giờ phải giao hàng ạ?",
                "spicyHook": "CHỈ TIỂN CHEO HUA: Mấy giờ thì 'giao hoa'? Mấy giờ mang hàng hóa ra chất lên xe tải?",
                "bossTactic": "Hỏi câu này chứng tỏ bạn có tư duy quản lý tiến độ thời gian, không thụ động như công nhân thông thường.",
                "audioText": "几点交货",
                "tags": ["Tiến độ", "Chủ động"]
            },
            {
                "id": "d13_s4",
                "zh": "周末加不加班",
                "pinyin": "zhōumò jiā bù jiābān",
                "viBoi": "Châu mua gia pu gia ban",
                "hanViet": "Chu mạt gia bất gia ban (cuối tuần tăng ca không?)",
                "viMeaning": "Cuối tuần này có tăng ca không hả sếp?",
                "spicyHook": "CHÂU MUA GIA PU GIA BAN: Cuối tuần có mua vui cày cuốc thâu đêm kiếm 200% lương không hay về quê ôm vợ ngủ?",
                "bossTactic": "Hỏi vào chiều thứ 5 hoặc sáng thứ 6 để sếp tiện bố trí quân số trực xưởng.",
                "audioText": "周末加不加班",
                "tags": ["Tăng ca", "Cuối tuần"]
            },
            {
                "id": "d13_s5",
                "zh": "什么时候发工资",
                "pinyin": "shénme shíhou fā gōngzī",
                "viBoi": "Sấm mơ sử hâu pha cung gi",
                "hanViet": "Thập ma thời hậu phát công tư (khi nào phát lương?)",
                "viMeaning": "Bao giờ phát lương hả sếp ơi?",
                "spicyHook": "SẤM MƠ SỬ HÂU (khi nào thì mơ thấy sấm chớp tiền tài nổ ra) PHA CUNG GI (phát lương bơm máu vào ví)? Câu hỏi thiêng liêng nhất đời công nhân!",
                "bossTactic": "Hỏi khéo lúc ăn cơm hoặc giải lao với quản lý người Hoa bằng nụ cười tươi: 'Lảo bản, sấm mơ sử hâu pha cung gi a?'",
                "audioText": "什么时候发工资",
                "tags": ["Lương lậu", "Tiền bạc"]
            }
        ],
        "words": [
            {"zh": "星期一", "pinyin": "xīngqīyī", "viBoi": "Xinh chi di", "hanViet": "Tinh kỳ nhất", "viMeaning": "Thứ hai", "example": "星期一开会 (Xinh chi di khai huây - Thứ hai họp)"},
            {"zh": "星期六", "pinyin": "xīngqīliù", "viBoi": "Xinh chi liêu", "hanViet": "Tinh kỳ lục", "viMeaning": "Thứ bảy", "example": "星期六加班 (Xinh chi liêu gia ban - Thứ bảy tăng ca)"},
            {"zh": "月底", "pinyin": "yuèdǐ", "viBoi": "Duế tỉ", "hanViet": "Nguyệt để", "viMeaning": "Cuối tháng", "example": "月底出货 (Duế tỉ chu hua - Cuối tháng xuất hàng)"},
            {"zh": "准时交", "pinyin": "zhǔnshí jiāo", "viBoi": "Chuẩn sử cheo", "hanViet": "Chuẩn thời giao", "viMeaning": "Giao đúng hạn", "example": "一定准时交 (Ý định chuẩn sử cheo - Nhất định giao đúng hẹn)"},
            {"zh": "延期", "pinyin": "yánqī", "viBoi": "Den chi", "hanViet": "Diên kỳ", "viMeaning": "Hoãn lại / Chậm trễ", "example": "不能延期 (Pu nấng den chi - Không thể hoãn lại)"},
            {"zh": "赶工", "pinyin": "gǎngōng", "viBoi": "Cản cung", "hanViet": "Cản công", "viMeaning": "Làm gấp / Chạy tiến độ", "example": "大家赶工 (Ta che cản cung - Mọi người làm gấp)"},
            {"zh": "发薪日", "pinyin": "fāxīnrì", "viBoi": "Pha xin rư", "hanViet": "Phát tân nhật", "viMeaning": "Ngày trả lương", "example": "今天是发薪日 (Chin thiển sư pha xin rư - Hôm nay là ngày nhận lương)"},
            {"zh": "截单", "pinyin": "jiédān", "viBoi": "Chiế đan", "hanViet": "Tiệt đơn", "viMeaning": "Chốt sổ đơn hàng", "example": "马上截单 (Mả sang chiế đan - Sắp chốt đơn rồi)"},
            {"zh": "晚上八点", "pinyin": "wǎnshang bādiǎn", "viBoi": "Oản sang pa tiển", "hanViet": "Vãn thượng bát điểm", "viMeaning": "8 giờ tối", "example": "加班到晚上八点 (Gia ban tao oản sang pa tiển - Tăng ca tới 8h tối)"},
            {"zh": "下午三点", "pinyin": "xiàwǔ sāndiǎn", "viBoi": "Hạ ủ san tiển", "hanViet": "Hạ ngũ tam điểm", "viMeaning": "3 giờ chiều", "example": "下午三点开会 (Hạ ủ san tiển khai huây - 3h chiều họp)"}
        ],
        "story": {
            "title": "Chạy Đua Với Chuyến Xe Công-ten-nơ",
            "content": "Sáng sớm thứ 6, sếp cầm tập hồ sơ đập bàn quát: Đơn hàng này CHIN THIỂN PI SUY DAO (今天必须要 - hôm nay bắt buộc phải có)! Chuyến xe tải MÍNH THIỂN CHẢO SANG CHEO (明天早上交 - sáng mai xuất cảng rồi)! Tao lập tức hỏi: CHỈ TIỂN CHEO HUA (几点交货 - mấy giờ chốt hàng ạ)? Sếp bảo 5h chiều phải xong. Cả tổ cắm đầu cày như điên. Trưa ăn cơm, tao ghé tai sếp hỏi nhỏ: CHÂU MUA GIA PU GIA BAN (周末加不加班 - cuối tuần có cày tiếp không sếp)? Sếp cười tươi: 'Có chứ, cày xong tuần sau là SẤM MƠ SỬ HÂU PHA CUNG GI (什么时候发工资 - phát lương mười lăm củ tha hồ dắt bồ đi quẩy)!'."
        },
        "mission": {
            "taskZh": "本周五下班前，问班长一句'周末加不加班'，主动争取加班机会！",
            "taskVi": "Chiều thứ 6 trước khi tan ca, hãy hỏi trưởng ca: '周末加不加班 (Châu mua gia pu gia ban)?' để chủ động giành suất tăng ca!"
        }
    },
    {
        "day": 14,
        "phase": 2,
        "titleZh": "第二周大复盘+管理层汇报考核",
        "titleVi": "Ôn tập Tuần 2 & Sát hạch báo cáo",
        "targetZh": "全套组合拳汇报工作，数字、质量、态度全方位展现，让主管认准你就是组长接班人！",
        "targetVi": "Tung trọn bộ combo báo cáo trước mặt sếp lớn: Số liệu chuẩn, chất lượng thép, thái độ vàng. Khẳng định tư chất tổ trưởng tương lai!",
        "sentences": [
            {
                "id": "d14_s1",
                "zh": "主管，今天这一单做完了",
                "pinyin": "zhǔguǎn, jīntiān zhè yì dān zuò wán le",
                "viBoi": "Chủng quản, chin thiển chưa ý đan chua oán lơ",
                "hanViet": "Chủ quản, kim thiên giá nhất đơn tác hoàn liễu",
                "viMeaning": "Chủ quản ơi, đơn hôm nay em làm xong hết rồi!",
                "spicyHook": "CHỦNG QUẢN ơi, CHIN THIỂN CHƯA Ý ĐAN CHUA OÁN LƠ! Một câu tuyên bố đanh thép dập tan mọi nỗi lo của sếp!",
                "bossTactic": "Xưng hô 'Chủng quản' (主管) rất được lòng các quản lý cấp trung người Đài Loan/Trung Quốc.",
                "audioText": "主管，今天这一单做完了",
                "tags": ["Báo công", "Chủ quản"]
            },
            {
                "id": "d14_s2",
                "zh": "差五十个，半小时搞定",
                "pinyin": "chà wǔshí ge, bàn xiǎoshí gǎodìng",
                "viBoi": "Cha ủ sử cưa, ban siểu sử cảo định",
                "hanViet": "Sai ngũ thập cá, bán tiểu thời hảo định",
                "viMeaning": "Còn thiếu 50 cái, nửa tiếng nữa là xong xuôi!",
                "spicyHook": "CHA Ủ SỬ CƯA (thiếu 50 con phôi), BAN SIỂU SỬ CẢO ĐỊNH (nửa tiếng giải quyết êm đẹp)! Thần thái tự tin như cao thủ võ lâm!",
                "bossTactic": "Nêu rõ số lượng còn lại và thời gian hoàn tất, sếp nghe xong chỉ biết gật đầu an tâm.",
                "audioText": "差五十个，半小时搞定",
                "tags": ["Nắm chắc", "Chính xác"]
            },
            {
                "id": "d14_s3",
                "zh": "这个零件有问题，请教我",
                "pinyin": "zhè ge língjiàn yǒu wèntí, qǐng jiāo wǒ",
                "viBoi": "Chưa cưa lính chiển dẩu uấn thí, chỉnh cheo ủa",
                "hanViet": "Giá cá linh kiện hữu vấn đề, thỉnh giáo ngã",
                "viMeaning": "Linh kiện này có trục trặc, xin chỉ giáo cho em",
                "spicyHook": "LÍNH CHIỂN (linh kiện) DẨU UẤN THÍ! Phát hiện lỗi sớm và khiêm tốn CHỈNH CHEO ỦA (xin chỉ giáo), xứng danh học trò cưng!",
                "bossTactic": "Chỉ thẳng vào vết nứt/lỗi bavia trên phôi, sếp thấy bạn vừa tinh mắt vừa ham học hỏi.",
                "audioText": "这个零件有问题，请教我",
                "tags": ["Kỹ thuật", "Ham học"]
            },
            {
                "id": "d14_s4",
                "zh": "周末我想加班，我很能干",
                "pinyin": "zhōumò wǒ xiǎng jiābān, wǒ hěn nénggàn",
                "viBoi": "Châu mua ủa xưởng gia ban, ủa hẩn nấng can",
                "hanViet": "Chu mạt ngã tưởng gia ban, ngã hấn năng cán",
                "viMeaning": "Cuối tuần em muốn tăng ca, em cày khỏe lắm sếp!",
                "spicyHook": "CHÂU MUA ỦA XƯỞNG GIA BAN, ỦA HẨN NẤNG CAN! Em 'năng cán' (làm việc trâu bò năng suất cao), sếp cứ yên tâm trao ấn kiếm cho em!",
                "bossTactic": "'Néng gàn' (能干) là từ vàng mà sếp người Hoa thích nhất ở công nhân: tháo vát, chịu khó, làm được việc.",
                "audioText": "周末我想加班，我很能干",
                "tags": ["Cày cuốc", "Ghi điểm"]
            },
            {
                "id": "d14_s5",
                "zh": "放心老板，质量没问题",
                "pinyin": "fàngxīn lǎobǎn, zhìliàng méi wèntí",
                "viBoi": "Phang xin lảo bản, chứ liêng mấy uấn thí",
                "hanViet": "Phóng tâm lão bản, chất lượng một vấn đề",
                "viMeaning": "Sếp yên tâm, chất lượng bảo đảm không có vấn đề gì!",
                "spicyHook": "PHANG XIN LẢO BẢN: Hãy 'phóng tâm' (yên tâm) đi sếp ơi, CHẤT LƯỢNG (chứ liêng) MẤY UẤN THÍ (chuẩn không tì vết)! Đóng thùng xuất xưởng!",
                "bossTactic": "Vỗ ngực cam kết chất lượng trước khi lô hàng lên xe. Uy tín của bạn tăng vọt 200%.",
                "audioText": "放心老板，质量没问题",
                "tags": ["Cam kết", "Uy tín vàng"]
            }
        ],
        "words": [
            {"zh": "仓库备货", "pinyin": "cāngkù bèihuò", "viBoi": "Thang khu phây hua", "hanViet": "Thương khố bị hóa", "viMeaning": "Kho chuẩn bị hàng", "example": "仓库备货好了 (Thang khu phây hua hảo lơ - Kho đã soạn hàng xong)"},
            {"zh": "样品", "pinyin": "yàngpǐn", "viBoi": "Dang phỉn", "hanViet": "Dạng phẩm", "viMeaning": "Hàng mẫu / Sản phẩm mẫu", "example": "按样品做 (An dang phỉn chua - Làm theo mẫu)"},
            {"zh": "达标", "pinyin": "dábiāo", "viBoi": "Tả peo", "hanViet": "Đạt tiêu", "viMeaning": "Đạt chỉ tiêu", "example": "今天达标了 (Chin thiển tả peo lơ - Hôm nay đạt chỉ tiêu rồi)"},
            {"zh": "损耗率", "pinyin": "sǔnhàolǜ", "viBoi": "Sủn hao ly", "hanViet": "Tổn hao suất", "viMeaning": "Tỷ lệ hao hụt phế phẩm", "example": "损耗率很低 (Sủn hao ly hẩn ti - Tỷ lệ hao hụt rất thấp)"},
            {"zh": "优秀", "pinyin": "yōuxiù", "viBoi": "Dưu siêu", "hanViet": "Ưu tú", "viMeaning": "Xuất sắc / Rất giỏi", "example": "表现优秀 (Piểu siển dưu siêu - Thể hiện rất xuất sắc)"},
            {"zh": "放心", "pinyin": "fàngxīn", "viBoi": "Phang xin", "hanViet": "Phóng tâm", "viMeaning": "Yên tâm", "example": "请老板放心 (Chỉnh lảo bản phang xin - Xin sếp cứ yên tâm)"},
            {"zh": "靠谱", "pinyin": "kàopǔ", "viBoi": "Khao phủ", "hanViet": "Kháo phổ", "viMeaning": "Đáng tin cậy / Đâu ra đấy", "example": "这个人很靠谱 (Chưa cưa rấn hẩn khao phủ - Người này rất đáng tin)"},
            {"zh": "交代的事", "pinyin": "jiāodài de shì", "viBoi": "Cheo tai tơ sư", "hanViet": "Giao đãi đích sự", "viMeaning": "Việc sếp dặn dò giao phó", "example": "交代的事都做了 (Cheo tai tơ sư đâu chua lơ - Việc sếp giao em làm hết rồi)"},
            {"zh": "办妥了", "pinyin": "bàntuǒ le", "viBoi": "Pan thoả lơ", "hanViet": "Biện thỏa liễu", "viMeaning": "Đã lo liệu êm đẹp xong xuôi", "example": "都办妥了 (Đâu pan thoả lơ - Đã lo êm đẹp cả rồi)"},
            {"zh": "提拔", "pinyin": "tíbá", "viBoi": "Thí pá", "hanViet": "Đề bạt", "viMeaning": "Cất nhắc / Thăng chức", "example": "感谢提拔 (Cảm siể thí pá - Cảm ơn đã cất nhắc em)"}
        ],
        "story": {
            "title": "Cú Ghi Điểm Tuyệt Đối Trước Mặt Chủ Quản",
            "content": "4 giờ chiều, chủ quản xưởng đi kiểm tra khâu tao. Tao lau sạch tay, đứng nghiêm chào: Báo cáo sếp, CHỦNG QUẢN, CHIN THIỂN CHƯA Ý ĐAN CHUA OÁN LƠ (主管，今天这一单做完了)! Lô bổ sung chỉ còn CHA Ủ SỬ CƯA, BAN SIỂU SỬ CẢO ĐỊNH (差五十个，半小时搞定)! Ban nãy CHƯA CƯA LÍNH CHIỂN DẨU UẤN THÍ (这个零件有问题), em đã CHỈNH CHEO (请教) sư phụ chỉnh khuôn kịp thời! Cuối tuần này CHÂU MUA ỦA XƯỞNG GIA BAN, ỦA HẨN NẤNG CAN (周末我想加班，我很能干)! Sếp cứ PHANG XIN LẢO BẢN, CHỨ LIÊNG MẤY UẤN THÍ (放心老板，质量没问题)! Chủ quản đứng hình 3 giây rồi cười lớn: 'Tốt lắm, xưởng cần những người như mày! Tuần sau chuẩn bị đi học lớp bồi dưỡng tổ trưởng!'."
        },
        "mission": {
            "taskZh": "第二周结业考核：完整背诵Day 14的5句汇报辞，找机会对中国主管实战演练！",
            "taskVi": "Tốt nghiệp Tuần 2: Nằm lòng 5 câu khẩu quyết Ngày 14, tự tin tuôn một mạch trước mặt sếp Hoa để khẳng định năng lực!"
        }
    }
]

if __name__ == "__main__":
    print(f"Phase 2 generated: {len(PHASE_2_DAYS)} days.")
