import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONTS } from "../styles";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const quoteOpacity = spring({
    frame,
    fps,
    delay: 30,
    config: { damping: 200 },
  });

  const sloganOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const linksOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pulsing glow animation
  const glowIntensity = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.3, 0.6]
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgGradientStart} 0%, ${COLORS.bgGradientEnd} 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.primary}${Math.floor(glowIntensity * 99).toString().padStart(2, '0')} 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          marginBottom: 60,
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
          <span style={{ fontSize: 60, color: COLORS.textPrimary, fontWeight: 700 }}>S</span>
        </div>
      </div>

      {/* Alan Kay Quote */}
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: 32,
          fontStyle: 'italic',
          color: COLORS.textSecondary,
          margin: 0,
          opacity: quoteOpacity,
          textAlign: 'center',
          maxWidth: 800,
        }}
      >
        "预测未来的最好方式是创造它。"
      </p>
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: 24,
          color: COLORS.textMuted,
          marginTop: 16,
          marginBottom: 48,
          opacity: quoteOpacity,
        }}
      >
        — Alan Kay
      </p>

      {/* Slogan */}
      <p
        style={{
          fontFamily: FONTS.title,
          fontSize: 42,
          fontWeight: 700,
          color: COLORS.accent,
          margin: 0,
          opacity: sloganOpacity,
          textAlign: 'center',
        }}
      >
        Splash 正在创造 UI 开发的未来
      </p>

      {/* Links */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          display: 'flex',
          gap: 48,
          opacity: linksOpacity,
        }}
      >
        {['github.com/makepad/makepad', 'robius.rs'].map((link) => (
          <span
            key={link}
            style={{
              fontFamily: FONTS.mono,
              fontSize: 18,
              color: COLORS.textMuted,
            }}
          >
            {link}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
