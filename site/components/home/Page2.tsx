import type { CSSProperties } from "react";
const steps = [
	{
		index: "01",
		title: "安装命令行工具",
		desc: "一条命令全局安装 pushy CLI，登录即可开始。",
	},
	{
		index: "02",
		title: "上传原生基础包",
		desc: "每个原生版本仅需上传一次，作为后续差量计算的基准。",
	},
	{
		index: "03",
		title: "发布热更新",
		desc: "打包、差量、上传一气呵成，秒级推送到全量用户。",
	},
];

const terminalLines: Array<{ type: "comment" | "cmd"; text: string }> = [
	{ type: "comment", text: "# 1. 全局安装命令行工具" },
	{ type: "cmd", text: "npm i -g react-native-update-cli" },
	{ type: "comment", text: "# 2. 上传原生基础包（每个原生版本一次）" },
	{ type: "cmd", text: "pushy uploadIpa yourApp.ipa" },
	{ type: "cmd", text: "pushy uploadApk yourApp.apk" },
	{ type: "comment", text: "# 3. 生成并发布热更新包" },
	{ type: "cmd", text: "pushy bundle --platform ios" },
	{ type: "cmd", text: "pushy bundle --platform android" },
];

function Page2() {
	return (
		<section className="relative py-28 overflow-hidden">
			<div
				className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
				aria-hidden="true"
			/>
			{/* Ambient glow */}
			<div
				className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-indigo-500/[0.06] blur-3xl pointer-events-none"
				aria-hidden="true"
			/>

			<div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20 items-center">
					{/* ---- Left: steps ---- */}
					<div>
						<p
							data-reveal
							className="text-sm font-semibold tracking-[0.2em] text-blue-400/90 uppercase mb-4"
						>
							Get started
						</p>
						<h2
							data-reveal
							style={{ "--reveal-delay": "80ms" } as CSSProperties}
							className="text-3xl md:text-[2.6rem] leading-tight font-extrabold tracking-tight text-slate-50 mb-12"
						>
							三步，完成
							<span className="bg-clip-text text-transparent bg-[linear-gradient(100deg,#38bdf8,#818cf8)]">
								第一次热更
							</span>
						</h2>

						<ol className="relative space-y-10">
							<div
								className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-400/40 via-white/[0.08] to-transparent"
								aria-hidden="true"
							/>
							{steps.map((step, i) => (
								<li
									key={step.index}
									data-reveal
									style={
										{
											"--reveal-delay": `${120 + i * 100}ms`,
										} as CSSProperties
									}
									className="relative flex gap-6"
								>
									<span className="relative z-10 flex w-10 h-10 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-[#0a1120] font-mono text-sm font-bold text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
										{step.index}
									</span>
									<div className="pt-1">
										<h3 className="text-lg font-bold text-slate-100">
											{step.title}
										</h3>
										<p className="mt-1.5 text-[15px] leading-relaxed text-slate-400">
											{step.desc}
										</p>
									</div>
								</li>
							))}
						</ol>

						<div
							data-reveal
							style={{ "--reveal-delay": "420ms" } as CSSProperties}
							className="mt-12"
						>
							<a
								href="/docs/getting-started"
								className="inline-flex items-center gap-2 text-[15px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
							>
								查看详细集成文档
								<span aria-hidden="true">→</span>
							</a>
						</div>
					</div>

					{/* ---- Right: terminal ---- */}
					<div data-reveal style={{ "--reveal-delay": "200ms" } as CSSProperties}>
						<div className="relative">
							<div
								className="absolute -inset-6 bg-[radial-gradient(closest-side,rgba(99,102,241,0.12),transparent)] blur-2xl pointer-events-none"
								aria-hidden="true"
							/>
							<div className="relative rounded-2xl border border-white/[0.09] bg-[#070d1a]/90 backdrop-blur-xl shadow-[0_32px_80px_rgba(2,6,23,0.6)] overflow-hidden">
								<div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
									<span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
									<span className="w-3 h-3 rounded-full bg-[#febc2e]" />
									<span className="w-3 h-3 rounded-full bg-[#28c840]" />
									<span className="ml-3 text-xs text-slate-500 font-medium tracking-wider">
										pushy — zsh
									</span>
								</div>
								<div className="p-6 sm:p-8 font-mono text-[13.5px] sm:text-sm leading-7 text-slate-300">
									{terminalLines.map((line) =>
										line.type === "comment" ? (
											<div
												key={line.text}
												className="pushy-terminal__line text-slate-600 mt-3 first:mt-0"
											>
												{line.text}
											</div>
										) : (
											<div key={line.text} className="pushy-terminal__line">
												<span className="text-emerald-400 mr-2.5">❯</span>
												<span className="text-slate-100">{line.text}</span>
											</div>
										),
									)}
									<div className="pushy-terminal__line mt-3 flex items-center">
										<span className="text-emerald-400 mr-2.5">❯</span>
										<span className="pushy-caret inline-block w-[9px] h-[18px] bg-slate-400" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Page2;
