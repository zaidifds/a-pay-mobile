import { useTheme } from '@/hooks';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootState, useAppSelector } from '../redux/store';

// Import navigators
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import VerificationNavigator from './VerificationNavigator';
import BusinessAcoountNavigator from './BusinessAcoountNavigator';
import AddMoneyScreen from '@/screens/Wallet/AddMoneyScreen';
import DepositByCardScreen from '@/screens/Wallet/DepositByCardScreen';
import DepositByBankScreen from '@/screens/Wallet/DepositByBankScreen';
import DepositCashScreen from '@/screens/Wallet/DepositCashScreen';
import DepositCryptoScreen from '@/screens/Wallet/DepositCryptoScreen';
import ReceiveSalaryScreen from '@/screens/Wallet/ReceiveSalaryScreen';
import FindNearestRetailerScreen from '@/screens/Wallet/FindNearestRetailerScreen';
import AddCardScreen from '@/screens/Wallet/AddCardScreen';
import MoveMoneyScreen from '@/screens/Payments/MoveMoneyScreen';
import MoveMoneyAuthScreen from '@/screens/Payments/MoveMoneyAuthScreen';
import FlowExplorerScreen from '@/screens/FlowExplorer/FlowExplorerScreen';
import { RootStackParamList } from './navigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAppSelector(
    (state: RootState) => state.auth,
  );
  const { theme, isDark } = useTheme();

  // Log navigation state changes
  React.useEffect(() => {
    console.log(
      'AppNavigator - isAuthenticated:',
      isAuthenticated,
      'isLoading:',
      isLoading,
    );
  }, [isAuthenticated, isLoading]);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          dark: isDark,
          colors: {
            primary: theme.colors.primary,
            background: theme.colors.background,
            card: theme.colors.surface,
            text: theme.colors.text,
            border: theme.colors.border,
            notification: theme.colors.primary,
          },
          fonts: {
            regular: {
              fontFamily: 'System',
              fontWeight: '400',
            },
            medium: {
              fontFamily: 'System',
              fontWeight: '500',
            },
            bold: {
              fontFamily: 'System',
              fontWeight: '700',
            },
            heavy: {
              fontFamily: 'System',
              fontWeight: '800',
            },
          },
        }}
      >
        <Stack.Navigator
          initialRouteName="FlowExplorer"
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
          <Stack.Screen name="FlowExplorer" component={FlowExplorerScreen} />
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
          <Stack.Screen
            name="AddMoney"
            component={AddMoneyScreen}
            options={{
              presentation: 'modal',
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
          <Stack.Screen
            name="DepositByCard"
            component={DepositByCardScreen}
            options={{
              presentation: 'modal',
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
          <Stack.Screen
            name="DepositByBank"
            component={DepositByBankScreen}
            options={{
              presentation: 'modal',
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
          <Stack.Screen
            name="DepositCash"
            component={DepositCashScreen}
            options={{
              presentation: 'modal',
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
          <Stack.Screen
            name="DepositCrypto"
            component={DepositCryptoScreen}
            options={{
              presentation: 'modal',
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
          <Stack.Screen
            name="ReceiveSalary"
            component={ReceiveSalaryScreen}
            options={{
              presentation: 'modal',
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
          <Stack.Screen
            name="FindNearestRetailer"
            component={FindNearestRetailerScreen}
            options={{
              presentation: 'modal',
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
          <Stack.Screen
            name="AddCard"
            component={AddCardScreen}
            options={{
              presentation: 'modal',
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
          <Stack.Screen
            name="MoveMoney"
            component={MoveMoneyScreen}
            options={{
              presentation: 'modal',
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
          <Stack.Screen
            name="MoveMoneyAuthentication"
            component={MoveMoneyAuthScreen}
            options={{
              presentation: 'modal',
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
          <Stack.Screen name="Verification" component={VerificationNavigator} />
          <Stack.Screen
            name="BusinessAccount"
            component={BusinessAcoountNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
