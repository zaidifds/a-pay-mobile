import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPreferences } from '../../utils/userPreferences';

export interface SettingsState {
  language: 'en' | 'ar';
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  privacy: {
    biometric: boolean;
    autoLock: boolean;
  };
}

const initialState: SettingsState = {
  language: 'en',
  notifications: {
    push: true,
    email: true,
    sms: false,
  },
  privacy: {
    biometric: false,
    autoLock: true,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'en' | 'ar'>) => {
      state.language = action.payload;
    },
    updateNotifications: (
      state,
      action: PayloadAction<Partial<SettingsState['notifications']>>,
    ) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updatePrivacy: (
      state,
      action: PayloadAction<Partial<SettingsState['privacy']>>,
    ) => {
      state.privacy = { ...state.privacy, ...action.payload };
    },
    initializeSettings: state => {
      state.language = UserPreferences.getLanguage();
      state.notifications = UserPreferences.getNotifications();
      state.privacy = UserPreferences.getPrivacy();
    },
    resetSettings: () => initialState,
  },
});

export const {
  setLanguage,
  updateNotifications,
  updatePrivacy,
  initializeSettings,
  resetSettings,
} = settingsSlice.actions;
export default settingsSlice.reducer;
