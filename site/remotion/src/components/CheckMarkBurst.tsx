import { Easing, interpolate } from "remotion";
import { fadeWindow } from "../animation";

type CheckMarkBurstProps = {
  frame: number;
};

export const CheckMarkBurst = ({ frame }: CheckMarkBurstProps) => {
  const visible = fadeWindow(frame, [142, 166], [218, 254]);
  const draw = interpolate(frame, [146, 178], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(draw, [0, 1], [0.88, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: 1394,
        top: 486,
        width: 82,
        height: 82,
        borderRadius: 999,
        opacity: visible,
        transform: `scale(${scale})`,
        background: "rgba(241,255,247,0.72)",
        boxShadow:
          "0 18px 54px rgba(67,136,103,0.22), inset 0 0 0 1px rgba(255,255,255,0.72)",
        backdropFilter: "blur(13px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <path
          d="M11 23.5L18.3 30.8L33.5 14.8"
          stroke="#2f9b6d"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="40"
          strokeDashoffset={40 - draw * 40}
        />
      </svg>
    </div>
  );
};
