import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPreferences } from '../../utils/userPreferences';

export interface ThemeState {
  isDark: boolean;
  systemTheme: boolean;
}

const initialState: ThemeState = {
  isDark: false,
  systemTheme: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.isDark = !state.isDark;
      state.systemTheme = false;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      if (action.payload === 'system') {
        state.systemTheme = true;
        state.isDark = false; // This would be determined by system in real app
      } else {
        state.systemTheme = false;
        state.isDark = action.payload === 'dark';
      }
    },
    setSystemTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
    initializeTheme: state => {
      const savedTheme = UserPreferences.getTheme();
      if (savedTheme === 'system') {
        state.systemTheme = true;
        state.isDark = false; // This would be determined by system in real app
      } else {
        state.systemTheme = false;
        state.isDark = savedTheme === 'dark';
      }
    },
  },
});

export const { toggleTheme, setTheme, setSystemTheme, initializeTheme } =
  themeSlice.actions;
export default themeSlice.reducer;
