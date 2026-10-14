const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /class=["']([^"']*(?:min-w-|w-\[\d+px\])[^"']*)["']/g;
let match;
while ((match = regex.exec(html)) !== null) {
  const lineNum = html.substring(0, match.index).split('\n').length;
  console.log(`Line ${lineNum}: ${match[1]}`);
}
