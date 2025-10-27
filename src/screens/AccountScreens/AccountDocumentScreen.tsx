import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';
import { RootStackNavigationProp } from '@/navigation/navigationTypes';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  color?: string;
  onPress: () => void;
}

const AccountDocumentScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleBack = () => {
    navigation.goBack();
  };

  const menuItems: MenuItem[] = [
    // Profile Management
    {
      id: 'personal_profile',
      title: t('personal_profile'),
      icon: '👤',
      onPress: () => navigation.navigate('PersonalProfileScreen'),
    },
    {
      id: 'business_profile',
      title: t('business_profile'),
      icon: '💼',
      onPress: () => navigation.navigate('BusinessProfileScreen'),
    },
    {
      id: 'merchant_profile',
      title: t('merchant_profile'),
      icon: '🏪',
      onPress: () => navigation.navigate('MerchantProfileScreen' as never),
    },
    // Documents & Policies
    {
      id: 'statements',
      title: t('statements'),
      icon: '📊',
      onPress: () => navigation.navigate('StatementsScreen'),
    },
    {
      id: 'privacy_policy',
      title: t('privacy_policy'),
      icon: '🔒',
      onPress: () => console.log('Navigate to Privacy Policy'),
    },
    {
      id: 'terms_conditions',
      title: t('terms_conditions'),
      icon: 'ℹ️',
      onPress: () => console.log('Navigate to Terms & Conditions'),
    },
    // Account Actions
    {
      id: 'close_business_account',
      title: t('close_business_account'),
      icon: '💔',
      color: '#FF3B30',
      onPress: () => console.log('Navigate to CloseBusinessAccount'),
    },
  ];

  const renderMenuItem = (item: MenuItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.menuItem,
          {
            borderBottomColor: theme.colors.border,
          },
        ]}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemContent}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{item.icon}</Text>
          </View>
          <Text
            style={[
              styles.menuItemTitle,
              {
                color: item.color || theme.colors.text,
              },
            ]}
          >
            {item.title}
          </Text>
          <Text style={[styles.chevron, { color: theme.colors.iconSecondary }]}>
            ›
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSection = (title: string, items: MenuItem[]) => {
    return (
      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}
        >
          {title}
        </Text>
        <View
          style={[
            styles.sectionContent,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          {items.map(item => renderMenuItem(item))}
        </View>
      </View>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DynamicHeader
        title={t('account_document')}
        showBackButton
        backButtonIcon="←"
        onBackPress={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Management Section */}
        {renderSection(t('profile_management'), menuItems.slice(0, 3))}

        {/* Documents & Policies Section */}
        {renderSection(t('documents_policies'), menuItems.slice(3, 6))}

        {/* Account Actions Section */}
        {renderSection(t('account_actions'), menuItems.slice(6))}
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionContent: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    borderBottomWidth: 1,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  menuItemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AccountDocumentScreen;
