import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { toggleBalanceVisibility } from '../redux/slices/walletSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Transaction } from '../types';
import { fp, rp } from '../utils/responsive';
import Header from '../components/Header';
import GradientButton from '../components/GradientButton';
import BuyModal from '../components/BuyModal';
import { useModalNavigation } from '../hooks/useModalNavigation';
import { WalletScreenNavigationProp } from '../navigation/navigationTypes';
import { useTheme } from '../hooks/useTheme';

const WalletScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<WalletScreenNavigationProp>();
  const { balances, prices, isBalanceVisible, transactions } = useAppSelector(
    state => state.wallet,
  );
  const { openReceiveModal, openSwapModal } = useModalNavigation();
  const { theme } = useTheme();

  // Buy modal state
  const [isBuyModalVisible, setIsBuyModalVisible] = useState(false);

  // Animation values
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const slideAnim = useMemo(() => new Animated.Value(50), []);
  const scaleAnim = useMemo(() => new Animated.Value(0.9), []);

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  const formatBalance = (amount: number, currency: string) => {
    if (isBalanceVisible) {
      return `${amount.toFixed(4)} ${currency}`;
    }
    return '••••••';
  };

  const handleBuy = (
    currency: string,
    amount: string,
    paymentMethod: string,
  ) => {
    // Here you would typically integrate with a payment service
    // For now, we'll just show a success message
    console.log(`Buying ${amount} ${currency} using ${paymentMethod}`);
    // You can add actual buy logic here
  };

  const getTotalValue = () => {
    if (!isBalanceVisible) return '••••••';

    let total = 0;
    Object.keys(balances).forEach(currency => {
      total += balances[currency] * (prices[currency] || 0);
    });
    return `$${total.toFixed(2)}`;
  };

  const renderTransaction = ({ item }: { item: Transaction }) => {
    const getTransactionIcon = () => {
      switch (item.type) {
        case 'send':
          return (
            <Icon name="arrow-upward" size={20} color={theme.colors.error} />
          );
        case 'receive':
          return (
            <Icon
              name="arrow-downward"
              size={20}
              color={theme.colors.success}
            />
          );
        case 'swap':
          return (
            <Icon name="swap-horiz" size={20} color={theme.colors.primary} />
          );
        default:
          return (
            <Icon name="help" size={20} color={theme.colors.textSecondary} />
          );
      }
    };

    const getStatusColor = () => {
      switch (item.status) {
        case 'completed':
          return theme.colors.success;
        case 'pending':
          return theme.colors.warning;
        case 'failed':
          return theme.colors.error;
        default:
          return theme.colors.textSecondary;
      }
    };

    return (
      <View style={styles.transactionItem}>
        <View style={styles.transactionLeft}>
          <View style={styles.transactionIcon}>{getTransactionIcon()}</View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionDescription}>
              {item.description}
            </Text>
            <Text style={styles.transactionTime}>
              {new Date(item.timestamp).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              item.type === 'send'
                ? styles.transactionAmountSend
                : styles.transactionAmountReceive,
            ]}
          >
            {item.type === 'send' ? '-' : '+'}
            {item.amount} {item.currency}
          </Text>
          <Text style={[styles.transactionStatus, { color: getStatusColor() }]}>
            {item.status}
          </Text>
        </View>
      </View>
    );
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Header title="Wallet" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Section */}
        <Animated.View
          style={[
            styles.balanceCard,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.balanceHeader}>
            <View style={styles.balanceTitleContainer}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Text style={styles.balanceAmount}>{getTotalValue()}</Text>
            </View>
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => dispatch(toggleBalanceVisibility())}
            >
              <Icon
                name={isBalanceVisible ? 'visibility' : 'visibility-off'}
                size={24}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.balancesList}>
            {Object.keys(balances)
              .slice(0, 4)
              .map(currency => (
                <View key={currency} style={styles.balanceRow}>
                  <Text style={styles.currencyLabel}>{currency}</Text>
                  <Text style={styles.currencyAmount}>
                    {formatBalance(balances[currency], currency)}
                  </Text>
                </View>
              ))}
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          style={[
            styles.actionButtons,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.actionButton}
            onPress={openReceiveModal}
          >
            <GradientButton
              colors={[theme.colors.success, theme.colors.successDark]}
              style={styles.gradientButton}
            >
              <Icon name="add" size={18} color={theme.colors.buttonText} />
              <Text style={styles.actionButtonText}>Receive</Text>
            </GradientButton>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setIsBuyModalVisible(true)}
          >
            <GradientButton
              colors={[theme.colors.primary, theme.colors.primaryDark]}
              style={styles.gradientButton}
            >
              <Icon
                name="add-shopping-cart"
                size={18}
                color={theme.colors.buttonText}
              />
              <Text style={styles.actionButtonText}>Buy</Text>
            </GradientButton>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={openSwapModal}>
            <GradientButton
              colors={[theme.colors.warning, theme.colors.warningDark]}
              style={styles.gradientButton}
            >
              <Icon
                name="swap-horiz"
                size={18}
                color={theme.colors.buttonText}
              />
              <Text style={styles.actionButtonText}>Swap</Text>
            </GradientButton>
          </TouchableOpacity>
        </Animated.View>

        {/* Recent Transactions */}
        <Animated.View
          style={[
            styles.transactionsSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <FlatList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
      </ScrollView>

      {/* Buy Modal */}
      <BuyModal
        visible={isBuyModalVisible}
        onClose={() => setIsBuyModalVisible(false)}
        onBuy={handleBuy}
        balances={balances}
        prices={prices}
      />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: rp(16),
      paddingBottom: rp(20),
      paddingTop: rp(10),
    },
    balanceCard: {
      padding: rp(16),
      borderRadius: rp(16),
      marginBottom: rp(16),
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    balanceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: rp(12),
    },
    balanceTitleContainer: {
      flex: 1,
    },
    eyeButton: {
      padding: rp(8),
      borderRadius: rp(20),
      backgroundColor: theme.colors.backgroundSecondary,
    },
    balanceLabel: {
      fontSize: fp(12),
      marginBottom: rp(6),
      color: theme.colors.textSecondary,
      fontWeight: '500',
      letterSpacing: 0.3,
    },
    balanceAmount: {
      fontSize: fp(24),
      fontWeight: '700',
      color: theme.colors.primary,
      marginBottom: rp(12),
    },
    balancesList: {
      width: '100%',
      backgroundColor: theme.colors.backgroundSecondary,
      borderRadius: rp(12),
      padding: rp(12),
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    balanceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: rp(8),
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    currencyLabel: {
      fontSize: fp(13),
      fontWeight: '600',
      color: theme.colors.text,
      letterSpacing: 0.3,
    },
    currencyAmount: {
      fontSize: fp(13),
      color: theme.colors.primary,
      fontWeight: '600',
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: rp(16),
      gap: rp(6),
    },
    actionButton: {
      flex: 1,
      borderRadius: rp(12),
      overflow: 'hidden',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    gradientButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: rp(6),
      gap: rp(3),
    },
    actionButtonText: {
      color: theme.colors.buttonText,
      fontSize: fp(9),
      fontWeight: '600',
    },
    transactionsSection: {
      marginBottom: rp(15),
    },
    sectionTitle: {
      fontSize: fp(16),
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: rp(12),
      letterSpacing: 0.3,
    },
    transactionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: rp(12),
      borderRadius: rp(10),
      marginBottom: rp(8),
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    transactionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    transactionIcon: {
      width: rp(36),
      height: rp(36),
      borderRadius: rp(18),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: rp(10),
      backgroundColor: theme.colors.backgroundSecondary,
    },
    transactionDetails: {
      flex: 1,
    },
    transactionDescription: {
      fontSize: fp(13),
      fontWeight: '500',
      color: theme.colors.text,
      letterSpacing: 0.2,
      marginBottom: rp(2),
    },
    transactionTime: {
      fontSize: fp(10),
      color: theme.colors.textSecondary,
    },
    transactionRight: {
      alignItems: 'flex-end',
    },
    transactionAmount: {
      fontSize: fp(13),
      fontWeight: '600',
      marginBottom: rp(2),
    },
    transactionAmountSend: {
      color: theme.colors.error,
    },
    transactionAmountReceive: {
      color: theme.colors.success,
    },
    transactionStatus: {
      fontSize: fp(9),
      color: theme.colors.textSecondary,
      fontWeight: '500',
      textTransform: 'capitalize',
    },
  });

export default WalletScreen;
