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

type ProofOfNatureOfBusinessScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const ProofOfNatureOfBusinessScreen: React.FC = () => {
  const navigation =
    useNavigation<ProofOfNatureOfBusinessScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const recommendedOptions = [
    {
      id: 'website',
      title: t('website'),
      description: t('website_description'),
      icon: '🔗',
      iconColor: '#10B981',
    },
    {
      id: 'sales_invoice',
      title: t('sales_invoice_with_matching_bank_statement'),
      description: t('sales_invoice_description'),
      icon: '📄',
      iconColor: '#10B981',
    },
  ];

  const otherOptions = [
    {
      id: 'industry_document',
      title: t('another_document_indicating_industry'),
      description: t('industry_document_description'),
      icon: '📋',
      iconColor: '#3B82F6',
    },
    {
      id: 'domain_ownership',
      title: t('domain_name_ownership'),
      description: t('domain_ownership_description'),
      icon: '🌐',
      iconColor: '#3B82F6',
    },
    {
      id: 'bank_statement',
      title: t('bank_statement'),
      description: t('bank_statement_description'),
      icon: '🏦',
      iconColor: '#3B82F6',
    },
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleContinue = async () => {
    if (!selectedOption) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise<void>(resolve => setTimeout(resolve, 1500));

    navigation.navigate('BusinessAccountActivation');

    setIsLoading(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderOptionCard = (option: any, isRecommended: boolean = false) => {
    const isSelected = selectedOption === option.id;

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
        onPress={() => handleOptionSelect(option.id)}
        activeOpacity={0.7}
      >
        <View style={styles.optionContent}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: option.iconColor },
            ]}
          >
            <Text style={styles.iconText}>{option.icon}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.optionTitle, { color: theme.colors.text }]}>
              {option.title}
            </Text>
            {option.description && (
              <Text
                style={[
                  styles.optionDescription,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {option.description}
              </Text>
            )}
          </View>

          <Text
            style={[styles.arrowIcon, { color: theme.colors.iconSecondary }]}
          >
            →
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
            {t('proof_of_nature_of_business')}
          </Text>
          <Text
            style={[styles.description, { color: theme.colors.textSecondary }]}
          >
            {t('please_confirm_nature_of_business')}
          </Text>
        </View>

        {/* Explanation Text */}
        <View style={styles.explanationSection}>
          <Text
            style={[
              styles.explanationText,
              { color: theme.colors.textSecondary },
            ]}
          >
            {t('proof_of_business_requirements')}
          </Text>
        </View>

        {/* Recommended Section */}
        <View style={styles.sectionContainer}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}
          >
            {t('recommended')}
          </Text>
          <View style={styles.optionsContainer}>
            {recommendedOptions.map(option => renderOptionCard(option, true))}
          </View>
        </View>

        {/* Others Section */}
        <View style={styles.sectionContainer}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}
          >
            {t('others')}
          </Text>
          <View style={styles.optionsContainer}>
            {otherOptions.map(option => renderOptionCard(option, false))}
          </View>
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
          disabled={!selectedOption}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  explanationSection: {
    marginBottom: 32,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  optionsContainer: {
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  arrowIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
  },
});

export default ProofOfNatureOfBusinessScreen;
