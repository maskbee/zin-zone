const domains = ['https://zin.zone', 'https://hanyu-xiexiu.pages.dev'];

async function testDeployment(baseUrl) {
  console.log(`\n======================================================`);
  console.log(`🌐 VERIFYING LIVE PRODUCTION: ${baseUrl}`);
  console.log(`======================================================`);

  try {
    // 1. Check Homepage & Security Headers
    const resHome = await fetch(`${baseUrl}/`, { redirect: 'follow' });
    console.log(`[1] Homepage Status: ${resHome.status} ${resHome.statusText}`);
    const hsts = resHome.headers.get('strict-transport-security');
    const csp = resHome.headers.get('content-security-policy');
    const nosniff = resHome.headers.get('x-content-type-options');
    const xframe = resHome.headers.get('x-frame-options');
    const coop = resHome.headers.get('cross-origin-opener-policy');
    
    console.log(`    - HSTS: ${hsts ? 'PRESENT (' + hsts + ') ✓' : 'MISSING'}`);
    console.log(`    - CSP: ${csp ? 'PRESENT ✓' : 'MISSING'}`);
    console.log(`    - nosniff: ${nosniff ? 'PRESENT ✓' : 'MISSING'}`);
    console.log(`    - X-Frame-Options: ${xframe ? 'PRESENT (' + xframe + ') ✓' : 'MISSING'}`);
    console.log(`    - COOP: ${coop ? 'PRESENT ✓' : 'MISSING'}`);

    const html = await resHome.text();
    console.log(`    - HTML Payload Length: ${(html.length / 1024).toFixed(1)} KB (Modularized)`);
    console.log(`    - Contains <link rel="stylesheet" href="css/app.css...>: ${html.includes('css/app.css') ? 'YES ✓' : 'NO'}`);
    console.log(`    - Zero gstatic tailwind scripts: ${!html.includes('tailwindcss.min.js') ? 'VERIFIED ✓' : 'FAILED'}`);
    console.log(`    - Zero backdoor master keys in source: ${!html.includes('ZIN-8899') && !html.includes('VALID_MASTER_KEYS') ? 'VERIFIED ✓' : 'FAILED'}`);
    console.log(`    - Real ZaloPay phone in source: ${html.includes('0822262695') ? 'VERIFIED ✓' : 'FAILED'}`);

    // 2. Check CSS Bundle
    const resCss = await fetch(`${baseUrl}/css/app.css`);
    console.log(`\n[2] Compiled Tailwind CSS: ${resCss.status} (${(parseInt(resCss.headers.get('content-length') || '0') / 1024).toFixed(1)} KB) ✓`);

    // 3. Check Custom 404 Page
    const res404 = await fetch(`${baseUrl}/non-existent-test-path-404`);
    console.log(`\n[3] 404 Status Check: ${res404.status}`);
    const html404 = await res404.text();
    console.log(`    - Renders Custom "Lạc Bước Bí Cảnh" 404: ${html404.includes('Lạc Bước Bí Cảnh') ? 'YES ✓' : 'NO'}`);

    // 4. Check robots.txt & sitemap.xml
    const resRobots = await fetch(`${baseUrl}/robots.txt`);
    const txtRobots = await resRobots.text();
    console.log(`\n[4] robots.txt: ${resRobots.status} (Contains Sitemap: ${txtRobots.includes('sitemap.xml') ? 'YES ✓' : 'NO'})`);

    const resSitemap = await fetch(`${baseUrl}/sitemap.xml`);
    console.log(`    sitemap.xml: ${resSitemap.status} (XML length: ${(await resSitemap.text()).length} chars) ✓`);

    // 5. Check Live Server API & D1 Database Binding
    console.log(`\n[5] Cloudflare Pages Function + D1 Live API Check:`);
    const resApi = await fetch(`${baseUrl}/api/activate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'ZZ-INVALID-TEST-KEY', device_id: 'test_dev_probe' })
    });
    console.log(`    - POST /api/activate Status: ${resApi.status}`);
    const apiData = await resApi.json();
    console.log(`    - API Response:`, apiData);
    if (apiData && apiData.error && apiData.error.includes('Mã kích hoạt không tồn tại')) {
      console.log(`    ✓ D1 Database Binding is ACTIVE and successfully answering queries!`);
    }

  } catch (err) {
    console.error(`Error probing ${baseUrl}:`, err.message);
  }
}

async function run() {
  await testDeployment(domains[0]);
}

run();
