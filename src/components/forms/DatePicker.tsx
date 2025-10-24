import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';

interface DatePickerProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  dateFormat?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  placeholder = 'Select date',
  value,
  onChangeText,
  error,
  onFocus,
  onBlur,
  disabled = false,
  minimumDate,
  maximumDate,
  mode = 'date',
  dateFormat: _dateFormat = 'DD MMM, YYYY',
}) => {
  const { theme } = useTheme();
  const { isRTL } = useTranslation();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    value ? new Date(value) : new Date(),
  );

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleDateChange = (event: any, newSelectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (event.type === 'set' && newSelectedDate) {
        setSelectedDate(newSelectedDate);
        const formattedDate = formatDate(newSelectedDate);
        onChangeText?.(formattedDate);
        onBlur?.();
      }
    } else {
      // iOS - just update the selected date
      if (newSelectedDate) {
        setSelectedDate(newSelectedDate);
      }
    }
  };

  const handleDone = () => {
    const formattedDate = formatDate(selectedDate);
    onChangeText?.(formattedDate);
    setShowPicker(false);
    onBlur?.();
  };

  const handlePress = () => {
    if (!disabled) {
      onFocus?.();
      setShowPicker(true);
    }
  };

  const handleClose = () => {
    setShowPicker(false);
    onBlur?.();
  };

  const getInputStyles = () => {
    const baseStyles = [
      styles.input,
      {
        borderColor: error ? theme.colors.error : theme.colors.inputBorder,
        backgroundColor: theme.colors.input,
        shadowColor: theme.colors.shadowColor,
      },
      isRTL && styles.inputRTL,
    ];

    return baseStyles;
  };

  const getTextStyles = () => {
    return [
      styles.inputText,
      {
        color: value ? theme.colors.text : theme.colors.textSecondary,
      },
      isRTL && styles.inputTextRTL,
    ];
  };

  const getIconStyles = () => {
    return [
      styles.icon,
      {
        color: theme.colors.iconSecondary,
      },
    ];
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={getInputStyles()}
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Text style={getTextStyles()}>{value || placeholder}</Text>
        <Text style={getIconStyles()}>📅</Text>
      </TouchableOpacity>

      {error && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}

      {showPicker && Platform.OS === 'ios' && (
        <Modal
          transparent
          visible={showPicker}
          animationType="fade"
          onRequestClose={handleClose}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={handleClose}
          >
            <TouchableOpacity
              style={[
                styles.modalContent,
                { backgroundColor: theme.colors.surface },
              ]}
              activeOpacity={1}
              onPress={e => e.stopPropagation()}
            >
              <View
                style={[
                  styles.modalHeader,
                  { borderBottomColor: theme.colors.border },
                ]}
              >
                <TouchableOpacity onPress={handleClose}>
                  <Text
                    style={[
                      styles.cancelButton,
                      { color: theme.colors.primary },
                    ]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                  Select Date
                </Text>
                <TouchableOpacity onPress={handleDone}>
                  <Text
                    style={[styles.doneButton, { color: theme.colors.primary }]}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
              </View>

              <DateTimePicker
                value={selectedDate}
                mode={mode === 'datetime' ? 'date' : mode}
                display="spinner"
                onChange={handleDateChange}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                style={styles.picker}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      )}

      {showPicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={selectedDate}
          mode={mode === 'datetime' ? 'date' : mode}
          display="default"
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  input: {
    height: 56,
    borderWidth: 1.5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputRTL: {
    flexDirection: 'row-reverse',
  },
  inputText: {
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
  },
  inputTextRTL: {
    textAlign: 'right',
  },
  icon: {
    fontSize: 20,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 20,
    paddingBottom: 34,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  doneButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  picker: {
    height: Platform.OS === 'ios' ? 250 : 200,
  },
});

export default DatePicker;
