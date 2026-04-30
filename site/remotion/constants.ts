export const HERO_WIDTH = 1920;
export const HERO_HEIGHT = 1080;
export const HERO_FPS = 30;
export const HERO_DURATION_SECONDS = 10;
export const HERO_TOTAL_FRAMES = HERO_FPS * HERO_DURATION_SECONDS;

export const COLORS = {
  bg0: "#020611",
  bg1: "#061224",
  bg2: "#0a1020",
  graphite: "#101827",
  line: "rgba(116, 226, 255, 0.2)",
  cyan: "#62e8ff",
  blue: "#4483ed",
  violet: "#9d7bff",
  green: "#70f0c3",
  amber: "#f3b15d",
  white: "#f7fbff",
} as const;

export type NodeKind =
  | "cli"
  | "admin"
  | "api"
  | "worker"
  | "cdn"
  | "sdk"
  | "app"
  | "rollback";

export type ArchitectureNode = {
  id: NodeKind;
  label: string;
  detail: string;
  x: number;
  y: number;
  width: number;
  accent: string;
  phase: number;
};

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "cli",
    label: "CLI",
    detail: "publish",
    x: 820,
    y: 292,
    width: 166,
    accent: COLORS.cyan,
    phase: 0.05,
  },
  {
    id: "admin",
    label: "Admin",
    detail: "bind",
    x: 930,
    y: 548,
    width: 184,
    accent: COLORS.violet,
    phase: 0.52,
  },
  {
    id: "api",
    label: "Server API",
    detail: "release metadata",
    x: 1156,
    y: 414,
    width: 222,
    accent: COLORS.blue,
    phase: 0.16,
  },
  {
    id: "worker",
    label: "Diff Worker",
    detail: "async packages",
    x: 1350,
    y: 246,
    width: 224,
    accent: COLORS.violet,
    phase: 0.34,
  },
  {
    id: "cdn",
    label: "CDN",
    detail: "global delivery",
    x: 1568,
    y: 424,
    width: 184,
    accent: COLORS.cyan,
    phase: 0.72,
  },
  {
    id: "sdk",
    label: "SDK",
    detail: "checkUpdate",
    x: 1318,
    y: 672,
    width: 190,
    accent: COLORS.green,
    phase: 0.88,
  },
  {
    id: "app",
    label: "RN App",
    detail: "apply + markSuccess",
    x: 1586,
    y: 736,
    width: 222,
    accent: COLORS.green,
    phase: 0.28,
  },
  {
    id: "rollback",
    label: "Rollback",
    detail: "startup guard",
    x: 1082,
    y: 764,
    width: 202,
    accent: COLORS.amber,
    phase: 0.64,
  },
];

export type DataPath = {
  from: NodeKind;
  to: NodeKind;
  phase: number;
  accent: string;
  reverse?: boolean;
};

export const DATA_PATHS: DataPath[] = [
  { from: "cli", to: "api", phase: 0.0, accent: COLORS.cyan },
  { from: "admin", to: "api", phase: 0.18, accent: COLORS.violet },
  { from: "api", to: "worker", phase: 0.32, accent: COLORS.violet },
  { from: "worker", to: "cdn", phase: 0.44, accent: COLORS.cyan },
  { from: "api", to: "sdk", phase: 0.58, accent: COLORS.blue },
  { from: "sdk", to: "app", phase: 0.72, accent: COLORS.green },
  { from: "cdn", to: "app", phase: 0.82, accent: COLORS.cyan },
  { from: "rollback", to: "api", phase: 0.92, accent: COLORS.amber, reverse: true },
];

export const POSTER_FRAME = 96;
