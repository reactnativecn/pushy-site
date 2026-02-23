import { Tooltip } from "antd";
import {
  SmileOutlined,
  CarOutlined,
  RocketOutlined,
  SendOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { ReactNode } from "react";

const AppText = () => (
  <Tooltip title="iOS 和 Android 版本记做不同的应用。您可删除已不再使用的应用来有效利用配额。">
    <span className="text-blue-500 hover:text-blue-400 cursor-help border-b border-dashed border-blue-300">应用</span>
  </Tooltip>
);
const PackageText = () => (
  <Tooltip title="原生包指完整的 apk 或 ipa 格式的安装包。您可删除已不再使用的原生包来有效利用配额。">
    <span className="text-blue-500 hover:text-blue-400 cursor-help border-b border-dashed border-blue-300">原生包</span>
  </Tooltip>
);
const HotUpdateText = () => (
  <Tooltip
    title={`热更包指 "pushy bundle" 命令生成的 ppk 文件（其中包含 jsbundle、图片等业务逻辑文件）。
注意这不是用户实际下载的文件，用户实际下载的是经过服务器运算后生成的极小差量补丁包。您可删除已不再使用的热更包来有效利用配额。`}
  >
    <span className="text-blue-500 hover:text-blue-400 cursor-help border-b border-dashed border-blue-300">热更包</span>
  </Tooltip>
);
const CheckLimitText = ({ children }: { children: ReactNode }) => (
  <div className="py-2 mt-4 border-t border-slate-200/50">
    <p className="text-slate-500 text-sm mb-1">所有应用累加</p>
    <div className="flex items-center gap-1 font-medium text-slate-700">
      每天
      <Tooltip
        title={
          <div>
            指每次客户端向服务器端发起更新检查请求，无论检查结果是否存在新版本。如日更新检查次数超过百万次，请点此查看
            <a
              target="_blank"
              className="text-white underline ml-1 font-bold"
              href="docs/faq#大客户方案"
            >
              大客户方案
            </a>
            。
          </div>
        }
      >
        <span className="text-blue-600 hover:text-blue-500 cursor-help font-extrabold text-lg border-b border-blue-200 border-dashed">{children}次</span>
      </Tooltip>
      更新查询
    </div>
  </div>
);

const FeatureItem = ({ children }: { children: ReactNode }) => (
  <li className="flex items-start gap-3 py-2 text-slate-600">
    <CheckCircleFilled className="text-emerald-500 mt-1" />
    <span className="leading-snug">{children}</span>
  </li>
);

function Pricing() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 inset-x-0 h-[500px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-3xl mix-blend-multiply" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[50%] rounded-full bg-indigo-400/20 blur-3xl mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            公平透明的价格体系
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            新注册用户将自动获得
            <Tooltip title="您可将注册用户名、公司（或个人）名称发送至<hi@charmlot.com>，申请延长评估时间">
              <span className="text-indigo-600 font-bold cursor-help mx-1">7 天</span>
            </Tooltip>
            的<strong className="text-slate-900 mx-1">专业版</strong>试用评估。
            <br />
            到期后转为免费版。如需按月购买或寻求大客户方案，请联系 QQ 客服 34731408。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10 items-stretch">
          
          {/* Card 1: 免费版 */}
          <div className="flex flex-col bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="mb-6">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 mb-6 drop-shadow-sm">
                <SmileOutlined className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">免费版</h3>
              <p className="text-sm text-slate-500 h-10">适用于小型应用或个人项目，满足轻度热更新需求</p>
            </div>
            
            <div className="mb-8 border-b border-slate-100 pb-8 h-28 flex flex-col justify-end">
              <div className="flex items-baseline text-slate-900">
                <span className="text-3xl font-bold">¥</span>
                <span className="text-5xl font-extrabold tracking-tight">0</span>
                <span className="text-slate-500 ml-2 font-medium">/ 年</span>
              </div>
            </div>

            <ul className="flex-1 space-y-3 mb-8">
              <FeatureItem>可创建 3 个 <AppText /></FeatureItem>
              <FeatureItem>每应用 30 个 <PackageText /> (最大 30M/个)</FeatureItem>
              <FeatureItem>每应用 30 个 <HotUpdateText /> (最大 3M/个)</FeatureItem>
              <FeatureItem><strong className="text-emerald-600">CDN 流量全包</strong>，无额外费用</FeatureItem>
              <CheckLimitText>1 千</CheckLimitText>
            </ul>

            <a
              href="docs/getting-started"
              className="mt-auto block w-full py-4 px-6 rounded-xl font-bold text-center bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              开始使用
            </a>
          </div>

          {/* Card 2: 标准版 */}
          <div className="flex flex-col bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="mb-6">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6 drop-shadow-sm">
                <CarOutlined className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">标准版</h3>
              <p className="text-sm text-slate-500 h-10">适用于一般应用，满足中度应用迭代与热更频率</p>
            </div>
            
            <div className="mb-8 border-b border-slate-100 pb-8 h-28 flex flex-col justify-end">
              <div className="flex items-baseline text-slate-900">
                <span className="text-3xl font-bold">¥</span>
                <span className="text-5xl font-extrabold tracking-tight">800</span>
                <span className="text-slate-500 ml-2 font-medium">/ 年</span>
              </div>
              <div className="text-sm text-slate-400 mt-2">或 ¥100 / 月</div>
            </div>

            <ul className="flex-1 space-y-3 mb-8">
              <FeatureItem>可创建 5 个 <AppText /></FeatureItem>
              <FeatureItem>每应用 50 个 <PackageText /> (最大 150M/个)</FeatureItem>
              <FeatureItem>每应用 50 个 <HotUpdateText /> (最大 15M/个)</FeatureItem>
              <FeatureItem><strong className="text-emerald-600">CDN 流量全包</strong>，无额外费用</FeatureItem>
              <FeatureItem>提供专人技术支持</FeatureItem>
              <CheckLimitText>1 万</CheckLimitText>
            </ul>

            <a
              href="https://pushy-admin.reactnative.cn/#/user"
              target="_blank"
              className="mt-auto block w-full py-4 px-6 rounded-xl font-bold text-center bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              立即升级
            </a>
          </div>

          {/* Card 3: 高级版 (Highlighted) */}
          <div className="relative flex flex-col bg-white rounded-3xl p-8 shadow-2xl shadow-indigo-500/10 border-2 border-indigo-500 hover:-translate-y-3 transition-transform duration-300 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold tracking-wider px-4 py-1.5 rounded-full uppercase shadow-md">
                最受欢迎
              </span>
            </div>
            
            <div className="mb-6 mt-2">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-6 drop-shadow-sm">
                <SendOutlined className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">高级版</h3>
              <p className="text-sm text-slate-500 h-10">适用于中大型商业应用，快速可靠的线上问题修复</p>
            </div>
            
            <div className="mb-8 border-b border-slate-100 pb-8 h-28 flex flex-col justify-end">
              <div className="flex items-baseline text-indigo-600">
                <span className="text-3xl font-bold">¥</span>
                <span className="text-5xl font-extrabold tracking-tight">2400</span>
                <span className="text-slate-500 ml-2 font-medium">/ 年</span>
              </div>
              <div className="text-sm text-slate-400 mt-2">或 ¥300 / 月</div>
            </div>

            <ul className="flex-1 space-y-3 mb-8">
              <FeatureItem>可创建 10 个 <AppText /></FeatureItem>
              <FeatureItem>每应用 60 个 <PackageText /> (最大 500M/个)</FeatureItem>
              <FeatureItem>每应用 60 个 <HotUpdateText /> (最大 50M/个)</FeatureItem>
              <FeatureItem><strong className="text-emerald-600">CDN 流量全包</strong>，无额外费用</FeatureItem>
              <FeatureItem><strong className="text-indigo-600">优先</strong>专人技术支持</FeatureItem>
              <CheckLimitText>10 万</CheckLimitText>
            </ul>

            <a
              href="https://pushy-admin.reactnative.cn/#/user"
              target="_blank"
              className="mt-auto block w-full py-4 px-6 rounded-xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
            >
              立刻抢购
            </a>
          </div>

          {/* Card 4: 专业版 */}
          <div className="flex flex-col bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="mb-6">
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6 drop-shadow-sm">
                <RocketOutlined className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">专业版</h3>
              <p className="text-sm text-slate-500 h-10">适用于企业级多业务线舰队应用，极高的资源上限</p>
            </div>
            
            <div className="mb-8 border-b border-slate-100 pb-8 h-28 flex flex-col justify-end">
              <div className="flex items-baseline text-slate-900">
                <span className="text-3xl font-bold">¥</span>
                <span className="text-5xl font-extrabold tracking-tight">7200</span>
                <span className="text-slate-500 ml-2 font-medium">/ 年</span>
              </div>
              <div className="text-sm text-slate-400 mt-2">或 ¥900 / 月</div>
            </div>

            <ul className="flex-1 space-y-3 mb-8">
              <FeatureItem>可创建 50 个 <AppText /></FeatureItem>
              <FeatureItem>每应用 100 个 <PackageText /> (最大 2000M/个)</FeatureItem>
              <FeatureItem>每应用 100 个 <HotUpdateText /> (最大 200M/个)</FeatureItem>
              <FeatureItem><strong className="text-emerald-600">CDN 流量全包</strong>，无额外费用</FeatureItem>
              <FeatureItem><strong className="text-rose-500">最高优</strong>企业级技术支持</FeatureItem>
              <CheckLimitText>100 万</CheckLimitText>
            </ul>

            <a
              href="https://pushy-admin.reactnative.cn/#/user"
              target="_blank"
              className="mt-auto block w-full py-4 px-6 rounded-xl font-bold text-center bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/30 transition-all"
            >
              联系办理
            </a>
          </div>

        </div>

        {/* Footer Notes */}
        <div className="mt-16 text-center text-slate-500 text-sm md:text-base max-w-4xl mx-auto p-6 bg-slate-100/50 rounded-2xl border border-slate-200/60">
          <p className="mb-3 leading-relaxed">
            * <strong>注：</strong>iOS 和 Android 版本记做不同的应用。原生包和热更包的数量限制均为<strong className="text-slate-700">单个应用</strong>维度。<br className="hidden sm:block" />
            原生包指完整的 apk/ipa 安装包。热更包指 pushy bundle 命令生成的 ppk 文件（非用户实际下载的增量更新文件）。<br className="hidden sm:block" />
            <strong className="text-slate-700">所有版本均包含 CDN 流量费用，无需额外付费。</strong><br className="hidden sm:block" />
            为了最大化利用您的定额，您可随时在控制台删除已不再使用的应用、原生包和热更包。
          </p>
          <p className="text-slate-600">
            对于付费业务还有其他疑问？请参考我们的
            <a
              className="text-indigo-600 font-bold ml-1 hover:underline underline-offset-4"
              href="docs/faq#%E4%BB%98%E8%B4%B9%E9%97%AE%E9%A2%98"
            >
              常见问题解答
            </a>
            。
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
