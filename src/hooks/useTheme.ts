import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { lightTheme } from '../theme';

interface ThemeContextType {
  theme: any;
  isDark: boolean;
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    // Fallback to light theme if context is not available
    return { theme: lightTheme, isDark: false };
  }

  return context;
};
