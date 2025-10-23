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
  signup_subtitle: string;
  enter_full_name: string;
  enter_email: string;
  confirm_password_placeholder: string;
  already_have_account: string;
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

  // Signup Flow
  sign_in: string;
  create_account: string;
  account_type_description: string;
  personal_account: string;
  personal_account_description: string;
  business_account: string;
  business_account_description: string;
  get_started: string;
  learn_more: string;
  personal_account_subtitle: string;

  // Form Fields
  title: string;
  email_address: string;
  gender: string;
  date_of_birth: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postcode: string;

  // Business Account Flow
  business_account_intro_subtitle: string;
  business_account_intro_description: string;
  business_account_terms_1: string;
  terms_and_conditions: string;
  business_account_terms_2: string;
  business_account_terms_description_1: string;
  business_account_terms_description_2: string;
  user_agreement: string;
  business_account_terms_description_3: string;

  // Business Account Contact
  country_of_incorporation: string;
  country_of_incorporation_description: string;
  select_country: string;
  select_city: string;
  first_name: string;
  last_name: string;
  email_description: string;
  phone_number_description: string;

  // Business Account Verification
  enter_6_digit_code: string;
  verification_code_sent_to: string;
  verification_code_help: string;
  havent_received_code: string;
  resend_new_code: string;
  sending: string;
  invalid_code: string;
  please_enter_correct_code: string;
  incomplete_code: string;
  please_enter_6_digit_code: string;
  code_sent: string;
  verification_code_sent: string;

  // Business Account Personal Info
  personal_information: string;
  personal_information_description: string;

  // Business Account Address
  personal_address: string;
  personal_address_description: string;
  zip_code: string;

  // Business Account Details
  tell_us_about_business: string;
  business_details_description: string;
  business_name: string;
  business_trade_name: string;
  registration_number: string;
  date: string;
  select_company_type: string;

  // Business Account Registered Address
  registered_address: string;
  registered_address_description: string;

  // Business Account Purpose
  what_would_you_like_to_do_with_orby_business: string;
  receive_payments_from_customers: string;
  make_everyday_purchases: string;
  pay_suppliers_and_employees: string;
  manage_multiple_currencies: string;
  to_pay_salaries: string;
  for_expense_management: string;
  for_invoice_issuance: string;

  // Business Account Role
  tell_us_about_your_role_in_company: string;
  i_am_only_director_and_significant_shareholder: string;
  only_director_description: string;
  i_am_one_of_several_director_or_significant_shareholder: string;
  one_of_several_description: string;
  i_am_neither_director_nor_significant_shareholder: string;
  neither_director_description: string;
}

export interface TranslationContextType {
  t: (key: keyof TranslationKeys) => string;
  language: SupportedLanguage;
  isRTL: boolean;
  changeLanguage: (language: SupportedLanguage) => void;
}
