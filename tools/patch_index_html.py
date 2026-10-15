import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

with open("icons/icon_splash_b64.txt", "r", encoding="utf-8") as f:
    b64_src = f.read().strip()

# 1. Update <head> apple-touch-startup-image links and script defer
old_head_part = """  <link rel="apple-touch-startup-image" href="icons/icon-512.png">

  <!-- Tailwind CSS -->
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=Noto+Sans+SC:wght@500;700;900&display=swap" rel="stylesheet">
  <!-- Load Curriculum Dataset -->
  <script src="data/curriculum.js?v=20261014_v21"></script>
  <!-- Load High-Definition Neural Studio Audio Manifest -->
  <script src="data/audio_manifest.js?v=20261014_v21"></script>"""

new_head_part = """  <!-- Apple Touch Startup Splash Screens (Native iOS Launch with Zin Zone 3D Logo) -->
  <link rel="apple-touch-startup-image" href="icons/apple-splash-generic.png">
  <!-- iPhone 15 / 15 Pro / 14 / 14 Pro / 13 / 13 Pro / 12 / 12 Pro (390px x 844px @3x) -->
  <link rel="apple-touch-startup-image" href="icons/apple-splash-1170-2532.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
  <!-- iPhone 15 Pro Max / 15 Plus / 14 Pro Max (430px x 932px @3x) -->
  <link rel="apple-touch-startup-image" href="icons/apple-splash-1290-2796.png" media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
  <!-- iPhone 14 Plus / 13 Pro Max / 12 Pro Max (428px x 926px @3x) -->
  <link rel="apple-touch-startup-image" href="icons/apple-splash-1284-2778.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
  <!-- iPhone 11 / XR (414px x 896px @2x) -->
  <link rel="apple-touch-startup-image" href="icons/apple-splash-828-1792.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
  <!-- iPhone 11 Pro / XS / X (375px x 812px @3x) -->
  <link rel="apple-touch-startup-image" href="icons/apple-splash-1125-2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
  <!-- iPhone 11 Pro Max / XS Max (414px x 896px @3x) -->
  <link rel="apple-touch-startup-image" href="icons/apple-splash-1242-2688.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
  <!-- iPhone SE (2nd/3rd gen) / 8 / 7 / 6s (375px x 667px @2x) -->
  <link rel="apple-touch-startup-image" href="icons/apple-splash-750-1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
  <!-- iPhone 13 mini / 12 mini (360px x 780px @3x) -->
  <link rel="apple-touch-startup-image" href="icons/apple-splash-1080-2340.png" media="(device-width: 360px) and (device-height: 780px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">

  <!-- Tailwind CSS -->
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=Noto+Sans+SC:wght@500;700;900&display=swap" rel="stylesheet">
  <!-- Load Curriculum Dataset with DEFER to guarantee zero parser blocking & zero black screen -->
  <script defer src="data/curriculum.js?v=20261015_v31"></script>
  <!-- Load High-Definition Neural Studio Audio Manifest with DEFER -->
  <script defer src="data/audio_manifest.js?v=20261015_v31"></script>"""

if old_head_part in html:
    html = html.replace(old_head_part, new_head_part, 1)
    print("Replaced head startup image links & defer scripts successfully.")
else:
    print("Warning: old_head_part not found directly, checking...")

# 2. Update #iosAppSplash with embedded base64 icon and animated pulse
old_splash_img = '<img src="icons/icon-180.png" alt="Zin Zone" style="width:88px; height:88px; border-radius:20px; object-fit:contain;">'
new_splash_img = f'<img src="{b64_src}" alt="Zin Zone 3D Gold" style="width:88px; height:88px; border-radius:20px; object-fit:contain; filter:drop-shadow(0 4px 12px rgba(245,158,11,0.35));">'

if old_splash_img in html:
    html = html.replace(old_splash_img, new_splash_img, 1)
    print("Replaced splash image with inline base64 successfully.")
else:
    print("Warning: old_splash_img not found.")

# 3. Update dismissIosSplash with guaranteed minDisplayTime (850ms)
old_dismiss_func = """    function dismissIosSplash() {
      const splash = document.getElementById('iosAppSplash');
      const bar = document.getElementById('iosSplashProgressBar');
      if (!splash || splash.dataset.dismissed) return;
      splash.dataset.dismissed = 'true';
      if (bar) bar.style.width = '100%';
      setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
          if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
        }, 400);
      }, 180);
    }
    // Safety fallback in case DOMContentLoaded or an external script takes too long
    setTimeout(dismissIosSplash, 2000);"""

new_dismiss_func = """    const _splashLaunchTime = Date.now();
    function dismissIosSplash() {
      const splash = document.getElementById('iosAppSplash');
      const bar = document.getElementById('iosSplashProgressBar');
      if (!splash || splash.dataset.dismissed) return;
      splash.dataset.dismissed = 'true';
      
      const elapsed = Date.now() - _splashLaunchTime;
      // Guarantee splash logo is displayed for at least 850ms so user clearly sees the logo interface
      const minDisplayTime = 850;
      const remainingTime = Math.max(0, minDisplayTime - elapsed);

      setTimeout(() => {
        if (bar) bar.style.width = '100%';
        setTimeout(() => {
          splash.style.opacity = '0';
          setTimeout(() => {
            if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
          }, 400);
        }, 220);
      }, remainingTime);
    }
    // Safety fallback in case DOMContentLoaded or an external script takes too long
    setTimeout(dismissIosSplash, 2500);"""

if old_dismiss_func in html:
    html = html.replace(old_dismiss_func, new_dismiss_func, 1)
    print("Replaced dismissIosSplash logic successfully.")
else:
    print("Warning: old_dismiss_func not found.")

# 4. Bump sw registration to v31
html = html.replace("sw.js?v=20261015_v30", "sw.js?v=20261015_v31")

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Updated index.html successfully.")
