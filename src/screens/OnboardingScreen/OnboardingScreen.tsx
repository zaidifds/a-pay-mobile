import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';

const { height } = Dimensions.get('window');

type OnboardingScreenNavigationProp = StackNavigationProp<AuthStackParamList>;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  const handleSignUp = () => {
    navigation.navigate('AccountType');
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleRecoverAccount = () => {
    navigation.navigate('RecoverAccount');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Background Image - Top 70% */}
      <ImageBackground
        source={require('../../assets/images/welcomebg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Welcome Text */}
        <Text style={[styles.welcomeText, { color: theme.colors.textOnDark }]}>
          {t('onboarding_welcome')}
        </Text>

        {/* 3D Card Graphic */}
      </ImageBackground>

      {/* White Content Card - Bottom 30% */}
      <View
        style={[styles.whiteCard, { backgroundColor: theme.colors.surface }]}
      >
        {/* Drag indicator */}
        <View
          style={[
            styles.dragIndicator,
            { backgroundColor: theme.colors.border },
          ]}
        />

        {/* Buttons */}
        <TouchableOpacity
          style={[
            styles.signUpButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={handleSignUp}
        >
          <Text
            style={[
              styles.signUpButtonText,
              { color: theme.colors.buttonText },
            ]}
          >
            {t('onboarding_sign_up')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.signInButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={handleSignIn}
        >
          <Text style={[styles.signInButtonText, { color: theme.colors.text }]}>
            {t('onboarding_sign_in')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.recoverButton, isRTL && styles.recoverButtonRTL]}
          onPress={handleRecoverAccount}
        >
          <View
            style={[styles.recoverIcon, { borderColor: theme.colors.primary }]}
          />
          <Text
            style={[styles.recoverButtonText, { color: theme.colors.primary }]}
          >
            {t('onboarding_recover_account')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    height: height * 0.75, // Top 70% of screen
    width: '100%',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  headerRTL: {
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.7,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  card3D: {
    width: 300,
    height: 200,
    transform: [{ rotateX: '20deg' }, { rotateY: '15deg' }],
  },
  cardOutline: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 16,
    position: 'relative',
  },
  networkLine1: {
    position: 'absolute',
    top: 30,
    left: 20,
    width: 80,
    height: 2,
    borderRadius: 1,
  },
  networkLine2: {
    position: 'absolute',
    top: 60,
    left: 40,
    width: 100,
    height: 2,
    borderRadius: 1,
  },
  networkLine3: {
    position: 'absolute',
    top: 90,
    left: 20,
    width: 120,
    height: 2,
    borderRadius: 1,
  },
  networkLine4: {
    position: 'absolute',
    top: 120,
    left: 50,
    width: 90,
    height: 2,
    borderRadius: 1,
  },
  networkDot1: {
    position: 'absolute',
    top: 25,
    left: 15,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  networkDot2: {
    position: 'absolute',
    top: 25,
    left: 100,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  networkDot3: {
    position: 'absolute',
    top: 55,
    left: 35,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  networkDot4: {
    position: 'absolute',
    top: 55,
    left: 140,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  networkDot5: {
    position: 'absolute',
    top: 85,
    left: 15,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  networkDot6: {
    position: 'absolute',
    top: 85,
    left: 135,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  whiteCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 50,
    height: height * 0.3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  signUpButton: {
    borderRadius: 14,
    paddingVertical: 18,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpButtonText: {
    fontSize: 17,
    fontWeight: '700',
  },
  signInButton: {
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 18,
    marginBottom: 24,
    alignItems: 'center',
  },
  signInButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  recoverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recoverButtonRTL: {
    flexDirection: 'row-reverse',
  },
  recoverIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  recoverButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
