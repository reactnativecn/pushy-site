import { interpolate } from "remotion";
import { loopSine } from "../animation";

type BackgroundPlateProps = {
  frame: number;
  durationInFrames: number;
};

export const BackgroundPlate = ({
  frame,
  durationInFrames,
}: BackgroundPlateProps) => {
  const sweep = (loopSine(frame, durationInFrames, Math.PI * 0.2) + 1) / 2;
  const sweepX = interpolate(sweep, [0, 1], [900, 1320]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(248,244,236,0.86) 0%, rgba(246,239,228,0.72) 30%, rgba(243,233,219,0.28) 48%, rgba(12,18,29,0.1) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.02) 42%, rgba(26,24,22,0.28) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: sweepX,
          top: 120,
          width: 360,
          height: 760,
          transform: "rotate(12deg)",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.16), rgba(255,255,255,0))",
          filter: "blur(22px)",
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 180px rgba(50,38,25,0.15)",
        }}
      />
    </>
  );
};
