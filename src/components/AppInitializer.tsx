import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useAppDispatch } from '../redux/store';
import { initializeSettings } from '../redux/slices/settingsSlice';
import { initializeTheme } from '../redux/slices/themeSlice';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Initialize user preferences from MMKV storage
    dispatch(initializeSettings());
    // Initialize theme with system preference
    dispatch(initializeTheme(colorScheme === 'dark'));
  }, [dispatch, colorScheme]);

  return <>{children}</>;
};

export default AppInitializer;
