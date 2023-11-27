const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

module.exports = withNextra({
  output: "export",
  // i18n: {
  //   locales: ["zh-CN"],
  //   defaultLocale: "zh-CN",
  // },
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  transpilePackages: [
    "antd",
    "@ant-design/icons",
    "tween-one",
    "rc-tween-one",
    "rc-scroll-anim",
  ],
});
