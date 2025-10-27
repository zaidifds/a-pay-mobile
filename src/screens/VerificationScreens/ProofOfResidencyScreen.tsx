import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';
import FormDropdown from '@/components/forms/FormDropdown';
import Svg, { Path } from 'react-native-svg';
import { VerificationNavigatorParamList } from '@/navigation/VerificationNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

// Document Type Icons
const PassportIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 17C14.66 17 17 14.66 17 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IdentityCardIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 17H17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DrivingLicenseIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 10H16M8 14H14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 7H17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DigitalDocumentIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 2V8H20"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 5L16 12L9 19"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProofOfResidencyScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<VerificationNavigatorParamList>>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  const [selectedNationality, setSelectedNationality] =
    useState('united_kingdom');

  const nationalityOptions = [
    {
      label: t('united_kingdom' as any),
      value: 'united_kingdom',
      icon: '🇬🇧',
    },
    {
      label: t('united_states' as any),
      value: 'united_states',
      icon: '🇺🇸',
    },
    {
      label: t('canada' as any),
      value: 'canada',
      icon: '🇨🇦',
    },
    {
      label: t('australia' as any),
      value: 'australia',
      icon: '🇦🇺',
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNationalitySelect = (value: string) => {
    setSelectedNationality(value);
  };

  const handleDocumentSelect = (documentType: string) => {
    if (documentType === 'digital_document') {
      navigation.navigate('FacialIdentityVerificationScreen');
    } else {
      navigation.navigate('IdentityCardUploadScreen');
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DynamicHeader showBackButton onBackPress={handleBack} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {t('proof_of_residency')}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text
            style={[
              styles.description,
              { color: theme.colors.textSecondary },
              { textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            {t('proof_of_residency_description')}
          </Text>
          <Text
            style={[
              styles.description,
              { color: theme.colors.textSecondary },
              { textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            {t('prove_us_residency')}
          </Text>
        </View>

        {/* Nationality Section */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.colors.text },
              { textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            {t('nationality')}
          </Text>
          <FormDropdown
            placeholder="Select nationality"
            options={nationalityOptions}
            selectedValue={selectedNationality}
            onSelect={handleNationalitySelect}
          />
        </View>

        {/* Method of Verification Section */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.colors.text },
              { textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            {t('method_of_verification')}
          </Text>

          <TouchableOpacity
            style={[
              styles.listItem,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => handleDocumentSelect('passport')}
          >
            <View
              style={[styles.listItemLeft, isRTL && styles.listItemLeftRTL]}
            >
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: theme.colors.primary },
                ]}
              >
                <PassportIcon color={theme.colors.buttonText} />
              </View>
              <Text style={[styles.listItemText, { color: theme.colors.text }]}>
                {t('passport')}
              </Text>
            </View>
            <ChevronIcon color={theme.colors.iconSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.listItem,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => handleDocumentSelect('identity_card')}
          >
            <View
              style={[styles.listItemLeft, isRTL && styles.listItemLeftRTL]}
            >
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: theme.colors.success },
                ]}
              >
                <IdentityCardIcon color={theme.colors.buttonText} />
              </View>
              <Text style={[styles.listItemText, { color: theme.colors.text }]}>
                {t('identity_card')}
              </Text>
            </View>
            <ChevronIcon color={theme.colors.iconSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.listItem,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => handleDocumentSelect('driving_license')}
          >
            <View
              style={[styles.listItemLeft, isRTL && styles.listItemLeftRTL]}
            >
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: theme.colors.success },
                ]}
              >
                <DrivingLicenseIcon color={theme.colors.buttonText} />
              </View>
              <Text style={[styles.listItemText, { color: theme.colors.text }]}>
                {t('driving_license')}
              </Text>
            </View>
            <ChevronIcon color={theme.colors.iconSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.listItem,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => handleDocumentSelect('digital_document')}
          >
            <View
              style={[styles.listItemLeft, isRTL && styles.listItemLeftRTL]}
            >
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: theme.colors.warning },
                ]}
              >
                <DigitalDocumentIcon color={theme.colors.buttonText} />
              </View>
              <Text style={[styles.listItemText, { color: theme.colors.text }]}>
                {t('digital_document')}
              </Text>
            </View>
            <ChevronIcon color={theme.colors.iconSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: 24,
    paddingBottom: 40,
  },
  descriptionContainer: {
    marginBottom: 32,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  listItemLeftRTL: {
    flexDirection: 'row-reverse',
  },
  flagIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default ProofOfResidencyScreen;
