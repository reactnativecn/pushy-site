// Renders the Web Audio soundtrack (music.js) to music.wav, driving the same live
// scheduler the site uses against an OfflineAudioContext clock.
//   node export-audio.mjs          → music.wav
//   node export-audio.mjs --raw    → peak of the un-limited mix, for calibrating DRIVE in music.js
import { readFileSync, writeFileSync } from 'fs';
import { launch } from './browser.mjs';

const raw = process.argv.includes('--raw');
const b = await launch();
const p = await b.newPage();
p.on('pageerror', (e) => console.log('ERR', e.message));
await p.setContent('<html></html>');
await p.addScriptTag({ content: readFileSync('music.js', 'utf8') });
const r = await p.evaluate(async (raw) => {
  const sr = 48000;
  let buf;
  if (raw) {
    buf = await LaunchMusic.render({ raw: true, sampleRate: sr });
  } else {
    const ctx = new OfflineAudioContext(2, 64 * sr, sr);
    const realSetInterval = window.setInterval;
    let pump = null;
    window.setInterval = (f) => { pump = f; return 1; };
    LaunchMusic.createPlayer(ctx).start(0);
    window.setInterval = realSetInterval;
    for (let t = 0.1; t < 64; t += 0.1) ctx.suspend(+t.toFixed(3)).then(() => { pump(); ctx.resume(); });
    buf = await ctx.startRendering();
  }
  const L = buf.getChannelData(0), R = buf.getChannelData(1);
  let peak = 0;
  const pcm = new Int16Array(L.length * 2);
  for (let i = 0; i < L.length; i++) {
    peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
    pcm[2 * i] = Math.max(-1, Math.min(1, L[i])) * 32767;
    pcm[2 * i + 1] = Math.max(-1, Math.min(1, R[i])) * 32767;
  }
  let s = '';
  const u8 = new Uint8Array(pcm.buffer);
  for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
  return { peak, sr, b64: btoa(s) };
}, raw);
console.log('peak', r.peak.toFixed(3));
if (!raw) {
  const data = Buffer.from(r.b64, 'base64');
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8); h.write('fmt ', 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(r.sr, 24);
  h.writeUInt32LE(r.sr * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(data.length, 40);
  writeFileSync('music.wav', Buffer.concat([h, data]));
}
await b.close();
