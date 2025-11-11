import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';
import { RootStackParamList } from '@/navigation/navigationTypes';

type MoveMoneyAuthScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;
type MoveMoneyAuthScreenRouteProp = RouteProp<
  RootStackParamList,
  'MoveMoneyAuthentication'
>;

export default function MoveMoneyAuthScreen() {
  const { theme } = useTheme();
  const { isRTL } = useTranslation();
  const navigation = useNavigation<MoveMoneyAuthScreenNavigationProp>();
  const route = useRoute<MoveMoneyAuthScreenRouteProp>();

  const { fromAmount, toAmount, transactionFee } = route.params;

  const [passcode, setPasscode] = useState('');
  const [authStep, setAuthStep] = useState<
    'fingerprint' | 'passcode' | 'success'
  >('fingerprint');
  const [_showFingerprint, setShowFingerprint] = useState(true);

  useEffect(() => {
    // Simulate fingerprint timeout - switch to passcode after 3 seconds
    const timer = setTimeout(() => {
      if (authStep === 'fingerprint') {
        setAuthStep('passcode');
        setShowFingerprint(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [authStep]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleHomePress = useCallback(() => {
    navigation.navigate('BottomTabs');
  }, [navigation]);

  const handlePasscodePress = useCallback(
    (digit: string) => {
      if (passcode.length < 4) {
        const newPasscode = passcode + digit;
        setPasscode(newPasscode);

        if (newPasscode.length === 4) {
          // Simulate authentication success
          setTimeout(() => {
            setAuthStep('success');
          }, 500);
        }
      }
    },
    [passcode],
  );

  const handlePasscodeDelete = useCallback(() => {
    if (passcode.length > 0) {
      setPasscode(passcode.slice(0, -1));
    }
  }, [passcode]);

  const handleFingerprintPress = useCallback(() => {
    // Simulate successful fingerprint authentication
    Vibration.vibrate(100);
    setAuthStep('success');
  }, []);

  const handleTransfer = useCallback(() => {
    // Navigate back to payments with success
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'BottomTabs',
          state: {
            routes: [
              { name: 'Wallet' },
              { name: 'Analytics' },
              { name: 'Payments', params: { showSuccessToast: true } },
              { name: 'Cards' },
            ],
            index: 2,
          },
        },
      ],
    });
  }, [navigation]);

  const renderAuthIcon = () => {
    if (authStep === 'fingerprint') {
      return (
        <TouchableOpacity
          style={[
            styles(theme, isRTL).authIconContainer,
            styles(theme, isRTL).fingerprintContainer,
          ]}
          onPress={handleFingerprintPress}
          activeOpacity={0.8}
        >
          <Icon name="fingerprint" size={rp(32)} color="#FFFFFF" />
        </TouchableOpacity>
      );
    } else if (authStep === 'success') {
      return (
        <View
          style={[
            styles(theme, isRTL).authIconContainer,
            styles(theme, isRTL).successContainer,
          ]}
        >
          <Icon name="check" size={rp(32)} color="#FFFFFF" />
        </View>
      );
    }
    return null;
  };

  const renderPasscodeDots = () => {
    return (
      <View style={styles(theme, isRTL).passcodeContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles(theme, isRTL).passcodeDot,
              {
                backgroundColor:
                  index < passcode.length ? theme.colors.text : 'transparent',
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderPasscodeKeypad = () => {
    if (authStep === 'success') return null;

    const keypadNumbers = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', 'delete'],
    ];

    return (
      <View style={styles(theme, isRTL).keypadContainer}>
        {keypadNumbers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles(theme, isRTL).keypadRow}>
            {row.map((key, keyIndex) => {
              if (key === '') {
                return (
                  <View
                    key={keyIndex}
                    style={styles(theme, isRTL).keypadButton}
                  />
                );
              }

              if (key === 'delete') {
                return (
                  <TouchableOpacity
                    key={keyIndex}
                    style={styles(theme, isRTL).keypadButton}
                    onPress={handlePasscodeDelete}
                  >
                    <Icon
                      name="backspace"
                      size={rp(24)}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  key={keyIndex}
                  style={styles(theme, isRTL).keypadButton}
                  onPress={() => handlePasscodePress(key)}
                >
                  <Text style={styles(theme, isRTL).keypadButtonText}>
                    {key}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  const isTransferEnabled = authStep === 'success';

  return (
    <View style={styles(theme, isRTL).container}>
      <DynamicHeader
        titleKey="authentication"
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

      <View style={styles(theme, isRTL).content}>
        {/* Description */}
        <Text style={styles(theme, isRTL).description}>
          To ensure the security of your transfers, our system requires you to
          authenticate every transaction before it is processed. This means that
          you may need to enter a passcode.
        </Text>

        {/* Auth Section */}
        <View style={styles(theme, isRTL).authSection}>
          {renderAuthIcon()}
          {renderPasscodeDots()}
        </View>

        {/* Keypad */}
        {renderPasscodeKeypad()}

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Transaction Details */}
        <View style={styles(theme, isRTL).transactionDetails}>
          <View style={styles(theme, isRTL).amountContainer}>
            <View style={styles(theme, isRTL).amountItem}>
              <Text style={styles(theme, isRTL).currencySymbol}>
                {fromAmount.split(' ')[0]}
              </Text>
              <Text style={styles(theme, isRTL).amountText}>
                {fromAmount.split(' ')[1]}
              </Text>
            </View>

            <TouchableOpacity style={styles(theme, isRTL).convertIcon}>
              <Icon
                name="sync-alt"
                size={rp(16)}
                color={theme.colors.primary}
              />
            </TouchableOpacity>

            <View style={styles(theme, isRTL).amountItem}>
              <Text style={styles(theme, isRTL).currencySymbol}>
                {toAmount.split(' ')[0]}
              </Text>
              <Text style={styles(theme, isRTL).amountText}>
                {toAmount.split(' ')[1]}
              </Text>
            </View>
          </View>

          <View style={styles(theme, isRTL).feeContainer}>
            <Text style={styles(theme, isRTL).feeLabel}>Transaction Fee:</Text>
            <Text style={styles(theme, isRTL).feeAmount}>{transactionFee}</Text>
          </View>
        </View>

        {/* Transfer Button */}
        <TouchableOpacity
          style={[
            styles(theme, isRTL).transferButton,
            isTransferEnabled
              ? styles(theme, isRTL).transferButtonEnabled
              : styles(theme, isRTL).transferButtonDisabled,
          ]}
          onPress={handleTransfer}
          disabled={!isTransferEnabled}
        >
          <Text
            style={[
              styles(theme, isRTL).transferButtonText,
              isTransferEnabled
                ? styles(theme, isRTL).transferButtonTextEnabled
                : styles(theme, isRTL).transferButtonTextDisabled,
            ]}
          >
            Transfer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = (theme: any, isRTL: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: rp(20),
      paddingBottom: rp(30),
    },
    description: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      lineHeight: fp(20),
      marginBottom: rp(40),
      textAlign: isRTL ? 'right' : 'left',
    },
    authSection: {
      alignItems: 'center',
      marginBottom: rp(40),
    },
    authIconContainer: {
      width: rp(80),
      height: rp(80),
      borderRadius: rp(40),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: rp(30),
    },
    fingerprintContainer: {
      backgroundColor: theme.colors.primary,
    },
    successContainer: {
      backgroundColor: '#00C851',
    },
    passcodeContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: rp(16),
    },
    passcodeDot: {
      width: rp(16),
      height: rp(16),
      borderRadius: rp(8),
      borderWidth: 2,
      borderColor: theme.colors.border || '#E5E7EB',
    },
    keypadContainer: {
      alignItems: 'center',
      marginTop: rp(20),
    },
    keypadRow: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'center',
      marginBottom: rp(16),
    },
    keypadButton: {
      width: rp(64),
      height: rp(64),
      borderRadius: rp(32),
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: rp(20),
    },
    keypadButtonText: {
      fontSize: fp(24),
      fontWeight: '400',
      color: theme.colors.text,
    },
    transactionDetails: {
      marginBottom: rp(20),
    },
    amountContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: rp(16),
    },
    amountItem: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    currencySymbol: {
      fontSize: fp(20),
      fontWeight: '600',
      color: theme.colors.text,
      marginRight: isRTL ? 0 : rp(4),
      marginLeft: isRTL ? rp(4) : 0,
    },
    amountText: {
      fontSize: fp(20),
      fontWeight: '600',
      color: theme.colors.text,
    },
    convertIcon: {
      marginHorizontal: rp(20),
      padding: rp(8),
    },
    feeContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
    transferButton: {
      borderRadius: rp(12),
      paddingVertical: rp(16),
      alignItems: 'center',
      justifyContent: 'center',
    },
    transferButtonEnabled: {
      backgroundColor: theme.colors.primary,
    },
    transferButtonDisabled: {
      backgroundColor: theme.colors.surface || '#F8F9FA',
    },
    transferButtonText: {
      fontSize: fp(16),
      fontWeight: '600',
    },
    transferButtonTextEnabled: {
      color: '#FFFFFF',
    },
    transferButtonTextDisabled: {
      color: theme.colors.textSecondary,
    },
  });
