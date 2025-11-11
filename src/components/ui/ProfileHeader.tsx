import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';

interface ProfileHeaderProps {
  userName?: string;
  profileImage?: string;
  showNotificationBadge?: boolean;
  showMenuButton?: boolean;
  onNotificationPress?: () => void;
  onMenuPress?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userName = 'Cara Dune',
  profileImage = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
  showNotificationBadge = false,
  showMenuButton = false,
  onNotificationPress,
  onMenuPress,
}) => {
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();
  const insets = useSafeAreaInsets();

  // Dynamic greeting based on current time
  const currentTime = new Date().getHours();
  const greeting =
    currentTime < 12
      ? t('good_morning')
      : currentTime < 18
      ? t('good_afternoon')
      : t('good_evening');

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
        translucent={false}
      />

      <View
        style={[
          styles(theme, isRTL).header,
          { paddingTop: insets.top + rp(12) },
        ]}
      >
        {/* Profile Section */}
        <View style={styles(theme, isRTL).headerLeft}>
          <Image
            source={{ uri: profileImage }}
            style={styles(theme, isRTL).avatar}
          />
          <View style={styles(theme, isRTL).headerGreeting}>
            <Text style={styles(theme, isRTL).greetingText}>{greeting},</Text>
            <Text style={styles(theme, isRTL).userName}>{userName}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles(theme, isRTL).headerActions}>
          {/* Notification Button */}
          <TouchableOpacity
            onPress={onNotificationPress}
            style={styles(theme, isRTL).iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="notifications-none"
              size={rp(24)}
              color={theme.colors.text}
            />
            {showNotificationBadge && (
              <View style={styles(theme, isRTL).notificationBadge} />
            )}
          </TouchableOpacity>

          {/* Menu Button (Optional) */}
          {showMenuButton && (
            <TouchableOpacity
              style={styles(theme, isRTL).iconButton}
              onPress={onMenuPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="more-vert" size={rp(24)} color={theme.colors.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = (theme: any, isRTL: boolean) =>
  StyleSheet.create({
    header: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: rp(20),
      paddingBottom: rp(16),
      backgroundColor: theme.colors.background,
    },
    headerLeft: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatar: {
      width: rp(40),
      height: rp(40),
      borderRadius: rp(20),
      marginRight: isRTL ? 0 : rp(12),
      marginLeft: isRTL ? rp(12) : 0,
    },
    headerGreeting: {
      flex: 1,
      alignItems: isRTL ? 'flex-end' : 'flex-start',
    },
    greetingText: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      fontWeight: '400',
      textAlign: isRTL ? 'right' : 'left',
    },
    userName: {
      fontSize: fp(16),
      fontWeight: '600',
      color: theme.colors.text,
      marginTop: rp(2),
      textAlign: isRTL ? 'right' : 'left',
    },
    headerActions: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      gap: rp(12),
    },
    iconButton: {
      padding: rp(8),
      borderRadius: rp(20),
      position: 'relative',
    },
    notificationBadge: {
      position: 'absolute',
      top: rp(6),
      right: isRTL ? undefined : rp(6),
      left: isRTL ? rp(6) : undefined,
      width: rp(8),
      height: rp(8),
      borderRadius: rp(4),
      backgroundColor: theme.colors.error || '#FF4444',
    },
  });

export default ProfileHeader;
