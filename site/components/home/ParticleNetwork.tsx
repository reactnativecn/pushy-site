import { useEffect, useRef } from "react";

/**
 * Canvas background animation with:
 *  - A particle network (floating nodes + connection lines)
 *  - Floating business-themed icons: phones, app icons, cloud, signal waves
 *  - Mouse proximity glow and interaction
 *
 * All icons are drawn programmatically on canvas (no external assets).
 * Palette: Pushy brand blue (#4483ED), indigo, violet accents.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

interface FloatingIcon {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  type: "phone" | "app" | "cloud" | "signal" | "code" | "rocket";
  color: string;
}

const PARTICLE_COUNT = 50;
const CONNECTION_DIST = 130;
const MOUSE_RADIUS = 200;
const ICON_COUNT = 12;

const ICON_COLORS = [
  "rgba(68,131,237,",   // brand blue
  "rgba(99,102,241,",   // indigo
  "rgba(139,92,246,",   // violet
  "rgba(59,130,246,",   // blue-500
  "rgba(79,70,229,",    // indigo-600
];

// ---------- icon drawing functions ----------

function drawPhone(ctx: CanvasRenderingContext2D, s: number) {
  // Rounded rectangle phone body
  const w = s * 0.5, h = s * 0.85;
  const r = s * 0.08;
  ctx.beginPath();
  ctx.moveTo(-w / 2 + r, -h / 2);
  ctx.lineTo(w / 2 - r, -h / 2);
  ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  ctx.lineTo(w / 2, h / 2 - r);
  ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  ctx.lineTo(-w / 2 + r, h / 2);
  ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  ctx.lineTo(-w / 2, -h / 2 + r);
  ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  ctx.closePath();
  ctx.stroke();
  // Screen
  const sw = w * 0.7, sh = h * 0.6;
  ctx.strokeRect(-sw / 2, -sh / 2 - s * 0.06, sw, sh);
  // Home button
  ctx.beginPath();
  ctx.arc(0, h / 2 - s * 0.1, s * 0.04, 0, Math.PI * 2);
  ctx.stroke();
}

function drawApp(ctx: CanvasRenderingContext2D, s: number) {
  // Rounded square app icon with inner symbol
  const w = s * 0.65;
  const r = s * 0.14;
  ctx.beginPath();
  ctx.moveTo(-w / 2 + r, -w / 2);
  ctx.lineTo(w / 2 - r, -w / 2);
  ctx.quadraticCurveTo(w / 2, -w / 2, w / 2, -w / 2 + r);
  ctx.lineTo(w / 2, w / 2 - r);
  ctx.quadraticCurveTo(w / 2, w / 2, w / 2 - r, w / 2);
  ctx.lineTo(-w / 2 + r, w / 2);
  ctx.quadraticCurveTo(-w / 2, w / 2, -w / 2, w / 2 - r);
  ctx.lineTo(-w / 2, -w / 2 + r);
  ctx.quadraticCurveTo(-w / 2, -w / 2, -w / 2 + r, -w / 2);
  ctx.closePath();
  ctx.stroke();
  // Play triangle inside
  const ts = s * 0.15;
  ctx.beginPath();
  ctx.moveTo(-ts * 0.5, -ts);
  ctx.lineTo(ts, 0);
  ctx.lineTo(-ts * 0.5, ts);
  ctx.closePath();
  ctx.stroke();
}

function drawCloud(ctx: CanvasRenderingContext2D, s: number) {
  const sc = s * 0.35;
  ctx.beginPath();
  ctx.arc(-sc * 0.5, 0, sc * 0.5, Math.PI * 0.7, Math.PI * 1.9);
  ctx.arc(0, -sc * 0.3, sc * 0.6, Math.PI * 1.1, Math.PI * 0.1);
  ctx.arc(sc * 0.5, 0, sc * 0.45, Math.PI * 1.4, Math.PI * 0.5);
  ctx.lineTo(-sc * 0.8, sc * 0.25);
  ctx.closePath();
  ctx.stroke();
  // Download arrow
  ctx.beginPath();
  ctx.moveTo(0, sc * 0.05);
  ctx.lineTo(0, sc * 0.6);
  ctx.moveTo(-sc * 0.2, sc * 0.4);
  ctx.lineTo(0, sc * 0.6);
  ctx.lineTo(sc * 0.2, sc * 0.4);
  ctx.stroke();
}

function drawSignal(ctx: CanvasRenderingContext2D, s: number) {
  // WiFi / signal arcs
  const radii = [s * 0.15, s * 0.25, s * 0.35];
  for (const r of radii) {
    ctx.beginPath();
    ctx.arc(0, s * 0.1, r, -Math.PI * 0.75, -Math.PI * 0.25);
    ctx.stroke();
  }
  // Center dot
  ctx.beginPath();
  ctx.arc(0, s * 0.1, s * 0.04, 0, Math.PI * 2);
  ctx.fill();
}

function drawCode(ctx: CanvasRenderingContext2D, s: number) {
  // Angle brackets < />
  const sc = s * 0.3;
  ctx.beginPath();
  ctx.moveTo(-sc * 0.3, -sc);
  ctx.lineTo(-sc, 0);
  ctx.lineTo(-sc * 0.3, sc);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(sc * 0.3, -sc);
  ctx.lineTo(sc, 0);
  ctx.lineTo(sc * 0.3, sc);
  ctx.stroke();
  // Slash
  ctx.beginPath();
  ctx.moveTo(sc * 0.15, -sc * 0.8);
  ctx.lineTo(-sc * 0.15, sc * 0.8);
  ctx.stroke();
}

function drawRocket(ctx: CanvasRenderingContext2D, s: number) {
  const sc = s * 0.35;
  // Body
  ctx.beginPath();
  ctx.moveTo(0, -sc);
  ctx.quadraticCurveTo(sc * 0.5, -sc * 0.3, sc * 0.35, sc * 0.5);
  ctx.lineTo(-sc * 0.35, sc * 0.5);
  ctx.quadraticCurveTo(-sc * 0.5, -sc * 0.3, 0, -sc);
  ctx.closePath();
  ctx.stroke();
  // Flame
  ctx.beginPath();
  ctx.moveTo(-sc * 0.15, sc * 0.5);
  ctx.lineTo(0, sc * 0.9);
  ctx.lineTo(sc * 0.15, sc * 0.5);
  ctx.stroke();
  // Fins
  ctx.beginPath();
  ctx.moveTo(-sc * 0.35, sc * 0.5);
  ctx.lineTo(-sc * 0.55, sc * 0.7);
  ctx.lineTo(-sc * 0.2, sc * 0.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(sc * 0.35, sc * 0.5);
  ctx.lineTo(sc * 0.55, sc * 0.7);
  ctx.lineTo(sc * 0.2, sc * 0.5);
  ctx.stroke();
}

const drawFns = { phone: drawPhone, app: drawApp, cloud: drawCloud, signal: drawSignal, code: drawCode, rocket: drawRocket };
const iconTypes: FloatingIcon["type"][] = ["phone", "app", "cloud", "signal", "code", "rocket"];

// ---------- component ----------

function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const icons = useRef<FloatingIcon[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * devicePixelRatio;
      canvas!.height = h * devicePixelRatio;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    function initParticles() {
      particles.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.5 + 0.8,
          opacity: Math.random() * 0.35 + 0.12,
        });
      }
    }

    function initIcons() {
      icons.current = [];
      for (let i = 0; i < ICON_COUNT; i++) {
        icons.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 18 + 22,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.003,
          opacity: Math.random() * 0.15 + 0.1,
          type: iconTypes[i % iconTypes.length],
          color: ICON_COLORS[i % ICON_COLORS.length],
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // --- gradient washes ---
      const g1 = ctx.createRadialGradient(w * 0.15, h * 0.2, 0, w * 0.15, h * 0.2, w * 0.45);
      g1.addColorStop(0, "rgba(68,131,237,0.06)");
      g1.addColorStop(1, "rgba(68,131,237,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.85, h * 0.75, 0, w * 0.85, h * 0.75, w * 0.45);
      g2.addColorStop(0, "rgba(99,102,241,0.05)");
      g2.addColorStop(1, "rgba(99,102,241,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      const pts = particles.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // --- connections between particles ---
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alph = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(68,131,237,${alph})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // --- particles ---
      for (const p of pts) {
        const mdx = p.x - mx;
        const mdy = p.y - my;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const glow = mDist < MOUSE_RADIUS ? 1 - mDist / MOUSE_RADIUS : 0;
        const r = p.radius + glow * 2;
        const o = Math.min(p.opacity + glow * 0.5, 1);

        if (glow > 0.15) {
          const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
          gr.addColorStop(0, `rgba(68,131,237,${glow * 0.2})`);
          gr.addColorStop(1, "rgba(68,131,237,0)");
          ctx.fillStyle = gr;
          ctx.fillRect(p.x - r * 4, p.y - r * 4, r * 8, r * 8);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(68,131,237,${o})`;
        ctx.fill();

        if (mDist < MOUSE_RADIUS) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(99,102,241,${glow * 0.1})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      // --- floating business icons ---
      for (const icon of icons.current) {
        const mdx = icon.x - mx;
        const mdy = icon.y - my;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const glow = mDist < MOUSE_RADIUS * 1.2 ? 1 - mDist / (MOUSE_RADIUS * 1.2) : 0;
        const o = icon.opacity + glow * 0.35;

        ctx.save();
        ctx.translate(icon.x, icon.y);
        ctx.rotate(icon.rotation);
        ctx.strokeStyle = `${icon.color}${o})`;
        ctx.fillStyle = `${icon.color}${o})`;
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        drawFns[icon.type](ctx, icon.size);
        ctx.restore();

        // glow halo around icon when mouse is near
        if (glow > 0.1) {
          const gr = ctx.createRadialGradient(icon.x, icon.y, 0, icon.x, icon.y, icon.size * 1.5);
          gr.addColorStop(0, `${icon.color}${glow * 0.12})`);
          gr.addColorStop(1, `${icon.color}0)`);
          ctx.fillStyle = gr;
          ctx.fillRect(icon.x - icon.size * 1.5, icon.y - icon.size * 1.5, icon.size * 3, icon.size * 3);
        }

        icon.x += icon.vx;
        icon.y += icon.vy;
        icon.rotation += icon.rotSpeed;
        if (icon.x < -icon.size || icon.x > w + icon.size) icon.vx *= -1;
        if (icon.y < -icon.size || icon.y > h + icon.size) icon.vy *= -1;
      }

      animId.current = requestAnimationFrame(draw);
    }

    function handleMouse(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function handleLeave() {
      mouse.current = { x: -9999, y: -9999 };
    }

    resize();
    initParticles();
    initIcons();
    draw();

    const onResize = () => { resize(); initParticles(); initIcons(); };
    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(animId.current);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "auto" }}
    />
  );
}

export default ParticleNetwork;
