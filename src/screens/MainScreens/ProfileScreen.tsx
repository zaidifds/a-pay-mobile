import React, { useMemo, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { useImagePicker } from '../../hooks/useImagePicker';
import { useTranslation } from '../../localization';
import LanguageSelector from '../../components/LanguageSelector';
import {
  logoutUser,
  setUser,
  updateUserProfilePicture,
} from '../../redux/slices/authSlice';
import {
  updateNotifications,
  updatePrivacy,
} from '../../redux/slices/settingsSlice';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { fp, rp } from '../../utils/responsive';
import { UserPreferences } from '../../utils/userPreferences';

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { isDark } = useAppSelector((state: RootState) => state.theme);
  const { notifications, privacy } = useAppSelector(
    (state: RootState) => state.settings,
  );
  const { language, isRTL } = useAppSelector(
    (state: RootState) => state.localization,
  );
  const { theme } = useTheme();
  const { t } = useTranslation();

  // Form state
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLanguageSelectorVisible, setIsLanguageSelectorVisible] =
    useState(false);
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isLoading, setIsLoading] = useState(false);

  // Image picker functionality
  const handleImageSelected = (uri: string) => {
    dispatch(updateUserProfilePicture(uri));
  };

  const { pickImage, isLoading: isImageLoading } =
    useImagePicker(handleImageSelected);

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
    setIsEditModalVisible(true);
    setFullName(user?.name || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
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
      setIsEditModalVisible(false);
      setIsLoading(false);
      Alert.alert('Success', 'Profile updated successfully');
    }, 1000);
  };

  const handleCancelEdit = () => {
    setFullName(user?.name || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
    setIsEditModalVisible(false);
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
    setIsLanguageSelectorVisible(true);
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
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity
            activeOpacity={1}
            disabled={!isEditModalVisible}
            style={styles.profileImageWrapper}
          >
            {user?.avatar ? (
              <Image
                source={
                  typeof user.avatar === 'string'
                    ? { uri: user.avatar }
                    : (user.avatar as any)
                }
                style={styles.profileImage}
              />
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
            {/* Camera icon hidden outside edit mode */}
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <Text style={[styles.userName, { color: theme.colors.text }]}>
            {user?.name || 'John Doe'}
          </Text>
          <Text
            style={[styles.userEmail, { color: theme.colors.textSecondary }]}
          >
            {user?.email || 'john.doe@example.com'}
          </Text>
          <View style={styles.verificationBadge}>
            <Icon name="verified" size={16} color={theme.colors.success} />
            <Text
              style={[styles.verifiedText, { color: theme.colors.success }]}
            >
              {t('verified')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.profileActions}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={handleEditProfile}
        >
          <Icon name="edit" size={18} color={theme.colors.buttonText} />
          <Text
            style={[
              styles.actionButtonText,
              { color: theme.colors.buttonText },
            ]}
          >
            {t('edit_profile')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Icon name="security" size={18} color={theme.colors.text} />
          <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>
            {t('security')}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderAccountInfoSection = () => (
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
        {t('account_information')}
      </Text>

      <View style={styles.infoItem}>
        <View style={styles.infoLeft}>
          <Icon
            name="account-balance-wallet"
            size={20}
            color={theme.colors.primary}
          />
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: theme.colors.text }]}>
              {t('wallet_id')}
            </Text>
            <Text
              style={[styles.infoValue, { color: theme.colors.textSecondary }]}
            >
              AP-****-****-****-1234
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon
            name="content-copy"
            size={18}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoItem}>
        <View style={styles.infoLeft}>
          <Icon name="calendar-today" size={20} color={theme.colors.primary} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: theme.colors.text }]}>
              {t('member_since')}
            </Text>
            <Text
              style={[styles.infoValue, { color: theme.colors.textSecondary }]}
            >
              January 2024
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.infoItem}>
        <View style={styles.infoLeft}>
          <Icon name="verified" size={20} color={theme.colors.success} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: theme.colors.text }]}>
              {t('account_status')}
            </Text>
            <Text style={[styles.infoValue, { color: theme.colors.success }]}>
              {t('verified')}
            </Text>
          </View>
        </View>
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
        {t('preferences')}
      </Text>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Icon name="dark-mode" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            {t('dark_mode')}
          </Text>
        </View>
        <Switch
          value={isDark}
          onValueChange={handleThemeToggle}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={theme.colors.buttonText}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Icon name="language" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            {t('language')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLanguageChange}
          style={styles.languageButton}
        >
          <Text style={[styles.languageText, { color: theme.colors.primary }]}>
            {language === 'en'
              ? t('english')
              : language === 'ar'
              ? t('arabic')
              : language === 'ur'
              ? t('urdu')
              : t('croatian')}
          </Text>
          <Icon name="arrow-drop-down" size={18} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Icon
            name="notifications"
            size={20}
            color={theme.colors.textSecondary}
          />
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            {t('push_notifications')}
          </Text>
        </View>
        <Switch
          value={notifications.push}
          onValueChange={() => handleNotificationToggle('push')}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={theme.colors.buttonText}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Icon name="email" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            {t('email_notifications')}
          </Text>
        </View>
        <Switch
          value={notifications.email}
          onValueChange={() => handleNotificationToggle('email')}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={theme.colors.buttonText}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Icon
            name="fingerprint"
            size={20}
            color={theme.colors.textSecondary}
          />
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            {t('biometric_login')}
          </Text>
        </View>
        <Switch
          value={privacy.biometric}
          onValueChange={() => handlePrivacyToggle('biometric')}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={theme.colors.buttonText}
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
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
        onPress={handleLogout}
      >
        <Icon name="logout" size={18} color={theme.colors.buttonText} />
        <Text
          style={[styles.logoutButtonText, { color: theme.colors.buttonText }]}
        >
          {t('logout')}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderEditProfileModal = () => (
    <Modal
      visible={isEditModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCancelEdit}
    >
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <View
          style={[
            styles.modalHeader,
            { borderBottomColor: theme.colors.border },
          ]}
        >
          <TouchableOpacity onPress={handleCancelEdit}>
            <Icon name="close" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
            {t('edit_profile')}
          </Text>
          <TouchableOpacity onPress={handleSaveProfile} disabled={isLoading}>
            <Text style={[styles.saveButton, { color: theme.colors.primary }]}>
              {isLoading ? t('loading') : t('save')}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.modalContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileImageSection}>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.profileImageWrapper}
            >
              {user?.avatar ? (
                <Image
                  source={
                    typeof user.avatar === 'string'
                      ? { uri: user.avatar }
                      : (user.avatar as any)
                  }
                  style={styles.modalProfileImage}
                />
              ) : (
                <View
                  style={[
                    styles.modalProfileImagePlaceholder,
                    { backgroundColor: theme.colors.primary },
                  ]}
                >
                  <Text style={styles.modalProfileImageText}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
              )}
              <View
                style={[
                  styles.modalEditIconContainer,
                  { backgroundColor: theme.colors.primary },
                ]}
              >
                {isImageLoading ? (
                  <Icon
                    name="hourglass-empty"
                    size={16}
                    color={theme.colors.buttonText}
                  />
                ) : (
                  <Icon
                    name="camera-alt"
                    size={16}
                    color={theme.colors.buttonText}
                  />
                )}
              </View>
            </TouchableOpacity>
            <Text
              style={[
                styles.changePhotoText,
                { color: theme.colors.textSecondary },
              ]}
            >
              {t('change_photo')}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
              {t('full_name')} *
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
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
              {t('email')} *
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
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
              {t('phone_number')}
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
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  const styles = createStyles(theme, isRTL);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header titleKey="profile" showLanguageSwitch={true} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderProfileSection()}
        {renderAccountInfoSection()}
        {renderSettingsSection()}
        {renderLogoutSection()}
      </ScrollView>
      {renderEditProfileModal()}
      <LanguageSelector
        visible={isLanguageSelectorVisible}
        onClose={() => setIsLanguageSelectorVisible(false)}
      />
    </View>
  );
};

const createStyles = (theme: any, isRTL: boolean) =>
  StyleSheet.create({
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
      backgroundColor: theme.colors.card,
      borderRadius: rp(8),
      padding: rp(12),
      marginBottom: rp(8),
      shadowColor: theme.colors.shadow,
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
      textAlign: isRTL ? 'right' : 'left',
    },
    profileHeader: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginBottom: rp(20),
    },
    profileImageContainer: {
      marginRight: isRTL ? 0 : rp(16),
      marginLeft: isRTL ? rp(16) : 0,
    },
    profileImageWrapper: {
      position: 'relative',
    },
    profileImage: {
      width: rp(70),
      height: rp(70),
      borderRadius: rp(35),
    },
    profileImagePlaceholder: {
      width: rp(70),
      height: rp(70),
      borderRadius: rp(35),
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileImageText: {
      fontSize: fp(28),
      fontWeight: 'bold',
      color: theme.colors.textInverse,
    },
    editIconContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: rp(22),
      height: rp(22),
      borderRadius: rp(11),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.textInverse,
    },
    profileInfo: {
      flex: 1,
    },
    userName: {
      fontSize: fp(18),
      fontWeight: '700',
      marginBottom: rp(4),
      textAlign: isRTL ? 'right' : 'left',
    },
    userEmail: {
      fontSize: fp(14),
      marginBottom: rp(8),
      textAlign: isRTL ? 'right' : 'left',
    },
    verificationBadge: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    verifiedText: {
      fontSize: fp(12),
      fontWeight: '600',
      marginLeft: isRTL ? 0 : rp(4),
      marginRight: isRTL ? rp(4) : 0,
    },
    profileActions: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      gap: rp(12),
    },
    actionButton: {
      flex: 1,
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: rp(10),
      borderRadius: rp(8),
      borderWidth: 1,
      gap: rp(6),
    },
    actionButtonText: {
      fontSize: fp(12),
      fontWeight: '600',
    },
    inputContainer: {
      marginBottom: rp(12),
    },
    inputLabel: {
      fontSize: fp(12),
      fontWeight: '500',
      marginBottom: rp(4),
      textAlign: isRTL ? 'right' : 'left',
    },
    inputWrapper: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      borderRadius: rp(8),
      borderWidth: 1,
      paddingHorizontal: rp(12),
      height: rp(40),
    },
    inputIcon: {
      marginRight: isRTL ? 0 : rp(8),
      marginLeft: isRTL ? rp(8) : 0,
    },
    inputField: {
      flex: 1,
      fontSize: fp(14),
      fontWeight: '400',
      textAlign: isRTL ? 'right' : 'left',
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
    infoItem: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: rp(12),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    infoLeft: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      flex: 1,
    },
    infoContent: {
      marginLeft: isRTL ? 0 : rp(12),
      marginRight: isRTL ? rp(12) : 0,
    },
    infoLabel: {
      fontSize: fp(13),
      fontWeight: '600',
      marginBottom: rp(2),
      textAlign: isRTL ? 'right' : 'left',
    },
    infoValue: {
      fontSize: fp(12),
      fontWeight: '400',
      textAlign: isRTL ? 'right' : 'left',
    },
    settingItem: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: rp(12),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    settingLeft: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingLabel: {
      fontSize: fp(13),
      fontWeight: '600',
      marginLeft: isRTL ? 0 : rp(12),
      marginRight: isRTL ? rp(12) : 0,
      textAlign: isRTL ? 'right' : 'left',
    },
    languageButton: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    languageText: {
      fontSize: fp(13),
      fontWeight: '600',
      marginRight: isRTL ? 0 : rp(4),
      marginLeft: isRTL ? rp(4) : 0,
    },
    logoutButton: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: rp(44),
      borderRadius: rp(8),
      gap: rp(8),
    },
    logoutButtonText: {
      fontSize: fp(14),
      fontWeight: '600',
    },
    modalContainer: {
      flex: 1,
    },
    modalHeader: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: rp(16),
      paddingVertical: rp(12),
      borderBottomWidth: 1,
    },
    modalTitle: {
      fontSize: fp(18),
      fontWeight: '700',
      textAlign: isRTL ? 'right' : 'left',
    },
    saveButton: {
      fontSize: fp(16),
      fontWeight: '600',
    },
    modalContent: {
      flex: 1,
      paddingHorizontal: rp(16),
    },
    profileImageSection: {
      alignItems: 'center',
      paddingVertical: rp(24),
    },
    modalProfileImage: {
      width: rp(100),
      height: rp(100),
      borderRadius: rp(50),
    },
    modalProfileImagePlaceholder: {
      width: rp(100),
      height: rp(100),
      borderRadius: rp(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalProfileImageText: {
      fontSize: fp(40),
      fontWeight: 'bold',
      color: theme.colors.textInverse,
    },
    modalEditIconContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: rp(32),
      height: rp(32),
      borderRadius: rp(16),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: theme.colors.textInverse,
    },
    changePhotoText: {
      fontSize: fp(14),
      marginTop: rp(8),
      textAlign: isRTL ? 'right' : 'left',
    },
  });

export default ProfileScreen;
