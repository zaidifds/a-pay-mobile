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
import { FormInput } from '@/components/forms';

type TypeOfBusinessScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const TypeOfBusinessScreen: React.FC = () => {
  const navigation = useNavigation<TypeOfBusinessScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    // Navigate to edit screen
    console.log('Edit pressed');
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DynamicHeader
        title={t('type_of_business')}
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

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <FormInput
            placeholder={t('category')}
            value=""
            onChangeText={() => {}}
          />

          <FormInput
            placeholder={t('website')}
            value=""
            onChangeText={() => {}}
          />

          <FormInput
            placeholder={t('description')}
            value=""
            onChangeText={() => {}}
            multiline
            numberOfLines={3}
          />
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
  formContainer: {
    gap: 20,
  },
});

export default TypeOfBusinessScreen;
