import { useEffect, useRef } from "react";
import logo from "../../pages/public/images/logo.svg";
import GitHubButton from "./GitHubButton";

interface BannerProps {
	isMobile?: boolean;
}

function Banner({ isMobile }: BannerProps) {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) {
			return;
		}

		const reducedMotionQuery = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		);

		if (reducedMotionQuery.matches) {
			video.pause();
			video.dataset.playback = "reduced-motion";
			return;
		}

		video.muted = true;
		video.defaultMuted = true;
		video.loop = true;
		video.playsInline = true;

		let playRequest: Promise<void> | null = null;
		let retryId: number | undefined;

		const markPlaying = () => {
			video.dataset.playback = "playing";
		};
		const markPaused = () => {
			video.dataset.playback = "paused";
		};
		const start = () => {
			if (reducedMotionQuery.matches) {
				video.pause();
				video.dataset.playback = "reduced-motion";
				return;
			}

			video.muted = true;
			video.defaultMuted = true;
			if (!video.paused && !video.ended) {
				markPlaying();
				return;
			}
			if (playRequest) {
				return;
			}

			playRequest = video
				.play()
				.then(markPlaying)
				.catch((error: unknown) => {
					const name = error instanceof DOMException ? error.name : "blocked";
					if (name === "AbortError") {
						retryId = window.setTimeout(start, 180);
						return;
					}

					video.dataset.playback = name;
				})
				.finally(() => {
					playRequest = null;
				});
		};
		const handleVisibilityChange = () => {
			if (!document.hidden) {
				start();
			}
		};

		video.addEventListener("playing", markPlaying);
		video.addEventListener("pause", markPaused);
		video.addEventListener("loadeddata", start);
		video.addEventListener("canplay", start);
		document.addEventListener("visibilitychange", handleVisibilityChange);
		start();

		return () => {
			if (retryId) {
				window.clearTimeout(retryId);
			}
			video.removeEventListener("playing", markPlaying);
			video.removeEventListener("pause", markPaused);
			video.removeEventListener("loadeddata", start);
			video.removeEventListener("canplay", start);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	return (
		<div className="pushy-hero relative overflow-hidden min-h-[680px] lg:min-h-[760px] flex items-center bg-[#eee7dc]">
			<img
				src="/hero-loop/pushy-hero-loop-poster.png"
				className="pushy-hero__poster absolute inset-0 h-full w-full object-cover"
				alt=""
				aria-hidden="true"
			/>
			<video
				ref={videoRef}
				className="pushy-hero__video absolute inset-0 h-full w-full object-cover"
				autoPlay
				defaultMuted
				muted
				loop
				playsInline
				preload="auto"
				poster="/hero-loop/pushy-hero-loop-poster.png"
				aria-hidden="true"
			>
				<source src="/hero-loop/pushy-hero-loop.mp4" type="video/mp4" />
				<source src="/hero-loop/pushy-hero-loop.webm" type="video/webm" />
			</video>

			<div className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(90deg,rgba(249,246,240,0.96)_0%,rgba(248,244,236,0.88)_34%,rgba(248,244,236,0.42)_55%,rgba(25,24,22,0.06)_100%)]" />
			<div className="absolute inset-0 z-[2] pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0)_52%,rgba(45,38,30,0.2)_100%)]" />

			<div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative w-full z-10">
				<div className="max-w-2xl text-left pt-32 pb-20 lg:pt-40 lg:pb-28">
					<div className="flex justify-start mb-8 animate-fade-in-down">
						<img
							src={logo}
							className="w-20 h-20 sm:w-24 sm:h-24 hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_28px_rgba(68,131,237,0.24)]"
							alt="Pushy Logo"
						/>
					</div>

					<h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up text-[#182235]">
						Pushy
					</h1>

					<p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#233248] mb-8 tracking-wide animate-fade-in-up animation-delay-100">
						让 React Native 应用体验持续变好
					</p>

					<div className="max-w-xl mb-12 animate-fade-in-up animation-delay-200">
						<p className="text-lg sm:text-xl text-[#4a5768] leading-relaxed font-normal">
							<span className="block mb-4 text-base sm:text-lg font-semibold text-[#1f3f6d]">
								官方 Skill 已支持 AI 自动完成接入、配置检查与常见问题排查。
							</span>
							<span className="inline-block mr-5 mt-2 relative font-medium text-[#334256]">
								专为 React Native 设计
							</span>
							<span className="inline-block mr-5 mt-2 relative font-medium text-[#334256]">
								小更新快速送达
							</span>
							<br className="hidden sm:block" />
							<span className="inline-block mr-5 mt-3 relative font-medium text-[#334256]">
								用户无需重新安装
							</span>
							<span className="inline-block mr-5 mt-3 relative font-medium text-[#334256]">
								修复和优化更及时
							</span>
						</p>
					</div>

					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-5 animate-fade-in-up animation-delay-300">
						<a href="/docs/skills" className="w-full sm:w-auto">
							<button className="w-full sm:w-auto px-8 py-4 bg-[#286be8] hover:bg-[#1f5ed4] text-white font-bold rounded-2xl text-lg transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 hover:-translate-y-1">
								AI 自动接入
							</button>
						</a>
						<a href="/docs/getting-started" className="w-full sm:w-auto">
							<button className="w-full sm:w-auto px-8 py-4 border border-[#27384f]/20 bg-white/56 hover:bg-white/74 text-[#233248] font-bold rounded-2xl text-lg transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
								查看手动接入
							</button>
						</a>
						<div className="scale-125 transform origin-left hover:scale-150 transition-transform duration-300">
							<GitHubButton
								type="stargazers"
								namespace="reactnativecn"
								repo="react-native-update"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Banner;
