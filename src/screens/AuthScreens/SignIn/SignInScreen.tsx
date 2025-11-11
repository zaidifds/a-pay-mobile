import StandardButton from '@/components/ui/StandardButton';
import CodeInput from '@/components/ui/CodeInput';
import { useTheme } from '@/hooks';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { loginWithPin, clearError } from '@/redux/slices/authSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthStackParamList } from '../../../navigation/AuthNavigator';

const { width, height } = Dimensions.get('window');

type SignInScreenNavigationProp = StackNavigationProp<AuthStackParamList>;

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    state => state.auth,
  );

  const [passcode, setPasscode] = useState(['', '', '', '']);
  const passcodeComplete = passcode.every(digit => digit !== '');

  // Clear error when component mounts or passcode changes
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, error, passcode]);

  // Log authentication state changes
  useEffect(() => {
    console.log(
      'Auth state changed - isAuthenticated:',
      isAuthenticated,
      'isLoading:',
      isLoading,
    );
    if (isAuthenticated) {
      console.log(
        'User is now authenticated, navigation should happen automatically',
      );
    }
  }, [isAuthenticated, isLoading]);

  const handlePasscodeChange = (text: string, index: number) => {
    const newPasscode = [...passcode];
    newPasscode[index] = text;
    setPasscode(newPasscode);
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !passcode[index] && index > 0) {
      const newPasscode = [...passcode];
      newPasscode[index - 1] = '';
      setPasscode(newPasscode);
    }
  };

  const handleSignIn = async () => {
    const fullPasscode = passcode.join('');
    console.log('Attempting sign in with passcode:', fullPasscode);
    if (fullPasscode.length === 4) {
      try {
        await dispatch(loginWithPin(fullPasscode)).unwrap();
        console.log('Sign in successful!');
        // Navigation will be handled by AppNavigator based on auth state
      } catch (error) {
        console.error('Sign in failed:', error);
      }
    } else {
      console.log('Passcode incomplete, length:', fullPasscode.length);
    }
  };

  const handleForgotPasscode = () => {
    // Navigate to forgot passcode screen
    console.log('Forgot passcode');
  };

  const handleSignUp = () => {
    // Signup will be handled later
    console.log('Signup functionality coming soon');
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/signinbg.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Logo and Brand */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <View style={styles.logoInner}>
              <View style={styles.logoGap} />
            </View>
          </View>
          <Text style={styles.brandName}>A Pay</Text>
        </View>

        {/* Sign In Section */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInTitle}>Sign In</Text>
          <Text style={styles.signInSubtitle}>Access to your account</Text>

          {/* Passcode Input Fields */}
          <View style={styles.passcodeContainer}>
            <CodeInput
              length={4}
              value={passcode}
              onChangeText={handlePasscodeChange}
              onKeyPress={handleKeyPress}
              autoFocus={true}
              keyboardType="numeric"
            />
          </View>

          {/* Error Display */}
          {error && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {error}
            </Text>
          )}

          {/* Sign In Button */}
          <StandardButton
            title="Sign In"
            onPress={handleSignIn}
            variant="primary"
            size="large"
            fullWidth
            disabled={!passcodeComplete || isLoading}
            loading={isLoading}
            style={styles.signInButton}
          />

          {/* Forgot Passcode Link */}
          <TouchableOpacity
            style={styles.forgotPasscodeButton}
            onPress={handleForgotPasscode}
          >
            <Text
              style={[
                styles.forgotPasscodeText,
                { color: theme.colors.primary },
              ]}
            >
              Forgot Passcode?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            Don't have an account?{' '}
            <Text
              style={[styles.signUpLink, { color: theme.colors.primary }]}
              onPress={handleSignUp}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 60,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  logoGap: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 44,
    height: 4,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  signInContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  signInTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  signInSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 40,
    textAlign: 'center',
  },
  passcodeContainer: {
    marginBottom: 32,
  },
  signInButton: {
    marginBottom: 16,
  },
  forgotPasscodeButton: {
    paddingVertical: 12,
  },
  forgotPasscodeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  signUpContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: '#374151',
  },
  signUpLink: {
    fontWeight: '600',
  },
});

export default SignInScreen;
