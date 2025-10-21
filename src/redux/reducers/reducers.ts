import { combineReducers } from '@reduxjs/toolkit';
import auth from '../slices/authSlice';
import wallet from '../slices/walletSlice';
import settings from '../slices/settingsSlice';
import theme from '../slices/themeSlice';

const reducers = combineReducers({
  auth,
  wallet,
  settings,
  theme,
});

export default reducers;
