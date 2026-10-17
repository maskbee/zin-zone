import os
import shutil
from PIL import Image, ImageDraw, ImageFont

def get_font(size, bold=True):
    try:
        font_path = "C:\\Windows\\Fonts\\segoeuib.ttf" if bold else "C:\\Windows\\Fonts\\segoeui.ttf"
        return ImageFont.truetype(font_path, size)
    except:
        return ImageFont.load_default()

def draw_badge(draw, box, text, font, bg_color, text_color, border_color=None):
    draw.rounded_rectangle(box, radius=box[3]-box[1], fill=bg_color, outline=border_color, width=2)
    tb = draw.textbbox((0, 0), text, font=font)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    x = box[0] + (box[2] - box[0] - tw) // 2
    y = box[1] + (box[3] - box[1] - th) // 2 - 2
    draw.text((x, y), text, font=font, fill=text_color)

def generate_vertical_card():
    W, H = 1080, 1920
    img = Image.new('RGB', (W, H), (8, 12, 22))
    draw = ImageDraw.Draw(img)

    cx = W // 2
    
    # 1. Top Header Area
    draw.text((cx, 75), "ZIN ZONE • ĐIỆN THOẠI HÁN NGỮ THĂNG CHỨC", font=get_font(26, bold=True), fill=(56, 189, 248), anchor="mm")
    draw.text((cx, 135), "BẢNG GIÁ ĐIỆN THOẠI CŨ ZIN MỘC", font=get_font(46, bold=True), fill=(251, 191, 36), anchor="mm")
    draw.text((cx, 185), "⚠️ HÀNG QUA SỬ DỤNG NGUYÊN BẢN 100% • KHÔNG PHẢI MÁY MỚI • CHƯA QUA SỬA CHỮA", font=get_font(20, bold=True), fill=(244, 63, 94), anchor="mm")
    
    pill_box = [cx - 410, 220, cx + 410, 275]
    draw_badge(draw, pill_box, "🎁 TẶNG KÈM SIÊU APP ZIN ZONE BẢN QUYỀN 1.500.000đ (21 NGÀY LÊN TỔ TRƯỞNG)", get_font(21, bold=True), (35, 25, 10), (251, 191, 36), (245, 158, 11))

    # 2. Model Card 1: Redmi K60
    card1 = [50, 310, W - 50, 930]
    draw.rounded_rectangle(card1, radius=24, fill=(15, 23, 42), outline=(56, 189, 248), width=3)
    
    draw.text((80, 350), "1. REDMI K60 (POCO F5 Pro)", font=get_font(38, bold=True), fill=(255, 255, 255))
    draw_badge(draw, [W - 320, 338, W - 80, 382], "MÁY CŨ 95% ZIN MỘC", get_font(20, bold=True), (6, 78, 59), (52, 211, 153), (16, 185, 129))
    
    specs1 = [
        "⚡ Cấu hình: RAM 16GB / 256GB (Bản 16GB cực hiếm, đa nhiệm không tải lại)",
        "🚀 Chip Snapdragon 8+ Gen 1 • ROM Quốc Tế bung 100% công suất max game",
        "📱 Màn hình 2K OLED 120Hz • Pin trâu 5.500mAh + Sạc nhanh 67W cày ca đêm",
        "🛡️ Ngoại hình: Máy cũ lướt 95% zin mộc nguyên bản, chưa từng mở máy sửa chữa"
    ]
    y_spec = 410
    for s in specs1:
        draw.text((80, y_spec), s, font=get_font(23, bold=False), fill=(203, 213, 225))
        y_spec += 44

    # Prices K60
    opt1_box = [75, 615, W - 75, 745]
    draw.rounded_rectangle(opt1_box, radius=18, fill=(24, 34, 53), outline=(51, 65, 85), width=2)
    draw.text((105, 650), "Màu Đen Mực Vũ (Carbon Gaming)", font=get_font(28, bold=True), fill=(241, 245, 249))
    draw.text((105, 695), "Bản mặt lưng carbon cá tính, chống trầy xước", font=get_font(21, bold=False), fill=(148, 163, 184))
    draw.text((W - 105, 680), "3.860.000đ", font=get_font(42, bold=True), fill=(251, 191, 36), anchor="rm")

    opt2_box = [75, 770, W - 75, 900]
    draw.rounded_rectangle(opt2_box, radius=18, fill=(24, 34, 53), outline=(245, 158, 11), width=2)
    draw.text((105, 805), "Màu Xanh Nắng (Lưng Da Cao Cấp)", font=get_font(28, bold=True), fill=(251, 191, 36))
    draw.text((105, 850), "Bản lưng da sang trọng, cầm cực êm tay", font=get_font(21, bold=False), fill=(148, 163, 184))
    draw.text((W - 105, 835), "4.066.000đ", font=get_font(42, bold=True), fill=(251, 191, 36), anchor="rm")

    # 3. Model Card 2: Redmi K60 Pro
    card2 = [50, 970, W - 50, 1550]
    draw.rounded_rectangle(card2, radius=24, fill=(15, 23, 42), outline=(245, 158, 11), width=3)

    draw.text((80, 1010), "2. REDMI K60 PRO (POCO F5 Pro+)", font=get_font(38, bold=True), fill=(255, 255, 255))
    draw_badge(draw, [W - 320, 998, W - 80, 1042], "MÁY CŨ 85% ZIN MỘC", get_font(20, bold=True), (120, 53, 15), (251, 191, 36), (245, 158, 11))

    specs2 = [
        "🔥 Cấu hình: RAM 12GB / BỘ NHỚ 512GB (Nửa Terabyte tha hồ lưu game/tài liệu)",
        "⚡ Vi xử lý Snapdragon 8 Gen 2 đỉnh cao • Sạc siêu tốc 120W (19 phút đầy pin)",
        "📱 Màn 2K OLED 68 tỷ màu 120Hz • Tản nhiệt buồng hơi VC 5000mm² cày game",
        "🛡️ Ngoại hình: Máy cũ 85% zin mộc chuẩn xịn, hiệu năng quái vật chiến mọi game"
    ]
    y_spec2 = 1070
    for s in specs2:
        draw.text((80, y_spec2), s, font=get_font(23, bold=False), fill=(203, 213, 225))
        y_spec2 += 44

    opt3_box = [75, 1275, W - 75, 1420]
    draw.rounded_rectangle(opt3_box, radius=18, fill=(24, 34, 53), outline=(56, 189, 248), width=2)
    draw.text((105, 1315), "Màu Trắng Tuyết (Bản Khủng 512GB)", font=get_font(30, bold=True), fill=(255, 255, 255))
    draw.text((105, 1365), "Bộ nhớ siêu lớn 512GB • Quay chụp, lưu tài liệu xưởng tẹt ga", font=get_font(21, bold=False), fill=(56, 189, 248))
    draw.text((W - 105, 1345), "4.145.000đ", font=get_font(44, bold=True), fill=(56, 189, 248), anchor="rm")

    # 4. Streamlined App Gift Footer (No commitments, no referral, no meeting location clutter)
    bot_box = [50, 1590, W - 50, 1850]
    draw.rounded_rectangle(bot_box, radius=24, fill=(26, 18, 8), outline=(245, 158, 11), width=3)
    
    draw.text((cx, 1645), "🎁 TẶNG KÈM SIÊU ỨNG DỤNG HÁN NGỮ ZIN ZONE", font=get_font(32, bold=True), fill=(251, 191, 36), anchor="mm")
    draw.text((cx, 1705), "• Trị giá quà tặng: 1.500.000đ (Kích hoạt bản quyền vĩnh viễn theo máy)", font=get_font(24, bold=False), fill=(226, 232, 240), anchor="mm")
    draw.text((cx, 1755), "• 21 Ngày làm chủ tiếng Trung giao tiếp nhà xưởng • Đột phá thăng chức Tổ trưởng", font=get_font(24, bold=False), fill=(226, 232, 240), anchor="mm")
    draw.text((cx, 1810), "⚡ MÁY CŨ ZIN MỘC 100% NGUYÊN BẢN • TẶNG TRỌN GÓI PHẦN MỀM THĂNG CHỨC ⚡", font=get_font(21, bold=True), fill=(56, 189, 248), anchor="mm")

    out_path = "price_table_vertical.png"
    img.save(out_path, format="PNG", optimize=True)
    print(f"Generated {out_path} ({W}x{H}) successfully!")

def generate_horizontal_card():
    W, H = 1920, 1080
    img = Image.new('RGB', (W, H), (8, 12, 22))
    draw = ImageDraw.Draw(img)

    cx = W // 2
    # 1. Top Header Area
    draw.text((cx, 45), "ZIN ZONE • ĐIỆN THOẠI HÁN NGỮ THĂNG CHỨC", font=get_font(22, bold=True), fill=(56, 189, 248), anchor="mm")
    draw.text((cx, 90), "BẢNG GIÁ ĐIỆN THOẠI CŨ ZIN MỘC NGUYÊN BẢN", font=get_font(38, bold=True), fill=(251, 191, 36), anchor="mm")
    draw.text((cx, 130), "⚠️ HÀNG QUA SỬ DỤNG NGUYÊN BẢN 100% • KHÔNG PHẢI MÁY MỚI • CHƯA QUA SỬA CHỮA", font=get_font(18, bold=True), fill=(244, 63, 94), anchor="mm")

    pill_box = [cx - 380, 155, cx + 380, 195]
    draw_badge(draw, pill_box, "🎁 TẶNG KÈM SIÊU APP ZIN ZONE BẢN QUYỀN 1.500.000đ (21 NGÀY LÊN TỔ TRƯỞNG)", get_font(18, bold=True), (35, 25, 10), (251, 191, 36), (245, 158, 11))

    # Two columns layout: Left (K60), Right (K60 Pro)
    col_w = 880
    
    # Left Card: K60
    c1 = [60, 215, 60 + col_w, 905]
    draw.rounded_rectangle(c1, radius=20, fill=(15, 23, 42), outline=(56, 189, 248), width=3)
    draw.text((90, 255), "1. REDMI K60 (POCO F5 Pro)", font=get_font(30, bold=True), fill=(255, 255, 255))
    draw_badge(draw, [60 + col_w - 230, 245, 60 + col_w - 30, 285], "MÁY CŨ 95% ZIN", get_font(18, bold=True), (6, 78, 59), (52, 211, 153), (16, 185, 129))

    specs1 = [
        "⚡ Cấu hình: RAM 16GB / 256GB (Bản 16GB hiếm, đa nhiệm không giật lag)",
        "🚀 Chip Snapdragon 8+ Gen 1 • ROM Quốc Tế bung 100% công suất chiến game",
        "📱 Màn 2K OLED 120Hz siêu nét • Pin trâu 5.500mAh + Sạc nhanh 67W cày ca đêm",
        "🛡️ Ngoại hình: Máy cũ 95% zin mộc nguyên bản, chưa qua sửa chữa"
    ]
    ys = 310
    for s in specs1:
        draw.text((90, ys), s, font=get_font(20, bold=False), fill=(203, 213, 225))
        ys += 36

    # Price box 1
    p1 = [85, 480, 60 + col_w - 25, 650]
    draw.rounded_rectangle(p1, radius=16, fill=(24, 34, 53), outline=(51, 65, 85), width=2)
    draw.text((110, 515), "Màu Đen Mực Vũ (Carbon Gaming)", font=get_font(24, bold=True), fill=(241, 245, 249))
    draw.text((110, 560), "Bản mặt lưng carbon cá tính, chống trầy xước", font=get_font(18, bold=False), fill=(148, 163, 184))
    draw.text((60 + col_w - 50, 545), "3.860.000đ", font=get_font(36, bold=True), fill=(251, 191, 36), anchor="rm")

    # Price box 2
    p2 = [85, 680, 60 + col_w - 25, 850]
    draw.rounded_rectangle(p2, radius=16, fill=(24, 34, 53), outline=(245, 158, 11), width=2)
    draw.text((110, 715), "Màu Xanh Nắng (Lưng Da Cao Cấp)", font=get_font(24, bold=True), fill=(251, 191, 36))
    draw.text((110, 760), "Bản lưng da sang trọng, cầm cực êm tay", font=get_font(18, bold=False), fill=(148, 163, 184))
    draw.text((60 + col_w - 50, 745), "4.066.000đ", font=get_font(36, bold=True), fill=(251, 191, 36), anchor="rm")


    # Right Card: K60 Pro
    c2 = [W - 60 - col_w, 215, W - 60, 905]
    draw.rounded_rectangle(c2, radius=20, fill=(15, 23, 42), outline=(245, 158, 11), width=3)
    draw.text((W - col_w - 30, 255), "2. REDMI K60 PRO (POCO F5 Pro+)", font=get_font(30, bold=True), fill=(255, 255, 255))
    draw_badge(draw, [W - 260, 245, W - 90, 285], "MÁY CŨ 85% ZIN", get_font(18, bold=True), (120, 53, 15), (251, 191, 36), (245, 158, 11))

    specs2 = [
        "🔥 Cấu hình: RAM 12GB / BỘ NHỚ 512GB (Nửa Terabyte lưu trữ game tẹt ga)",
        "⚡ Vi xử lý Snapdragon 8 Gen 2 đỉnh cao • Sạc siêu tốc 120W (19 phút đầy pin)",
        "📱 Màn 2K OLED 68 tỷ màu 120Hz • Tản nhiệt buồng hơi VC 5000mm² mát mẻ",
        "🛡️ Ngoại hình: Máy cũ 85% zin mộc chuẩn xịn, cấu hình quái vật"
    ]
    ys2 = 310
    for s in specs2:
        draw.text((W - col_w - 30, ys2), s, font=get_font(20, bold=False), fill=(203, 213, 225))
        ys2 += 36

    # Price box 3
    p3 = [W - col_w - 35, 480, W - 85, 680]
    draw.rounded_rectangle(p3, radius=16, fill=(24, 34, 53), outline=(56, 189, 248), width=2)
    draw.text((W - col_w - 10, 525), "Màu Trắng Tuyết (Bản Khủng 512GB)", font=get_font(26, bold=True), fill=(255, 255, 255))
    draw.text((W - col_w - 10, 575), "Bộ nhớ siêu lớn 512GB • Quay chụp, lưu tài liệu xưởng tẹt ga", font=get_font(18, bold=False), fill=(56, 189, 248))
    draw.text((W - 110, 550), "4.145.000đ", font=get_font(40, bold=True), fill=(56, 189, 248), anchor="rm")


    # Bottom App Gift Ribbon
    bot = [60, 930, W - 60, 1045]
    draw.rounded_rectangle(bot, radius=18, fill=(26, 18, 8), outline=(245, 158, 11), width=3)
    
    draw.text((cx, 965), "🎁 TẤT CẢ MÁY ĐỀU ĐƯỢC TẶNG KÈM SIÊU APP ZIN ZONE BẢN QUYỀN 1.500.000đ", font=get_font(26, bold=True), fill=(251, 191, 36), anchor="mm")
    draw.text((cx, 1010), "⚡ Máy Cũ Zin Mộc Nguyên Bản 100% • Cài Sẵn Ứng Dụng Hán Ngữ 21 Ngày Lên Tổ Trưởng ⚡", font=get_font(20, bold=True), fill=(56, 189, 248), anchor="mm")

    out_path_h = "price_table_horizontal.png"
    img.save(out_path_h, format="PNG", optimize=True)
    print(f"Generated {out_path_h} ({W}x{H}) successfully!")

if __name__ == "__main__":
    generate_vertical_card()
    generate_horizontal_card()

    # Also copy to brain artifact dir if it exists
    artifact_dir = "C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\646b0d7c-1157-44a0-bd35-758be8838993"
    if os.path.exists(artifact_dir):
        shutil.copy("price_table_vertical.png", os.path.join(artifact_dir, "price_table_vertical.png"))
        shutil.copy("price_table_horizontal.png", os.path.join(artifact_dir, "price_table_horizontal.png"))
        print(f"Copied both images to artifact dir: {artifact_dir}")

