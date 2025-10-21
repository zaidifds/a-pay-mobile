import { Theme } from '../types';
import { COLORS } from '../constants';
import { fp, rp } from '../utils/responsive';

export const lightTheme: Theme = {
  colors: {
    primary: COLORS.PRIMARY,
    secondary: COLORS.SECONDARY,
    background: COLORS.BACKGROUND,
    surface: COLORS.SURFACE,
    text: COLORS.TEXT,
    textSecondary: COLORS.TEXT_SECONDARY,
    border: '#C6C6C8',
    error: COLORS.ERROR,
    success: COLORS.SUCCESS,
    warning: COLORS.WARNING,
  },
  spacing: {
    xs: rp(4),
    sm: rp(8),
    md: rp(16),
    lg: rp(24),
    xl: rp(32),
  },
  typography: {
    h1: {
      fontSize: fp(32),
      fontWeight: 'bold',
      lineHeight: fp(40),
    },
    h2: {
      fontSize: fp(24),
      fontWeight: 'bold',
      lineHeight: fp(32),
    },
    h3: {
      fontSize: fp(20),
      fontWeight: '600',
      lineHeight: fp(28),
    },
    body: {
      fontSize: fp(16),
      fontWeight: 'normal',
      lineHeight: fp(24),
    },
    caption: {
      fontSize: fp(12),
      fontWeight: 'normal',
      lineHeight: fp(16),
    },
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
  },
};
