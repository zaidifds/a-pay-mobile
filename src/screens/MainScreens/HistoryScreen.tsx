import React, { useState, useMemo } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootState, useAppSelector } from '../../redux/store';
import { Transaction } from '../../types';
import { fp, rp } from '../../utils/responsive';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { useTranslation } from '../../localization';
import FilterModal from '../../components/FilterModal';

type FilterType = 'all' | 'send' | 'receive' | 'swap';

const HistoryScreen: React.FC = () => {
  const walletState = useAppSelector((state: RootState) => state.wallet);
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();
  const styles = createStyles(theme, isRTL);
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

  const getFilterLabel = () => {
    switch (selectedFilter) {
      case 'all':
        return t('all_transactions');
      case 'send':
        return t('sent');
      case 'receive':
        return t('received');
      case 'swap':
        return t('swapped');
      default:
        return t('all_transactions');
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
        <Header titleKey="transaction_history" showLanguageSwitch={true} />
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
        showLanguageSwitch={true}
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
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        selectedFilter={selectedFilter}
        onFilterSelect={filter => setSelectedFilter(filter as FilterType)}
        options={[
          {
            key: 'all',
            label: t('all_transactions'),
            icon: 'list',
          },
          {
            key: 'send',
            label: t('sent'),
            icon: 'arrow-upward',
          },
          {
            key: 'receive',
            label: t('received'),
            icon: 'arrow-downward',
          },
          {
            key: 'swap',
            label: t('swapped'),
            icon: 'swap-horiz',
          },
        ]}
        title={t('all_transactions')}
      />
    </View>
  );
};

const createStyles = (theme: any, isRTL: boolean) =>
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
    listContainer: {
      paddingHorizontal: rp(0),
      paddingBottom: rp(0),
    },
    transactionItem: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
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
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      flex: 1,
    },
    transactionIcon: {
      width: rp(28),
      height: rp(28),
      borderRadius: rp(14),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: isRTL ? 0 : rp(8),
      marginLeft: isRTL ? rp(8) : 0,
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
      textAlign: isRTL ? 'right' : 'left',
    },
    transactionTime: {
      fontSize: fp(10),
      color: theme.colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
    },
    transactionRight: {
      alignItems: isRTL ? 'flex-start' : 'flex-end',
    },
    transactionAmount: {
      fontSize: fp(13),
      fontWeight: '600',
      marginBottom: rp(2),
      textAlign: isRTL ? 'left' : 'right',
    },
    transactionAmountSend: {
      color: theme.colors.error,
    },
    transactionAmountReceive: {
      color: theme.colors.success,
    },
    statusContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    statusDot: {
      width: rp(6),
      height: rp(6),
      borderRadius: rp(3),
      marginRight: isRTL ? 0 : rp(4),
      marginLeft: isRTL ? rp(4) : 0,
    },
    transactionStatus: {
      fontSize: fp(9),
      fontWeight: '500',
      textTransform: 'capitalize',
      textAlign: isRTL ? 'left' : 'right',
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
      textAlign: 'center',
    },
    emptyStateMessage: {
      fontSize: fp(12),
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: fp(16),
    },
  });

export default HistoryScreen;
