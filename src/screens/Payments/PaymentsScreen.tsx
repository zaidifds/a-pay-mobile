import React, { useCallback, useState, useEffect } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import { BalanceCard } from '@/components/cards';
import { BottomSheet, TopSheet } from '@/components/modals';
import { logoutUser } from '@/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ProfileHeader } from '@/components/ui';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/navigationTypes';
import { ShowToast } from '@/utils/toastUtils';

type PaymentsScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type PaymentsScreenRouteProp = RouteProp<any, any>;

interface PaymentOption {
  id: string;
  title: string;
  icon: string;
  backgroundColor: string;
  iconColor: string;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'move_money',
    title: 'move_money_between_accounts',
    icon: 'swap-horiz',
    backgroundColor: '#E3F2FD',
    iconColor: '#1976D2',
  },
  {
    id: 'send_money',
    title: 'send_money_to_other_users',
    icon: 'person',
    backgroundColor: '#F3E5F5',
    iconColor: '#7B1FA2',
  },
  {
    id: 'international',
    title: 'international_payments',
    icon: 'credit-card',
    backgroundColor: '#FCE4EC',
    iconColor: '#C2185B',
  },
  {
    id: 'crypto',
    title: 'buy_and_sell_crypto',
    icon: 'currency-bitcoin',
    backgroundColor: '#FFF8E1',
    iconColor: '#F57C00',
  },
  {
    id: 'split_bill',
    title: 'split_bill',
    icon: 'receipt',
    backgroundColor: '#E8F5E8',
    iconColor: '#388E3C',
  },
];

export default function PaymentsScreen() {
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<PaymentsScreenNavigationProp>();
  const route = useRoute<PaymentsScreenRouteProp>();

  // Redux state
  const { isLoading: authLoading } = useAppSelector(state => state.auth);

  // Local state
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  // Check if we should show success toast (coming back from move money flow)
  useEffect(() => {
    if (
      route.params &&
      'showSuccessToast' in route.params &&
      route.params.showSuccessToast
    ) {
      ShowToast('success', 'Transfer Complete!');
    }
  }, [route.params]);

  const handleNotificationPress = useCallback(() => {
    setNotificationVisible(true);
  }, []);

  const handleCloseNotification = useCallback(() => {
    setNotificationVisible(false);
  }, []);

  const handleSwitchToBusiness = useCallback(() => {
    console.log('Switch to business pressed');
    // Handle business switch logic
  }, []);

  const handleMenuPress = useCallback(() => {
    setMenuVisible(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);

  const handleTransactionsPress = useCallback(() => {
    console.log('Transactions pressed');
    setMenuVisible(false);
    // Add navigation to transactions
  }, []);

  const handleExchangePress = useCallback(() => {
    console.log('Exchange pressed');
    setMenuVisible(false);
    // Add navigation to exchange
  }, []);

  const handleAccountDetailsPress = useCallback(() => {
    console.log('Account Details pressed');
    setMenuVisible(false);
    // Add navigation to account details
  }, []);

  const handleLogoutPress = useCallback(() => {
    setMenuVisible(false);

    // Show confirmation dialog
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logoutUser());
          },
        },
      ],
      { cancelable: true },
    );
  }, [dispatch]);

  const handlePaymentOptionPress = useCallback(
    (option: PaymentOption) => {
      console.log('Payment option pressed:', option.id);
      // Handle navigation to respective payment screens
      switch (option.id) {
        case 'move_money':
          navigation.navigate('MoveMoney');
          break;
        case 'send_money':
          // Navigate to send money screen
          console.log('Send Money pressed');
          break;
        case 'international':
          // Navigate to international payments screen
          console.log('International Payments pressed');
          break;
        case 'crypto':
          // Navigate to crypto screen
          console.log('Buy and Sell Crypto pressed');
          break;
        case 'split_bill':
          // Navigate to split bill screen
          console.log('Split Bill pressed');
          break;
        default:
          break;
      }
    },
    [navigation],
  );

  const renderPaymentOption = (option: PaymentOption) => (
    <TouchableOpacity
      key={option.id}
      style={[
        styles(theme, isRTL).paymentCard,
        { backgroundColor: option.backgroundColor },
      ]}
      onPress={() => handlePaymentOptionPress(option)}
      activeOpacity={0.7}
    >
      <View style={styles(theme, isRTL).paymentIconContainer}>
        <Icon name={option.icon} size={rp(32)} color={option.iconColor} />
      </View>
      <Text style={styles(theme, isRTL).paymentTitle}>
        {t(option.title as any)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles(theme, isRTL).container}>
      {/* Profile Header */}
      <ProfileHeader
        userName="Cara Dune"
        profileImage="https://i.pravatar.cc/100?img=12"
        showNotificationBadge={true}
        showMenuButton={true}
        onNotificationPress={handleNotificationPress}
        onMenuPress={handleMenuPress}
      />

      {/* Main Content */}
      <ScrollView
        style={styles(theme, isRTL).scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles(theme, isRTL).scrollContent}
      >
        {/* Balance Card */}
        <BalanceCard
          balance="£ 9,835.51"
          currency="GBP"
          onSwitchPress={handleSwitchToBusiness}
        />

        {/* Payment Options Section */}
        <View style={styles(theme, isRTL).paymentOptionsSection}>
          <Text style={styles(theme, isRTL).sectionTitle}>
            {t('payment_options')}
          </Text>
          <Text style={styles(theme, isRTL).sectionDescription}>
            {t('payment_options_description')}
          </Text>

          {/* Payment Options Grid */}
          <View style={styles(theme, isRTL).paymentGrid}>
            {paymentOptions.map(renderPaymentOption)}
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: rp(100) }} />
      </ScrollView>

      {/* Notification Top Sheet */}
      <TopSheet
        visible={notificationVisible}
        onClose={handleCloseNotification}
        title="Notifications"
      >
        <Text
          style={[
            styles(theme, isRTL).notificationText,
            { color: theme.colors.text },
          ]}
        >
          No new notifications
        </Text>
      </TopSheet>

      {/* Menu Bottom Sheet */}
      <BottomSheet
        visible={menuVisible}
        onClose={handleCloseMenu}
        height="50%"
        showHandle={true}
        enableBackdropClose={true}
        enablePanGesture={true}
      >
        <View style={styles(theme, isRTL).menuContainer}>
          {/* Transactions */}
          <TouchableOpacity
            style={styles(theme, isRTL).menuItem}
            onPress={handleTransactionsPress}
          >
            <View style={styles(theme, isRTL).menuIconContainer}>
              <Icon
                name="sync-alt"
                size={rp(24)}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles(theme, isRTL).menuTextContainer}>
              <Text style={styles(theme, isRTL).menuTitle}>Transactions</Text>
              <Text style={styles(theme, isRTL).menuSubtitle}>
                View transactions
              </Text>
            </View>
          </TouchableOpacity>

          {/* Exchange */}
          <TouchableOpacity
            style={styles(theme, isRTL).menuItem}
            onPress={handleExchangePress}
          >
            <View style={styles(theme, isRTL).menuIconContainer}>
              <Icon
                name="currency-exchange"
                size={rp(24)}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles(theme, isRTL).menuTextContainer}>
              <Text style={styles(theme, isRTL).menuTitle}>Exchange</Text>
              <Text style={styles(theme, isRTL).menuSubtitle}>
                Exchange currency
              </Text>
            </View>
          </TouchableOpacity>

          {/* Account Details */}
          <TouchableOpacity
            style={styles(theme, isRTL).menuItem}
            onPress={handleAccountDetailsPress}
          >
            <View style={styles(theme, isRTL).menuIconContainer}>
              <Icon name="person" size={rp(24)} color={theme.colors.primary} />
            </View>
            <View style={styles(theme, isRTL).menuTextContainer}>
              <Text style={styles(theme, isRTL).menuTitle}>
                Account Details
              </Text>
              <Text style={styles(theme, isRTL).menuSubtitle}>
                View your account details
              </Text>
            </View>
          </TouchableOpacity>

          {/* Separator */}
          <View style={styles(theme, isRTL).separator} />

          {/* Logout */}
          <TouchableOpacity
            style={[
              styles(theme, isRTL).menuItem,
              authLoading && styles(theme, isRTL).menuItemDisabled,
            ]}
            onPress={handleLogoutPress}
            disabled={authLoading}
          >
            <View style={styles(theme, isRTL).menuIconContainer}>
              {authLoading ? (
                <Icon
                  name="hourglass-empty"
                  size={rp(24)}
                  color={theme.colors.textSecondary}
                />
              ) : (
                <Icon
                  name="logout"
                  size={rp(24)}
                  color={theme.colors.error || '#FF5252'}
                />
              )}
            </View>
            <View style={styles(theme, isRTL).menuTextContainer}>
              <Text
                style={[
                  styles(theme, isRTL).menuTitle,
                  {
                    color: authLoading
                      ? theme.colors.textSecondary
                      : theme.colors.error || '#FF5252',
                  },
                ]}
              >
                {authLoading ? 'Logging out...' : 'Logout'}
              </Text>
              <Text style={styles(theme, isRTL).menuSubtitle}>
                Sign out of your account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = (theme: any, isRTL: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      // paddingHorizontal: rp(20),
      // paddingBottom: rp(40),
    },
    paymentOptionsSection: {
      marginTop: rp(24),
      paddingHorizontal: rp(20),
    },
    sectionTitle: {
      fontSize: fp(20),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(8),
      textAlign: isRTL ? 'right' : 'left',
    },
    sectionDescription: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      lineHeight: fp(20),
      marginBottom: rp(24),
      textAlign: isRTL ? 'right' : 'left',
    },
    paymentGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: rp(16),
    },
    paymentCard: {
      width: '47%',
      aspectRatio: 1.2,
      borderRadius: rp(16),
      padding: rp(20),
      justifyContent: 'space-between',
      alignItems: isRTL ? 'flex-end' : 'flex-start',
      marginBottom: rp(16),
    },
    paymentIconContainer: {
      alignSelf: isRTL ? 'flex-end' : 'flex-start',
    },
    paymentTitle: {
      fontSize: fp(14),
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: isRTL ? 'right' : 'left',
      lineHeight: fp(18),
    },
    notificationText: {
      fontSize: fp(16),
      textAlign: 'center',
      marginTop: rp(20),
    },
    menuContainer: {
      paddingTop: rp(10),
    },
    menuItem: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      paddingVertical: rp(16),
      paddingHorizontal: rp(16),
      backgroundColor: theme.colors.surface,
      borderRadius: rp(12),
      marginBottom: rp(12),
      shadowColor: theme.colors.shadowColor || '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    menuItemDisabled: {
      opacity: 0.6,
      backgroundColor: theme.colors.background,
    },
    menuIconContainer: {
      width: rp(40),
      height: rp(40),
      borderRadius: rp(20),
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: isRTL ? 0 : rp(12),
      marginLeft: isRTL ? rp(12) : 0,
    },
    menuTextContainer: {
      flex: 1,
      alignItems: isRTL ? 'flex-end' : 'flex-start',
    },
    menuTitle: {
      fontSize: fp(16),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(2),
      textAlign: isRTL ? 'right' : 'left',
    },
    menuSubtitle: {
      fontSize: fp(13),
      color: theme.colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
    },
    separator: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: rp(8),
      marginHorizontal: rp(16),
    },
  });
