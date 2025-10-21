import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 12 Pro)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Responsive width
export const wp = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100;
};

// Responsive height
export const hp = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

// Responsive font size
export const fp = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Responsive padding/margin
export const rp = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

// Check if device is tablet
export const isTablet = (): boolean => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;
  return Math.min(adjustedWidth, adjustedHeight) >= 1000;
};

// Check if device is small screen
export const isSmallScreen = (): boolean => {
  return SCREEN_WIDTH < 375;
};

// Check if device is large screen
export const isLargeScreen = (): boolean => {
  return SCREEN_WIDTH > 414;
};

// Get responsive dimensions
export const getResponsiveDimensions = () => ({
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isTablet: isTablet(),
  isSmallScreen: isSmallScreen(),
  isLargeScreen: isLargeScreen(),
});
