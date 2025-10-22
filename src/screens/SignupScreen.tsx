import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../hooks/useTheme';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { signupUser } from '../redux/slices/authSlice';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { buildSignupSchema } from '../utils/validationSchemas';
import { useTranslation } from '../localization';

interface SignupScreenProps {
  navigation: any;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const handleSignup = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      await dispatch(
        signupUser({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      ).unwrap();
    } catch {
      // Error is handled by the slice
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View
            style={[
              styles.logoContainer,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Icon
              name="account-balance-wallet"
              size={40}
              color={theme.colors.buttonText}
            />
          </View>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {t('create_account')}
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          >
            {t('signup_subtitle')}
          </Text>
        </View>

        <View style={styles.form}>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={buildSignupSchema(t)}
            onSubmit={handleSignup}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <AuthInput
                  label={t('full_name')}
                  placeholder={t('enter_full_name')}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  error={errors.name}
                  touched={touched.name}
                  leftIcon="person"
                  autoCapitalize="words"
                  autoCorrect={false}
                />

                <AuthInput
                  label={t('email_address')}
                  placeholder={t('enter_email')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                  leftIcon="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <AuthInput
                  label={t('password')}
                  placeholder={t('create_password')}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                  isPassword
                  leftIcon="lock"
                />

                <AuthInput
                  label={t('confirm_password')}
                  placeholder={t('confirm_password_placeholder')}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  isPassword
                  leftIcon="lock"
                />

                {error && (
                  <View style={styles.errorContainer}>
                    <Icon name="error" size={20} color={theme.colors.error} />
                    <Text
                      style={[styles.errorText, { color: theme.colors.error }]}
                    >
                      {error}
                    </Text>
                  </View>
                )}

                <AuthButton
                  title={t('create_account')}
                  onPress={handleSubmit}
                  loading={isLoading}
                  disabled={isLoading}
                />
              </>
            )}
          </Formik>
        </View>

        <View style={styles.footer}>
          <Text
            style={[styles.footerText, { color: theme.colors.textSecondary }]}
          >
            {t('already_have_account')}{' '}
          </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={[styles.loginText, { color: theme.colors.primary }]}>
              {t('sign_in')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    marginBottom: 32,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  errorText: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  loginText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignupScreen;
