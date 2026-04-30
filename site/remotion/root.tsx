import { Composition, Folder } from "remotion";
import { PushyHeroLoop } from "./src/PushyHeroLoop";

export const HERO_FPS = 30;
export const HERO_DURATION_SECONDS = 10;
export const HERO_DURATION_FRAMES = HERO_FPS * HERO_DURATION_SECONDS;
export const HERO_WIDTH = 1920;
export const HERO_HEIGHT = 1080;

export const RemotionRoot = () => {
  return (
    <Folder name="Homepage">
      <Composition
        id="PushyHeroLoop"
        component={PushyHeroLoop}
        durationInFrames={HERO_DURATION_FRAMES}
        fps={HERO_FPS}
        width={HERO_WIDTH}
        height={HERO_HEIGHT}
        defaultProps={{
          statusLabel: "Ready",
          cardLabel: "Improved",
        }}
      />
    </Folder>
  );
};
