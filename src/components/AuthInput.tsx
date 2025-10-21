import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface AuthInputProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
  containerStyle?: any;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  error,
  isPassword = false,
  containerStyle,
  ...props
}) => {
  const { theme } = useTheme();
  const [isSecure, setIsSecure] = useState(isPassword);

  const styles = StyleSheet.create({
    container: {
      marginBottom: theme.spacing.md,
      ...containerStyle,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: error ? theme.colors.error : theme.colors.border,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
      minHeight: 50,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
      paddingVertical: theme.spacing.sm,
    },
    toggleButton: {
      padding: theme.spacing.sm,
    },
    toggleText: {
      fontSize: 14,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    errorText: {
      fontSize: 12,
      color: theme.colors.error,
      marginTop: theme.spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={isSecure}
          placeholderTextColor={theme.colors.textSecondary}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsSecure(!isSecure)}
          >
            <Text style={styles.toggleText}>{isSecure ? 'Show' : 'Hide'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default AuthInput;
