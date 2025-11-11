import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';
import { RootStackParamList } from '@/navigation/navigationTypes';

type AddMoneyScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface PaymentMethod {
  id: string;
  title: string;
  icon: string;
  backgroundColor: string;
  iconColor: string;
  disabled?: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    title: 'Card',
    icon: 'credit-card',
    backgroundColor: '#E3F2FD',
    iconColor: '#1976D2',
  },
  {
    id: 'bank',
    title: 'Bank Transfer',
    icon: 'account-balance',
    backgroundColor: '#F3E5F5',
    iconColor: '#7B1FA2',
  },
  {
    id: 'cash',
    title: 'Cash',
    icon: 'attach-money',
    backgroundColor: '#E8F5E8',
    iconColor: '#388E3C',
  },
  {
    id: 'salary',
    title: 'Receive Salary',
    icon: 'monetization-on',
    backgroundColor: '#FCE4EC',
    iconColor: '#C2185B',
  },
  {
    id: 'crypto',
    title: 'Deposit Crypto',
    icon: 'currency-bitcoin',
    backgroundColor: '#FFF8E1',
    iconColor: '#F57C00',
  },
  {
    id: 'more',
    title: 'More\nComing Soon',
    icon: 'add',
    backgroundColor: '#F5F5F5',
    iconColor: '#9E9E9E',
    disabled: true,
  },
];

export default function AddMoneyScreen() {
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();
  const navigation = useNavigation<AddMoneyScreenNavigationProp>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHomePress = () => {
    // Navigate back to the main screen (Wallet tab)
    navigation.goBack();
  };

  const handleMethodPress = (method: PaymentMethod) => {
    if (method.disabled) return;

    switch (method.id) {
      case 'card':
        navigation.navigate('DepositByCard');
        break;
      case 'bank':
        navigation.navigate('DepositByBank');
        break;
      case 'cash':
        navigation.navigate('DepositCash');
        break;
      case 'salary':
        navigation.navigate('ReceiveSalary');
        break;
      case 'crypto':
        navigation.navigate('DepositCrypto');
        break;
      case 'wallet':
        console.log('Mobile wallet pressed');
        // Navigate to mobile wallet screen
        break;
      default:
        console.log('Method not implemented:', method.id);
    }
  };

  const renderPaymentMethod = (method: PaymentMethod) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles(theme, isRTL).methodCard,
        { backgroundColor: method.backgroundColor },
        method.disabled && styles(theme, isRTL).methodCardDisabled,
      ]}
      onPress={() => handleMethodPress(method)}
      disabled={method.disabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles(theme, isRTL).iconContainer,
          { backgroundColor: method.backgroundColor },
        ]}
      >
        <Icon name={method.icon} size={rp(32)} color={method.iconColor} />
      </View>
      <Text
        style={[
          styles(theme, isRTL).methodTitle,
          {
            color: method.disabled
              ? theme.colors.textSecondary
              : theme.colors.text,
          },
        ]}
        numberOfLines={2}
      >
        {method.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles(theme, isRTL).container}>
      <DynamicHeader
        titleKey="account_top_up"
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

      {/* Content */}
      <ScrollView
        style={styles(theme, isRTL).scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles(theme, isRTL).scrollContent}
      >
        {/* Description */}
        <View style={styles(theme, isRTL).descriptionContainer}>
          <Text style={styles(theme, isRTL).description}>
            {t('add_funds_description')}
          </Text>
        </View>

        {/* Payment Methods Grid */}
        <View style={styles(theme, isRTL).methodsContainer}>
          <View style={styles(theme, isRTL).methodsGrid}>
            {paymentMethods.map(renderPaymentMethod)}
          </View>
        </View>
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
    methodsContainer: {
      flex: 1,
    },
    methodsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: rp(16),
    },
    methodCard: {
      width: '30%',
      aspectRatio: 1,
      borderRadius: rp(16),
      padding: rp(16),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: rp(16),
    },
    methodCardDisabled: {
      opacity: 0.6,
    },
    iconContainer: {
      marginBottom: rp(12),
    },
    methodTitle: {
      fontSize: fp(14),
      fontWeight: '500',
      textAlign: 'center',
      lineHeight: fp(18),
    },
  });
