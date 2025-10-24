import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useAppDispatch } from '@/redux/store';
import { initializeSettings } from '@/redux/slices/settingsSlice';
import { initializeTheme } from '@/redux/slices/themeSlice';
import SplashScreen from '@/screens/SplashScreen/SplashScreen';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const [_isInitialized, setIsInitialized] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Initialize user preferences from MMKV storage
    dispatch(initializeSettings());
    // Initialize theme with system preference
    dispatch(initializeTheme(colorScheme === 'dark'));

    // Mark as initialized after a short delay
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
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
