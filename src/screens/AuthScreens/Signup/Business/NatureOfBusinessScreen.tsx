import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../../navigation/AuthNavigator';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader, StandardButton } from '@/components/ui';
import { FormInput, FormDropdown } from '@/components/forms';

type NatureOfBusinessScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const NatureOfBusinessScreen: React.FC = () => {
  const navigation = useNavigation<NatureOfBusinessScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  console.log('NatureOfBusinessScreen mounted!');

  const [formData, setFormData] = useState({
    businessCategory: '',
    subCategory: '',
    isRegulated: '',
    howDoYouSell: '',
    whoAreYourCustomers: '',
    numberOfEmployees: '',
    businessDescription: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Dropdown options
  const businessCategories = [
    { label: 'Technology', value: 'technology' },
    { label: 'Finance', value: 'finance' },
    { label: 'Healthcare', value: 'healthcare' },
    { label: 'Retail', value: 'retail' },
    { label: 'Manufacturing', value: 'manufacturing' },
    { label: 'Services', value: 'services' },
    { label: 'Education', value: 'education' },
    { label: 'Real Estate', value: 'real_estate' },
    { label: 'Transportation', value: 'transportation' },
    { label: 'Other', value: 'other' },
  ];

  const subCategories = [
    { label: 'Software Development', value: 'software_dev' },
    { label: 'E-commerce', value: 'ecommerce' },
    { label: 'Consulting', value: 'consulting' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Sales', value: 'sales' },
    { label: 'Support Services', value: 'support' },
    { label: 'Other', value: 'other' },
  ];

  const regulatedOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
    { label: 'Not sure', value: 'not_sure' },
  ];

  const howDoYouSellOptions = [
    { label: 'Online only', value: 'online_only' },
    { label: 'Physical stores only', value: 'physical_only' },
    { label: 'Both online and physical', value: 'both' },
    { label: 'B2B sales', value: 'b2b' },
    { label: 'Direct sales', value: 'direct' },
    { label: 'Other', value: 'other' },
  ];

  const customerOptions = [
    { label: 'Individual consumers', value: 'consumers' },
    { label: 'Small businesses', value: 'small_business' },
    { label: 'Large corporations', value: 'corporations' },
    { label: 'Government agencies', value: 'government' },
    { label: 'Non-profit organizations', value: 'nonprofit' },
    { label: 'Mix of all types', value: 'mixed' },
  ];

  const employeeOptions = [
    { label: '1-5 employees', value: '1-5' },
    { label: '6-10 employees', value: '6-10' },
    { label: '11-25 employees', value: '11-25' },
    { label: '26-50 employees', value: '26-50' },
    { label: '51-100 employees', value: '51-100' },
    // { label: '100+ employees', value: '100+' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = async () => {
    if (!isFormValid()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise<void>(resolve => setTimeout(resolve, 1500));

    // Navigate to next screen (Financial Information)
    navigation.navigate('FinancialInformation');

    setIsLoading(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
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
            {t('nature_of_business')}
          </Text>
          <Text
            style={[styles.description, { color: theme.colors.textSecondary }]}
          >
            {t('tell_us_more_about_business')}
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <FormDropdown
            selectedValue={formData.businessCategory}
            onSelect={(value: string) =>
              handleInputChange('businessCategory', value)
            }
            options={businessCategories}
            placeholder={t('business_category')}
          />

          <FormDropdown
            selectedValue={formData.subCategory}
            onSelect={(value: string) =>
              handleInputChange('subCategory', value)
            }
            options={subCategories}
            placeholder={t('sub_category_of_business')}
          />

          <FormDropdown
            selectedValue={formData.isRegulated}
            onSelect={(value: string) =>
              handleInputChange('isRegulated', value)
            }
            options={regulatedOptions}
            placeholder={t('is_your_business_regulated')}
          />

          <FormDropdown
            selectedValue={formData.howDoYouSell}
            onSelect={(value: string) =>
              handleInputChange('howDoYouSell', value)
            }
            options={howDoYouSellOptions}
            placeholder={t('how_do_you_sell_products_services')}
          />

          <FormDropdown
            selectedValue={formData.whoAreYourCustomers}
            onSelect={(value: string) =>
              handleInputChange('whoAreYourCustomers', value)
            }
            options={customerOptions}
            placeholder={t('who_are_your_customers')}
          />

          <FormDropdown
            selectedValue={formData.numberOfEmployees}
            onSelect={(value: string) =>
              handleInputChange('numberOfEmployees', value)
            }
            options={employeeOptions}
            placeholder={t('no_of_employees')}
          />

          <FormInput
            value={formData.businessDescription}
            onChangeText={(value: string) =>
              handleInputChange('businessDescription', value)
            }
            placeholder={t('business_description')}
            multiline
            numberOfLines={4}
          />
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <StandardButton
          title={`${t('financial_information')} >`}
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
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
  },
});

export default NatureOfBusinessScreen;
