function Footer() {
  const columns = [
    {
      title: "联系我们",
      links: [
        { text: "邮箱 hi@charmlot.com", href: "mailto:hi@charmlot.com" },
        { text: "QQ群 729013783" },
        { text: "用户协议", href: "/agreement/", external: true },
        { text: "隐私政策", href: "/agreement/#privacy", external: true },
      ],
    },
    {
      title: "选型与对比",
      links: [
        { text: "CodePush 停服替代方案", href: "/codepush-alternative" },
        { text: "Expo / EAS Update 价格对比", href: "/expo-pricing-vs-pushy" },
        { text: "自建 Expo Updates 服务对比", href: "/expo-updates-self-hosted-vs-pushy" },
        { text: "hot-updater vs Pushy", href: "/hot-updater-vs-pushy" },
        { text: "Revopush vs Pushy", href: "/revopush-vs-pushy" },
        { text: "Stallion vs Pushy", href: "/stallion-vs-pushy" },
      ],
    },
    {
      title: "核心指南",
      links: [
        { text: "React Native 热更新全面指南", href: "/react-native-ota-updates" },
        { text: "从 CodePush 迁移", href: "/docs/migrate-from-codepush" },
        { text: "Expo 项目热更新接入", href: "/docs/expo" },
        { text: "React Native 新架构（0.82+）", href: "/docs/new-architecture" },
        { text: "鸿蒙 HarmonyOS 热更新", href: "/docs/harmony" },
        { text: "Android 多渠道与 AAB 热更新", href: "/docs/android-channels-and-aab" },
        { text: "原生 App 混编（Brownfield）", href: "/docs/brownfield" },
      ],
    },
    {
      title: "文档与支持",
      links: [
        { text: "快速开始", href: "/docs/getting-started" },
        { text: "CI/CD 自动发布", href: "/docs/cicd" },
        { text: "热更新排障指南", href: "/docs/troubleshooting" },
        { text: "数据分析与报错监控", href: "/docs/analytics" },
        { text: "常见问题", href: "/docs/faq" },
        { text: "更新日志", href: "/docs/changelog" },
        {
          text: "Issue 讨论区",
          href: "https://github.com/reactnativecn/react-native-update/issues",
          external: true,
        },
        { text: "llms.txt", href: "/llms.txt" },
      ],
    },
    {
      title: "生态链接",
      links: [
        {
          text: "React Native 中文网",
          href: "https://reactnative.cn/",
          external: true,
        },
        {
          text: "Cresc（全球国际版）",
          href: "https://cresc.dev/",
          external: true,
        },
        {
          text: "ReactJS 中文文档",
          href: "https://zh-hans.react.dev/",
          external: true,
        },
      ],
    },
  ];

  return (
    <footer className="rp-not-doc bg-[#060b18] text-slate-200 mt-auto border-t border-white/[0.06]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="!text-white font-bold text-base !mb-5 tracking-wide">
                {col.title}
              </h3>
              <ul className="space-y-3 !pl-0 list-none">
                {col.links.map((link) => (
                  <li key={link.text} className="!my-0">
                    {link.href ? (
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="!text-slate-300 hover:!text-white !no-underline transition-colors duration-200 text-sm leading-relaxed"
                      >
                        {link.text}
                      </a>
                    ) : (
                      <span className="text-slate-300 text-sm leading-relaxed">
                        {link.text}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-slate-400">
            <p>React Native 中文网 © {new Date().getFullYear()} 武汉青罗网络科技有限公司</p>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div className="flex items-center gap-3">
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                鄂ICP备20002031号-3
              </a>
              <a
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011202001821"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <img
                  src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"
                  alt="公安备案图标"
                  className="w-4 h-4"
                />
                鄂公网安备 42011202001821号
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
