import { Storage } from 'redux-persist';
import { createMMKV } from 'react-native-mmkv';

// Create MMKV instance
const mmkv = createMMKV({
  id: 'a-pay-mobile-storage',
  encryptionKey: 'a-pay-mobile-key',
});

// Create Redux Persist storage adapter
export const reduxStorage: Storage = {
  setItem: (key: string, value: string) => {
    try {
      mmkv.set(key, value);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getItem: (key: string) => {
    try {
      const value = mmkv.getString(key);
      return Promise.resolve(value || null);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  removeItem: (key: string) => {
    try {
      mmkv.remove(key);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
