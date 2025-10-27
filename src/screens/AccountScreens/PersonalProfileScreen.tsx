import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader, StandardButton } from '@/components/ui';

type PersonalProfileScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

interface ProfileItem {
  id: string;
  title: string;
  value?: string;
  icon: string;
  onPress: () => void;
}

const PersonalProfileScreen: React.FC = () => {
  const navigation = useNavigation<PersonalProfileScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleOrderCard = () => {
    // Navigate to order card screen
    console.log('Order Card pressed');
  };

  const profileItems: ProfileItem[] = [
    {
      id: 'personal_details',
      title: t('personal_details'),
      icon: '🆔',
      onPress: () => navigation.navigate('PersonalDetailsScreen'),
    },
    {
      id: 'role',
      title: t('role'),
      value: 'CFO',
      icon: '⚙️',
      onPress: () => console.log('Navigate to Role'),
    },
    {
      id: 'approvals',
      title: t('approvals'),
      value: 'None',
      icon: '✅',
      onPress: () => console.log('Navigate to Approvals'),
    },
  ];

  const organizationItems: ProfileItem[] = [
    {
      id: 'manager',
      title: t('manager'),
      icon: '👤',
      onPress: () => console.log('Navigate to Manager'),
    },
  ];

  const financeItems: ProfileItem[] = [
    {
      id: 'transactions',
      title: t('transactions'),
      icon: '↔️',
      onPress: () => console.log('Navigate to Transactions'),
    },
  ];

  const renderProfileItem = (item: ProfileItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.profileItem,
          {
            borderBottomColor: theme.colors.border,
          },
        ]}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.profileItemContent}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{item.icon}</Text>
          </View>
          <Text style={[styles.profileItemTitle, { color: theme.colors.text }]}>
            {item.title}
          </Text>
          {item.value && (
            <Text
              style={[
                styles.profileItemValue,
                { color: theme.colors.textSecondary },
              ]}
            >
              {item.value}
            </Text>
          )}
          <Text style={[styles.chevron, { color: theme.colors.iconSecondary }]}>
            ›
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSection = (title: string, items: ProfileItem[]) => {
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
          {items.map(item => renderProfileItem(item))}
        </View>
      </View>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DynamicHeader
        title={t('personal_profile')}
        showBackButton
        backButtonIcon="←"
        onBackPress={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Section */}
        <View style={styles.userInfoSection}>
          <View style={styles.userInfoLeft}>
            <Text style={[styles.userName, { color: theme.colors.text }]}>
              {t('cara_dune')}
            </Text>
            <Text
              style={[styles.userEmail, { color: theme.colors.textSecondary }]}
            >
              {t('caradune_microsoft_com')}
            </Text>
            <Text
              style={[styles.userStatus, { color: theme.colors.textSecondary }]}
            >
              {t('active')}
            </Text>
          </View>
          <View style={styles.userInfoRight}>
            <View style={styles.profileImageContainer}>
              <View
                style={[
                  styles.profileImage,
                  { backgroundColor: theme.colors.primaryLight },
                ]}
              >
                <Text style={styles.profileImageText}>CD</Text>
              </View>
              <TouchableOpacity style={styles.cameraButton}>
                <Text style={styles.cameraIcon}>📷</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Order Card Button */}
        <View style={styles.orderCardSection}>
          <StandardButton
            title={t('order_card')}
            onPress={handleOrderCard}
            variant="primary"
            size="medium"
          />
        </View>

        {/* Profile Section */}
        {renderSection(t('profile'), profileItems)}

        {/* Organization Section */}
        {renderSection(t('organization'), organizationItems)}

        {/* Finances Section */}
        {renderSection(t('finances'), financeItems)}
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
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  userInfoLeft: {
    flex: 1,
    paddingRight: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 14,
  },
  userInfoRight: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 12,
  },
  orderCardSection: {
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
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
  profileItem: {
    borderBottomWidth: 1,
  },
  profileItemContent: {
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
  profileItemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  profileItemValue: {
    fontSize: 16,
    marginRight: 8,
  },
  chevron: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PersonalProfileScreen;
