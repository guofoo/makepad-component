import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONTS } from "../styles";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance animation
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  // Title slide up
  const titleY = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const titleOffset = interpolate(titleY, [0, 1], [50, 0]);
  const titleOpacity = interpolate(titleY, [0, 1], [0, 1]);

  // Subtitle fade in
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tagline
  const taglineOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgGradientStart} 0%, ${COLORS.bgGradientEnd} 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Background particles/grid effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `radial-gradient(${COLORS.primary} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 24,
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: `0 20px 60px ${COLORS.primary}40`,
          }}
        >
          <span style={{ fontSize: 60, color: COLORS.textPrimary }}>S</span>
        </div>
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: FONTS.title,
          fontSize: 96,
          fontWeight: 800,
          color: COLORS.textPrimary,
          margin: 0,
          opacity: titleOpacity,
          transform: `translateY(${titleOffset}px)`,
          textShadow: `0 4px 20px ${COLORS.primary}60`,
        }}
      >
        Splash
      </h1>

      {/* Subtitle */}
      <h2
        style={{
          fontFamily: FONTS.body,
          fontSize: 36,
          fontWeight: 400,
          color: COLORS.textSecondary,
          margin: '20px 0',
          opacity: subtitleOpacity,
        }}
      >
        AI 原生 UI 脚本语言
      </h2>

      {/* Tagline */}
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: 24,
          color: COLORS.accent,
          margin: 0,
          opacity: taglineOpacity,
        }}
      >
        自然语言驱动的界面生成
      </p>

      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          display: 'flex',
          gap: 16,
          opacity: taglineOpacity,
        }}
      >
        {['跨平台', 'GPU加速', 'Rust安全'].map((tag, i) => (
          <div
            key={tag}
            style={{
              padding: '12px 24px',
              borderRadius: 24,
              border: `1px solid ${COLORS.primary}40`,
              color: COLORS.textSecondary,
              fontSize: 16,
              fontFamily: FONTS.body,
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
