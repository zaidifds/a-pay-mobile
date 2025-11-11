/**
 * A-Pay Mobile App
 * React Native application with navigation and state management
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { TranslationProvider } from './src/localization';
import ToastManager from 'toastify-react-native';
import AppInitializer from './src/components/common/AppInitializer';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppInitializer>
          <TranslationProvider>
            <ThemeProvider>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              />
              <AppNavigator />
              <ToastManager />
            </ThemeProvider>
          </TranslationProvider>
        </AppInitializer>
      </PersistGate>
    </Provider>
  );
}

export default App;
