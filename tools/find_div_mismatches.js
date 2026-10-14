const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const lines = html.split('\n');
let inScript = false;
let inStyle = false;
const stack = [];

lines.forEach((line, lineNum) => {
  const lineNo = lineNum + 1;
  if (line.includes('<script')) inScript = true;
  if (line.includes('</script>')) { inScript = false; return; }
  if (line.includes('<style')) inStyle = true;
  if (line.includes('</style>')) { inStyle = false; return; }
  if (inScript || inStyle) return;

  // Find all HTML tags in line
  const tagRegex = /<\/?([a-zA-Z0-9\-]+)(?:\s+[^>]*)?>/g;
  let match;
  while ((match = tagRegex.exec(line)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();

    // Void elements
    if (['meta', 'link', 'img', 'br', 'hr', 'input', 'source'].includes(tagName)) continue;
    // Self-closing
    if (fullTag.endsWith('/>')) continue;

    if (fullTag.startsWith('</')) {
      // Closing tag
      if (stack.length === 0) {
        console.log(`Line ${lineNo}: Extra closing tag </${tagName}> with EMPTY STACK! Content: ${line.trim().slice(0, 80)}`);
      } else {
        const top = stack[stack.length - 1];
        if (top.tag === tagName) {
          stack.pop();
        } else {
          console.log(`Line ${lineNo}: MISMATCH! Found </${tagName}>, but top of stack is <${top.tag}> from line ${top.line}. Content: ${line.trim().slice(0, 80)}`);
          // Try to see if this tag exists earlier in stack
          const idx = stack.map(s => s.tag).lastIndexOf(tagName);
          if (idx !== -1) {
            console.log(`   -> Popping ${stack.length - idx} items up to <${tagName}> from line ${stack[idx].line}`);
            stack.splice(idx);
          } else {
            console.log(`   -> Extra </${tagName}> discarded`);
          }
        }
      }
    } else {
      // Opening tag
      stack.push({ tag: tagName, line: lineNo });
    }
  }
});

console.log('\nFinal unclosed stack length:', stack.length);
stack.forEach(item => {
  console.log(`Unclosed <${item.tag}> opened at line ${item.line}`);
});
