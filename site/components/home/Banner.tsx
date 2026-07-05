import type { CSSProperties } from "react";
import logo from "../../pages/public/images/logo.svg";
import GitHubButton from "./GitHubButton";

interface BannerProps {
	isMobile?: boolean;
}

const pipelineSteps = [
	{
		title: "打包 JS Bundle",
		detail: "pushy bundle --platform ios",
		done: true,
	},
	{
		title: "计算增量差异",
		detail: "新一代 diff 算法 · 仅 42 KB",
		done: true,
	},
	{
		title: "推送全网 CDN",
		detail: "全国节点同步完成",
		done: true,
	},
	{
		title: "用户设备静默更新",
		detail: "无需重新下载安装",
		done: false,
	},
];

const heroStats = [
	{ value: "KB 级", label: "增量更新包" },
	{ value: "秒级", label: "CDN 全网分发" },
	{ value: "自动", label: "崩溃回滚保护" },
];

function StepCheck() {
	return (
		<svg
			className="w-3.5 h-3.5 text-emerald-400"
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M3.5 8.5l3 3 6-7"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function Banner(_props: BannerProps) {
	return (
		<section className="relative overflow-hidden">
			{/* Background layers */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#0b1830_0%,#04070f_62%)]" />
			<div className="pushy-aurora" aria-hidden="true">
				<div className="pushy-aurora__cyan" />
			</div>
			<div className="pushy-grid-layer" aria-hidden="true" />
			<div className="pushy-noise-layer" aria-hidden="true" />
			{/* Horizon line */}
			<div
				className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
				aria-hidden="true"
			/>

			<div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-16 lg:gap-10 pt-24 pb-24 lg:pt-32 lg:pb-32">
					{/* ---- Left: copy ---- */}
					<div className="max-w-2xl">
						<a
							href="/docs/skills"
							data-reveal
							className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur px-4 py-1.5 text-sm text-slate-300 hover:border-blue-400/40 hover:text-white transition-colors duration-300 mb-10"
						>
							<span className="relative flex w-2 h-2">
								<span className="pushy-live-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
							</span>
							官方 Skill 已上线 · AI 一句话完成接入
							<span className="text-blue-400 group-hover:translate-x-0.5 transition-transform duration-300">
								→
							</span>
						</a>

						<h1
							data-reveal
							style={{ "--reveal-delay": "80ms" } as CSSProperties}
							className="text-[2.75rem] leading-[1.12] sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-slate-50 mb-7"
						>
							让每一次发布
							<br />
							<span className="bg-clip-text text-transparent bg-[linear-gradient(100deg,#38bdf8_0%,#6d8dfa_45%,#a78bfa_90%)]">
								秒级抵达用户
							</span>
						</h1>

						<p
							data-reveal
							style={{ "--reveal-delay": "160ms" } as CSSProperties}
							className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-xl mb-11"
						>
							Pushy 是为 React Native 打造的热更新服务。KB 级增量包、全网 CDN
							分发、崩溃自动回滚——修复与新功能即刻上线，
							<span className="text-slate-200">无需等待应用商店审核</span>。
						</p>

						<div
							data-reveal
							style={{ "--reveal-delay": "240ms" } as CSSProperties}
							className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14"
						>
							<a href="/docs/skills" className="w-full sm:w-auto">
								<button
									type="button"
									className="pushy-btn-primary w-full sm:w-auto px-8 py-[15px] rounded-full text-base font-bold text-white bg-[linear-gradient(100deg,#2563eb,#4f46e5)] shadow-[0_8px_32px_rgba(59,130,246,0.35)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.45)] hover:-translate-y-0.5 transition-all duration-300"
								>
									AI 自动接入
								</button>
							</a>
							<a href="/docs/getting-started" className="w-full sm:w-auto">
								<button
									type="button"
									className="w-full sm:w-auto px-8 py-[15px] rounded-full text-base font-semibold text-slate-200 border border-white/12 bg-white/[0.04] backdrop-blur hover:bg-white/[0.09] hover:border-white/25 hover:-translate-y-0.5 transition-all duration-300"
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

						<dl
							data-reveal
							style={{ "--reveal-delay": "320ms" } as CSSProperties}
							className="grid grid-cols-3 gap-6 border-t border-white/[0.08] pt-8 max-w-xl"
						>
							{heroStats.map((stat) => (
								<div key={stat.label}>
									<dt className="sr-only">{stat.label}</dt>
									<dd className="text-2xl sm:text-[1.7rem] font-extrabold tracking-tight text-slate-50">
										{stat.value}
									</dd>
									<dd className="mt-1 text-sm text-slate-500">{stat.label}</dd>
								</div>
							))}
						</dl>
					</div>

					{/* ---- Right: release pipeline visual ---- */}
					<div
						data-reveal
						style={{ "--reveal-delay": "200ms" } as CSSProperties}
						className="relative hidden lg:block"
						aria-hidden="true"
					>
						{/* Glow behind the card */}
						<div className="absolute -inset-8 bg-[radial-gradient(closest-side,rgba(59,130,246,0.16),transparent)] blur-2xl" />

						<div className="pushy-float relative rounded-3xl border border-white/[0.08] bg-[#0a1120]/80 backdrop-blur-xl shadow-[0_32px_80px_rgba(2,6,23,0.6)] p-7">
							{/* Card header */}
							<div className="flex items-center justify-between mb-7">
								<div className="flex items-center gap-3">
									<img src={logo} alt="" className="w-9 h-9" />
									<div>
										<div className="text-sm font-bold text-slate-100">
											release · v2.4.1
										</div>
										<div className="text-xs text-slate-500 mt-0.5">
											生产环境 · iOS + Android
										</div>
									</div>
								</div>
								<span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 text-xs font-medium text-emerald-300">
									<span className="pushy-live-dot w-1.5 h-1.5 rounded-full bg-emerald-400" />
									发布中
								</span>
							</div>

							{/* Pipeline steps */}
							<div className="relative">
								<div className="pushy-pipeline__rail" />
								<ul className="space-y-6">
									{pipelineSteps.map((step) => (
										<li key={step.title} className="relative flex gap-4">
											<span
												className={`relative z-10 flex w-9 h-9 shrink-0 items-center justify-center rounded-full border ${
													step.done
														? "border-emerald-400/30 bg-emerald-400/10"
														: "border-blue-400/40 bg-blue-500/15"
												}`}
											>
												{step.done ? (
													<StepCheck />
												) : (
													<span className="pushy-live-dot w-2 h-2 rounded-full bg-blue-400" />
												)}
											</span>
											<div className="min-w-0 pt-0.5">
												<div className="text-[15px] font-semibold text-slate-100">
													{step.title}
												</div>
												<div className="text-[13px] text-slate-500 font-mono mt-0.5 truncate">
													{step.detail}
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>

							{/* Progress */}
							<div className="mt-7">
								<div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
									<span>全量用户覆盖</span>
									<span className="font-mono text-slate-300">98%</span>
								</div>
								<div className="pushy-progress" />
							</div>
						</div>

						{/* Floating toast: silent update delivered */}
						<div className="pushy-float pushy-float--late absolute -bottom-9 -left-8 rounded-2xl border border-white/[0.08] bg-[#0d1526]/90 backdrop-blur-xl shadow-[0_20px_48px_rgba(2,6,23,0.55)] px-5 py-4 flex items-center gap-3.5">
							<span className="flex w-10 h-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2563eb,#7c3aed)] text-white shadow-[0_6px_16px_rgba(79,70,229,0.4)]">
								<svg
									className="w-5 h-5"
									viewBox="0 0 24 24"
									fill="none"
									aria-hidden="true"
								>
									<path
										d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z"
										stroke="currentColor"
										strokeWidth="1.8"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
							<div>
								<div className="text-sm font-bold text-slate-100">
									新版本已静默送达
								</div>
								<div className="text-xs text-slate-500 mt-0.5 font-mono">
									v2.4.1 · 42 KB · 无感更新
								</div>
							</div>
							<StepCheck />
						</div>

						{/* Floating chip: skip review */}
						<div className="pushy-float absolute -top-7 -right-5 rounded-full border border-white/[0.08] bg-[#0d1526]/90 backdrop-blur-xl px-4 py-2 text-xs font-medium text-slate-300 shadow-[0_12px_32px_rgba(2,6,23,0.5)]">
							🚀 可灰度，可全量，可回滚
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Banner;
