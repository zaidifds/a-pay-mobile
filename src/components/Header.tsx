import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fp, rp } from '../utils/responsive';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../localization';

interface HeaderProps {
  title?: string;
  titleKey?: string; // Translation key for title
  rightButton?: {
    icon: string;
    onPress: () => void;
    color?: string;
  };
  showBackButton?: boolean;
  onBackPress?: () => void;
  backgroundColor?: string;
  titleColor?: string;
  showFilterButton?: boolean;
  onFilterPress?: () => void;
  filterActive?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  titleKey,
  rightButton,
  showBackButton = false,
  onBackPress,
  backgroundColor,
  titleColor,
  showFilterButton = false,
  onFilterPress,
  filterActive = false,
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  const headerBackgroundColor = backgroundColor || theme.colors.surface;
  const headerTitleColor = titleColor || theme.colors.text;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: headerBackgroundColor,
      paddingTop: insets.top,
      paddingBottom: rp(12),
      paddingHorizontal: rp(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 4,
      elevation: 2,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    backButton: {
      padding: rp(6),
      marginRight: rp(8),
      borderRadius: rp(8),
      backgroundColor: theme.colors.buttonSecondary,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
    },
    title: {
      fontSize: fp(18),
      fontWeight: '600',
      color: headerTitleColor,
      letterSpacing: 0.2,
      flex: 1,
    },
    rtlTitle: {
      textAlign: 'right',
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rp(8),
    },
    rightButton: {
      padding: rp(8),
      borderRadius: rp(8),
      backgroundColor: theme.colors.buttonSecondary,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
    },
    filterButton: {
      padding: rp(8),
      borderRadius: rp(8),
      backgroundColor: filterActive
        ? theme.colors.primary
        : theme.colors.buttonSecondary,
      borderWidth: 1,
      borderColor: filterActive
        ? theme.colors.primary
        : theme.colors.borderLight,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={headerBackgroundColor}
      />

      {/* Left Section - Back Button + Title */}
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Icon name="arrow-back" size={rp(20)} color={theme.colors.icon} />
          </TouchableOpacity>
        )}
        <Text style={[styles.title, isRTL && styles.rtlTitle]}>
          {titleKey ? t(titleKey as any) : title}
        </Text>
      </View>

      {/* Right Section - Action Buttons */}
      <View style={styles.rightSection}>
        {showFilterButton && (
          <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
            <Icon
              name="filter-list"
              size={rp(18)}
              color={filterActive ? theme.colors.buttonText : theme.colors.icon}
            />
          </TouchableOpacity>
        )}
        {rightButton && (
          <TouchableOpacity
            style={styles.rightButton}
            onPress={rightButton.onPress}
          >
            <Icon
              name={rightButton.icon}
              size={rp(20)}
              color={rightButton.color || theme.colors.icon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
