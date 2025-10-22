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

interface BuyModalProps {
  visible: boolean;
  onClose: () => void;
  onBuy: (currency: string, amount: string, paymentMethod: string) => void;
  balances: { [key: string]: number };
  prices: { [key: string]: number };
}

const BuyModal: React.FC<BuyModalProps> = ({
  visible,
  onClose,
  onBuy,
  balances,
  prices,
}) => {
  const { theme } = useTheme();
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const currencies = ['BTC', 'ETH', 'USDT'];
  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      subtext: 'Visa, Mastercard, American Express',
      icon: 'credit-card',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      subtext: 'Direct bank transfer',
      icon: 'account-balance',
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      subtext: 'Quick and secure',
      icon: 'apple',
    },
  ];

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

  const getTotalCost = () => {
    if (!amount || !prices[selectedCurrency]) return '0';
    const cost = parseFloat(amount) * prices[selectedCurrency];
    return cost.toFixed(2);
  };

  const handleBuy = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (!paymentMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }

    onBuy(selectedCurrency, amount, paymentMethod);
    setAmount('');
    onClose();
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
      fontSize: fp(16),
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
      marginBottom: rp(16),
    },
    sectionTitle: {
      fontSize: fp(12),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(8),
      letterSpacing: 0.3,
    },
    buyContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: rp(10),
      padding: rp(12),
      marginBottom: rp(8),
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    currencyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: rp(8),
    },
    currencyInfo: {
      flex: 1,
    },
    currencyLabel: {
      fontSize: fp(10),
      fontWeight: '600',
      color: theme.colors.textSecondary,
      marginBottom: rp(8),
      letterSpacing: 0.3,
    },
    currencySelector: {
      flexDirection: 'row',
      gap: rp(8),
    },
    currencyOption: {
      paddingHorizontal: rp(12),
      paddingVertical: rp(6),
      borderRadius: rp(12),
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    currencyOptionSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOpacity: 0.3,
    },
    currencyText: {
      fontSize: fp(10),
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
      borderRadius: rp(6),
      paddingHorizontal: rp(12),
      paddingVertical: rp(10),
      fontSize: fp(14),
      fontWeight: '600',
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
      marginTop: rp(6),
      textAlign: 'center',
    },
    costText: {
      fontSize: fp(10),
      color: theme.colors.textSecondary,
      marginTop: rp(6),
      textAlign: 'center',
      fontWeight: '500',
    },
    paymentMethods: {
      marginTop: rp(8),
    },
    paymentMethodRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: rp(8),
      paddingHorizontal: rp(12),
      borderRadius: rp(8),
      marginBottom: rp(6),
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    paymentMethodSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    paymentMethodIcon: {
      width: rp(28),
      height: rp(28),
      borderRadius: rp(14),
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: rp(10),
    },
    paymentMethodIconSelected: {
      backgroundColor: theme.colors.buttonText,
    },
    paymentMethodInfo: {
      flex: 1,
    },
    paymentMethodText: {
      fontSize: fp(10),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(1),
    },
    paymentMethodTextSelected: {
      color: theme.colors.buttonText,
    },
    paymentMethodSubtext: {
      fontSize: fp(8),
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    paymentMethodSubtextSelected: {
      color: theme.colors.buttonText,
      opacity: 0.8,
    },
    paymentMethodCheck: {
      width: rp(24),
      height: rp(24),
      borderRadius: rp(12),
      backgroundColor: theme.colors.buttonText,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardInputSection: {
      marginTop: rp(8),
      backgroundColor: theme.colors.surface,
      borderRadius: rp(8),
      padding: rp(8),
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    cardInputTitle: {
      fontSize: fp(10),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(6),
    },
    cardInputRow: {
      flexDirection: 'row',
      marginBottom: rp(6),
    },
    cardInputContainer: {
      flex: 1,
    },
    cardInputContainerHalf: {
      flex: 1,
      marginHorizontal: rp(3),
    },
    cardInputLabel: {
      fontSize: fp(8),
      fontWeight: '500',
      color: theme.colors.textSecondary,
      marginBottom: rp(2),
    },
    cardInput: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: rp(4),
      paddingHorizontal: rp(8),
      paddingVertical: rp(6),
      fontSize: fp(10),
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
    },
    buyDetails: {
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
    buyDetailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: rp(8),
    },
    buyDetailLabel: {
      fontSize: fp(10),
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    buyDetailValue: {
      fontSize: fp(10),
      fontWeight: '700',
      color: theme.colors.text,
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
      fontSize: fp(14),
      fontWeight: '700',
      letterSpacing: 0.5,
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
            <Text style={styles.modalTitle}>Buy Cryptocurrency</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={rp(24)} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.container}>
              {/* Currency Selection */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Select Currency</Text>
                <View style={styles.buyContainer}>
                  <View style={styles.currencyRow}>
                    <View style={styles.currencyInfo}>
                      <Text style={styles.currencyLabel}>Cryptocurrency</Text>
                      <View style={styles.currencySelector}>
                        {currencies.map(currency => (
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
                                styles.currencyText,
                                selectedCurrency === currency &&
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
                  <Text style={styles.costText}>
                    Total Cost: ${getTotalCost()} USD
                  </Text>
                </View>
              </View>

              {/* Payment Method */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <View style={styles.paymentMethods}>
                  {paymentMethods.map(method => (
                    <TouchableOpacity
                      key={method.id}
                      style={[
                        styles.paymentMethodRow,
                        paymentMethod === method.id &&
                          styles.paymentMethodSelected,
                      ]}
                      onPress={() => setPaymentMethod(method.id)}
                    >
                      <View
                        style={[
                          styles.paymentMethodIcon,
                          paymentMethod === method.id &&
                            styles.paymentMethodIconSelected,
                        ]}
                      >
                        <Icon
                          name={method.icon}
                          size={16}
                          color={
                            paymentMethod === method.id
                              ? theme.colors.primary
                              : theme.colors.textSecondary
                          }
                        />
                      </View>
                      <View style={styles.paymentMethodInfo}>
                        <Text
                          style={[
                            styles.paymentMethodText,
                            paymentMethod === method.id &&
                              styles.paymentMethodTextSelected,
                          ]}
                        >
                          {method.name}
                        </Text>
                        <Text
                          style={[
                            styles.paymentMethodSubtext,
                            paymentMethod === method.id &&
                              styles.paymentMethodSubtextSelected,
                          ]}
                        >
                          {method.subtext}
                        </Text>
                      </View>
                      {paymentMethod === method.id && (
                        <View style={styles.paymentMethodCheck}>
                          <Icon
                            name="check"
                            size={16}
                            color={theme.colors.primary}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Card Input Section - Only show when Credit/Debit Card is selected */}
                {paymentMethod === 'card' && (
                  <View style={styles.cardInputSection}>
                    <Text style={styles.cardInputTitle}>Card Details</Text>
                    <View style={styles.cardInputRow}>
                      <View style={styles.cardInputContainer}>
                        <Text style={styles.cardInputLabel}>Card Number</Text>
                        <TextInput
                          style={styles.cardInput}
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.cardNumber}
                          onChangeText={text =>
                            setCardDetails(prev => ({
                              ...prev,
                              cardNumber: text,
                            }))
                          }
                          keyboardType="numeric"
                          placeholderTextColor={theme.colors.textSecondary}
                        />
                      </View>
                    </View>
                    <View style={styles.cardInputRow}>
                      <View style={styles.cardInputContainerHalf}>
                        <Text style={styles.cardInputLabel}>Expiry Date</Text>
                        <TextInput
                          style={styles.cardInput}
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChangeText={text =>
                            setCardDetails(prev => ({
                              ...prev,
                              expiryDate: text,
                            }))
                          }
                          keyboardType="numeric"
                          placeholderTextColor={theme.colors.textSecondary}
                        />
                      </View>
                      <View style={styles.cardInputContainerHalf}>
                        <Text style={styles.cardInputLabel}>CVV</Text>
                        <TextInput
                          style={styles.cardInput}
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChangeText={text =>
                            setCardDetails(prev => ({ ...prev, cvv: text }))
                          }
                          keyboardType="numeric"
                          secureTextEntry
                          placeholderTextColor={theme.colors.textSecondary}
                        />
                      </View>
                    </View>
                    <View style={styles.cardInputRow}>
                      <View style={styles.cardInputContainer}>
                        <Text style={styles.cardInputLabel}>
                          Cardholder Name
                        </Text>
                        <TextInput
                          style={styles.cardInput}
                          placeholder="John Doe"
                          value={cardDetails.cardholderName}
                          onChangeText={text =>
                            setCardDetails(prev => ({
                              ...prev,
                              cardholderName: text,
                            }))
                          }
                          placeholderTextColor={theme.colors.textSecondary}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>

              {/* Buy Details */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Order Summary</Text>
                <View style={styles.buyDetails}>
                  <View style={styles.buyDetailRow}>
                    <Text style={styles.buyDetailLabel}>Cryptocurrency</Text>
                    <Text style={styles.buyDetailValue}>
                      {selectedCurrency}
                    </Text>
                  </View>
                  <View style={styles.buyDetailRow}>
                    <Text style={styles.buyDetailLabel}>Amount</Text>
                    <Text style={styles.buyDetailValue}>
                      {amount || '0'} {selectedCurrency}
                    </Text>
                  </View>
                  <View style={styles.buyDetailRow}>
                    <Text style={styles.buyDetailLabel}>
                      Price per {selectedCurrency}
                    </Text>
                    <Text style={styles.buyDetailValue}>
                      ${prices[selectedCurrency]?.toFixed(2) || '0'}
                    </Text>
                  </View>
                  <View style={styles.buyDetailRow}>
                    <Text style={styles.buyDetailLabel}>Total Cost</Text>
                    <Text style={styles.buyDetailValue}>${getTotalCost()}</Text>
                  </View>
                  <View style={styles.buyDetailRow}>
                    <Text style={styles.buyDetailLabel}>Payment Method</Text>
                    <Text style={styles.buyDetailValue}>
                      {paymentMethods.find(m => m.id === paymentMethod)?.name}
                    </Text>
                  </View>
                  <View style={styles.buyDetailRow}>
                    <Text style={styles.buyDetailLabel}>Processing Fee</Text>
                    <Text style={styles.buyDetailValue}>2.5%</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleBuy}>
                <Text style={styles.buttonText}>Confirm Purchase</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BuyModal;
