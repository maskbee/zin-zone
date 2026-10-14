const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const htmlPart = html.substring(0, html.indexOf('<script>'));
const lines = htmlPart.split('\n');
const stack = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const tagRegex = /<\/?([a-zA-Z0-9]+)(\s[^>]*)?>/g;
  let match;
  while ((match = tagRegex.exec(line)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    
    if (['meta', 'link', 'img', 'br', 'hr', 'input', 'canvas', 'source'].includes(tagName)) {
      continue;
    }
    
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>');
    
    if (isSelfClosing) continue;
    
    if (isClosing) {
      if (stack.length === 0) {
        console.log(`Line ${i + 1}: Unexpected closing </${tagName}> when stack is empty! Line content: ${line.trim()}`);
      } else {
        const last = stack.pop();
        if (last.tagName !== tagName) {
          console.log(`Line ${i + 1}: Mismatched </${tagName}>, expected </${last.tagName}> (opened at line ${last.line})! Line: ${line.trim()}`);
        }
      }
    } else {
      stack.push({ tagName, line: i + 1, text: fullTag });
    }
  }
}

console.log('Remaining unclosed tags in HTML portion:', stack.length);
if (stack.length > 0) {
  stack.forEach(s => console.log(`Unclosed <${s.tagName}> at line ${s.line}: ${s.text}`));
}
