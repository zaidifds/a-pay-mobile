import { TranslationKeys } from '../types';

const hr: TranslationKeys = {
  // Common
  save: 'Spremi',
  cancel: 'Odustani',
  edit: 'Uredi',
  delete: 'Obriši',
  confirm: 'Potvrdi',
  loading: 'Učitavanje...',
  error: 'Greška',
  success: 'Uspjeh',
  retry: 'Pokušaj ponovo',
  close: 'Zatvori',
  back: 'Natrag',
  next: 'Dalje',
  done: 'Gotovo',
  yes: 'Da',
  no: 'Ne',
  ok: 'U redu',

  // Navigation
  home: 'Početna',
  wallet: 'Novčanik',
  profile: 'Profil',
  history: 'Povijest',
  settings: 'Postavke',

  // Auth
  login: 'Prijava',
  signup: 'Registracija',
  logout: 'Odjava',
  forgot_password: 'Zaboravili ste lozinku?',
  reset_password: 'Resetiraj lozinku',

  // Onboarding
  onboarding_title: 'Uvod',
  onboarding_welcome: 'Dobrodošli u A Pay',
  onboarding_sign_up: 'Registracija',
  onboarding_sign_in: 'Prijavite se u A Pay',
  onboarding_recover_account: 'Oporavite račun',

  // Recovery Flow
  recover_account_title: 'Oporavite račun',
  recover_account_description:
    'Ako imate problema s pristupom svom računu, možete koristiti funkciju oporavka računa za ponovno dobivanje pristupa. To može uključivati provjeru vašeg identiteta kroz siguran proces za zaštitu vašeg računa.',
  two_way_auth_title: 'Dvofaktorska autentifikacija',
  two_way_auth_description:
    'Zaštita vašeg računa je naš najveći prioritet. Molimo potvrdite svoj račun unosom autorizacijskog koda poslanog na {phone}',
  verify_identity_title: 'Potvrdimo vaš identitet',
  verify_identity_description:
    'Zakonom smo obvezni provjeriti vaš identitet prije korištenja vašeg novca.',
  verify_identity_button: 'Potvrdi identitet',
  verifying: 'Provjeravam...',
  code_delivery_time: 'Može potrajati minuta da primite svoj kod.',
  resend_code: 'Pošaljite novi kod',
  continue: 'Nastavi',
  submit: 'Pošalji',
  email: 'E-pošta',
  password: 'Lozinka',
  confirm_password: 'Potvrdi lozinku',
  full_name: 'Puno ime',
  phone_number: 'Broj telefona',
  login_success: 'Uspješno prijavljeni',
  signup_success: 'Račun uspješno kreiran',
  logout_confirm: 'Jeste li sigurni da se želite odjaviti?',
  invalid_credentials: 'Neispravna e-pošta ili lozinka',
  email_required: 'E-pošta je obavezna',
  password_required: 'Lozinka je obavezna',
  password_too_short: 'Lozinka mora imati najmanje 6 znakova',
  passwords_do_not_match: 'Lozinke se ne podudaraju',
  passwords_must_match: 'Lozinke se moraju podudarati',
  email_invalid: 'Molimo unesite ispravnu e-poštu',
  password_min_8: 'Lozinka mora imati najmanje 8 znakova',
  password_complexity:
    'Lozinka mora sadržavati najmanje jedno veliko slovo, jedno malo slovo, jedan broj i jedan poseban znak',
  name_min: 'Ime mora imati najmanje 2 znaka',
  name_max: 'Ime mora imati manje od 50 znakova',
  name_required: 'Ime je obavezno',
  confirm_password_required: 'Molimo potvrdite lozinku',
  current_password_required: 'Trenutna lozinka je obavezna',
  new_password_required: 'Nova lozinka je obavezna',
  confirm_new_password_required: 'Molimo potvrdite novu lozinku',
  login_subtitle: 'Prijavite se na vaš A-Pay račun',
  enter_password: 'Unesite lozinku',
  create_password: 'Stvorite lozinku',
  remember_password: 'Sjećate se lozinke?',
  create_account: 'Stvori račun',
  signup_subtitle: 'Registrirajte se za početak korištenja A-Pay',
  enter_full_name: 'Unesite vaše puno ime',
  enter_email: 'Unesite vašu e-poštu',
  confirm_password_placeholder: 'Potvrdite vašu lozinku',
  already_have_account: 'Već imate račun?',
  sign_in: 'Prijavite se',
  reset_link_sent: 'Link za resetiranje poslan',
  reset_link_message:
    'Poslali smo vam link za resetiranje lozinke na vašu adresu e-pošte.',
  send_reset_link: 'Pošalji link za resetiranje',
  forgot_password_subtitle:
    'Ne brinite! Unesite vašu e-poštu i poslat ćemo vam link za resetiranje.',

  // Wallet
  total_balance: 'Ukupni saldo',
  receive: 'Primi',
  buy: 'Kupi',
  swap: 'Zamijeni',
  send: 'Pošalji',
  remove: 'Ukloni',
  balance_visible: 'Saldo vidljiv',
  balance_hidden: 'Saldo skriven',
  wallet_id: 'ID novčanika',
  member_since: 'Član od',
  account_status: 'Status računa',
  verified: 'Verificiran',
  unverified: 'Nije verificiran',

  // Profile
  edit_profile: 'Uredi profil',
  security: 'Sigurnost',
  account_information: 'Informacije o računu',
  preferences: 'Preference',
  dark_mode: 'Tamni način',
  language: 'Jezik',
  push_notifications: 'Push obavještenja',
  email_notifications: 'E-pošta obavještenja',
  biometric_login: 'Biometrijska prijava',
  change_photo: 'Dodirnite za promjenu slike',
  full_name_required: 'Molimo ispunite sva obavezna polja',
  email_required_profile: 'Molimo ispunite sva obavezna polja',
  profile_updated: 'Profil uspješno ažuriran',
  profile_update_error: 'Neuspješno ažuriranje profila',

  // Buy Modal
  buy_crypto: 'Kupi kripto',
  select_currency: 'Odaberite valutu',
  enter_amount: 'Unesite iznos',
  payment_method: 'Način plaćanja',
  order_summary: 'Sažetak narudžbe',
  total: 'Ukupno',
  fee: 'Naknada',
  card_details: 'Detalji kartice',
  card_number: 'Broj kartice',
  expiry_date: 'Datum isteka',
  cvv: 'CVV',
  cardholder_name: 'Ime vlasnika kartice',
  bank_transfer: 'Bankovni transfer',
  credit_debit_card: 'Kreditna/Debitna kartica',
  apple_pay: 'Apple Pay',
  google_pay: 'Google Pay',
  paypal: 'PayPal',
  instant_transfer: 'Trenutni transfer',
  secure_payment: 'Sigurno plaćanje',
  one_click_payment: 'Plaćanje jednim klikom',
  digital_wallet: 'Digitalni novčanik',
  online_payment: 'Online plaćanje',

  // Swap Modal
  swap_crypto: 'Zamijeni kripto',
  from: 'Od',
  to: 'Do',
  swap_rate: 'Tečaj zamjene',
  estimated_fee: 'Procijenjena naknada',
  estimated_time: 'Procijenjeno vrijeme',
  confirm_swap: 'Potvrdi zamjenu',
  swap_success: 'Zamjena uspješno završena',
  swap_error: 'Zamjena neuspješna',

  // Receive Modal
  receive_crypto: 'Primi kripto',
  your_address: 'Vaša adresa',
  copy_address: 'Kopiraj adresu',
  share_address: 'Podijeli adresu',
  qr_code: 'QR kod',
  address_copied: 'Adresa kopirana u međuspremnik',

  // History
  transaction_history: 'Povijest transakcija',
  all_transactions: 'Sve transakcije',
  recent_transactions: 'Nedavne transakcije',
  received: 'Primljeno',
  sent: 'Poslano',
  swapped: 'Zamijenjeno',
  bought: 'Kupljeno',
  pending: 'Na čekanju',
  completed: 'Završeno',
  failed: 'Neuspješno',
  no_transactions: 'Još nema transakcija',
  load_more: 'Učitaj više',

  // Settings
  general: 'Općenito',
  privacy: 'Privatnost',
  about: 'O aplikaciji',
  version: 'Verzija',
  support: 'Podrška',
  terms_of_service: 'Uvjeti korištenja',
  privacy_policy: 'Pravila privatnosti',
  rate_app: 'Ocijeni aplikaciju',
  share_app: 'Podijeli aplikaciju',

  // Languages
  english: 'English',
  arabic: 'العربية',
  croatian: 'Hrvatski',
  urdu: 'اردو',

  // Signup Flow
  account_type_description:
    'Možete kreirati osobne i poslovne račune na Orby. Osobni račun je za upravljanje osobnim financijama. A poslovni račun je za bankarske poslove.',
  personal_account: 'Osobni račun',
  personal_account_description:
    'Pogodno i sigurno bankarstvo za osobnu upotrebu. Lak pristup financijskim informacijama, učinkovite transakcije, 24/7 korisnička podrška.',
  business_account: 'Poslovni račun',
  business_account_description:
    'Razdvajanje osobnih i poslovnih financija. Pristup financijskim uslugama, poboljšano vođenje evidencija, vjerodostojnost i profesionalnost.',
  get_started: 'Počni',
  learn_more: 'Saznaj više',
  personal_account_subtitle:
    'Također možete kreirati poslovni račun kasnije ako trebate.',

  // Form Fields
  title: 'Titula',
  email_address: 'Email adresa',
  gender: 'Spol',
  date_of_birth: 'Datum rođenja',
  country: 'Zemlja',
  state: 'Država',
  city: 'Grad',
  address: 'Adresa',
  postcode: 'Poštanski broj',

  // Business Account Flow
  business_account_intro_subtitle:
    'Također možete stvoriti osobni račun kasnije ako vam treba.',
  business_account_intro_description:
    'Imajte na umu da ćete vjerojatno trebati pružiti detalje o svojoj tvrtki. To može uključivati informacije kao što su naziv tvrtke, adresa, porezni identifikacijski broj i vrsta poslovanja itd. Pružanje ovih detalja potrebno je kako bi se osiguralo da se račun otvara za legitimnu tvrtku i da se poštuju zakonski i regulatorni zahtjevi. Ako se od vas traži da pružite detalje o svojoj tvrtki, pobrinite se da imate potrebne informacije pri ruci i slijedite upute za dovršetak procesa postavljanja računa.',
  business_account_terms_1: 'Potvrđujem da sam pročitao i razumio',
  terms_and_conditions: 'Uvjete i odredbe',
  business_account_terms_2:
    'koji uređuju korištenje Orby-ja i slažem se da ih poštujem.',
  business_account_terms_description_1: 'Razumijem da se',
  business_account_terms_description_2:
    'mogu ažurirati s vremena na vrijeme i da je moja odgovornost redovito ih pregledavati kako bih bio informiran o promjenama. Označavanjem ovog okvira potvrđujem da sam imao priliku pregledati i postaviti pitanja o',
  user_agreement: 'Korisničkom sporazumu',
  business_account_terms_description_3:
    'i da se dobrovoljno slažem da ih poštujem.',

  // Business Account Contact
  country_of_incorporation: 'Zemlja osnivanja',
  country_of_incorporation_description:
    'Recite nam gdje je vaša tvrtka osnovana kako bismo vam mogli pomoći s otvaranjem računa.',
  select_country: 'Odaberite zemlju',
  select_city: 'Odaberite grad',
  first_name: 'Ime',
  last_name: 'Prezime',
  email_description:
    'Unesite email adresu koju želite koristiti za otvaranje računa ili prijavu.',
  phone_number_description:
    'Unesite svoj broj telefona. Poslat ćemo vam kod za potvrdu.',

  // Business Account Verification
  enter_6_digit_code: 'Unesite 6-znamenkasti kod',
  verification_code_sent_to: 'Unesite kod koji smo poslali na',
  verification_code_help: 'Može potrajati minuta da primite svoj kod.',
  havent_received_code: 'Niste ga primili?',
  resend_new_code: 'Pošaljite novi kod',
  sending: 'Šalje se...',
  invalid_code: 'Nevažeći kod',
  please_enter_correct_code: 'Molimo unesite ispravan kod za potvrdu.',
  incomplete_code: 'Nepotpun kod',
  please_enter_6_digit_code: 'Molimo unesite potpun 6-znamenkasti kod.',
  code_sent: 'Kod poslan',
  verification_code_sent: 'Kod za potvrdu je poslan na vaš telefon.',

  // Business Account Personal Info
  personal_information: 'Osobne informacije',
  personal_information_description:
    'Osoba kojoj je dodijeljeno dopuštenje za pristup određenim informacijama i upravljanje financijama organizacije.',

  // Business Account Address
  personal_address: 'Osobna adresa',
  personal_address_description:
    'Trebamo vašu kućnu adresu za otvaranje računa.',
  zip_code: 'Poštanski broj',

  // Business Account Details
  tell_us_about_business: 'Recite nam o svom poslu',
  business_details_description:
    'Trebamo detalje vašeg posla za otvaranje računa.',
  business_name: 'Naziv tvrtke',
  business_trade_name: 'Trgovački naziv',
  registration_number: 'Registracijski broj',
  date: 'Datum',
  select_company_type: 'Odaberite vrstu tvrtke',

  // Business Account Registered Address
  registered_address: 'Registrirana adresa',
  registered_address_description:
    'Službena adresa registrirana kod državnog tijela. Može se razlikovati od adrese na kojoj imate svoj posao ili zajednički radni prostor.',

  // Business Account Purpose
  what_would_you_like_to_do_with_orby_business:
    'Što biste htjeli raditi s Orby Business',
  receive_payments_from_customers: 'Primanje plaćanja od kupaca',
  make_everyday_purchases: 'Svakodnevne kupnje',
  pay_suppliers_and_employees: 'Plaćanje dobavljača i zaposlenika',
  manage_multiple_currencies: 'Upravljanje više valuta',
  to_pay_salaries: 'Za isplatu plaća',
  for_expense_management: 'Za upravljanje troškovima',
  for_invoice_issuance: 'Za izdavanje računa',

  // Business Account Role
  tell_us_about_your_role_in_company: 'Recite nam o svojoj ulozi u tvrtki',
  i_am_only_director_and_significant_shareholder:
    'Ja sam jedini direktor i značajan dioničar',
  only_director_description:
    'Vi ste jedini direktor i jedini vlasnik s više od 25% tvrtke',
  i_am_one_of_several_director_or_significant_shareholder:
    'Ja sam jedan od nekoliko direktora ili značajnih dioničara',
  one_of_several_description:
    'Postoje drugi direktori ili dioničari s više od 25% vlasništva',
  i_am_neither_director_nor_significant_shareholder:
    'Nisam direktor niti značajan dioničar',
  neither_director_description:
    'Prijavljujete se u ime svog poslodavca ili klijenta',
};

export default hr;
