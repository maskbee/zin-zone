import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe')
    
    # 1. Test index.html SEO and Meta
    page = browser.new_page(viewport={'width': 412, 'height': 915})
    errors_index = []
    page.on('pageerror', lambda e: errors_index.append(str(e)))
    page.goto('file:///' + os.path.abspath('index.html').replace('\\', '/'), wait_until='networkidle')
    page.wait_for_timeout(1000)
    
    title = page.title()
    desc = page.locator('meta[name="description"]').get_attribute('content')
    canonical = page.locator('link[rel="canonical"]').get_attribute('href')
    og_title = page.locator('meta[property="og:title"]').get_attribute('content')
    og_img = page.locator('meta[property="og:image"]').get_attribute('content')
    favicon = page.locator('link[rel="shortcut icon"]').get_attribute('href')
    
    print("--- INDEX.HTML SEO AUDIT ---")
    print(f"Title: {title}")
    print(f"Description: {desc}")
    print(f"Canonical: {canonical}")
    print(f"OG Title: {og_title}")
    print(f"OG Image: {og_img}")
    print(f"Favicon: {favicon}")
    print(f"Uncaught Errors on index.html: {len(errors_index)}")
    page.close()
    
    # 2. Test 404.html
    page404 = browser.new_page(viewport={'width': 412, 'height': 915})
    errors_404 = []
    page404.on('pageerror', lambda e: errors_404.append(str(e)))
    page404.goto('file:///' + os.path.abspath('404.html').replace('\\', '/'), wait_until='networkidle')
    page404.wait_for_timeout(1500)
    
    title_404 = page404.title()
    h1_404 = page404.locator('h1').inner_text()
    count_val = page404.locator('#countdownText').inner_text()
    print("\n--- 404.HTML AUDIT ---")
    print(f"Title: {title_404}")
    print(f"H1: {h1_404}")
    print(f"Countdown timer current value: {count_val}")
    print(f"Uncaught Errors on 404.html: {len(errors_404)}")
    page404.close()
    
    # 3. Test pocket-cards.html
    page_cards = browser.new_page(viewport={'width': 412, 'height': 915})
    errors_cards = []
    page_cards.on('pageerror', lambda e: errors_cards.append(str(e)))
    page_cards.goto('file:///' + os.path.abspath('pocket-cards.html').replace('\\', '/'), wait_until='networkidle')
    page_cards.wait_for_timeout(1000)
    print("\n--- POCKET-CARDS.HTML AUDIT ---")
    print(f"Title: {page_cards.title()}")
    print(f"Uncaught Errors on pocket-cards.html: {len(errors_cards)}")
    page_cards.close()

    browser.close()
