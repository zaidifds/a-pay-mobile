import { combineReducers } from '@reduxjs/toolkit';
import userSession from '../slices/userSlice';
import auth from '../slices/authSlice';

const reducers = combineReducers({
  userSession,
  auth,
});

export default reducers;
