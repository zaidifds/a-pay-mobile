import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../../navigation/AuthNavigator';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import CodeInput from '@/components/ui/CodeInput';
import { DynamicHeader } from '@/components/ui';

type BusinessAccountVerificationScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;
type BusinessAccountVerificationScreenRouteProp = RouteProp<
  AuthStackParamList,
  'BusinessAccountVerification'
>;

const BusinessAccountVerificationScreen: React.FC = () => {
  const navigation =
    useNavigation<BusinessAccountVerificationScreenNavigationProp>();
  const route = useRoute<BusinessAccountVerificationScreenRouteProp>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const [maskedPhone, setMaskedPhone] = useState('+44123456789');

  useEffect(() => {
    // Get phone number from previous screen
    const phoneNumber = route.params?.phoneNumber;
    if (phoneNumber) {
      // Mask the phone number for display
      const masked = phoneNumber.replace(/(\+\d{2})\d{4}(\d{3})/, '$1****$2');
      setMaskedPhone(masked);
    }
  }, [route.params]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handleKeyPress = (_key: string, _index: number) => {
    // Handle any additional key press logic if needed
  };

  const handleResend = async () => {
    setIsResending(true);
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      Alert.alert(t('code_sent'), t('verification_code_sent'));
    }, 2000);
  };

  const handleContinue = () => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      // Validate code (in real app, this would be an API call)
      if (fullCode === '123456') {
        navigation.navigate('BusinessAccountPersonalInfo');
      } else {
        Alert.alert(t('invalid_code'), t('please_enter_correct_code'));
      }
    } else {
      Alert.alert(t('incomplete_code'), t('please_enter_6_digit_code'));
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const isCodeComplete = code.every(digit => digit !== '');

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

          {/* Instructions */}
          <Text style={[styles.instruction, { color: theme.colors.text }]}>
            {t('enter_6_digit_code')}
          </Text>

          <Text
            style={[styles.description, { color: theme.colors.textSecondary }]}
          >
            {t('verification_code_sent_to')} {maskedPhone}
          </Text>

          {/* Code Input Fields */}
          <View style={styles.codeInputContainer}>
            <CodeInput
              length={6}
              value={code}
              onChangeText={handleCodeChange}
              onKeyPress={handleKeyPress}
              autoFocus={true}
            />
          </View>

          {/* Help Text */}
          <Text
            style={[styles.helpText, { color: theme.colors.textSecondary }]}
          >
            {t('verification_code_help')}
          </Text>

          {/* Resend Code */}
          <View
            style={[styles.resendContainer, isRTL && styles.resendContainerRTL]}
          >
            <Text
              style={[styles.resendText, { color: theme.colors.textSecondary }]}
            >
              {t('havent_received_code')}
            </Text>
            <TouchableOpacity
              onPress={handleResend}
              disabled={isResending}
              style={styles.resendButton}
            >
              <Text
                style={[
                  styles.resendButtonText,
                  {
                    color: isResending
                      ? theme.colors.textSecondary
                      : theme.colors.primary,
                  },
                ]}
              >
                {isResending ? t('sending') : t('resend_new_code')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Continue Button - Fixed at bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                backgroundColor: isCodeComplete
                  ? theme.colors.primary
                  : theme.colors.buttonDisabled,
                shadowColor: theme.colors.shadowColor,
              },
            ]}
            onPress={handleContinue}
            disabled={!isCodeComplete}
          >
            <Text
              style={[
                styles.continueButtonText,
                {
                  color: isCodeComplete
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  instruction: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'left',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
    textAlign: 'left',
  },
  codeInputContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: 'transparent',
  },
  continueButton: {
    width: '100%',
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
  helpText: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 16,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  resendContainerRTL: {
    flexDirection: 'row-reverse',
  },
  resendText: {
    fontSize: 14,
    marginRight: 8,
  },
  resendButton: {
    paddingVertical: 4,
  },
  resendButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BusinessAccountVerificationScreen;
