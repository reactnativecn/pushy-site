function Footer() {
  const columns = [
    {
      title: "联系我们",
      links: [
        { text: "邮箱 hi@charmlot.com", href: "mailto:hi@charmlot.com" },
        { text: "QQ群 729013783" },
      ],
    },
    {
      title: "用户协议",
      links: [
        { text: "用户协议", href: "/agreement/", external: true },
        { text: "隐私政策", href: "/agreement/#privacy", external: true },
      ],
    },
    {
      title: "帮助",
      links: [
        { text: "常见问题", href: "/docs/faq" },
        {
          text: "Issue 讨论区",
          href: "https://github.com/reactnativecn/react-native-update/issues",
          external: true,
        },
      ],
    },
    {
      title: "链接",
      links: [
        {
          text: "React Native 中文网",
          href: "https://reactnative.cn/",
          external: true,
        },
        {
          text: "ReactJS",
          href: "https://zh-hans.react.dev/",
          external: true,
        },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-200 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-white font-bold text-base mb-5 tracking-wide">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.text}>
                    {link.href ? (
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-slate-300 hover:text-white transition-colors duration-200 text-sm leading-relaxed"
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
      <div className="border-t border-slate-700/60">
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
                  alt=""
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
