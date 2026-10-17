import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1920
img = Image.new('RGB', (W, H), (7, 11, 20))
draw = ImageDraw.Draw(img)

font_bold = ImageFont.truetype("C:\\Windows\\Fonts\\segoeuib.ttf", 40)
font_regular = ImageFont.truetype("C:\\Windows\\Fonts\\segoeui.ttf", 30)

test_text = "BẢNG GIÁ MÁY LƯỚT ZIN MỘC • KÈM APP ZIN ZONE 1.500.000đ"
draw.text((50, 50), test_text, font=font_bold, fill=(251, 191, 36))

img.save("tools/test_vn_font.png")
print("Test image saved successfully!")
