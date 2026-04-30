import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundPlate } from "./components/BackgroundPlate";
import { PhoneComposite } from "./components/PhoneComposite";
import { UpdateStatusCard } from "./components/UpdateStatusCard";
import { CheckMarkBurst } from "./components/CheckMarkBurst";
import { loopSine } from "./animation";

export type PushyHeroLoopProps = {
  statusLabel: string;
  cardLabel: string;
};

export const PushyHeroLoop = ({
  statusLabel,
  cardLabel,
}: PushyHeroLoopProps) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const drift = loopSine(frame, durationInFrames);
  const breathe = loopSine(frame, durationInFrames, Math.PI / 2);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#d9d0c3",
        overflow: "hidden",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <Img
        src={staticFile("hero-loop/office-phone-base.png")}
        style={{
          position: "absolute",
          inset: -22,
          width: "calc(100% + 44px)",
          height: "calc(100% + 44px)",
          objectFit: "cover",
          transform: `translate3d(${drift * 9}px, ${breathe * 5}px, 0) scale(${1.018 + breathe * 0.002})`,
          filter: "saturate(1.02) contrast(0.98)",
        }}
      />

      <BackgroundPlate frame={frame} durationInFrames={durationInFrames} />
      <PhoneComposite frame={frame} durationInFrames={durationInFrames} statusLabel={statusLabel} />
      <UpdateStatusCard frame={frame} label={cardLabel} />
      <CheckMarkBurst frame={frame} />
    </AbsoluteFill>
  );
};
