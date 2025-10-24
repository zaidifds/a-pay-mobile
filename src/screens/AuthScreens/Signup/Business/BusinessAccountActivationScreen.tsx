import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../../navigation/AuthNavigator';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';

type BusinessAccountActivationScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;
const BusinessAccountActivationScreen: React.FC = () => {
  const navigation =
    useNavigation<BusinessAccountActivationScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  // Activation steps data
  const activationSteps = [
    {
      id: 'personal_identity',
      title: t('personal_identity'),
      status: 'requires_action',
      icon: '👤',
      description: t('requires_action'),
    },
    {
      id: 'nature_of_business',
      title: t('nature_of_business'),
      status: 'requires_action',
      icon: '🏛️',
      description: t('requires_action'),
    },
    {
      id: 'business_details',
      title: t('business_details'),
      status: 'coming_soon',
      icon: '💼',
      description: 'Coming Soon',
    },
    {
      id: 'business_address',
      title: t('business_address'),
      status: 'coming_soon',
      icon: '📍',
      description: 'Coming Soon',
    },
    {
      id: 'directors_shareholders',
      title: t('directors_and_shareholders'),
      status: 'coming_soon',
      icon: '👥',
      description: 'Coming Soon',
    },
    {
      id: 'plan_and_card',
      title: t('plan_and_card'),
      status: 'coming_soon',
      icon: 'R',
      description: 'Coming Soon',
    },
  ];

  const completedSteps = activationSteps.filter(
    step => step.status === 'verified',
  ).length;
  const totalSteps = activationSteps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const handleStepPress = (stepId: string) => {
    console.log('Step pressed:', stepId);
    // Navigate to specific step screen based on stepId
    switch (stepId) {
      case 'personal_identity':
        console.log('Navigating to BusinessAccountPersonalInfo');
        navigation.navigate('BusinessAccountPersonalInfo');
        break;
      case 'nature_of_business':
        console.log('Navigating to BusinessPurpose');
        navigation.navigate('NatureOfBusiness');
        break;
      case 'business_details':
        Alert.alert(
          'Coming Soon',
          'Business Details screen will be available soon.',
          [{ text: 'OK' }],
        );
        break;
      case 'business_address':
        console.log('Navigating to BusinessAccountRegisteredAddress');
        navigation.navigate('BusinessAccountRegisteredAddress');
        break;
      case 'directors_shareholders':
        console.log('Navigating to Directors');
        navigation.navigate('Directors');
        break;
      case 'plan_and_card':
        Alert.alert(
          'Coming Soon',
          'Plan and Card screen will be available soon.',
          [{ text: 'OK' }],
        );
        break;
      default:
        console.log('Unknown step:', stepId);
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return theme.colors.success || '#28A745';
      case 'requires_action':
        return theme.colors.warning || '#FF8C00';
      case 'coming_soon':
        return theme.colors.textSecondary || '#6B7280';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return '✓';
      case 'requires_action':
        return '●';
      case 'coming_soon':
        return '○';
      default:
        return '○';
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DynamicHeader
        title={t('business_account')}
        showBackButton
        backButtonIcon="←"
        showRightButton
        rightButtonText={t('sign_in')}
        onBackPress={handleBack}
        onRightPress={handleSignIn}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[styles.mainTitle, { color: theme.colors.text }]}>
            {t('business_account')}
          </Text>
          <Text style={[styles.subTitle, { color: theme.colors.text }]}>
            {t('account_activation')}
          </Text>
          <Text
            style={[styles.description, { color: theme.colors.textSecondary }]}
          >
            {t('submit_required_information_description')}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View
            style={[
              styles.progressTrack,
              { backgroundColor: theme.colors.inputBorder },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressPercentage}%`,
                  backgroundColor: theme.colors.primary,
                },
              ]}
            />
          </View>
        </View>

        {/* Activation Steps */}
        <View style={styles.stepsSection}>
          {activationSteps.map(step => (
            <TouchableOpacity
              key={step.id}
              style={[
                styles.stepCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  shadowColor: theme.colors.shadowColor,
                },
              ]}
              onPress={() => handleStepPress(step.id)}
              activeOpacity={0.7}
            >
              <View style={styles.stepContent}>
                {/* Icon */}
                <View
                  style={[
                    styles.stepIcon,
                    { backgroundColor: theme.colors.primaryLight },
                  ]}
                >
                  <Text style={styles.stepIconText}>{step.icon}</Text>
                </View>

                {/* Status and Title */}
                <View style={styles.stepInfo}>
                  <View style={styles.stepHeader}>
                    <View style={styles.stepStatusContainer}>
                      <Text
                        style={[
                          styles.stepStatusIcon,
                          { color: getStepStatusColor(step.status) },
                        ]}
                      >
                        {getStepStatusIcon(step.status)}
                      </Text>
                    </View>
                    <Text
                      style={[styles.stepTitle, { color: theme.colors.text }]}
                    >
                      {step.title}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.stepDescription,
                      { color: getStepStatusColor(step.status) },
                    ]}
                  >
                    {step.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    paddingBottom: 20,
  },
  headerSection: {
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  progressSection: {
    marginBottom: 32,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  stepsSection: {
    gap: 16,
  },
  stepCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepIconText: {
    fontSize: 24,
  },
  stepInfo: {
    flex: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepStatusContainer: {
    marginRight: 8,
  },
  stepStatusIcon: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  stepDescription: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BusinessAccountActivationScreen;
