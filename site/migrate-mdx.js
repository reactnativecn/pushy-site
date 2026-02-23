const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(walk(fullPath));
    else results.push(fullPath);
  });
  return results;
}

const files = walk('./pages').filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // replace <Callout type="warning"> ... </Callout> with :::warning ... :::
  content = content.replace(/<Callout[^>]*type="([^"]+)"[^>]*>([\s\S]*?)<\/Callout>/g, (_, type, body) => {
    return `:::${type}\n${body.trim()}\n:::`;
  });
  content = content.replace(/<Callout>([\s\S]*?)<\/Callout>/g, (_, body) => {
    return `:::info\n${body.trim()}\n:::`;
  });
  
  // Replace imports
  content = content.replace(/import\s*\{([^}]*)\}\s*from\s*"nextra\/components";?/g, (match, imports) => {
    const list = imports.split(',').map(i => i.trim()).filter(i => i !== 'Callout' && i !== '');
    if (list.length === 0) return '';
    if (list.includes('Tabs') && !list.includes('Tab')) {
      list.push('Tab');
    }
    return `import { ${list.join(', ')} } from "rspress/theme";`;
  });
  
  // Replace <Tabs.Tab> with <Tab>
  content = content.replace(/Tabs\.Tab/g, 'Tab');
  
  fs.writeFileSync(file, content, 'utf8');
});
console.log('Done migrating MDX');
