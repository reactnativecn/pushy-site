import { useState } from "react";
import "./analytics.scss";

const views = [
	{
		id: "overview",
		label: "全局概览",
		title: "先看全貌，再看变化。",
		body: "今日请求、活跃设备与每日趋势，一屏掌握应用运行情况。区分已是最新、增量更新、整包、暂停和过期，知道每次查询得到了什么结果。",
		details: ["请求趋势与活跃设备", "7 / 14 / 35 天切换", "更新命中与拒绝原因"],
		caption: "拾光商城 · Android · 分析概览",
	},
	{
		id: "versions",
		label: "版本漏斗",
		title: "发出去多少，真正生效多少。",
		body: "逐版本追踪下发、下载、激活与回滚。展开到原生包，查看累计激活率和生效时延，判断新版推进到了哪一步。",
		details: ["热更版本 × 原生包", "累计激活与覆盖参照", "下载、激活时延分布"],
		caption: "拾光商城 · 3.6.2 · 版本明细与生效时延",
	},
	{
		id: "traffic",
		label: "流量画像",
		title: "用户在哪里，流量从哪来。",
		body: "从一天内的访问节奏，到原生包、运营商、请求域名及 IPv4 / IPv6 分布，再到地区排名，逐层了解更新流量。",
		details: ["24 小时请求分布", "原生包与网络维度", "地区请求数与占比"],
		caption: "拾光商城 · 网络构成与地区分布",
	},
	{
		id: "failures",
		label: "失败诊断",
		title: "把“更新失败”拆成具体原因。",
		body: "按超时、网络、磁盘空间、校验和补丁应用等原因聚合失败。关联热更版本，比较操作系统和运营商维度，缩小排查范围。",
		details: ["原因排名与影响版本", "系统版本对比", "失败率与回滚率"],
		caption: "拾光商城 · 失败原因与系统诊断",
	},
];

export default function AnalyticsSection() {
	const [selected, setSelected] = useState(0);
	const view = views[selected];
	return (
		<section
			id="analytics"
			className="analytics-section pushy-analytics"
			aria-labelledby="analytics-heading"
		>
			<div className="analytics-container">
				<header className="analytics-heading">
					<div>
						<p className="analytics-eyebrow">每次发布，都有数据可循</p>
						<h2 id="analytics-heading">
							从发布到生效，
							<br />
							每一步都看得清。
						</h2>
					</div>
					<div className="analytics-intro">
						<p>
							更新发出去了，用户真的用上了吗？把请求趋势、版本覆盖、网络分布和失败原因放在一起，让每次放量与排查都有依据。
						</p>
						<a href="/docs/analytics">
							探索完整数据分析指南 <span aria-hidden="true">↗</span>
						</a>
					</div>
				</header>
				<div
					className="analytics-picker"
					role="group"
					aria-label="选择数据分析场景"
				>
					{views.map((item, index) => (
						<button
							key={item.id}
							type="button"
							aria-pressed={selected === index}
							aria-controls="analytics-preview"
							onClick={() => setSelected(index)}
						>
							<span className="analytics-index" aria-hidden="true">
								0{index + 1}
							</span>
							{item.label}
							<span className="analytics-arrow" aria-hidden="true">
								↗
							</span>
						</button>
					))}
				</div>
				<div id="analytics-preview" className="analytics-preview">
					<div className="analytics-context" aria-live="polite">
						<div>
							<p className="analytics-eyebrow">0{selected + 1} / 04</p>
							<h3>{view.title}</h3>
							<p>{view.body}</p>
						</div>
						<ul>
							{view.details.map((detail) => (
								<li key={detail}>
									<span aria-hidden="true">＋</span>
									{detail}
								</li>
							))}
						</ul>
					</div>
					<figure>
						<div className="analytics-frame-bar">
							<span className="analytics-dot" aria-hidden="true" />
							<span>Pushy / {view.caption}</span>
							<a
								href={`/images/analytics/${view.id}.webp`}
								target="_blank"
								rel="noreferrer"
								aria-label={`查看原始截图: ${view.caption}`}
							>
								查看原始截图 <span aria-hidden="true">↗</span>
							</a>
						</div>
						<a
							className="analytics-image-link"
							href={`/images/analytics/${view.id}.webp`}
							target="_blank"
							rel="noreferrer"
							aria-label={`查看原始截图: ${view.caption}`}
						>
							<img
								key={view.id}
								src={`/images/analytics/${view.id}.webp`}
								alt={view.caption}
								width={1280}
								height={720}
								loading="lazy"
								decoding="async"
							/>
						</a>
						<figcaption>
							<span>真实控制台截图 · 应用与数值均为模拟数据</span>
							<a href="https://pushy-admin.reactnative.cn/#/realtime-metrics">
								打开控制台 <span aria-hidden="true">→</span>
							</a>
						</figcaption>
					</figure>
				</div>
			</div>
		</section>
	);
}
