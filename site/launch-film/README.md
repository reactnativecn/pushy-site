# 首页发布动画（launch film）

首页 hero 里播放的发布片，本身就是一个网页：`src.html` 按时间 `t`（0–64 秒）确定性地摆好每一帧，
站点里以同源 iframe 实时播放（`pages/public/launch/`），也能逐帧截图导出 MP4。
配乐 `music.js` 用 Web Audio 实时合成（120 BPM，与画面切点对齐），不需要音频文件。

| 文件 | 作用 |
|---|---|
| `src.html` | 动画页模板：场景、文案（中文）、样式、`seek(t)`，以及站点内的播放器（缩放、播放/暂停、声音开关、`window.launchPlayer`） |
| `music.js` | 配乐：前瞻调度器即时创建音符节点；`render()` 离线渲染整轨（导出、校准用） |
| `build.py` | 生成页面：中文 → `../pages/public/launch/`；英文 Cresc 版（文案替换 + 铜金配色 + Cresc logo）→ 同级 `cresc-site/site/pages/public/launch/`（可用 `CRESC_SITE` 指定，找不到时写到 `dist/cresc/`）。字体按页面实际用到的字形从 Google Fonts 取子集并自托管 |
| `stills.mjs` / `render.mjs` / `render-video.sh` | 截图、逐帧渲染、导出 1080p60 MP4 |
| `export-audio.mjs` | 把配乐渲染成 `music.wav`；`--raw` 输出未限幅峰值，用于校准 `music.js` 里的 `DRIVE` |

## 修改与发布

```bash
cd site/launch-film
npm i
python3 build.py                              # 重新生成两个站点的 launch/ 页面
SKIP_SITE=1 python3 build.py && node stills.mjs 3 18 25 38   # 本地截图核对（stills/）
PAGE=index-en.html node stills.mjs 3 18 25 38
```

改完提交 `pages/public/launch/`（以及 cresc-site 的同名目录）即可随站点发布。
章节时间点改动时，同步 `components/home/Banner.tsx` 里的 `chapters`。

## 导出视频

```bash
./render-video.sh index.html pushy-launch.mp4      # 需要 ffmpeg；FFMPEG / CHROMIUM / JOBS 可覆盖
./render-video.sh index-en.html cresc-launch.mp4
```

## 嵌入约定

`Banner.tsx` 用 iframe 加载 `/launch/index.html`，页面加载后读取 `contentWindow.launchPlayer`：

- `subscribe(fn)`：每帧回调 `(time, playing)`，章节条据此画进度；
- `seek(time)`：章节条点击跳转；
- `setVisible(bool)`：滚出视口时停止渲染与配乐。

声音开关在 iframe 内部——浏览器只在用户手势发生的那个文档里解锁音频。
`prefers-reduced-motion` 下停在 logo 帧，等用户点击播放。
