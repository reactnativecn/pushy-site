import type { CSSProperties, ReactNode } from "react";

interface HealthPointProps {
	title: string;
	children: ReactNode;
	delay: string;
}

function HealthPoint({ title, children, delay }: HealthPointProps) {
	return (
		<div
			data-reveal
			style={{ "--reveal-delay": delay } as CSSProperties}
			className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5"
		>
			<div className="flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
					<svg
						className="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						aria-hidden="true"
					>
						<path d="m5 12 4 4L19 6" />
					</svg>
				</span>
				<h3 className="text-base font-bold text-slate-100">{title}</h3>
			</div>
			<p className="mt-3 text-sm leading-6 text-slate-400">{children}</p>
		</div>
	);
}

function HealthSection() {
	return (
		<section className="relative overflow-hidden py-28">
			<div
				className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent"
				aria-hidden="true"
			/>
			<div
				className="absolute left-1/2 top-20 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-3xl"
				aria-hidden="true"
			/>

			<div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
				<div className="grid items-center gap-14 lg:grid-cols-[0.86fr_1.14fr]">
					<div>
						<p
							data-reveal
							className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300/90"
						>
							发布风险控制
						</p>
						<h2
							data-reveal
							style={{ "--reveal-delay": "80ms" } as CSSProperties}
							className="text-3xl font-extrabold leading-tight tracking-tight text-slate-50 md:text-[2.6rem]"
						>
							热更新出问题，
							<span className="bg-[linear-gradient(100deg,#34d399,#38bdf8)] bg-clip-text text-transparent">
								及时发现，及时止损
							</span>
						</h2>
						<p
							data-reveal
							style={{ "--reveal-delay": "160ms" } as CSSProperties}
							className="mt-5 text-lg leading-relaxed text-slate-400"
						>
							持续观察每次发布的运行情况。发现异常后及时提醒并自动暂停，避免问题继续扩大。
						</p>

						<div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
							<HealthPoint title="看清风险" delay="200ms">
								每次发布是否稳定，一目了然。
							</HealthPoint>
							<HealthPoint title="及时预警" delay="280ms">
								异常刚刚出现，就能尽早发现。
							</HealthPoint>
							<HealthPoint title="自动止损" delay="360ms">
								风险过高时自动暂停，保护更多用户。
							</HealthPoint>
						</div>

						<div
							data-reveal
							style={{ "--reveal-delay": "440ms" } as CSSProperties}
							className="mt-7 flex flex-wrap items-center gap-4"
						>
							<a
								href="/docs/api"
								className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
							>
								了解版本健康度 <span aria-hidden="true">→</span>
							</a>
						</div>
					</div>

					<figure
						data-reveal
						style={{ "--reveal-delay": "120ms" } as CSSProperties}
						className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-slate-950/70 p-2 shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
					>
						<div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
						<img
							src="/images/version-health-dashboard.png"
							alt="Pushy 版本健康度面板，按热更版本和原生包展示下载、Patch、启动及回滚数据"
							className="w-full rounded-[1.1rem]"
							loading="lazy"
						/>
						<figcaption className="sr-only">
							Pushy Admin 版本健康度本地示例数据
						</figcaption>
					</figure>
				</div>
			</div>
		</section>
	);
}

export default HealthSection;
