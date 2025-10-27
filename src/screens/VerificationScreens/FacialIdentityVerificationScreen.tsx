import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader, StandardButton } from '@/components/ui';
import SvgIcon from '@/assets/svg/SvgIcon';

const FacialIdentityVerificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState<
    'intro' | 'front_scan' | 'right_scan' | 'success'
  >('intro');

  const handleBack = () => {
    if (currentStep === 'intro') {
      navigation.goBack();
    } else if (currentStep === 'front_scan') {
      setCurrentStep('intro');
    } else if (currentStep === 'right_scan') {
      setCurrentStep('front_scan');
    } else if (currentStep === 'success') {
      setCurrentStep('right_scan');
    }
  };

  const handleContinue = () => {
    if (currentStep === 'intro') {
      setCurrentStep('front_scan');
    } else if (currentStep === 'front_scan') {
      setCurrentStep('right_scan');
    } else if (currentStep === 'right_scan') {
      setCurrentStep('success');
    } else if (currentStep === 'success') {
      navigation.goBack();
    }
  };

  const handleCapture = () => {
    // Capture image and proceed to next step
    handleContinue();
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DynamicHeader showBackButton onBackPress={handleBack} />

      {/* Intro Step */}
      {currentStep === 'intro' && (
        <View style={styles.content}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.introContainer}>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                {t('verify_identity_title')}
              </Text>
              <Text
                style={[
                  styles.description,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {t('verify_identity_description')}
              </Text>

              {/* Face Frame */}
              <View style={styles.faceFrameContainer}>
                <View style={styles.faceFrame}>
                  <SvgIcon.FacialIdentity width="100%" height="100%" />
                  <View style={styles.horizontalLine} />
                </View>
                <Text
                  style={[
                    styles.dimensionsLabel,
                    { color: theme.colors.primary },
                  ]}
                >
                  246 × 252
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <StandardButton
              title={t('verify_identity_button')}
              onPress={handleContinue}
              variant="primary"
              size="large"
              fullWidth
            />
          </View>
        </View>
      )}

      {/* Front Scan Step */}
      {currentStep === 'front_scan' && (
        <View style={styles.content}>
          <View style={styles.scanHeader}>
            <Text style={[styles.scanTitle, { color: theme.colors.text }]}>
              {t('focus_on_your_face' as any)}
            </Text>
          </View>

          <View style={styles.cameraContainer}>
            <Image
              source={require('@/assets/images/IdentityFrontBg.png')}
              style={styles.cameraBackground}
              resizeMode="cover"
            />

            {/* White Face Frame */}
            <View style={styles.scanFrame} />

            {/* Facial Landmarks Overlay */}
            <View style={styles.facialOverlay}>
              <SvgIcon.FacialIdentity width="100%" height="100%" />
            </View>

            {/* Bottom Blue Gradient */}
            <View style={styles.gradientOverlay}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={handleCapture}
              >
                <View style={styles.captureButtonInner}>
                  <Text style={styles.cameraIcon}>📷</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Right Scan Step */}
      {currentStep === 'right_scan' && (
        <View style={styles.content}>
          <View style={styles.scanHeader}>
            <Text style={[styles.scanTitle, { color: theme.colors.text }]}>
              {t('move_head_to_side' as any)}
            </Text>
          </View>

          <View style={styles.cameraContainer}>
            <Image
              source={require('@/assets/images/IdentityRightBg.png')}
              style={styles.cameraBackground}
              resizeMode="cover"
            />

            {/* White Face Frame */}
            <View style={styles.scanFrame} />

            {/* Facial Landmarks Overlay */}
            <View style={styles.facialOverlay}>
              <SvgIcon.FacialIdentity width="100%" height="100%" />
            </View>

            {/* Bottom Blue Gradient */}
            <View style={styles.gradientOverlay}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={handleCapture}
              >
                <View style={styles.captureButtonInner}>
                  <Text style={styles.cameraIcon}>📷</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Success Step */}
      {currentStep === 'success' && (
        <View style={styles.content}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Success Banner */}
            <View style={styles.successBanner}>
              <Text style={styles.successEmoji}>😊</Text>
              <Text style={styles.successText}>
                {t('identity_verified_successfully' as any)}
              </Text>
            </View>

            {/* Title */}
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {t('verify_identity_title')}
            </Text>
            <Text
              style={[
                styles.description,
                { color: theme.colors.textSecondary },
              ]}
            >
              {t('verify_identity_description')}
            </Text>

            {/* Captured Photo Card */}
            <View style={styles.photoCard}>
              <Image
                source={require('@/assets/images/IdentityFinal.png')}
                style={styles.capturedPhoto}
                resizeMode="cover"
              />
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <StandardButton
              title={t('continue')}
              onPress={handleContinue}
              variant="primary"
              size="large"
              fullWidth
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  introContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 48,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  faceFrameContainer: {
    alignItems: 'center',
    width: 280,
    height: 320,
    marginBottom: 32,
  },
  faceFrame: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  horizontalLine: {
    position: 'absolute',
    width: '80%',
    height: 1,
    backgroundColor: '#F44336',
  },
  dimensionsLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  scanHeader: {
    paddingTop: 20,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  scanTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  cameraBackground: {
    width: '100%',
    height: '100%',
  },
  scanFrame: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -150,
    marginTop: -150,
    width: 300,
    height: 350,
    borderRadius: 20,
    borderWidth: 8,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  facialOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -120,
    marginTop: -140,
    width: 240,
    height: 280,
  },
  gradientOverlay: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // height: '25%',
    // backgroundColor: 'rgba(33, 150, 243, 0.3)',
  },
  captureButton: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 24,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  successEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  successText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  photoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 32,
  },
  capturedPhoto: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});

export default FacialIdentityVerificationScreen;
