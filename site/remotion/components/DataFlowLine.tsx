import { COLORS } from "../constants";
import { distance, loopProgress } from "./math";
import { Pulse } from "./Pulse";

export type DataFlowLineProps = {
  frame: number;
  durationInFrames: number;
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  phase: number;
  accent: string;
  reverse?: boolean;
};

export const DataFlowLine = ({
  frame,
  durationInFrames,
  id,
  from,
  to,
  phase,
  accent,
  reverse = false,
}: DataFlowLineProps) => {
  const length = distance(from.x, from.y, to.x, to.y);
  const progress = loopProgress(frame, durationInFrames, phase);
  const dashOffset = -progress * 42;
  const controlX = (from.x + to.x) / 2;
  const controlY = (from.y + to.y) / 2 - Math.min(72, length * 0.18);
  const path = `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;
  const gradientId = `flow-gradient-${id}`;

  return (
    <g>
      <defs>
        <linearGradient
          id={gradientId}
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={accent} stopOpacity="0.04" />
          <stop offset="52%" stopColor={accent} stopOpacity="0.46" />
          <stop offset="100%" stopColor={COLORS.violet} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d={path}
        fill="none"
        stroke={accent}
        strokeWidth="0.75"
        strokeDasharray="8 18"
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        opacity="0.34"
      />
      <Pulse
        frame={frame}
        durationInFrames={durationInFrames}
        from={from}
        to={to}
        phase={phase}
        accent={accent}
        reverse={reverse}
      />
      <Pulse
        frame={frame}
        durationInFrames={durationInFrames}
        from={from}
        to={to}
        phase={(phase + 0.5) % 1}
        accent={accent}
        reverse={reverse}
      />
    </g>
  );
};
