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

type BusinessAddressScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

interface AddressCard {
  id: string;
  title: string;
  address: string[];
}

const BusinessAddressScreen: React.FC = () => {
  const navigation = useNavigation<BusinessAddressScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    // Navigate to edit screen
    console.log('Edit pressed');
  };

  const addressCards: AddressCard[] = [
    {
      id: 'registered',
      title: t('registered'),
      address: [
        'Revolut LTD, Level39',
        '1 Canada Square',
        'E14 5AB',
        'London',
        'United Kingdom',
      ],
    },
    {
      id: 'primary_place_of_business',
      title: t('primary_place_of_business'),
      address: [
        'Revolut LTD, Level39',
        '1 Canada Square',
        'E14 5AB',
        'London',
        'United Kingdom',
      ],
    },
  ];

  const renderAddressCard = (card: AddressCard) => {
    return (
      <View
        key={card.id}
        style={[
          styles.addressCard,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
          {card.title}
        </Text>
        <View style={styles.addressContainer}>
          {card.address.map((line, index) => (
            <Text
              key={index}
              style={[
                styles.addressLine,
                { color: theme.colors.textSecondary },
              ]}
            >
              {line}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DynamicHeader
        title={t('business_address')}
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

        {/* Address Cards */}
        <View style={styles.cardsContainer}>
          {addressCards.map(card => renderAddressCard(card))}
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
  cardsContainer: {
    gap: 16,
  },
  addressCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  addressContainer: {
    gap: 4,
  },
  addressLine: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default BusinessAddressScreen;
