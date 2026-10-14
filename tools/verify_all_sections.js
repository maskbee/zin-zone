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

  const tagTokenizer = /<(\/)?([a-zA-Z0-9\-]+)([\s\S]*?)>/g;
  const stack = [];
  const counts = {};
  let match;

  while ((match = tagTokenizer.exec(secHtml)) !== null) {
    const isClose = !!match[1];
    const tag = match[2].toLowerCase();
    const attrs = match[3];

    if (['input', 'img', 'br', 'hr', 'source'].includes(tag)) continue;
    if (attrs.trim().endsWith('/')) continue;

    if (!counts[tag]) counts[tag] = { opens: 0, closes: 0 };

    if (isClose) {
      counts[tag].closes++;
      if (stack.length === 0) {
        console.log(`[${secId}] Extra closing </${tag}> with empty stack`);
      } else {
        const top = stack.pop();
        if (top !== tag) {
          console.log(`[${secId}] Mismatched closing </${tag}>, top was <${top}>`);
        }
      }
    } else {
      counts[tag].opens++;
      stack.push(tag);
    }
  }

  const unclosed = stack.length;
  console.log(`Section ${secId}: Unclosed in stack = ${unclosed}`);
  if (unclosed > 0) {
    console.log(`   Remaining tags: ${stack.join(', ')}`);
  }
  for (const [t, cnt] of Object.entries(counts)) {
    if (cnt.opens !== cnt.closes) {
      console.log(`   Tag ${t}: ${cnt.opens} opens vs ${cnt.closes} closes`);
    }
  }
});
