import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, View } from 'react-native';
import BottomTabBarContent from '../components/BottomTabBarContent';

// Import screens
import WalletScreen from '../screens/WalletScreen';
import SendScreen from '../screens/SendScreen';
import HistoryScreen from '../screens/HistoryScreen';

const { width, height } = Dimensions.get('window');

export type BottomTabParamList = {
  wallet: undefined;
  send: undefined;
  history: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  const renderTabBar = (props: any) => <BottomTabBarContent {...props} />;

  return (
    <View style={{ width, height }}>
      <Tab.Navigator
        tabBar={renderTabBar}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="wallet" component={WalletScreen} />
        <Tab.Screen name="send" component={SendScreen} />
        <Tab.Screen name="history" component={HistoryScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;
