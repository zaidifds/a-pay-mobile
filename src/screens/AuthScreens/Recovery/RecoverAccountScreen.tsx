import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PhoneInput, { ICountry } from 'react-native-international-phone-number';
import { AuthStackParamList } from '../../../navigation/AuthNavigator';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';

type RecoverAccountScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const RecoverAccountScreen: React.FC = () => {
  const navigation = useNavigation<RecoverAccountScreenNavigationProp>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<ICountry | undefined>(
    undefined,
  );
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    general: '',
  });
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSelectedCountry = (country: ICountry) => {
    setSelectedCountry(country);
  };

  const validateInputs = () => {
    const newErrors = {
      email: '',
      phone: '',
      general: '',
    };

    // At least one of email or phone number should be provided
    if (!email.trim() && !phoneNumber.trim()) {
      newErrors.general = 'Please provide either email or phone number';
      setErrors(newErrors);
      return false;
    }

    // If email is provided, validate email format
    if (email.trim() && !isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // If phone number is provided, validate phone format
    if (phoneNumber.trim() && !isValidPhoneNumber(phoneNumber)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.phone && !newErrors.general;
  };

  const isValidEmail = (emailAddress: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailAddress);
  };

  const isValidPhoneNumber = (phone: string) => {
    // Basic phone validation - at least 7 digits
    const phoneRegex = /^\d{7,}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const clearError = (field: string) => {
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) clearError('email');
    if (errors.general) clearError('general');
  };

  const handleEmailFocus = () => {
    setFocusedInput('email');
  };

  const handleEmailBlur = () => {
    setFocusedInput(null);
  };

  const handlePhoneChange = (text: string) => {
    setPhoneNumber(text);
    if (errors.phone) clearError('phone');
    if (errors.general) clearError('general');
  };

  const handlePhoneFocus = () => {
    setFocusedInput('phone');
  };

  const handlePhoneBlur = () => {
    setFocusedInput(null);
  };

  const handlePasswordFocus = () => {
    setFocusedInput('password');
  };

  const handlePasswordBlur = () => {
    setFocusedInput(null);
  };

  // Dynamic styles for better performance and readability
  const getInputFocusStyles = (inputType: string) => {
    const isFocused = focusedInput === inputType;
    return {
      borderColor: isFocused ? theme.colors.primary : theme.colors.inputBorder,
      shadowColor: isFocused ? theme.colors.primary : theme.colors.shadowColor,
      shadowOffset: {
        width: 0,
        height: isFocused ? 2 : 1,
      },
      shadowOpacity: isFocused ? 0.15 : 0.05,
      shadowRadius: isFocused ? 4 : 2,
      elevation: isFocused ? 3 : 1,
    };
  };

  const handleContinue = () => {
    if (!validateInputs()) {
      return;
    }

    // Determine which contact method to pass
    const hasEmail = email.trim() !== '';
    const hasPhone = phoneNumber.trim() !== '';

    if (hasEmail && hasPhone) {
      // If both are provided, prioritize email
      navigation.navigate('TwoWayAuthentication', { email: email.trim() });
    } else if (hasEmail) {
      navigation.navigate('TwoWayAuthentication', { email: email.trim() });
    } else if (hasPhone) {
      const fullPhoneNumber = selectedCountry
        ? `+${selectedCountry.idd.root}${phoneNumber}`
        : phoneNumber;
      navigation.navigate('TwoWayAuthentication', {
        phoneNumber: fullPhoneNumber,
      });
    } else {
      // Fallback - shouldn't happen due to validation
      navigation.navigate('TwoWayAuthentication', {});
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            { borderBottomColor: theme.colors.borderHeader },
            isRTL && styles.headerRTL,
          ]}
        >
          <TouchableOpacity
            style={[styles.backButton, isRTL && styles.backButtonRTL]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.backIcon, { color: theme.colors.icon }]}>
              ←
            </Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {t('recover_account_title')}
          </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={[styles.signInLink, { color: theme.colors.primary }]}>
              {t('sign_in')}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Description */}
          <Text
            style={[styles.description, { color: theme.colors.textSecondary }]}
          >
            {t('recover_account_description')}
          </Text>

          {/* General Error Message */}
          {errors.general ? (
            <View style={styles.errorContainer}>
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.general}
              </Text>
            </View>
          ) : null}

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.input,
                    borderColor: errors.email
                      ? theme.colors.error
                      : getInputFocusStyles('email').borderColor,
                    color: theme.colors.text,
                    shadowColor: getInputFocusStyles('email').shadowColor,
                    shadowOffset: getInputFocusStyles('email').shadowOffset,
                    shadowOpacity: getInputFocusStyles('email').shadowOpacity,
                    shadowRadius: getInputFocusStyles('email').shadowRadius,
                    elevation: getInputFocusStyles('email').elevation,
                  },
                  isRTL && styles.inputRTL,
                ]}
                placeholder={t('email')}
                placeholderTextColor={theme.colors.inputPlaceholder}
                value={email}
                onChangeText={handleEmailChange}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.email ? (
                <Text
                  style={[styles.fieldErrorText, { color: theme.colors.error }]}
                >
                  {errors.email}
                </Text>
              ) : null}
            </View>

            {/* Phone Number Input */}
            <View style={styles.phoneInputWrapper}>
              <PhoneInput
                value={phoneNumber}
                onChangePhoneNumber={handlePhoneChange}
                selectedCountry={selectedCountry}
                onChangeSelectedCountry={handleSelectedCountry}
                defaultCountry="GB"
                placeholder={t('phone_number')}
                onFocus={handlePhoneFocus}
                onBlur={handlePhoneBlur}
                phoneInputStyles={{
                  container: [
                    styles.phoneInputContainer,
                    {
                      borderColor: errors.phone
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
                    paddingVertical: 12,
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
                    height: 32,
                    marginHorizontal: 8,
                  },
                  input: {
                    color: theme.colors.text,
                    fontSize: 16,
                    fontWeight: '400',
                    textAlign: isRTL ? 'right' : 'left',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    flex: 1,
                    letterSpacing: 0.3,
                  },
                }}
              />
              {errors.phone ? (
                <Text
                  style={[styles.fieldErrorText, { color: theme.colors.error }]}
                >
                  {errors.phone}
                </Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.input,
                    borderColor: getInputFocusStyles('password').borderColor,
                    color: theme.colors.text,
                    shadowColor: getInputFocusStyles('password').shadowColor,
                    shadowOffset: getInputFocusStyles('password').shadowOffset,
                    shadowOpacity:
                      getInputFocusStyles('password').shadowOpacity,
                    shadowRadius: getInputFocusStyles('password').shadowRadius,
                    elevation: getInputFocusStyles('password').elevation,
                  },
                  isRTL && styles.inputRTL,
                ]}
                placeholder={t('password')}
                placeholderTextColor={theme.colors.inputPlaceholder}
                value={password}
                onChangeText={setPassword}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                backgroundColor: theme.colors.primary,
                shadowColor: theme.colors.shadowColor,
              },
            ]}
            onPress={handleContinue}
          >
            <Text
              style={[
                styles.continueButtonText,
                { color: theme.colors.buttonText },
              ]}
            >
              {t('continue')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerRTL: {
    flexDirection: 'row-reverse',
  },
  backButton: {
    padding: 8,
  },
  backButtonRTL: {
    transform: [{ scaleX: -1 }],
  },
  backIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  signInLink: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'left',
  },
  inputContainer: {
    gap: 20,
  },
  inputWrapper: {
    width: '100%',
  },
  input: {
    height: 56,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
    letterSpacing: 0.3,
  },
  inputRTL: {
    textAlign: 'right',
  },
  phoneInputWrapper: {
    width: '100%',
  },
  phoneInputContainer: {
    borderWidth: 1.5,
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  errorContainer: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
  fieldErrorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  continueButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecoverAccountScreen;
