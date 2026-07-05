import type {
	CSSProperties,
	MouseEvent as ReactMouseEvent,
	ReactNode,
} from "react";
import WorldDotMap from "./WorldDotMap";

interface FeatureIconProps {
	children: ReactNode;
	tint: string;
}

function FeatureIcon({ children, tint }: FeatureIconProps) {
	return (
		<span
			className={`inline-flex w-12 h-12 items-center justify-center rounded-2xl border border-white/[0.08] ${tint}`}
			aria-hidden="true"
		>
			<svg
				className="w-6 h-6"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{children}
			</svg>
		</span>
	);
}

const cardBase =
	"pushy-spot group relative rounded-3xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm p-8 overflow-hidden transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.045] hover:-translate-y-1";

const cardGlow = (
	<>
		<div
			className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-blue-500/[0.07] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
			aria-hidden="true"
		/>
		<div className="pushy-spotlight" aria-hidden="true" />
	</>
);

/** Track the cursor inside the hovered card for the spotlight gradient. */
function trackSpotlight(event: ReactMouseEvent<HTMLDivElement>) {
	const card = (event.target as HTMLElement).closest<HTMLElement>(
		".pushy-spot",
	);
	if (!card) {
		return;
	}
	const rect = card.getBoundingClientRect();
	card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
	card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}

function Page1() {
	return (
		<section className="relative py-28 overflow-hidden">
			{/* Section divider glow */}
			<div
				className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
				aria-hidden="true"
			/>

			<div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
				<div className="max-w-2xl mb-16">
					<p
						data-reveal
						className="text-sm font-semibold tracking-[0.2em] text-blue-400/90 uppercase mb-4"
					>
						Why Pushy
					</p>
					<h2
						data-reveal
						style={{ "--reveal-delay": "80ms" } as CSSProperties}
						className="text-3xl md:text-[2.6rem] leading-tight font-extrabold tracking-tight text-slate-50"
					>
						为持续交付而生的
						<span className="bg-clip-text text-transparent bg-[linear-gradient(100deg,#38bdf8,#818cf8)]">
							每一个细节
						</span>
					</h2>
					<p
						data-reveal
						style={{ "--reveal-delay": "160ms" } as CSSProperties}
						className="mt-5 text-lg text-slate-400 leading-relaxed"
					>
						从差量计算、分发加速到异常回滚，Pushy
						把热更新链路上的每一环都打磨到位，让发布成为一件轻松的日常。
					</p>
				</div>

				<div className="grid gap-5 lg:grid-cols-3" onMouseMove={trackSpotlight}>
					{/* 1 — 增量更新（大卡，含差量对比可视化） */}
					<div data-reveal className={`${cardBase} lg:col-span-2`}>
						{cardGlow}
						<div className="relative flex flex-col h-full">
							<FeatureIcon tint="bg-blue-500/10 text-blue-400">
								<rect x="4" y="2.5" width="12" height="19" rx="2.5" />
								<path d="M10 18.5h.01" />
								<path d="M20 8v4m2-2h-4" />
							</FeatureIcon>
							<h3 className="mt-6 text-xl font-bold text-slate-50">增量更新</h3>
							<p className="mt-3 text-[15px] leading-relaxed text-slate-400 max-w-md">
								bsdiff / hdiff 双算法计算差量，只下发真正变化的部分，
								更新包最小可至 KB 级——用户几乎无感知。
							</p>

							<div className="mt-8 space-y-4 max-w-md">
								<div>
									<div className="flex justify-between text-xs text-slate-500 mb-2">
										<span>完整应用包</span>
										<span className="font-mono">26 MB</span>
									</div>
									<div className="h-2.5 rounded-full bg-slate-600/40 w-full" />
								</div>
								<div>
									<div className="flex justify-between text-xs mb-2">
										<span className="text-slate-300 font-medium">
											Pushy 增量包
										</span>
										<span className="font-mono text-blue-300">42 KB</span>
									</div>
									<div className="h-2.5 rounded-full bg-slate-600/25 w-full">
										<div className="pushy-diff-bar h-full w-[4%] min-w-[14px] rounded-full bg-[linear-gradient(90deg,#38bdf8,#6366f1)] shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* 2 — 极速下载 */}
					<div
						data-reveal
						style={{ "--reveal-delay": "80ms" } as CSSProperties}
						className={cardBase}
					>
						{cardGlow}
						<div className="relative">
							<FeatureIcon tint="bg-sky-500/10 text-sky-400">
								<path d="M12 3v11" />
								<path d="M8 10l4 4 4-4" />
								<path d="M4 17.5c1.5 2 4.3 3.5 8 3.5s6.5-1.5 8-3.5" />
							</FeatureIcon>
							<h3 className="mt-6 text-xl font-bold text-slate-50">极速下载</h3>
							<p className="mt-3 text-[15px] leading-relaxed text-slate-400">
								高速 CDN 覆盖全球节点，海内外客户端就近秒级拉取，弱网环境也稳定可达。
							</p>
							<WorldDotMap />
						</div>
					</div>

					{/* 3 — 快捷发布 */}
					<div data-reveal className={cardBase}>
						{cardGlow}
						<div className="relative">
							<FeatureIcon tint="bg-indigo-500/10 text-indigo-400">
								<path d="M4 17l6-5-6-5" />
								<path d="M12 19h8" />
							</FeatureIcon>
							<h3 className="mt-6 text-xl font-bold text-slate-50">快捷发布</h3>
							<p className="mt-3 text-[15px] leading-relaxed text-slate-400">
								命令行与网页双端管理，原生支持 CI/CD——一条命令，完成从打包到全量下发。
							</p>
						</div>
					</div>

					{/* 4 — 稳定可靠 */}
					<div
						data-reveal
						style={{ "--reveal-delay": "80ms" } as CSSProperties}
						className={cardBase}
					>
						{cardGlow}
						<div className="relative">
							<FeatureIcon tint="bg-emerald-500/10 text-emerald-400">
								<path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
								<path d="M9 12l2 2 4-4.5" />
							</FeatureIcon>
							<h3 className="mt-6 text-xl font-bold text-slate-50">稳定可靠</h3>
							<p className="mt-3 text-[15px] leading-relaxed text-slate-400">
								内置崩溃捕获与自动回滚，异常更新即刻恢复上一版本，线上业务安全无忧。
							</p>
						</div>
					</div>

					{/* 5 — 灵活扩展 */}
					<div
						data-reveal
						style={{ "--reveal-delay": "160ms" } as CSSProperties}
						className={cardBase}
					>
						{cardGlow}
						<div className="relative">
							<FeatureIcon tint="bg-violet-500/10 text-violet-400">
								<circle cx="6" cy="6" r="2.5" />
								<circle cx="18" cy="18" r="2.5" />
								<path d="M8.5 6H15a3 3 0 013 3v2m-2.5 7H9a3 3 0 01-3-3v-2" />
							</FeatureIcon>
							<h3 className="mt-6 text-xl font-bold text-slate-50">灵活扩展</h3>
							<p className="mt-3 text-[15px] leading-relaxed text-slate-400">
								开放元信息接口，灰度发布、条件下发、多渠道策略随心定制。
							</p>
						</div>
					</div>

					{/* 6 — 技术支持（横向长卡） */}
					<div data-reveal className={`${cardBase} lg:col-span-3`}>
						{cardGlow}
						<div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
							<FeatureIcon tint="bg-rose-500/10 text-rose-400">
								<path d="M21 12a8.5 8.5 0 01-8.5 8.5c-1.5 0-3-.4-4.2-1L3 21l1.5-5.3c-.6-1.2-1-2.6-1-4.2A8.5 8.5 0 0112 3a8.5 8.5 0 019 9z" />
								<path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
							</FeatureIcon>
							<div className="flex-1">
								<h3 className="text-xl font-bold text-slate-50">
									专业技术支持
								</h3>
								<p className="mt-2 text-[15px] leading-relaxed text-slate-400 max-w-2xl">
									官方技术支持群随时在线，工作时间内小时级响应，陪你解决接入与发布路上的每一个问题。
								</p>
							</div>
							<a
								href="/docs/faq"
								className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors shrink-0"
							>
								查看常见问题
								<span aria-hidden="true">→</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Page1;
