export const TAU = Math.PI * 2;

export const loopProgress = (
  frame: number,
  durationInFrames: number,
  phase = 0,
) => {
  const raw = frame / durationInFrames + phase;
  return raw - Math.floor(raw);
};

export const wave = (
  frame: number,
  durationInFrames: number,
  phase = 0,
) => Math.sin(loopProgress(frame, durationInFrames, phase) * TAU);

export const pulseEnvelope = (progress: number, power = 1.8) =>
  Math.pow(Math.sin(progress * Math.PI), power);

export const distance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) => Math.hypot(x2 - x1, y2 - y1);
