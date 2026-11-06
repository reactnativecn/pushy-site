import type { CSSProperties } from "react";

const guides = [
	{
		tag: "迁移指南",
		tagStyle: "text-sky-300 bg-sky-500/10 border-sky-400/20",
		title: "从 CodePush 迁移到 Pushy",
		desc: "App Center 停服后的完整替代路径：概念映射、CLI 命令替换与 AI Skill 自动改造。",
		href: "/docs/migrate-from-codepush",
	},
	{
		tag: "Expo 生态",
		tagStyle: "text-indigo-300 bg-indigo-500/10 border-indigo-400/20",
		title: "Expo Prebuild 项目接入",
		desc: "保留 Expo 开发体验与原生插件生态，同时获得国内秒级 CDN 与无流量附加费的差量更新。",
		href: "/docs/expo",
	},
	{
		tag: "架构演进",
		tagStyle: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
		title: "React Native 新架构与 Hermes",
		desc: "完整支持 RN 0.82+ ReactHost 与 RN 0.88 SceneDelegate，字节码感知差分将单行改动压至 3.4 KB。",
		href: "/docs/new-architecture",
	},
	{
		tag: "国产系统",
		tagStyle: "text-amber-300 bg-amber-500/10 border-amber-400/20",
		title: "鸿蒙 HarmonyOS NEXT 支持",
		desc: "第一方适配 RNOH TurboModule 与沙盒 Bundle 加载，一套流水线统一管理 iOS、Android 与鸿蒙。",
		href: "/docs/harmony",
	},
	{
		tag: "安卓分发",
		tagStyle: "text-violet-300 bg-violet-500/10 border-violet-400/20",
		title: "Android 多渠道与 Google Play AAB",
		desc: "覆盖美团 Walle、腾讯 VasDolly、Gradle Flavor 内容指纹对齐与单次构建 APK + AAB 双格式分发。",
		href: "/docs/android-channels-and-aab",
	},
	{
		tag: "工程化",
		tagStyle: "text-cyan-300 bg-cyan-500/10 border-cyan-400/20",
		title: "CI/CD 自动发布与灰度放量",
		desc: "使用 PUSHY_API_TOKEN 在 GitHub Actions、GitLab CI 与 Jenkins 中无人值守打包、归档 Sourcemap 与灰度发布。",
		href: "/docs/cicd",
	},
];

function GuidesSection() {
	return (
		<section className="relative py-24 overflow-hidden">
			<div
				className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
				aria-hidden="true"
			/>

			<div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
					<div className="max-w-2xl">
						<p
							data-reveal
							className="text-sm font-semibold tracking-[0.2em] text-blue-400/90 uppercase mb-4"
						>
							Scenarios & Migration
						</p>
						<h2
							data-reveal
							style={{ "--reveal-delay": "80ms" } as CSSProperties}
							className="text-3xl md:text-[2.4rem] leading-tight font-extrabold tracking-tight text-slate-50"
						>
							适配你的
							<span className="bg-clip-text text-transparent bg-[linear-gradient(100deg,#38bdf8,#818cf8)]">
								工程架构与发布场景
							</span>
						</h2>
						<p
							data-reveal
							style={{ "--reveal-delay": "140ms" } as CSSProperties}
							className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed"
						>
							无论你是从 CodePush 或 EAS Update 迁移，还是维护多渠道安卓包、混编宿主与鸿蒙客户端，都有现成的实战指南。
						</p>
					</div>

					<div
						data-reveal
						style={{ "--reveal-delay": "180ms" } as CSSProperties}
						className="shrink-0"
					>
						<a
							href="/codepush-alternative"
							className="inline-flex items-center gap-2 text-[15px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
						>
							查看各主流热更新方案横评
							<span aria-hidden="true">→</span>
						</a>
					</div>
				</div>

				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{guides.map((item, i) => (
						<a
							key={item.href}
							href={item.href}
							data-reveal
							style={{ "--reveal-delay": `${80 + i * 60}ms` } as CSSProperties}
							className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7 transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.05] hover:-translate-y-1 no-underline"
						>
							<div>
								<span
									className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${item.tagStyle}`}
								>
									{item.tag}
								</span>
								<h3 className="mt-4 text-lg font-bold text-slate-50 group-hover:text-white transition-colors">
									{item.title}
								</h3>
								<p className="mt-2.5 text-sm leading-relaxed text-slate-400">
									{item.desc}
								</p>
							</div>
							<span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
								阅读指南
								<span
									aria-hidden="true"
									className="transition-transform duration-200 group-hover:translate-x-1"
								>
									→
								</span>
							</span>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}

export default GuidesSection;
