import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import React from 'react';
import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface DynamicHeaderProps {
  // Title configuration
  title?: string;
  titleKey?: string; // Translation key for title

  // Back button configuration
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonTextKey?: string; // Translation key for back button text
  backButtonIcon?: string;
  onBackPress?: () => void;

  // Right button configuration
  showRightButton?: boolean;
  rightButtonText?: string;
  rightButtonTextKey?: string; // Translation key for right button text
  rightButtonIcon?: string;
  onRightPress?: () => void;

  // Custom content
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const DynamicHeader: React.FC<DynamicHeaderProps> = ({
  // Title props
  title,
  titleKey,

  // Back button props
  showBackButton = false,
  backButtonText,
  backButtonTextKey,
  backButtonIcon = '←',
  onBackPress,

  // Right button props
  showRightButton = false,
  rightButtonText,
  rightButtonTextKey,
  rightButtonIcon,
  onRightPress,

  // Custom content props
  leftContent,
  centerContent,
  rightContent,
}) => {
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();
  const insets = useSafeAreaInsets();

  // Get computed values
  const computedTitle = titleKey ? t(titleKey as any) : title || '';
  const computedBackButtonText = backButtonTextKey
    ? t(backButtonTextKey as any)
    : backButtonText;
  const computedRightButtonText = rightButtonTextKey
    ? t(rightButtonTextKey as any)
    : rightButtonText;

  const headerStyles = {
    backgroundColor: theme.colors.background,
    borderBottomColor: theme.colors.borderHeader,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: Platform.OS === 'ios' ? 44 + insets.top : 56 + insets.top,
    paddingTop: insets.top,
  };

  const shadowStyles = {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  };

  const borderStyles = {
    borderBottomWidth: 1,
  };

  const renderBackButton = () => {
    if (!showBackButton && !leftContent) return null;

    if (leftContent) {
      return leftContent;
    }

    return (
      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          isRTL && styles.backButtonRTL,
          pressed && styles.pressedButton,
        ]}
        onPress={() => {
          console.log('Back button pressed');
          onBackPress?.();
        }}
        android_ripple={{
          color: theme.colors.primary + '20',
          borderless: true,
        }}
      >
        {backButtonIcon && (
          <Text style={styles.backIcon}>{backButtonIcon}</Text>
        )}
        {computedBackButtonText && (
          <Text style={styles.backText}>{computedBackButtonText}</Text>
        )}
      </Pressable>
    );
  };

  const renderCenterContent = () => {
    if (centerContent) {
      return centerContent;
    }

    if (!computedTitle) return null;

    return (
      <View style={styles.titleContainer}>
        <Text
          style={[styles.title, isRTL && styles.titleRTL]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {computedTitle}
        </Text>
      </View>
    );
  };

  const renderRightButton = () => {
    if (!showRightButton && !rightContent) return null;

    if (rightContent) {
      return rightContent;
    }

    return (
      <Pressable
        style={({ pressed }) => [
          styles.rightButton,
          pressed && styles.pressedButton,
        ]}
        onPress={() => {
          console.log('Right button pressed');
          onRightPress?.();
        }}
        android_ripple={{
          color: theme.colors.primary + '20',
          borderless: true,
        }}
      >
        {rightButtonIcon && (
          <Text style={styles.rightIcon}>{rightButtonIcon}</Text>
        )}
        {computedRightButtonText && (
          <Text style={styles.rightText}>{computedRightButtonText}</Text>
        )}
      </Pressable>
    );
  };

  return (
    <>
      <StatusBar
        barStyle="default"
        backgroundColor={headerStyles.backgroundColor}
        translucent={false}
      />
      <View
        style={[
          styles.container,
          headerStyles,
          shadowStyles,
          borderStyles,
          isRTL && styles.containerRTL,
        ]}
      >
        <View style={[styles.content, isRTL && styles.contentRTL]}>
          {/* Left Section */}
          <View style={[styles.leftSection, isRTL && styles.leftSectionRTL]}>
            {renderBackButton()}
          </View>

          {/* Center Section */}
          <View
            style={[styles.centerSection, isRTL && styles.centerSectionRTL]}
          >
            {renderCenterContent()}
          </View>

          {/* Right Section */}
          <View style={[styles.rightSection, isRTL && styles.rightSectionRTL]}>
            {renderRightButton()}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  containerRTL: {
    // RTL specific container styles if needed
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
  },
  contentRTL: {
    flexDirection: 'row-reverse',
  },
  leftSection: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 80,
    zIndex: 3,
  },
  leftSectionRTL: {
    alignItems: 'flex-end',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 80,
    zIndex: 1,
  },
  centerSectionRTL: {
    // RTL specific center styles if needed
  },
  rightSection: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 80,
    zIndex: 3,
  },
  rightSectionRTL: {
    alignItems: 'flex-start',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    justifyContent: 'flex-start',
    minHeight: 44,
    minWidth: 44,
  },
  backButtonRTL: {
    flexDirection: 'row-reverse',
  },
  backIcon: {
    fontWeight: 'bold',
    marginRight: 4,
    fontSize: 18,
    color: '#000000',
  },
  backText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#3B82F6',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  titleContainerCentered: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  titleRTL: {
    textAlign: 'center',
  },
  rightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'flex-end',
  },
  rightIcon: {
    marginLeft: 4,
    fontSize: 16,
    color: '#3B82F6',
  },
  rightText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#3B82F6',
  },
  pressedButton: {
    opacity: 0.6,
  },
});

export default DynamicHeader;
