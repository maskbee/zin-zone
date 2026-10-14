const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const sections = ['section-check', 'section-learn', 'section-share', 'section-jobs', 'section-hot'];

sections.forEach(secId => {
  const startIdx = html.indexOf(`id="${secId}"`);
  if (startIdx === -1) {
    console.log('NOT FOUND:', secId);
    return;
  }
  const endIdx = html.indexOf('</section>', startIdx);
  const secHtml = html.substring(startIdx, endIdx);
  
  const tags = ['div', 'button', 'a', 'p', 'span', 'h2', 'h3', 'h4', 'ul', 'li', 'table', 'tr', 'td', 'select', 'textarea'];
  const errors = [];
  tags.forEach(tag => {
    const opens = (secHtml.match(new RegExp('<' + tag + '(\\s|>)[^>]*>', 'gi')) || []).length;
    const closes = (secHtml.match(new RegExp('</' + tag + '>', 'gi')) || []).length;
    if (opens !== closes) {
      errors.push(`${tag} (open: ${opens}, close: ${closes}, diff: ${opens - closes})`);
    }
  });
  if (errors.length > 0) {
    console.log(`${secId}: MISMATCHES -> ${errors.join(', ')}`);
  } else {
    console.log(`${secId}: ALL TAGS BALANCED 100% OK`);
  }
});
