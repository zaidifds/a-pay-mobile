import React, { createContext, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../theme';
import { Theme } from '../types';
import { RootState } from '../redux/store';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { isDark } = useSelector((state: RootState) => state.theme);

  const value = {
    theme: isDark ? darkTheme : lightTheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext };
