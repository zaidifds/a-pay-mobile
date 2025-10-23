import { TranslationKeys } from '../types';

const ar: TranslationKeys = {
  // Common
  save: 'حفظ',
  cancel: 'إلغاء',
  edit: 'تعديل',
  delete: 'حذف',
  confirm: 'تأكيد',
  loading: 'جاري التحميل...',
  error: 'خطأ',
  success: 'نجح',
  retry: 'إعادة المحاولة',
  close: 'إغلاق',
  back: 'رجوع',
  next: 'التالي',
  done: 'تم',
  yes: 'نعم',
  no: 'لا',
  ok: 'موافق',

  // Navigation
  home: 'الرئيسية',
  wallet: 'المحفظة',
  profile: 'الملف الشخصي',
  history: 'السجل',
  settings: 'الإعدادات',

  // Auth
  login: 'تسجيل الدخول',
  signup: 'إنشاء حساب',
  logout: 'تسجيل الخروج',
  forgot_password: 'نسيت كلمة المرور؟',
  reset_password: 'إعادة تعيين كلمة المرور',

  // Onboarding
  onboarding_title: 'البداية',
  onboarding_welcome: 'مرحباً بك في A Pay',
  onboarding_sign_up: 'إنشاء حساب',
  onboarding_sign_in: 'تسجيل الدخول إلى A Pay',
  onboarding_recover_account: 'استرداد الحساب',

  // Recovery Flow
  recover_account_title: 'استرداد الحساب',
  recover_account_description:
    'إذا كنت تواجه مشكلة في الوصول إلى حسابك، يمكنك استخدام ميزة استرداد الحساب لاستعادة الوصول. قد يتضمن ذلك التحقق من هويتك من خلال عملية آمنة لحماية حسابك.',
  two_way_auth_title: 'المصادقة الثنائية',
  two_way_auth_description:
    'حماية حسابك هي أولويتنا القصوى. يرجى تأكيد حسابك بإدخال رمز التفويض المرسل إلى {phone}',
  verify_identity_title: 'دعنا نتحقق من هويتك',
  verify_identity_description:
    'نحن ملزمون بالقانون للتحقق من هويتك قبل استخدام أموالك.',
  verify_identity_button: 'التحقق من الهوية',
  verifying: 'جاري التحقق...',
  code_delivery_time: 'قد يستغرق وصول الرمز دقيقة واحدة.',
  resend_code: 'إرسال رمز جديد',
  continue: 'متابعة',
  submit: 'إرسال',
  email: 'البريد الإلكتروني',
  password: 'كلمة المرور',
  confirm_password: 'تأكيد كلمة المرور',
  full_name: 'الاسم الكامل',
  phone_number: 'رقم الهاتف',
  login_success: 'تم تسجيل الدخول بنجاح',
  signup_success: 'تم إنشاء الحساب بنجاح',
  logout_confirm: 'هل أنت متأكد من تسجيل الخروج؟',
  invalid_credentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
  email_required: 'البريد الإلكتروني مطلوب',
  password_required: 'كلمة المرور مطلوبة',
  password_too_short: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
  passwords_do_not_match: 'كلمات المرور غير متطابقة',
  passwords_must_match: 'كلمات المرور يجب أن تتطابق',
  email_invalid: 'يرجى إدخال بريد إلكتروني صحيح',
  password_min_8: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
  password_complexity:
    'كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم ورمز خاص واحد على الأقل',
  name_min: 'الاسم يجب أن يكون حرفين على الأقل',
  name_max: 'الاسم يجب أن يكون أقل من 50 حرف',
  name_required: 'الاسم مطلوب',
  confirm_password_required: 'يرجى تأكيد كلمة المرور',
  current_password_required: 'كلمة المرور الحالية مطلوبة',
  new_password_required: 'كلمة المرور الجديدة مطلوبة',
  confirm_new_password_required: 'يرجى تأكيد كلمة المرور الجديدة',
  login_subtitle: 'سجل الدخول إلى حساب A-Pay الخاص بك',
  enter_password: 'أدخل كلمة المرور',
  create_password: 'إنشاء كلمة مرور',
  remember_password: 'هل تتذكر كلمة المرور؟',
  create_account: 'إنشاء حساب',
  signup_subtitle: 'سجل للبدء في استخدام A-Pay',
  enter_full_name: 'أدخل اسمك الكامل',
  enter_email: 'أدخل بريدك الإلكتروني',
  confirm_password_placeholder: 'أكد كلمة المرور',
  already_have_account: 'هل لديك حساب بالفعل؟',
  sign_in: 'تسجيل الدخول',
  reset_link_sent: 'تم إرسال رابط إعادة التعيين',
  reset_link_message:
    'لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى عنوان بريدك الإلكتروني.',
  send_reset_link: 'إرسال رابط إعادة التعيين',
  forgot_password_subtitle:
    'لا تقلق! أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين.',

  // Wallet
  total_balance: 'الرصيد الإجمالي',
  receive: 'استقبال',
  buy: 'شراء',
  swap: 'تبديل',
  send: 'إرسال',
  remove: 'إزالة',
  balance_visible: 'الرصيد مرئي',
  balance_hidden: 'الرصيد مخفي',
  wallet_id: 'معرف المحفظة',
  member_since: 'عضو منذ',
  account_status: 'حالة الحساب',
  verified: 'مُتحقق',
  unverified: 'غير مُتحقق',

  // Profile
  edit_profile: 'تعديل الملف الشخصي',
  security: 'الأمان',
  account_information: 'معلومات الحساب',
  preferences: 'التفضيلات',
  dark_mode: 'الوضع المظلم',
  language: 'اللغة',
  push_notifications: 'الإشعارات الفورية',
  email_notifications: 'إشعارات البريد الإلكتروني',
  biometric_login: 'تسجيل الدخول بالبصمة',
  change_photo: 'اضغط لتغيير الصورة',
  full_name_required: 'يرجى ملء جميع الحقول المطلوبة',
  email_required_profile: 'يرجى ملء جميع الحقول المطلوبة',
  profile_updated: 'تم تحديث الملف الشخصي بنجاح',
  profile_update_error: 'فشل في تحديث الملف الشخصي',

  // Buy Modal
  buy_crypto: 'شراء العملات الرقمية',
  select_currency: 'اختر العملة',
  enter_amount: 'أدخل المبلغ',
  payment_method: 'طريقة الدفع',
  order_summary: 'ملخص الطلب',
  total: 'المجموع',
  fee: 'الرسوم',
  card_details: 'تفاصيل البطاقة',
  card_number: 'رقم البطاقة',
  expiry_date: 'تاريخ الانتهاء',
  cvv: 'رمز الأمان',
  cardholder_name: 'اسم حامل البطاقة',
  bank_transfer: 'تحويل بنكي',
  credit_debit_card: 'بطاقة ائتمان/خصم',
  apple_pay: 'Apple Pay',
  google_pay: 'Google Pay',
  paypal: 'PayPal',
  instant_transfer: 'تحويل فوري',
  secure_payment: 'دفع آمن',
  one_click_payment: 'دفع بنقرة واحدة',
  digital_wallet: 'محفظة رقمية',
  online_payment: 'دفع عبر الإنترنت',

  // Swap Modal
  swap_crypto: 'تبديل العملات الرقمية',
  from: 'من',
  to: 'إلى',
  swap_rate: 'سعر التبديل',
  estimated_fee: 'الرسوم المقدرة',
  estimated_time: 'الوقت المقدر',
  confirm_swap: 'تأكيد التبديل',
  swap_success: 'تم التبديل بنجاح',
  swap_error: 'فشل التبديل',

  // Receive Modal
  receive_crypto: 'استقبال العملات الرقمية',
  your_address: 'عنوانك',
  copy_address: 'نسخ العنوان',
  share_address: 'مشاركة العنوان',
  qr_code: 'رمز QR',
  address_copied: 'تم نسخ العنوان إلى الحافظة',

  // History
  transaction_history: 'سجل المعاملات',
  all_transactions: 'جميع المعاملات',
  recent_transactions: 'المعاملات الأخيرة',
  received: 'مستقبل',
  sent: 'مرسل',
  swapped: 'مبدل',
  bought: 'مشترى',
  pending: 'في الانتظار',
  completed: 'مكتمل',
  failed: 'فشل',
  no_transactions: 'لا توجد معاملات بعد',
  load_more: 'تحميل المزيد',

  // Settings
  general: 'عام',
  privacy: 'الخصوصية',
  about: 'حول',
  version: 'الإصدار',
  support: 'الدعم',
  terms_of_service: 'شروط الخدمة',
  privacy_policy: 'سياسة الخصوصية',
  rate_app: 'تقييم التطبيق',
  share_app: 'مشاركة التطبيق',

  // Languages
  english: 'English',
  arabic: 'العربية',
  croatian: 'Hrvatski',
  urdu: 'اردو',

  // Signup Flow
  account_type_description:
    'يمكنك إنشاء حسابات شخصية وتجارية على Orby. الحساب الشخصي لإدارة الشؤون المالية الشخصية. والحساب التجاري للشركات المصرفية.',
  personal_account: 'حساب شخصي',
  personal_account_description:
    'خدمات مصرفية مريحة وآمنة للاستخدام الشخصي. سهولة الوصول إلى المعلومات المالية، المعاملات الفعالة، دعم العملاء على مدار الساعة.',
  business_account: 'حساب تجاري',
  business_account_description:
    'فصل الشؤون المالية الشخصية والتجارية. الوصول إلى الخدمات المالية، تحسين حفظ السجلات، المصداقية والاحترافية.',
  get_started: 'ابدأ الآن',
  learn_more: 'اعرف المزيد',
  personal_account_subtitle:
    'يمكنك أيضًا إنشاء حساب تجاري لاحقًا إذا احتجت إليه.',

  // Form Fields
  title: 'اللقب',
  email_address: 'عنوان البريد الإلكتروني',
  gender: 'الجنس',
  date_of_birth: 'تاريخ الميلاد',
  country: 'البلد',
  state: 'الولاية',
  city: 'المدينة',
  address: 'العنوان',
  postcode: 'الرمز البريدي',

  // Business Account Flow
  business_account_intro_subtitle:
    'يمكنك أيضًا إنشاء حساب شخصي لاحقًا إذا احتجت إليه.',
  business_account_intro_description:
    'يرجى ملاحظة أنك ستحتاج على الأرجح إلى تقديم تفاصيل حول شركتك. قد يشمل ذلك معلومات مثل اسم الشركة والعنوان ورقم التعريف الضريبي ونوع النشاط التجاري وما إلى ذلك. تقديم هذه التفاصيل ضروري لضمان فتح الحساب لشركة مشروعة والامتثال للمتطلبات القانونية والتنظيمية. إذا طُلب منك تقديم تفاصيل حول شركتك، تأكد من أن لديك المعلومات اللازمة في متناول اليد واتبع التعليمات المقدمة لإكمال عملية إعداد الحساب.',
  business_account_terms_1: 'أؤكد أنني قرأت وفهمت',
  terms_and_conditions: 'الشروط والأحكام',
  business_account_terms_2: 'التي تحكم استخدام Orby، وأوافق على الالتزام بها.',
  business_account_terms_description_1: 'أفهم أن',
  business_account_terms_description_2:
    'قد يتم تحديثها من وقت لآخر، وأنه من مسؤوليتي مراجعتها بانتظام للبقاء على اطلاع بأي تغييرات. بتحقق هذا المربع، أقر بأنني أتيحت لي الفرصة لمراجعة وطرح أسئلة حول',
  user_agreement: 'اتفاقية المستخدم',
  business_account_terms_description_3: 'وأنني أوافق طوعًا على الالتزام بها.',

  // Business Account Contact
  country_of_incorporation: 'بلد التأسيس',
  country_of_incorporation_description:
    'أخبرنا أين تم تأسيس شركتك حتى نتمكن من مساعدتك في فتح الحساب.',
  select_country: 'اختر البلد',
  select_city: 'اختر المدينة',
  first_name: 'الاسم الأول',
  last_name: 'الاسم الأخير',
  email_description:
    'أدخل عنوان البريد الإلكتروني الذي تريد استخدامه لفتح حساب أو تسجيل الدخول.',
  phone_number_description: 'أدخل رقم هاتفك. سنرسل لك رمز التحقق.',

  // Business Account Verification
  enter_6_digit_code: 'أدخل الرمز المكون من 6 أرقام',
  verification_code_sent_to: 'أدخل الرمز الذي أرسلناه على',
  verification_code_help: 'قد يستغرق الأمر دقيقة واحدة لتلقي الرمز الخاص بك.',
  havent_received_code: 'لم تستلمه؟',
  resend_new_code: 'إعادة إرسال رمز جديد',
  sending: 'جاري الإرسال...',
  invalid_code: 'رمز غير صحيح',
  please_enter_correct_code: 'يرجى إدخال رمز التحقق الصحيح.',
  incomplete_code: 'رمز غير مكتمل',
  please_enter_6_digit_code: 'يرجى إدخال الرمز المكون من 6 أرقام بالكامل.',
  code_sent: 'تم إرسال الرمز',
  verification_code_sent: 'تم إرسال رمز التحقق إلى هاتفك.',

  // Business Account Personal Info
  personal_information: 'المعلومات الشخصية',
  personal_information_description:
    'الشخص الذي تم منحه إذن للوصول إلى معلومات معينة والتعامل مع الشؤون المالية للمنظمة.',

  // Business Account Address
  personal_address: 'العنوان الشخصي',
  personal_address_description: 'نحتاج عنوان منزلك لفتح حسابك.',
  zip_code: 'الرمز البريدي',

  // Business Account Details
  tell_us_about_business: 'أخبرنا عن عملك',
  business_details_description: 'نحتاج تفاصيل عملك لفتح حسابك.',
  business_name: 'اسم العمل',
  business_trade_name: 'اسم التجارة',
  registration_number: 'رقم التسجيل',
  date: 'التاريخ',
  select_company_type: 'اختر نوع الشركة',

  // Business Account Registered Address
  registered_address: 'العنوان المسجل',
  registered_address_description:
    'العنوان الرسمي المسجل لدى الهيئة الحكومية. يمكن أن يكون مختلفًا عن العنوان الذي يوجد فيه عملك أو مساحة العمل المشتركة.',

  // Business Account Purpose
  what_would_you_like_to_do_with_orby_business:
    'ماذا تريد أن تفعل مع Orby Business',
  receive_payments_from_customers: 'استلام المدفوعات من العملاء',
  make_everyday_purchases: 'إجراء المشتريات اليومية',
  pay_suppliers_and_employees: 'دفع الموردين والموظفين',
  manage_multiple_currencies: 'إدارة عملات متعددة',
  to_pay_salaries: 'لدفع الرواتب',
  for_expense_management: 'لإدارة المصروفات',
  for_invoice_issuance: 'لإصدار الفواتير',

  // Business Account Role
  tell_us_about_your_role_in_company: 'أخبرنا عن دورك في الشركة',
  i_am_only_director_and_significant_shareholder:
    'أنا المدير الوحيد والمساهم الرئيسي',
  only_director_description:
    'أنت المدير الوحيد والمالك الوحيد لأكثر من 25% من العمل',
  i_am_one_of_several_director_or_significant_shareholder:
    'أنا واحد من عدة مديرين أو مساهمين رئيسيين',
  one_of_several_description: 'هناك مديرون أو مساهمون آخرون يملكون أكثر من 25%',
  i_am_neither_director_nor_significant_shareholder:
    'أنا لست مديرًا ولا مساهمًا رئيسيًا',
  neither_director_description: 'أنت تتقدم نيابة عن صاحب العمل أو العميل',
};

export default ar;
