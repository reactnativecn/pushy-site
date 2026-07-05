import { useEffect, useRef, useState } from "react";

// Live marketing stats fed by the public summary endpoint
// (GET /api/metrics/summary on the update server). The section renders
// nothing until real data arrives, so the homepage degrades gracefully if
// the endpoint is unreachable or not yet deployed.

const ENDPOINTS = [
	"https://update.react-native.cn/api/metrics/summary",
	"https://update.reactnative.cn/api/metrics/summary",
];

const POLL_INTERVAL_MS = 60_000;

interface Summary {
	updatedAt: string;
	today: { checks: number; os: Record<string, number> };
	lastHour: { checks: number; devices: number };
	currentHour: { checks: number; devices: number };
	totals: { apps: number; developers: number; hotUpdateVersions: number };
}

function isSummary(data: unknown): data is Summary {
	const summary = data as Summary;
	return (
		typeof summary?.today?.checks === "number" &&
		typeof summary?.lastHour?.devices === "number" &&
		typeof summary?.totals?.apps === "number"
	);
}

/** Local-preview data, only used with ?mock-live-stats. */
const MOCK_SUMMARY: Summary = {
	updatedAt: "",
	today: {
		checks: 8_412_530,
		os: { ios: 3_182_400, android: 4_930_130, harmony: 300_000 },
	},
	lastHour: { checks: 421_800, devices: 262_140 },
	currentHour: { checks: 208_000, devices: 152_000 },
	totals: { apps: 28_400, developers: 15_200, hotUpdateVersions: 463_000 },
};

function useLiveSummary() {
	const [summary, setSummary] = useState<Summary | null>(null);

	useEffect(() => {
		const mockMode = new URLSearchParams(window.location.search).get(
			"mock-live-stats",
		);
		if (mockMode !== null) {
			// "static" freezes the ticker (rate 0) so headless screenshots settle.
			setSummary(
				mockMode === "static"
					? {
							...MOCK_SUMMARY,
							lastHour: { ...MOCK_SUMMARY.lastHour, checks: 0 },
						}
					: MOCK_SUMMARY,
			);
			return;
		}

		let disposed = false;

		const load = async () => {
			for (const url of ENDPOINTS) {
				try {
					const response = await fetch(url);
					if (!response.ok) {
						continue;
					}
					const data: unknown = await response.json();
					if (!disposed && isSummary(data)) {
						setSummary(data);
					}
					return;
				} catch {
					// Try the next endpoint; hide the section if all fail.
				}
			}
		};

		void load();
		const timer = window.setInterval(load, POLL_INTERVAL_MS);
		return () => {
			disposed = true;
			window.clearInterval(timer);
		};
	}, []);

	return summary;
}

/**
 * Displays today's check counter as a "live" number: drifts upward between
 * polls at the rate observed in the last hour, converging on each fresh
 * server value and never running unboundedly ahead of it.
 */
function useTickingNumber(target: number, ratePerSecond: number) {
	const [value, setValue] = useState(target);
	const valueRef = useRef(target);

	useEffect(() => {
		if (
			ratePerSecond <= 0 ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			valueRef.current = target;
			setValue(target);
			return;
		}

		// Day rollover (or first data): snap instead of animating backwards.
		if (target < valueRef.current * 0.6 || valueRef.current === 0) {
			valueRef.current = target;
			setValue(target);
		}

		const cap = target + ratePerSecond * 90;
		const timer = window.setInterval(() => {
			let next =
				valueRef.current + ratePerSecond * (0.7 + Math.random() * 0.6);
			if (target > next) {
				next += (target - next) * 0.25;
			}
			next = Math.min(next, cap);
			valueRef.current = next;
			setValue(Math.floor(next));
		}, 1000);
		return () => window.clearInterval(timer);
	}, [target, ratePerSecond]);

	return Math.max(value, target > 0 ? Math.floor(target) : value);
}

function formatInt(value: number) {
	return Math.floor(value).toLocaleString("zh-CN");
}

const PLATFORM_META: Array<{ key: string; label: string; color: string }> = [
	{ key: "android", label: "Android", color: "#34d399" },
	{ key: "ios", label: "iOS", color: "#38bdf8" },
	{ key: "harmony", label: "HarmonyOS", color: "#a78bfa" },
];

function PlatformBar({ os }: { os: Record<string, number> }) {
	const known = PLATFORM_META.map((meta) => ({
		...meta,
		count: os[meta.key] || 0,
	})).filter((entry) => entry.count > 0);
	const total = known.reduce((sum, entry) => sum + entry.count, 0);
	if (total === 0) {
		return null;
	}

	return (
		<div>
			<div className="flex h-2 rounded-full overflow-hidden bg-white/[0.06]">
				{known.map((entry) => (
					<div
						key={entry.key}
						style={{
							width: `${(entry.count / total) * 100}%`,
							background: entry.color,
						}}
					/>
				))}
			</div>
			<div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
				{known.map((entry) => (
					<span
						key={entry.key}
						className="inline-flex items-center gap-1.5 text-xs text-slate-400"
					>
						<span
							className="w-2 h-2 rounded-full"
							style={{ background: entry.color }}
						/>
						{entry.label}
						<span className="font-mono text-slate-300">
							{Math.round((entry.count / total) * 100)}%
						</span>
					</span>
				))}
			</div>
		</div>
	);
}

function LiveStats() {
	const summary = useLiveSummary();
	const ratePerSecond = summary ? summary.lastHour.checks / 3600 : 0;
	const tickingChecks = useTickingNumber(
		summary?.today.checks ?? 0,
		ratePerSecond,
	);

	if (!summary) {
		return null;
	}

	const sideStats = [
		{ label: "过去一小时活跃设备", value: summary.lastHour.devices },
		{ label: "累计接入应用", value: summary.totals.apps },
		{ label: "已发布热更版本", value: summary.totals.hotUpdateVersions },
	].filter((stat) => stat.value > 0);

	return (
		<section className="relative overflow-hidden">
			<div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
				{/* Mounts after data arrives (after the reveal observer ran), so it
				    animates itself in instead of using data-reveal. */}
				<div className="pushy-fade-in relative rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm px-8 py-10 sm:px-12 -mt-2 mb-4 overflow-hidden">
					<div
						className="absolute -top-32 left-1/4 w-96 h-64 rounded-full bg-blue-500/[0.08] blur-3xl pointer-events-none"
						aria-hidden="true"
					/>

					<div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
						{/* Live counter */}
						<div>
							<div className="flex items-center gap-2.5 mb-4">
								<span className="pushy-live-dot w-2 h-2 rounded-full bg-emerald-400" />
								<span className="text-sm font-semibold tracking-[0.18em] text-emerald-300/90 uppercase">
									Live
								</span>
								<span className="text-sm text-slate-500">
									今日已处理更新检查
								</span>
							</div>
							<div className="font-mono text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-slate-50 tabular-nums">
								{formatInt(tickingChecks)}
								<span className="ml-3 text-base font-sans font-medium text-slate-500">
									次
								</span>
							</div>
							<div className="mt-5 max-w-sm">
								<PlatformBar os={summary.today.os} />
							</div>
						</div>

						{/* Side stats */}
						<div className="grid grid-cols-3 gap-6 lg:border-l lg:border-white/[0.08] lg:pl-10">
							{sideStats.map((stat) => (
								<div key={stat.label}>
									<div className="font-mono text-xl sm:text-2xl font-bold text-slate-100 tabular-nums">
										{formatInt(stat.value)}
									</div>
									<div className="mt-1.5 text-[13px] leading-snug text-slate-500">
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default LiveStats;
