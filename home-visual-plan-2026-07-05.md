# 首页视觉增强计划（2026-07-05）

目标：在现有暗色首页基础上，用低成本改动继续提升「实时感」与质感。
本轮做 1–3，4–5 为备选。边做边更新状态。

状态图例：⬜ 未开始 · 🔨 进行中 · ✅ 完成 · ⏸ 暂缓

## 1. ✅ LiveStats 增加今日 24 小时流量曲线

服务端 `computePublicMetricsSummary` 已逐小时读取当天全部 bucket，只需
在返回中补 `today.hourly: number[]`（0 点起每小时的检查次数，长度 =
当前小时 + 1）。前端在大数字下方渲染渐变填充的内联 SVG 面积曲线，
尾端当前小时点加发光标记。

- [x] pushy-server：`metricsSummary.ts` 返回 `today.hourly` + 测试（master `3e5c715`，4/4 测试、lint 通过）
- [x] cresc-server：同步同样改动（main `416c225`）
- [x] 前端 `LiveStats.tsx`：SVG 面积曲线组件（Catmull-Rom 平滑）
- [x] 兼容：线上接口尚未部署新字段时曲线整体隐藏，不影响其余内容（真实页已验证 hasTrend=false 且无报错）

## 2. ✅ Bento 卡片鼠标跟随光斑（spotlight hover）

`Page1.tsx` 六张卡：mousemove 把相对坐标写入 `--spot-x/--spot-y`，
卡片内加一层 `radial-gradient(240px at var(--spot-x) var(--spot-y), …)`
的覆盖层，hover 淡入。触屏设备无 hover 自动无效，无需特判。

- [x] Page1 卡片接入 spotlight（grid 容器上单个 onMouseMove 委托）
- [x] home.scss 增加 `.pushy-spotlight` 样式

## 3. ✅ LIVE 大数字改为数位滚轮（odometer)

每个数字位是一列 0–9 的竖向数字带，通过 `translateY(-N em)` +
transition 滚动到目标数字；列 key 从个位向高位编号，保证低位稳定。
逗号原样渲染。`prefers-reduced-motion` 下关闭过渡。

- [x] `LiveStats.tsx` 内实现 `RollingNumber` 组件替换纯文本
- [x] home.scss 增加 odometer 样式 + reduced-motion 分支

## 4. ✅「极速下载」卡片补点阵地图 + CDN 节点脉冲（已改为全球图）

点阵 SVG 中国轮廓 + 主要城市呼吸光点，为后续地理热力图做铺垫。
等第 2 步地理数据方案启动时一起做。

## 5. ✅ CTA 卡片背景复用弱化 aurora + hero 加「HarmonyOS 已支持」

顺手项，本轮时间富余则做。

## 验收

- [x] `bun run build` 通过
- [x] pushy-server / cresc-server 测试与 lint 通过（各 4/4）
- [x] 无头浏览器截图核对 1–3 的实际效果（mock 曲线/滚轮/光斑 OK；真实页滚轮 OK、曲线待服务端部署后自动出现）

## 进度日志

- 2026-07-05 计划创建。
- 2026-07-05 任务 1 服务端完成：两仓库均已提交（未推送/未部署），
  曲线末位为当前小时的部分数据，前端绘制时截掉末位避免「跳水」观感。
- 2026-07-05 任务 1–3 前端完成并验证：mock 页曲线 + 滚轮 + 光斑正常，
  计数器 3 秒内 8,412,855 → 8,413,196 平滑滚动；真实页优雅降级。
  待办：部署 pushy-server（3e5c715）/ cresc-server（416c225）后曲线自动出现。
- 2026-07-05 服务端已部署，真实页曲线上线（hourly 23 项）。
- 2026-07-05 备选 4、5 完成：ChinaDotMap 组件（国界 GeoJSON 网格采样
  514 点 + 台湾/海南补点 + 南海诸岛右下角虚线框簇，8 个 CDN 节点错峰
  脉冲，reduced-motion 关闭）；CTA 卡片叠加 50% 透明 aurora；hero 徽章
  行改为双胶囊，新增「HarmonyOS 已支持」。构建与截图验证通过。
- 2026-07-05 按用户要求把中国点阵图升级为全球图：WorldDotMap
  （world.geo.json 陆地网格采样 1569 点，太平洋 168°W 切图让亚洲居中，
  12 个全球 CDN 节点脉冲：北上广、东京、新加坡、孟买、悉尼、法兰克福、
  伦敦、弗吉尼亚、硅谷、圣保罗）；文案全面改为强调全球可用
  （推送全球 CDN / CDN 全球分发 / 全球 CDN 分发 / 极速下载卡）。
- 2026-07-05 全球图加密：采样网格 3.6°×2.6° → 2.5°×1.8°（1569 → 3282 点，
  点径 0.8 → 0.62），东欧/俄罗斯/中亚/非洲/加拿大/南美覆盖已逐区抽查确认。
- 2026-07-05 追查「卡片标题异常换行」：Chrome 下 dev/生产构建/线上站
  （pushy.reactnative.cn）在 1512/1280/1024 宽度全部单行，未能复现，
  疑为 Safari 特有表现，待用户提供截图或开启 Safari 远程自动化后继续。
- 2026-07-05 「标题换行」定位结果：非浏览器 bug，是卡片头部设计为
  图标独占一行、标题在下（用户预期同行）。已把五张特性卡改为
  「图标 + 标题」同行的 flex 头部布局。
