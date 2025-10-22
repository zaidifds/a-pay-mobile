import { Theme } from '../types';
import { fp, rp } from '../utils/responsive';

// Light theme configuration
export const lightTheme: Theme = {
  colors: {
    // Primary colors (HSL: 221.2 83.2% 53.3%)
    primary: '#3B82F6', // --primary
    primaryLight: '#60A5FA', // Lighter variant
    primaryDark: '#2563EB', // Darker variant

    // Secondary colors (HSL: 210 40% 96.1%)
    secondary: '#F1F5F9', // --secondary
    secondaryLight: '#F8FAFC', // Lighter variant
    secondaryDark: '#E2E8F0', // Darker variant

    // Background colors (HSL: 0 0% 100%)
    background: '#FFFFFF', // --background
    backgroundSecondary: '#F8FAFC', // --muted
    surface: '#FFFFFF', // --card
    surfaceElevated: '#FFFFFF', // Elevated surface
    overlay: 'rgba(0, 0, 0, 0.5)', // Modal overlay

    // Text colors (HSL: 222.2 84% 4.9%)
    text: '#0F172A', // --foreground
    textSecondary: '#64748B', // --muted-foreground (HSL: 215.4 16.3% 46.9%)
    textTertiary: '#94A3B8', // Lighter text
    textInverse: '#FFFFFF', // Inverse text

    // Border and divider colors (HSL: 214.3 31.8% 91.4%)
    border: '#E2E8F0', // --border
    borderLight: '#F1F5F9', // Lighter border
    divider: '#F1F5F9', // --muted

    // Status colors
    error: '#EF4444', // --destructive (HSL: 0 84.2% 60.2%)
    errorLight: '#FCA5A5', // Lighter error
    errorDark: '#DC2626', // Darker error
    success: '#22C55E', // Success green
    successLight: '#86EFAC', // Lighter success
    successDark: '#16A34A', // Darker success
    warning: '#F59E0B', // Warning amber
    warningLight: '#FCD34D', // Lighter warning
    warningDark: '#D97706', // Darker warning

    // Interactive colors
    button: '#3B82F6', // --primary
    buttonDisabled: '#94A3B8', // Disabled state
    buttonText: '#FFFFFF', // --primary-foreground (HSL: 210 40% 98%)
    buttonSecondary: '#F1F5F9', // --secondary
    buttonSecondaryText: '#0F172A', // --secondary-foreground

    // Input colors
    input: '#FFFFFF', // --input background
    inputBorder: '#E2E8F0', // --input border
    inputBorderFocused: '#3B82F6', // --ring
    inputBackground: '#FFFFFF', // Input background
    inputPlaceholder: '#64748B', // --muted-foreground

    // Tab bar colors
    tabBar: '#FFFFFF', // Tab bar background
    tabBarBorder: '#E2E8F0', // Tab bar border
    tabBarActive: '#3B82F6', // --primary
    tabBarInactive: '#64748B', // --muted-foreground

    // Card colors
    card: '#FFFFFF', // --card
    cardBorder: '#E2E8F0', // Card border
    cardShadow: 'rgba(0, 0, 0, 0.1)', // Card shadow

    // Modal colors
    modalOverlay: 'rgba(0, 0, 0, 0.5)', // Modal overlay
    modalBackground: '#FFFFFF', // --popover

    // Icon colors
    icon: '#0F172A', // --foreground
    iconSecondary: '#64748B', // --muted-foreground
    iconActive: '#3B82F6', // --primary

    // Shadow colors
    shadow: 'rgba(0, 0, 0, 0.1)', // Light shadow
    shadowLight: 'rgba(0, 0, 0, 0.05)', // Lighter shadow
    shadowDark: 'rgba(0, 0, 0, 0.2)', // Darker shadow
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
