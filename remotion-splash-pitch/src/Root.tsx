import { Composition } from "remotion";
import { SplashPitch } from "./SplashPitch";

export const RemotionRoot = () => {
  return (
    <Composition
      id="SplashPitch"
      component={SplashPitch}
      durationInFrames={30 * 47} // 47 seconds at 30fps
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{}}
    />
  );
};
