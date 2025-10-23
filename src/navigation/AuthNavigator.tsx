import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../hooks/useTheme';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import SignupScreen from '../screens/AuthScreens/SignupScreen';
import RecoverAccountScreen from '../screens/AuthScreens/RecoverAccountScreen';
import TwoWayAuthenticationScreen from '../screens/AuthScreens/TwoWayAuthenticationScreen';
import VerifyIdentityScreen from '../screens/AuthScreens/VerifyIdentityScreen';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen';

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
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
