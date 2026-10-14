const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const startIdx = html.indexOf('id="section-check"');
const endIdx = html.indexOf('</section>', startIdx);
const secHtml = html.substring(startIdx, endIdx);

// Count opens using tag tokenizer
const tagTokenizer = /<(\/)?([a-zA-Z0-9\-]+)([\s\S]*?)>/g;
let opens = 0;
let closes = 0;
let match;
while ((match = tagTokenizer.exec(secHtml)) !== null) {
  const isClose = !!match[1];
  const tag = match[2].toLowerCase();
  if (tag === 'div') {
    if (isClose) closes++;
    else opens++;
  }
}
console.log('Tokenizer: div opens =', opens, ', closes =', closes);
