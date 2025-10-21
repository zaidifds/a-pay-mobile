import React, { useState, useMemo } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Image,
  Switch,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { logoutUser, setUser } from '../redux/slices/authSlice';
import { toggleTheme, setTheme } from '../redux/slices/themeSlice';
import {
  setLanguage,
  updateNotifications,
  updatePrivacy,
} from '../redux/slices/settingsSlice';
import { fp, rp } from '../utils/responsive';
import { UserPreferences } from '../utils/userPreferences';
import Header from '../components/Header';
import AuthButton from '../components/AuthButton';
import { useTheme } from '../hooks/useTheme';

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { isDark } = useAppSelector(state => state.theme);
  const { language, notifications, privacy } = useAppSelector(
    state => state.settings,
  );
  const { theme } = useTheme();

  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isLoading, setIsLoading] = useState(false);

  // Animation values
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const slideAnim = useMemo(() => new Animated.Value(50), []);

  React.useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    if (!fullName.trim() || !email.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const updatedUser = {
        ...user!,
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      };

      dispatch(setUser(updatedUser));
      setIsEditing(false);
      setIsLoading(false);
      Alert.alert('Success', 'Profile updated successfully');
    }, 1000);
  };

  const handleCancelEdit = () => {
    setFullName(user?.name || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
    setIsEditing(false);
  };

  const handleImagePicker = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            // Take Photo
            Alert.alert(
              'Coming Soon',
              'Camera functionality will be added soon',
            );
          } else if (buttonIndex === 2) {
            // Choose from Library
            Alert.alert(
              'Coming Soon',
              'Gallery functionality will be added soon',
            );
          }
        },
      );
    } else {
      Alert.alert(
        'Coming Soon',
        'Image picker functionality will be added soon',
      );
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => dispatch(logoutUser()),
      },
    ]);
  };

  const handleLanguageChange = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    dispatch(setLanguage(newLanguage));
    UserPreferences.setLanguage(newLanguage);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    UserPreferences.setTheme(isDark ? 'light' : 'dark');
  };

  const handleNotificationToggle = (type: keyof typeof notifications) => {
    const newNotifications = { ...notifications, [type]: !notifications[type] };
    dispatch(updateNotifications({ [type]: !notifications[type] }));
    UserPreferences.setNotifications(newNotifications);
  };

  const handlePrivacyToggle = (type: keyof typeof privacy) => {
    const newPrivacy = { ...privacy, [type]: !privacy[type] };
    dispatch(updatePrivacy({ [type]: !privacy[type] }));
    UserPreferences.setPrivacy(newPrivacy);
  };

  const renderProfileSection = () => (
    <Animated.View
      style={[
        styles.section,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Profile
      </Text>

      <View style={styles.profileImageContainer}>
        <TouchableOpacity
          onPress={handleImagePicker}
          style={styles.profileImageWrapper}
        >
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.profileImage} />
          ) : (
            <View
              style={[
                styles.profileImagePlaceholder,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Text style={styles.profileImageText}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          )}
          <View
            style={[
              styles.editIconContainer,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Icon name="edit" size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
          Full Name
        </Text>
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Icon
            name="person"
            size={20}
            color={theme.colors.textSecondary}
            style={styles.inputIcon}
          />
          <TextInput
            style={[styles.inputField, { color: theme.colors.text }]}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            placeholderTextColor={theme.colors.textSecondary}
            editable={isEditing}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
          Email
        </Text>
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Icon
            name="email"
            size={20}
            color={theme.colors.textSecondary}
            style={styles.inputIcon}
          />
          <TextInput
            style={[styles.inputField, { color: theme.colors.text }]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={isEditing}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
          Phone
        </Text>
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Icon
            name="phone"
            size={20}
            color={theme.colors.textSecondary}
            style={styles.inputIcon}
          />
          <TextInput
            style={[styles.inputField, { color: theme.colors.text }]}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="phone-pad"
            editable={isEditing}
          />
        </View>
      </View>

      <View style={styles.buttonRow}>
        {isEditing ? (
          <>
            <AuthButton
              title="Cancel"
              onPress={handleCancelEdit}
              style={[
                styles.halfButton,
                { backgroundColor: theme.colors.border },
              ]}
              textStyle={{ color: theme.colors.text }}
            />
            <AuthButton
              title={isLoading ? 'Saving...' : 'Save'}
              onPress={handleSaveProfile}
              loading={isLoading}
              style={[
                styles.halfButton,
                { backgroundColor: theme.colors.primary },
              ]}
            />
          </>
        ) : (
          <AuthButton
            title="Edit Profile"
            onPress={handleEditProfile}
            style={[
              styles.fullButton,
              { backgroundColor: theme.colors.primary },
            ]}
          />
        )}
      </View>
    </Animated.View>
  );

  const renderSettingsSection = () => (
    <Animated.View
      style={[
        styles.section,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Settings
      </Text>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Icon name="dark-mode" size={24} color={theme.colors.textSecondary} />
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            Dark Mode
          </Text>
        </View>
        <Switch
          value={isDark}
          onValueChange={handleThemeToggle}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={isDark ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Icon name="language" size={24} color={theme.colors.textSecondary} />
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            Language
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLanguageChange}
          style={styles.languageButton}
        >
          <Text style={[styles.languageText, { color: theme.colors.primary }]}>
            {language === 'en' ? 'English' : 'العربية'}
          </Text>
          <Icon name="arrow-drop-down" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Icon
            name="notifications"
            size={24}
            color={theme.colors.textSecondary}
          />
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            Push Notifications
          </Text>
        </View>
        <Switch
          value={notifications.push}
          onValueChange={() => handleNotificationToggle('push')}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={notifications.push ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Icon name="email" size={24} color={theme.colors.textSecondary} />
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            Email Notifications
          </Text>
        </View>
        <Switch
          value={notifications.email}
          onValueChange={() => handleNotificationToggle('email')}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={notifications.email ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Icon
            name="fingerprint"
            size={24}
            color={theme.colors.textSecondary}
          />
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            Biometric Login
          </Text>
        </View>
        <Switch
          value={privacy.biometric}
          onValueChange={() => handlePrivacyToggle('biometric')}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={privacy.biometric ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>
    </Animated.View>
  );

  const renderLogoutSection = () => (
    <Animated.View
      style={[
        styles.section,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <AuthButton
        title="Logout"
        onPress={handleLogout}
        style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
        textStyle={{ color: '#FFFFFF' }}
      />
    </Animated.View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header title="Profile" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderProfileSection()}
        {renderSettingsSection()}
        {renderLogoutSection()}
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
    paddingHorizontal: rp(12),
    paddingBottom: rp(16),
    paddingTop: rp(8),
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: rp(8),
    padding: rp(12),
    marginBottom: rp(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: fp(14),
    fontWeight: '600',
    marginBottom: rp(8),
    letterSpacing: 0.2,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: rp(16),
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: rp(80),
    height: rp(80),
    borderRadius: rp(40),
  },
  profileImagePlaceholder: {
    width: rp(80),
    height: rp(80),
    borderRadius: rp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: fp(32),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: rp(24),
    height: rp(24),
    borderRadius: rp(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: rp(12),
  },
  inputLabel: {
    fontSize: fp(12),
    fontWeight: '500',
    marginBottom: rp(4),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: rp(8),
    borderWidth: 1,
    paddingHorizontal: rp(12),
    height: rp(40),
  },
  inputIcon: {
    marginRight: rp(8),
  },
  inputField: {
    flex: 1,
    fontSize: fp(14),
    fontWeight: '400',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: rp(8),
    marginTop: rp(8),
  },
  halfButton: {
    flex: 1,
    height: rp(40),
    borderRadius: rp(8),
  },
  fullButton: {
    height: rp(40),
    borderRadius: rp(8),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: rp(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: fp(14),
    fontWeight: '500',
    marginLeft: rp(12),
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: fp(14),
    fontWeight: '500',
    marginRight: rp(4),
  },
  logoutButton: {
    height: rp(44),
    borderRadius: rp(8),
  },
});

export default ProfileScreen;
