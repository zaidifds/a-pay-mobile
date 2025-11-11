import { combineReducers } from '@reduxjs/toolkit';
import auth from '../slices/authSlice';
import card from '../slices/cardSlice';
import localization from '../slices/localizationSlice';
import theme from '../slices/themeSlice';

const reducers = combineReducers({
  auth,
  card,
  localization,
  theme,
});

export default reducers;
