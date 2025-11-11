import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';
import { RootStackParamList } from '@/navigation/navigationTypes';

type FindNearestRetailerScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

interface RetailerLocation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: number;
}

const { width, height } = Dimensions.get('window');

export default function FindNearestRetailerScreen() {
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();
  const navigation = useNavigation<FindNearestRetailerScreenNavigationProp>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHomePress = () => {
    navigation.goBack();
  };

  const openMapsApp = () => {
    const url = Platform.select({
      ios: 'maps:0,0?q=retailers+near+me',
      android: 'geo:0,0?q=retailers+near+me',
    });

    if (url) {
      Linking.openURL(url).catch(() => {
        Alert.alert(t('error'), 'Could not open maps application');
      });
    }
  };

  return (
    <View style={styles(theme, isRTL).container}>
      <DynamicHeader
        titleKey="find_nearest_retailer"
        showBackButton
        onBackPress={handleBackPress}
        rightContent={
          <TouchableOpacity
            onPress={handleHomePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="home" size={rp(24)} color={theme.colors.primary} />
          </TouchableOpacity>
        }
      />

      <View style={styles(theme, isRTL).mapContainer}>
        {/* Static Map Image */}
        <View style={styles(theme, isRTL).mapImageContainer}>
          <View style={styles(theme, isRTL).mapPlaceholder}>
            {/* Map Background */}
            <View style={styles(theme, isRTL).mapBackground}>
              {/* Thames River */}
              <View style={styles(theme, isRTL).thamesRiver} />

              {/* Area Labels */}
              <View
                style={[
                  styles(theme, isRTL).areaLabel,
                  { top: '15%', left: '60%' },
                ]}
              >
                <Icon name="location-city" size={rp(16)} color="#666" />
              </View>
              <View
                style={[
                  styles(theme, isRTL).areaLabel,
                  { top: '25%', left: '20%' },
                ]}
              >
                <Icon name="location-city" size={rp(14)} color="#666" />
              </View>
              <View
                style={[
                  styles(theme, isRTL).areaLabel,
                  { top: '45%', left: '80%' },
                ]}
              >
                <Icon name="location-city" size={rp(12)} color="#666" />
              </View>

              {/* Retailer Location Pins */}
              <View
                style={[
                  styles(theme, isRTL).locationPin,
                  { top: '20%', left: '15%' },
                ]}
              >
                <Icon name="location-on" size={rp(24)} color="#FF4444" />
              </View>
              <View
                style={[
                  styles(theme, isRTL).locationPin,
                  { top: '35%', left: '45%' },
                ]}
              >
                <Icon name="location-on" size={rp(24)} color="#FF4444" />
              </View>
              <View
                style={[
                  styles(theme, isRTL).locationPin,
                  { top: '50%', left: '25%' },
                ]}
              >
                <Icon name="location-on" size={rp(24)} color="#FF4444" />
              </View>
              <View
                style={[
                  styles(theme, isRTL).locationPin,
                  { top: '60%', left: '70%' },
                ]}
              >
                <Icon name="location-on" size={rp(24)} color="#FF4444" />
              </View>
              <View
                style={[
                  styles(theme, isRTL).locationPin,
                  { top: '75%', left: '40%' },
                ]}
              >
                <Icon name="location-on" size={rp(24)} color="#FF4444" />
              </View>
              <View
                style={[
                  styles(theme, isRTL).locationPin,
                  { top: '30%', left: '85%' },
                ]}
              >
                <Icon name="location-on" size={rp(24)} color="#FF4444" />
              </View>
              <View
                style={[
                  styles(theme, isRTL).locationPin,
                  { top: '55%', left: '60%' },
                ]}
              >
                <Icon name="location-on" size={rp(24)} color="#FF4444" />
              </View>
              <View
                style={[
                  styles(theme, isRTL).locationPin,
                  { top: '80%', left: '20%' },
                ]}
              >
                <Icon name="location-on" size={rp(24)} color="#FF4444" />
              </View>

              {/* Your Location (Blue Pin) */}
              <View
                style={[
                  styles(theme, isRTL).userLocationPin,
                  { top: '45%', left: '50%' },
                ]}
              >
                <View style={styles(theme, isRTL).userLocationMarker}>
                  <View style={styles(theme, isRTL).userLocationDot} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Open Maps Button */}
        <TouchableOpacity
          style={styles(theme, isRTL).openMapsButton}
          onPress={openMapsApp}
          activeOpacity={0.8}
        >
          <Icon name="map" size={rp(20)} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = (theme: any, isRTL: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    mapContainer: {
      flex: 1,
      position: 'relative',
    },
    mapImageContainer: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    mapPlaceholder: {
      flex: 1,
      margin: 0,
      padding: 0,
    },
    mapBackground: {
      flex: 1,
      backgroundColor: '#E8F4F8',
      position: 'relative',
    },
    thamesRiver: {
      position: 'absolute',
      width: '100%',
      height: rp(60),
      backgroundColor: '#4A90E2',
      top: '40%',
      borderRadius: rp(30),
      opacity: 0.6,
      transform: [{ rotate: '15deg' }],
    },
    areaLabel: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.7,
    },
    locationPin: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
    userLocationPin: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 15,
    },
    userLocationMarker: {
      width: rp(20),
      height: rp(20),
      borderRadius: rp(10),
      backgroundColor: 'rgba(74, 144, 226, 0.3)',
      borderWidth: 2,
      borderColor: '#4A90E2',
      alignItems: 'center',
      justifyContent: 'center',
    },
    userLocationDot: {
      width: rp(8),
      height: rp(8),
      borderRadius: rp(4),
      backgroundColor: '#4A90E2',
    },
    openMapsButton: {
      position: 'absolute',
      bottom: rp(40),
      right: isRTL ? undefined : rp(20),
      left: isRTL ? rp(20) : undefined,
      width: rp(48),
      height: rp(48),
      borderRadius: rp(24),
      backgroundColor: theme.colors.surface || '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
  });
