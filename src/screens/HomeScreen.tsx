import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createMMKV } from 'react-native-mmkv';
import { useTheme } from '../hooks/useTheme';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { logoutUser } from '../redux/slices/authSlice';

// Initialize MMKV instance outside component
const storage = createMMKV({
  id: 'a-pay-mobile-storage',
  encryptionKey: 'a-pay-mobile-key',
});

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { userSession } = useAppSelector(state => state.userSession);
  const { isLoading } = useAppSelector(state => state.auth);
  const user = userSession?.user;
  const insets = useSafeAreaInsets();
  const [scaleValue] = useState(new Animated.Value(1));
  const [mmkvStatus, setMmkvStatus] = useState('Initializing...');

  useEffect(() => {
    // Test MMKV
    try {
      storage.set('test-key', 'Hello from MMKV!');
      const value = storage.getString('test-key');
      console.log('MMKV test value:', value);
      setMmkvStatus('Ready');
    } catch (error) {
      console.log('MMKV error:', error);
      setMmkvStatus('Error');
    }
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => dispatch(logoutUser()),
      },
    ]);
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Welcome to A-Pay Mobile
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Phase 2 - Authentication Complete!
        </Text>
        {user && (
          <Text style={[styles.userText, { color: theme.colors.text }]}>
            Hello, {user.first_name} {user.last_name}!
          </Text>
        )}
      </View>

      <Animated.View
        style={[styles.testContainer, { transform: [{ scale: scaleValue }] }]}
      >
        <TouchableOpacity
          onPress={handlePress}
          style={[
            styles.button,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Icon name="check-circle" size={24} color={theme.colors.success} />
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>
            Test Animation
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.statusContainer}>
        <Icon name="storage" size={20} color={theme.colors.primary} />
        <Text
          style={[styles.statusText, { color: theme.colors.textSecondary }]}
        >
          MMKV: {mmkvStatus}
        </Text>
      </View>

      <View style={styles.iconTestContainer}>
        <Text style={[styles.iconTestTitle, { color: theme.colors.text }]}>
          Vector Icons Test:
        </Text>
        <View style={styles.iconRow}>
          <Icon name="home" size={24} color="#FF6B6B" />
          <MaterialCommunityIcons name="heart" size={24} color="#FF6B6B" />
          <FontAwesome name="star" size={24} color="#FFD93D" />
          <Icon name="settings" size={24} color="#4ECDC4" />
        </View>
        <View style={styles.iconRow}>
          <MaterialCommunityIcons name="account" size={24} color="#45B7D1" />
          <FontAwesome name="mobile" size={24} color="#96CEB4" />
          <Icon name="favorite" size={24} color="#FFEAA7" />
          <MaterialCommunityIcons name="camera" size={24} color="#DDA0DD" />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
        onPress={handleLogout}
        disabled={isLoading}
      >
        <Icon name="logout" size={20} color="#FFFFFF" />
        <Text style={styles.logoutButtonText}>
          {isLoading ? 'Logging out...' : 'Logout'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  userText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  testContainer: {
    marginVertical: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
  },
  iconTestContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  iconTestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
});

export default HomeScreen;
