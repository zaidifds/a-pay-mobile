import React, { useState } from 'react';
import {
  View,
  Text,
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
import { FormInput, DatePicker } from '@/components/forms';
import { DynamicHeader, StandardButton } from '@/components/ui';

type BusinessAccountPersonalInfoScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const BusinessAccountPersonalInfoScreen: React.FC = () => {
  const navigation =
    useNavigation<BusinessAccountPersonalInfoScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
                  onFocus={() => {}}
                  onBlur={() => {}}
                />
              </View>

              {/* Last Name */}
              <View style={styles.fieldContainer}>
                <FormInput
                  placeholder={t('last_name')}
                  value={formData.lastName}
                  onChangeText={value => handleInputChange('lastName', value)}
                  error={errors.lastName}
                  onFocus={() => {}}
                  onBlur={() => {}}
                />
              </View>

              {/* Date of Birth */}
              <View style={styles.fieldContainer}>
                <DatePicker
                  placeholder={t('date_of_birth')}
                  value={formData.dateOfBirth}
                  onChangeText={value =>
                    handleInputChange('dateOfBirth', value)
                  }
                  error={errors.dateOfBirth}
                  onFocus={() => {}}
                  onBlur={() => {}}
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
});

export default BusinessAccountPersonalInfoScreen;
