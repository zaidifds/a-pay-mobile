import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';

interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface FormDropdownProps {
  placeholder: string;
  options: DropdownOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  error?: string;
  disabled?: boolean;
  style?: any;
}

const FormDropdown: React.FC<FormDropdownProps> = ({
  placeholder,
  options,
  selectedValue,
  onSelect,
  error,
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();
  const { isRTL } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const selectedOption = options.find(option => option.value === selectedValue);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsVisible(false);
  };

  const getDropdownStyles = () => ({
    borderColor: error
      ? theme.colors.error
      : isVisible
      ? theme.colors.primary
      : theme.colors.inputBorder,
    backgroundColor: disabled ? theme.colors.inputDisabled : theme.colors.input,
    shadowColor: isVisible ? theme.colors.primary : theme.colors.shadowColor,
    shadowOffset: { width: 0, height: isVisible ? 2 : 1 },
    shadowOpacity: isVisible ? 0.15 : 0.05,
    shadowRadius: isVisible ? 4 : 2,
    elevation: isVisible ? 3 : 1,
  });

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.dropdown,
          getDropdownStyles(),
          isRTL && styles.dropdownRTL,
        ]}
        onPress={() => !disabled && setIsVisible(true)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <View
          style={[styles.dropdownContent, isRTL && styles.dropdownContentRTL]}
        >
          {selectedOption?.icon && (
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>{selectedOption.icon}</Text>
            </View>
          )}
          <Text
            style={[
              styles.dropdownText,
              {
                color: selectedOption
                  ? theme.colors.text
                  : theme.colors.inputPlaceholder,
              },
            ]}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
        </View>
        <Text style={[styles.arrow, { color: theme.colors.iconSecondary }]}>
          ▼
        </Text>
      </TouchableOpacity>

      {error && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.surface },
              isRTL && styles.modalContentRTL,
            ]}
          >
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    { borderBottomColor: theme.colors.borderLight },
                    isRTL && styles.optionItemRTL,
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  {item.icon && (
                    <View style={styles.optionIconContainer}>
                      <Text style={styles.iconText}>{item.icon}</Text>
                    </View>
                  )}
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          selectedValue === item.value
                            ? theme.colors.primary
                            : theme.colors.text,
                        fontWeight:
                          selectedValue === item.value ? '600' : '400',
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  dropdown: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dropdownRTL: {
    flexDirection: 'row-reverse',
  },
  dropdownContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContentRTL: {
    flexDirection: 'row-reverse',
  },
  iconContainer: {
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
  },
  arrow: {
    fontSize: 12,
    marginLeft: 8,
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
    paddingHorizontal: 20,
  },
  modalContent: {
    maxHeight: 300,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalContentRTL: {
    // RTL specific styles if needed
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  optionItemRTL: {
    flexDirection: 'row-reverse',
  },
  optionIconContainer: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
});

export default FormDropdown;
