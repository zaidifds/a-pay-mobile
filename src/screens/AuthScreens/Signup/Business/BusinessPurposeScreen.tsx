import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../../navigation/AuthNavigator';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader, StandardButton } from '@/components/ui';

type BusinessPurposeScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const BusinessPurposeScreen: React.FC = () => {
  const navigation = useNavigation<BusinessPurposeScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const businessActivities = [
    { id: 'receive_payments', label: t('receive_payments_from_customers') },
    { id: 'everyday_purchases', label: t('make_everyday_purchases') },
    { id: 'pay_suppliers', label: t('pay_suppliers_and_employees') },
    { id: 'manage_currencies', label: t('manage_multiple_currencies') },
    { id: 'pay_salaries', label: t('to_pay_salaries') },
    { id: 'expense_management', label: t('for_expense_management') },
    { id: 'invoice_issuance', label: t('for_invoice_issuance') },
  ];

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  const handleContinue = async () => {
    if (selectedOptions.length === 0) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise<void>(resolve => setTimeout(resolve, 1500));

    // Navigate to next screen (Nature of Business - dropdown form)
    navigation.navigate('NatureOfBusiness');

    setIsLoading(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderOptionCard = (option: any) => {
    const isSelected = selectedOptions.includes(option.id);

    return (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.optionCard,
          {
            backgroundColor: theme.colors.surface,
            borderColor: isSelected
              ? theme.colors.primary
              : theme.colors.border,
            shadowColor: theme.colors.shadowColor,
          },
          isSelected && styles.selectedCard,
        ]}
        onPress={() => handleOptionToggle(option.id)}
        activeOpacity={0.7}
      >
        <View style={styles.optionContent}>
          <View
            style={[
              styles.checkbox,
              {
                backgroundColor: isSelected
                  ? theme.colors.primary
                  : 'transparent',
                borderColor: isSelected
                  ? theme.colors.primary
                  : theme.colors.border,
              },
            ]}
          >
            {isSelected && (
              <Text
                style={[styles.checkmark, { color: theme.colors.buttonText }]}
              >
                ✓
              </Text>
            )}
          </View>

          <Text style={[styles.optionLabel, { color: theme.colors.text }]}>
            {option.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DynamicHeader
        title={t('business_account')}
        showBackButton
        backButtonIcon="←"
        onBackPress={handleBack}
        rightButtonText={t('sign_in')}
        onRightPress={() => navigation.navigate('Login')}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {t('business_account')}
          </Text>
          <Text style={[styles.question, { color: theme.colors.text }]}>
            {t('what_would_you_like_to_do_with_orby_business')}
          </Text>
        </View>

        {/* Options Section */}
        <View style={styles.optionsSection}>
          {businessActivities.map(option => renderOptionCard(option))}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <StandardButton
          title={t('continue')}
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
          disabled={selectedOptions.length === 0}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  question: {
    fontSize: 18,
    lineHeight: 24,
  },
  optionsSection: {
    gap: 12,
  },
  optionCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  checkmark: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
  },
});

export default BusinessPurposeScreen;
