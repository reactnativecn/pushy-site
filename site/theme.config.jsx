import Image from "next/image";
import logo from "./public/images/logo.svg";
import Footer from "./components/layout/Footer";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import { Button } from "antd";
export default {
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – Pushy 极速热更新",
      };
    }
    return {
      titleTemplate: "Pushy 极速热更新",
    };
  },
  head: () => {
    const { title } = useConfig();
    const url = "https://pushy.reactnative.cn";

    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title || "Pushy 极速热更新"} />
        <meta property="og:description" content={"Pushy 极速热更新"} />
        <meta
          property="og:keywords"
          content={"热更新,hotupdate,免审核,快速上架"}
        />
      </>
    );
  },
  logo: <Image height={48} src={logo} alt="Pushy 极速热更新" />,
  docsRepositoryBase: "https://github.com/reactnativecn/react-native-pushy",
  project: {
    link: "https://github.com/reactnativecn/react-native-pushy",
  },
  footer: {
    component: Footer,
  },
  darkMode: false,
  nextThemes: {
    defaultTheme: "light",
  },
  navbar: {
    extraContent: (
      <div className="header-meta">
        <div className="right-header">
          <Button
            shape="round"
            href="https://pushy-admin.reactnative.cn/#/user"
            target="_blank"
          >
            登录
          </Button>
          <Button
            shape="round"
            href="https://pushy-admin.reactnative.cn/#/register"
            target="_blank"
            type="primary"
          >
            注册
          </Button>
        </div>
      </div>
    ),
  },
  // themeSwitch: {
  //   useOptions() {
  //     return {
  //       light: "浅色模式",
  //       dark: "夜间模式",
  //       system: "跟随系统",
  //     };
  //   },
  // },
  toc: {
    title: "目录",
  },
  feedback: {
    // content: () => "有疑问？请点击这里反馈",
    content: null,
  },
  editLink: {
    component: null,
  },
  search: {
    placeholder: "搜索文档...",
    emptyResult: "暂无匹配的结果",
  },

  gitTimestamp: null,
  banner: {
    key: 'v10-release',
    text: (
      <a href="https://pushy.reactnative.cn" target="_blank">
        您当前访问的是已过期版本的文档，点击这里可以查看重新优化设计API的最新版本(v10+)🌟 →
      </a>
    )
  },
};
