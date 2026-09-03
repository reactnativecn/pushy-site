import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    const html = fs.readFileSync('test_perf.html', 'utf8');
    await page.setContent(html);

    await browser.close();
  } catch(e) {
    console.log("Could not run puppeteer benchmark, falling back to manual analysis");
  }
})();
