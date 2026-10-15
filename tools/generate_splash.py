import os
import math
from PIL import Image, ImageDraw, ImageFont

# Load source icon
icon_src = Image.open('icons/icon-512.png').convert('RGBA')

# Font helper
def get_font(size, bold=True):
    try:
        font_name = "C:\\Windows\\Fonts\\segoeuib.ttf" if bold else "C:\\Windows\\Fonts\\segoeui.ttf"
        return ImageFont.truetype(font_name, size)
    except Exception:
        return ImageFont.load_default()

def draw_rounded_rect(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)

# Screen sizes for iPhone models:
# (width, height, scale, filename)
SCREEN_SPECS = [
    (1170, 2532, "icons/apple-splash-1170-2532.png"), # iPhone 15/15 Pro/14/14 Pro/13/13 Pro/12/12 Pro
    (1290, 2796, "icons/apple-splash-1290-2796.png"), # iPhone 15 Pro Max/15 Plus/14 Pro Max
    (1284, 2778, "icons/apple-splash-1284-2778.png"), # iPhone 14 Plus/13 Pro Max/12 Pro Max
    (828,  1792, "icons/apple-splash-828-1792.png"),  # iPhone 11/XR
    (1125, 2436, "icons/apple-splash-1125-2436.png"), # iPhone 11 Pro/XS/X
    (1242, 2688, "icons/apple-splash-1242-2688.png"), # iPhone 11 Pro Max/XS Max
    (750,  1334, "icons/apple-splash-750-1334.png"),  # iPhone SE (2/3), 8, 7
    (1080, 2340, "icons/apple-splash-1080-2340.png"), # iPhone 13 mini/12 mini
]

def create_splash(width, height, out_path):
    # Scale factor relative to 1170px width
    scale = width / 1170.0
    
    # Base dark gradient background
    base = Image.new('RGBA', (width, height), (7, 11, 20, 255))
    draw = ImageDraw.Draw(base)
    
    # Subtle gradient in center
    cx, cy = width // 2, height // 2
    max_r = int(math.hypot(width, height) / 2)
    # Draw dark blue center glow
    glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    for r in range(int(width * 0.7), 0, -30):
        alpha = int(45 * (1.0 - r / (width * 0.7)))
        glow_draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(14, 23, 42, alpha))
    base = Image.alpha_composite(base, glow)
    draw = ImageDraw.Draw(base)

    # 1. Top VIP Badge
    badge_w = int(620 * scale)
    badge_h = int(72 * scale)
    badge_y = int(180 * scale)
    badge_x = (width - badge_w) // 2
    draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + badge_h],
                           radius=badge_h // 2, fill=(28, 20, 8, 255), outline=(245, 158, 11, 220), width=int(2 * scale))
    
    badge_font = get_font(int(26 * scale), bold=True)
    badge_text = "✨ BAN QUYEN CHINH HANG • 1.500.000d"
    tb = draw.textbbox((0, 0), badge_text, font=badge_font)
    draw.text((badge_x + (badge_w - (tb[2] - tb[0])) // 2, badge_y + (badge_h - (tb[3] - tb[1])) // 2 - int(2*scale)),
              badge_text, font=badge_font, fill=(251, 191, 36, 255))

    # 2. Icon Frame & Glow
    icon_box_size = int(320 * scale)
    icon_inner_size = int(270 * scale)
    icon_y = cy - int(380 * scale)
    icon_x = (width - icon_box_size) // 2

    # Outer cyan glow border
    draw.rounded_rectangle([icon_x, icon_y, icon_x + icon_box_size, icon_y + icon_box_size],
                           radius=int(72 * scale), fill=(15, 23, 42, 255), outline=(56, 189, 248, 230), width=int(4 * scale))
    
    # Paste resized icon
    icon_resized = icon_src.resize((icon_inner_size, icon_inner_size), Image.Resampling.LANCZOS)
    icon_offset_x = icon_x + (icon_box_size - icon_inner_size) // 2
    icon_offset_y = icon_y + (icon_box_size - icon_inner_size) // 2
    base.alpha_composite(icon_resized, (icon_offset_x, icon_offset_y))
    draw = ImageDraw.Draw(base)

    # 3. App Title: ZIN ZONE
    title_font = get_font(int(84 * scale), bold=True)
    title_text = "ZIN ZONE"
    tb = draw.textbbox((0, 0), title_text, font=title_font)
    tw = tb[2] - tb[0]
    title_y = icon_y + icon_box_size + int(48 * scale)
    draw.text(((width - tw) // 2, title_y), title_text, font=title_font, fill=(251, 191, 36, 255))

    # 4. Slogan
    slogan_font = get_font(int(36 * scale), bold=True)
    slogan_text = "⚡ TU TIEN THAN NGU • 21 NGAY THANG CHUC"
    tb = draw.textbbox((0, 0), slogan_text, font=slogan_font)
    sw = tb[2] - tb[0]
    slogan_y = title_y + int(105 * scale)
    draw.text(((width - sw) // 2, slogan_y), slogan_text, font=slogan_font, fill=(56, 189, 248, 255))

    # 5. Subtitle
    sub_font = get_font(int(30 * scale), bold=False)
    sub_text = "Han Ngu Giao Tiep & Quan Ly Nha Xuong"
    tb = draw.textbbox((0, 0), sub_text, font=sub_font)
    subw = tb[2] - tb[0]
    sub_y = slogan_y + int(56 * scale)
    draw.text(((width - subw) // 2, sub_y), sub_text, font=sub_font, fill=(148, 163, 184, 255))

    # 6. Progress Bar
    bar_w = int(500 * scale)
    bar_h = int(12 * scale)
    bar_y = sub_y + int(100 * scale)
    bar_x = (width - bar_w) // 2
    draw.rounded_rectangle([bar_x, bar_y, bar_x + bar_w, bar_y + bar_h],
                           radius=bar_h // 2, fill=(30, 41, 59, 255))
    # Filled progress 60%
    fill_w = int(bar_w * 0.65)
    draw.rounded_rectangle([bar_x, bar_y, bar_x + fill_w, bar_y + bar_h],
                           radius=bar_h // 2, fill=(245, 158, 11, 255))

    # 7. Status Text
    status_font = get_font(int(26 * scale), bold=False)
    status_text = "Dang khoi dong he thong tu tien..."
    tb = draw.textbbox((0, 0), status_text, font=status_font)
    stw = tb[2] - tb[0]
    draw.text(((width - stw) // 2, bar_y + int(32 * scale)), status_text, font=status_font, fill=(100, 116, 139, 255))

    # 8. Bottom Footer
    foot_font = get_font(int(24 * scale), bold=False)
    foot_text1 = "Dong hanh cung cong nhan & ky thuat vien KCN"
    foot_text2 = "ZIN ZONE FACTORY ENGINE • v2.2.0 VIP"
    tb1 = draw.textbbox((0, 0), foot_text1, font=foot_font)
    tb2 = draw.textbbox((0, 0), foot_text2, font=foot_font)
    foot_y2 = height - int(120 * scale)
    foot_y1 = foot_y2 - int(40 * scale)
    draw.text(((width - (tb1[2] - tb1[0])) // 2, foot_y1), foot_text1, font=foot_font, fill=(100, 116, 139, 255))
    draw.text(((width - (tb2[2] - tb2[0])) // 2, foot_y2), foot_text2, font=foot_font, fill=(71, 85, 105, 255))

    # Convert to RGB and save
    final_img = base.convert('RGB')
    final_img.save(out_path, format='PNG', optimize=True)
    print(f"Generated {out_path} ({width}x{height})")

os.makedirs('icons', exist_ok=True)
for w, h, path in SCREEN_SPECS:
    create_splash(w, h, path)

print("All splash screens generated successfully!")
