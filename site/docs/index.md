---
pageType: home
title: Pushy
hero:
  name: Pushy
  text: 极速热更新框架 for React Native
  tagline: |
    高速节点勤分发 山河浩广若比邻
    增量算法尽优化 字节四两拨千斤
  actions:
    - theme: brand
      text: 立即免费体验
      link: /docs/intro/
    - theme: alt
      text: GitHub
      link: https://github.com/reactnativecn/react-native-update
  image:
    src: /images/home_hero.svg
    alt: Pushy
features:
  - title: 增量更新
    details: 基于 bsdiff/hdiff 算法创建，kb 级别超小更新包
    icon: "DIFF"
  - title: 快捷发布
    details: 命令行工具 & 网页双端管理，支持 CI 部署
    icon: "CLI"
  - title: 极速下载
    details: 基于阿里云高速 CDN 分发，全国范围秒速更新
    icon: "CDN"
  - title: 稳定可靠
    details: 自带崩溃回滚机制，更新过程安全可靠
    icon: "SAFE"
  - title: 灵活扩展
    details: 支持定制元信息，提供灵活自由的更新策略
    icon: "META"
  - title: 技术支持
    details: 技术问题工作时间内小时级响应
    icon: "SUP"
---

## 他们选择了 Pushy

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 16px; align-items: center;">
  <img src="/images/showcase/zglt.png" alt="中国联通" style="height: 40px; margin: 0 auto;" />
  <img src="/images/showcase/wyyx.png" alt="网易游戏" style="height: 40px; margin: 0 auto;" />
  <img src="/images/showcase/hzsfdx.jpg" alt="华中师范大学" style="height: 56px; margin: 0 auto;" />
  <img src="/images/showcase/lyl.png" alt="蓝月亮" style="height: 40px; margin: 0 auto;" />
  <img src="/images/showcase/opple.png" alt="欧普照明" style="height: 56px; margin: 0 auto;" />
  <img src="/images/showcase/pabdc.png" alt="平安不动产" style="height: 40px; margin: 0 auto;" />
  <img src="/images/showcase/tjgj.png" alt="天津公交" style="height: 40px; margin: 0 auto;" />
  <img src="/images/showcase/rjwl.svg" alt="锐捷网络" style="height: 32px; margin: 0 auto;" />
  <img src="/images/showcase/hqsb.png" alt="环球时报" style="height: 40px; margin: 0 auto;" />
  <img src="/images/showcase/htxx.png" alt="航天信息" style="height: 48px; margin: 0 auto;" />
</div>

## 3 分钟上手

```bash
# 安装
npm i -g react-native-update-cli
npm i react-native-update

# 上传原生包
pushy uploadIpa yourApp.ipa
pushy uploadApk yourApp.apk

# 生成并上传热更包
pushy bundle --platform android
pushy bundle --platform ios
```

[查看文档](/docs/getting-started/)
