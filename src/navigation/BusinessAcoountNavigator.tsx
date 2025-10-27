import {
  AccountDetailsScreen,
  AccountDocumentScreen,
  BusinessAddressScreen,
  BusinessDetailsScreen,
  BusinessProfileScreen,
  BusinessStructureScreen,
  PersonalDetailsScreen,
  PersonalProfileScreen,
  StatementsScreen,
  TypeOfBusinessScreen,
} from '@/screens/AccountScreens';
import { createStackNavigator } from '@react-navigation/stack';

export type BusinessAcoountNavigatorParamList = {
  AccountDetailsScreen: undefined;
  AccountDocumentScreen: undefined;
  BusinessDetailsScreen: undefined;
  BusinessAddressScreen: undefined;
  BusinessProfileScreen: undefined;
  BusinessStructureScreen: undefined;
  PersonalDetailsScreen: undefined;
  PersonalProfileScreen: undefined;
  StatementsScreen: undefined;
  MerchantProfileScreen: undefined;
  PrivacyPolicyScreen: undefined;
  TermsConditionsScreen: undefined;
  TypeOfBusinessScreen: undefined;
};

const BusinessAcoountNavigator = () => {
  const Stack = createStackNavigator<BusinessAcoountNavigatorParamList>();
  return (
    <Stack.Navigator
      initialRouteName="AccountDetailsScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AccountDetailsScreen"
        component={AccountDetailsScreen}
      />
      <Stack.Screen
        name="AccountDocumentScreen"
        component={AccountDocumentScreen}
      />
      <Stack.Screen
        name="BusinessDetailsScreen"
        component={BusinessDetailsScreen}
      />
      <Stack.Screen
        name="BusinessAddressScreen"
        component={BusinessAddressScreen}
      />
      <Stack.Screen
        name="BusinessProfileScreen"
        component={BusinessProfileScreen}
      />
      <Stack.Screen
        name="BusinessStructureScreen"
        component={BusinessStructureScreen}
      />
      <Stack.Screen
        name="PersonalDetailsScreen"
        component={PersonalDetailsScreen}
      />
      <Stack.Screen
        name="PersonalProfileScreen"
        component={PersonalProfileScreen}
      />
      <Stack.Screen
        name="TypeOfBusinessScreen"
        component={TypeOfBusinessScreen}
      />

      <Stack.Screen name="StatementsScreen" component={StatementsScreen} />
    </Stack.Navigator>
  );
};

export default BusinessAcoountNavigator;
