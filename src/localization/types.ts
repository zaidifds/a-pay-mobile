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
  analytics: string;
  payments: string;
  cards: string;

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

  // Cards
  add_card: string;
  card_details: string;
  card_number: string;
  card_holder_name: string;
  expiry_date: string;
  cvv: string;
  save_card_name: string;
  save_card_for_future: string;
  card_added_successfully: string;
  deposit_by_card: string;
  no_card_added: string;
  cards_will_show_here: string;
  add_card_description: string;
  deposit_by_card_description: string;
  adding_card: string;
  card_validation_error: string;
  default: string;

  // Add Money
  account_top_up: string;
  add_funds_description: string;

  // Deposit by Bank
  deposit_by_bank: string;
  deposit_by_bank_description: string;
  for_faster_payments: string;
  faster_payments_subtitle: string;
  for_international_payments: string;
  international_payments_subtitle: string;
  account_name: string;
  account_no: string;
  sort_code: string;
  iban: string;
  bic_swift: string;
  bank_name: string;
  bank_address: string;
  name: string;
  copy: string;
  copied_to_clipboard: string;
  bank_details: string;

  // Deposit Cash
  deposit_cash: string;
  deposit_cash_description: string;
  generate_qr_code: string;
  generate_barcode: string;
  generating_code: string;
  qr_code_description: string;
  barcode_description: string;
  find_nearest_retailer: string;
  please_enter_valid_amount: string;
  error_generating_barcode: string;

  // Find Retailer
  your_location: string;
  current_location: string;
  location_error: string;
  location_permission_denied: string;
  map_view_changed: string;

  // Receive Salary
  receive_salary: string;
  receive_salary_description: string;

  // Deposit Crypto
  deposit_crypto: string;
  deposit_crypto_description: string;
  crypto_deposit_instructions: string;
  wallet_address_copied: string;
  transaction_id_instruction: string;
  enter_transaction_id: string;
  please_enter_transaction_id: string;
  transaction_submitted: string;
  transaction_processing_message: string;
  continue: string;

  // Payment Options
  good_morning: string;
  good_afternoon: string;
  good_evening: string;
  payment_options: string;
  payment_options_description: string;
  move_money_between_accounts: string;
  send_money_to_other_users: string;
  international_payments: string;
  buy_and_sell_crypto: string;
  split_bill: string;

  // Move Money
  move_money: string;
  authentication: string;

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
  united_kingdom: string;

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

  // Business Account Activation
  account_activation: string;
  submit_required_information_description: string;
  personal_identity: string;
  personal_information: string;
  nature_of_business: string;
  business_purpose: string;
  business_details: string;
  business_address: string;
  directors_and_shareholders: string;
  plan_and_card: string;
  requires_action: string;
  verified: string;
  sign_in_instead: string;
  tell_us_more_about_business: string;
  business_category: string;
  sub_category_of_business: string;
  is_your_business_regulated: string;
  how_do_you_sell_products_services: string;
  who_are_your_customers: string;
  no_of_employees: string;
  business_description: string;
  select_business_category: string;
  select_sub_category: string;
  select_regulation_status: string;
  select_sales_method: string;
  select_customer_type: string;
  select_employee_count: string;
  enter_business_description: string;
  financial_information: string;
  // Financial Information Screen
  financial_information_description: string;
  annual_turnover: string;
  monthly_transaction_volume: string;
  monthly_transactions: string;
  max_payment_amount: string;
  countries_conducting_business: string;
  countries_conducting_business_description: string;
  add_country: string;
  select_annual_turnover: string;
  select_monthly_volume: string;
  select_monthly_transactions: string;
  select_max_payment: string;
  upload_document: string;
  // Proof of Nature of Business Screen
  proof_of_nature_of_business: string;
  please_confirm_nature_of_business: string;
  proof_of_business_requirements: string;
  recommended: string;
  others: string;
  website: string;
  website_description: string;
  sales_invoice_with_matching_bank_statement: string;
  sales_invoice_description: string;
  another_document_indicating_industry: string;
  industry_document_description: string;
  domain_name_ownership: string;
  domain_ownership_description: string;
  bank_statement: string;
  bank_statement_description: string;
  // Directors and Shareholders
  directors: string;
  add_all_directors_listed_with_local_registry: string;
  no_directors_found: string;
  your_directors_will_appear_here: string;
  add_director: string;
  first_name: string;
  last_name: string;
  gender: string;
  dob: string;
  add: string;

  // Account & Document Screens
  account_document: string;
  profile_management: string;
  personal_profile: string;
  business_profile: string;
  merchant_profile: string;
  documents_policies: string;
  statements: string;
  privacy_policy: string;
  terms_conditions: string;
  account_actions: string;
  close_business_account: string;

  // Personal Profile
  cara_dune: string;
  caradune_microsoft_com: string;
  active: string;
  order_card: string;
  profile: string;
  personal_details: string;
  role: string;
  approvals: string;
  organization: string;
  manager: string;
  finances: string;
  transactions: string;

  // Personal Details
  full_name: string;
  birth_date: string;
  residential_address: string;
  phone_no: string;
  email: string;
  edit: string;

  // Business Profile
  key_information: string;
  business_details: string;
  business_address: string;
  type_of_business: string;
  business_structure: string;
  additional_information: string;
  vat_number: string;

  // Business Details
  country_of_incorporation: string;
  legal_name: string;
  company_house_registration_number: string;
  date_of_incorporation: string;
  business_type: string;
  trading_name: string;

  // Business Address
  registered: string;
  primary_place_of_business: string;

  // Type of Business
  category: string;
  website: string;
  description: string;

  // Business Structure
  directors: string;
  shareholders: string;

  // Statements
  monthly_statement: string;
  monthly_statement_description: string;
  transaction_statements: string;
  transaction_statements_description: string;
  statement_of_balances: string;
  statement_of_balances_description: string;
  account_confirmation: string;
  account_confirmation_description: string;
  audit_confirmation: string;
  audit_confirmation_description: string;

  // Main Settings Screen
  microsoft_inc: string;
  help: string;
  account_manager: string;
  get_in_touch_to_optimize_your_plan: string;
  billing: string;
  free: string;
  account_documents: string;
  security_privacy: string;
  app_settings: string;
  apis: string;
  about_us: string;
  logout: string;
  upgrade: string;

  // Verification Screens
  account_created_successfully_banner: string;
  enable_biometric: string;
  enable_biometric_description: string;
  enable_biometric_button: string;
  ill_do_this_later: string;
  create_passcode: string;
  create_passcode_description: string;
  enter_passcode: string;
  confirm_passcode: string;
  passcodes_dont_match: string;
  proof_of_residency: string;
  proof_of_residency_description: string;
  prove_us_residency: string;
  upload_residency_document: string;
  identity_card: string;
  identity_card_description: string;
  upload_identity_card: string;
  upload_id_card: string;
  front_side: string;
  back_side: string;
  upload_instructions: string;
  processing_message: string;
  completed_status: string;
  tap_to_upload: string;
  focus_on_your_face: string;
  move_head_to_side: string;
  identity_verified_successfully: string;
  scan_document: string;
  take_photo: string;
  select_from_gallery: string;
  passport: string;
  driving_license: string;
  digital_document: string;
  method_of_verification: string;
  nationality: string;
  change: string;
  united_states: string;
  canada: string;
  australia: string;
}

export interface TranslationContextType {
  t: (key: keyof TranslationKeys) => string;
  language: SupportedLanguage;
  isRTL: boolean;
  changeLanguage: (language: SupportedLanguage) => void;
}
