import logo from "../../pages/public/images/logo.svg";
import GitHubButton from "./GitHubButton";

interface BannerProps {
  isMobile?: boolean;
}

function Banner({ isMobile }: BannerProps) {
  return (
    <div className="pushy-hero relative overflow-hidden min-h-[680px] lg:min-h-[760px] flex items-center bg-[#eee7dc]">
      <img
        src="/hero-loop/pushy-hero-loop-poster.png"
        className="pushy-hero__poster absolute inset-0 h-full w-full object-cover"
        alt=""
        aria-hidden="true"
      />
      <video
        className="pushy-hero__video absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-loop/pushy-hero-loop-poster.png"
        aria-hidden="true"
      >
        <source src="/hero-loop/pushy-hero-loop.webm" type="video/webm" />
        <source src="/hero-loop/pushy-hero-loop.mp4" type="video/mp4" />
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
            让应用体验持续变好，不打断用户
          </p>

          <div className="max-w-xl mb-12 animate-fade-in-up animation-delay-200">
            <p className="text-lg sm:text-xl text-[#4a5768] leading-relaxed font-normal">
              <span className="block mb-4 text-base sm:text-lg font-semibold text-[#1f3f6d]">
              官方 Skill 已支持 AI 自动完成接入、配置检查与常见问题排查。
              </span>
              <span className="inline-block mr-5 mt-2 relative font-medium text-[#334256]">高速节点勤分发</span>
              <span className="inline-block mr-5 mt-2 relative font-medium text-[#334256]">山河浩广若比邻</span>
              <br className="hidden sm:block" />
              <span className="inline-block mr-5 mt-3 relative font-medium text-[#334256]">增量算法尽优化</span>
              <span className="inline-block mr-5 mt-3 relative font-medium text-[#334256]">字节四两拨千斤</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-5 animate-fade-in-up animation-delay-300">
            <a href="/docs/skills" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-[#286be8] hover:bg-[#1f5ed4] text-white font-bold rounded-2xl text-lg transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 hover:-translate-y-1">
                优先：安装 Skill
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
