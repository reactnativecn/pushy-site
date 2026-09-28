// Screenshots at given times: node stills.mjs 3.2 18 42   (PAGE=index-en.html for Cresc)
import { mkdirSync } from 'fs';
import { launch } from './browser.mjs';

const page = process.env.PAGE || 'index.html';
const times = process.argv.slice(2).map(Number);
mkdirSync('stills', { recursive: true });
const b = await launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
p.on('pageerror', (e) => console.log('ERR', e.message));
await p.goto(`file://${process.cwd()}/${page}?render`);
await p.evaluate(() => window.ready);
for (const t of times) {
  await p.evaluate((t) => seek(t), t);
  await p.screenshot({ path: `stills/${page.replace('.html', '')}-${t}.jpg`, quality: 80, type: 'jpeg' });
}
await b.close();
