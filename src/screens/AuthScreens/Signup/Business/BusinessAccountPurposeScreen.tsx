import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../../navigation/AuthNavigator';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';

type BusinessAccountPurposeScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const BusinessAccountPurposeScreen: React.FC = () => {
  const navigation =
    useNavigation<BusinessAccountPurposeScreenNavigationProp>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);

  const purposeOptions = [
    { id: 'receive_payments', label: t('receive_payments_from_customers') },
    { id: 'everyday_purchases', label: t('make_everyday_purchases') },
    { id: 'pay_suppliers', label: t('pay_suppliers_and_employees') },
    { id: 'manage_currencies', label: t('manage_multiple_currencies') },
    { id: 'pay_salaries', label: t('to_pay_salaries') },
    { id: 'expense_management', label: t('for_expense_management') },
    { id: 'invoice_issuance', label: t('for_invoice_issuance') },
  ];

  const handlePurposeToggle = (purposeId: string) => {
    setSelectedPurposes(prev => {
      if (prev.includes(purposeId)) {
        return prev.filter(id => id !== purposeId);
      } else {
        return [...prev, purposeId];
      }
    });
  };

  const handleContinue = () => {
    if (selectedPurposes.length > 0) {
      navigation.navigate('BusinessAccountRole');
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const getCheckboxStyles = (purposeId: string) => {
    const isSelected = selectedPurposes.includes(purposeId);
    return {
      backgroundColor: isSelected ? theme.colors.primary : theme.colors.input,
      borderColor: isSelected ? theme.colors.primary : theme.colors.inputBorder,
    };
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <DynamicHeader
        title={t('business_account')}
        showBackButton
        backButtonIcon="←"
        showRightButton
        rightButtonText={t('sign_in')}
        onBackPress={() => navigation.goBack()}
        onRightPress={handleSignIn}
      />

      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title */}
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {t('business_account')}
          </Text>

          {/* Question */}
          <Text style={[styles.question, { color: theme.colors.text }]}>
            {t('what_would_you_like_to_do_with_orby_business')}
          </Text>

          {/* Purpose Options */}
          <View style={styles.optionsContainer}>
            {purposeOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionItem,
                  {
                    borderColor: selectedPurposes.includes(option.id)
                      ? theme.colors.primary
                      : theme.colors.inputBorder,
                    backgroundColor: theme.colors.input,
                    shadowColor: theme.colors.shadowColor,
                  },
                ]}
                onPress={() => handlePurposeToggle(option.id)}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <View style={[styles.checkbox, getCheckboxStyles(option.id)]}>
                    {selectedPurposes.includes(option.id) && (
                      <Text
                        style={[
                          styles.checkmark,
                          { color: theme.colors.buttonText },
                        ]}
                      >
                        ✓
                      </Text>
                    )}
                  </View>
                  <Text
                    style={[styles.optionText, { color: theme.colors.text }]}
                  >
                    {option.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Continue Button - Fixed at bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                backgroundColor:
                  selectedPurposes.length > 0
                    ? theme.colors.primary
                    : theme.colors.buttonDisabled,
                shadowColor: theme.colors.shadowColor,
              },
            ]}
            onPress={handleContinue}
            disabled={selectedPurposes.length === 0}
          >
            <Text
              style={[
                styles.continueButtonText,
                {
                  color:
                    selectedPurposes.length > 0
                      ? theme.colors.buttonText
                      : theme.colors.textSecondary,
                },
              ]}
            >
              {t('continue')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerRTL: {
    flexDirection: 'row-reverse',
  },
  backButton: {
    padding: 8,
  },
  backButtonRTL: {
    transform: [{ scaleX: -1 }],
  },
  backIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  signInLink: {
    fontSize: 16,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'left',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'left',
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 32,
  },
  optionItem: {
    borderWidth: 1.5,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  checkmark: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    textAlign: 'left',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  continueButton: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BusinessAccountPurposeScreen;
