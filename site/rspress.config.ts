import { defineConfig } from "rspress/config";

export default defineConfig({
  root: "docs",
  builderConfig: {
    output: {
      distPath: {
        root: 'out',
      },
    },
  },
  themeConfig: {
    nav: [
      {
        text: "首页",
        link: "/",
        position: "left",
      },
      {
        text: "更多链接",
        items: [
          {
            text: "GitHub",
            link: "http://github.com/",
          },
          {
            text: "X",
            link: "http://x.com/",
          },
          // 也可以是一个导航栏组
          {
            text: "Group",
            items: [
              {
                text: "Personal",
                link: "http://example.com/",
              },
              {
                text: "Company",
                link: "http://example.com/",
              },
            ],
          },
        ],
        position: "right",
      },
    ],
  },
});
