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
  analytics: 'Analytics',
  payments: 'Payments',
  cards: 'Cards',

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
  united_kingdom: 'United Kingdom',

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
  // Business Account Completion
  account_created_successfully: 'Account Created Successfully!',
  business_account_created_description:
    'Your business account has been created and is ready for verification.',
  account_summary: 'Account Summary',
  account_type: 'Account Type',
  verification_status: 'Verification Status',
  pending_verification: 'Pending Verification',
  next_steps: 'Next Steps',
  verification_required: 'Verification Required',
  what_happens_next: 'What Happens Next?',
  verification_process_description:
    'We will verify your business information and documents. This process typically takes 1-3 business days.',
  step_1_verification: 'Submit required business documents',
  step_2_verification: 'Verify business address and contact information',
  step_3_verification:
    'Complete identity verification for authorized signatories',
  complete_setup: 'Complete Setup',
  sign_in_instead: 'Sign In Instead',
  business_category: 'Business Category',
  sub_category_of_business: 'Sub-Category of Business',
  is_your_business_regulated: 'Is your business regulated?',
  how_do_you_sell_products_services: 'How do you sell your products/services',
  who_are_your_customers: 'Who are your customers',
  no_of_employees: 'No. of Employees',
  business_description: 'Business description...',
  select_business_category: 'Select business category',
  select_sub_category: 'Select sub-category',
  select_regulation_status: 'Select regulation status',
  select_sales_method: 'Select sales method',
  select_customer_type: 'Select customer type',
  select_employee_count: 'Select employee count',
  enter_business_description: 'Enter business description',
  financial_information: 'Financial Information',
  // Financial Information Screen
  financial_information_description:
    'Required to assess the financial status and performance of the organization.',
  annual_turnover: 'Annual Turnover',
  monthly_transaction_volume: 'Monthly Transaction Volume',
  monthly_transactions: 'Monthly Transactions',
  max_payment_amount: 'Max. Payment Amount',
  countries_conducting_business: 'Countries Conducting Business In',
  countries_conducting_business_description:
    'Add any country you may conduct activity in with Orby Business, including sales transactions.',
  add_country: 'Add Country',
  select_annual_turnover: 'Select annual turnover',
  select_monthly_volume: 'Select monthly transaction volume',
  select_monthly_transactions: 'Select monthly transactions',
  select_max_payment: 'Select max payment amount',
  upload_document: 'Upload Document',
  // Proof of Nature of Business Screen
  proof_of_nature_of_business: 'Proof of Nature of Business',
  please_confirm_nature_of_business:
    'Please confirm the nature of your business',
  proof_of_business_requirements:
    'To understand the nature of business of your company, we would require one of the following: A valid, functional website, A sales invoice confirming your services and business activities and a matching bank statement (issued in the last 6 months, A supplier invoice issued in the last 6 month. A contract with the customer / issued in the last 3 years); A supplier agreement issued in the last 3 years.',
  recommended: 'Recommended',
  others: 'Others',
  website: 'Website',
  website_description: 'Provide your business website URL',
  sales_invoice_with_matching_bank_statement:
    'Sales invoice with matching bank statement',
  sales_invoice_description: 'Upload sales invoice and matching bank statement',
  another_document_indicating_industry:
    'Another document indicating your industry',
  industry_document_description: 'Upload document showing your industry',
  domain_name_ownership: 'Domain Name Ownership',
  domain_ownership_description: 'Upload domain ownership certificate',
  bank_statement: 'Bank Statement',
  bank_statement_description: 'Upload recent bank statement',
  // Directors and Shareholders
  directors: 'Directors',
  add_all_directors_listed_with_local_registry:
    'Add all directors listed with local registry.',
  no_directors_found: 'No directors found',
  your_directors_will_appear_here: 'Your directors will appear here',
  add_director: 'Add Director',
  dob: 'DOB',
  add: 'Add',
  // Business Account Activation
  account_activation: 'Account Activation',
  submit_required_information_description:
    'Submit the required information so we can identify your business.',
  personal_identity: 'Personal Identity',
  nature_of_business: 'Nature of Business',
  business_purpose: 'Business Purpose',
  business_details: 'Business Details',
  business_address: 'Business Address',
  directors_and_shareholders: 'Directors and Shareholders',
  plan_and_card: 'Plan and Card',
  requires_action: 'Requires action',
  // Personal Identity Screen
  personal_identity_description:
    'Please provide your personal identification information for verification.',

  enter_first_name: 'Enter your first name',
  enter_last_name: 'Enter your last name',
  enter_nationality: 'Enter your nationality',
  id_type: 'ID Type',
  id_number: 'ID Number',
  enter_id_type: 'Enter ID type (e.g., Passport, Driver License)',
  enter_id_number: 'Enter your ID number',
  enter_id_expiry_date: 'Select ID expiry date',
  // Nature of Business Screen
  nature_of_business_description:
    'Please provide information about your business nature and operations.',
  business_type: 'Business Type',
  industry: 'Industry',
  annual_revenue: 'Annual Revenue',
  number_of_employees: 'Number of Employees',
  business_registration_number: 'Business Registration Number',
  select_business_type: 'Select business type',
  select_industry: 'Select industry',
  enter_business_description: 'Describe your business activities',
  enter_annual_revenue: 'Enter annual revenue',
  enter_number_of_employees: 'Enter number of employees',
  enter_business_registration_number: 'Enter business registration number',
  // Business Types
  corporation: 'Corporation',
  llc: 'LLC',
  partnership: 'Partnership',
  sole_proprietorship: 'Sole Proprietorship',
  // Industries
  technology: 'Technology',
  finance: 'Finance',
  healthcare: 'Healthcare',
  retail: 'Retail',
  manufacturing: 'Manufacturing',
  services: 'Services',
  // Placeholder
  coming_soon_description:
    'This feature will be available soon. Please check back later.',

  // Account & Document Screens
  account_document: 'Account & Document',
  profile_management: 'Profile Management',
  personal_profile: 'Personal Profile',
  business_profile: 'Business Profile',
  merchant_profile: 'Merchant Profile',
  documents_policies: 'Documents & Policies',
  statements: 'Statements',
  privacy_policy: 'Privacy Policy',
  terms_conditions: 'Terms & Conditions',
  account_actions: 'Account Actions',
  close_business_account: 'Close Business Account',

  // Personal Profile
  cara_dune: 'Cara Dune',
  caradune_microsoft_com: 'caradune@microsoft.com',
  active: 'Active',
  order_card: 'Order Card',
  profile: 'Profile',
  personal_details: 'Personal Details',
  role: 'Role',
  approvals: 'Approvals',
  organization: 'Organization',
  manager: 'Manager',
  finances: 'Finances',
  transactions: 'Transactions',

  // Personal Details
  full_name: 'Full Name',
  birth_date: 'Birth Date',
  residential_address: 'Residential Address',
  phone_no: 'Phone No.',
  email: 'Email',
  edit: 'Edit',

  // Business Profile
  key_information: 'Key Information',
  business_details: 'Business Details',
  business_address: 'Business Address',
  type_of_business: 'Type of Business',
  business_structure: 'Business Structure',
  additional_information: 'Additional Information',
  vat_number: 'VAT Number',

  // Business Details
  country_of_incorporation: 'Country of Incorporation',
  legal_name: 'Legal Name',
  company_house_registration_number: 'Company House Registration Number',
  date_of_incorporation: 'Date of Incorporation',
  business_type: 'Business Type',
  trading_name: 'Trading Name',

  // Business Address
  registered: 'Registered',
  primary_place_of_business: 'Primary place of business',

  // Type of Business
  category: 'Category',
  website: 'Website',
  description: 'Description',

  // Business Structure
  directors: 'Directors',
  shareholders: 'Shareholders',

  // Statements
  monthly_statement: 'Monthly Statement',
  monthly_statement_description:
    'Summary of financial activity from a single account',
  transaction_statements: 'Transaction Statements',
  transaction_statements_description:
    'Filter and export selected transactions only',
  statement_of_balances: 'Statement of Balances',
  statement_of_balances_description:
    'Confirmation of funds held with Orby Business',
  account_confirmation: 'Account Confirmation',
  account_confirmation_description: 'Summary of your account details',
  audit_confirmation: 'Audit Confirmation',
  audit_confirmation_description: 'Orby reference letter to auditors',

  // Main Settings Screen
  microsoft_inc: 'Microsoft Inc.',
  help: 'Help',
  account_manager: 'Account Manager',
  get_in_touch_to_optimize_your_plan: 'Get in touch to optimize your plan',
  billing: 'Billing',
  free: 'Free',
  account_documents: 'Account & Documents',
  security_privacy: 'Security & Privacy',
  app_settings: 'App Settings',
  apis: 'APIs',
  about_us: 'About Us',
  logout: 'Logout',
  upgrade: 'Upgrade',

  // Verification Screens
  account_created_successfully_banner: 'Account Created Successfully!',
  enable_biometric: 'Enable Biometric',
  enable_biometric_description:
    'Login quickly and securely with fingerprint or face recognition stored on this device.',
  enable_biometric_button: 'Enable Biometric',
  ill_do_this_later: "I'll do this later",
  create_passcode: 'Choose Passcode',
  create_passcode_description:
    'Choosing a strong passcode or PIN is an essential step in securing your accounts and personal information. Avoid using easily guessable information such as birthdays, or simple number sequences.',
  enter_passcode: 'Enter Passcode',
  confirm_passcode: 'Confirm Passcode',
  passcodes_dont_match: 'Passcodes do not match',
  proof_of_residency: 'Proof of Residency',
  proof_of_residency_description:
    'In order to access certain services or benefits, it may be necessary to provide proof of residency.',
  prove_us_residency: 'Prove that you live in the United States.',
  upload_residency_document: 'Upload Residency Document',
  identity_card: 'Identity Card',
  identity_card_description:
    'Upload your government-issued identity card for verification.',
  upload_identity_card: 'Upload Identity Card',
  upload_id_card: 'Upload ID Card',
  front_side: 'Front Side',
  back_side: 'Back Side',
  upload_instructions:
    'Uploading pictures of your ID card helps to ensure that the account or service is being accessed by the rightful owner and prevents unauthorized access. This can be done by uploading pictures of your ID card, including both the **front** and **back**. Be sure to follow the instructions provided and ensure that the pictures are clear and legible.',
  processing_message:
    'Processing! This can take a minute, We appreciate your patience.',
  completed_status: 'Completed!',
  tap_to_upload: 'Tap to Upload',
  focus_on_your_face: 'Focus on your face',
  move_head_to_side: 'Move your head to the side and back',
  identity_verified_successfully: 'Identity Verified Successfully!',
  scan_document: 'Scan Document',
  take_photo: 'Take Photo',
  select_from_gallery: 'Select from Gallery',
  passport: 'Passport',
  driving_license: 'Driving License',
  digital_document: 'Digital Document',
  method_of_verification: 'Method of Verification',
  nationality: 'Nationality',
  change: 'Change',
  united_states: 'United States',
  canada: 'Canada',
  australia: 'Australia',
};

export default en;
