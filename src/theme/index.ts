import { Theme } from '../types';
import { fp, rp } from '../utils/responsive';

// Convert HSL values to hex colors based on your web design system
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

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    // Primary colors (HSL: 217.2 91.2% 59.8%)
    primary: '#60A5FA', // --primary
    primaryLight: '#93C5FD', // Lighter variant
    primaryDark: '#3B82F6', // Darker variant

    // Secondary colors (HSL: 217.2 32.6% 17.5%)
    secondary: '#1E293B', // --secondary
    secondaryLight: '#334155', // Lighter variant
    secondaryDark: '#0F172A', // Darker variant

    // Background colors (HSL: 222.2 84% 4.9%)
    background: '#0F172A', // --background
    backgroundSecondary: '#1E293B', // --muted
    surface: '#0F172A', // --card
    surfaceElevated: '#1E293B', // Elevated surface
    overlay: 'rgba(0, 0, 0, 0.7)', // Darker modal overlay

    // Text colors (HSL: 210 40% 98%)
    text: '#F8FAFC', // --foreground
    textSecondary: '#94A3B8', // --muted-foreground (HSL: 215 20.2% 65.1%)
    textTertiary: '#64748B', // Lighter text
    textInverse: '#0F172A', // Inverse text

    // Border and divider colors (HSL: 217.2 32.6% 17.5%)
    border: '#1E293B', // --border
    borderLight: '#334155', // Lighter border
    divider: '#1E293B', // --muted

    // Status colors
    error: '#DC2626', // --destructive (HSL: 0 62.8% 30.6%)
    errorLight: '#F87171', // Lighter error
    errorDark: '#991B1B', // Darker error
    success: '#16A34A', // Success green
    successLight: '#4ADE80', // Lighter success
    successDark: '#15803D', // Darker success
    warning: '#D97706', // Warning amber
    warningLight: '#FBBF24', // Lighter warning
    warningDark: '#B45309', // Darker warning

    // Interactive colors
    button: '#60A5FA', // --primary
    buttonDisabled: '#64748B', // Disabled state
    buttonText: '#0F172A', // --primary-foreground (HSL: 222.2 47.4% 11.2%)
    buttonSecondary: '#1E293B', // --secondary
    buttonSecondaryText: '#F8FAFC', // --secondary-foreground

    // Input colors
    input: '#1E293B', // --input background
    inputBorder: '#1E293B', // --input border
    inputBorderFocused: '#60A5FA', // --ring (HSL: 224.3 76.3% 48%)
    inputBackground: '#1E293B', // Input background
    inputPlaceholder: '#94A3B8', // --muted-foreground

    // Tab bar colors
    tabBar: '#0F172A', // Tab bar background
    tabBarBorder: '#1E293B', // Tab bar border
    tabBarActive: '#60A5FA', // --primary
    tabBarInactive: '#94A3B8', // --muted-foreground

    // Card colors
    card: '#0F172A', // --card
    cardBorder: '#1E293B', // Card border
    cardShadow: 'rgba(0, 0, 0, 0.3)', // Card shadow

    // Modal colors
    modalOverlay: 'rgba(0, 0, 0, 0.7)', // Modal overlay
    modalBackground: '#0F172A', // --popover

    // Icon colors
    icon: '#F8FAFC', // --foreground
    iconSecondary: '#94A3B8', // --muted-foreground
    iconActive: '#60A5FA', // --primary

    // Shadow colors
    shadow: 'rgba(0, 0, 0, 0.3)', // Light shadow
    shadowLight: 'rgba(0, 0, 0, 0.2)', // Lighter shadow
    shadowDark: 'rgba(0, 0, 0, 0.5)', // Darker shadow
  },
};
