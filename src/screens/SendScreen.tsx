import React, { useState, useMemo } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  addTransaction,
  subtractFromBalance,
} from '../redux/slices/walletSlice';
import { Transaction } from '../types';
import { fp, rp } from '../utils/responsive';
import Header from '../components/Header';
import AuthButton from '../components/AuthButton';
import { useTheme } from '../hooks/useTheme';

const SendScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { balances, prices } = useAppSelector(state => state.wallet);
  const { theme } = useTheme();

  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Animation values
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const slideAnim = useMemo(() => new Animated.Value(50), []);

  React.useEffect(() => {
    // Entrance animations
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
  }, [fadeAnim, slideAnim]);

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const formatCvc = (text: string) => {
    return text.replace(/\D/g, '').slice(0, 3);
  };

  const handleCardNumberChange = (text: string) => {
    setCardNumber(formatCardNumber(text));
  };

  const handleExpiryChange = (text: string) => {
    setExpiryDate(formatExpiryDate(text));
  };

  const handleCvcChange = (text: string) => {
    setCvc(formatCvc(text));
  };

  const validateForm = () => {
    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      Alert.alert('Error', 'Please enter a valid 16-digit card number');
      return false;
    }
    if (!expiryDate || expiryDate.length !== 5) {
      Alert.alert('Error', 'Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (!cvc || cvc.length !== 3) {
      Alert.alert('Error', 'Please enter a valid 3-digit CVC');
      return false;
    }
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }
    if (parseFloat(amount) > balances[selectedCurrency]) {
      Alert.alert('Error', 'Insufficient balance');
      return false;
    }
    return true;
  };

  const handleSend = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const transactionAmount = parseFloat(amount);

      // Create new transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'send',
        amount: transactionAmount,
        currency: selectedCurrency,
        description: `Sent to card ending in ${cardNumber.slice(-4)}`,
        timestamp: new Date().toISOString(),
        status: 'completed',
      };

      // Update Redux store
      dispatch(addTransaction(newTransaction));
      dispatch(
        subtractFromBalance({
          currency: selectedCurrency,
          amount: transactionAmount,
        }),
      );

      setIsLoading(false);
      setShowConfirmation(true);

      // Reset form
      setCardNumber('');
      setExpiryDate('');
      setCvc('');
      setAmount('');
    }, 2000);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const getAvailableCurrencies = () => {
    return Object.keys(balances).filter(currency => balances[currency] > 0);
  };

  const getCurrencyValue = () => {
    const amountNum = parseFloat(amount) || 0;
    const price = prices[selectedCurrency] || 0;
    return `$${(amountNum * price).toFixed(2)}`;
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Header title="Send Money" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card Details Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Card Details</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="credit-card"
                size={20}
                color={theme.colors.iconSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputField}
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor={theme.colors.inputPlaceholder}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Expiry Date</Text>
                <View style={styles.inputWrapper}>
                  <Icon
                    name="calendar-today"
                    size={20}
                    color={theme.colors.iconSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.inputField}
                    value={expiryDate}
                    onChangeText={handleExpiryChange}
                    placeholder="MM/YY"
                    placeholderTextColor={theme.colors.inputPlaceholder}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
              </View>
            </View>
            <View style={styles.halfWidth}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>CVC</Text>
                <View style={styles.inputWrapper}>
                  <Icon
                    name="lock"
                    size={20}
                    color={theme.colors.iconSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.inputField}
                    value={cvc}
                    onChangeText={handleCvcChange}
                    placeholder="123"
                    placeholderTextColor={theme.colors.inputPlaceholder}
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Amount Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Amount</Text>

          <View style={styles.currencySelector}>
            <Text style={styles.currencyLabel}>Currency</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.currencyScroll}
            >
              {getAvailableCurrencies().map(currency => (
                <TouchableOpacity
                  key={currency}
                  style={[
                    styles.currencyOption,
                    selectedCurrency === currency &&
                      styles.currencyOptionSelected,
                  ]}
                  onPress={() => setSelectedCurrency(currency)}
                >
                  <Text
                    style={[
                      styles.currencyOptionText,
                      selectedCurrency === currency &&
                        styles.currencyOptionTextSelected,
                    ]}
                  >
                    {currency}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Amount</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="attach-money"
                size={20}
                color={theme.colors.iconSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputField}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor={theme.colors.inputPlaceholder}
                keyboardType="numeric"
              />
            </View>
          </View>

          {amount && (
            <View style={styles.valuePreview}>
              <Text style={styles.valuePreviewText}>
                ≈ {getCurrencyValue()}
              </Text>
            </View>
          )}

          <View style={styles.balanceInfo}>
            <Text style={styles.balanceLabel}>
              Available: {balances[selectedCurrency]?.toFixed(4)}{' '}
              {selectedCurrency}
            </Text>
          </View>
        </Animated.View>

        {/* Send Button */}
        <Animated.View
          style={[
            styles.buttonSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <AuthButton
            title={isLoading ? 'Processing...' : 'Send Money'}
            onPress={handleSend}
            loading={isLoading}
            disabled={
              isLoading || !cardNumber || !expiryDate || !cvc || !amount
            }
            size="large"
            style={styles.sendButton}
          />
        </Animated.View>
      </ScrollView>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIcon}>
              <Icon
                name="check-circle"
                size={60}
                color={theme.colors.success}
              />
            </View>
            <Text style={styles.modalTitle}>Transaction Successful!</Text>
            <Text style={styles.modalMessage}>
              You have successfully sent {amount} {selectedCurrency} to the card
              ending in {cardNumber.slice(-4)}
            </Text>
            <AuthButton
              title="Done"
              onPress={handleConfirmationClose}
              style={styles.modalButton}
            />
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
    section: {
      backgroundColor: theme.colors.card,
      borderRadius: rp(8),
      padding: rp(12),
      marginBottom: rp(8),
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: fp(14),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(8),
      letterSpacing: 0.2,
    },
    row: {
      flexDirection: 'row',
      gap: rp(6),
    },
    halfWidth: {
      flex: 1,
    },
    currencySelector: {
      marginBottom: rp(8),
    },
    currencyLabel: {
      fontSize: fp(12),
      fontWeight: '500',
      color: theme.colors.text,
      marginBottom: rp(6),
    },
    currencyScroll: {
      maxHeight: rp(32),
    },
    currencyOption: {
      paddingHorizontal: rp(10),
      paddingVertical: rp(4),
      borderRadius: rp(12),
      marginRight: rp(6),
      backgroundColor: theme.colors.inputBackground,
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
      minWidth: rp(50),
      alignItems: 'center',
    },
    currencyOptionSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 2,
      elevation: 2,
    },
    currencyOptionText: {
      fontSize: fp(11),
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
    currencyOptionTextSelected: {
      color: theme.colors.buttonText,
    },
    valuePreview: {
      marginTop: rp(6),
      paddingHorizontal: rp(8),
      paddingVertical: rp(6),
      backgroundColor: theme.colors.primaryLight,
      borderRadius: rp(6),
      borderWidth: 1,
      borderColor: theme.colors.primaryLight,
    },
    valuePreviewText: {
      fontSize: fp(12),
      fontWeight: '600',
      color: theme.colors.primary,
      textAlign: 'center',
    },
    balanceInfo: {
      marginTop: rp(6),
      paddingHorizontal: rp(8),
      paddingVertical: rp(6),
      backgroundColor: theme.colors.inputBackground,
      borderRadius: rp(6),
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
    },
    balanceLabel: {
      fontSize: fp(10),
      fontWeight: '500',
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    buttonSection: {
      marginTop: rp(8),
      paddingHorizontal: rp(0),
    },
    sendButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: rp(8),
      height: rp(44),
      shadowColor: '#007AFF',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.modalOverlay,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: theme.colors.card,
      borderRadius: rp(12),
      padding: rp(20),
      marginHorizontal: rp(20),
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
      maxWidth: rp(280),
    },
    successIcon: {
      marginBottom: rp(12),
    },
    modalTitle: {
      fontSize: fp(18),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(8),
      textAlign: 'center',
    },
    modalMessage: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: fp(20),
      marginBottom: rp(20),
    },
    modalButton: {
      minWidth: rp(120),
      height: rp(40),
      borderRadius: rp(8),
    },
    inputContainer: {
      marginBottom: rp(12),
    },
    inputLabel: {
      fontSize: fp(12),
      fontWeight: '500',
      color: theme.colors.text,
      marginBottom: rp(4),
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBackground,
      borderRadius: rp(8),
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
      paddingHorizontal: rp(12),
      height: rp(40),
    },
    inputIcon: {
      marginRight: rp(8),
    },
    inputField: {
      flex: 1,
      fontSize: fp(14),
      color: theme.colors.text,
      fontWeight: '400',
    },
  });

export default SendScreen;
