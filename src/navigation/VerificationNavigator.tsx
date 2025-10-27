import {
  BiometricScreen,
  FacialIdentityVerificationScreen,
  IdentityCardUploadScreen,
  PasscodeScreen,
  ProofOfResidencyScreen,
} from '@/screens/VerificationScreens';
import { createStackNavigator } from '@react-navigation/stack';

export type VerificationNavigatorParamList = {
  BiometricScreen: undefined;
  PasscodeScreen: undefined;
  ProofOfResidencyScreen: undefined;
  IdentityCardUploadScreen: undefined;
  FacialIdentityVerificationScreen: undefined;
};

const VerificationNavigator = () => {
  const Stack = createStackNavigator<VerificationNavigatorParamList>();
  return (
    <Stack.Navigator
      initialRouteName="BiometricScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BiometricScreen" component={BiometricScreen} />
      <Stack.Screen name="PasscodeScreen" component={PasscodeScreen} />
      <Stack.Screen
        name="ProofOfResidencyScreen"
        component={ProofOfResidencyScreen}
      />
      <Stack.Screen
        name="IdentityCardUploadScreen"
        component={IdentityCardUploadScreen}
      />
      <Stack.Screen
        name="FacialIdentityVerificationScreen"
        component={FacialIdentityVerificationScreen}
      />
    </Stack.Navigator>
  );
};

export default VerificationNavigator;
