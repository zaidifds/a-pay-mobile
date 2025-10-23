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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../../navigation/AuthNavigator';
import { useTheme } from '../../../../hooks/useTheme';
import useTranslation from '../../../../localization/useTranslation';
import FormInput from '../../../../components/FormInput';

type BusinessAccountPersonalInfoScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const BusinessAccountPersonalInfoScreen: React.FC = () => {
  const navigation =
    useNavigation<BusinessAccountPersonalInfoScreenNavigationProp>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigation.navigate('BusinessAccountAddress');
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const handleDatePress = () => {
    // In a real app, this would open a date picker
    // For now, we'll just show an alert
    console.log('Open date picker');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
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
          <Text style={[styles.backIcon, { color: theme.colors.icon }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          {t('business_account')}
        </Text>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={[styles.signInLink, { color: theme.colors.primary }]}>
            {t('sign_in')}
          </Text>
        </TouchableOpacity>
      </View>

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
              {t('personal_information')}
            </Text>

            {/* Description */}
            <Text
              style={[
                styles.description,
                { color: theme.colors.textSecondary },
              ]}
            >
              {t('personal_information_description')}
            </Text>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              {/* First Name */}
              <View style={styles.fieldContainer}>
                <FormInput
                  placeholder={t('first_name')}
                  value={formData.firstName}
                  onChangeText={value => handleInputChange('firstName', value)}
                  error={errors.firstName}
                  onFocus={() => setFocusedInput('firstName')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              {/* Last Name */}
              <View style={styles.fieldContainer}>
                <FormInput
                  placeholder={t('last_name')}
                  value={formData.lastName}
                  onChangeText={value => handleInputChange('lastName', value)}
                  error={errors.lastName}
                  onFocus={() => setFocusedInput('lastName')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              {/* Date of Birth */}
              <View style={styles.fieldContainer}>
                <TouchableOpacity
                  style={[
                    styles.dateInput,
                    {
                      borderColor: errors.dateOfBirth
                        ? theme.colors.error
                        : focusedInput === 'dateOfBirth'
                        ? theme.colors.primary
                        : theme.colors.inputBorder,
                      backgroundColor: theme.colors.input,
                      shadowColor:
                        focusedInput === 'dateOfBirth'
                          ? theme.colors.primary
                          : theme.colors.shadowColor,
                      shadowOffset: {
                        width: 0,
                        height: focusedInput === 'dateOfBirth' ? 2 : 1,
                      },
                      shadowOpacity:
                        focusedInput === 'dateOfBirth' ? 0.15 : 0.05,
                      shadowRadius: focusedInput === 'dateOfBirth' ? 4 : 2,
                      elevation: focusedInput === 'dateOfBirth' ? 3 : 1,
                    },
                  ]}
                  onPress={handleDatePress}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.dateInputText,
                      {
                        color: formData.dateOfBirth
                          ? theme.colors.text
                          : theme.colors.textSecondary,
                      },
                    ]}
                  >
                    {formData.dateOfBirth || t('date_of_birth')}
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
                {errors.dateOfBirth && (
                  <Text
                    style={[styles.errorText, { color: theme.colors.error }]}
                  >
                    {errors.dateOfBirth}
                  </Text>
                )}
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
    </SafeAreaView>
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

export default BusinessAccountPersonalInfoScreen;
