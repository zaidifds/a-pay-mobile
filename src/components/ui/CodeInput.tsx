import React, { useRef } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';

interface CodeInputProps {
  length?: number;
  value: string[];
  onChangeText: (text: string, index: number) => void;
  onKeyPress?: (key: string, index: number) => void;
  error?: string;
  autoFocus?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

const CodeInput: React.FC<CodeInputProps> = ({
  length = 6,
  value,
  onChangeText,
  onKeyPress,
  error,
  autoFocus = false,
  keyboardType = 'default',
}) => {
  const { theme } = useTheme();
  const { isRTL } = useTranslation();
  const inputRefs = useRef<TextInput[]>([]);

  const handleTextChange = (text: string, index: number) => {
    // Only allow single digit
    if (text.length > 1) {
      text = text.slice(-1);
    }

    onChangeText(text, index);

    // Auto-focus next input
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    onKeyPress?.(key, index);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.codeContainer, isRTL && styles.codeContainerRTL]}>
        {Array.from({ length }, (_, index) => (
          <TextInput
            key={index}
            keyboardType={keyboardType}
            ref={ref => {
              if (ref) inputRefs.current[index] = ref;
            }}
            style={[
              styles.codeInput,
              {
                borderColor: value[index]
                  ? theme.colors.primary
                  : error
                  ? theme.colors.error
                  : theme.colors.inputBorder,
                backgroundColor: theme.colors.input,
                color: theme.colors.text,
                shadowColor: value[index]
                  ? theme.colors.primary
                  : theme.colors.shadowColor,
              },
            ]}
            value={value[index] || ''}
            onChangeText={text => handleTextChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(nativeEvent.key, index)
            }
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            selectTextOnFocus
            autoFocus={autoFocus && index === 0}
          />
        ))}
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
    alignItems: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20, // Proper spacing between boxes
  },
  codeContainerRTL: {
    flexDirection: 'row-reverse',
  },
  codeInput: {
    width: 45,
    height: 55,
    borderWidth: 1.5,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  errorText: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default CodeInput;
