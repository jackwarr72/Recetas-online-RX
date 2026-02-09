import React, { createContext, useState, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  background: string;
  surface: string;
  surfaceVariant: string;
  success: string;
  warning: string;
  error: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  borderLight: string;
  accent: string;
  badge: string;
  backdrop: string;
}

const lightColors: ThemeColors = {
  primary: '#0077B6',
  primaryDark: '#005A8D',
  primaryLight: '#00B4D8',
  background: '#F8FAFB',
  surface: '#FFFFFF',
  surfaceVariant: '#F0F4F7',
  success: '#00A86B',
  warning: '#F59E0B',
  error: '#DC2626',
  text: '#1A202C',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  accent: '#06B6D4',
  badge: '#EFF6FF',
  backdrop: 'rgba(0,0,0,0.5)',
};

const darkColors: ThemeColors = {
  primary: '#00B4D8',
  primaryDark: '#0077B6',
  primaryLight: '#48CAE4',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceVariant: '#334155',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',
  border: '#334155',
  borderLight: '#475569',
  accent: '#06B6D4',
  badge: '#1E3A5F',
  backdrop: 'rgba(0,0,0,0.7)',
};

interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const value = {
    mode,
    colors: mode === 'light' ? lightColors : darkColors,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
