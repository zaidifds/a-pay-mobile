import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';
import { useAppSelector } from '@/redux/store';
import { Card } from '@/redux/slices/cardSlice';
import { RootStackParamList } from '@/navigation/navigationTypes';

type DepositByCardScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

export default function DepositByCardScreen() {
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();
  const navigation = useNavigation<DepositByCardScreenNavigationProp>();

  const { cards } = useAppSelector(state => state.card);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHomePress = () => {
    // Navigate back to the main screen (Wallet tab)
    navigation.goBack();
  };

  const handleAddCardPress = () => {
    navigation.navigate('AddCard');
  };

  const handleCardPress = (card: Card) => {
    console.log('Card selected:', card.id);
    // Here you can navigate to deposit amount screen or handle card selection
  };

  const getCardColor = (cardType: Card['cardType']) => {
    switch (cardType) {
      case 'Visa':
        return ['#1e3a8a', '#3b82f6']; // Blue gradient for Visa
      case 'Mastercard':
        return ['#dc2626', '#ef4444']; // Red gradient for Mastercard
      case 'American Express':
        return ['#059669', '#10b981']; // Green gradient for Amex
      default:
        return ['#374151', '#6b7280']; // Gray gradient for default
    }
  };

  const renderCard = ({ item }: { item: Card }) => {
    const [startColor, endColor] = getCardColor(item.cardType);

    return (
      <TouchableOpacity
        style={styles(theme, isRTL).cardContainer}
        onPress={() => handleCardPress(item)}
        activeOpacity={0.9}
      >
        <View
          style={[
            styles(theme, isRTL).creditCard,
            { backgroundColor: endColor },
          ]}
        >
          {/* Card Background Gradient Effect */}
          <View
            style={[
              styles(theme, isRTL).cardGradient,
              { backgroundColor: startColor },
            ]}
          />

          {/* Top Row - Chip and Card Type */}
          <View style={styles(theme, isRTL).cardTopRow}>
            <View style={styles(theme, isRTL).chipContainer}>
              <Icon
                name="credit-card"
                size={rp(20)}
                color="rgba(255,255,255,0.9)"
              />
            </View>
            <Text style={styles(theme, isRTL).cardBrand}>
              {item.cardType.toUpperCase()}
            </Text>
          </View>

          {/* Card Number */}
          <View style={styles(theme, isRTL).cardNumberContainer}>
            <Text style={styles(theme, isRTL).creditCardNumber}>
              {item.cardNumber}
            </Text>
          </View>

          {/* Bottom Row - Name and Expiry */}
          <View style={styles(theme, isRTL).cardBottomRow}>
            <Text style={styles(theme, isRTL).cardHolderName}>
              {item.cardHolderName.toUpperCase()}
            </Text>
            <Text style={styles(theme, isRTL).cardExpiryDate}>
              {item.expiryDate}
            </Text>
          </View>

          {/* Default Card Indicator */}
          {item.isDefault && (
            <View style={styles(theme, isRTL).defaultIndicator}>
              <View style={styles(theme, isRTL).defaultDot} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles(theme, isRTL).container}>
      <DynamicHeader
        titleKey="deposit_by_card"
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
        <View style={styles(theme, isRTL).descriptionContainer}>
          <Text style={styles(theme, isRTL).description}>
            {t('deposit_by_card_description')}
          </Text>
        </View>

        {cards.length > 0 ? (
          /* Cards List */
          <FlatList
            data={cards}
            renderItem={renderCard}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles(theme, isRTL).cardsList}
          />
        ) : (
          /* Empty State */
          <View style={styles(theme, isRTL).emptyStateContainer}>
            <View style={styles(theme, isRTL).emptyStateContent}>
              <Text style={styles(theme, isRTL).emptyStateTitle}>
                {t('no_card_added')}
              </Text>
              <Text style={styles(theme, isRTL).emptyStateSubtitle}>
                {t('cards_will_show_here')}
              </Text>
            </View>
          </View>
        )}

        {/* Add Card Button */}
        <View style={styles(theme, isRTL).buttonContainer}>
          <TouchableOpacity
            style={styles(theme, isRTL).addCardButton}
            onPress={handleAddCardPress}
            activeOpacity={0.8}
          >
            <Icon
              name="credit-card"
              size={rp(20)}
              color="#FFFFFF"
              style={styles(theme, isRTL).buttonIcon}
            />
            <Text style={styles(theme, isRTL).buttonText}>{t('add_card')}</Text>
          </TouchableOpacity>
        </View>
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
      paddingBottom: rp(40),
    },
    descriptionContainer: {
      marginBottom: rp(24),
    },
    description: {
      fontSize: fp(16),
      lineHeight: fp(24),
      color: theme.colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
    },
    cardsList: {
      paddingVertical: rp(16),
    },
    cardContainer: {
      marginBottom: rp(20),
    },
    creditCard: {
      width: '100%',
      height: rp(200),
      borderRadius: rp(16),
      padding: rp(20),
      position: 'relative',
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 12,
    },
    cardGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.7,
      borderRadius: rp(16),
    },
    cardTopRow: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: rp(20),
      zIndex: 2,
    },
    chipContainer: {
      width: rp(32),
      height: rp(24),
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: rp(4),
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardBrand: {
      fontSize: fp(14),
      fontWeight: '700',
      color: '#FFFFFF',
      letterSpacing: 1,
    },
    cardNumberContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: isRTL ? 'flex-end' : 'flex-start',
      marginBottom: rp(20),
      zIndex: 2,
    },
    creditCardNumber: {
      fontSize: fp(20),
      fontWeight: '600',
      color: '#FFFFFF',
      letterSpacing: 2,
      fontFamily: 'monospace',
      textAlign: isRTL ? 'right' : 'left',
    },
    cardBottomRow: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      zIndex: 2,
    },
    cardHolderName: {
      fontSize: fp(12),
      fontWeight: '600',
      color: 'rgba(255,255,255,0.9)',
      letterSpacing: 1,
      textAlign: isRTL ? 'right' : 'left',
      maxWidth: '60%',
    },
    cardExpiryDate: {
      fontSize: fp(12),
      fontWeight: '600',
      color: 'rgba(255,255,255,0.9)',
      letterSpacing: 1,
      textAlign: isRTL ? 'left' : 'right',
    },
    defaultIndicator: {
      position: 'absolute',
      top: rp(16),
      right: isRTL ? undefined : rp(16),
      left: isRTL ? rp(16) : undefined,
      zIndex: 3,
    },
    defaultDot: {
      width: rp(12),
      height: rp(12),
      borderRadius: rp(6),
      backgroundColor: '#4CAF50',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    emptyStateContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: rp(60),
    },
    emptyStateContent: {
      alignItems: 'center',
      marginBottom: rp(40),
    },
    emptyStateTitle: {
      fontSize: fp(18),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(8),
      textAlign: 'center',
    },
    emptyStateSubtitle: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: fp(20),
    },
    buttonContainer: {
      alignItems: 'center',
      paddingTop: rp(20),
    },
    addCardButton: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      paddingVertical: rp(14),
      paddingHorizontal: rp(32),
      borderRadius: rp(8),
      shadowColor: theme.colors.shadowColor || '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    buttonIcon: {
      marginRight: isRTL ? 0 : rp(8),
      marginLeft: isRTL ? rp(8) : 0,
    },
    buttonText: {
      fontSize: fp(16),
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });
