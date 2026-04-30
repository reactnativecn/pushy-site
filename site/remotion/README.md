# React Native Update Hero Loop

This Remotion composition renders a 10-second seamless homepage hero background for `react-native-update`.

## Composition

- `ReactNativeUpdateHero`: 1920x1080, 30fps, 300 frames, seamless loop.
- `ReactNativeUpdateHeroPoster`: fallback poster still at frame 96.

Reusable components:

- `HeroBackground`
- `ArchitectureNodes`
- `DataFlowLine`
- `Pulse`
- `AmbientGrid`
- `RolloutRing`

The visual concept is a restrained "Living Release Network": CLI/Admin publishing into the Server API, async diff worker, CDN, SDK `checkUpdate`, app apply/`markSuccess`, staged rollout, and rollback protection.

## Commands

Preview:

```bash
bun run hero:studio
```

Render MP4:

```bash
bun run hero:render:mp4
```

Render WebM:

```bash
bun run hero:render:webm
```

Render fallback poster:

```bash
bun run hero:poster
```

## Export Settings

Recommended homepage background exports:

- MP4: H.264, `yuv420p`, CRF 18-22, PNG frame pipeline, 1920x1080, 30fps, no audio.
- WebM: VP9, CRF 30-34, 1920x1080, 30fps, no audio.
- Poster: PNG from `ReactNativeUpdateHeroPoster`.

For production, serve both video formats and the poster:

```html
<video autoplay muted loop playsinline poster="/react-native-update-hero-poster.png">
  <source src="/react-native-update-hero.webm" type="video/webm" />
  <source src="/react-native-update-hero.mp4" type="video/mp4" />
</video>
```
