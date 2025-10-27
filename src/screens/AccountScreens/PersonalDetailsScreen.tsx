import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '@/navigation/navigationTypes';
import useTranslation from '@/localization/useTranslation';
import useTheme from '@/hooks/useTheme';
import { DynamicHeader } from '@/components/ui';
import DatePicker from '@/components/forms/DatePicker';
import FormInput from '@/components/forms/FormInput';
import PhoneInput, { ICountry } from 'react-native-international-phone-number';

const PersonalDetailsScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Cara Dune',
    birthDate: '1990-01-01',
    residentialAddress: '15 High Street',
    phoneNumber: '123 456 7890',
    email: 'caradune@microsoft.com',
  });
  const [selectedCountry, setSelectedCountry] = useState<ICountry | undefined>(
    undefined,
  );
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Data saved:', formData);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCountrySelect = (country: ICountry) => {
    setSelectedCountry(country);
  };

  const handlePhoneChange = (phoneNumber: string) => {
    setFormData(prev => ({ ...prev, phoneNumber }));
  };

  return (
    <View style={styles.container}>
      <DynamicHeader
        title={t('personal_details')}
        showBackButton
        backButtonIcon="←"
        onBackPress={handleBack}
        rightContent={
          <TouchableOpacity
            style={styles.editButton}
            onPress={isEditing ? handleSave : handleEdit}
            activeOpacity={0.8}
          >
            <Text style={styles.editIcon}>{isEditing ? '✓' : '✏️'}</Text>
            <Text style={styles.editButtonText}>
              {isEditing ? t('save') : t('edit')}
            </Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Full Name */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Full Name</Text>
          {isEditing ? (
            <FormInput
              placeholder="Enter full name"
              value={formData.fullName}
              onChangeText={value => updateField('fullName', value)}
              style={styles.formInputStyle}
              keyboardType="default"
            />
          ) : (
            <Text style={styles.value}>{formData.fullName}</Text>
          )}
        </View>

        {/* Birth Date */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Birth Date</Text>
          {isEditing ? (
            <View
              style={[
                styles.datePickerWrapper,
                focusedField === 'birthDate' && styles.focusedInputWrapper,
              ]}
            >
              <DatePicker
                placeholder="Select birth date"
                value={formData.birthDate}
                onChangeText={value => updateField('birthDate', value)}
                mode="date"
                onFocus={() => setFocusedField('birthDate')}
                onBlur={() => setFocusedField(null)}
              />
            </View>
          ) : (
            <Text style={styles.value}>{formData.birthDate}</Text>
          )}
        </View>

        {/* Residential Address */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Residential Address</Text>
          {isEditing ? (
            <FormInput
              placeholder="Enter address"
              value={formData.residentialAddress}
              onChangeText={value => updateField('residentialAddress', value)}
              style={styles.formInputStyle}
              keyboardType="default"
            />
          ) : (
            <Text style={styles.value}>{formData.residentialAddress}</Text>
          )}
        </View>

        {/* Phone Number */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phone No.</Text>
          {isEditing ? (
            <View style={styles.phoneInputWrapper}>
              <PhoneInput
                value={formData.phoneNumber}
                onChangePhoneNumber={handlePhoneChange}
                selectedCountry={selectedCountry}
                onChangeSelectedCountry={handleCountrySelect}
                defaultCountry="GB"
                placeholder="123 456 7890"
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                phoneInputStyles={{
                  container: [
                    styles.phoneInputContainer,
                    {
                      borderColor:
                        focusedField === 'phone'
                          ? theme.colors.primary
                          : '#E5E5EA',
                      backgroundColor: '#F2F2F7',
                      shadowColor:
                        focusedField === 'phone'
                          ? theme.colors.primary
                          : 'transparent',
                      shadowOffset: {
                        width: 0,
                        height: focusedField === 'phone' ? 2 : 0,
                      },
                      shadowOpacity: focusedField === 'phone' ? 0.15 : 0,
                      shadowRadius: focusedField === 'phone' ? 4 : 0,
                      elevation: focusedField === 'phone' ? 3 : 0,
                    },
                  ],
                  flagContainer: {
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor: '#E5E5EA',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    minWidth: 100,
                  },
                  flag: {
                    fontSize: 18,
                    marginRight: 8,
                  },
                  callingCode: {
                    color: '#000000',
                    fontSize: 16,
                    fontWeight: '600',
                  },
                  caret: {
                    color: '#8E8E93',
                  },
                }}
              />
            </View>
          ) : (
            <Text style={styles.value}>{formData.phoneNumber}</Text>
          )}
        </View>

        {/* Email */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          {isEditing ? (
            <FormInput
              placeholder="Enter email"
              value={formData.email}
              onChangeText={value => updateField('email', value)}
              style={styles.formInputStyle}
              keyboardType="email-address"
            />
          ) : (
            <Text style={styles.value}>{formData.email}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  editButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
    fontWeight: '400',
  },
  formInputStyle: {
    marginBottom: 0,
  },
  datePickerWrapper: {
    marginBottom: 0,
    borderRadius: 10,
  },
  focusedInputWrapper: {
    borderWidth: 1.5,
    borderColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  value: {
    height: 50,
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#8E8E93',
    lineHeight: 50,
  },
  phoneInputWrapper: {
    marginTop: 0,
  },
  phoneInputContainer: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E5E5EA',
  },
});

export default PersonalDetailsScreen;
