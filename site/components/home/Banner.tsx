import GitHubButton from "react-github-button";
import logo from "../../pages/public/images/logo.svg";

interface BannerProps {
  isMobile?: boolean;
}

function Banner({ isMobile }: BannerProps) {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 min-h-[600px] flex items-center">
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[100px] mix-blend-multiply" />
        <div className="absolute top-[30%] -right-[10%] w-[40%] h-[60%] rounded-full bg-indigo-500/10 blur-[100px] mix-blend-multiply" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] rounded-full bg-violet-500/10 blur-[100px] mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full text-center z-10">
        <div className="flex justify-center mb-8 animate-fade-in-down drop-shadow-xl">
          <img src={logo} className="w-24 h-24 sm:w-32 sm:h-32 hover:scale-105 transition-transform duration-500" alt="Pushy Logo" />
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 animate-fade-in-up">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Pushy
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-600 mb-8 tracking-wide animate-fade-in-up animation-delay-100">
          极速热更新框架 for React Native
        </p>

        <div className="max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-200">
          <p className="text-lg sm:text-xl text-slate-500/90 leading-relaxed font-light">
            <span className="inline-block mx-4 relative font-medium text-slate-700">高速节点勤分发</span>
            <span className="inline-block mx-4 relative font-medium text-slate-700">山河浩广若比邻</span>
            <br className="hidden sm:block" />
            <span className="inline-block mx-4 mt-2 sm:mt-4 relative font-medium text-slate-700">增量算法尽优化</span>
            <span className="inline-block mx-4 mt-2 sm:mt-4 relative font-medium text-slate-700">字节四两拨千斤</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up animation-delay-300">
          <a href="/docs/intro" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-2xl text-lg transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-indigo-500/30 hover:-translate-y-1">
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
