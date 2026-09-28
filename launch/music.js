// Launch soundtrack, synthesized live with Web Audio (120 BPM, one bar = 2 s),
// cut-synced to the animation timeline.
//
// Notes are scheduled just in time by a lookahead scheduler, so only the voices
// that are actually sounding exist in the graph: playback starts instantly and
// costs very little CPU. The player's position is derived from the audio clock,
// which is what the animation follows while sound is on.
(function () {
  'use strict';

  const DUR = 64;
  const BEAT = 0.5;
  const LOOKAHEAD = 0.2; // seconds of audio scheduled ahead of the clock
  const PROG = [[53, 57, 60, 64, 67], [57, 60, 64, 67, 71], [48, 55, 60, 64, 67], [55, 59, 62, 66, 69]];
  const ROOT = [41, 45, 36, 43];
  // Pre-limiter gain, calibrated from a full offline render (`render({ raw: true })`)
  // so the tanh limiter lands at about -1 dBFS.
  const DRIVE = 1.4 / 2.19;

  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const inDrums = (t) => (t >= 8 && t < 42) || (t >= 46 && t < 56);

  function mulberry32(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rand = mulberry32(7);

  // ---------- shared, per-context assets ----------
  function assets(ctx) {
    if (ctx._launchAssets) return ctx._launchAssets;
    const sr = ctx.sampleRate;
    const noise = ctx.createBuffer(1, sr * 4, sr);
    const nd = noise.getChannelData(0);
    const r = mulberry32(11);
    for (let i = 0; i < nd.length; i++) nd[i] = r() * 2 - 1;
    const irLen = Math.floor(2.8 * sr);
    const ir = ctx.createBuffer(2, irLen, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      let lp = 0, e = 0;
      for (let i = 0; i < irLen; i++) {
        lp += 0.55 * ((r() * 2 - 1) * Math.exp(-2.2 * i / sr) - lp);
        d[i] = lp;
        e += lp * lp;
      }
      const k = 1 / Math.sqrt(e);
      for (let i = 0; i < irLen; i++) d[i] *= k;
    }
    const wave = (h) => ctx.createPeriodicWave(new Float32Array(h.length + 1), Float32Array.from([0, ...h]), { disableNormalization: true });
    const tanhCurve = (drive) => Float32Array.from({ length: 2049 }, (_, i) => Math.tanh(((i / 1024) - 1) * drive));
    ctx._launchAssets = {
      noise, ir,
      PAD: wave([1, 0.4, 0.18]), PLUCK: wave([1, 0.35, 0.12]), BASS: wave([1, 0.3]),
      kickCurve: tanhCurve(1.6), impactCurve: tanhCurve(1.5),
      // limiter: input is pre-scaled by 1/8 so the curve covers ±8 × DRIVE
      limitCurve: Float32Array.from({ length: 4097 }, (_, i) => Math.tanh(((i / 2048) - 1) * 8 * DRIVE) * (0.89 / Math.tanh(1.4))),
    };
    return ctx._launchAssets;
  }

  // ---------- one playback session: bus graph + instruments ----------
  function session(ctx, dest, opts) {
    const A = assets(ctx);
    const gain = (v, to) => { const g = ctx.createGain(); g.gain.value = v; if (to) g.connect(to); return g; };
    const biquad = (type, f, q, to) => { const b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; if (to) b.connect(to); return b; };
    const shaper = (c, to) => { const s = ctx.createWaveShaper(); s.curve = c; if (to) s.connect(to); return s; };
    const curve = (n, f) => Float32Array.from({ length: n }, (_, i) => f(i / (n - 1)));

    const out = gain(1, dest);
    let sum;
    if (opts.raw) {
      sum = biquad('highpass', 28, 0.707, out);
    } else {
      const limiter = shaper(A.limitCurve, out);
      sum = biquad('highpass', 28, 0.707, gain(1 / 8, limiter));
    }
    const verb = ctx.createConvolver(); verb.normalize = false; verb.buffer = A.ir; verb.connect(sum);
    // pads, plucks and bass duck under every kick (sidechain)
    const padDuck = gain(1, sum), plkDuck = gain(1, sum), bassDuck = gain(0.9, sum);
    padDuck.connect(gain(0.5, verb));
    plkDuck.connect(gain(0.35, verb));
    const padIn = biquad('lowpass', 2600, 0.707, padDuck);
    // a slightly delayed copy on the right channel widens pads and plucks
    const merger = ctx.createChannelMerger(2); merger.connect(sum);
    const widthDelay = ctx.createDelay(0.05); widthDelay.delayTime.value = 0.012; widthDelay.connect(merger, 0, 1);
    padDuck.connect(gain(0.12, widthDelay)); plkDuck.connect(gain(0.15, widthDelay));
    const drums = gain(0.8, sum);
    const kickBus = shaper(A.kickCurve, drums);
    const fx = gain(1, sum); fx.connect(gain(0.4, verb));
    const tick = biquad('bandpass', 4500, 2, gain(1.6, fx));

    const noiseSrc = (t, dur, to) => {
      const s = ctx.createBufferSource(); s.buffer = A.noise;
      s.connect(to); s.start(t, rand() * (A.noise.duration - dur - 0.01), dur);
    };
    const osc = (t, d, to, freq, pw) => {
      const o = ctx.createOscillator();
      if (pw) o.setPeriodicWave(pw);
      o.frequency.value = freq; o.connect(to); o.start(t); o.stop(t + d);
      return o;
    };

    const I = {
      kick(t, g) {
        const env = gain(0, kickBus);
        env.gain.setValueAtTime(g, t); env.gain.setTargetAtTime(0, t, 1 / 7);
        const o = osc(t, 0.5, env, 155);
        o.frequency.setValueAtTime(155, t); o.frequency.setTargetAtTime(45, t, 1 / 30);
        const click = gain(0, kickBus);
        click.gain.setValueAtTime(0.5 * g, t); click.gain.linearRampToValueAtTime(0, t + 0.0045);
        noiseSrc(t, 0.006, click);
      },
      clap(t, g) {
        const env = gain(0, drums);
        for (const d of [0, 0.012, 0.024]) { env.gain.setValueAtTime(0.8 * g, t + d); env.gain.setTargetAtTime(0.5 * g, t + d, 1 / 120); }
        env.gain.setTargetAtTime(0, t + 0.03, 1 / 18);
        noiseSrc(t, 0.3, biquad('bandpass', 2120, 0.52, env));
      },
      hat(t, open, g, to) {
        const env = gain(0, to || drums);
        env.gain.setValueAtTime(0.35 * g, t); env.gain.setTargetAtTime(0, t, open ? 1 / 12 : 1 / 70);
        noiseSrc(t, open ? 0.25 : 0.06, biquad('highpass', 7000, 0.707, env));
      },
      tick(t) { I.hat(t, false, 0.9, tick); },
      pluck(t, m, d, g) {
        const env = gain(0, plkDuck);
        env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(g, t + 0.006); env.gain.setTargetAtTime(0, t + 0.006, 1 / 11);
        osc(t, d, env, mtof(m), A.PLUCK);
      },
      // `t` may lie in the past when playback starts mid-note: the envelope then
      // joins at the level it would have reached by now.
      pad(t, m, d, g) {
        const peak = g / 3, rel = t + d - 0.5, end = t + d;
        const at = Math.max(t, ctx.currentTime);
        const level = at <= t ? 0 : at < t + 0.6 ? peak * (at - t) / 0.6 : at < rel ? peak : peak * (end - at) / 0.5;
        const env = gain(0, padIn);
        env.gain.setValueAtTime(level, at);
        if (at < t + 0.6) env.gain.linearRampToValueAtTime(peak, t + 0.6);
        if (at < rel) env.gain.setValueAtTime(peak, rel);
        env.gain.linearRampToValueAtTime(0, end);
        for (const det of [-0.08, 0, 0.08]) osc(at, end - at, env, mtof(m + det), A.PAD);
      },
      bass(t, m, g) {
        const env = gain(0, bassDuck);
        env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(g, t + 0.02); env.gain.setTargetAtTime(0, t + 0.02, 1 / 4);
        osc(t, 0.24, env, mtof(m), A.BASS);
      },
      chime(t) {
        [88, 95].forEach((m, k) => {
          const s = t + k * 0.08, env = gain(0, fx);
          env.gain.setValueAtTime(0.18, s); env.gain.setTargetAtTime(0, s, 1 / 5);
          osc(s, 1.2, env, mtof(m));
        });
      },
      riser(t, d, g) {
        const env = gain(0, fx);
        env.gain.setValueCurveAtTime(curve(64, (k) => 0.8 * g * k * k), t, d);
        const bp = biquad('bandpass', 450, 1.3, env);
        bp.frequency.setValueCurveAtTime(curve(64, (k) => 1.48 * (300 + 5000 * k * k)), t, d);
        noiseSrc(t, d, bp);
        const tone = gain(0, fx);
        tone.gain.setValueCurveAtTime(curve(64, (k) => 0.15 * g * k * k), t, d);
        osc(t, d, tone, 200).frequency.setValueCurveAtTime(curve(64, (k) => 200 + 1400 * k * k), t, d);
      },
      whoosh(t) {
        const env = gain(0, fx);
        env.gain.setValueCurveAtTime(curve(48, (k) => 0.35 * Math.pow(Math.sin(Math.PI * k), 2)), t, 0.7);
        noiseSrc(t, 0.7, biquad('bandpass', 1730, 0.4, env));
      },
      impact(t) {
        const sat = shaper(A.impactCurve, gain(0.9, fx));
        const boom = gain(0, sat); boom.gain.setValueAtTime(1, t); boom.gain.setTargetAtTime(0, t, 1 / 1.6);
        const o = osc(t, 3, boom, 80);
        o.frequency.setValueAtTime(80, t); o.frequency.setTargetAtTime(30, t, 1 / 6);
        const hiss = gain(0, sat); hiss.gain.setValueAtTime(0.5, t); hiss.gain.setTargetAtTime(0, t, 1 / 4);
        noiseSrc(t, 3, biquad('lowpass', 3000, 0.707, hiss));
      },
      glitch(t) {
        const len = Math.floor(0.05 * ctx.sampleRate);
        const b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.round((rand() * 2 - 1) * 3) / 3; // bit-crushed
        const s = ctx.createBufferSource(); s.buffer = b;
        const env = gain(0, fx); env.gain.setValueAtTime(0.35, t); env.gain.setTargetAtTime(0, t, 1 / 30);
        s.connect(biquad('bandpass', 950, 0.35, env)); s.start(t);
      },
      duck(t) {
        for (const [g, base] of [[padDuck, 1], [plkDuck, 1], [bassDuck, 0.9]]) {
          g.gain.setValueAtTime(0.4 * base, t); g.gain.setTargetAtTime(base, t, 0.1);
        }
      },
    };
    return { I, out };
  }

  // ---------- arrangement: [time, duration, instrument, ...args] ----------
  const EVENTS = (function arrange() {
    const ev = [];
    const at = (t, d, name, ...args) => ev.push({ t, d, name, args });
    // intro: pad bed, a ticking clock, then a riser into the drop at 0:08
    for (const m of [57, 60, 64, 71]) at(0, 8.2, 'pad', m, 8.2, 0.1);
    for (let i = 0; i < 8; i++) at(i * BEAT, 0.06, 'tick');
    at(5.2, 2.8, 'riser', 2.8, 0.55);
    at(8, 3, 'impact');

    for (let bar = 4; bar < 29; bar++) {
      const t0 = bar * 2, ci = bar % 4;
      if (t0 < 58) for (const m of PROG[ci].slice(0, 4)) at(t0, 2.1, 'pad', m, 2.1, t0 < 54 ? 0.07 : 0.09);
      for (let b = 0; b < 4; b++) {
        const tb = t0 + b * BEAT;
        if (inDrums(tb)) {
          at(tb, 0.5, 'kick', 0.9);
          at(tb, 0.3, 'duck');
          if (b === 1 || b === 3) at(tb, 0.3, 'clap', 0.55);
        }
        for (let e = 0; e < 2; e++) {
          const te = tb + e * 0.25;
          if (te < 58 && (inDrums(te) || (te >= 54 && te < 58))) at(te, 0.24, 'bass', ROOT[ci], (e ? 0.55 : 0.35) * 0.6);
          if (inDrums(te) && te >= 12) at(te, 0.25, 'hat', e === 1 && b === 3, e ? 0.5 : 0.3);
        }
      }
      // 16th-note arpeggio under the feature scenes
      if ((t0 >= 20 && t0 < 42) || (t0 >= 48 && t0 < 58)) {
        for (let s = 0; s < 16; s++) {
          at(t0 + s * 0.125, 0.35, 'pluck', PROG[ci][[0, 2, 4, 3, 1, 4, 2, 3][s % 8]] + 12, 0.35, s % 4 ? 0.1 : 0.14);
        }
      }
    }
    // breakdown 42–46: crash glitches, then the rescue swell
    const jitter = mulberry32(3);
    for (let k = 0; k < 10; k++) at(42.05 + k * 0.23 + jitter() * 0.05, 0.05, 'glitch');
    at(42, 4, 'pad', 45, 4, 0.1);
    at(42, 4, 'pad', 52, 4, 0.06);
    at(44.3, 1.7, 'riser', 1.7, 0.4);
    at(17, 1.2, 'chime');
    at(46, 1.2, 'chime');
    // build 54–58: platform slams, snare roll, riser, impact on the end card
    for (let i = 0; i < 6; i++) at(54 + i * 0.4, 0.5, 'kick', 0.5);
    for (let t = 56, step = 0.125; t < 57.95; t += step) {
      at(t, 0.3, 'clap', 0.25 + 0.35 * (t - 56) / 2);
      if (t + step > 57) step = 0.0625;
    }
    at(55.5, 2.5, 'riser', 2.5, 0.5);
    at(58, 3, 'impact');
    for (const m of [41, 53, 57, 60, 64, 67, 72]) at(58, 6, 'pad', m, 6, 0.09);
    [72, 76, 79, 84].forEach((m, i) => at(58 + i * 0.25, 1.5, 'pluck', m, 1.5, 0.12));
    for (const tc of [12, 20, 28, 34, 42, 48, 54]) at(tc - 0.45, 0.7, 'whoosh');
    return ev.sort((a, b) => a.t - b.t);
  })();

  function fire(I, e, T) {
    if (e.name === 'riser') I.riser(T, e.args[0], e.args[1]);
    else I[e.name](T, ...e.args);
  }

  /** Live player bound to an AudioContext. Position is in seconds, 0..DUR. */
  function createPlayer(ctx) {
    let s = null; // current session

    function pump() {
      if (!s) return;
      const until = s.pos0 + (ctx.currentTime + LOOKAHEAD - s.ctx0); // unwrapped music time
      for (let k = Math.floor(s.done / DUR); k * DUR < until; k++) {
        const lo = Math.max(s.done, k * DUR) - k * DUR, hi = Math.min(until, (k + 1) * DUR) - k * DUR;
        for (const e of EVENTS) {
          if (e.t >= hi) break;
          if (e.t >= lo) fire(s.I, e, s.ctx0 + (k * DUR + e.t - s.pos0));
        }
      }
      s.done = until;
    }

    return {
      duration: DUR,
      get playing() { return !!s; },
      /** Music position in seconds, following the audio clock. */
      position() {
        if (!s) return 0;
        return (s.pos0 + Math.max(0, ctx.currentTime - s.ctx0)) % DUR;
      },
      start(pos) {
        this.stop();
        const { I, out } = session(ctx, ctx.destination, {});
        s = { I, out, pos0: pos, ctx0: ctx.currentTime + 0.05, done: pos };
        // long notes already under way at `pos` (pads) join in mid-note
        for (const e of EVENTS) {
          if (e.name === 'pad' && e.t < pos && e.t + e.d > pos + 0.3) fire(I, e, s.ctx0 - (pos - e.t));
        }
        pump();
        s.timer = setInterval(pump, 25);
      },
      stop() {
        if (!s) return;
        const { out, timer } = s;
        clearInterval(timer);
        out.gain.setTargetAtTime(0, ctx.currentTime, 0.015);
        setTimeout(() => out.disconnect(), 250);
        s = null;
      },
    };
  }

  /** Whole-track offline render (tests, calibration, exporting the video soundtrack). */
  function render(opts = {}) {
    const sr = opts.sampleRate || 48000;
    const ctx = new OfflineAudioContext(2, Math.ceil(DUR * sr), sr);
    const { I } = session(ctx, ctx.destination, opts);
    for (const e of EVENTS) fire(I, e, e.t);
    return ctx.startRendering();
  }

  window.LaunchMusic = { duration: DUR, createPlayer, render };
})();
