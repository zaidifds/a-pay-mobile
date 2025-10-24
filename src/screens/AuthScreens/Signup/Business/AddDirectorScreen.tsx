import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../../navigation/AuthNavigator';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader, StandardButton } from '@/components/ui';
import { FormInput, FormDropdown } from '@/components/forms';
import { DatePicker } from '@/components/forms';

type AddDirectorScreenNavigationProp = StackNavigationProp<AuthStackParamList>;
type AddDirectorScreenRouteProp = RouteProp<AuthStackParamList, 'AddDirector'>;

const AddDirectorScreen: React.FC = () => {
  const navigation = useNavigation<AddDirectorScreenNavigationProp>();
  const route = useRoute<AddDirectorScreenRouteProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    address: '',
    state: '',
    city: '',
    zipCode: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to say', value: 'prefer_not_to_say' },
  ];

  const stateOptions = [
    { label: 'California', value: 'CA' },
    { label: 'New York', value: 'NY' },
    { label: 'Texas', value: 'TX' },
    { label: 'Florida', value: 'FL' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Georgia', value: 'GA' },
    { label: 'North Carolina', value: 'NC' },
    { label: 'Michigan', value: 'MI' },
  ];

  const cityOptions = [
    { label: 'New York', value: 'new_york' },
    { label: 'Los Angeles', value: 'los_angeles' },
    { label: 'Chicago', value: 'chicago' },
    { label: 'Houston', value: 'houston' },
    { label: 'Phoenix', value: 'phoenix' },
    { label: 'Philadelphia', value: 'philadelphia' },
    { label: 'San Antonio', value: 'san_antonio' },
    { label: 'San Diego', value: 'san_diego' },
    { label: 'Dallas', value: 'dallas' },
    { label: 'San Jose', value: 'san_jose' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdd = async () => {
    if (!isFormValid()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise<void>(resolve => setTimeout(resolve, 1500));

    // Navigate back to directors screen
    navigation.goBack();

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
            {t('directors')}
          </Text>
          <Text
            style={[styles.description, { color: theme.colors.textSecondary }]}
          >
            {t('add_all_directors_listed_with_local_registry')}
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <FormInput
            value={formData.firstName}
            onChangeText={(value: string) =>
              handleInputChange('firstName', value)
            }
            placeholder={t('first_name')}
          />

          <FormInput
            value={formData.lastName}
            onChangeText={(value: string) =>
              handleInputChange('lastName', value)
            }
            placeholder={t('last_name')}
          />

          <FormDropdown
            selectedValue={formData.gender}
            onSelect={(value: string) => handleInputChange('gender', value)}
            options={genderOptions}
            placeholder={t('gender')}
          />

          <DatePicker
            value={formData.dob}
            onChangeText={(date: string) => handleInputChange('dob', date)}
            placeholder={t('dob')}
            mode="date"
          />

          <FormInput
            value={formData.address}
            onChangeText={(value: string) =>
              handleInputChange('address', value)
            }
            placeholder={t('address')}
          />

          <FormDropdown
            selectedValue={formData.state}
            onSelect={(value: string) => handleInputChange('state', value)}
            options={stateOptions}
            placeholder={t('state')}
          />

          <FormDropdown
            selectedValue={formData.city}
            onSelect={(value: string) => handleInputChange('city', value)}
            options={cityOptions}
            placeholder={t('select_city')}
          />

          <FormInput
            value={formData.zipCode}
            onChangeText={(value: string) =>
              handleInputChange('zipCode', value)
            }
            placeholder={t('zip_code')}
            keyboardType="numeric"
          />
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <StandardButton
          title={t('add')}
          onPress={handleAdd}
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

export default AddDirectorScreen;
