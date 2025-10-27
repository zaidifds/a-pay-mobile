import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader, StandardButton } from '@/components/ui';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import SvgIcon from '@/assets/svg/SvgIcon';

const IdentityCardUploadScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  const [currentStep, setCurrentStep] = useState<
    'example' | 'upload' | 'processing' | 'completed'
  >('example');
  const [frontSideImage, setFrontSideImage] = useState<string | null>(null);
  const [backSideImage, setBackSideImage] = useState<string | null>(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinueFromExample = () => {
    setCurrentStep('upload');
  };

  const showImagePickerOptions = (forSide: 'front' | 'back') => {
    Alert.alert('Select Image', 'Choose an option', [
      { text: 'Camera', onPress: () => handleTakePhoto(forSide) },
      { text: 'Gallery', onPress: () => handlePickImage(forSide) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleTakePhoto = (forSide: 'front' | 'back') => {
    launchCamera({ mediaType: 'photo', quality: 0.8 }, response => {
      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          if (forSide === 'front') {
            setFrontSideImage(imageUri);
          } else {
            setBackSideImage(imageUri);
          }
        }
      }
    });
  };

  const handlePickImage = (forSide: 'front' | 'back') => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          if (forSide === 'front') {
            setFrontSideImage(imageUri);
          } else {
            setBackSideImage(imageUri);
          }
        }
      }
    });
  };

  const handleFrontUpload = () => {
    showImagePickerOptions('front');
  };

  const handleBackUpload = () => {
    showImagePickerOptions('back');
  };

  const handleUploadContinue = () => {
    if (frontSideImage && backSideImage) {
      setCurrentStep('processing');
      // Simulate processing
      setTimeout(() => {
        setCurrentStep('completed');
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      }, 2000);
    }
  };

  const canContinue = frontSideImage && backSideImage;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DynamicHeader
        title={t('upload_id_card')}
        showBackButton
        onBackPress={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Example Cards View */}
        {currentStep === 'example' && (
          <>
            {/* Instructions */}
            <View style={styles.instructionsContainer}>
              <Text
                style={[
                  styles.instructionsText,
                  {
                    color: theme.colors.textSecondary,
                    textAlign: isRTL ? 'right' : 'left',
                  },
                ]}
              >
                {t('upload_instructions')}
              </Text>
            </View>

            {/* Front Side Example */}
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionLabel,
                  {
                    color: theme.colors.text,
                    textAlign: isRTL ? 'right' : 'left',
                  },
                ]}
              >
                {t('front_side')}
              </Text>
              <View
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <SvgIcon.IdentityBlur />
              </View>
            </View>

            {/* Back Side Example */}
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionLabel,
                  {
                    color: theme.colors.text,
                    textAlign: isRTL ? 'right' : 'left',
                  },
                ]}
              >
                {t('back_side')}
              </Text>
              <View
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <SvgIcon.IdentityClear />
              </View>
            </View>
          </>
        )}

        {/* Upload View - Show for upload, processing, and completed steps */}
        {(currentStep === 'upload' ||
          currentStep === 'processing' ||
          currentStep === 'completed') && (
          <>
            {/* Front Side Upload */}
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionLabel,
                  {
                    color: theme.colors.text,
                    textAlign: isRTL ? 'right' : 'left',
                  },
                ]}
              >
                {t('front_side')}
              </Text>
              <TouchableOpacity
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={
                  currentStep === 'upload' ? handleFrontUpload : undefined
                }
                activeOpacity={currentStep === 'upload' ? 0.8 : 1}
                disabled={currentStep !== 'upload'}
              >
                {frontSideImage ? (
                  <>
                    <Image
                      source={{ uri: frontSideImage }}
                      style={styles.uploadedImage}
                      resizeMode="cover"
                    />
                    <View style={styles.uploadIndicator}>
                      <Text style={styles.checkIcon}>✓</Text>
                    </View>
                  </>
                ) : (
                  <View style={styles.uploadPlaceholder}>
                    <Text
                      style={[
                        styles.uploadIcon,
                        { color: theme.colors.iconSecondary },
                      ]}
                    >
                      📷
                    </Text>
                    <Text
                      style={[
                        styles.uploadText,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {t('tap_to_upload')}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Back Side Upload */}
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionLabel,
                  {
                    color: theme.colors.text,
                    textAlign: isRTL ? 'right' : 'left',
                  },
                ]}
              >
                {t('back_side')}
              </Text>
              <TouchableOpacity
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={
                  currentStep === 'upload' ? handleBackUpload : undefined
                }
                activeOpacity={currentStep === 'upload' ? 0.8 : 1}
                disabled={currentStep !== 'upload'}
              >
                {backSideImage ? (
                  <>
                    <Image
                      source={{ uri: backSideImage }}
                      style={styles.uploadedImage}
                      resizeMode="cover"
                    />
                    <View style={styles.uploadIndicator}>
                      <Text style={styles.checkIcon}>✓</Text>
                    </View>
                  </>
                ) : (
                  <View style={styles.uploadPlaceholder}>
                    <Text
                      style={[
                        styles.uploadIcon,
                        { color: theme.colors.iconSecondary },
                      ]}
                    >
                      📷
                    </Text>
                    <Text
                      style={[
                        styles.uploadText,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {t('tap_to_upload')}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Processing Message */}
        {currentStep === 'processing' && (
          <View style={styles.statusMessage}>
            <Text style={styles.spinnerIcon}>⏳</Text>
            <Text
              style={[styles.statusText, { color: theme.colors.textSecondary }]}
            >
              {t('processing_message')}
            </Text>
          </View>
        )}

        {/* Completed Message */}
        {currentStep === 'completed' && (
          <View style={styles.statusMessage}>
            <Text style={[styles.checkIcon, { color: theme.colors.success }]}>
              ✓
            </Text>
            <Text style={[styles.statusText, { color: theme.colors.success }]}>
              {t('completed_status')}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        {currentStep === 'example' && (
          <StandardButton
            title={t('continue')}
            onPress={handleContinueFromExample}
            variant="primary"
            size="large"
            fullWidth
          />
        )}
        {currentStep === 'upload' && (
          <StandardButton
            title={t('continue')}
            onPress={handleUploadContinue}
            variant="primary"
            size="large"
            fullWidth
            disabled={!canContinue}
          />
        )}
        {currentStep === 'processing' && (
          <StandardButton
            title=""
            onPress={() => {}}
            variant="primary"
            size="large"
            fullWidth
            loading={true}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 80,
    flexGrow: 1,
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instructionsText: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 12,
    height: 240,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  uploadedImage: {
    width: '100%',
    height: 240,
  },
  uploadPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
  },
  uploadIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#22C55E',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  checkIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statusMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  spinnerIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 34,
    backgroundColor: '#FFFFFF',
  },
});

export default IdentityCardUploadScreen;
