import React, { useRef, useEffect } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../localization';
import {
  LANGUAGE_FLAGS,
  LANGUAGE_NAMES,
  SUPPORTED_LANGUAGES,
} from '../localization/constants';
import { setLanguage } from '../redux/slices/localizationSlice';
import { useAppDispatch } from '../redux/store';
import { fp, rp } from '../utils/responsive';
import { UserPreferences } from '../utils/userPreferences';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  visible,
  onClose,
}) => {
  const { t, language: currentLanguage, isRTL } = useTranslation();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Animation effects
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim, slideAnim]);

  const handleLanguageSelect = (language: string) => {
    dispatch(setLanguage(language as any));
    UserPreferences.setLanguage(language as any);
    onClose();
  };

  const renderLanguageItem = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => {
    const isSelected = item === currentLanguage;

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 50],
                outputRange: [0, 20 + index * 10],
              }),
            },
          ],
        }}
      >
        <TouchableOpacity
          style={[
            styles.languageItem,
            {
              backgroundColor: isSelected
                ? theme.colors.primary
                : theme.colors.surface,
              borderColor: isSelected
                ? theme.colors.primary
                : theme.colors.border,
            },
          ]}
          onPress={() => handleLanguageSelect(item)}
          activeOpacity={0.7}
        >
          <View style={styles.languageItemLeft}>
            <View
              style={[
                styles.flagContainer,
                {
                  backgroundColor: isSelected
                    ? `${theme.colors.buttonText}20`
                    : `${theme.colors.primary}15`,
                },
              ]}
            >
              <Text style={styles.flagText}>
                {LANGUAGE_FLAGS[item as keyof typeof LANGUAGE_FLAGS]}
              </Text>
            </View>
            <View style={styles.languageInfo}>
              <Text
                style={[
                  styles.languageName,
                  {
                    color: isSelected
                      ? theme.colors.buttonText
                      : theme.colors.text,
                  },
                  isSelected
                    ? styles.languageNameSelected
                    : styles.languageNameNormal,
                ]}
              >
                {LANGUAGE_NAMES[item as keyof typeof LANGUAGE_NAMES]}
              </Text>
              <Text
                style={[
                  styles.languageCode,
                  {
                    color: isSelected
                      ? `${theme.colors.buttonText}80`
                      : theme.colors.textSecondary,
                  },
                ]}
              >
                {item.toUpperCase()}
              </Text>
            </View>
          </View>
          {isSelected && (
            <View style={styles.selectedIndicator}>
              <Icon name="check" size={18} color={theme.colors.buttonText} />
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
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
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
            },
          ]}
        >
          <View
            style={[
              styles.modalHeader,
              { borderBottomColor: theme.colors.border },
            ]}
          >
            <View style={styles.headerLeft}>
              <View
                style={[
                  styles.headerIcon,
                  { backgroundColor: `${theme.colors.primary}15` },
                ]}
              >
                <Icon name="language" size={20} color={theme.colors.primary} />
              </View>
              <Text
                style={[
                  styles.modalTitle,
                  { color: theme.colors.text },
                  isRTL && styles.rtlText,
                ]}
              >
                {t('language')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <Icon name="close" size={22} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={SUPPORTED_LANGUAGES}
            renderItem={renderLanguageItem}
            keyExtractor={item => item}
            style={styles.languageList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.languageListContent}
          />
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rp(16),
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    width: '100%',
    maxWidth: rp(340),
    maxHeight: '75%',
    borderRadius: rp(20),
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rp(15),
    paddingVertical: rp(18),
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    width: rp(36),
    height: rp(36),
    borderRadius: rp(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rp(12),
  },
  modalTitle: {
    fontSize: fp(20),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  rtlText: {
    textAlign: 'right',
  },
  closeButton: {
    width: rp(32),
    height: rp(32),
    borderRadius: rp(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  languageList: {
    maxHeight: rp(320),
  },
  languageListContent: {
    paddingVertical: rp(8),
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rp(12),
    paddingVertical: rp(10),
    marginHorizontal: rp(10),
    marginVertical: rp(4),
    borderRadius: rp(12),
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  languageItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagContainer: {
    width: rp(44),
    height: rp(44),
    borderRadius: rp(22),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rp(14),
  },
  flagText: {
    fontSize: fp(22),
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: fp(13),
    letterSpacing: 0.2,
    marginBottom: rp(2),
  },
  languageNameSelected: {
    fontWeight: '700',
  },
  languageNameNormal: {
    fontWeight: '600',
  },
  languageCode: {
    fontSize: fp(12),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  selectedIndicator: {
    width: rp(28),
    height: rp(28),
    borderRadius: rp(14),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LanguageSelector;
