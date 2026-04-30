import { COLORS } from "../constants";
import { loopProgress, pulseEnvelope } from "./math";

export type PulseProps = {
  frame: number;
  durationInFrames: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  phase: number;
  accent: string;
  reverse?: boolean;
};

export const Pulse = ({
  frame,
  durationInFrames,
  from,
  to,
  phase,
  accent,
  reverse = false,
}: PulseProps) => {
  const progress = loopProgress(frame, durationInFrames, phase);
  const t = reverse ? 1 - progress : progress;
  const x = from.x + (to.x - from.x) * t;
  const y = from.y + (to.y - from.y) * t;
  const opacity = pulseEnvelope(progress, 2.4) * 0.72;
  const radius = 4 + pulseEnvelope(progress, 1.2) * 3.5;

  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={radius + 11} fill={accent} opacity={0.08} />
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill={COLORS.white}
        opacity={0.88}
      />
      <circle cx={x} cy={y} r={radius * 2.4} fill={accent} opacity={0.18} />
    </g>
  );
};
