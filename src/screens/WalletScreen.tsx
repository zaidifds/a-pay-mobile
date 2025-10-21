import React, { useState, useEffect, useMemo } from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  addToBalance,
  swapBalances,
  toggleBalanceVisibility,
} from '../redux/slices/walletSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Transaction } from '../types';
import { fp, rp } from '../utils/responsive';
import Header from '../components/Header';
import SwapModal from '../components/SwapModal';
import ReceiveModal from '../components/ReceiveModal';

const WalletScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { balances, prices, isBalanceVisible, transactions } = useAppSelector(
    state => state.wallet,
  );
  const [receiveModalVisible, setReceiveModalVisible] = useState(false);
  const [swapModalVisible, setSwapModalVisible] = useState(false);

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

  const getTotalValue = () => {
    if (!isBalanceVisible) return '••••••';

    let total = 0;
    Object.keys(balances).forEach(currency => {
      total += balances[currency] * (prices[currency] || 0);
    });
    return `$${total.toFixed(2)}`;
  };

  const handleReceive = (amount: string, currency: string) => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      dispatch(addToBalance({ currency, amount: numAmount }));
      Alert.alert('Success', `Received ${numAmount.toFixed(4)} ${currency}`);
      setReceiveModalVisible(false);
    }
  };

  const handleSwap = (
    fromCurrency: string,
    toCurrency: string,
    amount: string,
  ) => {
    const fromAmount = parseFloat(amount);
    const toAmount = fromAmount * (prices[fromCurrency] / prices[toCurrency]);

    if (balances[fromCurrency] >= fromAmount) {
      dispatch(
        swapBalances({
          fromCurrency,
          toCurrency,
          fromAmount,
          toAmount,
        }),
      );
      Alert.alert(
        'Success',
        `Swapped ${fromAmount} ${fromCurrency} to ${toAmount.toFixed(
          4,
        )} ${toCurrency}`,
      );
      setSwapModalVisible(false);
    } else {
      Alert.alert('Error', 'Insufficient balance');
    }
  };

  const renderTransaction = ({ item }: { item: Transaction }) => {
    const getTransactionIcon = () => {
      switch (item.type) {
        case 'send':
          return <Icon name="arrow-upward" size={20} color="#FF5722" />;
        case 'receive':
          return <Icon name="arrow-downward" size={20} color="#4CAF50" />;
        case 'swap':
          return <Icon name="swap-horiz" size={20} color="#2196F3" />;
        default:
          return <Icon name="help" size={20} color="#666666" />;
      }
    };

    const getStatusColor = () => {
      switch (item.status) {
        case 'completed':
          return '#4CAF50';
        case 'pending':
          return '#FF9800';
        case 'failed':
          return '#F44336';
        default:
          return '#666666';
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

  return (
    <View style={styles.container}>
      <Header
        title="Wallet"
        rightButton={{
          icon: isBalanceVisible ? 'visibility' : 'visibility-off',
          onPress: () => dispatch(toggleBalanceVisibility()),
        }}
      />

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
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>{getTotalValue()}</Text>

          <View style={styles.balancesList}>
            {Object.keys(balances).map(currency => (
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
            style={[styles.actionButton, styles.receiveButton]}
            onPress={() => setReceiveModalVisible(true)}
          >
            <Icon name="add" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Receive</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.sendButton]}
            onPress={() => navigation.navigate('send' as never)}
          >
            <Icon name="send" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.swapButton]}
            onPress={() => setSwapModalVisible(true)}
          >
            <Icon name="swap-horiz" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Swap</Text>
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

      {/* Receive Modal */}
      <ReceiveModal
        visible={receiveModalVisible}
        onClose={() => setReceiveModalVisible(false)}
        onReceive={handleReceive}
      />

      {/* Swap Modal */}
      <SwapModal
        visible={swapModalVisible}
        onClose={() => setSwapModalVisible(false)}
        onSwap={handleSwap}
        balances={balances}
        prices={prices}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3F2FD',
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceLabel: {
    fontSize: fp(12),
    marginBottom: rp(6),
    color: '#666666',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  balanceAmount: {
    fontSize: fp(24),
    fontWeight: '700',
    color: '#2196F3',
    marginBottom: rp(12),
  },
  balancesList: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: rp(12),
    padding: rp(12),
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
    color: '#333333',
    letterSpacing: 0.3,
  },
  currencyAmount: {
    fontSize: fp(13),
    color: '#2196F3',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rp(20),
    gap: rp(10),
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rp(14),
    borderRadius: rp(15),
    gap: rp(6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: fp(12),
    fontWeight: '600',
  },
  receiveButton: {
    backgroundColor: '#4CAF50',
  },
  sendButton: {
    backgroundColor: '#FF5722',
  },
  swapButton: {
    backgroundColor: '#2196F3',
  },
  transactionsSection: {
    marginBottom: rp(15),
  },
  sectionTitle: {
    fontSize: fp(16),
    fontWeight: '700',
    color: '#333333',
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
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
    backgroundColor: '#F5F5F5',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: fp(13),
    fontWeight: '500',
    color: '#333333',
    letterSpacing: 0.2,
    marginBottom: rp(2),
  },
  transactionTime: {
    fontSize: fp(10),
    color: '#666666',
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
    color: '#FF5722',
  },
  transactionAmountReceive: {
    color: '#4CAF50',
  },
  transactionStatus: {
    fontSize: fp(9),
    color: '#666666',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});

export default WalletScreen;
