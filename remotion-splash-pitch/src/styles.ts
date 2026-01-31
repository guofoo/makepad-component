// Splash brand colors and styles
export const COLORS = {
  // Primary palette
  primary: '#6366F1',      // Indigo
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',

  // Accent colors
  accent: '#10B981',       // Emerald green
  accentLight: '#34D399',

  // Backgrounds
  bgDark: '#0F0F23',
  bgCard: '#1A1A2E',
  bgGradientStart: '#0F0F23',
  bgGradientEnd: '#1E1E3F',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A0AEC0',
  textMuted: '#6B7280',

  // Chart colors
  chart1: '#6366F1',
  chart2: '#10B981',
  chart3: '#F59E0B',
  chart4: '#EF4444',
  chart5: '#8B5CF6',
};

export const FONTS = {
  title: 'Inter, system-ui, sans-serif',
  body: 'Inter, system-ui, sans-serif',
  mono: 'JetBrains Mono, monospace',
};

export const commonStyles = {
  absoluteFill: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
};
