const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Check unclosed tags
const tags = ['div', 'section', 'header', 'footer', 'main', 'nav', 'script', 'style'];
tags.forEach(tag => {
  const openRegex = new RegExp('<' + tag + '(\\s|>)[^>]*>', 'gi');
  const closeRegex = new RegExp('</' + tag + '>', 'gi');
  const opens = (html.match(openRegex) || []).length;
  const closes = (html.match(closeRegex) || []).length;
  console.log(`Tag <${tag}>: ${opens} open, ${closes} close (Diff: ${opens - closes})`);
});
