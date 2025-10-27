import AnalyticsScreen from '@/screens/Analytics/AnalyticsScreen';
import CardsScreen from '@/screens/Cards/CardsScreen';
import PaymentsScreen from '@/screens/Payments/PaymentsScreen';
import WalletScreen from '@/screens/Wallet/WalletScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBarContent from './BottomTabBarContent';

export type BottomTabNavigatorParamList = {
  Wallet: undefined;
  Analytics: undefined;
  Payments: undefined;
  Cards: undefined;
};

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Wallet"
      tabBar={props => <BottomTabBarContent {...props} />}
    >
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Payments" component={PaymentsScreen} />
      <Tab.Screen name="Cards" component={CardsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
