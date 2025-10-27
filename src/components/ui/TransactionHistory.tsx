import SvgIcon from '@/assets/svg/SvgIcon';
import { useTheme } from '@/hooks';
import { fp, rp } from '@/utils/responsive';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'paid';
  title: string;
  subtitle: string;
  amount: string;
  isPositive: boolean;
}

interface TransactionHistoryProps {
  onViewAllPress?: () => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  onViewAllPress,
}) => {
  const { theme } = useTheme();

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'send',
      title: 'Send Money',
      subtitle: 'Ahmad Fauzi',
      amount: '- £ 500.00',
      isPositive: false,
    },
    {
      id: '2',
      type: 'receive',
      title: 'Received Money',
      subtitle: 'PayPal',
      amount: '+ £ 671.00',
      isPositive: true,
    },
    {
      id: '3',
      type: 'paid',
      title: 'Paid Bill',
      subtitle: 'Netflix',
      amount: '- £ 24.99',
      isPositive: false,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'send':
        return (
          <View style={styles(theme).iconContainer}>
            <SvgIcon.Send />
          </View>
        );
      case 'receive':
        return (
          <View style={styles(theme).iconContainer}>
            <SvgIcon.Recieve />
          </View>
        );
      case 'paid':
        return (
          <View style={styles(theme).iconContainer}>
            <SvgIcon.Dollar />
          </View>
        );
      default:
        return null;
    }
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles(theme).transactionItem}>
      {getIcon(item.type)}
      <View style={styles(theme).transactionDetails}>
        <Text style={styles(theme).transactionTitle}>{item.title}</Text>
        <Text style={styles(theme).transactionSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles(theme).transactionAmount}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).header}>
        <Text style={styles(theme).headerTitle}>History</Text>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={styles(theme).viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginTop: rp(20),
      marginHorizontal: rp(20),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: rp(16),
    },
    headerTitle: {
      fontSize: fp(22),
      fontWeight: '700',
      color: theme.colors.text,
    },
    viewAllText: {
      fontSize: fp(13),
      fontWeight: '600',
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
    transactionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      padding: rp(14),
      borderRadius: rp(16),
      marginBottom: rp(10),
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    iconContainer: {
      width: rp(42),
      height: rp(42),
      borderRadius: rp(12),
      backgroundColor: '#E3F2FD',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: rp(12),
    },
    transactionDetails: {
      flex: 1,
    },
    transactionTitle: {
      fontSize: fp(13),
      color: '#9E9E9E',
      marginBottom: rp(4),
      fontWeight: '400',
    },
    transactionSubtitle: {
      fontSize: fp(15),
      color: theme.colors.text,
      fontWeight: '700',
    },
    transactionAmount: {
      fontSize: fp(15),
      fontWeight: '700',
      color: theme.colors.text,
    },
    positiveAmount: {
      color: theme.colors.text,
    },
  });

export default TransactionHistory;
