// Simple types for the wallet app

export interface User {
  id: string;
  email: string;
  name: string;
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
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
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
