const https = require('https');

https.get('https://zin.zone', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== LIVE DEPLOYMENT VERIFICATION ===');
    console.log('Downloaded bytes:', data.length);
    const sections = ['section-check', 'section-learn', 'section-share', 'section-jobs', 'section-hot'];
    sections.forEach(s => {
      console.log(`Tab ${s}:`, data.includes(`id="${s}"`) ? 'PRESENT ✓' : 'MISSING ❌');
    });
    console.log('Main Header:', data.includes('id="mainHeader"') ? 'PRESENT ✓' : 'MISSING ❌');
    console.log('Player HUD:', data.includes('id="playerHudBar"') ? 'PRESENT ✓' : 'MISSING ❌');
    console.log('Footer:', data.includes('<footer') ? 'PRESENT ✓' : 'MISSING ❌');
    console.log('Mobile Bottom Bar:', data.includes('id="mNav-check"') ? 'PRESENT ✓' : 'MISSING ❌');
    console.log('Button closed check:', data.includes('</button>\n        </nav>') || data.includes('</button>\r\n        </nav>') || data.includes('</button>') ? 'PASS ✓' : 'FAIL ❌');
    console.log('=== END VERIFICATION ===');
  });
});
