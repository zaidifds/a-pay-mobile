// Common types for the application

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

export interface RootStackParamList {
  Home: undefined;
  // Add more screens as needed
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
