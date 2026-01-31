import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONTS } from "../styles";

const ComparisonRow: React.FC<{
  metric: string;
  react: string;
  flutter: string;
  splash: string;
  delay: number;
  highlight?: boolean;
}> = ({ metric, react, flutter, splash, delay, highlight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });

  return (
    <div
      style={{
        display: 'flex',
        opacity: progress,
        transform: `translateX(${interpolate(progress, [0, 1], [-30, 0])}px)`,
        marginBottom: 2,
      }}
    >
      <div
        style={{
          flex: 2,
          padding: '16px 20px',
          background: COLORS.bgCard,
          fontFamily: FONTS.body,
          fontSize: 18,
          color: COLORS.textPrimary,
          borderRight: `1px solid ${COLORS.bgDark}`,
        }}
      >
        {metric}
      </div>
      <div
        style={{
          flex: 1,
          padding: '16px 20px',
          background: COLORS.bgCard,
          fontFamily: FONTS.body,
          fontSize: 18,
          color: COLORS.chart4,
          textAlign: 'center',
          borderRight: `1px solid ${COLORS.bgDark}`,
        }}
      >
        {react}
      </div>
      <div
        style={{
          flex: 1,
          padding: '16px 20px',
          background: COLORS.bgCard,
          fontFamily: FONTS.body,
          fontSize: 18,
          color: COLORS.chart3,
          textAlign: 'center',
          borderRight: `1px solid ${COLORS.bgDark}`,
        }}
      >
        {flutter}
      </div>
      <div
        style={{
          flex: 1,
          padding: '16px 20px',
          background: highlight ? `${COLORS.accent}20` : COLORS.bgCard,
          fontFamily: FONTS.body,
          fontSize: 18,
          fontWeight: highlight ? 700 : 400,
          color: COLORS.accent,
          textAlign: 'center',
        }}
      >
        {splash}
      </div>
    </div>
  );
};

export const TechScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgGradientStart} 0%, ${COLORS.bgGradientEnd} 100%)`,
        padding: 80,
      }}
    >
      {/* Title */}
      <div style={{ opacity: titleOpacity, marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: FONTS.title,
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.textPrimary,
            margin: '0 0 16px 0',
          }}
        >
          技术差异化优势
        </h2>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 24,
            color: COLORS.textSecondary,
            margin: 0,
          }}
        >
          原生性能 + 动态灵活 + Rust 安全
        </p>
      </div>

      {/* Comparison table */}
      <div style={{ marginBottom: 60 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            marginBottom: 2,
            opacity: titleOpacity,
          }}
        >
          <div
            style={{
              flex: 2,
              padding: '16px 20px',
              background: COLORS.primary,
              fontFamily: FONTS.title,
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.textPrimary,
            }}
          >
            指标
          </div>
          <div
            style={{
              flex: 1,
              padding: '16px 20px',
              background: COLORS.primary,
              fontFamily: FONTS.title,
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.textPrimary,
              textAlign: 'center',
            }}
          >
            React
          </div>
          <div
            style={{
              flex: 1,
              padding: '16px 20px',
              background: COLORS.primary,
              fontFamily: FONTS.title,
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.textPrimary,
              textAlign: 'center',
            }}
          >
            Flutter
          </div>
          <div
            style={{
              flex: 1,
              padding: '16px 20px',
              background: COLORS.accent,
              fontFamily: FONTS.title,
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.textPrimary,
              textAlign: 'center',
            }}
          >
            Splash
          </div>
        </div>

        {/* Rows */}
        <ComparisonRow metric="包体积" react="150KB+" flutter="2MB+" splash="800KB" delay={15} highlight />
        <ComparisonRow metric="首次绘制" react="500ms+" flutter="300ms+" splash="<50ms" delay={30} highlight />
        <ComparisonRow metric="60fps 保证" react="否" flutter="部分" splash="是" delay={45} highlight />
        <ComparisonRow metric="内存占用" react="高" flutter="中" splash="低" delay={60} highlight />
        <ComparisonRow metric="AI 原生" react="否" flutter="否" splash="是" delay={75} highlight />
      </div>

      {/* Key features */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          opacity: interpolate(frame, [100, 120], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        {[
          { icon: '🦀', title: 'Rust 安全', desc: '内存安全，无 GC 暂停' },
          { icon: '⚡', title: 'GPU 加速', desc: '原生渲染，丝滑60fps' },
          { icon: '🌐', title: '跨平台', desc: 'iOS/Android/桌面/Web' },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              flex: 1,
              padding: 24,
              background: COLORS.bgCard,
              borderRadius: 16,
              border: `1px solid ${COLORS.primary}30`,
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
            <h3
              style={{
                fontFamily: FONTS.title,
                fontSize: 22,
                fontWeight: 600,
                color: COLORS.textPrimary,
                margin: '0 0 8px 0',
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 16,
                color: COLORS.textSecondary,
                margin: 0,
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
