import { Composition, Folder, Still } from "remotion";
import { HeroBackground } from "./HeroBackground";
import {
  HERO_FPS,
  HERO_HEIGHT,
  HERO_TOTAL_FRAMES,
  HERO_WIDTH,
  POSTER_FRAME,
} from "./constants";

const PosterFrame = () => <HeroBackground frameOverride={POSTER_FRAME} />;

export const RemotionRoot = () => (
  <Folder name="ReactNativeUpdate">
    <Composition
      id="ReactNativeUpdateHero"
      component={HeroBackground}
      durationInFrames={HERO_TOTAL_FRAMES}
      fps={HERO_FPS}
      width={HERO_WIDTH}
      height={HERO_HEIGHT}
      defaultProps={{}}
    />
    <Still
      id="ReactNativeUpdateHeroPoster"
      component={PosterFrame}
      width={HERO_WIDTH}
      height={HERO_HEIGHT}
    />
  </Folder>
);
