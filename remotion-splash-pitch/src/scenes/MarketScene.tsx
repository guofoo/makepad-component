import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONTS } from "../styles";

const MARKET_DATA = [
  { label: '低代码/无代码', value2021: 13.8, value2027: 65, cagr: '30%', color: COLORS.chart1 },
  { label: 'AI 代码生成', value2023: 1.2, value2030: 12, cagr: '40%', color: COLORS.chart2 },
  { label: '跨平台 UI', value2023: 8, value2030: 25, cagr: '18%', color: COLORS.chart3 },
];

const AnimatedBar: React.FC<{
  value: number;
  maxValue: number;
  color: string;
  delay: number;
  label: string;
  subLabel: string;
}> = ({ value, maxValue, color, delay, label, subLabel }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });

  const width = interpolate(progress, [0, 1], [0, (value / maxValue) * 100]);

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8,
          fontFamily: FONTS.body,
        }}
      >
        <span style={{ fontSize: 18, color: COLORS.textPrimary }}>{label}</span>
        <span style={{ fontSize: 16, color: COLORS.textSecondary }}>{subLabel}</span>
      </div>
      <div
        style={{
          height: 40,
          background: `${color}20`,
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 16,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.textPrimary,
              opacity: progress,
            }}
          >
            ${value}B
          </span>
        </div>
      </div>
    </div>
  );
};

export const MarketScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const highlightOpacity = interpolate(frame, [120, 140], [0, 1], {
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
      <div style={{ opacity: titleOpacity }}>
        <h2
          style={{
            fontFamily: FONTS.title,
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.textPrimary,
            margin: '0 0 16px 0',
          }}
        >
          市场机遇
        </h2>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 24,
            color: COLORS.textSecondary,
            margin: '0 0 60px 0',
          }}
        >
          5000 亿美元的开发者工具市场
        </p>
      </div>

      {/* Market bars */}
      <div style={{ maxWidth: 900 }}>
        <AnimatedBar
          label="低代码/无代码"
          value={65}
          maxValue={70}
          color={COLORS.chart1}
          delay={20}
          subLabel="138亿 → 650亿美元 | CAGR 30%"
        />
        <AnimatedBar
          label="AI 代码生成"
          value={12}
          maxValue={70}
          color={COLORS.chart2}
          delay={40}
          subLabel="12亿 → 120亿美元 | CAGR 40%"
        />
        <AnimatedBar
          label="跨平台 UI"
          value={25}
          maxValue={70}
          color={COLORS.chart3}
          delay={60}
          subLabel="80亿 → 250亿美元 | CAGR 18%"
        />
      </div>

      {/* Highlight box */}
      <div
        style={{
          marginTop: 60,
          padding: 32,
          background: `linear-gradient(135deg, ${COLORS.primary}20 0%, ${COLORS.accent}20 100%)`,
          borderRadius: 16,
          border: `1px solid ${COLORS.primary}40`,
          opacity: highlightOpacity,
          transform: `translateY(${interpolate(highlightOpacity, [0, 1], [20, 0])}px)`,
        }}
      >
        <p
          style={{
            fontFamily: FONTS.title,
            fontSize: 28,
            fontWeight: 600,
            color: COLORS.textPrimary,
            margin: 0,
            textAlign: 'center',
          }}
        >
          <span style={{ color: COLORS.primary }}>Splash</span> 处于三个高增长细分市场的
          <span style={{ color: COLORS.accent }}> 交汇点</span>
        </p>
      </div>

      {/* Target users */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 80,
          right: 80,
          display: 'flex',
          gap: 24,
          opacity: interpolate(frame, [140, 160], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        {[
          { icon: '👨‍💻', label: '企业开发者' },
          { icon: '🤖', label: 'AI/ML 团队' },
          { icon: '📊', label: '业务分析师' },
          { icon: '🔧', label: 'IoT 嵌入式' },
        ].map((item, i) => (
          <div
            key={item.label}
            style={{
              flex: 1,
              padding: 20,
              background: COLORS.bgCard,
              borderRadius: 12,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
            <div
              style={{
                fontFamily: FONTS.body,
                fontSize: 16,
                color: COLORS.textSecondary,
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
