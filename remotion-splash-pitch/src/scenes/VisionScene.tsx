import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";
import { COLORS, FONTS } from "../styles";

const CodeBlock: React.FC<{ code: string; delay: number }> = ({ code, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });

  const visibleChars = Math.floor(interpolate(progress, [0, 1], [0, code.length]));
  const displayedCode = code.slice(0, visibleChars);

  return (
    <div
      style={{
        fontFamily: FONTS.mono,
        fontSize: 20,
        color: COLORS.accent,
        background: COLORS.bgCard,
        padding: '16px 24px',
        borderRadius: 12,
        borderLeft: `4px solid ${COLORS.accent}`,
        opacity: interpolate(progress, [0, 0.1], [0, 1]),
      }}
    >
      {displayedCode}
      <span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>|</span>
    </div>
  );
};

export const VisionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const problemOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowOpacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const solutionOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgGradientStart} 0%, ${COLORS.bgGradientEnd} 100%)`,
        padding: 80,
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontFamily: FONTS.title,
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.textPrimary,
          margin: '0 0 60px 0',
          opacity: titleOpacity,
        }}
      >
        从代码到对话
      </h2>

      <div style={{ display: 'flex', gap: 60, flex: 1 }}>
        {/* Problem side */}
        <div style={{ flex: 1, opacity: problemOpacity }}>
          <h3
            style={{
              fontFamily: FONTS.title,
              fontSize: 32,
              color: COLORS.chart4,
              marginBottom: 24,
            }}
          >
            传统开发
          </h3>
          <div
            style={{
              background: COLORS.bgCard,
              borderRadius: 16,
              padding: 32,
              border: `1px solid ${COLORS.chart4}30`,
            }}
          >
            {['学习复杂的编程语言', '理解特定框架 API', '编写数百行样板代码'].map((item, i) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  marginBottom: i < 2 ? 20 : 0,
                  fontFamily: FONTS.body,
                  fontSize: 24,
                  color: COLORS.textSecondary,
                }}
              >
                <span style={{ color: COLORS.chart4 }}>✗</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            opacity: arrowOpacity,
          }}
        >
          <div
            style={{
              fontSize: 60,
              color: COLORS.primary,
              transform: `translateX(${interpolate(arrowOpacity, [0, 1], [-20, 0])}px)`,
            }}
          >
            →
          </div>
        </div>

        {/* Solution side */}
        <div style={{ flex: 1, opacity: solutionOpacity }}>
          <h3
            style={{
              fontFamily: FONTS.title,
              fontSize: 32,
              color: COLORS.accent,
              marginBottom: 24,
            }}
          >
            Splash 开发
          </h3>
          <div
            style={{
              background: COLORS.bgCard,
              borderRadius: 16,
              padding: 32,
              border: `1px solid ${COLORS.accent}30`,
            }}
          >
            <CodeBlock code='"创建一个登录表单"' delay={110} />
            <div style={{ height: 16 }} />
            <CodeBlock code='"添加三个指标卡片"' delay={130} />
            <div style={{ height: 16 }} />
            <CodeBlock code='"构建聊天界面"' delay={150} />
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          marginTop: 40,
          textAlign: 'center',
          opacity: interpolate(frame, [160, 180], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 28,
            color: COLORS.primaryLight,
          }}
        >
          AI 理解意图 → 生成组件 → 即时渲染
        </p>
      </div>
    </AbsoluteFill>
  );
};
