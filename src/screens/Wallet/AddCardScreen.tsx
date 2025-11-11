import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';
import { FormInput } from '@/components/forms';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { addCard, clearError, CardFormData } from '@/redux/slices/cardSlice';

interface FormData {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  saveCard: boolean;
}

interface FormErrors {
  cardNumber?: string;
  cardHolderName?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
}

export default function AddCardScreen() {
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { isSubmitting, error } = useAppSelector(state => state.card);

  const [formData, setFormData] = useState<FormData>({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    saveCard: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Clear error when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Handle Redux error
  useEffect(() => {
    if (error) {
      Alert.alert(t('error'), error);
    }
  }, [error, t]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleHomePress = useCallback(() => {
    // Navigate back to the main screen (Wallet tab)
    navigation.goBack();
  }, [navigation]);

  const formatCardNumber = useCallback((text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.substring(0, 19);
  }, []);

  const formatExpiryDate = useCallback((text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  }, []);

  const getCardType = useCallback((cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'Visa';
    if (cleaned.startsWith('5')) return 'Mastercard';
    if (cleaned.startsWith('3')) return 'American Express';
    return 'Card';
  }, []);

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string) => {
      let formattedValue = value;

      if (field === 'cardNumber') {
        formattedValue = formatCardNumber(value);
      } else if (field === 'expiryDate') {
        formattedValue = formatExpiryDate(value);
      } else if (field === 'cvv') {
        formattedValue = value.replace(/\D/g, '').substring(0, 3);
      }

      setFormData(prev => ({
        ...prev,
        [field]: formattedValue,
      }));

      // Auto-fill card name when card number changes
      if (field === 'cardNumber' && formattedValue.length > 0) {
        const cardType = getCardType(formattedValue);
        setFormData(prev => ({
          ...prev,
          cardNumber: formattedValue,
          cardName: `${cardType} ${t('cards')}`,
        }));
      }

      // Clear field error when user starts typing
      if (field !== 'saveCard' && errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    },
    [formatCardNumber, formatExpiryDate, getCardType, errors, t],
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (
      !formData.cardNumber ||
      formData.cardNumber.replace(/\s/g, '').length < 16
    ) {
      newErrors.cardNumber = t('card_validation_error');
    }

    if (!formData.cardHolderName.trim()) {
      newErrors.cardHolderName = t('card_validation_error');
    }

    if (!formData.expiryDate || formData.expiryDate.length !== 5) {
      newErrors.expiryDate = t('card_validation_error');
    }

    if (!formData.cvv || formData.cvv.length !== 3) {
      newErrors.cvv = t('card_validation_error');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t]);

  const toggleSaveCard = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      saveCard: !prev.saveCard,
    }));
  }, []);

  const handleAddCard = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    const cardData: CardFormData = {
      cardNumber: formData.cardNumber,
      cardHolderName: formData.cardHolderName,
      expiryDate: formData.expiryDate,
      cvv: formData.cvv,
      cardName: formData.cardName,
      saveCard: formData.saveCard,
    };

    try {
      await dispatch(addCard(cardData)).unwrap();
      setShowSuccessModal(true);
    } catch (err) {
      // Error is handled by useEffect
      console.log('Card addition failed:', err);
    }
  }, [formData, validateForm, dispatch]);

  const handleSuccessModalClose = useCallback(() => {
    setShowSuccessModal(false);
    navigation.goBack();
  }, [navigation]);

  const isFormValid = useCallback(() => {
    return (
      formData.cardNumber.replace(/\s/g, '').length >= 16 &&
      formData.cardHolderName.trim().length > 0 &&
      formData.expiryDate.length === 5 &&
      formData.cvv.length === 3
    );
  }, [formData]);

  const renderCardTypeIndicator = () => {
    if (!formData.cardNumber) return null;

    return (
      <View style={[styles(theme, isRTL).cardTypeContainer]}>
        <Text style={styles(theme, isRTL).cardTypeText}>VISA</Text>
      </View>
    );
  };

  const renderSuccessModal = () => (
    <Modal
      visible={showSuccessModal}
      transparent
      animationType="fade"
      onRequestClose={handleSuccessModalClose}
    >
      <View style={styles(theme, isRTL).modalOverlay}>
        <View style={styles(theme, isRTL).modalContainer}>
          <TouchableOpacity
            style={styles(theme, isRTL).modalCloseButton}
            onPress={handleSuccessModalClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="close"
              size={rp(24)}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>

          <View style={styles(theme, isRTL).modalContent}>
            <View style={styles(theme, isRTL).successIconContainer}>
              <Icon
                name="credit-card"
                size={rp(48)}
                color={theme.colors.primary}
              />
              <View style={styles(theme, isRTL).checkmarkContainer}>
                <Icon
                  name="check-circle"
                  size={rp(20)}
                  color={theme.colors.success || '#4CAF50'}
                />
              </View>
            </View>

            <Text style={styles(theme, isRTL).successTitle}>
              {t('card_added_successfully')}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles(theme, isRTL).container}>
      <DynamicHeader
        titleKey="add_card"
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
            {t('add_card_description')}
          </Text>
        </View>

        {/* Form */}
        <View style={styles(theme, isRTL).formContainer}>
          {/* Card Number */}
          <View style={styles(theme, isRTL).inputContainer}>
            <FormInput
              placeholder={t('card_number')}
              value={formData.cardNumber}
              onChangeText={text => handleInputChange('cardNumber', text)}
              keyboardType="numeric"
              error={errors.cardNumber}
              rightIcon={renderCardTypeIndicator()}
            />
          </View>

          {/* Card Holder Name */}
          <FormInput
            placeholder={t('card_holder_name')}
            value={formData.cardHolderName}
            onChangeText={text => handleInputChange('cardHolderName', text)}
            error={errors.cardHolderName}
          />

          {/* Expiry Date and CVV Row */}
          <View style={styles(theme, isRTL).rowContainer}>
            <View style={styles(theme, isRTL).halfInputContainer}>
              <FormInput
                placeholder={t('expiry_date')}
                value={formData.expiryDate}
                onChangeText={text => handleInputChange('expiryDate', text)}
                keyboardType="numeric"
                error={errors.expiryDate}
              />
            </View>

            <View style={styles(theme, isRTL).halfInputContainer}>
              <FormInput
                placeholder={t('cvv')}
                value={formData.cvv}
                onChangeText={text => handleInputChange('cvv', text)}
                keyboardType="numeric"
                secureTextEntry
                error={errors.cvv}
              />
            </View>
          </View>

          {/* Save Card Name */}
          <FormInput
            placeholder={t('save_card_name')}
            value={formData.cardName}
            onChangeText={text => handleInputChange('cardName', text)}
          />

          {/* Save Card Checkbox */}
          <TouchableOpacity
            style={styles(theme, isRTL).checkboxContainer}
            onPress={toggleSaveCard}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles(theme, isRTL).checkbox,
                formData.saveCard && styles(theme, isRTL).checkboxChecked,
              ]}
            >
              {formData.saveCard && (
                <Icon name="check" size={rp(16)} color="#FFFFFF" />
              )}
            </View>
            <Text style={styles(theme, isRTL).checkboxLabel}>
              {t('save_card_for_future')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Card Button */}
      <View style={styles(theme, isRTL).buttonContainer}>
        <TouchableOpacity
          style={[
            styles(theme, isRTL).addCardButton,
            isFormValid()
              ? styles(theme, isRTL).addCardButtonEnabled
              : styles(theme, isRTL).addCardButtonDisabled,
          ]}
          onPress={handleAddCard}
          disabled={!isFormValid() || isSubmitting}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles(theme, isRTL).buttonText,
              isFormValid()
                ? styles(theme, isRTL).buttonTextEnabled
                : styles(theme, isRTL).buttonTextDisabled,
            ]}
          >
            {isSubmitting ? t('adding_card') : t('add_card')}
          </Text>
        </TouchableOpacity>
      </View>

      {renderSuccessModal()}
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
      flexGrow: 1,
      paddingHorizontal: rp(20),
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
    formContainer: {
      flex: 1,
    },
    inputContainer: {
      position: 'relative',
    },
    cardTypeContainer: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: rp(8),
      paddingVertical: rp(2),
      borderRadius: rp(4),
    },
    cardTypeText: {
      fontSize: fp(12),
      fontWeight: '600',
      color: '#FFFFFF',
    },
    rowContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      gap: rp(12),
    },
    halfInputContainer: {
      flex: 1,
    },
    checkboxContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginTop: rp(8),
      marginBottom: rp(32),
    },
    checkbox: {
      width: rp(20),
      height: rp(20),
      borderRadius: rp(4),
      borderWidth: 2,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: isRTL ? 0 : rp(12),
      marginLeft: isRTL ? rp(12) : 0,
    },
    checkboxChecked: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    checkboxLabel: {
      fontSize: fp(16),
      color: theme.colors.text,
      textAlign: isRTL ? 'right' : 'left',
    },
    buttonContainer: {
      paddingHorizontal: rp(20),
      paddingVertical: rp(20),
      backgroundColor: theme.colors.background,
    },
    addCardButton: {
      height: rp(56),
      borderRadius: rp(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    addCardButtonEnabled: {
      backgroundColor: theme.colors.primary,
    },
    addCardButtonDisabled: {
      backgroundColor: theme.colors.disabled || '#E0E0E0',
    },
    buttonText: {
      fontSize: fp(16),
      fontWeight: '600',
    },
    buttonTextEnabled: {
      color: '#FFFFFF',
    },
    buttonTextDisabled: {
      color: theme.colors.textSecondary,
    },
    // Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: rp(40),
    },
    modalContainer: {
      backgroundColor: theme.colors.surface || theme.colors.background,
      borderRadius: rp(16),
      padding: rp(24),
      width: '100%',
      maxWidth: rp(320),
      position: 'relative',
    },
    modalCloseButton: {
      position: 'absolute',
      top: rp(16),
      right: isRTL ? undefined : rp(16),
      left: isRTL ? rp(16) : undefined,
      zIndex: 1,
    },
    modalContent: {
      alignItems: 'center',
      paddingTop: rp(16),
    },
    successIconContainer: {
      position: 'relative',
      marginBottom: rp(20),
    },
    checkmarkContainer: {
      position: 'absolute',
      bottom: -rp(4),
      right: isRTL ? undefined : -rp(4),
      left: isRTL ? -rp(4) : undefined,
      backgroundColor: theme.colors.surface || theme.colors.background,
      borderRadius: rp(12),
      padding: rp(2),
    },
    successTitle: {
      fontSize: fp(18),
      fontWeight: '600',
      color: theme.colors.primary,
      textAlign: 'center',
    },
  });
