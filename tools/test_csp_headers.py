import os
import sys
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer
from playwright.sync_api import sync_playwright

PORT = 8765
ROOT = os.path.abspath(os.path.dirname(__file__) + '/..')

# Parse _headers to replicate Cloudflare Pages behavior
headers_map = {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(self), geolocation=()',
    'Content-Security-Policy': (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline'; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com data:; "
        "img-src 'self' data: blob: https://api.qrserver.com https://zin.zone; "
        "media-src 'self' blob: data: https://dict.youdao.com https://fanyi.baidu.com https://translate.google.com; "
        "connect-src 'self' https://dict.youdao.com https://fanyi.baidu.com https://translate.google.com https://api.qrserver.com; "
        "worker-src 'self'; "
        "child-src 'self'; "
        "frame-ancestors 'self'; "
        "form-action 'self'; "
        "base-uri 'self';"
    )
}

class TestServerHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)
        
    def end_headers(self):
        for k, v in headers_map.items():
            self.send_header(k, v)
        super().end_headers()
        
    def log_message(self, format, *args):
        pass # suppress request noise

def run_server():
    server = HTTPServer(('127.0.0.1', PORT), TestServerHandler)
    server.serve_forever()

server_thread = threading.Thread(target=run_server, daemon=True)
server_thread.start()
print(f"Test server running at http://127.0.0.1:{PORT}")

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe')
    page = browser.new_page(viewport={'width': 412, 'height': 915})
    
    csp_violations = []
    console_errors = []
    console_warns = []
    
    def on_console(msg):
        text = msg.text
        if 'content security policy' in text.lower() or 'csp' in text.lower() or 'violates' in text.lower():
            csp_violations.append(f"[{msg.type}] {text}")
        elif msg.type == 'error':
            console_errors.append(text)
        elif msg.type == 'warning':
            console_warns.append(text)
            
    page.on('console', on_console)
    page.on('pageerror', lambda e: console_errors.append(str(e)))
    
    print("\nNavigating to http://127.0.0.1:8765/index.html ...")
    page.goto(f'http://127.0.0.1:{PORT}/index.html', wait_until='networkidle')
    page.wait_for_timeout(2000)
    
    # Test button clicks and interactions that could trigger CSP
    print("Testing interactive elements under CSP...")
    try:
        # Click through splash if present
        btn_next = page.locator('#btnSplashNext_1')
        if btn_next.is_visible():
            btn_next.click()
            page.wait_for_timeout(300)
    except Exception as e:
        print("Note on splash interaction:", e)
        
    # Check if safeStorage and sfx are accessible
    tests = {
        'typeof window.safeStorage': page.evaluate('typeof window.safeStorage'),
        'typeof window.sfx': page.evaluate('typeof window.sfx'),
        'typeof window.particleEngine': page.evaluate('typeof window.particleEngine'),
        'document.title': page.title()
    }
    
    print("\n--- RESULTS UNDER ENFORCED CSP & SECURITY HEADERS ---")
    for k, v in tests.items():
        print(f"  {k}: {v}")
        
    print(f"\nCSP Violations detected: {len(csp_violations)}")
    for v in csp_violations:
        print("  ❌", v)
        
    print(f"\nConsole Errors: {len(console_errors)}")
    for e in console_errors:
        print("  ❌", e)
        
    print(f"\nConsole Warnings: {len(console_warns)}")
    for w in console_warns:
        print("  ⚠️", w)
        
    # Test pocket-cards.html under CSP
    page_cards = browser.new_page(viewport={'width': 412, 'height': 915})
    page_cards.on('console', on_console)
    page_cards.on('pageerror', lambda e: console_errors.append(str(e)))
    page_cards.goto(f'http://127.0.0.1:{PORT}/pocket-cards.html', wait_until='networkidle')
    page_cards.wait_for_timeout(1000)
    print(f"Pocket cards loaded under CSP: {page_cards.title()}")
    page_cards.close()

    # Test 404.html under CSP
    page_404 = browser.new_page(viewport={'width': 412, 'height': 915})
    page_404.on('console', on_console)
    page_404.on('pageerror', lambda e: console_errors.append(str(e)))
    page_404.goto(f'http://127.0.0.1:{PORT}/404.html', wait_until='networkidle')
    page_404.wait_for_timeout(1000)
    print(f"404 page loaded under CSP: {page_404.title()}")
    page_404.close()

    browser.close()
    print("\n✓ CSP Verification Complete!")
