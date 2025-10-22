import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fp, rp } from '../utils/responsive';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../localization';

interface SwapModalProps {
  visible: boolean;
  onClose: () => void;
  onSwap: (fromCurrency: string, toCurrency: string, amount: string) => void;
  balances: { [key: string]: number };
  prices: { [key: string]: number };
}

const SwapModal: React.FC<SwapModalProps> = ({
  visible,
  onClose,
  onSwap,
  balances,
  prices,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [estimatedAmount, setEstimatedAmount] = useState('0');
  const [isAnimating, setIsAnimating] = useState(false);

  const currencies = ['BTC', 'ETH', 'USDT'];
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const slideAnim = useMemo(() => new Animated.Value(30), []);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(30);
    }
  }, [visible, fadeAnim, slideAnim]);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      const fromPrice = prices[fromCurrency] || 1;
      const toPrice = prices[toCurrency] || 1;
      const estimated = (parseFloat(amount) * fromPrice) / toPrice;
      setEstimatedAmount(estimated.toFixed(6));
    } else {
      setEstimatedAmount('0');
    }
  }, [amount, fromCurrency, toCurrency, prices]);

  const handleSwap = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (balances[fromCurrency] < parseFloat(amount)) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }

    onSwap(fromCurrency, toCurrency, amount);
    setAmount('');
    onClose();
  };

  const swapCurrencies = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);

    setTimeout(() => setIsAnimating(false), 300);
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.colors.modalOverlay,
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: rp(20),
      borderTopRightRadius: rp(20),
      maxHeight: Dimensions.get('window').height * 0.85,
      minHeight: Dimensions.get('window').height * 0.6,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: rp(20),
      paddingVertical: rp(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    modalTitle: {
      fontSize: fp(20),
      fontWeight: '700',
      color: theme.colors.text,
    },
    closeButton: {
      padding: rp(8),
      borderRadius: rp(20),
      backgroundColor: theme.colors.surface,
    },
    container: {
      flex: 1,
      paddingHorizontal: rp(20),
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: rp(20),
    },
    section: {
      marginBottom: rp(12),
    },
    sectionTitle: {
      fontSize: fp(16),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(8),
      letterSpacing: 0.3,
    },
    swapContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: rp(12),
      padding: rp(14),
      marginBottom: rp(10),
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    currencyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: rp(10),
    },
    currencyInfo: {
      flex: 1,
    },
    currencyLabel: {
      fontSize: fp(14),
      fontWeight: '600',
      color: theme.colors.textSecondary,
      marginBottom: rp(8),
      letterSpacing: 0.3,
    },
    currencySelector: {
      flexDirection: 'row',
      gap: rp(12),
    },
    currencyOption: {
      paddingHorizontal: rp(16),
      paddingVertical: rp(10),
      borderRadius: rp(20),
      borderWidth: 2,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    currencyOptionSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOpacity: 0.3,
    },
    currencyText: {
      fontSize: fp(14),
      fontWeight: '600',
      color: theme.colors.text,
      letterSpacing: 0.5,
    },
    currencyTextSelected: {
      color: theme.colors.buttonText,
    },
    amountInput: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: rp(8),
      paddingHorizontal: rp(16),
      paddingVertical: rp(12),
      fontSize: fp(18),
      fontWeight: '600',
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
      marginTop: rp(8),
      textAlign: 'center',
    },
    balanceText: {
      fontSize: fp(12),
      color: theme.colors.textSecondary,
      marginTop: rp(8),
      textAlign: 'center',
      fontWeight: '500',
    },
    swapButton: {
      alignItems: 'center',
      marginVertical: rp(12),
    },
    swapIcon: {
      width: rp(48),
      height: rp(48),
      borderRadius: rp(24),
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    swapDetails: {
      backgroundColor: theme.colors.surface,
      borderRadius: rp(12),
      padding: rp(16),
      marginBottom: rp(12),
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    swapDetailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: rp(8),
    },
    swapDetailLabel: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    swapDetailValue: {
      fontSize: fp(14),
      fontWeight: '700',
      color: theme.colors.text,
    },
    rateText: {
      fontSize: fp(12),
      color: theme.colors.primary,
      textAlign: 'center',
      marginTop: rp(12),
      fontWeight: '600',
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: rp(14),
      borderRadius: rp(8),
      alignItems: 'center',
      marginTop: rp(8),
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    buttonText: {
      color: theme.colors.buttonText,
      fontSize: fp(16),
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    gradientOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: rp(20),
    },
    estimatedAmountContainer: {
      backgroundColor: theme.colors.surface,
    },
    estimatedAmountText: {
      borderWidth: 0,
      padding: 0,
      backgroundColor: 'transparent',
      color: theme.colors.textSecondary,
      fontSize: fp(18),
      fontWeight: '600',
      textAlign: 'center',
    },
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{t('swap_crypto')}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={rp(24)} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.container}>
              {/* From Currency */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('from')}</Text>
                <View style={styles.swapContainer}>
                  <View style={styles.currencyRow}>
                    <View style={styles.currencyInfo}>
                      <Text style={styles.currencyLabel}>Currency</Text>
                      <View style={styles.currencySelector}>
                        {currencies.map(currency => (
                          <TouchableOpacity
                            key={currency}
                            style={[
                              styles.currencyOption,
                              fromCurrency === currency &&
                                styles.currencyOptionSelected,
                            ]}
                            onPress={() => setFromCurrency(currency)}
                          >
                            <Text
                              style={[
                                styles.currencyText,
                                fromCurrency === currency &&
                                  styles.currencyTextSelected,
                              ]}
                            >
                              {currency}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </View>
                  <TextInput
                    style={styles.amountInput}
                    placeholder="0.00"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholderTextColor={theme.colors.textSecondary}
                  />
                  <Text style={styles.balanceText}>
                    Balance: {balances[fromCurrency]?.toFixed(6) || '0'}{' '}
                    {fromCurrency}
                  </Text>
                </View>
              </View>

              {/* Swap Button */}
              <View style={styles.swapButton}>
                <TouchableOpacity
                  style={styles.swapIcon}
                  onPress={swapCurrencies}
                  disabled={isAnimating}
                >
                  <Icon
                    name="swap-vert"
                    size={rp(24)}
                    color={theme.colors.buttonText}
                    style={{
                      transform: [{ rotate: isAnimating ? '180deg' : '0deg' }],
                    }}
                  />
                </TouchableOpacity>
              </View>

              {/* To Currency */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('to')}</Text>
                <View style={styles.swapContainer}>
                  <View style={styles.currencyRow}>
                    <View style={styles.currencyInfo}>
                      <Text style={styles.currencyLabel}>Currency</Text>
                      <View style={styles.currencySelector}>
                        {currencies.map(currency => (
                          <TouchableOpacity
                            key={currency}
                            style={[
                              styles.currencyOption,
                              toCurrency === currency &&
                                styles.currencyOptionSelected,
                            ]}
                            onPress={() => setToCurrency(currency)}
                          >
                            <Text
                              style={[
                                styles.currencyText,
                                toCurrency === currency &&
                                  styles.currencyTextSelected,
                              ]}
                            >
                              {currency}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.amountInput,
                      styles.estimatedAmountContainer,
                    ]}
                  >
                    <Text style={styles.estimatedAmountText}>
                      {estimatedAmount}
                    </Text>
                  </View>
                  <Text style={styles.balanceText}>
                    Balance: {balances[toCurrency]?.toFixed(6) || '0'}{' '}
                    {toCurrency}
                  </Text>
                </View>
              </View>

              {/* Swap Details */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Swap Details</Text>
                <View style={styles.swapDetails}>
                  <View style={styles.swapDetailRow}>
                    <Text style={styles.swapDetailLabel}>Rate</Text>
                    <Text style={styles.swapDetailValue}>
                      1 {fromCurrency} ={' '}
                      {(
                        (prices[fromCurrency] || 1) / (prices[toCurrency] || 1)
                      ).toFixed(6)}{' '}
                      {toCurrency}
                    </Text>
                  </View>
                  <View style={styles.swapDetailRow}>
                    <Text style={styles.swapDetailLabel}>You send</Text>
                    <Text style={styles.swapDetailValue}>
                      {amount || '0'} {fromCurrency}
                    </Text>
                  </View>
                  <View style={styles.swapDetailRow}>
                    <Text style={styles.swapDetailLabel}>You receive</Text>
                    <Text style={styles.swapDetailValue}>
                      {estimatedAmount} {toCurrency}
                    </Text>
                  </View>
                  <View style={styles.swapDetailRow}>
                    <Text style={styles.swapDetailLabel}>Network Fee</Text>
                    <Text style={styles.swapDetailValue}>0.1%</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSwap}>
                <Text style={styles.buttonText}>{t('confirm_swap')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SwapModal;
