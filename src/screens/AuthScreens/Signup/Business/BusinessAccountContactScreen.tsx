import { FormDropdown, FormInput, DatePicker } from '@/components/forms';
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
  TouchableOpacity,
  View,
} from 'react-native';
import PhoneInput, { ICountry } from 'react-native-international-phone-number';
import { AuthStackParamList } from '../../../../navigation/AuthNavigator';
import { DynamicHeader, StandardButton } from '@/components/ui';

type BusinessAccountContactScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const BusinessAccountContactScreen: React.FC = () => {
  const navigation =
    useNavigation<BusinessAccountContactScreenNavigationProp>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  // Form state
  const [formData, setFormData] = useState({
    countryOfIncorporation: 'United Kingdom',
    email: '',
    phoneNumber: '',
  });

  const [selectedCountry, setSelectedCountry] = useState<ICountry | undefined>(
    undefined,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Dropdown options
  const countryOptions = [
    { label: 'United Kingdom', value: 'United Kingdom', icon: '🇬🇧' },
    { label: 'United States', value: 'United States', icon: '🇺🇸' },
    { label: 'Canada', value: 'Canada', icon: '🇨🇦' },
    { label: 'Australia', value: 'Australia', icon: '🇦🇺' },
    { label: 'Germany', value: 'Germany', icon: '🇩🇪' },
    { label: 'France', value: 'France', icon: '🇫🇷' },
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigation.navigate('BusinessAccountVerification', {
        phoneNumber: selectedCountry
          ? `+${selectedCountry.idd.root}${formData.phoneNumber}`
          : formData.phoneNumber,
      });
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
      {/* Header */}
      <DynamicHeader
        title={t('business_account')}
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

      <View style={styles.contentContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets={true}
          >
            {/* Title */}
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {t('business_account')}
            </Text>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              {/* Country of Incorporation */}
              <View style={styles.fieldContainer}>
                <Text style={[styles.fieldLabel, { color: theme.colors.text }]}>
                  {t('country_of_incorporation')}
                </Text>
                <Text
                  style={[
                    styles.fieldDescription,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {t('country_of_incorporation_description')}
                </Text>
                <FormDropdown
                  placeholder={t('select_country')}
                  options={countryOptions}
                  selectedValue={formData.countryOfIncorporation}
                  onSelect={value =>
                    handleInputChange('countryOfIncorporation', value)
                  }
                  error={errors.countryOfIncorporation}
                />
              </View>

              {/* Email */}
              <View style={styles.fieldContainer}>
                <Text style={[styles.fieldLabel, { color: theme.colors.text }]}>
                  {t('email')}
                </Text>
                <Text
                  style={[
                    styles.fieldDescription,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {t('email_description')}
                </Text>
                <FormInput
                  placeholder={t('email')}
                  value={formData.email}
                  onChangeText={value => handleInputChange('email', value)}
                  error={errors.email}
                  keyboardType="email-address"
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              {/* Phone Number */}
              <View style={styles.fieldContainer}>
                <Text style={[styles.fieldLabel, { color: theme.colors.text }]}>
                  {t('phone_number')}
                </Text>
                <Text
                  style={[
                    styles.fieldDescription,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {t('phone_number_description')}
                </Text>
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
                          shadowOffset:
                            getInputFocusStyles('phone').shadowOffset,
                          shadowOpacity:
                            getInputFocusStyles('phone').shadowOpacity,
                          shadowRadius:
                            getInputFocusStyles('phone').shadowRadius,
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
                  {errors.phoneNumber && (
                    <Text
                      style={[styles.errorText, { color: theme.colors.error }]}
                    >
                      {errors.phoneNumber}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Continue Button - Fixed at bottom */}
        <View style={styles.buttonContainer}>
          <StandardButton
            title={t('continue')}
            onPress={handleContinue}
            variant="primary"
            size="large"
            fullWidth
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  signInLink: {
    fontSize: 16,
    fontWeight: '500',
  },
  contentContainer: {
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
    paddingBottom: 100,
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'left',
  },
  formContainer: {
    marginBottom: 32,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'left',
  },
  fieldDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    textAlign: 'left',
  },
  phoneContainer: {
    marginBottom: 16,
  },
  phoneInputContainer: {
    borderWidth: 1.5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: 'transparent',
  },
});

export default BusinessAccountContactScreen;
