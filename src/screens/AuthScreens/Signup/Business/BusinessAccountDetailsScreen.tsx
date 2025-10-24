import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../../navigation/AuthNavigator';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { FormInput, FormDropdown, DatePicker } from '@/components/forms';
import { DynamicHeader, StandardButton } from '@/components/ui';

type BusinessAccountDetailsScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const BusinessAccountDetailsScreen: React.FC = () => {
  const navigation =
    useNavigation<BusinessAccountDetailsScreenNavigationProp>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  // Form state
  const [formData, setFormData] = useState({
    country: 'United Kingdom',
    businessName: '',
    businessTradeName: '',
    registrationNo: '',
    date: '09/09/2016',
    companyType: 'Private Limited Company',
  });

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

  const companyTypeOptions = [
    { label: 'Private Limited Company', value: 'Private Limited Company' },
    { label: 'Public Limited Company', value: 'Public Limited Company' },
    { label: 'Partnership', value: 'Partnership' },
    { label: 'Sole Proprietorship', value: 'Sole Proprietorship' },
    { label: 'LLC', value: 'LLC' },
    { label: 'Corporation', value: 'Corporation' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    if (!formData.businessTradeName.trim()) {
      newErrors.businessTradeName = 'Business trade name is required';
    }
    if (!formData.registrationNo.trim()) {
      newErrors.registrationNo = 'Registration number is required';
    }
    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigation.navigate('BusinessAccountRegisteredAddress');
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const handleDatePress = () => {
    // In a real app, this would open a date picker
    console.log('Open date picker');
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

            {/* Subtitle */}
            <Text style={[styles.subtitle, { color: theme.colors.text }]}>
              {t('tell_us_about_business')}
            </Text>

            {/* Description */}
            <Text
              style={[
                styles.description,
                { color: theme.colors.textSecondary },
              ]}
            >
              {t('business_details_description')}
            </Text>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              {/* Country */}
              <View style={styles.fieldContainer}>
                <FormDropdown
                  placeholder={t('select_country')}
                  options={countryOptions}
                  selectedValue={formData.country}
                  onSelect={value => handleInputChange('country', value)}
                  error={errors.country}
                />
              </View>

              {/* Business Name */}
              <View style={styles.fieldContainer}>
                <FormInput
                  placeholder={t('business_name')}
                  value={formData.businessName}
                  onChangeText={value =>
                    handleInputChange('businessName', value)
                  }
                  error={errors.businessName}
                  onFocus={() => setFocusedInput('businessName')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              {/* Business Trade Name */}
              <View style={styles.fieldContainer}>
                <FormInput
                  placeholder={t('business_trade_name')}
                  value={formData.businessTradeName}
                  onChangeText={value =>
                    handleInputChange('businessTradeName', value)
                  }
                  error={errors.businessTradeName}
                  onFocus={() => setFocusedInput('businessTradeName')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              {/* Registration Number */}
              <View style={styles.fieldContainer}>
                <FormInput
                  placeholder={t('registration_number')}
                  value={formData.registrationNo}
                  onChangeText={value =>
                    handleInputChange('registrationNo', value)
                  }
                  error={errors.registrationNo}
                  onFocus={() => setFocusedInput('registrationNo')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              {/* Date */}
              <View style={styles.fieldContainer}>
                <TouchableOpacity
                  style={[
                    styles.dateInput,
                    {
                      borderColor: errors.date
                        ? theme.colors.error
                        : focusedInput === 'date'
                        ? theme.colors.primary
                        : theme.colors.inputBorder,
                      backgroundColor: theme.colors.input,
                      shadowColor:
                        focusedInput === 'date'
                          ? theme.colors.primary
                          : theme.colors.shadowColor,
                      shadowOffset: {
                        width: 0,
                        height: focusedInput === 'date' ? 2 : 1,
                      },
                      shadowOpacity: focusedInput === 'date' ? 0.15 : 0.05,
                      shadowRadius: focusedInput === 'date' ? 4 : 2,
                      elevation: focusedInput === 'date' ? 3 : 1,
                    },
                  ]}
                  onPress={handleDatePress}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.dateInputText,
                      {
                        color: formData.date
                          ? theme.colors.text
                          : theme.colors.textSecondary,
                      },
                    ]}
                  >
                    {formData.date || t('date')}
                  </Text>
                  <Text
                    style={[
                      styles.calendarIcon,
                      { color: theme.colors.iconSecondary },
                    ]}
                  >
                    📅
                  </Text>
                </TouchableOpacity>
                {errors.date && (
                  <Text
                    style={[styles.errorText, { color: theme.colors.error }]}
                  >
                    {errors.date}
                  </Text>
                )}
              </View>

              {/* Company Type */}
              <View style={styles.fieldContainer}>
                <FormDropdown
                  placeholder={t('select_company_type')}
                  options={companyTypeOptions}
                  selectedValue={formData.companyType}
                  onSelect={value => handleInputChange('companyType', value)}
                  error={errors.companyType}
                />
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
    marginBottom: 8,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'left',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 32,
    textAlign: 'left',
  },
  formContainer: {
    marginBottom: 32,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  dateInput: {
    height: 56,
    borderWidth: 1.5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dateInputText: {
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
  },
  calendarIcon: {
    fontSize: 20,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});

export default BusinessAccountDetailsScreen;
