import React from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../localization';
import { fp, rp } from '../utils/responsive';

interface FilterOption {
  key: string;
  label: string;
  icon?: string;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
  options: FilterOption[];
  title: string;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  selectedFilter,
  onFilterSelect,
  options,
  title,
}) => {
  const { theme } = useTheme();
  // Translation hook available if needed
  // const { t } = useTranslation();
  const slideAnim = React.useRef(new Animated.Value(300)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim]);

  const handleFilterSelect = (filter: string) => {
    onFilterSelect(filter);
    onClose();
  };

  const styles = createStyles(theme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={[styles.overlay, { opacity: fadeAnim }]}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={styles.iconContainer}>
                  <Icon name="tune" size={20} color={theme.colors.primary} />
                </View>
                <Text style={styles.title}>{title}</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Icon
                  name="close"
                  size={22}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* Filter Options */}
            <View style={styles.optionsContainer}>
              {options.map((option, _index) => {
                const isSelected = selectedFilter === option.key;
                return (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.filterOption,
                      isSelected && styles.filterOptionSelected,
                    ]}
                    onPress={() => handleFilterSelect(option.key)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.optionContent}>
                      {option.icon && (
                        <View
                          style={[
                            styles.optionIcon,
                            isSelected && styles.optionIconSelected,
                          ]}
                        >
                          <Icon
                            name={option.icon}
                            size={18}
                            color={
                              isSelected
                                ? theme.colors.buttonText
                                : theme.colors.textSecondary
                            }
                          />
                        </View>
                      )}
                      <Text
                        style={[
                          styles.optionText,
                          isSelected && styles.optionTextSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </View>
                    {isSelected && (
                      <View style={styles.selectedIndicator}>
                        <Icon
                          name="check"
                          size={16}
                          color={theme.colors.buttonText}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    backdrop: {
      flex: 1,
    },
    modalContainer: {
      backgroundColor: 'transparent',
    },
    modalContent: {
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: rp(20),
      borderTopRightRadius: rp(20),
      paddingTop: rp(20),
      paddingHorizontal: rp(20),
      paddingBottom: rp(24),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -6 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 12,
      borderTopWidth: 2,
      borderTopColor: theme.colors.primary,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: rp(20),
      paddingBottom: rp(12),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: rp(32),
      height: rp(32),
      borderRadius: rp(16),
      backgroundColor: `${theme.colors.primary}15`,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: rp(10),
    },
    title: {
      fontSize: fp(18),
      fontWeight: '800',
      color: theme.colors.text,
      letterSpacing: 0.3,
    },
    closeButton: {
      width: rp(36),
      height: rp(36),
      borderRadius: rp(18),
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    optionsContainer: {
      gap: rp(8),
    },
    filterOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: rp(10),
      paddingHorizontal: rp(16),
      borderRadius: rp(12),
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    filterOptionSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
      transform: [{ scale: 1.02 }],
    },
    optionContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    optionIcon: {
      width: rp(28),
      height: rp(28),
      borderRadius: rp(14),
      backgroundColor: `${theme.colors.textSecondary}20`,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: rp(10),
    },
    optionIconSelected: {
      backgroundColor: `${theme.colors.buttonText}20`,
    },
    optionText: {
      fontSize: fp(14),
      fontWeight: '600',
      color: theme.colors.textSecondary,
      letterSpacing: 0.1,
      flex: 1,
    },
    optionTextSelected: {
      color: theme.colors.buttonText,
      fontWeight: '700',
    },
    selectedIndicator: {
      width: rp(20),
      height: rp(20),
      borderRadius: rp(10),
      backgroundColor: `${theme.colors.buttonText}20`,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default FilterModal;
