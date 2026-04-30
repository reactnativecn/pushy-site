import { Easing, interpolate } from "remotion";

export const clampEase = (
  frame: number,
  range: [number, number],
  output: [number, number],
) =>
  interpolate(frame, range, output, {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const fadeWindow = (
  frame: number,
  enter: [number, number],
  exit: [number, number],
) => {
  const fadeIn = clampEase(frame, enter, [0, 1]);
  const fadeOut = clampEase(frame, exit, [0, 1]);

  return fadeIn * (1 - fadeOut);
};

export const loopSine = (
  frame: number,
  durationInFrames: number,
  phase = 0,
) => Math.sin((frame / durationInFrames) * Math.PI * 2 + phase);
