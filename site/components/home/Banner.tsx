import type { CSSProperties } from "react";
import GitHubButton from "./GitHubButton";

interface BannerProps {
	isMobile?: boolean;
}

const heroStats = [
	{ value: "KB 级", label: "增量更新包" },
	{ value: "秒级", label: "CDN 全球分发" },
	{ value: "自动", label: "崩溃回滚保护" },
];

function Banner(_props: BannerProps) {
	return (
		<section className="relative overflow-hidden min-h-[90vh] lg:min-h-[96vh] flex items-center">
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
						<div className="flex flex-wrap items-center gap-3 mb-8 sm:mb-10">
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

						<h1 className="text-[2.75rem] leading-[1.12] sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-white mb-7 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
							让每一次发布
							<br />
							<span className="bg-clip-text text-transparent bg-[linear-gradient(100deg,#38bdf8_0%,#818cf8_50%,#c084fc_100%)]">
								秒级抵达用户
							</span>
						</h1>

						<p className="text-lg sm:text-xl text-slate-100 leading-relaxed max-w-xl mb-11 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] font-normal">
							Pushy 是为 React Native 打造的热更新服务。KB 级增量包、全球 CDN
							分发、崩溃自动回滚——修复与新功能即刻上线，
							<span className="text-white font-semibold">无需等待应用商店审核</span>。
						</p>

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

						<dl className="grid grid-cols-3 gap-6 border-t border-white/15 pt-8 max-w-xl">
							{heroStats.map((stat) => (
								<div key={stat.label}>
									<dt className="sr-only">{stat.label}</dt>
									<dd className="text-2xl sm:text-[1.7rem] font-extrabold tracking-tight text-white drop-shadow">
										{stat.value}
									</dd>
									<dd className="mt-1 text-sm text-slate-300">{stat.label}</dd>
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
