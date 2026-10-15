from PIL import Image
import base64
import io

im = Image.open("icons/icon-512.png").convert("RGBA")
im_resized = im.resize((160, 160), Image.Resampling.LANCZOS)

# Save to buffer with optimize
buf = io.BytesIO()
im_resized.save(buf, format="PNG", optimize=True)
data = buf.getvalue()
print("Optimized 160x160 PNG size:", len(data))

b64 = base64.b64encode(data).decode("ascii")
print("Base64 length:", len(b64))

with open("icons/icon_splash_b64.txt", "w") as f:
    f.write("data:image/png;base64," + b64)

print("Saved to icons/icon_splash_b64.txt")
