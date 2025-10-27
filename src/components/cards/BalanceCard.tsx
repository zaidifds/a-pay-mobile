import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'react-native-linear-gradient';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';

interface BalanceCardProps {
  balance?: string;
  currency: string;
  onSwitchPress: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance: _balance = '9,835.51',
  currency,
  onSwitchPress,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).gradientContainer}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles(theme).gradient}
      >
        <View style={styles(theme).content}>
          {/* Left Container - 2/3 width */}
          <View style={styles(theme).leftContainer}>
            <Text style={styles(theme).balanceLabel}>Your Balance</Text>

            <View style={styles(theme).balanceAmountContainer}>
              <Text style={styles(theme).balanceAmount}>
                {_balance.split('.')[0]}
              </Text>
              <Text style={styles(theme).balanceDecimal}>
                {'.'}
                {_balance.split('.')[1]}
              </Text>
              <TouchableOpacity style={styles(theme).chevronContainer}>
                <Icon name="expand-more" size={rp(25)} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles(theme).currency}>{currency}</Text>
          </View>

          {/* Right Container - 1/3 width, centered button */}
          <View style={styles(theme).rightContainer}>
            <TouchableOpacity
              style={styles(theme).switchButton}
              onPress={onSwitchPress}
            >
              <Text style={styles(theme).switchButtonText}>
                Switch To Business
              </Text>
              <Icon name="sync-alt" size={rp(10)} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    gradientContainer: {
      marginHorizontal: rp(20),
      marginTop: rp(16),
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 14,
      elevation: 10,
    },
    gradient: {
      borderRadius: rp(24),
      overflow: 'hidden',
    },
    content: {
      padding: rp(18),
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftContainer: {
      flex: 1,
    },
    rightContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    balanceAmountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: rp(4),
    },
    balanceLabel: {
      fontSize: fp(12),
      color: '#FFFFFF',
      opacity: 0.9,
      fontWeight: '400',
      marginBottom: rp(6),
    },
    chevronContainer: {
      marginLeft: rp(6),
      marginTop: rp(4),
    },
    balanceAmount: {
      fontSize: fp(20),
      fontWeight: '700',
      color: '#FFFFFF',
    },
    balanceDecimal: {
      fontSize: fp(13),
      fontWeight: '700',
      color: '#FFFFFF',
      opacity: 0.95,
      top: rp(2),
    },
    currency: {
      fontSize: fp(12),
      color: '#FFFFFF',
      opacity: 0.85,
      fontWeight: '400',
    },
    switchButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      paddingVertical: rp(5),
      paddingHorizontal: rp(5),
      borderRadius: rp(10),
    },
    switchButtonText: {
      fontSize: fp(10),
      color: '#FFFFFF',
      fontWeight: '600',
      marginRight: rp(6),
    },
  });

export default BalanceCard;
