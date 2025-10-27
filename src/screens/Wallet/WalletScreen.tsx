import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import {
  BalanceCard,
  QuickActionChips,
  PromotionalSlider,
  TransactionHistory,
} from '@/components';
import { TopSheet } from '@/components/modals';

export default function WalletScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [notificationVisible, setNotificationVisible] = useState(false);

  const currentTime = new Date().getHours();
  const greeting =
    currentTime < 12
      ? 'Good Morning'
      : currentTime < 18
      ? 'Good Afternoon'
      : 'Good Evening';

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

  const handleViewAllPress = () => {
    console.log('View all transactions pressed');
    // Add navigation to full transaction list
  };

  return (
    <View style={styles(theme).container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={[styles(theme).header, { paddingTop: insets.top + rp(12) }]}>
        <View style={styles(theme).headerLeft}>
          <Image
            source={{
              uri: 'https://i.pravatar.cc/100?img=12',
            }}
            style={styles(theme).avatar}
          />
          <View style={styles(theme).headerGreeting}>
            <Text style={styles(theme).greetingText}>{greeting}</Text>
            <Text style={styles(theme).userName}>Cara Dune</Text>
          </View>
        </View>
        <View style={styles(theme).headerActions}>
          <TouchableOpacity
            onPress={handleNotificationPress}
            style={styles(theme).iconButton}
          >
            <Icon
              name="notifications-none"
              size={rp(26)}
              color={theme.colors.text}
            />
            <View style={styles(theme).notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity style={styles(theme).iconButton}>
            <Icon name="more-vert" size={rp(26)} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

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
        <QuickActionChips />

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
      />
    </View>
  );
}

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: rp(20),
      paddingBottom: rp(16),
      backgroundColor: theme.colors.background,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatar: {
      width: rp(44),
      height: rp(44),
      borderRadius: rp(22),
      marginRight: rp(12),
    },
    headerGreeting: {
      flex: 1,
    },
    greetingText: {
      fontSize: fp(13),
      color: theme.colors.textSecondary,
      marginBottom: rp(3),
    },
    userName: {
      fontSize: fp(17),
      fontWeight: '700',
      color: theme.colors.text,
    },
    headerActions: {
      flexDirection: 'row',
      gap: rp(12),
    },
    iconButton: {
      padding: rp(6),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    notificationBadge: {
      position: 'absolute',
      top: rp(4),
      right: rp(4),
      width: rp(10),
      height: rp(10),
      borderRadius: rp(5),
      backgroundColor: theme.colors.primary,
    },
    scrollView: {
      flex: 1,
    },
  });
