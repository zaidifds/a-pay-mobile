import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';

interface StandardButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const StandardButton: React.FC<StandardButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();
  const { isRTL } = useTranslation();

  const getButtonStyles = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [
      styles.button,
      {
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor(),
        borderWidth: variant === 'outline' ? 1.5 : 0,
        height: getHeight(),
        borderRadius: getBorderRadius(),
        shadowColor: theme.colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
    ];

    if (fullWidth) {
      baseStyles.push(styles.fullWidth);
    }

    if (disabled || loading) {
      baseStyles.push({ opacity: 0.6 });
    }

    if (style) {
      baseStyles.push(style);
    }

    return baseStyles;
  };

  const getTextStyles = (): TextStyle[] => {
    return [
      styles.text,
      {
        color: getTextColor(),
        fontSize: getFontSize(),
        fontWeight: getFontWeight(),
      },
      isRTL && styles.textRTL,
      textStyle,
    ];
  };

  const getBackgroundColor = (): string => {
    if (disabled || loading) {
      return theme.colors.buttonDisabled;
    }

    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'outline':
        return 'transparent';
      default:
        return theme.colors.primary;
    }
  };

  const getBorderColor = (): string => {
    if (disabled || loading) {
      return theme.colors.buttonDisabled;
    }

    switch (variant) {
      case 'outline':
        return theme.colors.primary;
      default:
        return 'transparent';
    }
  };

  const getTextColor = (): string => {
    if (disabled || loading) {
      return theme.colors.textSecondary;
    }

    switch (variant) {
      case 'primary':
        return theme.colors.buttonText;
      case 'secondary':
        return theme.colors.text;
      case 'outline':
        return theme.colors.primary;
      default:
        return theme.colors.buttonText;
    }
  };

  const getHeight = (): number => {
    switch (size) {
      case 'small':
        return 40;
      case 'medium':
        return 48;
      case 'large':
        return 56;
      default:
        return 56;
    }
  };

  const getBorderRadius = (): number => {
    switch (size) {
      case 'small':
        return 8;
      case 'medium':
        return 12;
      case 'large':
        return 16;
      default:
        return 16;
    }
  };

  const getFontSize = (): number => {
    switch (size) {
      case 'small':
        return 14;
      case 'medium':
        return 16;
      case 'large':
        return 18;
      default:
        return 18;
    }
  };

  const getFontWeight = (): 'normal' | 'bold' => {
    return 'bold';
  };

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <Text style={getTextStyles()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
  textRTL: {
    textAlign: 'center',
  },
});

export default StandardButton;
