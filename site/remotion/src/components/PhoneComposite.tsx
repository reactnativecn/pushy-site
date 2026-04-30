import { Easing, interpolate } from "remotion";
import type { CSSProperties } from "react";
import { fadeWindow, loopSine } from "../animation";

type PhoneCompositeProps = {
  frame: number;
  durationInFrames: number;
  statusLabel: string;
};

const screenShell: CSSProperties = {
  position: "absolute",
  left: 1236,
  top: 351,
  width: 151,
  height: 306,
  borderRadius: 25,
  overflow: "hidden",
  transform: "rotate(12deg)",
  transformOrigin: "50% 50%",
  boxShadow:
    "0 0 0 1px rgba(255,255,255,0.08), inset 0 0 18px rgba(255,255,255,0.06)",
};

export const PhoneComposite = ({
  frame,
  durationInFrames,
  statusLabel,
}: PhoneCompositeProps) => {
  const refresh = fadeWindow(frame, [66, 102], [192, 246]);
  const glow = fadeWindow(frame, [52, 92], [210, 260]);
  const idle = loopSine(frame, durationInFrames);
  const progress = interpolate(frame, [86, 156], [0, 1], {
    easing: Easing.bezier(0.45, 0, 0.2, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        ...screenShell,
        transform: `translate3d(${idle * 1.8}px, ${idle * -1.4}px, 0) rotate(12deg)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(165deg, rgba(20,31,41,0.98), rgba(17,23,33,0.96) 42%, rgba(37,53,61,0.94))",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 10,
          borderRadius: 25,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.11), rgba(255,255,255,0.035))",
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 56,
          top: 12,
          width: 58,
          height: 13,
          borderRadius: 999,
          background: "rgba(2,5,8,0.78)",
        }}
      />

      <div style={{ position: "absolute", inset: "38px 14px 15px" }}>
        <div
          style={{
            color: "rgba(255,255,255,0.86)",
            fontSize: 12,
            fontWeight: 650,
            letterSpacing: 0,
          }}
        >
          Today
        </div>
        <div
          style={{
            marginTop: 9,
            width: 92,
            height: 7,
            borderRadius: 999,
            background: "rgba(255,255,255,0.22)",
          }}
        />
        <div
          style={{
            marginTop: 18,
            height: 74,
            borderRadius: 17,
            padding: 12,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.07))",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
            transform: `translateY(${refresh * -5}px)`,
          }}
        >
          <div
            style={{
              width: 76,
              height: 8,
              borderRadius: 999,
              background: "rgba(255,255,255,0.58)",
            }}
          />
          <div
            style={{
              marginTop: 11,
              width: `${42 + progress * 60}%`,
              height: 8,
              borderRadius: 999,
              background: "linear-gradient(90deg, #91e6c2, #f5d275)",
              boxShadow: "0 0 16px rgba(145,230,194,0.3)",
            }}
          />
          <div
            style={{
              marginTop: 11,
              width: 58,
              height: 7,
              borderRadius: 999,
              background: "rgba(255,255,255,0.2)",
            }}
          />
        </div>

        <div
          style={{
            marginTop: 14,
            height: 46,
            borderRadius: 15,
            background: "rgba(255,255,255,0.1)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
            opacity: 0.86,
            transform: `translateY(${refresh * -3}px)`,
          }}
        />

        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 9px",
            borderRadius: 999,
            color: "#16382e",
            background: "rgba(176,238,203,0.94)",
            fontSize: 10,
            fontWeight: 700,
            opacity: fadeWindow(frame, [132, 154], [218, 250]),
            transform: `translateY(${interpolate(refresh, [0, 1], [8, 0])}px)`,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: "#22a06b",
              boxShadow: "0 0 10px rgba(34,160,107,0.5)",
            }}
          />
          {statusLabel}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: -42,
          top: -70,
          width: 104,
          height: 480,
          transform: `translateX(${glow * 218}px) rotate(9deg)`,
          opacity: glow * 0.68,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.34), rgba(255,255,255,0))",
          filter: "blur(11px)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
};
