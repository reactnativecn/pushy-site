import { useEffect, useRef, useState } from "react";
import GitHubButton from "./GitHubButton";

interface BannerProps {
	isMobile?: boolean;
}

/** Chapters of the launch film (seconds), mirrored by the rail under it. */
const chapters = [
	{ id: "ship", label: "一条命令发布", start: 12, end: 20 },
	{ id: "delta", label: "增量更新 3.4 KB", start: 20, end: 28 },
	{ id: "hermes", label: "为 Hermes 而生", start: 28, end: 34 },
	{ id: "rollout", label: "灰度与崩溃回滚", start: 34, end: 42 },
	{ id: "rescue", label: "原生冷启动自愈", start: 42, end: 48 },
	{ id: "mcp", label: "MCP · AI 排查", start: 48, end: 54 },
];

type LaunchPlayer = {
	seek(time: number): void;
	setVisible(visible: boolean): void;
	subscribe(listener: (time: number, playing: boolean) => void): () => void;
};

function ChapterRail({ player }: { player: LaunchPlayer | null }) {
	const [active, setActive] = useState(-1);
	const fills = useRef<(HTMLSpanElement | null)[]>([]);

	// The film reports its clock every frame; progress is written straight to
	// the DOM and React only re-renders when the active chapter changes.
	useEffect(() => {
		if (!player) return;
		let last = -2;
		return player.subscribe((t) => {
			let current = -1;
			chapters.forEach((c, i) => {
				const k = Math.min(1, Math.max(0, (t - c.start) / (c.end - c.start)));
				const fill = fills.current[i];
				if (fill) fill.style.transform = `scaleX(${k})`;
				if (t >= c.start && t < c.end) current = i;
			});
			if (current !== last) {
				last = current;
				setActive(current);
			}
		});
	}, [player]);

	return (
		<ol className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-5">
			{chapters.map((c, i) => (
				<li key={c.id}>
					<button
						type="button"
						onClick={() => player?.seek(c.start)}
						aria-current={active === i ? "step" : undefined}
						className="group w-full text-left"
					>
						<span className="block h-[3px] rounded-full bg-white/10 overflow-hidden">
							<span
								ref={(el) => {
									fills.current[i] = el;
								}}
								className="block h-full w-full origin-left scale-x-0 rounded-full bg-[linear-gradient(90deg,#38bdf8,#818cf8)]"
							/>
						</span>
						<span className="mt-3 flex items-baseline gap-2">
							<span className="font-mono text-xs text-slate-500">
								{String(i + 1).padStart(2, "0")}
							</span>
							<span
								className={`text-sm transition-colors duration-300 ${
									active === i
										? "text-white font-semibold"
										: "text-slate-400 group-hover:text-slate-200"
								}`}
							>
								{c.label}
							</span>
						</span>
					</button>
				</li>
			))}
		</ol>
	);
}

/**
 * The launch film is the animation page itself (public/launch/), rendered live in a
 * same-origin frame: it plays muted on its own, and its own controls turn on the
 * Web Audio soundtrack (the click has to land inside the frame to unlock audio).
 */
function LaunchFilm() {
	const frameRef = useRef<HTMLIFrameElement>(null);
	const [player, setPlayer] = useState<LaunchPlayer | null>(null);

	useEffect(() => {
		const frame = frameRef.current;
		if (!frame) return;
		const attach = () => {
			const win = frame.contentWindow as (Window & { launchPlayer?: LaunchPlayer }) | null;
			if (win?.launchPlayer) setPlayer(win.launchPlayer);
		};
		attach(); // the frame may have finished loading before hydration
		frame.addEventListener("load", attach);
		return () => frame.removeEventListener("load", attach);
	}, []);

	// Stop rendering (and the soundtrack) while the film is scrolled out of view.
	useEffect(() => {
		const frame = frameRef.current;
		if (!player || !frame || typeof IntersectionObserver === "undefined") return;
		const observer = new IntersectionObserver(
			([entry]) => player.setVisible(entry.isIntersecting),
			{ threshold: 0.2 },
		);
		observer.observe(frame);
		return () => observer.disconnect();
	}, [player]);

	return (
		<div className="relative mt-14 sm:mt-16 lg:mt-20 mx-auto max-w-[1180px]">
			<div className="pushy-launch-glow" aria-hidden="true" />
			<div className="pushy-launch-frame relative rounded-[18px] sm:rounded-[28px] p-[5px] sm:p-[7px]">
				<div className="relative overflow-hidden rounded-[13px] sm:rounded-[21px] bg-[#05060a] aspect-video">
					<iframe
						ref={frameRef}
						src="/launch/index.html"
						title="Pushy 发布动画：一条命令发布、3.4 KB 增量更新、灰度与崩溃回滚、原生冷启动自愈、MCP 排查"
						className="absolute inset-0 h-full w-full border-0"
					/>
				</div>
			</div>
			<ChapterRail player={player} />
		</div>
	);
}

function Banner(_props: BannerProps) {
	return (
		<section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-24 sm:pb-32">
			<div className="pushy-aurora" aria-hidden="true">
				<div className="pushy-aurora__cyan" />
			</div>
			<div className="pushy-grid-layer" aria-hidden="true" />
			<div className="pushy-noise-layer" aria-hidden="true" />

			<div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					<div className="flex flex-wrap items-center justify-center gap-3 mb-7 sm:mb-9">
						<a
							href="/docs/skills"
							className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md px-4 py-1.5 text-sm text-slate-200 hover:border-blue-400/60 hover:text-white transition-all duration-300"
						>
							<span className="relative flex w-2 h-2">
								<span className="pushy-live-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
							</span>
							<span>官方 Skill 已上线 · AI 一句话完成接入</span>
							<span className="text-blue-400 group-hover:translate-x-0.5 transition-transform duration-300">
								→
							</span>
						</a>
						<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-1.5 text-sm text-slate-300">
							<span className="w-2 h-2 rounded-full bg-violet-400" />
							HarmonyOS 已支持
						</span>
					</div>

					<h1 className="text-[2.6rem] leading-[1.1] sm:text-6xl lg:text-[5.25rem] font-extrabold tracking-tight text-white">
						发布，
						<br className="sm:hidden" />
						<span className="bg-clip-text text-transparent bg-[linear-gradient(100deg,#38bdf8_0%,#818cf8_50%,#c084fc_100%)]">
							就该这么快。
						</span>
					</h1>

					<p className="mt-6 sm:mt-7 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
						Pushy 是为 React Native 打造的热更新服务。改完代码，几秒钟触达每一台设备——无需等待应用商店审核，单行修改只需下发
						3.4 KB。
					</p>

					<div className="mt-9 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
						<a href="/docs/skills" className="w-full sm:w-auto">
							<button
								type="button"
								className="pushy-btn-primary w-full sm:w-auto px-8 py-[15px] rounded-full text-base font-bold text-white bg-[linear-gradient(100deg,#2563eb,#4f46e5)] shadow-[0_8px_32px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_44px_rgba(79,70,229,0.55)] hover:-translate-y-0.5 transition-all duration-300"
							>
								AI 自动接入
							</button>
						</a>
						<a href="/docs/getting-started" className="w-full sm:w-auto">
							<button
								type="button"
								className="w-full sm:w-auto px-8 py-[15px] rounded-full text-base font-semibold text-white border border-white/20 bg-white/[0.04] backdrop-blur-md hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300"
							>
								5 分钟手动接入
							</button>
						</a>
						<div className="pushy-gh-dark scale-125 sm:ml-3 mt-2 sm:mt-0">
							<GitHubButton
								type="stargazers"
								namespace="reactnativecn"
								repo="react-native-update"
							/>
						</div>
					</div>
				</div>

				<LaunchFilm />
			</div>
		</section>
	);
}

export default Banner;
