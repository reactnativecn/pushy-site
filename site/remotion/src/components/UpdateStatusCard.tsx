import { interpolate } from "remotion";
import { fadeWindow } from "../animation";

type UpdateStatusCardProps = {
  frame: number;
  label: string;
};

export const UpdateStatusCard = ({ frame, label }: UpdateStatusCardProps) => {
  const visible = fadeWindow(frame, [55, 88], [188, 238]);
  const lift = interpolate(visible, [0, 1], [16, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 1008,
        top: 362,
        width: 216,
        height: 78,
        borderRadius: 22,
        padding: "16px 18px",
        opacity: visible,
        transform: `translate3d(${lift * -0.4}px, ${lift}px, 0) rotate(-2deg)`,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.88), rgba(250,245,235,0.74))",
        boxShadow:
          "0 24px 64px rgba(41,32,24,0.18), inset 0 0 0 1px rgba(255,255,255,0.68)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 14,
            background: "linear-gradient(135deg, #58cfa1, #f0c86b)",
            boxShadow: "0 10px 24px rgba(88,207,161,0.28)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 15,
              height: 8,
              borderLeft: "3px solid rgba(255,255,255,0.95)",
              borderBottom: "3px solid rgba(255,255,255,0.95)",
              transform: "rotate(-45deg) translate(1px, -1px)",
            }}
          />
        </div>
        <div>
          <div
            style={{
              color: "#23342f",
              fontSize: 19,
              fontWeight: 760,
              lineHeight: 1,
              letterSpacing: 0,
            }}
          >
            {label}
          </div>
          <div
            style={{
              marginTop: 8,
              width: 102,
              height: 7,
              borderRadius: 999,
              background: "rgba(35,52,47,0.14)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
