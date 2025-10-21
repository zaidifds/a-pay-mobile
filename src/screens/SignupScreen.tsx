import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { signupUser, clearError } from '../redux/slices/authSlice';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import SocialLoginButton from '../components/SocialLoginButton';

interface SignupScreenProps {
  navigation: any;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      const result = await dispatch(
        signupUser({
          name: formData.name.trim(),
          email: formData.email,
          password: formData.password,
        }),
      );

      if (signupUser.fulfilled.match(result)) {
        Alert.alert('Success', 'Account created successfully!');
        // Navigation will be handled by the navigator based on auth state
      }
    } catch (error) {
      Alert.alert('Error', 'Signup failed. Please try again.');
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    Alert.alert(
      'Social Login',
      `${
        provider.charAt(0).toUpperCase() + provider.slice(1)
      } signup is not implemented yet. This is a placeholder.`,
    );
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
    },
    header: {
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    form: {
      marginBottom: theme.spacing.xl,
    },
    socialSection: {
      marginBottom: theme.spacing.xl,
    },
    socialTitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
    socialButtons: {
      gap: theme.spacing.md,
    },
    loginSection: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing.lg,
    },
    loginText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    loginLink: {
      fontSize: 14,
      color: theme.colors.primary,
      fontWeight: '600',
      marginLeft: theme.spacing.xs,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started with A-Pay</Text>
        </View>

        <View style={styles.form}>
          <AuthInput
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, name: text }));
              if (errors.name) {
                setErrors(prev => ({ ...prev, name: '' }));
              }
            }}
            error={errors.name}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <AuthInput
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, email: text }));
              if (errors.email) {
                setErrors(prev => ({ ...prev, email: '' }));
              }
            }}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <AuthInput
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, password: text }));
              if (errors.password) {
                setErrors(prev => ({ ...prev, password: '' }));
              }
            }}
            error={errors.password}
            isPassword
          />

          <AuthInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, confirmPassword: text }));
              if (errors.confirmPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: '' }));
              }
            }}
            error={errors.confirmPassword}
            isPassword
          />

          <AuthButton
            title="Create Account"
            onPress={handleSignup}
            loading={isLoading}
            disabled={
              !formData.name ||
              !formData.email ||
              !formData.password ||
              !formData.confirmPassword
            }
          />
        </View>

        <View style={styles.socialSection}>
          <Text style={styles.socialTitle}>Or sign up with</Text>
          <View style={styles.socialButtons}>
            <SocialLoginButton
              provider="google"
              onPress={() => handleSocialLogin('google')}
            />
            <SocialLoginButton
              provider="apple"
              onPress={() => handleSocialLogin('apple')}
            />
          </View>
        </View>

        <View style={styles.loginSection}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
