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
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import FormInput from '@/components/forms/FormInput';
import FormDropdown from '@/components/forms/FormDropdown';
import { DynamicHeader } from '@/components/ui';

type BusinessAccountAddressScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const BusinessAccountAddressScreen: React.FC = () => {
  const navigation =
    useNavigation<BusinessAccountAddressScreenNavigationProp>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  // Form state
  const [formData, setFormData] = useState({
    country: 'United Kingdom',
    address: '',
    state: '',
    city: '',
    zipCode: '',
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

  const stateOptions = [
    { label: 'England', value: 'England' },
    { label: 'Scotland', value: 'Scotland' },
    { label: 'Wales', value: 'Wales' },
    { label: 'Northern Ireland', value: 'Northern Ireland' },
  ];

  const cityOptions = [
    { label: 'London', value: 'London' },
    { label: 'Manchester', value: 'Manchester' },
    { label: 'Birmingham', value: 'Birmingham' },
    { label: 'Liverpool', value: 'Liverpool' },
    { label: 'Leeds', value: 'Leeds' },
    { label: 'Sheffield', value: 'Sheffield' },
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

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigation.navigate('BusinessAccountDetails');
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
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
        onBackPress={() => navigation.goBack()}
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
              {t('personal_address')}
            </Text>

            {/* Description */}
            <Text
              style={[
                styles.description,
                { color: theme.colors.textSecondary },
              ]}
            >
              {t('personal_address_description')}
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

              {/* Address */}
              <View style={styles.fieldContainer}>
                <FormInput
                  placeholder={t('address')}
                  value={formData.address}
                  onChangeText={value => handleInputChange('address', value)}
                  error={errors.address}
                  onFocus={() => setFocusedInput('address')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              {/* State */}
              <View style={styles.fieldContainer}>
                <FormDropdown
                  placeholder={t('state')}
                  options={stateOptions}
                  selectedValue={formData.state}
                  onSelect={value => handleInputChange('state', value)}
                  error={errors.state}
                />
              </View>

              {/* City */}
              <View style={styles.fieldContainer}>
                <FormDropdown
                  placeholder={t('select_city')}
                  options={cityOptions}
                  selectedValue={formData.city}
                  onSelect={value => handleInputChange('city', value)}
                  error={errors.city}
                />
              </View>

              {/* ZIP Code */}
              <View style={styles.fieldContainer}>
                <FormInput
                  placeholder={t('zip_code')}
                  value={formData.zipCode}
                  onChangeText={value => handleInputChange('zipCode', value)}
                  error={errors.zipCode}
                  keyboardType="numeric"
                  onFocus={() => setFocusedInput('zipCode')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Continue Button - Fixed at bottom */}
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
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  continueButton: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BusinessAccountAddressScreen;
