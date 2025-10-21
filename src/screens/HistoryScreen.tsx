import React, { useState, useMemo } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '../redux/store';
import { Transaction } from '../types';
import { fp, rp } from '../utils/responsive';
import Header from '../components/Header';
import { useTheme } from '../hooks/useTheme';

type FilterType = 'all' | 'send' | 'receive' | 'swap';

const HistoryScreen: React.FC = () => {
  const walletState = useAppSelector(state => state.wallet);
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { transactions = [] } = walletState || {};
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Debug logging
  React.useEffect(() => {
    console.log('Wallet state:', walletState);
    console.log('Transactions:', transactions);
  }, [walletState, transactions]);

  // Animation values
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const slideAnim = useMemo(() => new Animated.Value(30), []);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const filteredTransactions = useMemo(() => {
    // Ensure transactions is an array
    const safeTransactions = Array.isArray(transactions) ? transactions : [];

    if (selectedFilter === 'all') {
      return safeTransactions;
    }
    return safeTransactions.filter(
      transaction => transaction.type === selectedFilter,
    );
  }, [transactions, selectedFilter]);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return (
          <Icon name="arrow-upward" size={16} color={theme.colors.error} />
        );
      case 'receive':
        return (
          <Icon name="arrow-downward" size={16} color={theme.colors.success} />
        );
      case 'swap':
        return (
          <Icon name="swap-horiz" size={16} color={theme.colors.primary} />
        );
      default:
        return (
          <Icon name="help" size={16} color={theme.colors.textSecondary} />
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <Animated.View
      style={[
        styles.transactionItem,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.transactionLeft}>
        <View style={styles.transactionIcon}>
          {getTransactionIcon(item.type)}
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionDescription}>{item.description}</Text>
          <Text style={styles.transactionTime}>
            {formatDate(item.timestamp)}
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
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          />
          <Text
            style={[
              styles.transactionStatus,
              { color: getStatusColor(item.status) },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderFilterButton = (filter: FilterType, label: string) => {
    const isSelected = selectedFilter === filter;
    return (
      <TouchableOpacity
        style={[styles.filterButton, isSelected && styles.filterButtonSelected]}
        onPress={() => {
          setSelectedFilter(filter);
          setShowFilters(false);
        }}
      >
        <Text
          style={[
            styles.filterButtonText,
            isSelected && styles.filterButtonTextSelected,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const getFilterLabel = () => {
    switch (selectedFilter) {
      case 'all':
        return 'All';
      case 'send':
        return 'Send';
      case 'receive':
        return 'Receive';
      case 'swap':
        return 'Swap';
      default:
        return 'All';
    }
  };

  const renderEmptyState = () => (
    <Animated.View
      style={[
        styles.emptyState,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Icon name="history" size={48} color={theme.colors.iconSecondary} />
      <Text style={styles.emptyStateTitle}>No Transactions</Text>
      <Text style={styles.emptyStateMessage}>
        {selectedFilter === 'all'
          ? "You haven't made any transactions yet"
          : `No ${selectedFilter} transactions found`}
      </Text>
    </Animated.View>
  );

  // Early return if wallet state is not available
  if (!walletState) {
    return (
      <View style={styles.container}>
        <Header title="Transaction History" />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.emptyState}>
            <Icon name="error" size={48} color={theme.colors.iconSecondary} />
            <Text style={styles.emptyStateTitle}>Loading...</Text>
            <Text style={styles.emptyStateMessage}>
              Please wait while we load your transaction history
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={`Transaction History - ${getFilterLabel()}`}
        showFilterButton={true}
        onFilterPress={() => setShowFilters(!showFilters)}
        filterActive={showFilters}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Transaction List */}
        <FlatList
          data={filteredTransactions}
          renderItem={renderTransaction}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Filter Modal */}
      {showFilters && (
        <View style={styles.filterModal}>
          <TouchableOpacity
            style={styles.filterModalOverlay}
            onPress={() => setShowFilters(false)}
            activeOpacity={1}
          />
          <View style={styles.filterModalContent}>
            <Text style={styles.filterModalTitle}>Filter Transactions</Text>
            <View style={styles.filterButtonsContainer}>
              {renderFilterButton('all', 'All')}
              {renderFilterButton('send', 'Send')}
              {renderFilterButton('receive', 'Receive')}
              {renderFilterButton('swap', 'Swap')}
            </View>
          </View>
        </View>
      )}
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
      paddingHorizontal: rp(12),
      paddingBottom: rp(16),
      paddingTop: rp(8),
    },
    filterModal: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      zIndex: 1000,
    },
    filterModalOverlay: {
      flex: 1,
      backgroundColor: theme.colors.modalOverlay,
    },
    filterModalContent: {
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: rp(16),
      borderTopRightRadius: rp(16),
      padding: rp(20),
      paddingBottom: rp(30),
    },
    filterModalTitle: {
      fontSize: fp(16),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(16),
      textAlign: 'center',
    },
    filterButtonsContainer: {
      flexDirection: 'row',
      gap: rp(8),
    },
    filterButton: {
      flex: 1,
      paddingVertical: rp(6),
      paddingHorizontal: rp(12),
      borderRadius: rp(16),
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
    },
    filterButtonSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 2,
      elevation: 2,
    },
    filterButtonText: {
      fontSize: fp(11),
      fontWeight: '500',
      color: theme.colors.textSecondary,
    },
    filterButtonTextSelected: {
      color: theme.colors.buttonText,
    },
    listContainer: {
      paddingHorizontal: rp(0),
      paddingBottom: rp(0),
    },
    transactionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: rp(12),
      borderRadius: rp(8),
      marginBottom: rp(6),
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 2,
      elevation: 1,
    },
    transactionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    transactionIcon: {
      width: rp(28),
      height: rp(28),
      borderRadius: rp(14),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: rp(8),
      backgroundColor: theme.colors.background,
    },
    transactionDetails: {
      flex: 1,
    },
    transactionDescription: {
      fontSize: fp(13),
      fontWeight: '500',
      color: theme.colors.text,
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
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusDot: {
      width: rp(6),
      height: rp(6),
      borderRadius: rp(3),
      marginRight: rp(4),
    },
    transactionStatus: {
      fontSize: fp(9),
      fontWeight: '500',
      textTransform: 'capitalize',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: rp(60),
    },
    emptyStateTitle: {
      fontSize: fp(16),
      fontWeight: '600',
      color: theme.colors.text,
      marginTop: rp(12),
      marginBottom: rp(4),
    },
    emptyStateMessage: {
      fontSize: fp(12),
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: fp(16),
    },
  });

export default HistoryScreen;
