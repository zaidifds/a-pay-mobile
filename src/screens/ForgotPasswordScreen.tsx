import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../hooks/useTheme';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { buildForgotPasswordSchema } from '../utils/validationSchemas';
import { useTranslation } from '../localization';

interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const handleForgotPassword = async (_values: { email: string }) => {
    // Simulate API call
    Alert.alert(t('reset_link_sent'), t('reset_link_message'), [
      {
        text: t('ok'),
        onPress: () => navigation.navigate('Login'),
      },
    ]);
  };

  const handleBackToLogin = () => {
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToLogin}
          >
            <Icon name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>

          <View
            style={[
              styles.logoContainer,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Icon name="lock-reset" size={40} color={theme.colors.buttonText} />
          </View>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {t('forgot_password')}
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          >
            {t('forgot_password_subtitle')}
          </Text>
        </View>

        <View style={styles.form}>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={buildForgotPasswordSchema(t)}
            onSubmit={handleForgotPassword}
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

                <AuthButton
                  title={t('send_reset_link')}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </View>

        <View style={styles.footer}>
          <Text
            style={[styles.footerText, { color: theme.colors.textSecondary }]}
          >
            {t('remember_password')}{' '}
          </Text>
          <TouchableOpacity onPress={handleBackToLogin}>
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
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 8,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 20,
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

export default ForgotPasswordScreen;
