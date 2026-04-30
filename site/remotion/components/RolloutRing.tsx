import { COLORS } from "../constants";
import { loopProgress, TAU } from "./math";

export type RolloutRingProps = {
  frame: number;
  durationInFrames: number;
};

const segments = [
  { label: "1%", angle: -78, phase: 0.0 },
  { label: "10%", angle: -16, phase: 0.18 },
  { label: "50%", angle: 48, phase: 0.36 },
  { label: "100%", angle: 116, phase: 0.54 },
];

export const RolloutRing = ({ frame, durationInFrames }: RolloutRingProps) => {
  const progress = loopProgress(frame, durationInFrames, 0.22);
  const dashOffset = 276 - progress * 276;
  const sweep = Math.sin(progress * TAU) * 6;

  return (
    <svg
      width="282"
      height="282"
      viewBox="0 0 282 282"
      style={{
        position: "absolute",
        left: 1410,
        top: 126,
        overflow: "visible",
        filter: "drop-shadow(0 0 18px rgba(98,232,255,0.18))",
      }}
    >
      <circle
        cx="141"
        cy="141"
        r="106"
        fill="rgba(255,255,255,0.018)"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="1"
      />
      <circle
        cx="141"
        cy="141"
        r="91"
        fill="none"
        stroke="rgba(98,232,255,0.12)"
        strokeWidth="8"
        strokeDasharray="28 18"
        strokeLinecap="round"
        transform={`rotate(${progress * 360 - 90} 141 141)`}
      />
      <circle
        cx="141"
        cy="141"
        r="69"
        fill="none"
        stroke={COLORS.green}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="276 438"
        strokeDashoffset={dashOffset}
        opacity="0.76"
        transform={`rotate(${-86 + sweep} 141 141)`}
      />
      <text
        x="141"
        y="130"
        textAnchor="middle"
        fill="rgba(247,251,255,0.82)"
        style={{
          fontSize: 23,
          fontWeight: 650,
          letterSpacing: 0,
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        Rollout
      </text>
      <text
        x="141"
        y="158"
        textAnchor="middle"
        fill="rgba(98,232,255,0.72)"
        style={{
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: 0,
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        staged release
      </text>
      {segments.map((segment) => {
        const segmentProgress = loopProgress(
          frame,
          durationInFrames,
          segment.phase,
        );
        const active = Math.pow(Math.sin(segmentProgress * Math.PI), 2.2);
        const angle = ((segment.angle - 90) * Math.PI) / 180;
        const x = 141 + Math.cos(angle) * 120;
        const y = 141 + Math.sin(angle) * 120;

        return (
          <text
            key={segment.label}
            x={x}
            y={y}
            textAnchor="middle"
            fill={active > 0.56 ? COLORS.white : "rgba(247,251,255,0.42)"}
            opacity={0.48 + active * 0.42}
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 0,
              fontFamily:
                "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
            }}
          >
            {segment.label}
          </text>
        );
      })}
    </svg>
  );
};
