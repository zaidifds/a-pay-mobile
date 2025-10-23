import { TranslationKeys } from '../types';

const en: TranslationKeys = {
  // Common
  save: 'Save',
  cancel: 'Cancel',
  edit: 'Edit',
  delete: 'Delete',
  confirm: 'Confirm',
  loading: 'Loading...',
  error: 'Error',
  success: 'Success',
  retry: 'Retry',
  close: 'Close',
  back: 'Back',
  next: 'Next',
  done: 'Done',
  yes: 'Yes',
  no: 'No',
  ok: 'OK',

  // Navigation
  home: 'Home',
  wallet: 'Wallet',
  profile: 'Profile',
  history: 'History',
  settings: 'Settings',

  // Auth
  login: 'Login',
  signup: 'Sign Up',
  sign_in: 'Sign in',
  logout: 'Logout',
  forgot_password: 'Forgot Password?',
  reset_password: 'Reset Password',
  create_account: 'Create Account',

  // Onboarding
  onboarding_title: 'Onboarding',
  onboarding_welcome: 'Welcome to A Pay',
  onboarding_sign_up: 'Sign Up',
  onboarding_sign_in: 'Sign In to A Pay',
  onboarding_recover_account: 'Recover Account',

  // Recovery Flow
  recover_account_title: 'Recover Account',
  recover_account_description:
    'If you are having trouble accessing your account, you can use the account recovery feature to regain access. This may involve verifying your identity through a secure process to protect your account.',
  two_way_auth_title: 'Two Way Authentication',
  two_way_auth_description:
    'Protecting your account is our top priority. Please confirm your account by entering the authorization code sent to {phone}',
  verify_identity_title: "Let's Verify your Identity",
  verify_identity_description:
    'We are required by the law to verify your identity before we use your money.',
  verify_identity_button: 'Verify Identity',
  verifying: 'Verifying...',
  code_delivery_time: 'It may take a minute to receive your code.',
  resend_code: 'Resend a new code',
  continue: 'Continue',
  submit: 'Submit',
  email: 'Email',
  password: 'Password',
  confirm_password: 'Confirm Password',
  full_name: 'Full Name',
  phone_number: 'Phone Number',
  login_success: 'Login successful',
  signup_success: 'Account created successfully',
  logout_confirm: 'Are you sure you want to logout?',
  invalid_credentials: 'Invalid email or password',
  email_required: 'Email is required',
  password_required: 'Password is required',
  password_too_short: 'Password must be at least 6 characters',
  passwords_do_not_match: 'Passwords do not match',
  passwords_must_match: 'Passwords must match',
  email_invalid: 'Please enter a valid email',
  password_min_8: 'Password must be at least 8 characters',
  password_complexity:
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  name_min: 'Name must be at least 2 characters',
  name_max: 'Name must be less than 50 characters',
  name_required: 'Name is required',
  confirm_password_required: 'Please confirm your password',
  current_password_required: 'Current password is required',
  new_password_required: 'New password is required',
  confirm_new_password_required: 'Please confirm your new password',
  login_subtitle: 'Sign in to your A-Pay account',
  enter_password: 'Enter your password',
  create_password: 'Create a password',
  remember_password: 'Remember your password?',
  signup_subtitle: 'Sign up to start using A-Pay',
  enter_full_name: 'Enter your full name',
  enter_email: 'Enter your email',
  confirm_password_placeholder: 'Confirm your password',
  already_have_account: 'Already have an account?',
  reset_link_sent: 'Reset Link Sent',
  reset_link_message:
    'We have sent a password reset link to your email address.',
  send_reset_link: 'Send Reset Link',
  forgot_password_subtitle:
    "Don't worry! Enter your email and we'll send you a reset link.",

  // Wallet
  total_balance: 'Total Balance',
  receive: 'Receive',
  buy: 'Buy',
  swap: 'Swap',
  send: 'Send',
  remove: 'Remove',
  balance_visible: 'Balance visible',
  balance_hidden: 'Balance hidden',
  wallet_id: 'Wallet ID',
  member_since: 'Member Since',
  account_status: 'Account Status',
  verified: 'Verified',
  unverified: 'Unverified',

  // Profile
  edit_profile: 'Edit Profile',
  security: 'Security',
  account_information: 'Account Information',
  preferences: 'Preferences',
  dark_mode: 'Dark Mode',
  language: 'Language',
  push_notifications: 'Push Notifications',
  email_notifications: 'Email Notifications',
  biometric_login: 'Biometric Login',
  change_photo: 'Tap to change photo',
  full_name_required: 'Please fill in all required fields',
  email_required_profile: 'Please fill in all required fields',
  profile_updated: 'Profile updated successfully',
  profile_update_error: 'Failed to update profile',

  // Buy Modal
  buy_crypto: 'Buy Crypto',
  select_currency: 'Select Currency',
  enter_amount: 'Enter Amount',
  payment_method: 'Payment Method',
  order_summary: 'Order Summary',
  total: 'Total',
  fee: 'Fee',
  card_details: 'Card Details',
  card_number: 'Card Number',
  expiry_date: 'Expiry Date',
  cvv: 'CVV',
  cardholder_name: 'Cardholder Name',
  bank_transfer: 'Bank Transfer',
  credit_debit_card: 'Credit/Debit Card',
  apple_pay: 'Apple Pay',
  google_pay: 'Google Pay',
  paypal: 'PayPal',
  instant_transfer: 'Instant Transfer',
  secure_payment: 'Secure Payment',
  one_click_payment: 'One-Click Payment',
  digital_wallet: 'Digital Wallet',
  online_payment: 'Online Payment',

  // Swap Modal
  swap_crypto: 'Swap Crypto',
  from: 'From',
  to: 'To',
  swap_rate: 'Swap Rate',
  estimated_fee: 'Estimated Fee',
  estimated_time: 'Estimated Time',
  confirm_swap: 'Confirm Swap',
  swap_success: 'Swap completed successfully',
  swap_error: 'Swap failed',

  // Receive Modal
  receive_crypto: 'Receive Crypto',
  your_address: 'Your Address',
  copy_address: 'Copy Address',
  share_address: 'Share Address',
  qr_code: 'QR Code',
  address_copied: 'Address copied to clipboard',

  // History
  transaction_history: 'Transaction History',
  all_transactions: 'All Transactions',
  recent_transactions: 'Recent Transactions',
  received: 'Received',
  sent: 'Sent',
  swapped: 'Swapped',
  bought: 'Bought',
  pending: 'Pending',
  completed: 'Completed',
  failed: 'Failed',
  no_transactions: 'No transactions yet',
  load_more: 'Load More',

  // Settings
  general: 'General',
  privacy: 'Privacy',
  about: 'About',
  version: 'Version',
  support: 'Support',
  terms_of_service: 'Terms of Service',
  privacy_policy: 'Privacy Policy',
  rate_app: 'Rate App',
  share_app: 'Share App',

  // Languages
  english: 'English',
  arabic: 'العربية',
  croatian: 'Hrvatski',
  urdu: 'اردو',

  // Signup Flow
  account_type_description:
    'You can create both personal and business accounts on Orby. Personal account is for managing personal finances. And Business account is for banking businesses.',
  personal_account: 'Personal Account',
  personal_account_description:
    'Convenient and secure banking for personal use. Easy access to financial information, efficient transactions, 24/7 customer support.',
  business_account: 'Business Account',
  business_account_description:
    'Separation of personal and business finances. Access to financial services, improved record-keeping, credibility and professionalism.',
  get_started: 'Get Started',
  learn_more: 'Learn more',
  personal_account_subtitle:
    'You can also create a business account later if you needed.',

  // Form Fields
  title: 'Title',
  email_address: 'Email Address',
  gender: 'Gender',
  date_of_birth: 'Date of Birth',
  country: 'Country',
  state: 'State',
  city: 'City',
  address: 'Address',
  postcode: 'Postcode',

  // Business Account Flow
  business_account_intro_subtitle:
    'You can also create a personal account later if you needed.',
  business_account_intro_description:
    'Be advised that you will likely need to provide details about your company. This may include information such as the company name, address, tax identification number, and business type etc. Providing these details is necessary to ensure that the account is being opened for a legitimate business and to comply with legal and regulatory requirements. If you are asked to provide details about your company, be sure to have the necessary information on hand and follow the instructions provided to complete the account setup process.',
  business_account_terms_1: 'I confirm that I have read and understand the',
  terms_and_conditions: 'Terms and Conditions',
  business_account_terms_2:
    'governing the use of Orby, and I agree to be bound by them.',
  business_account_terms_description_1: 'I understand that the',
  business_account_terms_description_2:
    'may be updated from time to time, and that it is my responsibility to regularly review them to stay informed of any changes. By checking this box, I acknowledge that I have had the opportunity to review and ask questions about the',
  user_agreement: 'User Agreement',
  business_account_terms_description_3:
    'and that I voluntarily agree to abide by them.',

  // Business Account Contact
  country_of_incorporation: 'Country of Incorporation',
  country_of_incorporation_description:
    'Let us know where your company is incorporated so that we can assist you with account opening.',
  select_country: 'Select Country',
  select_city: 'Select City',
  first_name: 'First Name',
  last_name: 'Last Name',
  email_description:
    'Enter the email address you want to use to open an account or login.',
  phone_number_description:
    'Enter your phone number. We will send you verification code.',

  // Business Account Verification
  enter_6_digit_code: 'Enter 6-Digit Code',
  verification_code_sent_to: "Enter the code we've sent on",
  verification_code_help: 'It may take a minute to receive your code.',
  havent_received_code: "Haven't received it?",
  resend_new_code: 'Resend a new code',
  sending: 'Sending...',
  invalid_code: 'Invalid Code',
  please_enter_correct_code: 'Please enter the correct verification code.',
  incomplete_code: 'Incomplete Code',
  please_enter_6_digit_code: 'Please enter the complete 6-digit code.',
  code_sent: 'Code Sent',
  verification_code_sent: 'Verification code has been sent to your phone.',

  // Business Account Personal Info
  personal_information: 'Personal Information',
  personal_information_description:
    'Individual who have been granted permission to access certain information handle finance of an organization.',

  // Business Account Address
  personal_address: 'Personal Address',
  personal_address_description:
    'We need your home address to open your account.',
  zip_code: 'ZIP Code',

  // Business Account Details
  tell_us_about_business: 'Tell Us About Your Business',
  business_details_description:
    'We need your business details to open your account.',
  business_name: 'Business Name',
  business_trade_name: 'Business Trade Name',
  registration_number: 'Registration No.',
  date: 'Date',
  select_company_type: 'Select Company Type',

  // Business Account Registered Address
  registered_address: 'Registered Address',
  registered_address_description:
    'The official address registered with government body. This can be different form the address at which you have your business or co-working space.',

  // Business Account Purpose
  what_would_you_like_to_do_with_orby_business:
    'What Would You Like To Do With Orby Business',
  receive_payments_from_customers: 'Receive payments from customers',
  make_everyday_purchases: 'Make everyday purchases',
  pay_suppliers_and_employees: 'Pay suppliers and employees',
  manage_multiple_currencies: 'Manage multiple currencies',
  to_pay_salaries: 'To pay salaries',
  for_expense_management: 'For expense management',
  for_invoice_issuance: 'For invoice issuance',

  // Business Account Role
  tell_us_about_your_role_in_company: 'Tell Us About Your Role In Company',
  i_am_only_director_and_significant_shareholder:
    'I am the only director and significant shareholder',
  only_director_description:
    "You're the only director and the only owner with more than 25% of the business",
  i_am_one_of_several_director_or_significant_shareholder:
    'I am one of the several director or significant shareholder',
  one_of_several_description:
    "There're are other director or shareholders with greater than 25% ownership",
  i_am_neither_director_nor_significant_shareholder:
    'I am neither a director nor a significant shareholder',
  neither_director_description:
    "You're applying on behalf of your employer or client",
};

export default en;
