import {
  ARCHITECTURE_NODES,
  ArchitectureNode,
  COLORS,
  DATA_PATHS,
} from "../constants";
import { DataFlowLine } from "./DataFlowLine";
import { loopProgress, TAU, wave } from "./math";
import { RolloutRing } from "./RolloutRing";

export type ArchitectureNodesProps = {
  frame: number;
  durationInFrames: number;
};

const nodeById = Object.fromEntries(
  ARCHITECTURE_NODES.map((node) => [node.id, node]),
) as Record<ArchitectureNode["id"], ArchitectureNode>;

const MiniGlyph = ({ node }: { node: ArchitectureNode }) => {
  if (node.id === "worker") {
    return (
      <div style={{ display: "flex", gap: 4 }}>
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            style={{
              width: 18,
              height: 10,
              borderRadius: 3,
              border: `1px solid ${node.accent}`,
              opacity: 0.56 + index * 0.14,
            }}
          />
        ))}
      </div>
    );
  }

  if (node.id === "rollback") {
    return (
      <div
        style={{
          width: 24,
          height: 27,
          clipPath: "polygon(50% 0%, 92% 17%, 83% 72%, 50% 100%, 17% 72%, 8% 17%)",
          background: `linear-gradient(180deg, ${node.accent}, rgba(243,177,93,0.16))`,
          opacity: 0.72,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: node.id === "app" ? 7 : 99,
        border: `1px solid ${node.accent}`,
        boxShadow: `0 0 20px ${node.accent}66`,
        background:
          node.id === "api"
            ? `radial-gradient(circle, ${node.accent} 0%, rgba(68,131,237,0.18) 48%, transparent 70%)`
            : "rgba(255,255,255,0.04)",
      }}
    />
  );
};

const NodeCard = ({
  node,
  frame,
  durationInFrames,
}: {
  node: ArchitectureNode;
  frame: number;
  durationInFrames: number;
}) => {
  const breathe = 1 + wave(frame, durationInFrames, node.phase) * 0.012;
  const lift = Math.sin((loopProgress(frame, durationInFrames, node.phase) * TAU)) * 5;
  const glow = 0.22 + (wave(frame, durationInFrames, node.phase + 0.18) + 1) * 0.07;

  return (
    <div
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: node.width,
        minHeight: 82,
        padding: "16px 18px",
        borderRadius: 18,
        border: `1px solid rgba(255,255,255,${0.12 + glow * 0.12})`,
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.13), rgba(255,255,255,0.045))",
        boxShadow: `0 22px 60px rgba(0,0,0,0.32), 0 0 34px ${node.accent}${Math.round(
          glow * 255,
        )
          .toString(16)
          .padStart(2, "0")}`,
        backdropFilter: "blur(18px)",
        transform: `translate(-50%, calc(-50% + ${lift}px)) scale(${breathe})`,
        transformOrigin: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, ${node.accent}22, rgba(255,255,255,0.04))`,
            border: `1px solid ${node.accent}55`,
          }}
        >
          <MiniGlyph node={node} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: 680,
              lineHeight: 1.05,
              letterSpacing: 0,
            }}
          >
            {node.label}
          </div>
          <div
            style={{
              color: "rgba(219,241,255,0.56)",
              fontSize: 13,
              fontWeight: 500,
              lineHeight: 1.4,
              marginTop: 5,
              letterSpacing: 0,
              whiteSpace: "nowrap",
            }}
          >
            {node.detail}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 14,
          bottom: 12,
          display: "flex",
          gap: 5,
          opacity: 0.42,
        }}
      >
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            style={{
              width: 18 - index * 3,
              height: 2,
              borderRadius: 4,
              background: node.accent,
              opacity: 0.9 - index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const ArchitectureNodes = ({
  frame,
  durationInFrames,
}: ArchitectureNodesProps) => {
  const parallaxX =
    Math.cos(loopProgress(frame, durationInFrames, 0.08) * TAU) * 10;
  const parallaxY =
    Math.sin(loopProgress(frame, durationInFrames, 0.18) * TAU) * 8;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `translate(${parallaxX}px, ${parallaxY}px)`,
      }}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        {DATA_PATHS.map((path) => {
          const from = nodeById[path.from];
          const to = nodeById[path.to];
          return (
            <DataFlowLine
              key={`${path.from}-${path.to}`}
              id={`${path.from}-${path.to}`}
              frame={frame}
              durationInFrames={durationInFrames}
              from={from}
              to={to}
              phase={path.phase}
              accent={path.accent}
              reverse={path.reverse}
            />
          );
        })}
      </svg>
      <RolloutRing frame={frame} durationInFrames={durationInFrames} />
      {ARCHITECTURE_NODES.map((node) => (
        <NodeCard
          key={node.id}
          node={node}
          frame={frame}
          durationInFrames={durationInFrames}
        />
      ))}
    </div>
  );
};
