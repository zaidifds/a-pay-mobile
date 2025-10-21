import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, View } from 'react-native';
import BottomTabBarContent from '../components/BottomTabBarContent';

// Import screens
import WalletScreen from '../screens/WalletScreen';

const { width, height } = Dimensions.get('window');

export type BottomTabParamList = {
  wallet: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  return (
    <View style={{ width, height }}>
      <Tab.Navigator
        tabBar={props => <BottomTabBarContent {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="wallet" component={WalletScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;
