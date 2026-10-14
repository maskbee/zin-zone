# -*- coding: utf-8 -*-
"""
Phase 1: 生存模式 (Day 1 - 7)
Mục tiêu: Nghe hiểu lệnh, thoát nạn phạt tiền, không bị ăn mắng, sống sót an toàn trong nhà máy.
"""

PHASE_1_DAYS = [
    {
        "day": 1,
        "phase": 1,
        "titleZh": "考勤与时间",
        "titleVi": "Chấm công & Thời gian",
        "targetZh": "掌握打卡、加班、迟到、请假与下班核心表达，第一天上班绝不被扣全勤奖！",
        "targetVi": "Nắm vững khẩu quyết quẹt thẻ, tăng ca, đi trễ, xin nghỉ và tan ca. Ngày đầu đi làm giữ chặt 100% tiền chuyên cần!",
        "sentences": [
            {
                "id": "d1_s1",
                "zh": "打卡",
                "pinyin": "dǎ kǎ",
                "viBoi": "Đá cà",
                "hanViet": "Đả tạp (quẹt thẻ)",
                "viMeaning": "Quẹt thẻ / Chấm công",
                "spicyHook": "Cứ 7h sáng ngái ngủ tới cổng xưởng là muốn bị 'ĐÁ VÀO CÀ' thốn tận rốn! Thốn buốt người nhưng phải tỉnh ngủ phi ngay tới máy dập thẻ!",
                "bossTactic": "Mỗi sáng đi qua cổng thấy sếp/tổ trưởng, vừa dập thẻ vừa nói to 'Đá cà!' để ghi điểm đi làm chuẩn giờ.",
                "audioText": "打卡",
                "tags": ["Chấm công", "Cửa ngõ"]
            },
            {
                "id": "d1_s2",
                "zh": "加班",
                "pinyin": "jiā bān",
                "viBoi": "Gia ban",
                "hanViet": "Gia ban (tăng ca)",
                "viMeaning": "Tăng ca / Làm thêm giờ",
                "spicyHook": "GIA (nhà) + BAN (bàn làm việc). Mang nguyên giường chiếu người yêu lên bàn máy móc cày cuốc thâu đêm, làm đến khô cả thận kiếm tiền cưới vợ!",
                "bossTactic": "Sếp hỏi 'Hôm nay ai làm tiếp?', hét ngay 'Gia ban!'. Sếp người Hoa cực thích công nhân chịu cày.",
                "audioText": "加班",
                "tags": ["Tăng ca", "Kiếm tiền"]
            },
            {
                "id": "d1_s3",
                "zh": "迟到了",
                "pinyin": "chí dào le",
                "viBoi": "Chứ tao lơ",
                "hanViet": "Trì đáo liễu (đến muộn rồi)",
                "viMeaning": "Đi muộn rồi / Trễ rồi",
                "spicyHook": "Tối qua mây mưa quá đà, sáng chuông réo CHỨ TAO LƠ đi ngủ tiếp, mở mắt ra trễ mẹ 15 phút, mông đít cuống cuồng chạy thục mạng!",
                "bossTactic": "Lỡ đến muộn, cúi đầu gãi tai nói 'Chứ tao lơ, đối bất khởi' (迟到了，对不起) thì sếp chỉ lườm chứ không nỡ trừ nặng.",
                "audioText": "迟到了",
                "tags": ["Chữa cháy", "Khẩn cấp"]
            },
            {
                "id": "d1_s4",
                "zh": "我想请假",
                "pinyin": "wǒ xiǎng qǐng jià",
                "viBoi": "Ủa xưởng chỉnh giá",
                "hanViet": "Ngã tưởng thỉnh giả (tôi muốn xin nghỉ phép)",
                "viMeaning": "Tôi muốn xin nghỉ phép",
                "spicyHook": "Đang đứng giữa XƯỞNG thò tay vô quần CHỈNH lại cái GIÁ (hàng họ) vì tối qua quẩy xung quá bị trẹo khớp, đau quá phải xin nghỉ về bôi dầu!",
                "bossTactic": "Nói trước 1 ngày lúc sếp vừa hút thuốc xong tâm trạng vui vẻ. Đừng bao giờ nhắn tin sáng sớm ngày nghỉ kẻo bị ăn chửi té tát.",
                "audioText": "我想请假",
                "tags": ["Xin nghỉ", "Thủ tục"]
            },
            {
                "id": "d1_s5",
                "zh": "下班了",
                "pinyin": "xià bān le",
                "viBoi": "Hạ ban lơ",
                "hanViet": "Hạ ban liễu (tan ca rồi)",
                "viMeaning": "Tan ca rồi / Hết giờ làm rồi",
                "spicyHook": "HẠ cái quần bảo hộ xuống, cởi BANh cái áo đẫm mồ hôi ra, bồ đang nằm LƠ mơ chờ ở phòng trọ, phóng xe máy về quất!",
                "bossTactic": "Chuông reo mới được nói câu này, nói to vui vẻ với đồng nghiệp tạo không khí phấn khởi.",
                "audioText": "下班了",
                "tags": ["Tan ca", "Giải thoát"]
            }
        ],
        "words": [
            {"zh": "早退", "pinyin": "zǎotuì", "viBoi": "Chảo thuy", "hanViet": "Tảo thối", "viMeaning": "Về sớm", "example": "不要早退 (Pu dao chảo thuy - Đừng về sớm)"},
            {"zh": "旷工", "pinyin": "kuànggōng", "viBoi": "Khoang cung", "hanViet": "Khoáng công", "viMeaning": "Nghỉ không phép / Bỏ làm", "example": "不要旷工 (Pu dao khoang cung - Không được bỏ làm)"},
            {"zh": "补卡", "pinyin": "bǔkǎ", "viBoi": "Pủ cà", "hanViet": "Bổ tạp", "viMeaning": "Quẹt bù thẻ", "example": "帮我补卡 (Bang ủa pủ cà - Quẹt bù giúp em)"},
            {"zh": "夜班", "pinyin": "yèbān", "viBoi": "Dê ban", "hanViet": "Dạ ban", "viMeaning": "Ca đêm", "example": "今天上夜班 (Chin thiển sang dê ban - Hôm nay làm ca đêm)"},
            {"zh": "白班", "pinyin": "báibān", "viBoi": "Pái ban", "hanViet": "Bạch ban", "viMeaning": "Ca ngày", "example": "明天上白班 (Mính thiển sang pái ban - Mai làm ca ngày)"},
            {"zh": "调休", "pinyin": "tiáoxiū", "viBoi": "Théo siêu", "hanViet": "Điều hưu", "viMeaning": "Nghỉ bù", "example": "我想调休 (Ủa xưởng théo siêu - Em muốn nghỉ bù)"},
            {"zh": "准时", "pinyin": "zhǔnshí", "viBoi": "Chuẩn sử", "hanViet": "Chuẩn thời", "viMeaning": "Đúng giờ", "example": "很准时 (Hẩn chuẩn sử - Rất đúng giờ)"},
            {"zh": "几点", "pinyin": "jǐdiǎn", "viBoi": "Chỉ tiển", "hanViet": "Kỷ điểm", "viMeaning": "Mấy giờ", "example": "几点下班？ (Chỉ tiển hạ ban? - Mấy giờ tan ca?)"},
            {"zh": "打卡机", "pinyin": "dǎkǎjī", "viBoi": "Đá cà chi", "hanViet": "Đả tạp cơ", "viMeaning": "Máy chấm công", "example": "打卡机坏了 (Đá cà chi hoài lơ - Máy chấm công hỏng rồi)"},
            {"zh": "请假条", "pinyin": "qǐngjiàtiáo", "viBoi": "Chỉnh giá théu", "hanViet": "Thỉnh giả điều", "viMeaning": "Đơn xin nghỉ phép", "example": "这是请假条 (Chưa sư chỉnh giá théu - Đây là đơn xin nghỉ)"}
        ],
        "story": {
            "title": "Cú 'Đá Vào Cà' Lúc 7h Sáng",
            "content": "Sáng sớm hôm nay, do tối qua quẩy sung quá nên CHỨ TAO LƠ (迟到了 - đến muộn)! Phi xe thục mạng tới cổng, thấy sếp đứng sừng sững như muốn ĐÁ VÀO CÀ (打卡 - quẹt thẻ)! Vừa dập thẻ xong, nghe loa thông báo hôm nay phải GIA BAN (加班 - tăng ca). Tao sợ quá định thò tay CHỈNH GIÁ (我想请假 - xin nghỉ) nhưng nghĩ tới tiền bỉm sữa nên ráng cày. Đến chiều chuông reo HẠ BAN LƠ (下班了 - tan ca), cởi áo phóng thẳng về ôm bồ ngủ bù!"
        },
        "mission": {
            "taskZh": "打卡时大声对同事说'打卡'，下班时对主管微笑着说'下班了'！",
            "taskVi": "Sáng nay lúc dập thẻ hãy nói to '打卡 (Đá cà)' trước mặt đồng nghiệp; chiều chuông reo tan ca hãy nhìn sếp cười tươi nói '下班了 (Hạ ban lơ)'!"
        }
    },
    {
        "day": 2,
        "phase": 1,
        "titleZh": "听懂指令·动作篇",
        "titleVi": "Lệnh hành động trên chuyền",
        "targetZh": "秒懂中国主管嘴里的动作指令，手脚麻利不挨骂，动作快如闪电！",
        "targetVi": "Nghe phát hiểu ngay lệnh sếp Hoa hét trên chuyền, tay chân thoăn thoắt không bao giờ bị ăn chửi lề mề!",
        "sentences": [
            {
                "id": "d2_s1",
                "zh": "快一点",
                "pinyin": "kuài yì diǎn",
                "viBoi": "Khoái ý tiển",
                "hanViet": "Khoái nhất điểm (nhanh một chút)",
                "viMeaning": "Nhanh lên một chút / Mau lên",
                "spicyHook": "Làm chuyện ấy càng nhanh càng 'KHOÁI'! Sếp giục nhấp nhanh tay lên, 'khoái ý tiển' là hàng ra ào ào!",
                "bossTactic": "Khi sếp quát 'Khoái ý tiển!', lập tức gật đầu lia lịa 'Hảo hảo khoái khoái' (好好快快) và tăng tốc độ tay chân.",
                "audioText": "快一点",
                "tags": ["Tốc độ", "Lệnh gắt"]
            },
            {
                "id": "d2_s2",
                "zh": "停一下",
                "pinyin": "tíng yí xià",
                "viBoi": "Thính ý xa",
                "hanViet": "Đình nhất hạ (dừng một chút)",
                "viMeaning": "Dừng lại một chút / Tạm ngừng",
                "spicyHook": "Đang thả THÍNH gái chuyền bên cạnh say đắm thì bị phát hiện, giật mình THÍNH rơi vãi ra sàn xa lắc, phải dừng tay lại kẻo sếp bắt quả tang!",
                "bossTactic": "Nghe thấy 'Thính ý xa' là phải buông tay khỏi công tắc ngay lập tức, nhìn sếp xem có sự cố gì.",
                "audioText": "停一下",
                "tags": ["Khẩn cấp", "Dừng chuyền"]
            },
            {
                "id": "d2_s3",
                "zh": "搬过去",
                "pinyin": "bān guò qù",
                "viBoi": "Ban cua khuy",
                "hanViet": "Bàn quá khứ (khiêng qua đó)",
                "viMeaning": "Bê/khiêng sang bên kia",
                "spicyHook": "Bê BAN một con CUA to tướng bò lung tung cắp vào KHUY quần! Nhấc mông bê phắt nó ném sang bên kia kẻo bị cắp đứt của quý!",
                "bossTactic": "Chỉ tay theo hướng sếp trỏ, hô 'Hảo! Ban cua khuy!' rồi bê thùng hàng đi ngay.",
                "audioText": "搬过去",
                "tags": ["Khuân vác", "Vận chuyển"]
            },
            {
                "id": "d2_s4",
                "zh": "再来一次",
                "pinyin": "zài lái yí cì",
                "viBoi": "Chai lai ý chứ",
                "hanViet": "Tái lai nhất thứ (làm lại lần nữa)",
                "viMeaning": "Làm lại một lần nữa / Làm thêm hiệp nữa",
                "spicyHook": "Như tiếng người yêu nài nỉ trên giường: 'Anh ơi uống chai nước CHAI LẠI làm Ý CHỨ nữa nha!' Sung sức làm lại hiệp hai cho chuẩn!",
                "bossTactic": "Khi hàng chưa chuẩn sếp bảo 'Chai lai ý chứ', đừng cãi, bình tĩnh làm lại mẫu cho sếp xem.",
                "audioText": "再来一次",
                "tags": ["Làm lại", "Thao tác"]
            },
            {
                "id": "d2_s5",
                "zh": "听我说",
                "pinyin": "tīng wǒ shuō",
                "viBoi": "Thính ủa sua",
                "hanViet": "Thính ngã thuyết (nghe tôi nói)",
                "viMeaning": "Nghe tôi nói đây / Chú ý lắng nghe",
                "spicyHook": "Tai dỏng lên THÍNH như chó săn, nghe ỦA SUA xì xào bí kíp làm nhanh được thưởng nóng, không nghe là mất ăn!",
                "bossTactic": "Sếp đập bàn hét 'Thính ủa sua', mọi người phải ngừng nói chuyện riêng, nhìn thẳng vào mắt sếp.",
                "audioText": "听我说",
                "tags": ["Tập trung", "Lệnh sếp"]
            }
        ],
        "words": [
            {"zh": "慢一点", "pinyin": "màn yìdiǎn", "viBoi": "Man ý tiển", "hanViet": "Mạn nhất điểm", "viMeaning": "Chậm lại một chút", "example": "慢一点做 (Man ý tiển chua - Làm chậm lại chút)"},
            {"zh": "拿来", "pinyin": "nálái", "viBoi": "Nả lai", "hanViet": "Nã lai", "viMeaning": "Cầm lại đây", "example": "拿来给我 (Nả lai cẩy ủa - Cầm lại đây cho tôi)"},
            {"zh": "放下", "pinyin": "fàngxia", "viBoi": "Phang xa", "hanViet": "Phóng hạ", "viMeaning": "Đặt xuống", "example": "先放下 (Xen phang xa - Đặt xuống trước đã)"},
            {"zh": "拿走", "pinyin": "názǒu", "viBoi": "Nả tẩu", "hanViet": "Nã tẩu", "viMeaning": "Mang đi chỗ khác", "example": "拿走这个 (Nả tẩu chưa cưa - Mang cái này đi)"},
            {"zh": "打开", "pinyin": "dǎkāi", "viBoi": "Đá khai", "hanViet": "Đả khai", "viMeaning": "Mở ra / Bật lên", "example": "打开机器 (Đá khai chi chi - Bật máy lên)"},
            {"zh": "关掉", "pinyin": "guāndiào", "viBoi": "Quan teo", "hanViet": "Quan điệu", "viMeaning": "Tắt đi / Đóng lại", "example": "关掉电源 (Quan teo tiển duển - Tắt nguồn điện)"},
            {"zh": "擦干净", "pinyin": "cā gānjìng", "viBoi": "Cha can chinh", "hanViet": "Sát kiền tịnh", "viMeaning": "Lau chùi sạch sẽ", "example": "擦干净桌子 (Cha can chinh chua gi - Lau sạch bàn)"},
            {"zh": "抓紧", "pinyin": "zhuājǐn", "viBoi": "Choa chỉnh", "hanViet": "Trảo khẩn", "viMeaning": "Khẩn trương / Nhanh tay", "example": "抓紧时间 (Choa chỉnh sử chen - Khẩn trương thời gian)"},
            {"zh": "看这里", "pinyin": "kàn zhèlǐ", "viBoi": "Khan chưa lỉ", "hanViet": "Khán giá lý", "viMeaning": "Nhìn vào đây", "example": "看这里做 (Khan chưa lỉ chua - Nhìn vào đây mà làm)"},
            {"zh": "别动", "pinyin": "bié dòng", "viBoi": "Piế tung", "hanViet": "Biệt động", "viMeaning": "Đừng động đậy", "example": "别动危险 (Piế tung uây hiển - Đừng động đậy nguy hiểm)"}
        ],
        "story": {
            "title": "Hiệp Hai Trên Chuyền Sản Xuất",
            "content": "Sếp đứng đầu chuyền gõ thước hét: THÍNH ỦA SUA (听我说 - nghe tao nói)! Tay chân phải KHOÁI Ý TIỂN (快一点 - nhanh lên), không nhanh thì cạp đất mà ăn! Đang quấn hàng tít mù thì sếp bất ngờ hô THÍNH Ý XA (停一下 - dừng lại), chỉ vào đống phế phẩm bắt CHAI LAI Ý CHỨ (再来一次 - làm lại hiệp nữa)! Cuối cùng sếp trỏ tay bắt BAN CUA KHUY (搬过去 - khiêng qua kia), làm tao mệt bở cả hơi tai nhưng được sếp vỗ vai khen ngoan!"
        },
        "mission": {
            "taskZh": "听到主管说动作指令时，大声重复后两个字，例如'快一点'回复'好，快一点'！",
            "taskVi": "Khi nghe sếp hét lệnh, hãy lặp lại 2 từ cuối để xác nhận, ví dụ nghe 'Khoái ý tiển' thì đáp ngay 'Hảo, khoái ý tiển!'!"
        }
    },
    {
        "day": 3,
        "phase": 1,
        "titleZh": "听懂指令·位置篇",
        "titleVi": "Lệnh vị trí & Đồ vật",
        "targetZh": "搞清楚这里、那里、上面、下面，拿东西放东西指哪打哪，绝不跑错窝！",
        "targetVi": "Phân biệt rõ ở đây, đằng kia, bên trên, dưới gầm. Sếp chỉ đâu đánh đó, lấy đúng hàng đặt đúng chỗ không bao giờ nhầm lẫn!",
        "sentences": [
            {
                "id": "d3_s1",
                "zh": "放这里",
                "pinyin": "fàng zhè lǐ",
                "viBoi": "Phang chưa lỉ",
                "hanViet": "Phóng giá lý (đặt ở đây)",
                "viMeaning": "Đặt ở đây / Để vào chỗ này",
                "spicyHook": "PHANG thẳng tay vào CHƯA LỈ (chỗ kín)! Chỉ đúng vị trí nhạy cảm này mà 'phang' hàng xuống, cấm phang bậy ra ngoài!",
                "bossTactic": "Khi bưng khay linh kiện lại hỏi sếp, sếp chỉ ngón tay xuống bàn nói 'Phang chưa lỉ', đặt nhẹ nhàng xuống ngay chỗ ngón tay sếp.",
                "audioText": "放这里",
                "tags": ["Vị trí", "Sắp xếp"]
            },
            {
                "id": "d3_s2",
                "zh": "拿给我",
                "pinyin": "ná gěi wǒ",
                "viBoi": "Nả cẩy ủa",
                "hanViet": "Nã cấp ngã (lấy đưa cho tôi)",
                "viMeaning": "Cầm đưa cho tôi / Đưa đây cho tôi",
                "spicyHook": "Đưa NẢ (quả na) CẨY ỦA (cởi quần áo) ra đón lấy! Đưa hàng tận tay sếp nâng niu như đưa trái na chín mọng!",
                "bossTactic": "Sếp xòe tay bảo 'Nả cẩy ủa', hai tay dâng món đồ/dụng cụ lên kèm nụ cười tươi rói.",
                "audioText": "拿给我",
                "tags": ["Giao nhận", "Thao tác"]
            },
            {
                "id": "d3_s3",
                "zh": "放在那里",
                "pinyin": "fàng zài nà lǐ",
                "viBoi": "Phang chai na lỉ",
                "hanViet": "Phóng tại na lý (để ở đằng kia)",
                "viMeaning": "Để ở đằng kia / Đặt chỗ đằng kia",
                "spicyHook": "PHANG CHAI rượu đập vỡ NA LỈ (nát bét đằng kia)! Nhìn theo ngón tay sếp chỉ chỗ xa xa mà mang hàng để sang đó!",
                "bossTactic": "Khác với 'Phang chưa lỉ' (ở đây), 'Phang chai na lỉ' là góc đằng xa, thường là khu phế phẩm hoặc pallet trung chuyển.",
                "audioText": "放在那里",
                "tags": ["Kho bãi", "Vị trí xa"]
            },
            {
                "id": "d3_s4",
                "zh": "拿走吧",
                "pinyin": "ná zǒu ba",
                "viBoi": "Nả tẩu ba",
                "hanViet": "Nã tẩu ba (cầm đi đi)",
                "viMeaning": "Mang đi chỗ khác đi / Cầm đi đi",
                "spicyHook": "NẢ (quả na) hôi thối thiu thối TẨU BA (mau xách dép tẩu thoát)! Hàng này xong rồi hoặc bị loại, xách mông đem đi chỗ khác!",
                "bossTactic": "Sếp phẩy tay 'Nả tẩu ba', tức là khâu này xong rồi, dọn dẹp chuyển qua công đoạn kế tiếp.",
                "audioText": "拿走吧",
                "tags": ["Chuyển hàng", "Dọn dẹp"]
            },
            {
                "id": "d3_s5",
                "zh": "在哪里",
                "pinyin": "zài nǎ lǐ",
                "viBoi": "Chai nả lỉ",
                "hanViet": "Tại na lý (ở đâu thế?)",
                "viMeaning": "Ở đâu thế? / Chỗ nào vậy?",
                "spicyHook": "CHAI rượu của NẢ LỈ trốn ở xó nào rồi? Mò mẫm tìm kiếm khắp xưởng không thấy thì há mồm hỏi ngay: Chai nả lỉ?",
                "bossTactic": "Không thấy cờ lê hay mẫu hàng, ghép từ: [Đồ vật] + 'Chai nả lỉ?'. Ví dụ: 'Dụng cụ chai nả lỉ?'.",
                "audioText": "在哪里",
                "tags": ["Hỏi han", "Tìm đồ"]
            }
        ],
        "words": [
            {"zh": "上面", "pinyin": "shàngmian", "viBoi": "Sang miển", "hanViet": "Thượng diện", "viMeaning": "Ở bên trên", "example": "放在上面 (Phang chai sang miển - Để bên trên)"},
            {"zh": "下面", "pinyin": "xiàmian", "viBoi": "Hạ miển", "hanViet": "Hạ diện", "viMeaning": "Ở bên dưới / Dưới gầm", "example": "在下面 (Chai hạ miển - Ở dưới đáy)"},
            {"zh": "里面", "pinyin": "lǐmian", "viBoi": "Lỉ miển", "hanViet": "Lý diện", "viMeaning": "Bên trong", "example": "放里面 (Phang lỉ miển - Để vào bên trong)"},
            {"zh": "外面", "pinyin": "wàimian", "viBoi": "Oai miển", "hanViet": "Ngoại diện", "viMeaning": "Bên ngoài", "example": "搬到外面 (Ban tao oai miển - Khiêng ra ngoài)"},
            {"zh": "左边", "pinyin": "zuǒbian", "viBoi": "Chủa piển", "hanViet": "Tả biên", "viMeaning": "Bên tay trái", "example": "在左边 (Chai chủa piển - Ở bên trái)"},
            {"zh": "右边", "pinyin": "yòubian", "viBoi": "Dấu piển", "hanViet": "Hữu biên", "viMeaning": "Bên tay phải", "example": "在右边 (Chai dấu piển - Ở bên phải)"},
            {"zh": "前面", "pinyin": "qiánmian", "viBoi": "Thiển miển", "hanViet": "Tiền diện", "viMeaning": "Phía trước", "example": "看前面 (Khan thiển miển - Nhìn phía trước)"},
            {"zh": "后面", "pinyin": "hòumian", "viBoi": "Hâu miển", "hanViet": "Hậu diện", "viMeaning": "Phía sau lưng", "example": "在后面 (Chai hâu miển - Ở đằng sau)"},
            {"zh": "中间", "pinyin": "zhōngjiān", "viBoi": "Chung chen", "hanViet": "Trung gian", "viMeaning": "Ở chính giữa", "example": "放在中间 (Phang chai chung chen - Để ở giữa)"},
            {"zh": "旁边", "pinyin": "pángbiān", "viBoi": "Pháng piển", "hanViet": "Bàng biên", "viMeaning": "Bên cạnh / Kế bên", "example": "机器旁边 (Chi chi pháng piển - Bên cạnh máy)"}
        ],
        "story": {
            "title": "Mò Mẫm Khắp Chuyền Tìm Đồ Quý",
            "content": "Sếp gọi giật giọng: CHAI NẢ LỈ (在哪里 - ở đâu thế)? Tao hớt hải chạy lại, sếp bảo NẢ CẨY ỦA (拿给我 - đưa cho tao) cây thước đo! Tao dâng lên, sếp đo xong phán: Cái này không đúng vị trí, PHANG CHƯA LỈ (放这里 - để ở đây) là sai bét, phải PHANG CHAI NA LỈ (放在那里 - để tít đằng kia)! Còn đống bao bì rác này NẢ TẨU BA (拿走吧 - cầm vứt đi ngay)! Thế là tao thoăn thoắt dọn dẹp sạch bóng, sếp gật gù khen mắt sáng tay nhanh!"
        },
        "mission": {
            "taskZh": "在车间里递工具给同事或主管时，主动说'给你'（gěi nǐ / cẩy nỉ）或者问'放这里吗'！",
            "taskVi": "Hôm nay khi đưa đồ cho ai, hãy nói '给你 (Cẩy nỉ - Cho bạn nè)' hoặc chỉ tay hỏi '放这里吗 (Phang chưa lỉ ma - Để ở đây hả)?'!"
        }
    },
    {
        "day": 4,
        "phase": 1,
        "titleZh": "质量与返工",
        "titleVi": "Chất lượng & Sửa hàng lỗi",
        "targetZh": "分辨合格与次品，机器出废料立刻报警，主动返工展现责任心！",
        "targetVi": "Bắt thấu hàng đạt chuẩn hay hàng phế, hàng lỗi báo ngay, chủ động sửa hàng thể hiện tinh thần trách nhiệm thép!",
        "sentences": [
            {
                "id": "d4_s1",
                "zh": "不合格",
                "pinyin": "bù hé gé",
                "viBoi": "Pu hứa cứa",
                "hanViet": "Bất hợp cách (không đạt chuẩn)",
                "viMeaning": "Không đạt chuẩn / Hàng lỗi / Hàng phế",
                "spicyHook": "Hàng 'BẤT HỢP CÁCH' (âm Hán Việt y xì đúc)! Hàng xấu như bị HỨA CỨA đứt cổ họng, nhìn ngứa mắt vứt ngay vào sọt phế!",
                "bossTactic": "QC (kiểm phẩm) vừa cầm sản phẩm lên săm soi, mình tự giác bảo 'Pu hứa cứa ma?', QC thấy mình có tâm sẽ chỉ dẫn nhẹ nhàng.",
                "audioText": "不合格",
                "tags": ["Chất lượng", "QC"]
            },
            {
                "id": "d4_s2",
                "zh": "坏了",
                "pinyin": "huài le",
                "viBoi": "Hoài lơ",
                "hanViet": "Hoại liễu (hỏng rồi)",
                "viMeaning": "Hỏng rồi / Hư rồi / Toang rồi",
                "spicyHook": "Ngắm gái chuyền bên cạnh HOÀI nên đầu óc LƠ đãng, đút nhầm phôi làm máy HOẠI (hỏng) mẹ nó luôn! Toang rồi!",
                "bossTactic": "Máy kêu khét lẹt hoặc phôi gãy, chạy ngay ra hô to 'Hoài lơ! Hoài lơ!' để ngắt điện khẩn cấp.",
                "audioText": "坏了",
                "tags": ["Hư hỏng", "Báo động"]
            },
            {
                "id": "d4_s3",
                "zh": "重做",
                "pinyin": "chóng zuò",
                "viBoi": "Chủng chua",
                "hanViet": "Trùng tác (làm lại)",
                "viMeaning": "Làm lại từ đầu / Sửa lại",
                "spicyHook": "CHỦNG loại này CHUA chát quá! Làm ẩu bị sếp bắt làm lại nhăn nhó mặt chua lè, nhưng làm lại cho ngon lành thì lại ngọt nước!",
                "bossTactic": "Sếp bảo hàng này lỗi, thay vì cãi đổ lỗi cho ca trước, hãy ngẩng cao đầu nói 'Hảo! Ủa chủng chua!' (Được! Tôi làm lại!). Sếp cực nể!",
                "audioText": "重做",
                "tags": ["Trách nhiệm", "Sửa hàng"]
            },
            {
                "id": "d4_s4",
                "zh": "检查一下",
                "pinyin": "jiǎn chá yí xià",
                "viBoi": "Chiển chá ý xa",
                "hanViet": "Kiểm tra nhất hạ (kiểm tra một chút)",
                "viMeaning": "Kiểm tra một chút / Soi lại xem",
                "spicyHook": "Âm Hán Việt: KIỂM TRA NHẤT HẠ! Cởi cúc áo ra CHIỂN CHÁ Ý XA xem có bị sứt mẻ gì không, săm soi từng chân tơ kẽ tóc!",
                "bossTactic": "Trước khi đóng thùng, vỗ ngực bảo sếp 'Ủa chiển chá ý xa' (Tôi kiểm tra lại một chút). Đảm bảo sếp chấm 10 điểm cẩn thận.",
                "audioText": "检查一下",
                "tags": ["Kỹ lưỡng", "Kiểm tra"]
            },
            {
                "id": "d4_s5",
                "zh": "合格了",
                "pinyin": "hé gé le",
                "viBoi": "Hứa cứa lơ",
                "hanViet": "Hợp cách liễu (đạt chuẩn rồi)",
                "viMeaning": "Đạt chuẩn rồi / Hàng ngon rồi / OK rồi",
                "spicyHook": "Âm Hán Việt: HỢP CÁCH LIỄU! HỨA gả con gái CỨA lòng say đắm khi thấy hàng họ chuẩn đét không một vết xước, xuất kho lấy tiền thưởng!",
                "bossTactic": "QC dán tem xanh, hô to 'Hứa cứa lơ!' để báo hiệu cho khâu đóng gói bốc hàng đi.",
                "audioText": "合格了",
                "tags": ["Đạt chuẩn", "Thành công"]
            }
        ],
        "words": [
            {"zh": "次品", "pinyin": "cìpǐn", "viBoi": "Chứ phỉn", "hanViet": "Thứ phẩm", "viMeaning": "Hàng lỗi / Hàng loại 2", "example": "这是次品 (Chưa sư chứ phỉn - Đây là hàng lỗi)"},
            {"zh": "报废", "pinyin": "bàofèi", "viBoi": "Pao phây", "hanViet": "Báo phế", "viMeaning": "Vứt đi / Hủy bỏ", "example": "全部报废 (Toàn pộ pao phây - Báo phế toàn bộ)"},
            {"zh": "划痕", "pinyin": "huáhén", "viBoi": "Hóa hấn", "hanViet": "Họa ngân", "viMeaning": "Vết trầy xước", "example": "有划痕 (Dẩu hóa hấn - Có vết xước)"},
            {"zh": "尺寸错", "pinyin": "chǐcùn cuò", "viBoi": "Chử thuấn thua", "hanViet": "Xích thốn thố", "viMeaning": "Sai kích thước / Lệch size", "example": "尺寸错了 (Chử thuấn thua lơ - Sai kích thước rồi)"},
            {"zh": "脏了", "pinyin": "zāng le", "viBoi": "Chang lơ", "hanViet": "Tang liễu", "viMeaning": "Bị dính bẩn", "example": "表面脏了 (Piểu miển chang lơ - Bề mặt bị bẩn)"},
            {"zh": "漏水", "pinyin": "lòushuǐ", "viBoi": "Lâu suẩy", "hanViet": "Lậu thủy", "viMeaning": "Bị rò nước / Chảy nước", "example": "这里漏水 (Chưa lỉ lâu suẩy - Chỗ này rò nước)"},
            {"zh": "变形", "pinyin": "biànxíng", "viBoi": "Piển xính", "hanViet": "Biến hình", "viMeaning": "Bị biến dạng / Cong vênh", "example": "零件变形 (Lính chiển piển xính - Linh kiện biến dạng)"},
            {"zh": "包装", "pinyin": "bāozhuāng", "viBoi": "Pao choang", "hanViet": "Bao trang", "viMeaning": "Đóng gói bao bì", "example": "开始包装 (Khai sử pao choang - Bắt đầu đóng gói)"},
            {"zh": "贴标签", "pinyin": "tiē biāoqiān", "viBoi": "Thiê peo chen", "hanViet": "Thiếp tiêu thiêm", "viMeaning": "Dán nhãn / Dán tem", "example": "还没贴标签 (Hái mấy thiê peo chen - Chưa dán nhãn)"},
            {"zh": "完美", "pinyin": "wánměi", "viBoi": "Oán mẩy", "hanViet": "Hoàn mỹ", "viMeaning": "Hoàn hảo / Chuẩn đét", "example": "非常完美 (Phi cháng oán mẩy - Rất hoàn hảo)"}
        ],
        "story": {
            "title": "Trận Chiến QC Và Món Hàng Sứt Mẻ",
            "content": "QC cầm kính lúp đi tuần tra xưởng, săm soi lô hàng rồi lắc đầu ngao ngán: PU HỨA CỨA (不合格 - không đạt chuẩn)! Hàng bị HOÀI LƠ (坏了 - hỏng rồi), dính vết trầy toe toét! Tao không hề trốn tránh, bước ra bảo sếp: Để em CHIỂN CHÁ Ý XA (检查一下 - kiểm tra một chút), hàng lỗi em CHỦNG CHUA (重做 - làm lại từ đầu) bảo đảm không sót chiếc nào! Nửa tiếng sau mồ hôi ướt đẫm lưng áo, lô hàng mới bóng loáng ra lò, QC gật đầu cười tươi: HỨA CỨA LƠ (合格了 - đạt chuẩn rồi)!"
        },
        "mission": {
            "taskZh": "发现任何有瑕疵的零件，不要装作没看见，主动指着它对师傅说'坏了'！",
            "taskVi": "Hôm nay nếu thấy bất kỳ phôi nào méo hay xước, hãy chủ động chỉ vào nói với thợ kèm cặp '坏了 (Hoài lơ)'!"
        }
    },
    {
        "day": 5,
        "phase": 1,
        "titleZh": "机器与物料",
        "titleVi": "Máy móc & Vật tư xưởng",
        "targetZh": "机器罢工秒呼叫维修，物料告急直奔仓库，做产线上的全能救火队员！",
        "targetVi": "Máy dừng lập tức gọi bảo trì, cạn nguyên liệu phi thẳng tới kho lĩnh hàng, làm chiến binh gánh team trên chuyền!",
        "sentences": [
            {
                "id": "d5_s1",
                "zh": "机器坏了",
                "pinyin": "jī qì huài le",
                "viBoi": "Chi chi hoài lơ",
                "hanViet": "Cơ khí hoại liễu (máy móc hỏng rồi)",
                "viMeaning": "Máy hỏng rồi / Thiết bị có sự cố",
                "spicyHook": "CƠ KHÍ = CHI CHI (con trym sắt)! Con chim sắt xài quá tải bốc khói HOÀI LƠ (liệt luôn rồi)! Dừng máy khẩn cấp kẻo nổ tanh bành!",
                "bossTactic": "Nói rõ máy số mấy: 'San hao chi chi hoài lơ' (三号机器坏了 - Máy số 3 hỏng rồi). Sếp đánh giá cực kỳ chuyên nghiệp.",
                "audioText": "机器坏了",
                "tags": ["Thiết bị", "Sự cố"]
            },
            {
                "id": "d5_s2",
                "zh": "没有料了",
                "pinyin": "méi yǒu liào le",
                "viBoi": "Mấy dẩu liêu lơ",
                "hanViet": "Một hữu liệu liễu (không có nguyên liệu rồi)",
                "viMeaning": "Hết nguyên liệu rồi / Cạn vật tư rồi",
                "spicyHook": "MẤY DẨU (không có) LIÊU LƠ (đạn dược trong súng)! Súng hết đạn thì bắn sao được, chuyền hết nguyên liệu thì đứng chơi sao ra hàng!",
                "bossTactic": "Còn lại 15 phút nguyên liệu là phải báo câu này ngay, đừng để máy trống trơn mới hét lên kẻo bị sếp mắng là không biết dự trù.",
                "audioText": "没有料了",
                "tags": ["Vật tư", "Báo động"]
            },
            {
                "id": "d5_s3",
                "zh": "去领料",
                "pinyin": "qù lǐng liào",
                "viBoi": "Khuy lỉnh liêu",
                "hanViet": "Khứ lãnh liệu (đi lĩnh vật liệu)",
                "viMeaning": "Đi lấy/lĩnh nguyên liệu",
                "spicyHook": "Âm Hán Việt: KHỨ LÃNH LIỆU! Cắp nách phiếu xuất kho KHUY LỈNH LIÊU (khuôn mặt lầm lì đi lĩnh nguyên liệu), bưng hàng về cấp cứu cho đồng đội!",
                "bossTactic": "Nói với tổ trưởng: 'Ủa khuy lỉnh liêu' (Tôi đi kho lấy liệu), vừa danh chính ngôn thuận rời vị trí mà không bị tính là bỏ chuyền đi chơi.",
                "audioText": "去领料",
                "tags": ["Kho hàng", "Tiếp vận"]
            },
            {
                "id": "d5_s4",
                "zh": "工具在哪",
                "pinyin": "gōng jù zài nǎ",
                "viBoi": "Cung chuy chai nả",
                "hanViet": "Công cụ tại na (công cụ ở đâu?)",
                "viMeaning": "Dụng cụ ở đâu thế?",
                "spicyHook": "CÔNG CỤ = CUNG CHUY! Cây 'cung' và cái 'chùy' của đại ca vứt ở xó nào rồi? Mất đồ nghề là hết đường múa kiếm!",
                "bossTactic": "Vừa làm vừa hỏi bạn cùng chuyền 'Cung chuy chai nả?', tìm ngay để thao tác không bị gián đoạn.",
                "audioText": "工具在哪",
                "tags": ["Dụng cụ", "Đồ nghề"]
            },
            {
                "id": "d5_s5",
                "zh": "叫维修工",
                "pinyin": "jiào wéi xiū gōng",
                "viBoi": "Chéo uấy siêu cung",
                "hanViet": "Khiếu duy tu công (gọi thợ bảo trì)",
                "viMeaning": "Gọi thợ bảo trì / Kêu thợ sửa máy lại đây",
                "spicyHook": "CHÉO UẤY SIÊU CUNG (kêu ông thợ có cây chùy siêu to khổng lồ lại đây sửa chữa)! Thợ bảo dưỡng là trùm cứu tinh của xưởng!",
                "bossTactic": "Chạy ra bàn bảo trì hoặc bốc bộ đàm hét: 'Chéo uấy siêu cung, khoái ý tiển!' (Gọi bảo trì, nhanh lên một chút!).",
                "audioText": "叫维修工",
                "tags": ["Bảo trì", "Cứu trợ"]
            }
        ],
        "words": [
            {"zh": "螺丝", "pinyin": "luósī", "viBoi": "Luổ sư", "hanViet": "La ti", "viMeaning": "Ốc vít", "example": "没有螺丝 (Mấy dẩu luổ sư - Không có ốc vít)"},
            {"zh": "胶水", "pinyin": "jiāoshuǐ", "viBoi": "Cheo suẩy", "hanViet": "Giao thủy", "viMeaning": "Keo dán", "example": "拿胶水来 (Nả cheo suẩy lai - Lấy keo lại đây)"},
            {"zh": "模具", "pinyin": "mújù", "viBoi": "Mú chuy", "hanViet": "Mô cụ", "viMeaning": "Khuôn mẫu", "example": "换模具 (Hoán mú chuy - Đổi khuôn)"},
            {"zh": "扳手", "pinyin": "bānshou", "viBoi": "Pan sẩu", "hanViet": "Bàn thủ", "viMeaning": "Cờ lê / Mỏ lết", "example": "拿扳手给我 (Nả pan sẩu cẩy ủa - Đưa cờ lê cho tôi)"},
            {"zh": "仓库", "pinyin": "cāngkù", "viBoi": "Thang khu", "hanViet": "Thương khố", "viMeaning": "Nhà kho", "example": "去仓库 (Khuy thang khu - Đi ra nhà kho)"},
            {"zh": "纸箱", "pinyin": "zhǐxiāng", "viBoi": "Chử xiang", "hanViet": "Chỉ tương", "viMeaning": "Thùng carton", "example": "纸箱不够 (Chử xiang pú câu - Thùng carton không đủ)"},
            {"zh": "电源", "pinyin": "diànyuán", "viBoi": "Tiển duển", "hanViet": "Điện nguyên", "viMeaning": "Nguồn điện", "example": "检查电源 (Chiển chá tiển duển - Kiểm tra nguồn điện)"},
            {"zh": "卡住了", "pinyin": "kǎzhù le", "viBoi": "Khả chu lơ", "hanViet": "Tạp trụ liễu", "viMeaning": "Bị kẹt rồi / Bị dắt hàng", "example": "零件卡住了 (Lính chiển khả chu lơ - Linh kiện bị kẹt rồi)"},
            {"zh": "缺件", "pinyin": "quējiàn", "viBoi": "Chuyê chen", "hanViet": "Khuyết kiện", "viMeaning": "Thiếu linh kiện / Thiếu chi tiết", "example": "今天缺件 (Chin thiển chuyê chen - Hôm nay thiếu phụ kiện)"},
            {"zh": "扫码枪", "pinyin": "sǎomǎqiāng", "viBoi": "Sảo mả chiang", "hanViet": "Tảo mã thương", "viMeaning": "Máy quét mã vạch", "example": "扫码枪没电 (Sảo mả chiang mấy tiển - Máy quét hết pin)"}
        ],
        "story": {
            "title": "Cây Chùy Bảo Trì Và Thảm Cảnh Cạn Kho",
            "content": "Đang chạy hàng ầm ầm thì máy số 2 kêu 'rắc', CHI CHI HOÀI LƠ (机器坏了 - máy hỏng rồi)! Băng tải đứng hình, linh kiện kẹt cứng. Tao chạy thục mạng ra phòng cơ điện gào to: CHÉO UẤY SIÊU CUNG (叫维修工 - gọi bảo trì gấp)! Thợ vác CUNG CHUY (工具 - đồ nghề) lại tháo ốc sửa xong, nhưng nhìn lại khay thì ôi thôi MẤY DẨU LIÊU LƠ (没有料了 - hết sạch nguyên liệu)! Tao vớ ngay phiếu xuất kho, hét to: KHUY LỈNH LIÊU (去领料 - em đi lĩnh hàng đây)! Năm phút sau vác 2 thùng vật tư về, chuyền chạy lại reo vang, tổ trưởng giơ ngón tay cái khen: Quá bén!"
        },
        "mission": {
            "taskZh": "留意车间里任何工具或物料短缺，用中文告诉班长'没有料了'或'机器卡住了'！",
            "taskVi": "Hôm nay nếu thấy liệu sắp hết hoặc có đồ kẹt, hãy báo ngay với chuyền trưởng bằng câu '没有料了 (Mấy dẩu liêu lơ)'!"
        }
    },
    {
        "day": 6,
        "phase": 1,
        "titleZh": "安全与生理需求",
        "titleVi": "An toàn & Nhu cầu sinh lý",
        "targetZh": "危险时刻保命第一，吃喝拉撒合法离岗，不憋尿不挨罚，舒舒服服上下班！",
        "targetVi": "Nguy hiểm thì tránh đòn giữ mạng, ăn uống giải quyết nỗi buồn đàng hoàng đúng luật, không nhịn đái không bị phạt!",
        "sentences": [
            {
                "id": "d6_s1",
                "zh": "小心危险",
                "pinyin": "xiǎo xīn wēi xiǎn",
                "viBoi": "Siểu xin uây hiển",
                "hanViet": "Tiểu tâm nguy hiểm (cẩn thận nguy hiểm)",
                "viMeaning": "Cẩn thận coi chừng nguy hiểm",
                "spicyHook": "Âm Hán Việt: TIỂU TÂM NGUY HIỂM! Tim nhỏ đập thình thịch SIỂU XIN UÂY HIỂN, dại dột thò tay vào máy ép là dập nát cả đời trai!",
                "bossTactic": "Thấy đồng nghiệp hay sếp sơ ý bước gần dây curoa hay xe nâng, hô to 'Siểu xin uây hiển!'. Cứu nguy một mạng là sếp nhớ ơn suốt đời.",
                "audioText": "小心危险",
                "tags": ["An toàn", "Bảo hộ"]
            },
            {
                "id": "d6_s2",
                "zh": "我去上厕所",
                "pinyin": "wǒ qù shàng cè suǒ",
                "viBoi": "Ủa khuy sang chưa sủa",
                "hanViet": "Ngã khứ thượng trắc sở (tôi đi vệ sinh)",
                "viMeaning": "Tôi đi vệ sinh / Đi giải quyết nỗi buồn",
                "spicyHook": "Bụng sôi ùng ục, cởi phăng quần nhảy tót lên SANG CHƯA SỦA (bệ xí xưởng) ngồi rặn xả lũ! Nhịn là nổ banh ruột!",
                "bossTactic": "Nói với bạn cùng bàn hoặc tổ trưởng trước khi rời vị trí: 'Ủa khuy sang chưa sủa, liảng phân chung' (Tôi đi vệ sinh, 2 phút). Vừa đúng quy định xưởng.",
                "audioText": "我去上厕所",
                "tags": ["Vệ sinh", "Rời vị trí"]
            },
            {
                "id": "d6_s3",
                "zh": "喝水",
                "pinyin": "hē shuǐ",
                "viBoi": "Hưa suẩy",
                "hanViet": "Hà thủy (uống nước)",
                "viMeaning": "Uống nước / Đi làm ngụm nước",
                "spicyHook": "Cổ họng khô khát như sa mạc, há mồm HƯA SUẨY (húp nước suối ừng ực)! Nước mát chảy xuống ruột sướng rên cả người!",
                "bossTactic": "Cầm bình nước rỗng chỉ tay nói 'Ủa khuy hưa suẩy', sếp người Hoa rất thoáng chuyện uống nước bổ sung thể lực.",
                "audioText": "喝水",
                "tags": ["Nước uống", "Giải khát"]
            },
            {
                "id": "d6_s4",
                "zh": "吃饭了",
                "pinyin": "chī fàn le",
                "viBoi": "Chư phan lơ",
                "hanViet": "Ngật phạn liễu (ăn cơm rồi)",
                "viMeaning": "Ăn cơm thôi / Đến giờ ăn cơm rồi",
                "spicyHook": "Chuông trưa gõ beng beng, CHƯ PHAN LƠ (xơi cơm thôi anh em ơi)! Mâm cơm xưởng đầy ắp thịt cá, nhét đẫy họng lấy sức chiều chiến đấu!",
                "bossTactic": "Gặp sếp ngoài cửa căng tin, chào niềm nở: 'Lảo bản, chư phan lơ ma?' (Sếp đã ăn cơm chưa?), tạo thiện cảm cực mạnh.",
                "audioText": "吃饭了",
                "tags": ["Cơm xưởng", "Nghỉ trưa"]
            },
            {
                "id": "d6_s5",
                "zh": "累死了",
                "pinyin": "lèi sǐ le",
                "viBoi": "Lây sử lơ",
                "hanViet": "Lụy tử liễu (mệt chết rồi)",
                "viMeaning": "Mệt chết đi được / Oải quá rồi",
                "spicyHook": "LÂY SỬ LƠ! Cày 12 tiếng liên tục như bị quỷ hút cạn sinh lực, toàn thân rã rời như đống bùn, lết không nổi cái chân!",
                "bossTactic": "Than thở vui với đồng nghiệp lúc tan ca: 'Lây sử lơ!'. Nhưng trước mặt sếp chỉ than khi đã hoàn thành vượt chỉ tiêu (để xin thưởng).",
                "audioText": "累死了",
                "tags": ["Cảm xúc", "Giải tỏa"]
            }
        ],
        "words": [
            {"zh": "戴手套", "pinyin": "dài shǒutào", "viBoi": "Tai sẩu thao", "hanViet": "Đái thủ sáo", "viMeaning": "Đeo găng tay", "example": "记得戴手套 (Chi tơ tai sẩu thao - Nhớ đeo găng tay)"},
            {"zh": "戴口罩", "pinyin": "dài kǒuzhào", "viBoi": "Tai khẩu chao", "hanViet": "Đái khẩu tráo", "viMeaning": "Đeo khẩu trang", "example": "必须戴口罩 (Pi suy tai khẩu chao - Bắt buộc đeo khẩu trang)"},
            {"zh": "安全帽", "pinyin": "ānquánmào", "viBoi": "An toàn mao", "hanViet": "An toàn mạo", "viMeaning": "Mũ bảo hộ", "example": "戴安全帽 (Tai an toàn mao - Đội mũ bảo hộ)"},
            {"zh": "烫", "pinyin": "tàng", "viBoi": "Thang", "hanViet": "Thang", "viMeaning": "Nóng / Bỏng rát", "example": "很烫小心 (Hẩn thang siểu xin - Rất nóng cẩn thận)"},
            {"zh": "电击", "pinyin": "diànjī", "viBoi": "Tiển chi", "hanViet": "Điện kích", "viMeaning": "Điện giật", "example": "小心电击 (Siểu xin tiển chi - Cẩn thận điện giật)"},
            {"zh": "急救箱", "pinyin": "jíjiùxiāng", "viBoi": "Chí chiêu xiang", "hanViet": "Cấp cứu tương", "viMeaning": "Hộp sơ cứu cứu thương", "example": "急救箱在哪 (Chí chiêu xiang chai nả - Hộp sơ cứu ở đâu)"},
            {"zh": "肚子疼", "pinyin": "dùzi téng", "viBoi": "Tu gi thấng", "hanViet": "Đỗ tử thống", "viMeaning": "Đau bụng", "example": "我肚子疼 (Ủa tu gi thấng - Em bị đau bụng)"},
            {"zh": "抽根烟", "pinyin": "chōu gēn yān", "viBoi": "Châu cân den", "hanViet": "Trừu căn yên", "viMeaning": "Hút điếu thuốc", "example": "去抽根烟 (Khuy châu cân den - Đi làm điếu thuốc)"},
            {"zh": "休息十分钟", "pinyin": "xiūxi shí fēnzhōng", "viBoi": "Siêu si sử phân chung", "hanViet": "Hưu tức thập phân chung", "viMeaning": "Nghỉ 10 phút", "example": "休息十分钟 (Siêu si sử phân chung - Giải lao 10 phút)"},
            {"zh": "晕倒", "pinyin": "yūndǎo", "viBoi": "Duyên đảo", "hanViet": "Huân đảo", "viMeaning": "Ngất xỉu / Choáng váng", "example": "他晕倒了 (Tha duyên đảo lơ - Anh ấy ngất xỉu rồi)"}
        ],
        "story": {
            "title": "Cú Vọt Vệ Sinh Nghẹt Thở",
            "content": "Đang vận hành máy dập bỗng xe nâng chở hàng lao vút qua, tao hét toáng lên: SIỂU XIN UÂY HIỂN (小心危险 - coi chừng nguy hiểm)! Đúng lúc này bụng tao quặn thắt như bão cấp 12 vì sáng ăn vội hộp xôi thiu. Tao vỗ vai thằng bạn: Tao đi SANG CHƯA SỦA (上厕所 - đi ỉa gấp), canh máy giùm tao 2 phút! Xả sạch ruột nhẹ bẫng người bước ra, vào vặn vòi HƯA SUẨY (喝水 - uống ngụm nước). Vừa lúc chuông trưa réo: CHƯ PHAN LƠ (吃饭了 - ăn cơm thôi)! Cả lũ nằm lăn ra sàn than: LÂY SỬ LƠ (累死了 - mệt phờ râu), nhưng đớp xong bát cơm là hồi sinh liền!"
        },
        "mission": {
            "taskZh": "离开工位去洗手间或喝水前，礼貌对组长说'我去上厕所'或'我去喝水'！",
            "taskVi": "Hôm nay trước khi rời chuyền đi vệ sinh hoặc uống nước, hãy nói với tổ trưởng: '我去上厕所 (Ủa khuy sang chưa sủa)'!"
        }
    },
    {
        "day": 7,
        "phase": 1,
        "titleZh": "第一周大复盘+实战生存考核",
        "titleVi": "Ôn tập Tuần 1 & Sát hạch sinh tồn",
        "targetZh": "连词成句，综合演练5大真实突发场景，从容应对中国主管巡查！",
        "targetVi": "Nối từ thành câu, diễn tập trôi chảy 5 tình huống sống còn nơi công xưởng. Sếp Hoa đi kiểm tra là nói vanh vách!",
        "sentences": [
            {
                "id": "d7_s1",
                "zh": "老板，打卡机坏了",
                "pinyin": "lǎobǎn, dǎkǎjī huài le",
                "viBoi": "Lảo bản, đá cà chi hoài lơ",
                "hanViet": "Lão bản, đả tạp cơ hoại liễu",
                "viMeaning": "Sếp ơi, máy quẹt thẻ hỏng rồi!",
                "spicyHook": "Sếp lớn (LÃO BẢN) ơi, con trym máy dập ĐÁ VÀO CÀ nó HOÀI LƠ (hỏng mẹ nó rồi), ghi nhận giùm em đi đúng giờ kẻo mất toi tiền chuyên cần!",
                "bossTactic": "Nói to rõ ràng khi máy chấm công không nhận vân tay, bảo vệ và sếp sẽ ghi sổ tay bù công cho bạn.",
                "audioText": "老板，打卡机坏了",
                "tags": ["Chấm công", "Cứu nguy"]
            },
            {
                "id": "d7_s2",
                "zh": "料不够，我去仓库领",
                "pinyin": "liào bú gòu, wǒ qù cāngkù lǐng",
                "viBoi": "Liêu pú câu, ủa khuy thang khu lỉnh",
                "hanViet": "Liệu bất cấu, ngã khứ thương khố lãnh",
                "viMeaning": "Thiếu vật tư rồi, em ra kho lĩnh hàng đây",
                "spicyHook": "Đạn dược LIÊU PÚ CÂU (thiếu rồi), tao phóng xe sang THANG KHU LỈNH (kho hàng) rinh về nạp súng bắn tiếp!",
                "bossTactic": "Câu nói thể hiện sự chủ động đỉnh cao, sếp thấy bạn không ngồi chơi chờ việc mà xông xáo lo toan chuyền hàng.",
                "audioText": "料不够，我去仓库领",
                "tags": ["Chủ động", "Tiếp vận"]
            },
            {
                "id": "d7_s3",
                "zh": "这个不合格，我重做",
                "pinyin": "zhè ge bù hégé, wǒ chóngzuò",
                "viBoi": "Chưa cưa pu hứa cứa, ủa chủng chua",
                "hanViet": "Giá cá bất hợp cách, ngã trùng tác",
                "viMeaning": "Cái này lỗi rồi, em làm lại ngay!",
                "spicyHook": "Cái hàng này PU HỨA CỨA (bị lỗi), không sao hết, đại trượng phu ỦA CHỦNG CHUA (tao làm lại từ đầu), sửa đẹp như tiên nữ giáng trần!",
                "bossTactic": "Thần chú miễn nhiễm ăn chửi! Bất kỳ khi nào sếp soi hàng, tung câu này ra thì dù sếp có đang bốc hỏa cũng phải hạ nhiệt mỉm cười.",
                "audioText": "这个不合格，我重做",
                "tags": ["Trách nhiệm", "Đỉnh cao"]
            },
            {
                "id": "d7_s4",
                "zh": "机器卡住了，叫维修",
                "pinyin": "jīqì kǎzhù le, jiào wéixiū",
                "viBoi": "Chi chi khả chu lơ, chéo uấy siêu",
                "hanViet": "Cơ khí tạp trụ liễu, khiếu duy tu",
                "viMeaning": "Máy bị kẹt rồi, gọi bảo trì gấp!",
                "spicyHook": "CƠ KHÍ KHẢ CHU LƠ (con máy kẹt cứng ngắc), mau mau CHÉO UẤY SIÊU (kêu thợ chùy sắt bảo trì lại thông họng máy)!",
                "bossTactic": "Dập nút dừng khẩn cấp trước, sau đó hô câu này với quản đốc.",
                "audioText": "机器卡住了，叫维修",
                "tags": ["Bảo trì", "Xử lý nhanh"]
            },
            {
                "id": "d7_s5",
                "zh": "太累了，想喝口水",
                "pinyin": "tài lèi le, xiǎng hē kǒu shuǐ",
                "viBoi": "Thai lây lơ, xưởng hưa khẩu suẩy",
                "hanViet": "Thái lụy liễu, tưởng hà khẩu thủy",
                "viMeaning": "Mệt quá rồi, cho em xin hớp nước",
                "spicyHook": "THAI LÂY LƠ (mệt thấu buốt ruột gan), cho em XƯỞNG HƯA KHẨU SUẨY (xin ngụm nước suối mát lạnh) lấy lại sức trâu bò cày tiếp!",
                "bossTactic": "Xin phép nghỉ giải lao ngắn một cách đáng yêu, sếp nào cũng sẽ gật đầu cho bạn 3 phút xả hơi.",
                "audioText": "太累了，想喝口水",
                "tags": ["Giải lao", "Hồi phục"]
            }
        ],
        "words": [
            {"zh": "生产线", "pinyin": "shēngchǎnxiàn", "viBoi": "Sang sản siển", "hanViet": "Sinh sản tuyến", "viMeaning": "Chuyền sản xuất", "example": "在这条生产线 (Chai chưa théu sang sản siển - Ở chuyền này)"},
            {"zh": "班长", "pinyin": "bānzhǎng", "viBoi": "Ban trảng", "hanViet": "Ban trưởng", "viMeaning": "Trưởng ca / Trưởng nhóm", "example": "叫班长来 (Chéo ban trảng lai - Gọi trưởng ca lại)"},
            {"zh": "师傅", "pinyin": "shīfu", "viBoi": "Sư phu", "hanViet": "Sư phụ", "viMeaning": "Thợ cả / Sư phụ kèm cặp", "example": "师傅教我 (Sư phu cheo ủa - Sư phụ chỉ em với)"},
            {"zh": "催货", "pinyin": "cuīhuò", "viBoi": "Thuy hua", "hanViet": "Thôi hóa", "viMeaning": "Giục hàng / Thúc tiến độ", "example": "老板在催货 (Lảo bản chai thuy hua - Sếp đang giục hàng)"},
            {"zh": "急单", "pinyin": "jídān", "viBoi": "Chí đan", "hanViet": "Cấp đơn", "viMeaning": "Đơn hàng gấp", "example": "这是急单 (Chưa sư chí đan - Đây là đơn gấp)"},
            {"zh": "倒班", "pinyin": "dǎobān", "viBoi": "Đảo ban", "hanViet": "Đảo ban", "viMeaning": "Đổi ca làm", "example": "下周倒班 (Hạ châu đảo ban - Tuần sau đổi ca)"},
            {"zh": "扣钱", "pinyin": "kòuqián", "viBoi": "Khâu chén", "hanViet": "Khấu tiền", "viMeaning": "Trừ tiền / Phạt tiền", "example": "不要扣钱 (Pu dao khâu chén - Đừng trừ tiền em)"},
            {"zh": "奖金", "pinyin": "jiǎngjīn", "viBoi": "Chiảng chin", "hanViet": "Tưởng kim", "viMeaning": "Tiền thưởng", "example": "发奖金了 (Pha chiảng chin lơ - Phát tiền thưởng rồi)"},
            {"zh": "别吵", "pinyin": "bié chǎo", "viBoi": "Piế thảo", "hanViet": "Biệt xảo", "viMeaning": "Đừng ồn ào / Trật tự", "example": "大家别吵 (Ta che piế thảo - Mọi người đừng ồn)"},
            {"zh": "搞定", "pinyin": "gǎodìng", "viBoi": "Cảo định", "hanViet": "Hảo định", "viMeaning": "Xong xuôi / Êm đẹp", "example": "全部搞定了 (Toàn pộ cảo định lơ - Xong xuôi hết rồi)"}
        ],
        "story": {
            "title": "Kịch Bản Sinh Tồn Hoàn Hảo Ngày Thứ 7",
            "content": "Sáng ra máy quét thẻ đơ, tao bình tĩnh: LẢO BẢN, ĐÁ CÀ CHI HOÀI LƠ (老板，打卡机坏了)! Vào chuyền thấy phôi sắp cạn, tao xung phong: LIÊU PÚ CÂU, ỦA KHUY THANG KHU LỈNH (料不够，我去仓库领)! Bê hàng về đang chạy thì máy kẹt, tao hét: CHI CHI KHẢ CHU LƠ, CHÉO UẤY SIÊU (机器卡住了，叫维修)! QC lại săm soi một chi tiết xước mờ, tao dõng dạc nhận trách nhiệm: CHƯA CƯA PU HỨA CỨA, ỦA CHỦNG CHUA (这个不合格，我重做)! Đến cuối ca mồ hôi ướt đẫm, tao cười hiền: THAI LÂY LƠ, XƯỞNG HƯA KHẨU SUẨY (太累了，想喝口水)! Sếp vỗ vai tao cười khà khà: 'Thằng này được việc, tuần sau tao cất nhắc!'."
        },
        "mission": {
            "taskZh": "第一周通关考核：找一位同事模拟对话，完整说出Day 7的5个核心长句！",
            "taskVi": "Sát hạch Tuần 1: Rủ 1 người bạn cùng chuyền đóng vai sếp, bắn trôi chảy cả 5 câu dài của Ngày 7 không vấp một chữ!"
        }
    }
]

if __name__ == "__main__":
    print(f"Phase 1 generated: {len(PHASE_1_DAYS)} days.")
