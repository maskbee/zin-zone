const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function traceSection(secId) {
  console.log(`\n=================== TRACING ${secId} ===================`);
  const lines = html.split('\n');
  let inside = false;
  let startLine = 0;
  const stack = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNo = i + 1;

    if (line.includes(`id="${secId}"`)) {
      inside = true;
      startLine = lineNo;
      console.log(`Started ${secId} at line ${lineNo}`);
    }

    if (inside) {
      // Find tags in this line
      const tagRegex = /<\/?([a-zA-Z0-9\-]+)(?:\s+[^>]*)?>/g;
      let match;
      while ((match = tagRegex.exec(line)) !== null) {
        const fullTag = match[0];
        const tagName = match[1].toLowerCase();

        if (['meta', 'link', 'img', 'br', 'hr', 'input', 'source'].includes(tagName)) continue;
        if (fullTag.endsWith('/>')) continue;

        if (fullTag.startsWith('</')) {
          if (tagName === 'section') {
            console.log(`Line ${lineNo}: </section> reached! Stack size at end: ${stack.length}`);
            if (stack.length > 0) {
              console.log('UNCLOSED TAGS AT </section>:', stack.map(s => `${s.tag}@${s.line}`).join(', '));
            }
            inside = false;
            return;
          }
          if (stack.length === 0) {
            console.log(`Line ${lineNo}: ⚠️ EXTRA CLOSING </${tagName}> WITH EMPTY STACK! Line content: ${line.trim().slice(0, 80)}`);
          } else {
            const top = stack[stack.length - 1];
            if (top.tag === tagName) {
              stack.pop();
            } else {
              console.log(`Line ${lineNo}: ⚠️ MISMATCH </${tagName}> vs top <${top.tag}>@${top.line}! Line content: ${line.trim().slice(0, 80)}`);
              // pop if found earlier
              const idx = stack.map(s => s.tag).lastIndexOf(tagName);
              if (idx !== -1) {
                console.log(`   popping ${stack.length - idx} items`);
                stack.splice(idx);
              }
            }
          }
        } else {
          stack.push({ tag: tagName, line: lineNo });
        }
      }
    }
  }
}

['section-check', 'section-learn', 'section-share', 'section-jobs', 'section-hot'].forEach(traceSection);
