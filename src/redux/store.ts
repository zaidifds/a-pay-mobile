import { configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import reducers from './reducers/reducers';

const persistConfig = {
  key: 'root',
  storage: require('../utils/mmkvStorage').reduxStorage,
  whitelist: [
    'auth',
    'wallet',
    'settings',
    'theme',
    'transactions',
    'localization',
  ],
};

type PersistedState = ReturnType<typeof reducers>;
const persistedReducer = persistReducer<PersistedState, any>(
  persistConfig,
  reducers as Reducer<PersistedState>,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these paths in the state that contain large data
        ignoredPaths: [],
        // Increase the warning threshold for development
        warnAfter: 1000,
      },
      // Improve development performance - disable immutable check for large state updates
      immutableCheck: {
        warnAfter: 1000,
        // Ignore paths that contain large arrays/objects
        ignoredPaths: [],
      },
      thunk: true,
    }),
  // Improve development performance
  devTools: __DEV__,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
