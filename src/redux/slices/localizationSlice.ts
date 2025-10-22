import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SupportedLanguage } from '../../localization/types';
import { RTL_LANGUAGES } from '../../localization/constants';

export interface LocalizationState {
  language: SupportedLanguage;
  isRTL: boolean;
  isInitialized: boolean;
}

const initialState: LocalizationState = {
  language: 'en',
  isRTL: false,
  isInitialized: false,
};

const localizationSlice = createSlice({
  name: 'localization',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<SupportedLanguage>) => {
      state.language = action.payload;
      state.isRTL = RTL_LANGUAGES.includes(action.payload);
    },
    initializeLocalization: (
      state,
      action: PayloadAction<SupportedLanguage>,
    ) => {
      state.language = action.payload;
      state.isRTL = RTL_LANGUAGES.includes(action.payload);
      state.isInitialized = true;
    },
    resetLocalization: () => initialState,
  },
});

export const { setLanguage, initializeLocalization, resetLocalization } =
  localizationSlice.actions;
export default localizationSlice.reducer;
