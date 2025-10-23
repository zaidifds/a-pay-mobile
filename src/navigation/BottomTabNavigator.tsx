import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import BottomTabBarContent from '../components/BottomTabBarContent';

// Import screens
import WalletScreen from '../screens/MainScreens/WalletScreen';
import SendScreen from '../screens/MainScreens/SendScreen';
import HistoryScreen from '../screens/MainScreens/HistoryScreen';
import ProfileScreen from '../screens/MainScreens/ProfileScreen';

// Import modal screens
import ReceiveModalScreen from '../screens/ModalScreens/ReceiveModalScreen';
import SwapModalScreen from '../screens/ModalScreens/SwapModalScreen';

const { width, height } = Dimensions.get('window');

export type BottomTabParamList = {
  wallet: undefined;
  send: undefined;
  history: undefined;
  profile: undefined;
};

export type TabStackParamList = {
  WalletTab: undefined;
  SendTab: undefined;
  HistoryTab: undefined;
  ProfileTab: undefined;
  ReceiveModal: undefined;
  SwapModal: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator<TabStackParamList>();

// Stack navigator for each tab to support modals
const WalletStack: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="WalletTab" component={WalletScreen} />
      <Stack.Screen
        name="ReceiveModal"
        component={ReceiveModalScreen}
        options={{
          presentation: 'modal',
          cardStyleInterpolator: ({ current: { progress }, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height, 0],
                  }),
                },
              ],
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp',
              }),
            },
          }),
        }}
      />
      <Stack.Screen
        name="SwapModal"
        component={SwapModalScreen}
        options={{
          presentation: 'modal',
          cardStyleInterpolator: ({ current: { progress }, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height, 0],
                  }),
                },
              ],
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp',
              }),
            },
          }),
        }}
      />
    </Stack.Navigator>
  );
};

const SendStack: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="SendTab" component={SendScreen} />
    </Stack.Navigator>
  );
};

const HistoryStack: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="HistoryTab" component={HistoryScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="ProfileTab" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator: React.FC = () => {
  const { theme } = useTheme();
  const renderTabBar = (props: any) => <BottomTabBarContent {...props} />;

  return (
    <View style={{ width, height, backgroundColor: theme.colors.background }}>
      <Tab.Navigator
        tabBar={renderTabBar}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
          },
        }}
      >
        <Tab.Screen name="wallet" component={WalletStack} />
        <Tab.Screen name="send" component={SendStack} />
        <Tab.Screen name="history" component={HistoryStack} />
        <Tab.Screen name="profile" component={ProfileStack} />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;
