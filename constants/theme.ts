// Medical Prescription App Theme
export const Colors = {
  // Primary - Medical Blue/Green
  primary: '#0077B6',
  primaryDark: '#005A8D',
  primaryLight: '#00B4D8',
  
  // Surface
  background: '#F8FAFB',
  surface: '#FFFFFF',
  surfaceVariant: '#F0F4F7',
  
  // Medical Semantic
  success: '#00A86B',
  warning: '#F59E0B',
  error: '#DC2626',
  
  // Text
  text: '#1A202C',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  
  // Borders
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  
  // Accents
  accent: '#06B6D4',
  badge: '#EFF6FF',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Typography = {
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 30,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
};

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
};
