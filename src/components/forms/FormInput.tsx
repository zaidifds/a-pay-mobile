import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';

interface FormInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  disabled?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: any;
  multiline?: boolean;
  numberOfLines?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  value,
  onChangeText,
  error,
  disabled = false,
  keyboardType = 'default',
  secureTextEntry = false,
  rightIcon,
  onRightIconPress,
  onFocus,
  onBlur,
  style,
  multiline = false,
  numberOfLines = 1,
}) => {
  const { theme } = useTheme();
  const { isRTL } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyles = () => ({
    borderColor: error
      ? theme.colors.error
      : isFocused
      ? theme.colors.primary
      : theme.colors.inputBorder,
    backgroundColor: disabled ? theme.colors.inputDisabled : theme.colors.input,
    shadowColor: isFocused ? theme.colors.primary : theme.colors.shadowColor,
    shadowOffset: { width: 0, height: isFocused ? 2 : 1 },
    shadowOpacity: isFocused ? 0.15 : 0.05,
    shadowRadius: isFocused ? 4 : 2,
    elevation: isFocused ? 3 : 1,
  });

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.inputContainer,
          getInputStyles(),
          isRTL && styles.inputContainerRTL,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text,
              textAlign: isRTL ? 'right' : 'left',
            },
            isRTL && styles.inputRTL,
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.inputPlaceholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputContainerRTL: {
    flexDirection: 'row-reverse',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
  },
  inputRTL: {
    textAlign: 'right',
  },
  rightIconContainer: {
    marginLeft: 12,
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default FormInput;
