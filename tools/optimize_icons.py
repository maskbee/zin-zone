import os
from PIL import Image

def optimize_all():
    print("=== OPTIMIZING APPLICATION ICONS ===")
    targets = [
        ('icon-192.png', 192),
        ('icon-512.png', 512),
        ('icons/icon-144.png', 144),
        ('icons/icon-180.png', 180),
        ('icons/icon-192.png', 192),
        ('icons/icon-512.png', 512),
        ('icons/splash_icon.png', None)
    ]
    
    total_before = 0
    total_after = 0
    
    for path, target_size in targets:
        if not os.path.exists(path):
            continue
        orig_size = os.path.getsize(path)
        total_before += orig_size
        
        im = Image.open(path).convert('RGBA')
        if target_size:
            # ensure clean size if needed
            if im.size != (target_size, target_size):
                im = im.resize((target_size, target_size), Image.Resampling.LANCZOS)
                
        # Quantize to 256 colors with FastOctree for crisp palette
        q = im.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
        
        # Save temp and check
        temp_out = path + '.tmp'
        q.save(temp_out, 'PNG', optimize=True)
        new_size = os.path.getsize(temp_out)
        
        if new_size < orig_size:
            os.replace(temp_out, path)
            total_after += new_size
            pct = ((new_size - orig_size) / orig_size) * 100
            print(f"✓ {path.ljust(25)} {orig_size/1024:6.1f} KB -> {new_size/1024:6.1f} KB ({pct:+.1f}%)")
        else:
            if os.path.exists(temp_out):
                os.remove(temp_out)
            total_after += orig_size
            print(f"- {path.ljust(25)} {orig_size/1024:6.1f} KB (kept original)")
            
    print(f"\nTotal icon payload: {total_before/1024:.1f} KB -> {total_after/1024:.1f} KB (Saved {(total_before - total_after)/1024:.1f} KB, -{((total_before - total_after)/total_before)*100:.1f}%)")
    
    # Generate multi-size favicon.ico from icon-192.png
    if os.path.exists('icon-192.png'):
        fav_im = Image.open('icon-192.png').convert('RGBA')
        fav_im.save('favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
        print(f"✓ Generated multi-size favicon.ico: {os.path.getsize('favicon.ico')} bytes")

if __name__ == '__main__':
    optimize_all()
