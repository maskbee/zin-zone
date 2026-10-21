import sys
from playwright.sync_api import sync_playwright

output_file = sys.argv[1] if len(sys.argv) > 1 else 'screenshot.png'
width = int(sys.argv[2]) if len(sys.argv) > 2 else 412
height = int(sys.argv[3]) if len(sys.argv) > 3 else 915

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe')
    page = browser.new_page(viewport={'width': width, 'height': height})
    page.goto('file:///D:/Anti-workspace/hanyu-xiexiu/index.html', wait_until='networkidle')
    page.wait_for_timeout(1000)
    page.screenshot(path=output_file)
    browser.close()
    print(f"Saved screenshot: {output_file} ({width}x{height})")
