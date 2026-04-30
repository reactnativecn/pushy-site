import { AbsoluteFill } from "remotion";
import { COLORS, HERO_HEIGHT, HERO_WIDTH } from "../constants";
import { loopProgress, TAU, wave } from "./math";

type AmbientParticle = {
  x: number;
  y: number;
  size: number;
  phase: number;
  drift: number;
  opacity: number;
};

const PARTICLES: AmbientParticle[] = Array.from({ length: 54 }, (_, index) => {
  const column = index % 9;
  const row = Math.floor(index / 9);
  return {
    x: 690 + column * 128 + ((index * 47) % 58),
    y: 118 + row * 132 + ((index * 31) % 70),
    size: 2 + (index % 4) * 0.9,
    phase: (index * 0.137) % 1,
    drift: 8 + (index % 5) * 3,
    opacity: 0.14 + (index % 7) * 0.025,
  };
});

export type AmbientGridProps = {
  frame: number;
  durationInFrames: number;
};

export const AmbientGrid = ({ frame, durationInFrames }: AmbientGridProps) => {
  const slow = loopProgress(frame, durationInFrames, 0.12);
  const gridShiftX = Math.cos(slow * TAU) * 18;
  const gridShiftY = Math.sin(slow * TAU) * 12;

  return (
    <AbsoluteFill
      style={{
        background:
          `radial-gradient(circle at 72% 30%, rgba(98, 232, 255, 0.18), transparent 24%), ` +
          `radial-gradient(circle at 78% 72%, rgba(157, 123, 255, 0.18), transparent 28%), ` +
          `radial-gradient(circle at 24% 58%, rgba(68, 131, 237, 0.08), transparent 34%), ` +
          `linear-gradient(125deg, ${COLORS.bg0} 0%, ${COLORS.bg1} 42%, ${COLORS.bg2} 100%)`,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(98,232,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(98,232,255,0.055) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          backgroundPosition: `${gridShiftX}px ${gridShiftY}px`,
          maskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.18) 34%, rgba(0,0,0,0.92) 64%, rgba(0,0,0,0.82) 100%)",
          opacity: 0.55,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0, rgba(255,255,255,0.025) 49%, rgba(98,232,255,0.1) 50%, rgba(255,255,255,0.025) 51%, transparent 100%)",
          backgroundSize: "280px 100%",
          transform: `translateX(${Math.sin(slow * TAU) * 32}px)`,
          opacity: 0.24,
          mixBlendMode: "screen",
        }}
      />
      {PARTICLES.map((particle, index) => {
        const driftX = Math.cos((slow + particle.phase) * TAU) * particle.drift;
        const driftY =
          Math.sin((slow + particle.phase * 0.7) * TAU) *
          (particle.drift * 0.65);
        const twinkle =
          particle.opacity + wave(frame, durationInFrames, particle.phase) * 0.04;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              borderRadius: 99,
              background: index % 3 === 0 ? COLORS.violet : COLORS.cyan,
              boxShadow: `0 0 ${particle.size * 8}px ${
                index % 3 === 0 ? COLORS.violet : COLORS.cyan
              }`,
              opacity: twinkle,
              transform: `translate(${driftX}px, ${driftY}px)`,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(2,6,17,0.92) 0%, rgba(2,6,17,0.62) 34%, rgba(2,6,17,0.12) 72%, rgba(2,6,17,0.34) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -90,
          top: 0,
          width: HERO_WIDTH * 0.52,
          height: HERO_HEIGHT,
          background:
            "radial-gradient(circle at 42% 52%, rgba(68,131,237,0.12), transparent 46%)",
          opacity: 0.9,
        }}
      />
    </AbsoluteFill>
  );
};
