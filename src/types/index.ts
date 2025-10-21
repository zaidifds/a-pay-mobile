// Simple types for the wallet app

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

export interface RootStackParamList {
  Auth: undefined;
  Main: undefined;
}

export interface AuthStackParamList {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
}

export interface Theme {
  colors: {
    // Primary colors
    primary: string;
    primaryLight: string;
    primaryDark: string;

    // Secondary colors
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;

    // Background colors
    background: string;
    backgroundSecondary: string;
    surface: string;
    surfaceElevated: string;
    overlay: string;

    // Text colors
    text: string;
    textSecondary: string;
    textTertiary: string;
    textInverse: string;

    // Border and divider colors
    border: string;
    borderLight: string;
    divider: string;

    // Status colors
    error: string;
    errorLight: string;
    errorDark: string;
    success: string;
    successLight: string;
    successDark: string;
    warning: string;
    warningLight: string;
    warningDark: string;

    // Interactive colors
    button: string;
    buttonDisabled: string;
    buttonText: string;
    buttonSecondary: string;
    buttonSecondaryText: string;

    // Input colors
    input: string;
    inputBorder: string;
    inputBorderFocused: string;
    inputBackground: string;
    inputPlaceholder: string;

    // Tab bar colors
    tabBar: string;
    tabBarBorder: string;
    tabBarActive: string;
    tabBarInactive: string;

    // Card colors
    card: string;
    cardBorder: string;
    cardShadow: string;

    // Modal colors
    modalOverlay: string;
    modalBackground: string;

    // Icon colors
    icon: string;
    iconSecondary: string;
    iconActive: string;

    // Shadow colors
    shadow: string;
    shadowLight: string;
    shadowDark: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    h1: object;
    h2: object;
    h3: object;
    body: object;
    caption: object;
  };
}

// Wallet types
export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap';
  amount: number;
  currency: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface WalletBalance {
  [key: string]: number;
}

export interface CoinPrice {
  [key: string]: number;
}
