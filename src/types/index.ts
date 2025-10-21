// Common types for the application

export interface Location {
  id: string;
  client_id: string;
  location_currency: string;
  location_name: string;
  location_timezone: string;
  location_24_hours: boolean;
  location_number: string;
  language_id: string;
  country: string;
  street: string;
  city: string;
  postcode: string;
  state: string;
  latitude: string;
  longitude: string;
  send_activation_email: boolean;
  location_email: string;
  location_phone: string;
  tip_enabled: boolean;
  deleted_status: boolean;
  active_status: boolean;
  created_at: string;
  updated_at: string;
  languagesId: string | null;
  loyalty: Loyalty;
}

export interface Loyalty {
  id: string;
  location_id: string;
  earn_amount: number;
  earn_points: number;
  redeem_points: number;
  redeem_amount: number;
  max_redeem_pct: number;
  expires_in_days: number;
  deleted_status: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomerLoyalty {
  id: string;
  customer_id: string;
  points: number;
  updated_at: string;
}

export interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string | null;
  phone: string;
  alternate_phone: string | null;
  is_verified: boolean;
  deleted_status: boolean;
  active_status: boolean;
  created_at: string;
  updated_at: string;
  image: string | null;
  user_id: string;
  customer_loyalty: CustomerLoyalty;
}

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  country: string | null;
  street: string | null;
  city: string | null;
  postcode: string | null;
  state: string | null;
  pin: string | null;
  image: string | null;
  location_id: string;
  client_id: string | null;
  billing_model: string | null;
  next_payment_on: string | null;
  subscription_id: string | null;
  personal_identification_no: string | null;
  shopper_reference: string | null;
  created_at: string;
  updated_at: string;
  phone: string;
  display_color: string;
  deleted_status: boolean;
  active_status: boolean;
  user_main: boolean;
  password_changed: boolean;
  first_name: string;
  last_name: string;
  fcm_token: string | null;
  last_login: string | null;
  client_language_id: string | null;
  otp_code: string | null;
  location: Location;
  customer: Customer;
  loyalty_points: number;
  location_loyalty: Loyalty;
}

export interface UserSession {
  token: string;
  user: User;
}

// Simple User interface for authentication screens
export interface SimpleUser {
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
