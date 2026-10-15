import base64

with open("icons/icon-180.png", "rb") as f:
    d = f.read()
b64 = base64.b64encode(d).decode("ascii")
print("Base64 length:", len(b64))
with open("icons/icon180_b64.txt", "w") as f:
    f.write(b64)
print("Saved to icons/icon180_b64.txt")
