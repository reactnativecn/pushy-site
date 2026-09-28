// Renders frames [f0, f1) at `fps` and pipes them to ffmpeg: node render.mjs 0 3840 out.mp4 60
import { spawn } from 'child_process';
import { launch } from './browser.mjs';

const [f0, f1, out, fps] = [+process.argv[2], +process.argv[3], process.argv[4], +process.argv[5] || 60];
const page = process.env.PAGE || 'index.html';
const b = await launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
p.on('pageerror', (e) => console.log('ERR', e.message));
await p.goto(`file://${process.cwd()}/${page}?render`);
await p.evaluate(() => window.ready);
const ff = spawn(process.env.FFMPEG || 'ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '14', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
for (let f = f0; f < f1; f++) {
  await p.evaluate((t) => seek(t), f / fps);
  const buf = await p.screenshot({ type: 'jpeg', quality: 95 });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await b.close();
