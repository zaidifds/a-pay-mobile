import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';
import { RootStackParamList } from '@/navigation/navigationTypes';
import QRCode from 'react-native-qrcode-svg';

type DepositCashScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Currency {
  code: string;
  symbol: string;
  flag: string;
  name: string;
}

export default function DepositCashScreen() {
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();
  const navigation = useNavigation<DepositCashScreenNavigationProp>();

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>({
    code: 'GBP',
    symbol: '£',
    flag: '🇬🇧',
    name: 'British Pound',
  });
  const [amount, setAmount] = useState('400');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [codeType, setCodeType] = useState<'qr' | 'barcode' | null>(null);
  const [generatingType, setGeneratingType] = useState<'qr' | 'barcode' | null>(
    null,
  );

  const currencies: Currency[] = [
    { code: 'GBP', symbol: '£', flag: '🇬🇧', name: 'British Pound' },
    { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'Euro' },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHomePress = () => {
    navigation.goBack();
  };

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    setShowCurrencyDropdown(false);
    // Reset generated codes when currency changes
    setGeneratedCode(null);
    setCodeType(null);
    setGeneratingType(null); // Also reset generating state
  };

  const generateCode = async (type: 'qr' | 'barcode') => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert(t('error'), t('please_enter_valid_amount'));
      return;
    }

    setGeneratingType(type);

    // Simulate API call to generate code
    setTimeout(() => {
      try {
        // Create a clean, barcode-compatible string
        const cleanAmount = parseFloat(amount || '0')
          .toFixed(2)
          .replace('.', '');
        const timestamp = Date.now().toString();

        if (type === 'barcode') {
          // For barcodes, use only alphanumeric characters (CODE128 compatible)
          const codeData = `${
            selectedCurrency.code
          }${cleanAmount}${timestamp.slice(-6)}`;
          console.log('Generated barcode data:', codeData);
          setGeneratedCode(codeData);
        } else {
          // For QR codes, we can use more complex data
          const codeData = `DEPOSIT_${type.toUpperCase()}_${
            selectedCurrency.code
          }_${amount}_${timestamp}`;
          console.log('Generated QR data:', codeData);
          setGeneratedCode(codeData);
        }

        setCodeType(type);
        setGeneratingType(null);
      } catch (error) {
        console.error('Error generating code:', error);
        setGeneratingType(null);
        Alert.alert(t('error'), t('error_generating_barcode'));
      }
    }, 1500);
  };

  const handleFindRetailer = () => {
    navigation.navigate('FindNearestRetailer');
  };

  const renderCurrencyDropdown = () => {
    if (!showCurrencyDropdown) return null;

    return (
      <View style={styles(theme, isRTL).dropdownContainer}>
        {currencies.map(currency => (
          <TouchableOpacity
            key={currency.code}
            style={styles(theme, isRTL).dropdownItem}
            onPress={() => handleCurrencySelect(currency)}
            activeOpacity={0.7}
          >
            <Text style={styles(theme, isRTL).currencyFlag}>
              {currency.flag}
            </Text>
            <Text style={styles(theme, isRTL).currencyCode}>
              {currency.code}
            </Text>
            <Text style={styles(theme, isRTL).currencyName}>
              {currency.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderQRCode = () => {
    if (!generatedCode || codeType !== 'qr') return null;

    return (
      <View style={styles(theme, isRTL).codeContainer}>
        <Text style={styles(theme, isRTL).codeDescription}>
          {t('qr_code_description')}
        </Text>

        <View style={styles(theme, isRTL).qrCodeWrapper}>
          <QRCode
            value={generatedCode}
            size={rp(160)}
            color={theme.colors.text}
            backgroundColor={theme.colors.background}
          />
        </View>

        <TouchableOpacity
          style={styles(theme, isRTL).findRetailerButton}
          onPress={handleFindRetailer}
          activeOpacity={0.8}
        >
          <Icon name="location-on" size={rp(20)} color="#FFFFFF" />
          <Text style={styles(theme, isRTL).findRetailerButtonText}>
            {t('find_nearest_retailer')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderBarcode = () => {
    if (!generatedCode || codeType !== 'barcode') return null;

    // Validate barcode data
    const isValidBarcodeData =
      generatedCode &&
      typeof generatedCode === 'string' &&
      generatedCode.length > 0 &&
      !generatedCode.includes('NaN') &&
      /^[A-Za-z0-9]+$/.test(generatedCode);

    if (!isValidBarcodeData) {
      console.warn('Invalid barcode data:', generatedCode);
      return (
        <View style={styles(theme, isRTL).codeContainer}>
          <Text style={styles(theme, isRTL).codeDescription}>
            {t('error_generating_barcode')}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles(theme, isRTL).codeContainer}>
        <Text style={styles(theme, isRTL).codeDescription}>
          {t('barcode_description')}
        </Text>

        <View style={styles(theme, isRTL).barcodeWrapper}>
          {/* Custom barcode visualization until library is stable */}
          <View style={styles(theme, isRTL).customBarcodeContainer}>
            <View style={styles(theme, isRTL).barcodeLines}>
              {/* Generate realistic barcode pattern */}
              {Array.from({ length: 40 }).map((_, index) => {
                // Use generated code to create deterministic pattern
                const seedValue =
                  (generatedCode.charCodeAt(index % generatedCode.length) *
                    (index + 1)) %
                  255;
                const lineWidth =
                  seedValue % 3 === 0 ? 3 : seedValue % 4 === 0 ? 1 : 2;
                const isSpace = seedValue % 7 === 0; // Some positions are spaces

                if (isSpace) {
                  return (
                    <View
                      key={index}
                      style={{ width: rp(lineWidth), height: rp(80) }}
                    />
                  );
                }

                return (
                  <View
                    key={index}
                    style={[
                      styles(theme, isRTL).barcodeLine,
                      {
                        width: rp(lineWidth),
                        height: rp(80),
                        backgroundColor: '#000000',
                      },
                    ]}
                  />
                );
              })}
            </View>
            <Text style={styles(theme, isRTL).barcodeNumber}>
              {generatedCode}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles(theme, isRTL).findRetailerButton}
          onPress={handleFindRetailer}
          activeOpacity={0.8}
        >
          <Icon name="location-on" size={rp(20)} color="#FFFFFF" />
          <Text style={styles(theme, isRTL).findRetailerButtonText}>
            {t('find_nearest_retailer')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles(theme, isRTL).container}>
      <DynamicHeader
        titleKey="deposit_cash"
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
        <View style={styles(theme, isRTL).descriptionContainer}>
          <Text style={styles(theme, isRTL).description}>
            {t('deposit_cash_description')}
          </Text>
        </View>

        {/* Currency Selector */}
        <View style={styles(theme, isRTL).selectorContainer}>
          <TouchableOpacity
            style={styles(theme, isRTL).currencySelector}
            onPress={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
            activeOpacity={0.7}
          >
            <View style={styles(theme, isRTL).currencyContent}>
              <Text style={styles(theme, isRTL).currencyFlag}>
                {selectedCurrency.flag}
              </Text>
              <Text style={styles(theme, isRTL).selectedCurrencyCode}>
                {selectedCurrency.code}
              </Text>
            </View>
            <Icon
              name={
                showCurrencyDropdown
                  ? 'keyboard-arrow-up'
                  : 'keyboard-arrow-down'
              }
              size={rp(24)}
              color={theme.colors.text}
            />
          </TouchableOpacity>
          {renderCurrencyDropdown()}
        </View>

        {/* Amount Input */}
        <View style={styles(theme, isRTL).amountContainer}>
          <Text style={styles(theme, isRTL).currencySymbol}>
            {selectedCurrency.symbol}
          </Text>
          <TextInput
            style={styles(theme, isRTL).amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="0"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
            textAlign={isRTL ? 'right' : 'left'}
          />
        </View>

        {/* Generate Buttons */}
        {!generatedCode && (
          <View style={styles(theme, isRTL).buttonsContainer}>
            <TouchableOpacity
              style={styles(theme, isRTL).qrButton}
              onPress={() => generateCode('qr')}
              disabled={generatingType === 'qr'}
              activeOpacity={0.8}
            >
              {generatingType === 'qr' ? (
                <View style={styles(theme, isRTL).buttonLoadingContainer}>
                  <ActivityIndicator color="#FFFFFF" size="small" />
                </View>
              ) : (
                <>
                  <View style={styles(theme, isRTL).qrIconContainer}>
                    <Icon name="qr-code-2" size={rp(24)} color="#FFFFFF" />
                  </View>
                  <Text style={styles(theme, isRTL).qrButtonText}>
                    {t('generate_qr_code')}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles(theme, isRTL).barcodeButton}
              onPress={() => generateCode('barcode')}
              disabled={generatingType === 'barcode'}
              activeOpacity={0.8}
            >
              {generatingType === 'barcode' ? (
                <View style={styles(theme, isRTL).buttonLoadingContainer}>
                  <ActivityIndicator color="#FFFFFF" size="small" />
                </View>
              ) : (
                <>
                  <View style={styles(theme, isRTL).barcodeIconContainer}>
                    <Icon name="subject" size={rp(24)} color="#FFFFFF" />
                  </View>
                  <Text style={styles(theme, isRTL).barcodeButtonText}>
                    {t('generate_barcode')}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Generated Code Display */}
        {renderQRCode()}
        {renderBarcode()}
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
    descriptionContainer: {
      marginBottom: rp(20),
    },
    description: {
      fontSize: fp(14),
      lineHeight: fp(20),
      color: theme.colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
    },
    selectorContainer: {
      position: 'relative',
      marginBottom: rp(16),
    },
    currencySelector: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.surface || theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border || '#E0E0E0',
      borderRadius: rp(8),
      paddingHorizontal: rp(16),
      paddingVertical: rp(12),
    },
    currencyContent: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    currencyFlag: {
      fontSize: fp(18),
      marginRight: isRTL ? 0 : rp(8),
      marginLeft: isRTL ? rp(8) : 0,
    },
    selectedCurrencyCode: {
      fontSize: fp(16),
      fontWeight: '600',
      color: theme.colors.text,
    },
    dropdownContainer: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: theme.colors.surface || theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border || '#E0E0E0',
      borderRadius: rp(8),
      marginTop: rp(4),
      zIndex: 1000,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    dropdownItem: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      paddingHorizontal: rp(16),
      paddingVertical: rp(12),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border || '#E0E0E0',
    },
    currencyCode: {
      fontSize: fp(16),
      fontWeight: '600',
      color: theme.colors.text,
      marginLeft: isRTL ? 0 : rp(8),
      marginRight: isRTL ? rp(8) : rp(12),
    },
    currencyName: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      flex: 1,
      textAlign: isRTL ? 'right' : 'left',
    },
    amountContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBackground || '#F5F5F5',
      borderRadius: rp(8),
      paddingHorizontal: rp(16),
      paddingVertical: rp(12),
      marginBottom: rp(20),
    },
    currencySymbol: {
      fontSize: fp(20),
      fontWeight: '600',
      color: theme.colors.text,
      marginRight: isRTL ? 0 : rp(8),
      marginLeft: isRTL ? rp(8) : 0,
    },
    amountInput: {
      flex: 1,
      fontSize: fp(20),
      fontWeight: '600',
      color: theme.colors.text,
      padding: 0,
    },
    buttonsContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      gap: rp(12),
      marginBottom: rp(20),
    },
    qrButton: {
      flex: 1,
      backgroundColor: '#4A90E2',
      borderRadius: rp(12),
      paddingVertical: rp(16),
      paddingHorizontal: rp(16),
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#4A90E2',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 6,
      minHeight: rp(90),
    },
    qrIconContainer: {
      width: rp(40),
      height: rp(40),
      borderRadius: rp(20),
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: rp(8),
    },
    qrButtonText: {
      fontSize: fp(14),
      fontWeight: '600',
      color: '#FFFFFF',
      textAlign: 'center',
      lineHeight: fp(18),
    },
    barcodeButton: {
      flex: 1,
      backgroundColor: '#6C63FF',
      borderRadius: rp(12),
      paddingVertical: rp(16),
      paddingHorizontal: rp(16),
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#6C63FF',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 6,
      minHeight: rp(90),
    },
    barcodeIconContainer: {
      width: rp(40),
      height: rp(40),
      borderRadius: rp(20),
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: rp(8),
    },
    barcodeButtonText: {
      fontSize: fp(14),
      fontWeight: '600',
      color: '#FFFFFF',
      textAlign: 'center',
      lineHeight: fp(18),
    },
    buttonLoadingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: rp(56),
    },
    loadingContainer: {
      alignItems: 'center',
      paddingVertical: rp(40),
    },
    loadingText: {
      fontSize: fp(16),
      color: theme.colors.textSecondary,
      marginTop: rp(16),
    },
    codeContainer: {
      alignItems: 'center',
      paddingVertical: rp(16),
    },
    codeDescription: {
      fontSize: fp(13),
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: fp(18),
      marginBottom: rp(16),
      paddingHorizontal: rp(16),
    },
    qrCodeWrapper: {
      backgroundColor: '#FFFFFF',
      padding: rp(16),
      borderRadius: rp(12),
      marginBottom: rp(20),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    barcodeWrapper: {
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      padding: rp(16),
      borderRadius: rp(12),
      marginBottom: rp(20),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    customBarcodeContainer: {
      alignItems: 'center',
      paddingVertical: rp(8),
    },
    barcodeLines: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginBottom: rp(8),
      paddingHorizontal: rp(10),
    },
    barcodeLine: {
      backgroundColor: '#000000',
    },
    barcodeNumber: {
      fontSize: fp(12),
      fontFamily: 'monospace',
      color: '#000000',
      letterSpacing: 1,
      marginTop: rp(4),
    },
    findRetailerButton: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      paddingVertical: rp(14),
      paddingHorizontal: rp(32),
      borderRadius: rp(8),
      minWidth: rp(200),
    },
    findRetailerButtonText: {
      fontSize: fp(16),
      fontWeight: '600',
      color: '#FFFFFF',
      marginLeft: isRTL ? 0 : rp(8),
      marginRight: isRTL ? rp(8) : 0,
    },
  });
