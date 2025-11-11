import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import BalanceCard from '@/components/cards/BalanceCard';
import QuickActionChips from '@/components/ui/QuickActionChips';
import PromotionalSlider from '@/components/ui/PromotionalSlider';
import TransactionHistory from '@/components/ui/TransactionHistory';
import { BottomSheet, TopSheet } from '@/components/modals';
import { ProfileHeader } from '@/components/ui';
import { logoutUser } from '@/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';

type WalletScreenNavigationProp = StackNavigationProp<
  { AddMoney: undefined },
  'AddMoney'
>;

export default function WalletScreen() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<WalletScreenNavigationProp>();

  // Redux state
  const { isLoading: authLoading } = useAppSelector(state => state.auth);

  // Local state
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleNotificationPress = () => {
    setNotificationVisible(true);
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  const handleSwitchToBusiness = () => {
    console.log('Switch to business pressed');
    // Add navigation or business logic here
  };

  const handleViewAllPress = useCallback(() => {
    console.log('View all transactions pressed');
    // Add navigation to full transaction list
  }, []);

  const handleAddMoneyPress = useCallback(() => {
    navigation.navigate('AddMoney');
  }, [navigation]);

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

  return (
    <View style={styles(theme).container}>
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
        style={styles(theme).scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Card */}
        <BalanceCard
          balance="£ 9,835.51"
          currency="GBP"
          onSwitchPress={handleSwitchToBusiness}
        />

        {/* Quick Action Chips */}
        <QuickActionChips onAddPress={handleAddMoneyPress} />

        {/* Promotional Slider */}
        <PromotionalSlider />

        {/* Transaction History */}
        <TransactionHistory onViewAllPress={handleViewAllPress} />

        {/* Bottom spacing */}
        <View style={{ height: rp(100) }} />
      </ScrollView>

      {/* Notification Top Sheet */}
      <TopSheet
        visible={notificationVisible}
        onClose={handleCloseNotification}
        title="Notifications"
      >
        <Text style={[styles(theme).menuTitle, { color: theme.colors.text }]}>
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
        <View style={styles(theme).menuContainer}>
          {/* Transactions */}
          <TouchableOpacity
            style={styles(theme).menuItem}
            onPress={handleTransactionsPress}
          >
            <View style={styles(theme).menuIconContainer}>
              <Icon
                name="sync-alt"
                size={rp(24)}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles(theme).menuTextContainer}>
              <Text style={styles(theme).menuTitle}>Transactions</Text>
              <Text style={styles(theme).menuSubtitle}>View transactions</Text>
            </View>
          </TouchableOpacity>

          {/* Exchange */}
          <TouchableOpacity
            style={styles(theme).menuItem}
            onPress={handleExchangePress}
          >
            <View style={styles(theme).menuIconContainer}>
              <Icon
                name="currency-exchange"
                size={rp(24)}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles(theme).menuTextContainer}>
              <Text style={styles(theme).menuTitle}>Exchange</Text>
              <Text style={styles(theme).menuSubtitle}>Exchange currency</Text>
            </View>
          </TouchableOpacity>

          {/* Account Details */}
          <TouchableOpacity
            style={styles(theme).menuItem}
            onPress={handleAccountDetailsPress}
          >
            <View style={styles(theme).menuIconContainer}>
              <Icon name="person" size={rp(24)} color={theme.colors.primary} />
            </View>
            <View style={styles(theme).menuTextContainer}>
              <Text style={styles(theme).menuTitle}>Account Details</Text>
              <Text style={styles(theme).menuSubtitle}>
                View your account details
              </Text>
            </View>
          </TouchableOpacity>

          {/* Separator */}
          <View style={styles(theme).separator} />

          {/* Logout */}
          <TouchableOpacity
            style={[
              styles(theme).menuItem,
              authLoading && styles(theme).menuItemDisabled,
            ]}
            onPress={handleLogoutPress}
            disabled={authLoading}
          >
            <View style={styles(theme).menuIconContainer}>
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
            <View style={styles(theme).menuTextContainer}>
              <Text
                style={[
                  styles(theme).menuTitle,
                  {
                    color: authLoading
                      ? theme.colors.textSecondary
                      : theme.colors.error || '#FF5252',
                  },
                ]}
              >
                {authLoading ? 'Logging out...' : 'Logout'}
              </Text>
              <Text style={styles(theme).menuSubtitle}>
                Sign out of your account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    menuContainer: {
      paddingTop: rp(10),
    },
    menuItem: {
      flexDirection: 'row',
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
      marginRight: rp(12),
    },
    menuTextContainer: {
      flex: 1,
    },
    menuTitle: {
      fontSize: fp(16),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(2),
    },
    menuSubtitle: {
      fontSize: fp(13),
      color: theme.colors.textSecondary,
    },
    separator: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: rp(8),
      marginHorizontal: rp(16),
    },
  });
