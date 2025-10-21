import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface SocialLoginButtonProps {
  provider: 'google' | 'apple';
  onPress: () => void;
  disabled?: boolean;
  style?: any;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onPress,
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();

  const getProviderInfo = () => {
    switch (provider) {
      case 'google':
        return {
          text: 'Continue with Google',
          backgroundColor: theme.colors.surface,
          textColor: theme.colors.text,
          borderColor: theme.colors.border,
        };
      case 'apple':
        return {
          text: 'Continue with Apple',
          backgroundColor: theme.colors.text,
          textColor: theme.colors.surface,
          borderColor: theme.colors.text,
        };
      default:
        return {
          text: 'Continue',
          backgroundColor: theme.colors.surface,
          textColor: theme.colors.text,
          borderColor: theme.colors.border,
        };
    }
  };

  const providerInfo = getProviderInfo();

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: disabled
        ? theme.colors.buttonDisabled
        : providerInfo.borderColor,
      backgroundColor: disabled
        ? theme.colors.buttonDisabled
        : providerInfo.backgroundColor,
      minHeight: 50,
    },
    text: {
      fontSize: 16,
      fontWeight: '600',
      color: disabled ? theme.colors.textSecondary : providerInfo.textColor,
      marginLeft: theme.spacing.sm,
    },
    icon: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: disabled
        ? theme.colors.textSecondary
        : providerInfo.textColor,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.icon} />
      <Text style={styles.text}>{providerInfo.text}</Text>
    </TouchableOpacity>
  );
};

export default SocialLoginButton;
