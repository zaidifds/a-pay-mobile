import { TranslationKeys } from '../types';

const ur: TranslationKeys = {
  // Common
  save: 'محفوظ کریں',
  cancel: 'منسوخ کریں',
  edit: 'ترمیم کریں',
  delete: 'حذف کریں',
  confirm: 'تصدیق کریں',
  loading: 'لوڈ ہو رہا ہے...',
  error: 'خرابی',
  success: 'کامیابی',
  retry: 'دوبارہ کوشش کریں',
  close: 'بند کریں',
  back: 'واپس جائیں',
  next: 'اگلا',
  done: 'مکمل',
  yes: 'ہاں',
  no: 'نہیں',
  ok: 'ٹھیک ہے',

  // Navigation
  home: 'ہوم',
  wallet: 'والیٹ',
  profile: 'پروفائل',
  history: 'تاریخ',
  settings: 'ترتیبات',

  // Auth
  login: 'لاگ ان',
  signup: 'سائن اپ',
  logout: 'لاگ آؤٹ',
  forgot_password: 'پاس ورڈ بھول گئے؟',
  reset_password: 'پاس ورڈ ری سیٹ کریں',

  // Onboarding
  onboarding_title: 'شروع',
  onboarding_welcome: 'A Pay میں خوش آمدید',
  onboarding_sign_up: 'سائن اپ',
  onboarding_sign_in: 'A Pay میں لاگ ان کریں',
  onboarding_recover_account: 'اکاؤنٹ بحالی',

  // Recovery Flow
  recover_account_title: 'اکاؤنٹ بحالی',
  recover_account_description:
    'اگر آپ کو اپنے اکاؤنٹ تک رسائی میں مشکل ہو رہی ہے، تو آپ اکاؤنٹ کی بحالی کی خصوصیت استعمال کر سکتے ہیں۔ اس میں آپ کی شناخت کی تصدیق شامل ہو سکتی ہے تاکہ آپ کے اکاؤنٹ کی حفاظت ہو سکے۔',
  two_way_auth_title: 'دو طرفہ تصدیق',
  two_way_auth_description:
    'آپ کے اکاؤنٹ کی حفاظت ہماری سب سے بڑی ترجیح ہے۔ براہ کرم {phone} پر بھیجے گئے اجازت کوڈ کو درج کرکے اپنے اکاؤنٹ کی تصدیق کریں',
  verify_identity_title: 'آئیے آپ کی شناخت کی تصدیق کریں',
  verify_identity_description:
    'ہم قانون کے تحت آپ کی شناخت کی تصدیق کرنے کے پابند ہیں اس سے پہلے کہ ہم آپ کے پیسے استعمال کریں۔',
  verify_identity_button: 'شناخت کی تصدیق کریں',
  verifying: 'تصدیق ہو رہی ہے...',
  code_delivery_time: 'آپ کا کوڈ موصول ہونے میں ایک منٹ لگ سکتا ہے۔',
  resend_code: 'نیا کوڈ بھیجیں',
  continue: 'جاری رکھیں',
  submit: 'جمع کریں',
  email: 'ای میل',
  password: 'پاس ورڈ',
  confirm_password: 'پاس ورڈ کی تصدیق کریں',
  full_name: 'پورا نام',
  phone_number: 'فون نمبر',
  login_success: 'لاگ ان کامیاب رہا',
  signup_success: 'اکاؤنٹ کامیابی سے بنا لیا گیا',
  logout_confirm: 'کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟',
  invalid_credentials: 'غلط ای میل یا پاس ورڈ',
  email_required: 'ای میل درکار ہے',
  password_required: 'پاس ورڈ درکار ہے',
  password_too_short: 'پاس ورڈ کم از کم 6 حروف کا ہونا چاہئے',
  passwords_do_not_match: 'پاس ورڈ مماثل نہیں',
  passwords_must_match: 'پاس ورڈ مماثل ہونا چاہئے',
  email_invalid: 'درست ای میل درج کریں',
  password_min_8: 'پاس ورڈ کم از کم 8 حروف کا ہونا چاہئے',
  password_complexity:
    'پاس ورڈ میں کم از کم ایک بڑا حرف، ایک چھوٹا حرف، ایک عدد اور ایک خاص علامت ہونا ضروری ہے',
  name_min: 'نام کم از کم 2 حروف کا ہونا چاہئے',
  name_max: 'نام 50 حروف سے کم ہونا چاہئے',
  name_required: 'نام درکار ہے',
  confirm_password_required: 'براہ کرم اپنا پاس ورڈ تصدیق کریں',
  current_password_required: 'موجودہ پاس ورڈ درکار ہے',
  new_password_required: 'نیا پاس ورڈ درکار ہے',
  confirm_new_password_required: 'براہ کرم نیا پاس ورڈ تصدیق کریں',
  login_subtitle: 'اپنے اے پے اکاؤنٹ میں سائن ان کریں',
  enter_password: 'اپنا پاس ورڈ درج کریں',
  create_password: 'پاس ورڈ بنائیں',
  remember_password: 'پاس ورڈ یاد ہے؟',
  create_account: 'اکاؤنٹ بنائیں',
  signup_subtitle: 'اے پے استعمال شروع کرنے کے لیے سائن اپ کریں',
  enter_full_name: 'اپنا پورا نام درج کریں',
  enter_email: 'اپنی ای میل درج کریں',
  confirm_password_placeholder: 'اپنا پاس ورڈ تصدیق کریں',
  already_have_account: 'پہلے سے اکاؤنٹ موجود ہے؟',
  sign_in: 'سائن ان کریں',
  reset_link_sent: 'ری سیٹ لنک بھیج دیا گیا',
  reset_link_message: 'ہم نے آپ کے ای میل پتے پر ری سیٹ لنک بھیج دیا ہے۔',
  send_reset_link: 'ری سیٹ لنک بھیجیں',
  forgot_password_subtitle:
    'فکر نہ کریں! اپنی ای میل درج کریں اور ہم آپ کو ری سیٹ لنک بھیجیں گے۔',

  // Wallet
  total_balance: 'کل بیلنس',
  receive: 'وصول کریں',
  buy: 'خریدیں',
  swap: 'تبدیل کریں',
  send: 'بھیجیں',
  remove: 'ہٹائیں',
  balance_visible: 'بیلنس ظاہر ہے',
  balance_hidden: 'بیلنس پوشیدہ ہے',
  wallet_id: 'والیٹ آئی ڈی',
  member_since: 'ممبر بننے کی تاریخ',
  account_status: 'اکاؤنٹ کی حیثیت',
  verified: 'تصدیق شدہ',
  unverified: 'غیر تصدیق شدہ',

  // Profile
  edit_profile: 'پروفائل میں ترمیم کریں',
  security: 'سیکورٹی',
  account_information: 'اکاؤنٹ کی معلومات',
  preferences: 'ترجیحات',
  dark_mode: 'ڈارک موڈ',
  language: 'زبان',
  push_notifications: 'پش نوٹیفکیشنز',
  email_notifications: 'ای میل نوٹیفکیشنز',
  biometric_login: 'بایومیٹرک لاگ ان',
  change_photo: 'تصویر تبدیل کرنے کے لیے ٹیپ کریں',
  full_name_required: 'براہ کرم تمام مطلوبہ فیلڈز پُر کریں',
  email_required_profile: 'براہ کرم تمام مطلوبہ فیلڈز پُر کریں',
  profile_updated: 'پروفائل کامیابی سے اپ ڈیٹ ہو گئی',
  profile_update_error: 'پروفائل اپ ڈیٹ ناکام رہی',

  // Buy Modal
  buy_crypto: 'کرپٹو خریدیں',
  select_currency: 'کرنسی منتخب کریں',
  enter_amount: 'رقم درج کریں',
  payment_method: 'ادائیگی کا طریقہ',
  order_summary: 'آرڈر کا خلاصہ',
  total: 'کل رقم',
  fee: 'فیس',
  card_details: 'کارڈ کی تفصیلات',
  card_number: 'کارڈ نمبر',
  expiry_date: 'میعاد ختم ہونے کی تاریخ',
  cvv: 'سی وی وی',
  cardholder_name: 'کارڈ ہولڈر کا نام',
  bank_transfer: 'بینک ٹرانسفر',
  credit_debit_card: 'کریڈٹ/ڈیبیٹ کارڈ',
  apple_pay: 'ایپل پے',
  google_pay: 'گوگل پے',
  paypal: 'پے پال',
  instant_transfer: 'فوری ٹرانسفر',
  secure_payment: 'محفوظ ادائیگی',
  one_click_payment: 'ایک کلک ادائیگی',
  digital_wallet: 'ڈیجیٹل والیٹ',
  online_payment: 'آن لائن ادائیگی',

  // Swap Modal
  swap_crypto: 'کرپٹو تبدیل کریں',
  from: 'سے',
  to: 'تک',
  swap_rate: 'تبدیلی کی شرح',
  estimated_fee: 'تخمینہ فیس',
  estimated_time: 'تخمینہ وقت',
  confirm_swap: 'تبدیلی کی تصدیق کریں',
  swap_success: 'تبدیلی کامیابی سے مکمل ہو گئی',
  swap_error: 'تبدیلی ناکام رہی',

  // Receive Modal
  receive_crypto: 'کرپٹو وصول کریں',
  your_address: 'آپ کا پتہ',
  copy_address: 'پتہ کاپی کریں',
  share_address: 'پتہ شیئر کریں',
  qr_code: 'کیو آر کوڈ',
  address_copied: 'پتہ کلپ بورڈ پر کاپی ہو گیا',

  // History
  transaction_history: 'ٹرانزیکشن ہسٹری',
  all_transactions: 'تمام ٹرانزیکشنز',
  recent_transactions: 'حالیہ ٹرانزیکشنز',
  received: 'وصول شدہ',
  sent: 'بھیجی گئی',
  swapped: 'تبدیل شدہ',
  bought: 'خریدی گئی',
  pending: 'زیر التواء',
  completed: 'مکمل',
  failed: 'ناکام',
  no_transactions: 'ابھی تک کوئی ٹرانزیکشن نہیں',
  load_more: 'مزید لوڈ کریں',

  // Settings
  general: 'عمومی',
  privacy: 'رازداری',
  about: 'ایپ کے بارے میں',
  version: 'ورژن',
  support: 'مدد',
  terms_of_service: 'سروس کی شرائط',
  privacy_policy: 'رازداری کی پالیسی',
  rate_app: 'ایپ کی درجہ بندی کریں',
  share_app: 'ایپ شیئر کریں',

  // Languages
  english: 'انگریزی',
  arabic: 'عربی',
  croatian: 'کروشین',
  urdu: 'اردو',

  // Signup Flow
  account_type_description:
    'آپ Orby پر ذاتی اور کاروباری دونوں اکاؤنٹس بنا سکتے ہیں۔ ذاتی اکاؤنٹ ذاتی مالیات کے انتظام کے لیے ہے۔ اور کاروباری اکاؤنٹ بینکنگ کے کاروبار کے لیے ہے۔',
  personal_account: 'ذاتی اکاؤنٹ',
  personal_account_description:
    'ذاتی استعمال کے لیے آسان اور محفوظ بینکنگ۔ مالی معلومات تک آسان رسائی، موثر لین دین، 24/7 کسٹمر سپورٹ۔',
  business_account: 'کاروباری اکاؤنٹ',
  business_account_description:
    'ذاتی اور کاروباری مالیات کی علیحدگی۔ مالی خدمات تک رسائی، بہتر ریکارڈ کیپنگ، اعتبار اور پیشہ ورانہ پن۔',
  get_started: 'شروع کریں',
  learn_more: 'مزید جانیں',
  personal_account_subtitle:
    'آپ بعد میں کاروباری اکاؤنٹ بھی بنا سکتے ہیں اگر آپ کو ضرورت ہو۔',

  // Form Fields
  title: 'خطاب',
  email_address: 'ای میل ایڈریس',
  gender: 'جنس',
  date_of_birth: 'تاریخ پیدائش',
  country: 'ملک',
  state: 'ریاست',
  city: 'شہر',
  address: 'پتہ',
  postcode: 'پوسٹ کوڈ',

  // Business Account Flow
  business_account_intro_subtitle:
    'آپ بعد میں ذاتی اکاؤنٹ بھی بنا سکتے ہیں اگر آپ کو ضرورت ہو۔',
  business_account_intro_description:
    'براہ کرم نوٹ کریں کہ آپ کو اپنی کمپنی کے بارے میں تفصیلات فراہم کرنے کی ضرورت ہوگی۔ اس میں کمپنی کا نام، پتہ، ٹیکس شناختی نمبر، اور کاروبار کی قسم وغیرہ جیسی معلومات شامل ہو سکتی ہیں۔ ان تفصیلات کو فراہم کرنا ضروری ہے تاکہ یہ یقینی بنایا جا سکے کہ اکاؤنٹ ایک جائز کاروبار کے لیے کھولا جا رہا ہے اور قانونی اور ضابطہ جات کی ضروریات کو پورا کیا جا رہا ہے۔ اگر آپ سے اپنی کمپنی کے بارے میں تفصیلات فراہم کرنے کو کہا جائے تو یقینی بنائیں کہ آپ کے پاس ضروری معلومات ہاتھ میں ہوں اور اکاؤنٹ سیٹ اپ کے عمل کو مکمل کرنے کے لیے دی گئی ہدایات پر عمل کریں۔',
  business_account_terms_1: 'میں تصدیق کرتا ہوں کہ میں نے پڑھا اور سمجھا ہے',
  terms_and_conditions: 'شرائط و ضوابط',
  business_account_terms_2:
    'جو Orby کے استعمال کو کنٹرول کرتے ہیں، اور میں ان کی پابندی کرنے پر رضامند ہوں۔',
  business_account_terms_description_1: 'میں سمجھتا ہوں کہ',
  business_account_terms_description_2:
    'وقتاً فوقتاً اپڈیٹ ہو سکتے ہیں، اور یہ میری ذمہ داری ہے کہ میں انہیں باقاعدگی سے دیکھتا رہوں تاکہ کسی بھی تبدیلی سے آگاہ رہوں۔ اس باکس کو چیک کرکے، میں تسلیم کرتا ہوں کہ مجھے',
  user_agreement: 'صارف معاہدہ',
  business_account_terms_description_3:
    'کے بارے میں سوالات پوچھنے اور ان کا جائزہ لینے کا موقع ملا ہے، اور میں رضاکارانہ طور پر ان کی پابندی کرنے پر رضامند ہوں۔',

  // Business Account Contact
  country_of_incorporation: 'انکارپوریشن کا ملک',
  country_of_incorporation_description:
    'ہمیں بتائیں کہ آپ کی کمپنی کہاں انکارپوریٹڈ ہے تاکہ ہم آپ کی اکاؤنٹ کھولنے میں مدد کر سکیں۔',
  select_country: 'ملک منتخب کریں',
  select_city: 'شہر منتخب کریں',
  first_name: 'پہلا نام',
  last_name: 'آخری نام',
  email_description:
    'وہ ای میل ایڈریس درج کریں جسے آپ اکاؤنٹ کھولنے یا لاگ ان کرنے کے لیے استعمال کرنا چاہتے ہیں۔',
  phone_number_description:
    'اپنا فون نمبر درج کریں۔ ہم آپ کو تصدیقی کوڈ بھیجیں گے۔',

  // Business Account Verification
  enter_6_digit_code: '6 ہندسوں کا کوڈ درج کریں',
  verification_code_sent_to: 'وہ کوڈ درج کریں جو ہم نے بھیجا ہے',
  verification_code_help: 'آپ کا کوڈ موصول ہونے میں ایک منٹ لگ سکتا ہے۔',
  havent_received_code: 'نہیں ملا؟',
  resend_new_code: 'نیا کوڈ بھیجیں',
  sending: 'بھیجا جا رہا ہے...',
  invalid_code: 'غلط کوڈ',
  please_enter_correct_code: 'براہ کرم صحیح تصدیقی کوڈ درج کریں۔',
  incomplete_code: 'نامکمل کوڈ',
  please_enter_6_digit_code: 'براہ کرم مکمل 6 ہندسوں کا کوڈ درج کریں۔',
  code_sent: 'کوڈ بھیجا گیا',
  verification_code_sent: 'تصدیقی کوڈ آپ کے فون پر بھیج دیا گیا ہے۔',

  // Business Account Personal Info
  personal_information: 'ذاتی معلومات',
  personal_information_description:
    'وہ فرد جسے کچھ معلومات تک رسائی اور تنظیم کے مالیات کو سنبھالنے کی اجازت دی گئی ہے۔',

  // Business Account Address
  personal_address: 'ذاتی پتہ',
  personal_address_description:
    'آپ کا اکاؤنٹ کھولنے کے لیے ہمیں آپ کا گھر کا پتہ چاہیے۔',
  zip_code: 'زپ کوڈ',

  // Business Account Details
  tell_us_about_business: 'ہمیں اپنے کاروبار کے بارے میں بتائیں',
  business_details_description:
    'آپ کا اکاؤنٹ کھولنے کے لیے ہمیں آپ کے کاروبار کی تفصیلات چاہیے۔',
  business_name: 'کاروبار کا نام',
  business_trade_name: 'کاروباری تجارتی نام',
  registration_number: 'رجسٹریشن نمبر',
  date: 'تاریخ',
  select_company_type: 'کمپنی کی قسم منتخب کریں',

  // Business Account Registered Address
  registered_address: 'رجسٹرڈ پتہ',
  registered_address_description:
    'حکومتی ادارے کے ساتھ رجسٹرڈ سرکاری پتہ۔ یہ اس پتے سے مختلف ہو سکتا ہے جہاں آپ کا کاروبار یا کو ورکنگ اسپیس ہے۔',

  // Business Account Purpose
  what_would_you_like_to_do_with_orby_business:
    'آپ Orby Business کے ساتھ کیا کرنا چاہتے ہیں',
  receive_payments_from_customers: 'کسٹمرز سے ادائیگیاں وصول کریں',
  make_everyday_purchases: 'روزانہ کی خریداری کریں',
  pay_suppliers_and_employees: 'سپلائرز اور ملازمین کو ادائیگی کریں',
  manage_multiple_currencies: 'متعدد کرنسیوں کا انتظام کریں',
  to_pay_salaries: 'تنخواہوں کی ادائیگی کے لیے',
  for_expense_management: 'اخراجات کے انتظام کے لیے',
  for_invoice_issuance: 'انوائس جاری کرنے کے لیے',

  // Business Account Role
  tell_us_about_your_role_in_company:
    'ہمیں کمپنی میں اپنے کردار کے بارے میں بتائیں',
  i_am_only_director_and_significant_shareholder:
    'میں واحد ڈائریکٹر اور اہم شیئر ہولڈر ہوں',
  only_director_description:
    'آپ واحد ڈائریکٹر اور کاروبار کے 25% سے زیادہ کے واحد مالک ہیں',
  i_am_one_of_several_director_or_significant_shareholder:
    'میں متعدد ڈائریکٹرز یا اہم شیئر ہولڈرز میں سے ایک ہوں',
  one_of_several_description:
    'دوسرے ڈائریکٹرز یا شیئر ہولڈرز ہیں جن کا 25% سے زیادہ ملکیت ہے',
  i_am_neither_director_nor_significant_shareholder:
    'میں نہ تو ڈائریکٹر ہوں اور نہ ہی اہم شیئر ہولڈر',
  neither_director_description:
    'آپ اپنے آجر یا کلائنٹ کی جانب سے درخواست دے رہے ہیں',
};

export default ur;
