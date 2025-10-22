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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fp, rp } from '../utils/responsive';
import { useTheme } from '../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { TabStackNavigationProp } from '../navigation/navigationTypes';
import { useTranslation } from '../localization';

const ReceiveModalScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<TabStackNavigationProp>();
  const { t } = useTranslation();

  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('BTC');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [qrCodeVisible, setQrCodeVisible] = useState(false);

  const currencies = ['BTC', 'ETH', 'USDT'];
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const slideAnim = useMemo(() => new Animated.Value(30), []);
  const qrScaleAnim = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
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

  useEffect(() => {
    if (amount && currency) {
      setQrCodeVisible(true);
      Animated.spring(qrScaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      setQrCodeVisible(false);
      qrScaleAnim.setValue(0);
    }
  }, [amount, currency, qrScaleAnim]);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleReceive = () => {
    if (!amount || !cardNumber || !expiry || !cvc) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Handle receive logic here
    Alert.alert(
      'Success',
      `Receive request generated for ${amount} ${currency}`,
    );

    setAmount('');
    setCardNumber('');
    setExpiry('');
    setCvc('');
    handleClose();
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.colors.modalOverlay,
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: theme.colors.modalBackground,
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
      backgroundColor: theme.colors.card,
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
    inputGroup: {
      marginBottom: rp(10),
    },
    label: {
      fontSize: fp(14),
      fontWeight: '600',
      color: theme.colors.textSecondary,
      marginBottom: rp(8),
      letterSpacing: 0.3,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: rp(8),
      paddingHorizontal: rp(16),
      paddingVertical: rp(12),
      fontSize: fp(16),
      color: theme.colors.text,
      backgroundColor: theme.colors.modalBackground,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    inputRow: {
      flexDirection: 'row',
      gap: rp(12),
    },
    inputHalf: {
      flex: 1,
    },
    currencySelector: {
      flexDirection: 'row',
      gap: rp(8),
      marginBottom: rp(12),
    },
    currencyOption: {
      paddingHorizontal: rp(16),
      paddingVertical: rp(8),
      borderRadius: rp(20),
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.modalBackground,
      shadowColor: '#000',
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
      fontSize: fp(14),
      fontWeight: '600',
      color: theme.colors.text,
      letterSpacing: 0.5,
    },
    currencyTextSelected: {
      color: '#FFFFFF',
    },
    qrSection: {
      alignItems: 'center',
      padding: rp(14),
      backgroundColor: theme.colors.card,
      borderRadius: rp(12),
      marginBottom: rp(10),
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    qrIcon: {
      marginBottom: rp(8),
    },
    qrText: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      textAlign: 'center',
      fontWeight: '500',
      letterSpacing: 0.3,
    },
    qrAmount: {
      fontSize: fp(16),
      color: theme.colors.primary,
      fontWeight: '600',
      marginTop: rp(6),
    },
    button: {
      backgroundColor: theme.colors.success,
      paddingVertical: rp(14),
      borderRadius: rp(8),
      alignItems: 'center',
      marginTop: rp(8),
      shadowColor: theme.colors.success,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: fp(16),
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    amountContainer: {
      backgroundColor: theme.colors.card,
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
    paymentContainer: {
      backgroundColor: theme.colors.card,
      borderRadius: rp(12),
      padding: rp(14),
      marginBottom: rp(10),
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    qrSectionAnimated: {
      opacity: 1,
    },
    qrSectionDimmed: {
      opacity: 0.3,
    },
  });

  return (
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
          <Text style={styles.modalTitle}>{t('receive_crypto')}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Icon name="close" size={rp(24)} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.container}>
            {/* Amount Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('enter_amount')}</Text>
              <View style={styles.amountContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Amount</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholderTextColor={theme.colors.textSecondary}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Currency</Text>
                  <View style={styles.currencySelector}>
                    {currencies.map(curr => (
                      <TouchableOpacity
                        key={curr}
                        style={[
                          styles.currencyOption,
                          currency === curr && styles.currencyOptionSelected,
                        ]}
                        onPress={() => setCurrency(curr)}
                      >
                        <Text
                          style={[
                            styles.currencyText,
                            currency === curr && styles.currencyTextSelected,
                          ]}
                        >
                          {curr}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* Payment Method Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <View style={styles.paymentContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Card Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    keyboardType="numeric"
                    placeholderTextColor={theme.colors.textSecondary}
                  />
                </View>
                <View style={styles.inputRow}>
                  <View style={styles.inputHalf}>
                    <Text style={styles.label}>Expiry</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YY"
                      value={expiry}
                      onChangeText={setExpiry}
                      placeholderTextColor={theme.colors.textSecondary}
                    />
                  </View>
                  <View style={styles.inputHalf}>
                    <Text style={styles.label}>CVC</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      value={cvc}
                      onChangeText={setCvc}
                      keyboardType="numeric"
                      secureTextEntry
                      placeholderTextColor={theme.colors.textSecondary}
                    />
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleReceive}>
              <Text style={styles.buttonText}>{t('receive_crypto')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default ReceiveModalScreen;
