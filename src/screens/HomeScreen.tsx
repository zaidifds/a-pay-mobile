import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createMMKV } from 'react-native-mmkv';

// Initialize MMKV instance outside component
const storage = createMMKV({
  id: 'a-pay-mobile-storage',
  encryptionKey: 'a-pay-mobile-key',
});

const HomeScreen: React.FC = () => {
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

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Welcome to A-Pay Mobile</Text>
      <Text style={styles.subtitle}>
        Phase 1 - Project Foundation Complete!
      </Text>

      <Animated.View
        style={[styles.testContainer, { transform: [{ scale: scaleValue }] }]}
      >
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Icon name="check-circle" size={24} color="#34C759" />
          <Text style={styles.buttonText}>Test Animation</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.statusContainer}>
        <Icon name="storage" size={20} color="#007AFF" />
        <Text style={styles.statusText}>MMKV: {mmkvStatus}</Text>
      </View>

      <View style={styles.iconTestContainer}>
        <Text style={styles.iconTestTitle}>Vector Icons Test:</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,

    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  testContainer: {
    marginVertical: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  iconTestContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  iconTestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
});

export default HomeScreen;
