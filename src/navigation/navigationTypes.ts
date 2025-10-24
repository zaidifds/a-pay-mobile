import { StackNavigationProp } from '@react-navigation/stack';

// Root Stack Navigator Types
export type RootStackParamList = {
  Auth: undefined;
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
