import os
from PIL import Image

for name in ['icons/icon-512.png', 'icons/icon-180.png', 'icons/splash_icon.png']:
    if os.path.exists(name):
        im = Image.open(name)
        print(name, im.size, im.mode)
    else:
        print(name, "NOT FOUND")
