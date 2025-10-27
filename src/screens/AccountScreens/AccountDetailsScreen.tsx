import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '@/navigation/navigationTypes';

interface SettingsMenuItem {
  id: string;
  title: string;
  description?: string;
  icon: string;
  color?: string;
  onPress: () => void;
  isHighlighted?: boolean;
}

const AccountDetailsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<RootStackNavigationProp>();
  const handleUpgrade = () => {
    console.log('Upgrade pressed');
  };

  const settingsMenuItems: SettingsMenuItem[] = [
    {
      id: 'help',
      title: t('help'),
      icon: '?',
      onPress: () => console.log('Navigate to Help'),
    },
    {
      id: 'account_manager',
      title: t('account_manager'),
      description: t('get_in_touch_to_optimize_your_plan'),
      icon: '👤',
      onPress: () => console.log('Navigate to Account Manager'),
    },
    {
      id: 'billing',
      title: t('billing'),
      description: t('free'),
      icon: '$',
      onPress: () => navigation.navigate('StatementsScreen'),
      isHighlighted: true,
    },
    {
      id: 'account_documents',
      title: t('account_documents'),
      icon: '👤',
      onPress: () => navigation.navigate('AccountDocumentScreen'),
    },
    {
      id: 'security_privacy',
      title: t('security_privacy'),
      icon: '✓',
      onPress: () => navigation.navigate('BusinessProfileScreen'),
    },
    {
      id: 'app_settings',
      title: t('app_settings'),
      icon: '⚙',
      onPress: () => navigation.navigate('BusinessDetailsScreen'),
    },
    {
      id: 'apis',
      title: t('apis'),
      icon: '🌐',
      onPress: () => navigation.navigate('BusinessStructureScreen'),
    },
    {
      id: 'about_us',
      title: t('about_us'),
      icon: '○',
      onPress: () => navigation.navigate('PersonalDetailsScreen'),
    },
    {
      id: 'logout',
      title: t('logout'),
      icon: '←',
      color: '#FF3B30',
      onPress: () => console.log('Logout pressed'),
    },
  ];

  const renderMenuItem = (item: SettingsMenuItem) => {
    if (item.isHighlighted) {
      return (
        <View
          key={item.id}
          style={[
            styles.highlightedMenuItem,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.menuItemContent}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text
                style={[styles.menuItemTitle, { color: theme.colors.text }]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.menuItemDescription,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    // Special handling for logout button (no circular icon background)
    if (item.color === '#FF3B30') {
      return (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemContent}>
            <Text style={styles.logoutIconText}>{item.icon}</Text>
            <Text style={styles.logoutText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.menuItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemContent}>
          <View style={styles.blueIconContainer}>
            <Text style={styles.whiteIconText}>{item.icon}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.blackText}>{item.title}</Text>
            {item.description && (
              <Text
                style={[
                  styles.menuItemDescription,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {item.description}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Custom Header with Microsoft Logo */}
      <DynamicHeader backButtonIcon="←" showBackButton={true} />

      {/* Company Name and Logo Section */}
      <View style={styles.companySection}>
        <View style={styles.companyInfo}>
          <View style={styles.companyNameRow}>
            <Text style={styles.companyName}>Microsoft Inc.</Text>
            <Text style={styles.chevronIcon}>▼</Text>
          </View>
          <Text style={styles.userName}>{t('cara_dune')}</Text>
        </View>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.microsoftLogo}>MS</Text>
            <View style={styles.badgeOverlay}>
              <Text style={styles.badgeIcon}>🔔</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Upgrade Button */}
      <View style={styles.upgradeButtonContainer}>
        <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
          <Text style={styles.upgradeIcon}>+</Text>
          <Text style={styles.upgradeText}>{t('upgrade')}</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Menu */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuContainer}>
          {settingsMenuItems.map(item => renderMenuItem(item))}
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
  companySection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  companyInfo: {
    flex: 1,
    paddingRight: 16,
  },
  companyNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '700',
    marginRight: 8,
  },
  chevronIcon: {
    fontSize: 14,
    color: '#000000',
  },
  userName: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  logoContainer: {
    alignItems: 'flex-end',
    position: 'relative',
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: '#007AFF',
    position: 'relative',
  },
  microsoftLogo: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  badgeOverlay: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#003896',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeIcon: {
    fontSize: 12,
  },
  upgradeButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  upgradeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 8,
  },
  upgradeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  highlightedMenuItem: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 0,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  textContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 18,
    fontWeight: '400',
  },
  logoutIconText: {
    color: '#FF3B30',
    fontSize: 20,
    marginRight: 16,
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 16,
  },
  blueIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  whiteIconText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  blackText: {
    color: '#000000',
  },
});

export default AccountDetailsScreen;
