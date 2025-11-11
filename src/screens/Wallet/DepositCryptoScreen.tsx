import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Clipboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';
import { FormInput } from '@/components/forms';
import { RootStackParamList } from '@/navigation/navigationTypes';
import QRCode from 'react-native-qrcode-svg';

type DepositCryptoScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  color: string;
  backgroundColor: string;
  price: string;
  walletAddress: string;
}

export default function DepositCryptoScreen() {
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();
  const navigation = useNavigation<DepositCryptoScreenNavigationProp>();

  const [selectedCrypto, setSelectedCrypto] = useState<Cryptocurrency | null>(
    null,
  );
  const [transactionId, setTransactionId] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  const timeframes = ['1H', '4H', '1D', '1W', '1M'];

  const getChartData = (timeframe: string) => {
    // Mock different chart data for each timeframe
    const chartDataSets = {
      '1H': [
        { x: 0, y: 70 },
        { x: 20, y: 65 },
        { x: 40, y: 80 },
        { x: 60, y: 75 },
        { x: 80, y: 85 },
        { x: 100, y: 90 },
        { x: 120, y: 88 },
      ],
      '4H': [
        { x: 0, y: 60 },
        { x: 20, y: 45 },
        { x: 40, y: 55 },
        { x: 60, y: 70 },
        { x: 80, y: 50 },
        { x: 100, y: 65 },
        { x: 120, y: 80 },
      ],
      '1D': [
        { x: 0, y: 50 },
        { x: 20, y: 70 },
        { x: 40, y: 60 },
        { x: 60, y: 85 },
        { x: 80, y: 75 },
        { x: 100, y: 90 },
        { x: 120, y: 95 },
      ],
      '1W': [
        { x: 0, y: 40 },
        { x: 20, y: 60 },
        { x: 40, y: 80 },
        { x: 60, y: 70 },
        { x: 80, y: 90 },
        { x: 100, y: 85 },
        { x: 120, y: 88 },
      ],
      '1M': [
        { x: 0, y: 30 },
        { x: 20, y: 50 },
        { x: 40, y: 70 },
        { x: 60, y: 85 },
        { x: 80, y: 80 },
        { x: 100, y: 95 },
        { x: 120, y: 92 },
      ],
    };
    return (
      chartDataSets[timeframe as keyof typeof chartDataSets] ||
      chartDataSets['1D']
    );
  };

  const cryptocurrencies: Cryptocurrency[] = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      color: '#F7931A',
      backgroundColor: '#FFF8E1',
      price: '£ 22,808.51',
      walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'Ξ',
      color: '#627EEA',
      backgroundColor: '#E8EAF6',
      price: '£ 1,440.08',
      walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    },
  ];

  const handleBackPress = () => {
    if (selectedCrypto) {
      setSelectedCrypto(null);
      setTransactionId('');
    } else {
      navigation.goBack();
    }
  };

  const handleHomePress = () => {
    navigation.goBack();
  };

  const handleCryptoSelect = (crypto: Cryptocurrency) => {
    setSelectedCrypto(crypto);
    setTransactionId('');
  };

  const handleCopyAddress = () => {
    if (selectedCrypto) {
      Clipboard.setString(selectedCrypto.walletAddress);
      Alert.alert(t('success'), t('wallet_address_copied'));
    }
  };

  const handleContinue = () => {
    if (!transactionId.trim()) {
      Alert.alert(t('error'), t('please_enter_transaction_id'));
      return;
    }

    Alert.alert(
      t('transaction_submitted'),
      t('transaction_processing_message'),
      [{ text: t('ok'), onPress: () => navigation.goBack() }],
    );
  };

  const renderPriceChart = () => {
    if (!selectedCrypto) return null;

    // Get dynamic chart data based on selected timeframe
    const chartPoints = getChartData(selectedTimeframe);

    return (
      <View style={styles(theme, isRTL).chartContainer}>
        <View style={styles(theme, isRTL).chartHeader}>
          <View style={styles(theme, isRTL).cryptoInfo}>
            <View
              style={[
                styles(theme, isRTL).cryptoIconSmall,
                { backgroundColor: selectedCrypto.color },
              ]}
            >
              <Text style={styles(theme, isRTL).cryptoIconText}>
                {selectedCrypto.icon}
              </Text>
            </View>
            <View>
              <Text style={styles(theme, isRTL).cryptoNameSmall}>
                {selectedCrypto.name.toLowerCase()}
              </Text>
              <Text style={styles(theme, isRTL).cryptoPrice}>
                {selectedCrypto.price}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles(theme, isRTL).cryptoIconLarge,
              { backgroundColor: selectedCrypto.backgroundColor },
            ]}
          >
            <Text
              style={[
                styles(theme, isRTL).cryptoIconLargeText,
                { color: selectedCrypto.color },
              ]}
            >
              {selectedCrypto.icon}
            </Text>
          </View>
        </View>

        <View style={styles(theme, isRTL).chartArea}>
          <View style={styles(theme, isRTL).chartGrid}>
            {/* Mock chart lines */}
            <View style={styles(theme, isRTL).chartLine}>
              {chartPoints.map((point, index) => (
                <View
                  key={index}
                  style={[
                    styles(theme, isRTL).chartPoint,
                    {
                      left: rp(point.x),
                      bottom: rp(point.y),
                      backgroundColor: selectedCrypto.color + '40',
                    },
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Chart timeframe selector */}
          <View style={styles(theme, isRTL).chartLabels}>
            {timeframes.map(timeframe => (
              <TouchableOpacity
                key={timeframe}
                style={[
                  styles(theme, isRTL).chartTimeframe,
                  selectedTimeframe === timeframe &&
                    styles(theme, isRTL).chartTimeframeSelected,
                ]}
                onPress={() => setSelectedTimeframe(timeframe)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles(theme, isRTL).chartLabel,
                    selectedTimeframe === timeframe &&
                      styles(theme, isRTL).chartLabelSelected,
                  ]}
                >
                  {timeframe}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderCryptoSelection = () => (
    <>
      {/* Description */}
      <View style={styles(theme, isRTL).descriptionContainer}>
        <Text style={styles(theme, isRTL).description}>
          {t('deposit_crypto_description')}
        </Text>
      </View>

      {/* Cryptocurrency Grid */}
      <View style={styles(theme, isRTL).cryptoGrid}>
        {cryptocurrencies.map(crypto => (
          <TouchableOpacity
            key={crypto.id}
            style={[
              styles(theme, isRTL).cryptoCard,
              { backgroundColor: crypto.backgroundColor },
            ]}
            onPress={() => handleCryptoSelect(crypto)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles(theme, isRTL).cryptoIcon,
                { backgroundColor: crypto.color },
              ]}
            >
              <Text style={styles(theme, isRTL).cryptoIconText}>
                {crypto.icon}
              </Text>
            </View>
            <Text style={styles(theme, isRTL).cryptoName}>{crypto.name}</Text>
            <Text style={styles(theme, isRTL).cryptoSymbol}>
              {crypto.symbol}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderDepositDetails = () => {
    if (!selectedCrypto) return null;

    return (
      <>
        {/* Price Chart */}
        {renderPriceChart()}

        {/* Instructions */}
        <View style={styles(theme, isRTL).instructionsContainer}>
          <Text style={styles(theme, isRTL).instructions}>
            {t('crypto_deposit_instructions')
              .replace('{{crypto}}', selectedCrypto.name)
              .replace('{{symbol}}', selectedCrypto.symbol)}
          </Text>
        </View>

        {/* Wallet Address */}
        <View style={styles(theme, isRTL).addressContainer}>
          <Text style={styles(theme, isRTL).addressText} selectable>
            {selectedCrypto.walletAddress}
          </Text>
          <TouchableOpacity
            style={styles(theme, isRTL).copyButton}
            onPress={handleCopyAddress}
            activeOpacity={0.8}
          >
            <Icon name="content-copy" size={rp(16)} color="#FFFFFF" />
            <Text style={styles(theme, isRTL).copyButtonText}>{t('copy')}</Text>
          </TouchableOpacity>
        </View>

        {/* QR Code */}
        <View style={styles(theme, isRTL).qrContainer}>
          <View style={styles(theme, isRTL).qrWrapper}>
            <QRCode
              value={selectedCrypto.walletAddress}
              size={rp(120)}
              color={theme.colors.text}
              backgroundColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Transaction ID Input */}
        <View style={styles(theme, isRTL).transactionContainer}>
          <Text style={styles(theme, isRTL).transactionLabel}>
            {t('transaction_id_instruction')}
          </Text>
          <FormInput
            placeholder={t('enter_transaction_id')}
            value={transactionId}
            onChangeText={setTransactionId}
            multiline
            numberOfLines={4}
            style={styles(theme, isRTL).transactionInputOverride}
          />
        </View>

        {/* Continue Button */}
        <View style={styles(theme, isRTL).buttonContainer}>
          <TouchableOpacity
            style={[
              styles(theme, isRTL).continueButton,
              transactionId.trim()
                ? styles(theme, isRTL).continueButtonEnabled
                : styles(theme, isRTL).continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!transactionId.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles(theme, isRTL).continueButtonText}>
              {t('continue')}
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={styles(theme, isRTL).container}>
      <DynamicHeader
        titleKey="deposit_crypto"
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
        {selectedCrypto ? renderDepositDetails() : renderCryptoSelection()}
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
      paddingBottom: rp(40),
    },
    descriptionContainer: {
      marginBottom: rp(32),
    },
    description: {
      fontSize: fp(16),
      lineHeight: fp(24),
      color: theme.colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
    },
    cryptoGrid: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      gap: rp(16),
      justifyContent: 'center',
    },
    cryptoCard: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: rp(32),
      paddingHorizontal: rp(20),
      borderRadius: rp(16),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cryptoIcon: {
      width: rp(56),
      height: rp(56),
      borderRadius: rp(28),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: rp(16),
    },
    cryptoIconText: {
      fontSize: fp(28),
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    cryptoName: {
      fontSize: fp(18),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(4),
    },
    cryptoSymbol: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
    },
    chartContainer: {
      backgroundColor: theme.colors.surface || '#F8F9FA',
      borderRadius: rp(16),
      padding: rp(16),
      marginBottom: rp(24),
    },
    chartHeader: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: rp(16),
    },
    cryptoInfo: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    cryptoIconSmall: {
      width: rp(24),
      height: rp(24),
      borderRadius: rp(12),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: isRTL ? 0 : rp(8),
      marginLeft: isRTL ? rp(8) : 0,
    },
    cryptoNameSmall: {
      fontSize: fp(12),
      color: theme.colors.textSecondary,
    },
    cryptoPrice: {
      fontSize: fp(16),
      fontWeight: '600',
      color: theme.colors.text,
    },
    cryptoIconLarge: {
      width: rp(40),
      height: rp(40),
      borderRadius: rp(20),
      alignItems: 'center',
      justifyContent: 'center',
    },
    cryptoIconLargeText: {
      fontSize: fp(24),
      fontWeight: 'bold',
    },
    chartArea: {
      height: rp(100),
      position: 'relative',
    },
    chartGrid: {
      flex: 1,
      position: 'relative',
    },
    chartLine: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    chartPoint: {
      position: 'absolute',
      width: rp(8),
      height: rp(8),
      borderRadius: rp(4),
    },
    chartLabels: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      marginTop: rp(12),
      gap: rp(8),
    },
    chartTimeframe: {
      paddingVertical: rp(6),
      paddingHorizontal: rp(12),
      borderRadius: rp(16),
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.border || '#E0E0E0',
    },
    chartTimeframeSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    chartLabel: {
      fontSize: fp(12),
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    chartLabelSelected: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
    instructionsContainer: {
      marginBottom: rp(20),
    },
    instructions: {
      fontSize: fp(14),
      lineHeight: fp(20),
      color: theme.colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
    },
    addressContainer: {
      backgroundColor: theme.colors.surface || '#F8F9FA',
      borderRadius: rp(8),
      padding: rp(16),
      marginBottom: rp(20),
      alignItems: 'center',
    },
    addressText: {
      fontSize: fp(14),
      fontFamily: 'monospace',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: rp(12),
      lineHeight: fp(20),
    },
    copyButton: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      paddingVertical: rp(8),
      paddingHorizontal: rp(16),
      borderRadius: rp(6),
    },
    copyButtonText: {
      fontSize: fp(14),
      fontWeight: '600',
      color: '#FFFFFF',
      marginLeft: isRTL ? 0 : rp(6),
      marginRight: isRTL ? rp(6) : 0,
    },
    qrContainer: {
      alignItems: 'center',
      marginBottom: rp(32),
    },
    qrWrapper: {
      backgroundColor: '#FFFFFF',
      padding: rp(16),
      borderRadius: rp(12),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    transactionContainer: {
      marginBottom: rp(16),
    },
    transactionLabel: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      marginBottom: rp(8),
      textAlign: isRTL ? 'right' : 'left',
    },
    transactionInputOverride: {
      minHeight: rp(80),
      textAlignVertical: 'top',
    },
    buttonContainer: {
      marginTop: rp(8),
    },
    continueButton: {
      borderRadius: rp(8),
      paddingVertical: rp(16),
      alignItems: 'center',
      justifyContent: 'center',
    },
    continueButtonEnabled: {
      backgroundColor: theme.colors.primary,
    },
    continueButtonDisabled: {
      backgroundColor: theme.colors.textSecondary + '40',
    },
    continueButtonText: {
      fontSize: fp(16),
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });
