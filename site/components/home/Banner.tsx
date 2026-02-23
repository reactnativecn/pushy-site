import GitHubButton from "react-github-button";
import logo from "../../pages/public/images/logo.svg";
import ParticleNetwork from "./ParticleNetwork";

interface BannerProps {
  isMobile?: boolean;
}

function Banner({ isMobile }: BannerProps) {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-950 via-[#0c1333] to-indigo-950 min-h-[600px] flex items-center">
      {/* Particle Network Animation */}
      <div className="absolute inset-0 z-0">
        <ParticleNetwork />
      </div>

      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-slate-950/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full text-center z-10">
        <div className="flex justify-center mb-8 animate-fade-in-down">
          <img
            src={logo}
            className="w-24 h-24 sm:w-32 sm:h-32 hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_24px_rgba(68,131,237,0.5)]"
            alt="Pushy Logo"
          />
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
            Pushy
          </span>
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-200 mb-8 tracking-wide animate-fade-in-up animation-delay-100">
          极速热更新框架 for React Native
        </p>

        <div className="max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-200">
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed font-light">
            <span className="inline-block mx-4 relative font-medium text-slate-300">高速节点勤分发</span>
            <span className="inline-block mx-4 relative font-medium text-slate-300">山河浩广若比邻</span>
            <br className="hidden sm:block" />
            <span className="inline-block mx-4 mt-2 sm:mt-4 relative font-medium text-slate-300">增量算法尽优化</span>
            <span className="inline-block mx-4 mt-2 sm:mt-4 relative font-medium text-slate-300">字节四两拨千斤</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up animation-delay-300">
          <a href="/docs/intro" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl text-lg transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:-translate-y-1">
              立即免费体验
            </button>
          </a>
          <div className="scale-125 transform origin-center sm:origin-left hover:scale-150 transition-transform duration-300">
            <GitHubButton
              type="stargazers"
              namespace="reactnativecn"
              repo="react-native-update"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;

