import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import type { AuthStackParamList } from './AuthNavigator';
import type { VerificationNavigatorParamList } from './VerificationNavigator';
import type { BusinessAcoountNavigatorParamList } from './BusinessAcoountNavigator';

// Root Stack Navigator Types
export type RootStackParamList = {
  FlowExplorer: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  BottomTabs: undefined;
  // Wallet Screens
  AddMoney: undefined;
  DepositByCard: undefined;
  DepositByBank: undefined;
  DepositCash: undefined;
  DepositCrypto: undefined;
  ReceiveSalary: undefined;
  FindNearestRetailer: undefined;
  AddCard: undefined;
  // Move Money Screens
  MoveMoney: undefined;
  MoveMoneyAuthentication: {
    fromAmount: string;
    toAmount: string;
    fromCurrency: string;
    toCurrency: string;
    transactionFee: string;
  };
  Verification:
    | NavigatorScreenParams<VerificationNavigatorParamList>
    | undefined;
  BusinessAccount:
    | NavigatorScreenParams<BusinessAcoountNavigatorParamList>
    | undefined;
  // Account Screens
  AccountDocumentScreen: undefined;
  BusinessDetailsScreen: undefined;
  BusinessAddressScreen: undefined;
  BusinessProfileScreen: undefined;
  BusinessStructureScreen: undefined;
  PersonalDetailsScreen: undefined;
  PersonalProfileScreen: undefined;
  StatementsScreen: undefined;
  MerchantProfileScreen?: undefined;
  PrivacyPolicyScreen?: undefined;
  TermsConditionsScreen?: undefined;
};

// Auth Stack Navigator Types
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  RecoverAccount: undefined;
  TwoWayAuthentication: undefined;
  VerifyIdentity: undefined;
};

// Tab Stack Navigator Types (for modals)
export type TabStackParamList = {
  WalletTab: undefined;
  SendTab: undefined;
  HistoryTab: undefined;
  ProfileTab: undefined;
  ReceiveModal: undefined;
  SwapModal: undefined;
};

// Navigation Props Types
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
export type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;

export type TabStackNavigationProp = StackNavigationProp<TabStackParamList>;

// Route Props Types
export type RootStackRouteProp<T extends keyof RootStackParamList> = {
  route: { params: RootStackParamList[T] };
  navigation: RootStackNavigationProp;
};

export type AuthStackRouteProp<T extends keyof AuthStackParamList> = {
  route: { params: AuthStackParamList[T] };
  navigation: AuthStackNavigationProp;
};

export type TabStackRouteProp<T extends keyof TabStackParamList> = {
  route: { params: TabStackParamList[T] };
  navigation: TabStackNavigationProp;
};

// Modal Props Types
export type ReceiveModalProps = {
  navigation: TabStackNavigationProp;
  route: { params: TabStackParamList['ReceiveModal'] };
};

export type SwapModalProps = {
  navigation: TabStackNavigationProp;
  route: { params: TabStackParamList['SwapModal'] };
};
