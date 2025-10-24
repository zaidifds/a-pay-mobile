import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/AuthNavigator';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import { StandardButton } from '@/components/ui';

const { width, height } = Dimensions.get('window');

type SignInScreenNavigationProp = StackNavigationProp<AuthStackParamList>;

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [passcode, setPasscode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  const handlePasscodeChange = (text: string, index: number) => {
    const newPasscode = [...passcode];
    newPasscode[index] = text;
    setPasscode(newPasscode);

    // Auto-focus next input
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !passcode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSignIn = async () => {
    const fullPasscode = passcode.join('');
    if (fullPasscode.length === 4) {
      setIsLoading(true);

      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1500));

      // Navigate to main app or show error
      console.log('Signing in with passcode:', fullPasscode);

      setIsLoading(false);
    }
  };

  const handleForgotPasscode = () => {
    // Navigate to forgot passcode screen
    console.log('Forgot passcode');
  };

  const handleSignUp = () => {
    navigation.navigate('AccountType');
  };

  const isPasscodeComplete = passcode.every(digit => digit !== '');

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
      <SafeAreaView style={styles.container}>
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
            {passcode.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={[
                  styles.passcodeInput,
                  {
                    borderColor: digit
                      ? theme.colors.primary
                      : theme.colors.inputBorder,
                    backgroundColor: theme.colors.input,
                  },
                ]}
                value={digit}
                onChangeText={text => handlePasscodeChange(text, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, index)
                }
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
                secureTextEntry
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Sign In Button */}
          <StandardButton
            title="Sign In"
            onPress={handleSignIn}
            variant="primary"
            size="large"
            fullWidth
            disabled={!isPasscodeComplete}
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
      </SafeAreaView>
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 12,
  },
  passcodeInput: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
