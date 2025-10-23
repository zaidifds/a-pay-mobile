import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useTheme } from '../../hooks/useTheme';
import useTranslation from '../../localization/useTranslation';
// import SvgIcon from '../../assets/svg/SvgIcon';

type AccountTypeScreenNavigationProp = StackNavigationProp<AuthStackParamList>;

const AccountTypeScreen: React.FC = () => {
  const navigation = useNavigation<AccountTypeScreenNavigationProp>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  const handlePersonalAccount = () => {
    navigation.navigate('PersonalSignup');
  };

  const handleBusinessAccount = () => {
    navigation.navigate('BusinessAccountIntro');
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
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
          {t('create_account')}
        </Text>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={[styles.signInLink, { color: theme.colors.primary }]}>
            {t('sign_in')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {t('create_account')}
        </Text>

        {/* Description */}
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          {t('account_type_description')}
        </Text>

        {/* Account Type Cards */}
        <View style={styles.cardsContainer}>
          {/* Personal Account Card */}
          <TouchableOpacity
            style={[
              styles.accountCard,
              { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadowColor },
              isRTL && styles.accountCardRTL,
            ]}
            onPress={handlePersonalAccount}
            activeOpacity={0.8}
          >
            <View style={[styles.cardHeader, isRTL && styles.cardHeaderRTL]}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: theme.colors.primaryLight },
                ]}
              >
                <Text style={[styles.iconText, { color: theme.colors.primary }]}>
                  👤
                </Text>
              </View>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                {t('personal_account')}
              </Text>
            </View>
            <Text style={[styles.cardDescription, { color: theme.colors.textSecondary }]}>
              {t('personal_account_description')}
            </Text>
            <View style={[styles.cardActions, isRTL && styles.cardActionsRTL]}>
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={handlePersonalAccount}
              >
                <Text style={[styles.primaryButtonText, { color: theme.colors.buttonText }]}>
                  {t('get_started')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePersonalAccount}>
                <Text style={[styles.learnMoreLink, { color: theme.colors.primary }]}>
                  {t('learn_more')} >
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* Business Account Card */}
          <TouchableOpacity
            style={[
              styles.accountCard,
              { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadowColor },
              isRTL && styles.accountCardRTL,
            ]}
            onPress={handleBusinessAccount}
            activeOpacity={0.8}
          >
            <View style={[styles.cardHeader, isRTL && styles.cardHeaderRTL]}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: theme.colors.primaryLight },
                ]}
              >
                <Text style={[styles.iconText, { color: theme.colors.primary }]}>
                  💼
                </Text>
              </View>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                {t('business_account')}
              </Text>
            </View>
            <Text style={[styles.cardDescription, { color: theme.colors.textSecondary }]}>
              {t('business_account_description')}
            </Text>
            <View style={[styles.cardActions, isRTL && styles.cardActionsRTL]}>
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={handleBusinessAccount}
              >
                <Text style={[styles.primaryButtonText, { color: theme.colors.buttonText }]}>
                  {t('get_started')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBusinessAccount}>
                <Text style={[styles.learnMoreLink, { color: theme.colors.primary }]}>
                  {t('learn_more')} >
                </Text>
              </TouchableOpacity>
            </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'left',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'left',
  },
  cardsContainer: {
    gap: 20,
  },
  accountCard: {
    borderRadius: 16,
    padding: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  accountCardRTL: {
    // RTL specific styles if needed
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'left',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardActionsRTL: {
    flexDirection: 'row-reverse',
  },
  primaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  learnMoreLink: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AccountTypeScreen;
