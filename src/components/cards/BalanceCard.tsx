import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';

interface BalanceCardProps {
  balance?: string;
  currency: string;
  onSwitchPress: () => void;
}

interface BalanceOption {
  icon: string;
  amount: string;
  currency: string;
  value: string;
}

interface BalanceDropdownProps {
  visible: boolean;
  options: BalanceOption[];
  onClose: () => void;
  onSelect: (value: string) => void;
}

const BalanceDropdown: React.FC<BalanceDropdownProps> = ({
  visible,
  options,
  onClose,
  onSelect,
}) => {
  const { theme } = useTheme();
  const { isRTL } = useTranslation();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles(theme).modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={[
            styles(theme).modalContainer,
            isRTL && styles(theme).modalContainerRTL,
          ]}
        >
          <View
            style={[
              styles(theme).dropdownHeader,
              isRTL && styles(theme).dropdownHeaderRTL,
            ]}
          >
            <Text style={styles(theme).dropdownTitle}>Select Balance</Text>
          </View>
          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles(theme).balanceOption,
                isRTL && styles(theme).balanceOptionRTL,
              ]}
              onPress={() => {
                onSelect(option.value);
                onClose();
              }}
            >
              <Text style={styles(theme).balanceOptionIcon}>{option.icon}</Text>
              <Text style={styles(theme).balanceOptionAmount}>
                {option.amount}
              </Text>
              <Text style={styles(theme).balanceOptionCurrency}>
                {option.currency}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={styles(theme).dropdownDivider} />
          <View
            style={[
              styles(theme).balanceOption,
              isRTL && styles(theme).balanceOptionRTL,
            ]}
          >
            <Text style={styles(theme).totalLabel}>Total Balance</Text>
            <Text style={styles(theme).totalAmount}>£ 25,359</Text>
            <Text style={styles(theme).totalCurrency}>GBP 🇬🇧</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance: _balance = '9,835.51',
  currency,
  onSwitchPress,
}) => {
  const { theme } = useTheme();
  const { isRTL } = useTranslation();
  const [_selectedBalance, setSelectedBalance] = useState(_balance);
  const [showDropdown, setShowDropdown] = useState(false);

  const balanceOptions: BalanceOption[] = [
    { icon: '🇺🇸', amount: '$ 12,980.00', currency: 'USD', value: 'usd' },
    { icon: '🇪🇺', amount: '€ 8,000.00', currency: 'EUR', value: 'eur' },
    { icon: '₿', amount: '₿ 0.46', currency: 'BTC', value: 'btc' },
    { icon: '◆', amount: 'Ξ 8.515', currency: 'ETH', value: 'eth' },
    { icon: '🇬🇧', amount: '£ 9,835.51', currency: 'GBP', value: 'gbp' },
  ];

  const handleBalanceSelect = (value: string) => {
    setSelectedBalance(value);
  };

  return (
    <View
      style={[
        styles(theme).gradientContainer,
        isRTL && styles(theme).gradientContainerRTL,
      ]}
    >
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles(theme).gradient}
      >
        <View
          style={[styles(theme).content, isRTL && styles(theme).contentRTL]}
        >
          {/* Left Container - 2/3 width */}
          <View style={styles(theme).leftContainer}>
            <Text style={styles(theme).balanceLabel}>Your Balance</Text>

            <View
              style={[
                styles(theme).balanceAmountContainer,
                isRTL && styles(theme).balanceAmountContainerRTL,
              ]}
            >
              <Text style={styles(theme).balanceAmount}>
                {_balance.split('.')[0]}
              </Text>
              <Text style={styles(theme).balanceDecimal}>
                {'.'}
                {_balance.split('.')[1]}
              </Text>
              <TouchableOpacity
                onPress={() => setShowDropdown(true)}
                style={[
                  styles(theme).chevronContainer,
                  isRTL && styles(theme).chevronContainerRTL,
                ]}
              >
                <Icon
                  name="expand-more"
                  size={rp(25)}
                  color={theme.colors.textOnDark}
                />
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
              <Icon
                name="sync-alt"
                size={rp(10)}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <BalanceDropdown
        visible={showDropdown}
        options={balanceOptions}
        onClose={() => setShowDropdown(false)}
        onSelect={handleBalanceSelect}
      />
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    gradientContainer: {
      marginHorizontal: rp(20),
      marginTop: rp(16),
      marginBottom: rp(8),
    },
    gradientContainerRTL: {
      // RTL specific styles if needed
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
    contentRTL: {
      flexDirection: 'row-reverse',
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
    balanceAmountContainerRTL: {
      flexDirection: 'row-reverse',
    },
    balanceLabel: {
      fontSize: fp(12),
      color: theme.colors.textOnDark,
      opacity: 0.9,
      fontWeight: '400',
      marginBottom: rp(6),
    },
    chevronContainer: {
      marginLeft: rp(6),
      marginTop: rp(4),
      padding: rp(4),
    },
    chevronContainerRTL: {
      marginLeft: 0,
      marginRight: rp(6),
    },
    balanceAmount: {
      fontSize: fp(20),
      fontWeight: '700',
      color: theme.colors.textOnDark,
    },
    balanceDecimal: {
      fontSize: fp(13),
      fontWeight: '700',
      color: theme.colors.textOnDark,
      opacity: 0.95,
      top: rp(2),
    },
    currency: {
      fontSize: fp(12),
      color: theme.colors.textOnDark,
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
      color: theme.colors.primary,
      fontWeight: '600',
      marginRight: rp(6),
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'center',
      paddingHorizontal: rp(20),
    },
    modalContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: rp(20),
      width: '60%',
      maxWidth: 400,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 10,
    },
    modalContainerRTL: {
      // RTL specific styles if needed
    },
    dropdownHeader: {
      padding: rp(20),
      paddingBottom: rp(16),
    },
    dropdownHeaderRTL: {
      alignItems: 'flex-end',
    },
    dropdownTitle: {
      fontSize: fp(12),
      fontWeight: '400',
      color: theme.colors.text,
    },
    balanceOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: rp(20),
      paddingVertical: rp(12),
    },
    balanceOptionRTL: {
      flexDirection: 'row-reverse',
    },
    balanceOptionIcon: {
      fontSize: fp(12),
      marginRight: rp(12),
    },
    balanceOptionAmount: {
      flex: 1,
      fontSize: fp(12),
      fontWeight: '600',
      color: theme.colors.text,
    },
    balanceOptionCurrency: {
      fontSize: fp(10),
      fontWeight: '400',
      color: theme.colors.textSecondary,
    },
    dropdownDivider: {
      height: 1,
      backgroundColor: theme.colors.borderLight,
      marginVertical: rp(4),
    },
    totalLabel: {
      fontSize: fp(10),
      fontWeight: '400',
      color: theme.colors.textSecondary,
    },
    totalAmount: {
      flex: 1,
      fontSize: fp(10),
      fontWeight: '700',
      color: theme.colors.text,
      marginLeft: rp(12),
    },
    totalCurrency: {
      fontSize: fp(10),
      fontWeight: '600',
      color: theme.colors.text,
    },
  });

export default BalanceCard;
