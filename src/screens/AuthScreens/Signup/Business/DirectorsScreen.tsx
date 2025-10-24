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

type DirectorsScreenNavigationProp = StackNavigationProp<AuthStackParamList>;

interface Director {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  address: string;
  state: string;
  city: string;
  zipCode: string;
}

const DirectorsScreen: React.FC = () => {
  const navigation = useNavigation<DirectorsScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [directors, setDirectors] = useState<Director[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddDirector = () => {
    navigation.navigate('AddDirector');
  };

  const handleSave = async () => {
    if (directors.length === 0) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise<void>(resolve => setTimeout(resolve, 1500));

    // Navigate back to activation screen
    navigation.goBack();

    setIsLoading(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderDirectorCard = (director: Director) => {
    return (
      <View
        key={director.id}
        style={[
          styles.directorCard,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            shadowColor: theme.colors.shadowColor,
          },
        ]}
      >
        <View style={styles.directorInfo}>
          <Text style={[styles.directorName, { color: theme.colors.text }]}>
            {director.firstName} {director.lastName}
          </Text>
          <Text
            style={[
              styles.directorDetails,
              { color: theme.colors.textSecondary },
            ]}
          >
            {director.gender} • {director.dob}
          </Text>
          <Text
            style={[
              styles.directorAddress,
              { color: theme.colors.textSecondary },
            ]}
          >
            {director.address}, {director.city}, {director.state}{' '}
            {director.zipCode}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate('AddDirector', { directorId: director.id })
          }
        >
          <Text
            style={[styles.editButtonText, { color: theme.colors.primary }]}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>
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
            {t('directors')}
          </Text>
          <Text
            style={[styles.description, { color: theme.colors.textSecondary }]}
          >
            {t('add_all_directors_listed_with_local_registry')}
          </Text>
        </View>

        {/* Directors List or Empty State */}
        {directors.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.iconText}>👥</Text>
            </View>
            <Text
              style={[styles.emptyTitle, { color: theme.colors.textSecondary }]}
            >
              {t('no_directors_found')}
            </Text>
            <Text
              style={[
                styles.emptyDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              {t('your_directors_will_appear_here')}
            </Text>
            <TouchableOpacity
              style={[
                styles.addDirectorButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={handleAddDirector}
            >
              <Text
                style={[
                  styles.addDirectorButtonText,
                  { color: theme.colors.buttonText },
                ]}
              >
                {t('add_director')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.directorsList}>
            {directors.map(director => renderDirectorCard(director))}
            <TouchableOpacity
              style={[
                styles.addMoreButton,
                { borderColor: theme.colors.primary },
              ]}
              onPress={handleAddDirector}
            >
              <Text
                style={[
                  styles.addMoreButtonText,
                  { color: theme.colors.primary },
                ]}
              >
                + {t('add_director')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <StandardButton
          title={t('save')}
          onPress={handleSave}
          variant="secondary"
          size="large"
          fullWidth
          disabled={directors.length === 0}
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
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  iconText: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  addDirectorButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  addDirectorButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  directorsList: {
    gap: 16,
  },
  directorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  directorInfo: {
    flex: 1,
  },
  directorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  directorDetails: {
    fontSize: 14,
    marginBottom: 4,
  },
  directorAddress: {
    fontSize: 14,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  addMoreButton: {
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addMoreButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
  },
});

export default DirectorsScreen;
