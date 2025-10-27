import { DynamicHeader } from '@/components/ui';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { BusinessAcoountNavigatorParamList } from '@/navigation/BusinessAcoountNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type BusinessProfileScreenNavigationProp =
  StackNavigationProp<BusinessAcoountNavigatorParamList>;

interface BusinessMenuItem {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
  showArrow?: boolean;
}

const BusinessProfileScreen: React.FC = () => {
  const navigation = useNavigation<BusinessProfileScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleBack = () => {
    navigation.goBack();
  };

  const keyInformationItems: BusinessMenuItem[] = [
    {
      id: 'business_details',
      title: t('business_details'),
      icon: '💼',
      onPress: () => navigation.navigate('BusinessDetailsScreen'),
      showArrow: true,
    },
    {
      id: 'business_address',
      title: t('business_address'),
      icon: '📍',
      onPress: () => navigation.navigate('BusinessAddressScreen'),
      showArrow: true,
    },
    {
      id: 'type_of_business',
      title: t('type_of_business'),
      icon: '🏦',
      onPress: () => navigation.navigate('TypeOfBusinessScreen'),
      showArrow: true,
    },
    {
      id: 'business_structure',
      title: t('business_structure'),
      icon: '👥',
      onPress: () => navigation.navigate('BusinessStructureScreen'),
      showArrow: true,
    },
  ];

  const additionalInformationItems: BusinessMenuItem[] = [
    {
      id: 'vat_number',
      title: t('vat_number'),
      icon: '📄',
      onPress: () => console.log('Navigate to VATNumber'),
      showArrow: false,
    },
  ];

  const renderMenuItem = (item: BusinessMenuItem) => {
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
          <Text style={[styles.menuItemTitle, { color: theme.colors.text }]}>
            {item.title}
          </Text>
          {item.showArrow && (
            <Text
              style={[styles.chevron, { color: theme.colors.iconSecondary }]}
            >
              ›
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderSection = (title: string, items: BusinessMenuItem[]) => {
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
        title={t('business_profile')}
        showBackButton
        backButtonIcon="←"
        onBackPress={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Key Information Section */}
        {renderSection(t('key_information'), keyInformationItems)}

        {/* Additional Information Section */}
        {renderSection(t('additional_information'), additionalInformationItems)}
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

export default BusinessProfileScreen;
