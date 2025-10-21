import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Root Stack Navigator Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

// Auth Stack Navigator Types
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

// Bottom Tab Navigator Types
export type BottomTabParamList = {
  wallet: undefined;
  send: undefined;
  history: undefined;
  profile: undefined;
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
export type BottomTabNavigationPropType =
  BottomTabNavigationProp<BottomTabParamList>;
export type TabStackNavigationProp = StackNavigationProp<TabStackParamList>;

// Composite Navigation Props for screens that need access to multiple navigators
export type WalletScreenNavigationProp = CompositeNavigationProp<
  TabStackNavigationProp,
  BottomTabNavigationPropType
>;

export type SendScreenNavigationProp = CompositeNavigationProp<
  TabStackNavigationProp,
  BottomTabNavigationPropType
>;

export type HistoryScreenNavigationProp = CompositeNavigationProp<
  TabStackNavigationProp,
  BottomTabNavigationPropType
>;

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  TabStackNavigationProp,
  BottomTabNavigationPropType
>;

// Route Props Types
export type RootStackRouteProp<T extends keyof RootStackParamList> = {
  route: { params: RootStackParamList[T] };
  navigation: RootStackNavigationProp;
};

export type AuthStackRouteProp<T extends keyof AuthStackParamList> = {
  route: { params: AuthStackParamList[T] };
  navigation: AuthStackNavigationProp;
};

export type BottomTabRouteProp<T extends keyof BottomTabParamList> = {
  route: { params: BottomTabParamList[T] };
  navigation: BottomTabNavigationPropType;
};

export type TabStackRouteProp<T extends keyof TabStackParamList> = {
  route: { params: TabStackParamList[T] };
  navigation: TabStackNavigationProp;
};

// Screen Props Types
export type WalletScreenProps = {
  navigation: WalletScreenNavigationProp;
  route: { params: BottomTabParamList['wallet'] };
};

export type SendScreenProps = {
  navigation: SendScreenNavigationProp;
  route: { params: BottomTabParamList['send'] };
};

export type HistoryScreenProps = {
  navigation: HistoryScreenNavigationProp;
  route: { params: BottomTabParamList['history'] };
};

export type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
  route: { params: BottomTabParamList['profile'] };
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
