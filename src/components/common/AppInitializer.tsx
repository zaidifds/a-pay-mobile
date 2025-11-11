import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useAppDispatch } from '@/redux/store';
import { initializeTheme } from '@/redux/slices/themeSlice';
import SplashScreen from '@/screens/SplashScreen/SplashScreen';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Initialize user preferences from MMKV storage
    // Initialize theme with system preference
    dispatch(initializeTheme(colorScheme === 'dark'));
  }, [dispatch, colorScheme]);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onAnimationFinish={handleSplashFinish} />;
  }

  return <>{children}</>;
};

export default AppInitializer;
