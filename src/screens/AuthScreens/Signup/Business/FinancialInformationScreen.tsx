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
import { FormInput, FormDropdown } from '@/components/forms';

type FinancialInformationScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const FinancialInformationScreen: React.FC = () => {
  const navigation = useNavigation<FinancialInformationScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    annualTurnover: '',
    monthlyTransactionVolume: '',
    monthlyTransactions: '',
    maxPaymentAmount: '',
    countries: ['United Kingdom'], // Pre-populated with UK as shown in image
  });

  const [isLoading, setIsLoading] = useState(false);

  const turnoverOptions = [
    { label: 'Under $10,000', value: 'under_10k' },
    { label: '$10,000 - $50,000', value: '10k_50k' },
    { label: '$50,000 - $100,000', value: '50k_100k' },
    { label: '$100,000 - $500,000', value: '100k_500k' },
    { label: '$500,000 - $1,000,000', value: '500k_1m' },
    { label: 'Over $1,000,000', value: 'over_1m' },
  ];

  const transactionVolumeOptions = [
    { label: 'Under $1,000', value: 'under_1k' },
    { label: '$1,000 - $5,000', value: '1k_5k' },
    { label: '$5,000 - $10,000', value: '5k_10k' },
    { label: '$10,000 - $25,000', value: '10k_25k' },
    { label: '$25,000 - $50,000', value: '25k_50k' },
    { label: 'Over $50,000', value: 'over_50k' },
  ];

  const transactionCountOptions = [
    { label: '1-10 transactions', value: '1_10' },
    { label: '11-50 transactions', value: '11_50' },
    { label: '51-100 transactions', value: '51_100' },
    { label: '101-500 transactions', value: '101_500' },
    { label: '501-1000 transactions', value: '501_1000' },
    { label: 'Over 1000 transactions', value: 'over_1000' },
  ];

  const countryOptions = [
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'Canada', value: 'CA' },
    { label: 'Australia', value: 'AU' },
    { label: 'Germany', value: 'DE' },
    { label: 'France', value: 'FR' },
    { label: 'Japan', value: 'JP' },
    { label: 'China', value: 'CN' },
    { label: 'India', value: 'IN' },
    { label: 'Brazil', value: 'BR' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCountryAdd = (country: string) => {
    if (!formData.countries.includes(country)) {
      setFormData(prev => ({
        ...prev,
        countries: [...prev.countries, country],
      }));
    }
  };

  const handleCountryRemove = (country: string) => {
    setFormData(prev => ({
      ...prev,
      countries: prev.countries.filter(c => c !== country),
    }));
  };

  const handleContinue = async () => {
    if (!isFormValid()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise<void>(resolve => setTimeout(resolve, 1500));

    // Navigate to next screen (Proof of Nature of Business)
    navigation.navigate('ProofOfNatureOfBusiness');

    setIsLoading(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const isFormValid = () => {
    return (
      formData.annualTurnover &&
      formData.monthlyTransactionVolume &&
      formData.monthlyTransactions &&
      formData.maxPaymentAmount &&
      formData.countries.length > 0
    );
  };

  const renderCountryTag = (country: string) => {
    const countryLabel =
      countryOptions.find(c => c.value === country)?.label || country;

    return (
      <View
        key={country}
        style={[
          styles.countryTag,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <View style={styles.flagIcon}>
          <Text style={styles.flagText}>🇬🇧</Text>
        </View>
        <Text style={[styles.countryTagText, { color: theme.colors.text }]}>
          {countryLabel}
        </Text>
        <TouchableOpacity
          onPress={() => handleCountryRemove(country)}
          style={styles.removeButton}
        >
          <Text
            style={[styles.removeButtonText, { color: theme.colors.error }]}
          >
            ×
          </Text>
        </TouchableOpacity>
      </View>
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
          <Text style={[styles.subtitle, { color: theme.colors.text }]}>
            {t('financial_information')}
          </Text>
          <Text
            style={[styles.description, { color: theme.colors.textSecondary }]}
          >
            {t('financial_information_description')}
          </Text>
        </View>

        {/* Financial Information Form */}
        <View style={styles.formSection}>
          <FormDropdown
            selectedValue={formData.annualTurnover}
            onSelect={(value: string) =>
              handleInputChange('annualTurnover', value)
            }
            options={turnoverOptions}
            placeholder={t('annual_turnover')}
          />

          <FormDropdown
            selectedValue={formData.monthlyTransactionVolume}
            onSelect={(value: string) =>
              handleInputChange('monthlyTransactionVolume', value)
            }
            options={transactionVolumeOptions}
            placeholder={t('monthly_transaction_volume')}
          />

          <FormDropdown
            selectedValue={formData.monthlyTransactions}
            onSelect={(value: string) =>
              handleInputChange('monthlyTransactions', value)
            }
            options={transactionCountOptions}
            placeholder={t('monthly_transactions')}
          />

          <FormInput
            value={formData.maxPaymentAmount}
            onChangeText={(value: string) =>
              handleInputChange('maxPaymentAmount', value)
            }
            placeholder={t('max_payment_amount')}
            keyboardType="numeric"
          />
        </View>

        {/* Countries Section */}
        <View style={styles.countriesSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('countries_conducting_business')}
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              { color: theme.colors.textSecondary },
            ]}
          >
            {t('countries_conducting_business_description')}
          </Text>

          <TouchableOpacity
            style={[
              styles.addCountryButton,
              { borderColor: theme.colors.primary },
            ]}
            onPress={() => {
              // For now, just add a random country for demo
              const randomCountry =
                countryOptions[
                  Math.floor(Math.random() * countryOptions.length)
                ].value;
              handleCountryAdd(randomCountry);
            }}
          >
            <Text
              style={[
                styles.addCountryButtonText,
                { color: theme.colors.primary },
              ]}
            >
              + {t('add_country')}
            </Text>
          </TouchableOpacity>

          {/* Selected Countries */}
          {formData.countries.length > 0 && (
            <View style={styles.countriesContainer}>
              {formData.countries.map(country => renderCountryTag(country))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <StandardButton
          title={`${t('upload_document')} >`}
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
          disabled={!isFormValid()}
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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  formSection: {
    gap: 16,
    marginBottom: 32,
  },
  countriesSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  addCountryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
  },
  addCountryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  countriesContainer: {
    gap: 8,
    marginTop: 8,
  },
  countryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  flagIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagText: {
    fontSize: 16,
  },
  countryTagText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  removeButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
  },
});

export default FinancialInformationScreen;
