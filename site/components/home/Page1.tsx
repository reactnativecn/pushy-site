import deltaIcon from "../../pages/public/images/smartphone-3.svg";
import publishIcon from "../../pages/public/images/internet-1.svg";
import downloadIcon from "../../pages/public/images/wifi.svg";
import strategyIcon from "../../pages/public/images/strategy.svg";
import reliableIcon from "../../pages/public/images/circuit.svg";
import supportIcon from "../../pages/public/images/chat.svg";

interface Feature {
  title: string;
  desc: string;
  src: string;
  color: string;
  bg: string;
}

const features: Feature[] = [
  {
    title: "增量更新",
    desc: "基于 bsdiff/hdiff 算法创建，实现 kb 级别极小更新包。",
    src: deltaIcon,
    color: "from-blue-400 to-blue-600",
    bg: "bg-blue-50 text-blue-600"
  },
  {
    title: "快捷发布",
    desc: "提供好用的命令行工具与网页双端管理，原生支持 CI/CD 自动部署。",
    src: publishIcon,
    color: "from-indigo-400 to-indigo-600",
    bg: "bg-indigo-50 text-indigo-600"
  },
  {
    title: "极速下载",
    desc: "全网基于阿里云高速 CDN 分发，保障全国各地客户端秒速更新。",
    src: downloadIcon,
    color: "from-sky-400 to-sky-600",
    bg: "bg-sky-50 text-sky-600"
  },
  {
    title: "稳定可靠",
    desc: "内置完善的崩溃捕获与回滚机制，保障线上业务安全无忧。",
    src: reliableIcon,
    color: "from-emerald-400 to-emerald-600",
    bg: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "灵活扩展",
    desc: "开放强大的定制元信息接口，提供灵活自由的更新下发策略。",
    src: strategyIcon,
    color: "from-purple-400 to-purple-600",
    bg: "bg-purple-50 text-purple-600"
  },
  {
    title: "技术支持",
    desc: "提供专业的技术支持群，工作时间内享受小时级别高效响应保障。",
    src: supportIcon,
    color: "from-rose-400 to-rose-600",
    bg: "bg-rose-50 text-rose-600"
  },
];

function Page1() {
  return (
    <div className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-slate-800 tracking-tight">
            为什么选择 <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Pushy</span>
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Top Gradient Border Line on Hover */}
              <div className={`absolute top-0 inset-x-0 h-1 rounded-t-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${feature.bg}`}>
                <img src={feature.src} alt={feature.title} className="w-8 h-8 opacity-80" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors duration-300">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-right text-xs text-slate-300">
          Icons made by <a href="https://www.flaticon.com/authors/swifticons" className="hover:text-slate-400 transition-colors">Swifticons</a> from <a href="https://www.flaticon.com/" className="hover:text-slate-400 transition-colors">www.flaticon.com</a>
        </div>
      </div>
    </div>
  );
}

export default Page1;
