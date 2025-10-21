import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { lightTheme } from '../theme';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    // Fallback to light theme if context is not available
    return { theme: lightTheme, toggleTheme: () => {} };
  }

  return context;
};
