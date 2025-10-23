export type SupportedLanguage = 'en' | 'ar' | 'hr' | 'ur';

export interface TranslationKeys {
  // Common
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  confirm: string;
  loading: string;
  error: string;
  success: string;
  retry: string;
  close: string;
  back: string;
  next: string;
  done: string;
  yes: string;
  no: string;
  ok: string;

  // Navigation
  home: string;
  wallet: string;
  profile: string;
  history: string;
  settings: string;

  // Auth
  login: string;
  signup: string;
  logout: string;
  forgot_password: string;
  reset_password: string;
  email: string;
  password: string;
  confirm_password: string;
  full_name: string;
  phone_number: string;
  login_success: string;
  signup_success: string;
  logout_confirm: string;
  invalid_credentials: string;
  email_required: string;
  password_required: string;
  password_too_short: string;
  passwords_do_not_match: string;
  passwords_must_match: string;
  email_invalid: string;
  // Extended auth validation
  password_min_8: string;
  password_complexity: string;
  name_min: string;
  name_max: string;
  name_required: string;
  confirm_password_required: string;
  current_password_required: string;
  new_password_required: string;
  confirm_new_password_required: string;
  login_subtitle: string;
  enter_password: string;
  create_password: string;
  remember_password: string;
  create_account: string;
  signup_subtitle: string;
  enter_full_name: string;
  email_address: string;
  enter_email: string;
  confirm_password_placeholder: string;
  already_have_account: string;
  sign_in: string;
  reset_link_sent: string;
  reset_link_message: string;
  send_reset_link: string;
  forgot_password_subtitle: string;

  // Wallet
  total_balance: string;
  receive: string;
  buy: string;
  swap: string;
  send: string;
  remove: string;
  balance_visible: string;
  balance_hidden: string;
  wallet_id: string;
  member_since: string;
  account_status: string;
  verified: string;
  unverified: string;

  // Profile
  edit_profile: string;
  security: string;
  account_information: string;
  preferences: string;
  dark_mode: string;
  language: string;
  push_notifications: string;
  email_notifications: string;
  biometric_login: string;
  change_photo: string;
  full_name_required: string;
  email_required_profile: string;
  profile_updated: string;
  profile_update_error: string;

  // Buy Modal
  buy_crypto: string;
  select_currency: string;
  enter_amount: string;
  payment_method: string;
  order_summary: string;
  total: string;
  fee: string;
  card_details: string;
  card_number: string;
  expiry_date: string;
  cvv: string;
  cardholder_name: string;
  bank_transfer: string;
  credit_debit_card: string;
  apple_pay: string;
  google_pay: string;
  paypal: string;
  instant_transfer: string;
  secure_payment: string;
  one_click_payment: string;
  digital_wallet: string;
  online_payment: string;

  // Swap Modal
  swap_crypto: string;
  from: string;
  to: string;
  swap_rate: string;
  estimated_fee: string;
  estimated_time: string;
  confirm_swap: string;
  swap_success: string;
  swap_error: string;

  // Receive Modal
  receive_crypto: string;
  your_address: string;
  copy_address: string;
  share_address: string;
  qr_code: string;
  address_copied: string;

  // History
  transaction_history: string;
  all_transactions: string;
  recent_transactions: string;
  received: string;
  sent: string;
  swapped: string;
  bought: string;
  pending: string;
  completed: string;
  failed: string;
  no_transactions: string;
  load_more: string;

  // Settings
  general: string;
  privacy: string;
  about: string;
  version: string;
  support: string;
  terms_of_service: string;
  privacy_policy: string;
  rate_app: string;
  share_app: string;

  // Languages
  english: string;
  arabic: string;
  croatian: string;
  urdu: string;

  // Onboarding
  onboarding_title: string;
  onboarding_welcome: string;
  onboarding_sign_up: string;
  onboarding_sign_in: string;
  onboarding_recover_account: string;

  // Recovery Flow
  recover_account_title: string;
  recover_account_description: string;
  two_way_auth_title: string;
  two_way_auth_description: string;
  verify_identity_title: string;
  verify_identity_description: string;
  verify_identity_button: string;
  verifying: string;
  code_delivery_time: string;
  resend_code: string;
  continue: string;
  submit: string;
}

export interface TranslationContextType {
  t: (key: keyof TranslationKeys) => string;
  language: SupportedLanguage;
  isRTL: boolean;
  changeLanguage: (language: SupportedLanguage) => void;
}
