import { type CSSProperties, useEffect, useState } from "react";
import GitHubButton from "./GitHubButton";

interface BannerProps {
	isMobile?: boolean;
}

const heroSlides = [
	{
		id: "speed",
		tag: "极速交付",
		highlight: "秒级抵达用户",
		description:
			"Pushy 是为 React Native 打造的热更新服务。修复与新功能即刻上线，无需等待应用商店漫长审核。",
		stats: [
			{ value: "0 秒", label: "免应用商店审核" },
			{ value: "秒级", label: "CDN 全球分发" },
			{ value: "自动", label: "崩溃回滚保护" },
		],
	},
	{
		id: "patch",
		tag: "增量差分",
		highlight: "省去 90% 流量",
		description:
			"基于智能 HDiff 差分算法生成微小更新包，几十 KB 即可完成更新，弱网与移动网络下也能丝滑升级。",
		stats: [
			{ value: "42 KB", label: "平均增量体积" },
			{ value: "90%+", label: "节省下行流量" },
			{ value: "静默", label: "后台无感就绪" },
		],
	},
	{
		id: "safety",
		tag: "稳定保障",
		highlight: "自带安全熔断",
		description:
			"遇到未知异常自动检测并秒级回滚到上一稳定版本，杜绝线上崩溃风险，保障核心业务永不中断。",
		stats: [
			{ value: "100%", label: "崩溃自动回滚" },
			{ value: "可灰度", label: "按人群/版本发布" },
			{ value: "秒级", label: "一键暂停撤回" },
		],
	},
	{
		id: "ai",
		tag: "AI 原生",
		highlight: "一句话完成接入",
		description:
			"官方 Skill 与 MCP 工具赋能，AI Agent 自动分析项目架构、安装依赖并完成热更新集成与发布。",
		stats: [
			{ value: "1 句话", label: "AI 自动接入" },
			{ value: "12+ 工具", label: "官方 MCP 赋能" },
			{ value: "三端", label: "iOS / Android / 鸿蒙" },
		],
	},
];

function Banner(_props: BannerProps) {
	const [activeSlide, setActiveSlide] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		if (isPaused) return;
		const timer = setInterval(() => {
			setActiveSlide((prev) => (prev + 1) % heroSlides.length);
		}, 4500);
		return () => clearInterval(timer);
	}, [isPaused]);

	const current = heroSlides[activeSlide];

	return (
		<section
			className="relative overflow-hidden min-h-[90vh] lg:min-h-[96vh] flex items-center"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			{/* 1. Fullscreen Immersive Background Video */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
				<video
					autoPlay
					muted
					loop
					playsInline
					preload="metadata"
					poster="/hero-loop/pushy-hero-loop-poster.jpg"
					className="pushy-hero-bg-video"
				>
					<source
						src="/hero-loop/pushy-hero-loop-av1.mp4"
						type='video/mp4; codecs="av01.0.05M.08"'
					/>
					<source
						src="/hero-loop/pushy-hero-loop.webm"
						type="video/webm; codecs=vp9"
					/>
					<source
						src="/hero-loop/pushy-hero-loop.mp4"
						type="video/mp4"
					/>
				</video>

				{/* Ultra-light lateral protection gradient - ensures text contrast while keeping video bright and vivid */}
				<div className="absolute inset-0 bg-gradient-to-r from-[#04070f]/80 via-[#04070f]/40 to-transparent" />

				{/* Bottom subtle edge fade into LiveStats */}
				<div
					className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-[#04070f]"
					aria-hidden="true"
				/>
			</div>

			{/* 2. Hero Foreground Content (z-10, always visible immediately) */}
			<div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24">
				<div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-10">
					{/* ---- Left: copy & CTAs ---- */}
					<div className="max-w-2xl">
						<div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
							<a
								href="/docs/skills"
								className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-black/45 backdrop-blur-md px-4 py-1.5 text-sm text-slate-100 hover:border-blue-400/60 hover:text-white transition-all duration-300 shadow-xl"
							>
								<span className="relative flex w-2 h-2">
									<span className="pushy-live-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
								</span>
								<span>官方 Skill 已上线 · AI 一句话完成接入</span>
								<span className="text-blue-400 group-hover:translate-x-0.5 transition-transform duration-300">
									→
								</span>
							</a>
							<span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 backdrop-blur-md px-4 py-1.5 text-sm text-slate-200 shadow-lg">
								<span className="w-2 h-2 rounded-full bg-violet-400" />
								HarmonyOS 已支持
							</span>
						</div>

						{/* Headline with dynamic highlight replacement */}
						<h1 className="text-[2.75rem] leading-[1.12] sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
							让每一次发布
							<br />
							<span
								key={activeSlide}
								className="pushy-slide-text bg-clip-text text-transparent bg-[linear-gradient(100deg,#38bdf8_0%,#818cf8_50%,#c084fc_100%)]"
							>
								{current.highlight}
							</span>
						</h1>

						{/* Description dynamic replacement */}
						<p
							key={`desc-${activeSlide}`}
							className="pushy-slide-text text-lg sm:text-xl text-slate-100 leading-relaxed max-w-xl mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] font-normal min-h-[3.8rem]"
						>
							{current.description}
						</p>

						{/* Interactive Highlight Slide Tabs (No progress bar, clean pills) */}
						<div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10">
							{heroSlides.map((slide, idx) => {
								const isActive = idx === activeSlide;
								return (
									<button
										key={slide.id}
										type="button"
										onClick={() => setActiveSlide(idx)}
										className={`group relative flex items-center px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
											isActive
												? "bg-white/20 text-white border border-white/40 shadow-lg backdrop-blur-md"
												: "bg-black/35 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white backdrop-blur-sm"
										}`}
									>
										{slide.tag}
									</button>
								);
							})}
						</div>

						{/* CTA Action Buttons */}
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
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
									className="w-full sm:w-auto px-8 py-[15px] rounded-full text-base font-semibold text-white border border-white/20 bg-black/45 backdrop-blur-md hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300 shadow-xl"
								>
									5 分钟手动接入
								</button>
							</a>
							<div className="pushy-gh-dark scale-125 origin-left sm:ml-3 mt-2 sm:mt-0">
								<GitHubButton
									type="stargazers"
									namespace="reactnativecn"
									repo="react-native-update"
								/>
							</div>
						</div>

						{/* Stats Row linked to current slide (strictly horizontal 3 columns) */}
						<dl
							key={`stats-${activeSlide}`}
							className="pushy-slide-grid grid grid-cols-3 gap-6 border-t border-white/15 pt-8 max-w-xl w-full"
						>
							{current.stats.map((stat) => (
								<div key={stat.label} className="min-w-0">
									<dt className="sr-only">{stat.label}</dt>
									<dd className="text-2xl sm:text-[1.7rem] font-extrabold tracking-tight text-white drop-shadow truncate">
										{stat.value}
									</dd>
									<dd className="mt-1 text-sm text-slate-300 truncate">{stat.label}</dd>
								</div>
							))}
						</dl>
					</div>

					{/* ---- Right: Clean, unblocked view of the video scene with optional discreet corner status ---- */}
					<div className="hidden lg:flex flex-col justify-end items-end h-full min-h-[380px] pointer-events-none">
						<div className="pointer-events-auto rounded-full border border-white/20 bg-black/45 backdrop-blur-md px-4 py-2 text-xs font-medium text-slate-200 shadow-xl flex items-center gap-2 mb-4 hover:border-white/40 transition-colors">
							<span className="w-2 h-2 rounded-full bg-emerald-400 pushy-live-dot" />
							<span>生产环境实时生效 · iOS / Android / HarmonyOS</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Banner;
