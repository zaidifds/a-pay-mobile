import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../localization';
import { LANGUAGE_FLAGS, LANGUAGE_NAMES } from '../localization/constants';
import LanguageSelector from './LanguageSelector';
import { fp, rp } from '../utils/responsive';

/**
 * LanguageSwitch Component
 *
 * A compact language switch component that displays the current language flag and code/name.
 * When pressed, it opens the LanguageSelector modal for language selection.
 *
 * Usage:
 * - In Header: <LanguageSwitch variant="compact" />
 * - Standalone: <LanguageSwitch variant="full" showLabel={true} />
 *
 * @param variant - 'compact' shows flag + code, 'full' shows flag + name + code
 * @param showLabel - Whether to show the language label (default: true)
 */
interface LanguageSwitchProps {
  variant?: 'compact' | 'full';
  showLabel?: boolean;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  variant = 'compact',
  showLabel = true,
}) => {
  const { theme } = useTheme();
  const { language, isRTL } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      paddingHorizontal: rp(8),
      paddingVertical: rp(6),
      borderRadius: rp(8),
      backgroundColor: theme.colors.buttonSecondary,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      minWidth: variant === 'compact' ? rp(60) : rp(100),
    },
    flagContainer: {
      width: rp(24),
      height: rp(24),
      borderRadius: rp(12),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `${theme.colors.primary}15`,
      marginRight: isRTL ? 0 : rp(6),
      marginLeft: isRTL ? rp(6) : 0,
    },
    flagText: {
      fontSize: fp(14),
    },
    languageInfo: {
      flexDirection: 'column',
      alignItems:
        variant === 'compact' ? 'center' : isRTL ? 'flex-end' : 'flex-start',
      flex: variant === 'full' ? 1 : undefined,
    },
    languageCode: {
      fontSize: fp(10),
      fontWeight: '600',
      color: theme.colors.textSecondary,
      letterSpacing: 0.5,
      textAlign: isRTL ? 'right' : 'left',
    },
    languageName: {
      fontSize: fp(11),
      fontWeight: '500',
      color: theme.colors.text,
      marginTop: rp(1),
      textAlign: isRTL ? 'right' : 'left',
    },
    iconContainer: {
      marginLeft: isRTL ? 0 : rp(4),
      marginRight: isRTL ? rp(4) : 0,
    },
  });

  const handlePress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (variant === 'compact') {
    return (
      <>
        <TouchableOpacity
          style={styles.container}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <View style={styles.flagContainer}>
            <Text style={styles.flagText}>{LANGUAGE_FLAGS[language]}</Text>
          </View>
          {showLabel && (
            <View style={styles.languageInfo}>
              <Text style={styles.languageCode}>{language.toUpperCase()}</Text>
            </View>
          )}
          <View style={styles.iconContainer}>
            <Icon
              name="keyboard-arrow-down"
              size={rp(16)}
              color={theme.colors.icon}
            />
          </View>
        </TouchableOpacity>

        <LanguageSelector visible={isModalVisible} onClose={handleCloseModal} />
      </>
    );
  }

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.flagContainer}>
          <Text style={styles.flagText}>{LANGUAGE_FLAGS[language]}</Text>
        </View>
        {showLabel && (
          <View style={styles.languageInfo}>
            <Text style={styles.languageName}>{LANGUAGE_NAMES[language]}</Text>
            <Text style={styles.languageCode}>{language.toUpperCase()}</Text>
          </View>
        )}
        <View style={styles.iconContainer}>
          <Icon
            name="keyboard-arrow-down"
            size={rp(16)}
            color={theme.colors.icon}
          />
        </View>
      </TouchableOpacity>

      <LanguageSelector visible={isModalVisible} onClose={handleCloseModal} />
    </>
  );
};

export default LanguageSwitch;
