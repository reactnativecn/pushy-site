function CtaBand() {
	return (
		<section className="relative py-28 overflow-hidden">
			<div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
				<div
					data-reveal
					className="relative rounded-[2rem] border border-white/[0.1] overflow-hidden px-8 py-16 sm:px-16 sm:py-20 text-center"
				>
					{/* Card background */}
					<div
						className="absolute inset-0 bg-[radial-gradient(ellipse_100%_120%_at_50%_120%,rgba(79,70,229,0.35),rgba(10,17,32,0.4)_55%,transparent)]"
						aria-hidden="true"
					/>
					<div className="pushy-noise-layer" aria-hidden="true" />
					<div
						className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
						aria-hidden="true"
					/>

					<div className="relative">
						<h2 className="text-3xl sm:text-[2.75rem] leading-tight font-extrabold tracking-tight text-slate-50">
							下一次发布，
							<span className="bg-clip-text text-transparent bg-[linear-gradient(100deg,#38bdf8,#a78bfa)]">
								不再等待
							</span>
						</h2>
						<p className="mt-5 text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
							注册即可免费开始使用，几分钟内完成接入，把更新的主动权握在自己手里。
						</p>

						<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
							<a
								href="https://pushy-admin.reactnative.cn/#/register"
								className="w-full sm:w-auto"
							>
								<button
									type="button"
									className="pushy-btn-primary w-full sm:w-auto px-9 py-[15px] rounded-full text-base font-bold text-white bg-[linear-gradient(100deg,#2563eb,#4f46e5)] shadow-[0_8px_32px_rgba(59,130,246,0.35)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.45)] hover:-translate-y-0.5 transition-all duration-300"
								>
									免费注册
								</button>
							</a>
							<a href="/docs/intro" className="w-full sm:w-auto">
								<button
									type="button"
									className="w-full sm:w-auto px-9 py-[15px] rounded-full text-base font-semibold text-slate-200 border border-white/12 bg-white/[0.04] backdrop-blur hover:bg-white/[0.09] hover:border-white/25 hover:-translate-y-0.5 transition-all duration-300"
								>
									了解产品
								</button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CtaBand;
