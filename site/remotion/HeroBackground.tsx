import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { ArchitectureNodes } from "./components/ArchitectureNodes";
import { AmbientGrid } from "./components/AmbientGrid";
import { COLORS } from "./constants";

export type HeroBackgroundProps = {
  frameOverride?: number;
};

export const HeroBackground = ({ frameOverride }: HeroBackgroundProps) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const activeFrame = frameOverride ?? frame;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg0,
        color: COLORS.white,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        overflow: "hidden",
      }}
    >
      <AmbientGrid frame={activeFrame} durationInFrames={durationInFrames} />
      <ArchitectureNodes
        frame={activeFrame}
        durationInFrames={durationInFrames}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 78% 48%, transparent 0%, transparent 42%, rgba(2,6,17,0.18) 71%, rgba(2,6,17,0.56) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "42%",
          background:
            "linear-gradient(90deg, rgba(2,6,17,0.82) 0%, rgba(2,6,17,0.68) 48%, rgba(2,6,17,0.08) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 180px rgba(0,0,0,0.62)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
