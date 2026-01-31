import { AbsoluteFill, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

import { TitleScene } from "./scenes/TitleScene";
import { VisionScene } from "./scenes/VisionScene";
import { DemoScene } from "./scenes/DemoScene";
import { MarketScene } from "./scenes/MarketScene";
import { TechScene } from "./scenes/TechScene";
import { ArchitectureScene } from "./scenes/ArchitectureScene";
import { CTAScene } from "./scenes/CTAScene";

export const SplashPitch: React.FC = () => {
  const { fps } = useVideoConfig();

  // Scene durations in seconds
  const TITLE_DURATION = 4 * fps;        // 4 seconds
  const VISION_DURATION = 7 * fps;       // 7 seconds
  const DEMO_DURATION = 10 * fps;        // 10 seconds - extended for full demo
  const MARKET_DURATION = 7 * fps;       // 7 seconds
  const TECH_DURATION = 6 * fps;         // 6 seconds
  const ARCH_DURATION = 7 * fps;         // 7 seconds
  const CTA_DURATION = 6 * fps;          // 6 seconds

  const TRANSITION_DURATION = 15;        // 0.5 seconds

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Title */}
        <TransitionSeries.Sequence durationInFrames={TITLE_DURATION}>
          <TitleScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2: Vision - From Code to Conversation */}
        <TransitionSeries.Sequence durationInFrames={VISION_DURATION}>
          <VisionScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 3: Live Demo */}
        <TransitionSeries.Sequence durationInFrames={DEMO_DURATION}>
          <DemoScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 4: Market Opportunity */}
        <TransitionSeries.Sequence durationInFrames={MARKET_DURATION}>
          <MarketScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 5: Technical Differentiators */}
        <TransitionSeries.Sequence durationInFrames={TECH_DURATION}>
          <TechScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 6: AI Architecture */}
        <TransitionSeries.Sequence durationInFrames={ARCH_DURATION}>
          <ArchitectureScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 7: Call to Action */}
        <TransitionSeries.Sequence durationInFrames={CTA_DURATION}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
