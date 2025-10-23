import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../hooks/useTheme';
import LoginScreen from '../screens/AuthScreens/SignIn/LoginScreen';
import SignupScreen from '../screens/AuthScreens/SignupScreen';
import AccountTypeScreen from '../screens/AuthScreens/AccountTypeScreen';
import PersonalSignupScreen from '../screens/AuthScreens/Signup/Personal/PersonalSignupScreen';
import BusinessSignupScreen from '../screens/AuthScreens/BusinessSignupScreen';
import BusinessAccountIntroScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountIntroScreen';
import BusinessAccountContactScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountContactScreen';
import BusinessAccountVerificationScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountVerificationScreen';
import BusinessAccountPersonalInfoScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountPersonalInfoScreen';
import BusinessAccountAddressScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountAddressScreen';
import BusinessAccountDetailsScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountDetailsScreen';
import BusinessAccountRegisteredAddressScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountRegisteredAddressScreen';
import BusinessAccountPurposeScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountPurposeScreen';
import BusinessAccountRoleScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountRoleScreen';
import RecoverAccountScreen from '../screens/AuthScreens/Recovery/RecoverAccountScreen';
import TwoWayAuthenticationScreen from '../screens/AuthScreens/Recovery/TwoWayAuthenticationScreen';
import VerifyIdentityScreen from '../screens/AuthScreens/Recovery/VerifyIdentityScreen';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen';

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  AccountType: undefined;
  PersonalSignup: undefined;
  BusinessSignup: undefined;
  BusinessAccountIntro: undefined;
  BusinessAccountContact: undefined;
  BusinessAccountVerification: { phoneNumber?: string };
  BusinessAccountPersonalInfo: undefined;
  BusinessAccountAddress: undefined;
  BusinessAccountDetails: undefined;
  BusinessAccountRegisteredAddress: undefined;
  BusinessAccountPurpose: undefined;
  BusinessAccountRole: undefined;
  RecoverAccount: undefined;
  TwoWayAuthentication: { phoneNumber?: string; email?: string };
  VerifyIdentity: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
        }),
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="AccountType" component={AccountTypeScreen} />
      <Stack.Screen name="PersonalSignup" component={PersonalSignupScreen} />
      <Stack.Screen name="BusinessSignup" component={BusinessSignupScreen} />
      <Stack.Screen
        name="BusinessAccountIntro"
        component={BusinessAccountIntroScreen}
      />
      <Stack.Screen
        name="BusinessAccountContact"
        component={BusinessAccountContactScreen}
      />
      <Stack.Screen
        name="BusinessAccountVerification"
        component={BusinessAccountVerificationScreen}
      />
      <Stack.Screen
        name="BusinessAccountPersonalInfo"
        component={BusinessAccountPersonalInfoScreen}
      />
      <Stack.Screen
        name="BusinessAccountAddress"
        component={BusinessAccountAddressScreen}
      />
      <Stack.Screen
        name="BusinessAccountDetails"
        component={BusinessAccountDetailsScreen}
      />
      <Stack.Screen
        name="BusinessAccountRegisteredAddress"
        component={BusinessAccountRegisteredAddressScreen}
      />
      <Stack.Screen
        name="BusinessAccountPurpose"
        component={BusinessAccountPurposeScreen}
      />
      <Stack.Screen
        name="BusinessAccountRole"
        component={BusinessAccountRoleScreen}
      />
      <Stack.Screen name="RecoverAccount" component={RecoverAccountScreen} />
      <Stack.Screen
        name="TwoWayAuthentication"
        component={TwoWayAuthenticationScreen}
      />
      <Stack.Screen name="VerifyIdentity" component={VerifyIdentityScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
