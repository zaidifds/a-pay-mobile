import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';

type BusinessDetailsScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

interface BusinessDetail {
  id: string;
  label: string;
  value: string;
  showFlag?: boolean;
}

const BusinessDetailsScreen: React.FC = () => {
  const navigation = useNavigation<BusinessDetailsScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    // Navigate to edit screen
    console.log('Edit pressed');
  };

  const businessDetails: BusinessDetail[] = [
    {
      id: 'country_of_incorporation',
      label: t('country_of_incorporation'),
      value: t('united_kingdom'),
      showFlag: true,
    },
    {
      id: 'legal_name',
      label: t('legal_name'),
      value: 'Microsoft Inc.',
    },
    {
      id: 'company_house_registration_number',
      label: t('company_house_registration_number'),
      value: '18990127',
    },
    {
      id: 'company_house_registration_number_2',
      label: t('company_house_registration_number'),
      value: '18990127',
    },
    {
      id: 'date_of_incorporation',
      label: t('date_of_incorporation'),
      value: '01/01/2018',
    },
    {
      id: 'business_type',
      label: t('business_type'),
      value: 'IT',
    },
    {
      id: 'trading_name',
      label: t('trading_name'),
      value: 'Microsoft',
    },
  ];

  const renderBusinessDetail = (detail: BusinessDetail) => {
    return (
      <View key={detail.id} style={styles.detailItem}>
        <Text
          style={[styles.detailLabel, { color: theme.colors.textSecondary }]}
        >
          {detail.label}
        </Text>
        <View
          style={[
            styles.detailInput,
            {
              backgroundColor: theme.colors.input,
              borderColor: theme.colors.inputBorder,
            },
          ]}
        >
          {detail.showFlag ? (
            <View style={styles.flagContainer}>
              <Text style={styles.flag}>🇬🇧</Text>
              <Text
                style={[
                  styles.detailValue,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {detail.value}
              </Text>
            </View>
          ) : (
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {detail.value}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DynamicHeader
        title={t('business_details')}
        showBackButton
        backButtonIcon="←"
        onBackPress={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Edit Button */}
        <View style={styles.editButtonContainer}>
          <TouchableOpacity
            style={[
              styles.editButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={handleEdit}
            activeOpacity={0.8}
          >
            <Text style={styles.editIcon}>✏️</Text>
            <Text
              style={[
                styles.editButtonText,
                { color: theme.colors.buttonText },
              ]}
            >
              {t('edit')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Business Details Form */}
        <View style={styles.detailsContainer}>
          {businessDetails.map(detail => renderBusinessDetail(detail))}
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
    paddingTop: 20,
    paddingBottom: 40,
  },
  editButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailsContainer: {
    gap: 20,
  },
  detailItem: {
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailInput: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  detailValue: {
    fontSize: 16,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default BusinessDetailsScreen;
