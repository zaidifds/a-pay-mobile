import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader, StandardButton } from '@/components/ui';
import SvgIcon from '@/assets/svg/SvgIcon';
import { VerificationNavigatorParamList } from '@/navigation/VerificationNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

const BiometricScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<VerificationNavigatorParamList>>();
  const { t } = useTranslation();

  const handleEnableBiometric = () => {
    navigation.navigate('PasscodeScreen');
  };

  const handleSkipForLater = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <DynamicHeader title={t('enable_biometric')} />

      <View style={styles.content}>
        {/* Text Content - Left Aligned */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{t('enable_biometric')}</Text>
          <Text style={styles.description}>
            {t('enable_biometric_description')}
          </Text>
        </View>

        {/* Biometric Icons - Centered */}
        <View style={styles.iconsContainer}>
          <View style={styles.iconCircleWithBorder}>
            <SvgIcon.Finger />
          </View>
          <View style={styles.iconCircle}>
            <SvgIcon.Face />
          </View>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <StandardButton
          title={t('enable_biometric_button')}
          onPress={handleEnableBiometric}
          variant="primary"
          size="large"
          fullWidth
        />

        <TouchableOpacity
          style={styles.skipLink}
          onPress={handleSkipForLater}
          activeOpacity={0.7}
        >
          <Text style={styles.skipLinkText}>{t('ill_do_this_later')}</Text>
          <Text style={styles.skipArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  textContainer: {
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'left',
    lineHeight: 24,
  },
  iconsContainer: {
    marginTop: 42,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  iconCircleWithBorder: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: '#2196F3',
    borderWidth: 4,
    borderColor: '#2196F333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomActions: {
    paddingHorizontal: 24,
    paddingBottom: 34,
    gap: 24,
  },
  skipLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipLinkText: {
    fontSize: 16,
    color: '#757575',
    marginRight: 4,
  },
  skipArrow: {
    fontSize: 20,
    color: '#757575',
    fontWeight: 'bold',
  },
});

export default BiometricScreen;
