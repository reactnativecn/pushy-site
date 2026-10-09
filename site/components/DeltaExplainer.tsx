import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import "./delta-explainer.scss";

/**
 * Four-step animated explainer: why a device whose build timestamp or bundle
 * fingerprint differs from the registered native package gets no delta update.
 * Auto-advances while visible; tabs jump to a step. Mirrors pushy-go
 * internal/checkupdate/decision.go.
 */

const STEP_MS = 6500;

const stagger = (index: number): CSSProperties =>
	({ "--d": `${index * 120}ms` }) as CSSProperties;

function Cells({
	cells,
	start = 0,
}: {
	cells: { label: string; tone?: "new" | "bad" }[];
	start?: number;
}) {
	return (
		<div className="flex gap-1">
			{cells.map((cell, index) => (
				<span
					key={index}
					style={stagger(start + index)}
					className={`dx-pop inline-flex h-7 w-7 items-center justify-center rounded-md border font-mono text-sm ${
						cell.tone === "new"
							? "border-amber-400 bg-amber-400/15 text-amber-200"
							: cell.tone === "bad"
								? "border-rose-400 bg-rose-400/15 text-rose-200"
								: "border-sky-400/70 bg-sky-400/10 text-sky-100"
					}`}
				>
					{cell.label}
				</span>
			))}
		</div>
	);
}

const cells = (labels: string, tones: Record<number, "new" | "bad"> = {}) =>
	[...labels].map((label, index) => ({ label, tone: tones[index] }));

function PatchRow({
	label,
	from,
	to,
	verdict,
	start,
}: {
	label: string;
	from: { label: string; tone?: "new" | "bad" }[];
	to: { label: string; tone?: "new" | "bad" }[];
	verdict: ReactNode;
	start: number;
}) {
	return (
		<div>
			<div className="dx-pop mb-1.5 text-xs text-slate-400" style={stagger(start)}>
				{label}
			</div>
			<div className="flex flex-wrap items-center gap-x-3 gap-y-2">
				<Cells cells={from} start={start + 1} />
				<span className="dx-pop text-amber-300" style={stagger(start + 6)}>
					+补丁 →
				</span>
				<Cells cells={to} start={start + 7} />
				<span className="dx-pop text-sm" style={stagger(start + 11)}>
					{verdict}
				</span>
			</div>
		</div>
	);
}

function StepPatch() {
	return (
		<div className="space-y-4">
			<p className="dx-pop text-slate-300">
				差量包是一份补丁，内容是“从旧包第几字节复制、在哪插入新内容”。所以它只有几
				KB，但<strong className="text-white">只对一份特定的旧包有效</strong>。
			</p>
			<PatchRow
				label="旧包对得上"
				from={cells("ABCDE")}
				to={cells("ABxDE", { 2: "new" })}
				verdict={<span className="text-emerald-400">✓ 得到新版本</span>}
				start={2}
			/>
			<PatchRow
				label="旧包差一个字节"
				from={cells("AZBCD", { 1: "bad" })}
				to={cells("AZxCD", { 1: "bad", 2: "new" })}
				verdict={<span className="text-rose-400">✕ 内容错位，校验失败</span>}
				start={14}
			/>
		</div>
	);
}

function IdCard({
	title,
	sub,
	time,
	timeDiffers,
	start,
}: {
	title: string;
	sub: string;
	time: string;
	timeDiffers?: boolean;
	start: number;
}) {
	return (
		<div
			className="dx-pop flex-1 rounded-xl border border-white/10 bg-white/[0.04] p-4"
			style={stagger(start)}
		>
			<div className="font-semibold text-white">{title}</div>
			<div className="mb-3 text-xs text-slate-400">{sub}</div>
			<div className="text-xs text-slate-400">编译时间戳</div>
			<div className={`font-mono ${timeDiffers ? "text-amber-300" : "text-slate-100"}`}>
				{time}
			</div>
			<div className="mt-2 text-xs text-slate-400">内容指纹</div>
			<div className="font-mono text-slate-100">9f3a…c41e</div>
		</div>
	);
}

function StepIdentity() {
	return (
		<div className="space-y-4">
			<p className="dx-pop text-slate-300">
				所以服务端下发差量前，要先确认设备上的旧包就是它算补丁用的那份。凭的是两样东西：
			</p>
			<div className="flex gap-3">
				<IdCard title="服务端登记" sub="上传原生包时" time="1759980312" start={2} />
				<IdCard
					title="设备上报"
					sub="检查更新时（重新打过包）"
					time="1760412907"
					timeDiffers
					start={4}
				/>
			</div>
			<ul className="dx-pop space-y-1 text-sm text-slate-300" style={stagger(7)}>
				<li>
					<span className="text-amber-300">编译时间戳</span>：每打一次原生包就变，代码没改也会变
				</li>
				<li>
					<span className="text-emerald-300">内容指纹</span>：包内 JS 的哈希，JS 不变它就不变
				</li>
			</ul>
		</div>
	);
}

const RULES: { time: boolean; hash: string; result: string; note: string; tone: string }[] = [
	{ time: true, hash: "✓", result: "差量", note: "就是登记过的那个包", tone: "text-emerald-400" },
	{ time: false, hash: "✓", result: "差量", note: "只是重新打包，JS 没变", tone: "text-emerald-400" },
	{ time: true, hash: "✕", result: "整包", note: "旧包对不上，不发差量", tone: "text-amber-300" },
	{ time: false, hash: "✕ / 未上报", result: "暂停热更新", note: "服务端没见过这个原生包", tone: "text-rose-400" },
];

function StepRules() {
	return (
		<div>
			<div className="grid grid-cols-[3rem_5rem_1fr] gap-x-3 border-b border-white/10 pb-2 text-xs text-slate-400 sm:grid-cols-[4rem_6rem_6rem_1fr]">
				<span>时间戳</span>
				<span>指纹</span>
				<span>结果</span>
				<span className="hidden sm:block">原因</span>
			</div>
			{RULES.map((rule, index) => (
				<div
					key={index}
					style={stagger(index * 3)}
					className="dx-pop grid grid-cols-[3rem_5rem_1fr] items-baseline gap-x-3 border-b border-white/5 py-2.5 sm:grid-cols-[4rem_6rem_6rem_1fr]"
				>
					<span className={rule.time ? "text-emerald-400" : "text-rose-400"}>
						{rule.time ? "✓" : "✕"}
					</span>
					<span className={rule.hash === "✓" ? "text-emerald-400" : "text-rose-400"}>
						{rule.hash}
					</span>
					<span className={`font-semibold ${rule.tone}`}>
						{rule.result}
						<span className="block text-sm font-normal text-slate-400 sm:hidden">{rule.note}</span>
					</span>
					<span className="hidden text-sm text-slate-400 sm:block">{rule.note}</span>
				</div>
			))}
		</div>
	);
}

function StepFix() {
	const items: ReactNode[] = [
		<>
			每次打原生包：<strong className="text-white">先改版本号 → 上传 → 再分发</strong>
		</>,
		<>APK 与 AAB 在同一次 Gradle 命令里构建</>,
		<>
			升级 react-native-update ≥ 10.49.0、cli ≥ 2.8.5，让内容指纹参与判定，重新打包但 JS
			没变时仍能拿到差量
		</>,
	];
	return (
		<ol className="space-y-3">
			{items.map((item, index) => (
				<li key={index} className="dx-pop flex gap-3 text-slate-300" style={stagger(index * 3)}>
					<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-slate-950">
						{index + 1}
					</span>
					<span>{item}</span>
				</li>
			))}
		</ol>
	);
}

const STEPS = [
	{ title: "补丁原理", body: StepPatch },
	{ title: "身份核对", body: StepIdentity },
	{ title: "判定结果", body: StepRules },
	{ title: "如何避免", body: StepFix },
];

export default function DeltaExplainer() {
	const root = useRef<HTMLDivElement>(null);
	const [step, setStep] = useState(0);
	const [visible, setVisible] = useState(false);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		const node = root.current;
		if (!node || typeof IntersectionObserver === "undefined") {
			return;
		}
		const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
			threshold: 0.4,
		});
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
		if (!visible || paused || reduced) {
			return;
		}
		const timer = window.setTimeout(() => setStep((current) => (current + 1) % STEPS.length), STEP_MS);
		return () => window.clearTimeout(timer);
	}, [step, visible, paused]);

	const Body = STEPS[step].body;
	return (
		<div
			ref={root}
			className="not-prose my-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-[15px] leading-relaxed text-slate-200"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
		>
			<div className="flex border-b border-white/10" role="tablist">
				{STEPS.map((item, index) => (
					<button
						key={item.title}
						type="button"
						role="tab"
						aria-selected={index === step}
						onClick={() => setStep(index)}
						className={`relative flex-1 cursor-pointer px-2 py-3 text-xs sm:text-sm transition-colors ${
							index === step ? "text-white" : "text-slate-500 hover:text-slate-300"
						}`}
					>
						<span className="mr-1 hidden font-mono text-slate-500 sm:inline">{index + 1}</span>
						{item.title}
						{index === step && (
							<span
								key={`${step}-${visible && !paused}`}
								className={`dx-progress absolute inset-x-0 bottom-0 h-0.5 bg-sky-400 ${
									visible && !paused ? "" : "dx-progress--static"
								}`}
								style={{ "--dur": `${STEP_MS}ms` } as CSSProperties}
							/>
						)}
					</button>
				))}
			</div>
			<div key={step} className="min-h-[16rem] p-5 sm:p-6">
				<Body />
			</div>
		</div>
	);
}
