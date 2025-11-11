import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';
import { RootStackParamList } from '@/navigation/navigationTypes';

type MoveMoneyScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface CurrencyAccount {
  id: string;
  name: string;
  currency: string;
  flag: string;
  balance: string;
}

const currencyAccounts: CurrencyAccount[] = [
  {
    id: 'gbp',
    name: 'Cara Dune',
    currency: 'GBP',
    flag: '🇬🇧',
    balance: '9,835.51',
  },
  {
    id: 'eur',
    name: 'Cara Dune',
    currency: 'EUR',
    flag: '🇪🇺',
    balance: '8,234.00',
  },
  {
    id: 'usd',
    name: 'Cara Dune',
    currency: 'USD',
    flag: '🇺🇸',
    balance: '12,450.75',
  },
];

export default function MoveMoneyScreen() {
  const { theme } = useTheme();
  const { isRTL } = useTranslation();
  const navigation = useNavigation<MoveMoneyScreenNavigationProp>();

  const [fromAccount, setFromAccount] = useState<CurrencyAccount>(
    currencyAccounts[0],
  );
  const [toAccount, setToAccount] = useState<CurrencyAccount>(
    currencyAccounts[1],
  );
  const [fromAmount, setFromAmount] = useState('400');
  const [toAmount, setToAmount] = useState('455.82');
  const [exchangeRate] = useState('1.14');
  const [transactionFee] = useState('9.99');

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleHomePress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSwapCurrencies = useCallback(() => {
    const tempAccount = fromAccount;
    setFromAccount(toAccount);
    setToAccount(tempAccount);

    // Recalculate amounts (simplified)
    const newFromAmount = toAmount;
    const newToAmount = (
      parseFloat(fromAmount) / parseFloat(exchangeRate)
    ).toFixed(2);
    setFromAmount(newFromAmount);
    setToAmount(newToAmount);
  }, [fromAccount, toAccount, fromAmount, toAmount, exchangeRate]);

  const handleFromAmountChange = useCallback(
    (text: string) => {
      setFromAmount(text);
      if (text && !isNaN(parseFloat(text))) {
        const converted = (parseFloat(text) * parseFloat(exchangeRate)).toFixed(
          2,
        );
        setToAmount(converted);
      }
    },
    [exchangeRate],
  );

  const handleToAmountChange = useCallback(
    (text: string) => {
      setToAmount(text);
      if (text && !isNaN(parseFloat(text))) {
        const converted = (parseFloat(text) / parseFloat(exchangeRate)).toFixed(
          2,
        );
        setFromAmount(converted);
      }
    },
    [exchangeRate],
  );

  const handleContinue = useCallback(() => {
    navigation.navigate('MoveMoneyAuthentication', {
      fromAmount: `${
        fromAccount.currency === 'GBP'
          ? '£'
          : fromAccount.currency === 'EUR'
          ? '€'
          : '$'
      } ${fromAmount}`,
      toAmount: `${
        toAccount.currency === 'GBP'
          ? '£'
          : toAccount.currency === 'EUR'
          ? '€'
          : '$'
      } ${toAmount}`,
      fromCurrency: fromAccount.currency,
      toCurrency: toAccount.currency,
      transactionFee: `£ ${transactionFee}`,
    });
  }, [
    navigation,
    fromAccount,
    toAccount,
    fromAmount,
    toAmount,
    transactionFee,
  ]);

  const renderChart = () => {
    return (
      <View style={styles(theme, isRTL).chartContainer}>
        <View style={styles(theme, isRTL).chartHeader}>
          <Text style={styles(theme, isRTL).chartTitle}>
            {fromAccount.currency}/{toAccount.currency}
          </Text>
          <View style={styles(theme, isRTL).chartRateContainer}>
            <Text style={styles(theme, isRTL).chartRate}>€{exchangeRate}</Text>
            <View style={styles(theme, isRTL).chartRateIcon}>
              <Icon name="trending-up" size={rp(16)} color="#00C851" />
            </View>
          </View>
        </View>

        {/* Mock Chart - You can replace this with your chart library */}
        <View style={styles(theme, isRTL).mockChart}>
          {/* Chart area */}
          <View style={styles(theme, isRTL).chartArea}>
            {Array.from({ length: 20 }).map((_, index) => {
              const height = Math.random() * 60 + 20;
              return (
                <View
                  key={index}
                  style={[
                    styles(theme, isRTL).chartBar,
                    { height: rp(height) },
                  ]}
                />
              );
            })}
          </View>

          {/* Chart labels */}
          <View style={styles(theme, isRTL).chartLabels}>
            <Text style={styles(theme, isRTL).chartLabel}>1y Feb</Text>
            <Text style={styles(theme, isRTL).chartLabel}>12 Feb</Text>
            <Text style={styles(theme, isRTL).chartLabel}>23 Feb</Text>
            <Text style={styles(theme, isRTL).chartLabel}>04 Mar</Text>
            <Text style={styles(theme, isRTL).chartLabel}>16 Mar</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles(theme, isRTL).container}>
      <DynamicHeader
        titleKey="move_money"
        showBackButton
        onBackPress={handleBackPress}
        rightContent={
          <TouchableOpacity
            onPress={handleHomePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="home" size={rp(24)} color={theme.colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles(theme, isRTL).scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles(theme, isRTL).scrollContent}
      >
        {/* Description */}
        <Text style={styles(theme, isRTL).description}>
          Orby offers the ability to move money between different currency
          accounts.
        </Text>

        {/* From Account */}
        <View style={styles(theme, isRTL).sectionContainer}>
          <Text style={styles(theme, isRTL).sectionLabel}>From</Text>
          <TouchableOpacity style={styles(theme, isRTL).accountSelector}>
            <View style={styles(theme, isRTL).accountInfo}>
              <Text style={styles(theme, isRTL).accountFlag}>
                {fromAccount.flag}
              </Text>
              <View style={styles(theme, isRTL).accountDetails}>
                <Text style={styles(theme, isRTL).accountName}>
                  {fromAccount.name}
                </Text>
                <Text style={styles(theme, isRTL).accountCurrency}>
                  {fromAccount.currency}
                </Text>
              </View>
            </View>
            <Icon
              name="keyboard-arrow-down"
              size={rp(24)}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Swap Button */}
        <View style={styles(theme, isRTL).swapButtonContainer}>
          <TouchableOpacity
            style={styles(theme, isRTL).swapButton}
            onPress={handleSwapCurrencies}
          >
            <Icon name="swap-vert" size={rp(20)} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* To Account */}
        <View style={styles(theme, isRTL).sectionContainer}>
          <Text style={styles(theme, isRTL).sectionLabel}>To</Text>
          <TouchableOpacity style={styles(theme, isRTL).accountSelector}>
            <View style={styles(theme, isRTL).accountInfo}>
              <Text style={styles(theme, isRTL).accountFlag}>
                {toAccount.flag}
              </Text>
              <View style={styles(theme, isRTL).accountDetails}>
                <Text style={styles(theme, isRTL).accountName}>
                  {toAccount.name}
                </Text>
                <Text style={styles(theme, isRTL).accountCurrency}>
                  {toAccount.currency}
                </Text>
              </View>
            </View>
            <Icon
              name="keyboard-arrow-down"
              size={rp(24)}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Chart */}
        {renderChart()}

        {/* Amount Section */}
        <View style={styles(theme, isRTL).amountContainer}>
          <View style={styles(theme, isRTL).amountInputContainer}>
            <Text style={styles(theme, isRTL).currencySymbol}>
              {fromAccount.currency === 'GBP'
                ? '£'
                : fromAccount.currency === 'EUR'
                ? '€'
                : '$'}
            </Text>
            <TextInput
              style={styles(theme, isRTL).amountInput}
              value={fromAmount}
              onChangeText={handleFromAmountChange}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          <TouchableOpacity
            style={styles(theme, isRTL).convertButton}
            onPress={handleSwapCurrencies}
          >
            <Icon name="sync-alt" size={rp(16)} color={theme.colors.primary} />
          </TouchableOpacity>

          <View style={styles(theme, isRTL).amountInputContainer}>
            <Text style={styles(theme, isRTL).currencySymbol}>
              {toAccount.currency === 'GBP'
                ? '£'
                : toAccount.currency === 'EUR'
                ? '€'
                : '$'}
            </Text>
            <TextInput
              style={styles(theme, isRTL).amountInput}
              value={toAmount}
              onChangeText={handleToAmountChange}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>
        </View>

        {/* Transaction Fee */}
        <View style={styles(theme, isRTL).feeContainer}>
          <Text style={styles(theme, isRTL).feeLabel}>Transaction Fee:</Text>
          <Text style={styles(theme, isRTL).feeAmount}>£ {transactionFee}</Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles(theme, isRTL).continueButton}
          onPress={handleContinue}
        >
          <Text style={styles(theme, isRTL).continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ height: rp(40) }} />
      </ScrollView>
    </View>
  );
}

const styles = (theme: any, isRTL: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: rp(20),
      paddingBottom: rp(20),
    },
    description: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      lineHeight: fp(20),
      marginBottom: rp(24),
      textAlign: isRTL ? 'right' : 'left',
    },
    sectionContainer: {
      marginBottom: rp(16),
    },
    sectionLabel: {
      fontSize: fp(16),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(8),
      textAlign: isRTL ? 'right' : 'left',
    },
    accountSelector: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.surface || '#F8F9FA',
      paddingHorizontal: rp(16),
      paddingVertical: rp(16),
      borderRadius: rp(12),
      borderWidth: 1,
      borderColor: theme.colors.border || '#E5E7EB',
    },
    accountInfo: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      flex: 1,
    },
    accountFlag: {
      fontSize: fp(24),
      marginRight: isRTL ? 0 : rp(12),
      marginLeft: isRTL ? rp(12) : 0,
    },
    accountDetails: {
      alignItems: isRTL ? 'flex-end' : 'flex-start',
    },
    accountName: {
      fontSize: fp(16),
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: isRTL ? 'right' : 'left',
    },
    accountCurrency: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
    },
    swapButtonContainer: {
      alignItems: 'center',
      marginVertical: rp(8),
    },
    swapButton: {
      width: rp(40),
      height: rp(40),
      borderRadius: rp(20),
      backgroundColor: theme.colors.surface || '#F8F9FA',
      borderWidth: 2,
      borderColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chartContainer: {
      backgroundColor: theme.colors.surface || '#F8F9FA',
      borderRadius: rp(12),
      padding: rp(16),
      marginVertical: rp(20),
    },
    chartHeader: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: rp(16),
    },
    chartTitle: {
      fontSize: fp(14),
      fontWeight: '600',
      color: theme.colors.text,
    },
    chartRateContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    chartRate: {
      fontSize: fp(16),
      fontWeight: '700',
      color: theme.colors.primary,
      marginRight: isRTL ? 0 : rp(4),
      marginLeft: isRTL ? rp(4) : 0,
    },
    chartRateIcon: {},
    mockChart: {
      height: rp(120),
    },
    chartArea: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      height: rp(80),
      paddingHorizontal: rp(4),
    },
    chartBar: {
      width: rp(8),
      backgroundColor: theme.colors.primary,
      borderRadius: rp(2),
      opacity: 0.7,
    },
    chartLabels: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      marginTop: rp(8),
      paddingHorizontal: rp(4),
    },
    chartLabel: {
      fontSize: fp(12),
      color: theme.colors.textSecondary,
    },
    amountContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: rp(20),
    },
    amountInputContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface || '#F8F9FA',
      borderRadius: rp(12),
      paddingHorizontal: rp(16),
      paddingVertical: rp(12),
      flex: 1,
      marginHorizontal: rp(8),
      borderWidth: 1,
      borderColor: theme.colors.border || '#E5E7EB',
    },
    currencySymbol: {
      fontSize: fp(18),
      fontWeight: '600',
      color: theme.colors.text,
      marginRight: isRTL ? 0 : rp(8),
      marginLeft: isRTL ? rp(8) : 0,
    },
    amountInput: {
      flex: 1,
      fontSize: fp(18),
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: isRTL ? 'right' : 'left',
      padding: 0,
    },
    convertButton: {
      width: rp(32),
      height: rp(32),
      borderRadius: rp(16),
      backgroundColor: theme.colors.background,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    feeContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: rp(24),
    },
    feeLabel: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
    },
    feeAmount: {
      fontSize: fp(14),
      fontWeight: '600',
      color: theme.colors.text,
    },
    continueButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: rp(12),
      paddingVertical: rp(16),
      alignItems: 'center',
      justifyContent: 'center',
    },
    continueButtonText: {
      fontSize: fp(16),
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });
