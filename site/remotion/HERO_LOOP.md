# Pushy Homepage Hero Loop

This Remotion composition creates a 10-second seamless homepage background loop for a non-technical business audience. The source keeps the left side quiet for headline and CTA copy, while the right side shows a calm professional using a phone as a small app improvement arrives.

## Composition

- `PushyHeroLoop`
- 1920x1080
- 30 fps
- 300 frames
- Source asset: `/hero-loop/office-phone-base.png`
- Suggested poster frame: frame `126`

## Preview

```bash
bun run remotion:studio
```

## Render

```bash
bun run remotion:poster:hero
bun run remotion:render:hero:mp4
bun run remotion:render:hero:webm
```

Use WebM first for modern browsers and MP4 as the compatibility fallback. Keep both muted, looping, inline, and behind a left-side readability gradient.

## Website Embed

```tsx
<video
  className="absolute inset-0 h-full w-full object-cover"
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster="/hero-loop/pushy-hero-loop-poster.png"
  aria-hidden="true"
>
  <source src="/hero-loop/pushy-hero-loop.webm" type="video/webm" />
  <source src="/hero-loop/pushy-hero-loop.mp4" type="video/mp4" />
</video>
```

Recommended CSS behavior:

- Put text and CTAs in the left 42% of the hero.
- Add a light-to-transparent overlay from left to right for contrast.
- Respect `prefers-reduced-motion` by falling back to the poster image.
- Use `object-fit: cover`; avoid cropping the phone on the right at desktop widths.
