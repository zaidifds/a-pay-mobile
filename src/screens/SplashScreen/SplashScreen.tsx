import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
} from 'react-native';

interface SplashScreenProps {
  onAnimationFinish?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationFinish }) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const progressValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      // Spinner rotation
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ),
      // Progress bar animation
      Animated.timing(progressValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }),
      // Fade in animation
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Call onAnimationFinish after 3 seconds
    const timer = setTimeout(() => {
      onAnimationFinish?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onAnimationFinish, spinValue, progressValue, fadeValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <ImageBackground
      source={require('../../assets/images/splashbg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Animated.View style={[styles.content, { opacity: fadeValue }]}>
        {/* Main splash content */}
        <View style={styles.splashContent}>
          {/* Spinner */}
          <Animated.View
            style={[styles.spinner, { transform: [{ rotate: spin }] }]}
          >
            <View style={styles.spinnerCircle} />
            <View style={styles.spinnerDot} />
          </Animated.View>

          {/* orby. text */}
          <Text style={styles.orbyText}>A Pay.</Text>

          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <Animated.View
              style={[styles.progressBar, { width: progressWidth }]}
            />
            <View style={styles.progressTrack} />
          </View>
        </View>

        {/* Decorative circles */}
        <View style={styles.decorativeCircles}>
          <View style={styles.circle1} />
          <View style={styles.circle2} />
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A', // Royal blue fallback
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    position: 'absolute',
    top: 60,
    left: 20,
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  splashContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  spinner: {
    width: 60,
    height: 60,
    marginBottom: 20,
    position: 'relative',
  },
  spinnerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  spinnerDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  orbyText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    letterSpacing: 1,
  },
  progressContainer: {
    width: 200,
    height: 4,
    position: 'relative',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressTrack: {
    width: 200,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  decorativeCircles: {
    position: 'absolute',
    bottom: 100,
    right: 50,
  },
  circle1: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  circle2: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default SplashScreen;
