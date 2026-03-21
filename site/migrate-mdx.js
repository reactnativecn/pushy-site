import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
  const dirents = await fs.readdir('./pages', { recursive: true, withFileTypes: true });
  const files = dirents
    .filter(dirent => !dirent.isDirectory() && (dirent.name.endsWith('.mdx') || dirent.name.endsWith('.md')))
    .map(dirent => path.join(dirent.parentPath || dirent.path, dirent.name));

  await Promise.all(files.map(async file => {
    let content = await fs.readFile(file, 'utf8');

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

    await fs.writeFile(file, content, 'utf8');
  }));

  console.log('Done migrating MDX');
}

main().catch(console.error);
