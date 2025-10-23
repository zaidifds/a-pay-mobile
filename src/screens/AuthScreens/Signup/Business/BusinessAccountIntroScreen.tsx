import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../../navigation/AuthNavigator';
import { useTheme } from '../../../../hooks/useTheme';
import useTranslation from '../../../../localization/useTranslation';

type BusinessAccountIntroScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const BusinessAccountIntroScreen: React.FC = () => {
  const navigation = useNavigation<BusinessAccountIntroScreenNavigationProp>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const handleContinue = () => {
    if (termsAccepted) {
      navigation.navigate('BusinessAccountContact');
    }
  };

  const handleTermsPress = () => {
    // Navigate to terms and conditions
    console.log('Navigate to Terms and Conditions');
  };

  const handleUserAgreementPress = () => {
    // Navigate to user agreement
    console.log('Navigate to User Agreement');
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
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title */}
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {t('business_account')}
          </Text>

          {/* Subtitle */}
          <Text
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          >
            {t('business_account_intro_subtitle')}
          </Text>

          {/* Description */}
          <Text
            style={[styles.description, { color: theme.colors.textSecondary }]}
          >
            {t('business_account_intro_description')}
          </Text>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={[
                styles.checkboxContainer,
                isRTL && styles.checkboxContainerRTL,
              ]}
              onPress={() => setTermsAccepted(!termsAccepted)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: termsAccepted
                      ? theme.colors.primary
                      : theme.colors.input,
                    borderColor: termsAccepted
                      ? theme.colors.primary
                      : theme.colors.inputBorder,
                  },
                ]}
              >
                {termsAccepted && (
                  <Text
                    style={[
                      styles.checkmark,
                      { color: theme.colors.buttonText },
                    ]}
                  >
                    ✓
                  </Text>
                )}
              </View>
              <View style={styles.checkboxTextContainer}>
                <Text
                  style={[styles.checkboxText, { color: theme.colors.text }]}
                >
                  {t('business_account_terms_1')}{' '}
                  <Text
                    style={[styles.linkText, { color: theme.colors.primary }]}
                    onPress={handleTermsPress}
                  >
                    {t('terms_and_conditions')}
                  </Text>
                  {t('business_account_terms_2')}
                </Text>
              </View>
            </TouchableOpacity>

            <Text
              style={[
                styles.termsDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              {t('business_account_terms_description_1')}{' '}
              <Text
                style={[styles.linkText, { color: theme.colors.primary }]}
                onPress={handleTermsPress}
              >
                {t('terms_and_conditions')}
              </Text>
              {t('business_account_terms_description_2')}{' '}
              <Text
                style={[styles.linkText, { color: theme.colors.primary }]}
                onPress={handleUserAgreementPress}
              >
                {t('user_agreement')}
              </Text>
              {t('business_account_terms_description_3')}
            </Text>
          </View>
        </ScrollView>

        {/* Continue Button - Fixed at bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                backgroundColor: termsAccepted
                  ? theme.colors.primary
                  : theme.colors.buttonDisabled,
                shadowColor: theme.colors.shadowColor,
              },
            ]}
            onPress={handleContinue}
            disabled={!termsAccepted}
          >
            <Text
              style={[
                styles.continueButtonText,
                {
                  color: termsAccepted
                    ? theme.colors.buttonText
                    : theme.colors.textSecondary,
                },
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 20,
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
    marginBottom: 24,
    textAlign: 'left',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 32,
    textAlign: 'left',
  },
  termsContainer: {
    marginBottom: 32,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkboxContainerRTL: {
    flexDirection: 'row-reverse',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkmark: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxTextContainer: {
    flex: 1,
  },
  checkboxText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
  },
  linkText: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  termsDescription: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'left',
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

export default BusinessAccountIntroScreen;
