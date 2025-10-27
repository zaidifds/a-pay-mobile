import { useTheme } from '@/hooks';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AccountTypeScreen from '../screens/AuthScreens/AccountTypeScreen';
import RecoverAccountScreen from '../screens/AuthScreens/Recovery/RecoverAccountScreen';
import TwoWayAuthenticationScreen from '../screens/AuthScreens/Recovery/TwoWayAuthenticationScreen';
import VerifyIdentityScreen from '../screens/AuthScreens/Recovery/VerifyIdentityScreen';
import AddDirectorScreen from '../screens/AuthScreens/Signup/Business/AddDirectorScreen';
import BusinessAccountActivationScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountActivationScreen';
import BusinessAccountAddressScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountAddressScreen';
import BusinessAccountContactScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountContactScreen';
import BusinessAccountDetailsScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountDetailsScreen';
import BusinessAccountIntroScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountIntroScreen';
import BusinessAccountPersonalInfoScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountPersonalInfoScreen';
import BusinessAccountPurposeScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountPurposeScreen';
import BusinessAccountRegisteredAddressScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountRegisteredAddressScreen';
import BusinessAccountRoleScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountRoleScreen';
import BusinessAccountVerificationScreen from '../screens/AuthScreens/Signup/Business/BusinessAccountVerificationScreen';
import BusinessPurposeScreen from '../screens/AuthScreens/Signup/Business/BusinessPurposeScreen';
import DirectorsScreen from '../screens/AuthScreens/Signup/Business/DirectorsScreen';
import FinancialInformationScreen from '../screens/AuthScreens/Signup/Business/FinancialInformationScreen';
import NatureOfBusinessScreen from '../screens/AuthScreens/Signup/Business/NatureOfBusinessScreen';
import ProofOfNatureOfBusinessScreen from '../screens/AuthScreens/Signup/Business/ProofOfNatureOfBusinessScreen';
import PersonalSignupScreen from '../screens/AuthScreens/Signup/Personal/PersonalSignupScreen';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen';
import SignInScreen from '@/screens/AuthScreens/SignIn/SignInScreen';

export type AuthStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
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
  BusinessAccountActivation: undefined;
  BusinessPurpose: undefined;
  NatureOfBusiness: undefined;
  FinancialInformation: undefined;
  ProofOfNatureOfBusiness: undefined;
  Directors: undefined;
  AddDirector: { directorId?: string };
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
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="AccountType" component={AccountTypeScreen} />
      <Stack.Screen name="PersonalSignup" component={PersonalSignupScreen} />
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
      <Stack.Screen
        name="BusinessAccountActivation"
        component={BusinessAccountActivationScreen}
      />
      <Stack.Screen name="BusinessPurpose" component={BusinessPurposeScreen} />
      <Stack.Screen
        name="NatureOfBusiness"
        component={NatureOfBusinessScreen}
      />
      <Stack.Screen
        name="FinancialInformation"
        component={FinancialInformationScreen}
      />
      <Stack.Screen
        name="ProofOfNatureOfBusiness"
        component={ProofOfNatureOfBusinessScreen}
      />
      <Stack.Screen name="Directors" component={DirectorsScreen} />
      <Stack.Screen name="AddDirector" component={AddDirectorScreen} />
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
