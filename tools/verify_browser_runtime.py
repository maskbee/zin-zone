import sys
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe')
    page = browser.new_page(viewport={'width': 412, 'height': 915})
    
    errors = []
    logs = []
    page.on('pageerror', lambda err: errors.append(str(err)))
    page.on('console', lambda msg: logs.append(f"[{msg.type}] {msg.text}"))
    
    page.goto('file:///D:/Anti-workspace/hanyu-xiexiu/index.html', wait_until='networkidle')
    page.wait_for_timeout(1500)
    
    # Check essential globals
    tests = {
        'document.readyState': page.evaluate('document.readyState'),
        'typeof safeStorage': page.evaluate('typeof safeStorage'),
        'typeof window.safeStorage': page.evaluate('typeof window.safeStorage'),
        'typeof sfx': page.evaluate('typeof sfx'),
        'typeof particleEngine': page.evaluate('typeof particleEngine'),
        'typeof renderDayTabs': page.evaluate('typeof renderDayTabs'),
        'typeof switchMainTab': page.evaluate('typeof switchMainTab'),
        'typeof gatekeeperCheck': page.evaluate('typeof gatekeeperCheck'),
        'typeof playClickSound': page.evaluate('typeof playClickSound'),
        'typeof extractPronunciationText': page.evaluate('typeof extractPronunciationText'),
        'dayTabsCount': page.evaluate("document.querySelectorAll('#dayTabsContainer button').length"),
        'curriculumTitle': page.evaluate("document.querySelector('h1')?.innerText")
    }
    
    print("--- RUNTIME EVALUATION TESTS ---")
    for k, v in tests.items():
        print(f"  {k}: {v}")
        
    print("\n--- CONSOLE ERRORS / WARNINGS ---")
    err_count = 0
    for log in logs:
        if 'error' in log.lower() or 'fail' in log.lower():
            print(" ", log)
            err_count += 1
    if err_count == 0:
        print("  Zero console errors.")
        
    print(f"\n--- UNCAUGHT PAGE EXCEPTIONS: {len(errors)} ---")
    for err in errors:
        print(" ", err)
        
    browser.close()
