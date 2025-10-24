import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/AuthNavigator';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import { CodeInput } from '@/components';

type TwoWayAuthenticationScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const TwoWayAuthenticationScreen: React.FC = () => {
  const navigation = useNavigation<TwoWayAuthenticationScreenNavigationProp>();
  const route = useRoute();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  const [code, setCode] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState({
    code: '',
    general: '',
  });
  const [maskedContact, setMaskedContact] = useState('+1*******890');
  const inputRefs = useRef<TextInput[]>([]);

  // Get data from previous screen
  useEffect(() => {
    // Get phone number or email from previous screen
    const params = route.params as
      | { phoneNumber?: string; email?: string }
      | undefined;
    const phoneNumber = params?.phoneNumber;
    const email = params?.email;

    if (phoneNumber) {
      setMaskedContact(phoneNumber);
    } else if (email) {
      setMaskedContact(email);
    } else {
      // Fallback
      setMaskedContact('+1*******890');
    }
  }, [route.params]);

  const handleCodeChange = (value: string, index: number) => {
    // Only allow single digit
    const digit = value.replace(/[^0-9]/g, '').slice(0, 1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    // Clear errors when user types
    if (errors.code) {
      setErrors(prev => ({ ...prev, code: '' }));
    }

    // Auto-focus next input
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const validateCode = () => {
    const isComplete = code.every(digit => digit !== '');
    if (!isComplete) {
      setErrors(prev => ({
        ...prev,
        code: 'Please enter the complete 4-digit code',
      }));
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateCode()) {
      return;
    }
    // Navigate to VerifyIdentity screen
    navigation.navigate('VerifyIdentity');
  };

  const handleResend = () => {
    // Handle resend logic
    console.log('Resend code');
  };

  const getSubmitButtonStyles = () => {
    const isComplete = code.every(digit => digit !== '');
    return {
      backgroundColor: isComplete
        ? theme.colors.primary
        : theme.colors.buttonDisabled,
      shadowColor: theme.colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    };
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
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
          </View>

          {/* Top Section - Title and Description */}
          <View style={styles.topSection}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {t('two_way_auth_title')}
            </Text>

            <Text
              style={[
                styles.description,
                { color: theme.colors.textSecondary },
              ]}
            >
              {t('two_way_auth_description').replace('{phone}', maskedContact)}
            </Text>
          </View>

          {/* Center Section - Code Input Fields */}
          <View style={styles.centerSection}>
            {/* Error Message */}
            {errors.code ? (
              <View style={styles.errorContainer}>
                <Text style={[styles.errorText, { color: theme.colors.error }]}>
                  {errors.code}
                </Text>
              </View>
            ) : null}

            {/* Code Input Fields */}
            <View style={styles.codeInputWrapper}>
              <CodeInput
                length={6}
                value={code}
                onChangeText={handleCodeChange}
                error={errors.code}
                autoFocus={true}
              />
            </View>
          </View>

          {/* Bottom Section - Button and Helper Text */}
          <View style={styles.bottomSection}>
            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, getSubmitButtonStyles()]}
              onPress={handleSubmit}
              disabled={!code.every(digit => digit !== '')}
            >
              <Text
                style={[
                  styles.submitButtonText,
                  {
                    color: code.every(digit => digit !== '')
                      ? theme.colors.buttonText
                      : theme.colors.textSecondary,
                  },
                ]}
              >
                {t('submit')}
              </Text>
            </TouchableOpacity>

            {/* Helper Text */}
            <View
              style={[
                styles.helperContainer,
                isRTL && styles.helperContainerRTL,
              ]}
            >
              <Text
                style={[
                  styles.helperText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {t('code_delivery_time')}
              </Text>
              <TouchableOpacity onPress={handleResend}>
                <Text
                  style={[styles.resendLink, { color: theme.colors.primary }]}
                >
                  {t('resend_code')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* No fixed keypad - use device keyboard only */}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContentKeyboardOpen: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  topSection: {
    paddingHorizontal: 24,
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  bottomSection: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
    paddingHorizontal: 0,
    marginBottom: 40,
  },
  codeInputWrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  codeContainerRTL: {
    flexDirection: 'row-reverse',
  },
  codeInput: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 18,
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 2,
    marginHorizontal: 8,
  },
  errorContainer: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
  submitButton: {
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  helperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  helperContainerRTL: {
    flexDirection: 'row-reverse',
  },
  helperText: {
    fontSize: 14,
    marginRight: 8,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default TwoWayAuthenticationScreen;
