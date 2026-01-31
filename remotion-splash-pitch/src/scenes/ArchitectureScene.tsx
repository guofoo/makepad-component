import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONTS } from "../styles";

const AnimatedBox: React.FC<{
  label: string;
  sublabel?: string;
  delay: number;
  color: string;
  width?: number;
}> = ({ label, sublabel, delay, color, width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    delay,
    config: { damping: 12 },
  });

  return (
    <div
      style={{
        padding: '20px 32px',
        background: `${color}20`,
        border: `2px solid ${color}`,
        borderRadius: 12,
        transform: `scale(${scale})`,
        width: width || 'auto',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: FONTS.title,
          fontSize: 18,
          fontWeight: 600,
          color: COLORS.textPrimary,
        }}
      >
        {label}
      </div>
      {sublabel && (
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 14,
            color: COLORS.textSecondary,
            marginTop: 4,
          }}
        >
          {sublabel}
        </div>
      )}
    </div>
  );
};

const AnimatedArrow: React.FC<{ delay: number; direction: 'down' | 'right' }> = ({ delay, direction }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        color: COLORS.primary,
        fontSize: 32,
        padding: direction === 'down' ? '16px 0' : '0 16px',
      }}
    >
      {direction === 'down' ? '↓' : '→'}
    </div>
  );
};

export const ArchitectureScene: React.FC = () => {
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
          AI 集成架构
        </h2>
      </div>

      {/* Architecture diagram */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {/* User input layer */}
        <AnimatedBox
          label="用户自然语言"
          sublabel='"创建一个带有开关的设置页面"'
          delay={10}
          color={COLORS.chart2}
          width={600}
        />

        <AnimatedArrow delay={30} direction="down" />

        {/* Splash interpreter layer */}
        <div
          style={{
            padding: 32,
            background: COLORS.bgCard,
            borderRadius: 16,
            border: `2px solid ${COLORS.primary}`,
            width: 800,
            opacity: interpolate(frame, [40, 60], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 20,
              fontWeight: 600,
              color: COLORS.primary,
              marginBottom: 24,
              textAlign: 'center',
            }}
          >
            Splash 解释器
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <AnimatedBox label="NLP 解析器" delay={60} color={COLORS.chart1} />
            <AnimatedArrow delay={75} direction="right" />
            <AnimatedBox label="意图映射" delay={80} color={COLORS.chart3} />
            <AnimatedArrow delay={95} direction="right" />
            <AnimatedBox label="组件生成器" delay={100} color={COLORS.chart5} />
          </div>
        </div>

        <AnimatedArrow delay={115} direction="down" />

        {/* Makepad runtime layer */}
        <div
          style={{
            padding: '24px 48px',
            background: `linear-gradient(135deg, ${COLORS.accent}30 0%, ${COLORS.primary}30 100%)`,
            borderRadius: 16,
            border: `2px solid ${COLORS.accent}`,
            width: 600,
            textAlign: 'center',
            opacity: interpolate(frame, [125, 145], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 20,
              fontWeight: 600,
              color: COLORS.accent,
              marginBottom: 8,
            }}
          >
            Makepad 运行时
          </div>
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 16,
              color: COLORS.textSecondary,
            }}
          >
            GPU 加速的原生组件渲染
          </div>
        </div>
      </div>

      {/* Roadmap preview */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 80,
          right: 80,
          display: 'flex',
          gap: 24,
          opacity: interpolate(frame, [150, 170], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        {[
          { phase: '第一阶段', title: '命令式生成', status: '当前' },
          { phase: '第二阶段', title: '上下文感知', status: '2025 Q2' },
          { phase: '第三阶段', title: '完全 AI 自主', status: '2025 Q4' },
        ].map((item, i) => (
          <div
            key={item.phase}
            style={{
              flex: 1,
              padding: 20,
              background: i === 0 ? `${COLORS.accent}20` : COLORS.bgCard,
              borderRadius: 12,
              border: i === 0 ? `1px solid ${COLORS.accent}` : `1px solid ${COLORS.bgCard}`,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                color: i === 0 ? COLORS.accent : COLORS.textMuted,
                marginBottom: 4,
              }}
            >
              {item.phase}
            </div>
            <div
              style={{
                fontFamily: FONTS.title,
                fontSize: 18,
                fontWeight: 600,
                color: COLORS.textPrimary,
                marginBottom: 4,
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                color: COLORS.textSecondary,
              }}
            >
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
