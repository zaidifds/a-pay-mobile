import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  MediaType,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';

interface ImagePickerOptions {
  mediaType?: MediaType;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

interface UseImagePickerReturn {
  pickImage: () => void;
  isLoading: boolean;
  error: string | null;
}

export const useImagePicker = (
  onImageSelected: (uri: string) => void,
  options: ImagePickerOptions = {},
): UseImagePickerReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultOptions: ImagePickerOptions = {
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 1000,
    maxHeight: 1000,
    ...options,
  };

  const requestCameraPermission = async (): Promise<boolean> => {
    const permission: Permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    }) as Permission;

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  };

  const requestPhotoLibraryPermission = async (): Promise<boolean> => {
    const permission: Permission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    }) as Permission;

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  };

  const handleImagePickerResponse = (response: ImagePickerResponse) => {
    setIsLoading(false);

    if (response.didCancel) {
      return;
    }

    if (response.errorMessage) {
      setError(response.errorMessage);
      Alert.alert('Error', response.errorMessage);
      return;
    }

    if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      if (asset.uri) {
        onImageSelected(asset.uri);
        setError(null);
      }
    }
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to take photos. Please enable it in settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Settings', onPress: () => {} }, // You can add Linking.openSettings() here
        ],
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    launchCamera(defaultOptions, handleImagePickerResponse);
  };

  const openImageLibrary = async () => {
    const hasPermission = await requestPhotoLibraryPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Photo library permission is required to select images. Please enable it in settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Settings', onPress: () => {} }, // You can add Linking.openSettings() here
        ],
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    launchImageLibrary(defaultOptions, handleImagePickerResponse);
  };

  const pickImage = () => {
    Alert.alert(
      'Select Profile Picture',
      'Choose how you want to set your profile picture',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Camera', onPress: openCamera },
        { text: 'Photo Library', onPress: openImageLibrary },
      ],
    );
  };

  return {
    pickImage,
    isLoading,
    error,
  };
};
