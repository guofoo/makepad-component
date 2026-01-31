import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONTS } from "../styles";

// Accurate Splash UI Demo based on actual screenshots
export const DemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Panel entrance
  const panelScale = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Command sequences based on screenshots
  const commands = [
    { text: "add label hel", startFrame: 10, duration: 25 },
    { text: "add card User Profile", startFrame: 55, duration: 30 },
    { text: "add progress 60", startFrame: 105, duration: 25 },
    { text: "add switch Dark Model", startFrame: 150, duration: 30 },
  ];

  // Widget generation frames
  const labelAppearFrame = 40;
  const cardAppearFrame = 90;
  const progressAppearFrame = 135;
  const switchAppearFrame = 185;
  const switchToggleFrame = 210;

  // Get current typing text
  const getCurrentTyping = () => {
    for (const cmd of commands) {
      if (frame >= cmd.startFrame && frame < cmd.startFrame + cmd.duration + 15) {
        const progress = interpolate(
          frame,
          [cmd.startFrame, cmd.startFrame + cmd.duration],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        return cmd.text.slice(0, Math.floor(cmd.text.length * progress));
      }
    }
    return "";
  };

  // Widget count
  const widgetCount = frame < labelAppearFrame ? 0 :
                      frame < cardAppearFrame ? 1 :
                      frame < progressAppearFrame ? 2 :
                      frame < switchAppearFrame ? 3 : 4;

  // Animation springs for each widget
  const labelScale = spring({ frame, fps, delay: labelAppearFrame, config: { damping: 12 } });
  const cardScale = spring({ frame, fps, delay: cardAppearFrame, config: { damping: 12 } });
  const progressScale = spring({ frame, fps, delay: progressAppearFrame, config: { damping: 12 } });
  const switchScale = spring({ frame, fps, delay: switchAppearFrame, config: { damping: 12 } });

  // Progress bar fill animation
  const progressFill = interpolate(frame, [progressAppearFrame, progressAppearFrame + 30], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Switch toggle animation
  const switchOn = frame >= switchToggleFrame;
  const switchPosition = spring({
    frame,
    fps,
    delay: switchToggleFrame,
    config: { damping: 15 },
  });

  const currentCommand = getCurrentTyping();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgGradientStart} 0%, ${COLORS.bgGradientEnd} 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 60,
          opacity: panelScale,
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.title,
            fontSize: 42,
            fontWeight: 700,
            color: COLORS.textPrimary,
            margin: 0,
          }}
        >
          实时演示 - 自然语言生成 UI
        </h2>
      </div>

      {/* Demo Panel */}
      <div
        style={{
          width: 1000,
          background: '#1e1e2e',
          borderRadius: 12,
          overflow: 'hidden',
          transform: `scale(${panelScale})`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid #313244' }}>
          <h3 style={{ fontFamily: FONTS.title, fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 }}>
            Natural Language UI Generation
          </h3>
          <p style={{ fontFamily: FONTS.body, fontSize: 13, color: '#a6adc8', margin: '6px 0 0 0' }}>
            Type commands to dynamically generate UI widgets in real-time.
          </p>
        </div>

        {/* Command Input Section */}
        <div style={{ padding: '20px 28px' }}>
          <div style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, color: '#89b4fa', marginBottom: 12 }}>
            Command Input
          </div>

          {/* Help text */}
          <div style={{ background: '#313244', padding: 14, borderRadius: 6, marginBottom: 14 }}>
            <p style={{ fontFamily: FONTS.body, fontSize: 11, color: '#6c7086', margin: 0 }}>
              Commands: "add button Submit" | "add label Hello World" | "add card User Profile" | "add progress 75" | "add switch Dark Mode" | "clear"
            </p>
          </div>

          {/* Input field */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div
              style={{
                flex: 1,
                background: '#313244',
                padding: '12px 14px',
                borderRadius: 6,
                fontFamily: FONTS.body,
                fontSize: 14,
                color: currentCommand ? '#cdd6f4' : '#6c7086',
                minHeight: 20,
              }}
            >
              {currentCommand || "Type a command... e.g. 'add button Click Me'"}
              <span style={{ opacity: frame % 30 < 15 ? 1 : 0, color: '#89b4fa' }}>|</span>
            </div>
            <button
              style={{
                background: '#6366f1',
                color: '#fff',
                border: 'none',
                padding: '12px 20px',
                borderRadius: 6,
                fontFamily: FONTS.body,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Generate
            </button>
            <button
              style={{
                background: 'transparent',
                color: '#f38ba8',
                border: 'none',
                padding: '12px 20px',
                borderRadius: 6,
                fontFamily: FONTS.body,
                fontSize: 13,
              }}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#313244', margin: '0 28px' }} />

        {/* Generated UI Section */}
        <div style={{ padding: '20px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, color: '#89b4fa' }}>
              Generated UI
            </span>
            <span style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, color: '#a6e3a1' }}>
              {widgetCount} widgets
            </span>
          </div>

          {/* Generated widgets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 240 }}>

            {/* Widget 1: Label "hel" */}
            {frame >= labelAppearFrame && (
              <div
                style={{
                  transform: `scale(${labelScale})`,
                  transformOrigin: 'top left',
                  opacity: interpolate(labelScale, [0, 1], [0, 1]),
                }}
              >
                <div
                  style={{
                    background: '#313244',
                    padding: '14px 18px',
                    borderRadius: 6,
                    fontFamily: FONTS.body,
                    fontSize: 14,
                    color: '#cdd6f4',
                  }}
                >
                  hel
                </div>
              </div>
            )}

            {/* Widget 2: Card "user profile" */}
            {frame >= cardAppearFrame && (
              <div
                style={{
                  transform: `scale(${cardScale})`,
                  transformOrigin: 'top left',
                  opacity: interpolate(cardScale, [0, 1], [0, 1]),
                }}
              >
                <div
                  style={{
                    background: '#fff',
                    padding: '16px 20px',
                    borderRadius: 8,
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.title,
                      fontSize: 16,
                      fontWeight: 500,
                      color: '#a6adc8',
                      marginBottom: 6,
                    }}
                  >
                    user profile
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 13,
                      color: '#6c7086',
                    }}
                  >
                    This is a dynamically generated card widget.
                  </div>
                </div>
              </div>
            )}

            {/* Widget 3: Progress 60% */}
            {frame >= progressAppearFrame && (
              <div
                style={{
                  transform: `scale(${progressScale})`,
                  transformOrigin: 'top left',
                  opacity: interpolate(progressScale, [0, 1], [0, 1]),
                }}
              >
                <div
                  style={{
                    background: '#313244',
                    padding: '12px 18px',
                    borderRadius: 6,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 12,
                      color: '#a6adc8',
                      marginBottom: 8,
                    }}
                  >
                    Progress: {Math.round(progressFill)}%
                  </div>
                  <div
                    style={{
                      height: 8,
                      background: '#45475a',
                      borderRadius: 4,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${progressFill}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Widget 4: Switch "dark model" */}
            {frame >= switchAppearFrame && (
              <div
                style={{
                  transform: `scale(${switchScale})`,
                  transformOrigin: 'top left',
                  opacity: interpolate(switchScale, [0, 1], [0, 1]),
                }}
              >
                <div
                  style={{
                    background: '#313244',
                    padding: '12px 18px',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 14,
                      color: '#cdd6f4',
                    }}
                  >
                    dark model
                  </span>
                  {/* Toggle switch */}
                  <div
                    style={{
                      width: 44,
                      height: 24,
                      borderRadius: 12,
                      background: switchOn ? '#6366f1' : '#45475a',
                      padding: 2,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        background: '#fff',
                        transform: `translateX(${interpolate(switchPosition, [0, 1], [0, 20])}px)`,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom highlight */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          opacity: interpolate(frame, [220, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        <div
          style={{
            background: `${COLORS.accent}15`,
            border: `1px solid ${COLORS.accent}60`,
            borderRadius: 10,
            padding: '14px 28px',
            fontFamily: FONTS.body,
            fontSize: 18,
            color: COLORS.accent,
          }}
        >
          无限组件类型 · 即时生成 · 无需编写代码
        </div>
      </div>
    </AbsoluteFill>
  );
};
