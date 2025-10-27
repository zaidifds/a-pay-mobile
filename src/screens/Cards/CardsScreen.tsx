import React from 'react';
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
import { BalanceCard, CardCarousel, CardData } from '@/components';
import useTranslation from '@/localization/useTranslation';

export default function CardsScreen() {
  const { theme } = useTheme();
  const { isRTL } = useTranslation();
  const insets = useSafeAreaInsets();

  const currentTime = new Date().getHours();
  const greeting =
    currentTime < 12
      ? 'Good Morning'
      : currentTime < 18
      ? 'Good Afternoon'
      : 'Good Evening';

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handleSwitchToBusiness = () => {
    console.log('Switch to business pressed');
  };

  const handleCreateCard = () => {
    console.log('Create card pressed');
  };

  const handleCardChange = (index: number) => {
    console.log('Card changed to index:', index);
  };

  const cards: CardData[] = [
    {
      id: '1',
      balance: '£ 12,580.00',
      cardNumber: '4265 8516 0480 2050',
      holderName: 'Cara Dune',
      expiryDate: '03/25',
    },
    {
      id: '2',
      balance: '£ 95,687.36',
      cardNumber: '4265 8516 0480 2050',
      holderName: 'Cara Dune',
      expiryDate: '03/25',
    },
    {
      id: '3',
      balance: '£ 15,200.00',
      cardNumber: '5023 0480 2050 1234',
      holderName: 'Cara Dune',
      expiryDate: '03/32',
    },
    {
      id: '4',
      balance: '£ 8,900.00',
      cardNumber: '4265 8516 0480 2050',
      holderName: 'Cara Dune',
      expiryDate: '03/25',
    },
    {
      id: '5',
      balance: '£ 22,450.00',
      cardNumber: '5023 0480 2050 5678',
      holderName: 'Cara Dune',
      expiryDate: '03/32',
    },
  ];

  return (
    <View
      style={[styles(theme).container, isRTL && styles(theme).containerRTL]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View
        style={[
          styles(theme).header,
          { paddingTop: insets.top + rp(12) },
          isRTL && styles(theme).headerRTL,
        ]}
      >
        <View
          style={[
            styles(theme).headerLeft,
            isRTL && styles(theme).headerLeftRTL,
          ]}
        >
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
        <View
          style={[
            styles(theme).headerActions,
            isRTL && styles(theme).headerActionsRTL,
          ]}
        >
          <TouchableOpacity
            onPress={handleNotificationPress}
            style={styles(theme).iconButton}
          >
            <Icon
              name="notifications-none"
              size={rp(26)}
              color={theme.colors.text}
            />
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

        {/* Section Title and Description */}
        <View style={styles(theme).sectionContainer}>
          <Text style={styles(theme).sectionTitle}>Cards</Text>
          <Text style={styles(theme).sectionDescription}>
            You can manage your debit and credit cards linked to your account,
            view transaction history, and activate or deactivate your cards for
            security purposes.
          </Text>
        </View>

        {/* Card Carousel */}
        <CardCarousel cards={cards} onCardChange={handleCardChange} />

        {/* Create Card Button */}
        <TouchableOpacity
          style={styles(theme).createCardButton}
          onPress={handleCreateCard}
          activeOpacity={0.7}
        >
          <Icon name="credit-card" size={rp(20)} color={theme.colors.primary} />
          <Text style={styles(theme).createCardButtonText}>Create Card</Text>
        </TouchableOpacity>

        {/* Bottom spacing */}
        <View style={{ height: rp(100) }} />
      </ScrollView>
    </View>
  );
}

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    containerRTL: {
      // RTL specific styles if needed
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: rp(20),
      paddingBottom: rp(16),
      backgroundColor: theme.colors.background,
    },
    headerRTL: {
      flexDirection: 'row-reverse',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    headerLeftRTL: {
      flexDirection: 'row-reverse',
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
    headerActionsRTL: {
      flexDirection: 'row-reverse',
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
    sectionContainer: {
      paddingHorizontal: rp(20),
      marginTop: rp(24),
      marginBottom: rp(20),
    },
    sectionTitle: {
      fontSize: fp(22),
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: rp(8),
    },
    sectionDescription: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      lineHeight: fp(20),
    },
    createCardButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: rp(24),
      paddingVertical: rp(14),
      paddingHorizontal: rp(28),
      marginTop: rp(24),
      gap: rp(8),
    },
    createCardButtonText: {
      fontSize: fp(16),
      fontWeight: '600',
      color: theme.colors.primary,
    },
  });
