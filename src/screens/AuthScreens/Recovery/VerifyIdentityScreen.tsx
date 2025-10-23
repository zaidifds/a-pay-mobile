import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/AuthNavigator';
import { useTheme } from '../../../hooks/useTheme';
import useTranslation from '../../../localization/useTranslation';
import SvgIcon from '../../../assets/svg/SvgIcon';

type VerifyIdentityScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

const VerifyIdentityScreen: React.FC = () => {
  const navigation = useNavigation<VerifyIdentityScreenNavigationProp>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  const [isScanning, setIsScanning] = useState(false);
  const scanLineAnimation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (isScanning) {
      const startScanning = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(scanLineAnimation, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(scanLineAnimation, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ).start();
      };
      startScanning();
    }
  }, [isScanning, scanLineAnimation]);

  const handleVerifyIdentity = () => {
    setIsScanning(true);
    // Simulate verification process
    setTimeout(() => {
      setIsScanning(false);
      // Navigate to next screen or complete the flow
      navigation.navigate('Login');
    }, 3000);
  };

  const scanLineTranslateY = scanLineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200], // Adjust based on facial graphic height
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { borderBottomColor: theme.colors.borderHeader },
          isRTL && styles.headerRTL,
        ]}
      >
        <TouchableOpacity
          style={[styles.backButton, isRTL && styles.backButtonRTL]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backIcon, { color: theme.colors.icon }]}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {t('verify_identity_title')}
        </Text>

        {/* Description */}
        <Text
          style={[styles.description, { color: theme.colors.textSecondary }]}
        >
          {t('verify_identity_description')}
        </Text>

        {/* Facial Identity Graphic */}
        <View style={styles.facialContainer}>
          <View
            style={[
              styles.facialOutline,
              {
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <SvgIcon.FacialIdentity
              width={200}
              height={200}
              style={styles.facialIcon}
            />
            {isScanning && (
              <Animated.View
                style={[
                  styles.scanLine,
                  {
                    backgroundColor: theme.colors.error,
                    transform: [{ translateY: scanLineTranslateY }],
                  },
                ]}
              />
            )}
          </View>
        </View>
      </View>

      {/* Verify Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.verifyButton,
            {
              backgroundColor: isScanning
                ? theme.colors.buttonDisabled
                : theme.colors.primary,
              shadowColor: theme.colors.shadowColor,
            },
          ]}
          onPress={handleVerifyIdentity}
          disabled={isScanning}
        >
          <Text
            style={[
              styles.verifyButtonText,
              { color: theme.colors.buttonText },
            ]}
          >
            {isScanning ? t('verifying') : t('verify_identity_button')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerRTL: {
    flexDirection: 'row-reverse',
  },
  backButton: {
    padding: 8,
  },
  backButtonRTL: {
    transform: [{ scaleX: -1 }],
  },
  backIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 48,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  facialContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  facialOutline: {
    width: 240,
    height: 240,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  facialIcon: {
    opacity: 0.8,
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    left: 0,
    top: 0,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  verifyButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerifyIdentityScreen;
