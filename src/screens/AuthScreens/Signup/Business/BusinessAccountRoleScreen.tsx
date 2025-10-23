import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../../navigation/AuthNavigator';
import { useTheme } from '../../../../hooks/useTheme';
import useTranslation from '../../../../localization/useTranslation';

type BusinessAccountRoleScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const BusinessAccountRoleScreen: React.FC = () => {
  const navigation = useNavigation<BusinessAccountRoleScreenNavigationProp>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roleOptions = [
    {
      id: 'only_director',
      title: t('i_am_only_director_and_significant_shareholder'),
      description: t('only_director_description'),
      icon: '👤',
    },
    {
      id: 'one_of_several',
      title: t('i_am_one_of_several_director_or_significant_shareholder'),
      description: t('one_of_several_description'),
      icon: '👥',
    },
    {
      id: 'neither_director',
      title: t('i_am_neither_director_nor_significant_shareholder'),
      description: t('neither_director_description'),
      icon: '📄',
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole) {
      // Navigate to completion or next step
      console.log('Selected role:', selectedRole);
      // For now, just show an alert
      navigation.navigate('Login'); // This would be replaced with actual completion flow
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const getCardStyles = (roleId: string) => {
    const isSelected = selectedRole === roleId;
    return {
      borderColor: isSelected ? theme.colors.primary : theme.colors.inputBorder,
      backgroundColor: isSelected
        ? theme.colors.primaryLight
        : theme.colors.input,
      shadowColor: isSelected ? theme.colors.primary : theme.colors.shadowColor,
      shadowOffset: { width: 0, height: isSelected ? 2 : 1 },
      shadowOpacity: isSelected ? 0.15 : 0.05,
      shadowRadius: isSelected ? 4 : 2,
      elevation: isSelected ? 3 : 1,
    };
  };

  const getIconStyles = (roleId: string) => {
    const isSelected = selectedRole === roleId;
    return {
      color: isSelected ? theme.colors.primary : theme.colors.iconSecondary,
    };
  };

  const getTitleStyles = (roleId: string) => {
    const isSelected = selectedRole === roleId;
    return {
      color: isSelected ? theme.colors.primary : theme.colors.text,
    };
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { borderBottomColor: theme.colors.borderHeader },
          isRTL && styles.headerRTL,
        ]}
      >
        <TouchableOpacity
          style={[styles.backButton, isRTL && styles.backButtonRTL]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backIcon, { color: theme.colors.icon }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          {t('business_account')}
        </Text>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={[styles.signInLink, { color: theme.colors.primary }]}>
            {t('sign_in')}
          </Text>
        </TouchableOpacity>
      </View>

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

          {/* Subtitle */}
          <Text style={[styles.subtitle, { color: theme.colors.text }]}>
            {t('tell_us_about_your_role_in_company')}
          </Text>

          {/* Role Options */}
          <View style={styles.optionsContainer}>
            {roleOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[styles.roleCard, getCardStyles(option.id)]}
                onPress={() => handleRoleSelect(option.id)}
                activeOpacity={0.7}
              >
                <View style={styles.cardContent}>
                  <Text style={[styles.roleIcon, getIconStyles(option.id)]}>
                    {option.icon}
                  </Text>
                  <View style={styles.textContainer}>
                    <Text style={[styles.roleTitle, getTitleStyles(option.id)]}>
                      {option.title}
                    </Text>
                    <Text
                      style={[
                        styles.roleDescription,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {option.description}
                    </Text>
                  </View>
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
                backgroundColor: selectedRole
                  ? theme.colors.primary
                  : theme.colors.buttonDisabled,
                shadowColor: theme.colors.shadowColor,
              },
            ]}
            onPress={handleContinue}
            disabled={!selectedRole}
          >
            <Text
              style={[
                styles.continueButtonText,
                {
                  color: selectedRole
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
    </SafeAreaView>
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
    marginBottom: 8,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'left',
  },
  optionsContainer: {
    marginBottom: 32,
  },
  roleCard: {
    borderWidth: 1.5,
    borderRadius: 12,
    marginBottom: 16,
    padding: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  roleIcon: {
    fontSize: 24,
    marginRight: 16,
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
    textAlign: 'left',
  },
  roleDescription: {
    fontSize: 14,
    lineHeight: 20,
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

export default BusinessAccountRoleScreen;
