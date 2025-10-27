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

type BusinessStructureScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

interface Person {
  id: string;
  name: string;
  avatar: string;
}

const BusinessStructureScreen: React.FC = () => {
  const navigation = useNavigation<BusinessStructureScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleBack = () => {
    navigation.goBack();
  };

  const directors: Person[] = [
    {
      id: '1',
      name: 'Kelvin Turner',
      avatar: '👨‍💼',
    },
    {
      id: '2',
      name: 'Martin Foster',
      avatar: '👨‍💻',
    },
    {
      id: '3',
      name: 'Carina Barrett',
      avatar: '👩‍💼',
    },
  ];

  const shareholders: Person[] = [
    {
      id: '1',
      name: 'Roman Wilson',
      avatar: '👨‍🦳',
    },
    {
      id: '2',
      name: 'Alissa Ryan',
      avatar: '👩‍💼',
    },
  ];

  const renderPerson = (person: Person) => {
    return (
      <View key={person.id} style={styles.personItem}>
        <View
          style={[
            styles.avatarContainer,
            { backgroundColor: theme.colors.primaryLight },
          ]}
        >
          <Text style={styles.avatarText}>{person.avatar}</Text>
        </View>
        <Text style={[styles.personName, { color: theme.colors.text }]}>
          {person.name}
        </Text>
      </View>
    );
  };

  const renderSection = (title: string, people: Person[]) => {
    return (
      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}
        >
          {title}
        </Text>
        <View style={styles.peopleContainer}>
          {people.map(person => renderPerson(person))}
        </View>
      </View>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DynamicHeader
        title={t('business_structure')}
        showBackButton
        backButtonIcon="←"
        onBackPress={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Directors Section */}
        {renderSection(t('directors'), directors)}

        {/* Shareholders Section */}
        {renderSection(t('shareholders'), shareholders)}
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
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  peopleContainer: {
    gap: 16,
  },
  personItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
  },
  personName: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BusinessStructureScreen;
