import { combineReducers } from '@reduxjs/toolkit';
import auth from '../slices/authSlice';
import wallet from '../slices/walletSlice';

const reducers = combineReducers({
  auth,
  wallet,
});

export default reducers;
