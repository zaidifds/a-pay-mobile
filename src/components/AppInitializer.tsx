import React, { useEffect } from 'react';
import { useAppDispatch } from '../redux/store';
import { initializeSettings } from '../redux/slices/settingsSlice';
import { initializeTheme } from '../redux/slices/themeSlice';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize user preferences from MMKV storage
    dispatch(initializeSettings());
    dispatch(initializeTheme());
  }, [dispatch]);

  return <>{children}</>;
};

export default AppInitializer;
