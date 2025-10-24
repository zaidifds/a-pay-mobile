import { DatePicker, FormDropdown, FormInput } from '@/components/forms';
import { DynamicHeader, StandardButton } from '@/components/ui';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PhoneInput, { ICountry } from 'react-native-international-phone-number';
import { AuthStackParamList } from '../../../../navigation/AuthNavigator';

type PersonalSignupScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const PersonalSignupScreen: React.FC = () => {
  const navigation = useNavigation<PersonalSignupScreenNavigationProp>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  // Form state
  const [formData, setFormData] = useState({
    title: 'Ms.',
    fullName: 'Cara Dune',
    email: 'caradune@gmail.com',
    phoneNumber: '123 456 7890',
    gender: 'Female',
    dateOfBirth: '24 Mar, 1990',
    country: 'United Kingdom',
    state: 'London',
    city: 'London',
    address: '15 High Street',
    postcode: 'SW15 1PP',
  });

  const [selectedCountry, setSelectedCountry] = useState<ICountry | undefined>(
    undefined,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Dropdown options
  const titleOptions = [
    { label: 'Mr.', value: 'Mr.' },
    { label: 'Ms.', value: 'Ms.' },
    { label: 'Mrs.', value: 'Mrs.' },
    { label: 'Dr.', value: 'Dr.' },
    { label: 'Prof.', value: 'Prof.' },
  ];

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
    { label: 'Prefer not to say', value: 'Prefer not to say' },
  ];

  const countryOptions = [
    { label: 'United Kingdom', value: 'United Kingdom', icon: '🇬🇧' },
    { label: 'United States', value: 'United States', icon: '🇺🇸' },
    { label: 'Canada', value: 'Canada', icon: '🇨🇦' },
    { label: 'Australia', value: 'Australia', icon: '🇦🇺' },
    { label: 'Germany', value: 'Germany', icon: '🇩🇪' },
    { label: 'France', value: 'France', icon: '🇫🇷' },
  ];

  const stateOptions = [
    { label: 'London', value: 'London' },
    { label: 'Manchester', value: 'Manchester' },
    { label: 'Birmingham', value: 'Birmingham' },
    { label: 'Liverpool', value: 'Liverpool' },
    { label: 'Leeds', value: 'Leeds' },
  ];

  const cityOptions = [
    { label: 'London', value: 'London' },
    { label: 'Manchester', value: 'Manchester' },
    { label: 'Birmingham', value: 'Birmingham' },
    { label: 'Liverpool', value: 'Liverpool' },
    { label: 'Leeds', value: 'Leeds' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCountrySelect = (country: ICountry) => {
    setSelectedCountry(country);
  };

  const handlePhoneChange = (phoneNumber: string) => {
    setFormData(prev => ({ ...prev, phoneNumber }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.postcode.trim()) {
      newErrors.postcode = 'Postcode is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccount = () => {
    if (validateForm()) {
      // Navigate to next screen or submit form
      console.log('Form submitted:', formData);
      // navigation.navigate('NextScreen');
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const getInputFocusStyles = (inputType: string) => {
    const isFocused = focusedInput === inputType;
    return {
      borderColor: errors[inputType]
        ? theme.colors.error
        : isFocused
        ? theme.colors.primary
        : theme.colors.inputBorder,
      shadowColor: isFocused ? theme.colors.primary : theme.colors.shadowColor,
      shadowOffset: { width: 0, height: isFocused ? 2 : 1 },
      shadowOpacity: isFocused ? 0.15 : 0.05,
      shadowRadius: isFocused ? 4 : 2,
      elevation: isFocused ? 3 : 1,
    };
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DynamicHeader
        title={t('personal_account')}
        showBackButton
        backButtonIcon="←"
        showRightButton
        rightButtonText={t('sign_in')}
        onBackPress={() => {
          console.log('Back button pressed');
          navigation.goBack();
        }}
        onRightPress={handleSignIn}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {t('personal_account')}
          </Text>

          {/* Subtitle */}
          <Text
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          >
            {t('personal_account_subtitle')}
          </Text>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Title & Name Row */}
            <View style={[styles.row, isRTL && styles.rowRTL]}>
              <View style={styles.halfWidth}>
                <FormDropdown
                  placeholder={t('title')}
                  options={titleOptions}
                  selectedValue={formData.title}
                  onSelect={(value: string) =>
                    handleInputChange('title', value)
                  }
                  error={errors.title}
                />
              </View>
              <View style={styles.halfWidth}>
                <FormInput
                  placeholder={t('full_name')}
                  value={formData.fullName}
                  onChangeText={(value: string) =>
                    handleInputChange('fullName', value)
                  }
                  error={errors.fullName}
                  onFocus={() => setFocusedInput('fullName')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>

            {/* Email */}
            <FormInput
              placeholder={t('email_address')}
              value={formData.email}
              onChangeText={(value: string) =>
                handleInputChange('email', value)
              }
              error={errors.email}
              keyboardType="email-address"
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />

            {/* Phone Number */}
            <View style={styles.phoneContainer}>
              <PhoneInput
                value={formData.phoneNumber}
                onChangePhoneNumber={handlePhoneChange}
                selectedCountry={selectedCountry}
                onChangeSelectedCountry={handleCountrySelect}
                defaultCountry="GB"
                placeholder={t('phone_number')}
                onFocus={() => setFocusedInput('phone')}
                onBlur={() => setFocusedInput(null)}
                phoneInputStyles={{
                  container: [
                    styles.phoneInputContainer,
                    {
                      borderColor: errors.phoneNumber
                        ? theme.colors.error
                        : getInputFocusStyles('phone').borderColor,
                      backgroundColor: theme.colors.input,
                      shadowColor: getInputFocusStyles('phone').shadowColor,
                      shadowOffset: getInputFocusStyles('phone').shadowOffset,
                      shadowOpacity: getInputFocusStyles('phone').shadowOpacity,
                      shadowRadius: getInputFocusStyles('phone').shadowRadius,
                      elevation: getInputFocusStyles('phone').elevation,
                    },
                  ],
                  flagContainer: {
                    paddingHorizontal: 16,
                    height: 56,
                    backgroundColor: theme.colors.backgroundSecondary,
                    borderTopLeftRadius: 12,
                    borderBottomLeftRadius: 12,
                    minWidth: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  flag: {
                    fontSize: 22,
                    marginRight: 8,
                  },
                  callingCode: {
                    color: theme.colors.text,
                    fontSize: 16,
                    fontWeight: '600',
                    letterSpacing: 0.5,
                  },
                  caret: {
                    color: theme.colors.iconSecondary,
                    fontSize: 14,
                    marginLeft: 6,
                    fontWeight: 'bold',
                  },
                  divider: {
                    backgroundColor: theme.colors.inputBorder,
                    width: 1,
                    height: 40,
                    marginHorizontal: 8,
                  },
                  input: {
                    color: theme.colors.text,
                    fontSize: 16,
                    fontWeight: '400',
                    textAlign: isRTL ? 'right' : 'left',
                    paddingHorizontal: 16,
                    height: 56,
                    flex: 1,
                    letterSpacing: 0.3,
                  },
                }}
              />
              {errors.phoneNumber && (
                <Text style={[styles.errorText, { color: theme.colors.error }]}>
                  {errors.phoneNumber}
                </Text>
              )}
            </View>

            {/* Gender & Date of Birth Row */}
            <View style={[styles.row, isRTL && styles.rowRTL]}>
              <View style={styles.halfWidth}>
                <FormDropdown
                  placeholder={t('gender')}
                  options={genderOptions}
                  selectedValue={formData.gender}
                  onSelect={(value: string) =>
                    handleInputChange('gender', value)
                  }
                  error={errors.gender}
                />
              </View>
              <View style={styles.halfWidth}>
                <DatePicker
                  placeholder={t('date_of_birth')}
                  value={formData.dateOfBirth}
                  onChangeText={(value: string) =>
                    handleInputChange('dateOfBirth', value)
                  }
                  error={errors.dateOfBirth}
                  onFocus={() => setFocusedInput('dateOfBirth')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>

            {/* Country */}
            <FormDropdown
              placeholder={t('country')}
              options={countryOptions}
              selectedValue={formData.country}
              onSelect={(value: string) => handleInputChange('country', value)}
              error={errors.country}
            />

            {/* State & City Row */}
            <View style={[styles.row, isRTL && styles.rowRTL]}>
              <View style={styles.halfWidth}>
                <FormDropdown
                  placeholder={t('state')}
                  options={stateOptions}
                  selectedValue={formData.state}
                  onSelect={(value: string) =>
                    handleInputChange('state', value)
                  }
                  error={errors.state}
                />
              </View>
              <View style={styles.halfWidth}>
                <FormDropdown
                  placeholder={t('city')}
                  options={cityOptions}
                  selectedValue={formData.city}
                  onSelect={(value: string) => handleInputChange('city', value)}
                  error={errors.city}
                />
              </View>
            </View>

            {/* Address */}
            <FormInput
              placeholder={t('address')}
              value={formData.address}
              onChangeText={(value: string) =>
                handleInputChange('address', value)
              }
              error={errors.address}
              onFocus={() => setFocusedInput('address')}
              onBlur={() => setFocusedInput(null)}
            />

            {/* Postcode */}
            <FormInput
              placeholder={t('postcode')}
              value={formData.postcode}
              onChangeText={(value: string) =>
                handleInputChange('postcode', value)
              }
              error={errors.postcode}
              onFocus={() => setFocusedInput('postcode')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Create Account Button */}
          <StandardButton
            title={t('create_account')}
            onPress={handleCreateAccount}
            variant="primary"
            size="large"
            fullWidth
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'left',
  },
  formContainer: {
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowRTL: {
    flexDirection: 'row-reverse',
  },
  halfWidth: {
    flex: 1,
  },
  phoneContainer: {
    marginBottom: 16,
  },
  phoneInputContainer: {
    borderWidth: 1.5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default PersonalSignupScreen;
