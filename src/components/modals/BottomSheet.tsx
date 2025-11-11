import React, { useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';

const { height: screenHeight } = Dimensions.get('window');

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: number | string;
  showHandle?: boolean;
  enableBackdropClose?: boolean;
  enablePanGesture?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  title,
  children,
  height = '50%',
  showHandle = true,
  enableBackdropClose = true,
  enablePanGesture = true,
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Animation values
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  // Calculate sheet height
  const sheetHeight =
    typeof height === 'string'
      ? screenHeight * (parseInt(height, 10) / 100)
      : height;

  // Pan responder for drag gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => enablePanGesture,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return enablePanGesture && Math.abs(gestureState.dy) > 10;
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      const shouldClose =
        gestureState.dy > sheetHeight * 0.3 || gestureState.vy > 0.5;

      if (shouldClose) {
        closeSheet();
      } else {
        // Snap back to position
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const openSheet = useCallback(() => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [backdropOpacity, translateY]);

  const closeSheet = useCallback(() => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: sheetHeight,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  }, [backdropOpacity, translateY, sheetHeight, onClose]);

  const handleBackdropPress = useCallback(() => {
    if (enableBackdropClose) {
      closeSheet();
    }
  }, [enableBackdropClose, closeSheet]);

  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      // Reset position
      translateY.setValue(sheetHeight);
      openSheet();
    } else {
      // Reset values for next open
      backdropOpacity.setValue(0);
      translateY.setValue(sheetHeight);
    }
  }, [visible, openSheet, sheetHeight, backdropOpacity, translateY]);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={closeSheet}
      style={styles.modal}
    >
      <StatusBar
        backgroundColor={theme.colors.backdrop || 'rgba(0, 0, 0, 0.5)'}
        barStyle="light-content"
      />

      {/* Backdrop */}
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: backdropOpacity,
            backgroundColor: theme.colors.backdrop || 'rgba(0, 0, 0, 0.5)',
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={handleBackdropPress}
        />
      </Animated.View>

      {/* Bottom Sheet */}
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY }],
            height: sheetHeight,
          },
        ]}
        {...(enablePanGesture ? panResponder.panHandlers : {})}
      >
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: theme.colors.surface,
              shadowColor: theme.colors.shadowColor || '#000',
            },
          ]}
        >
          {/* Handle */}
          {showHandle && (
            <View style={styles.handleContainer}>
              <View
                style={[
                  styles.handle,
                  { backgroundColor: theme.colors.border },
                ]}
              />
            </View>
          )}

          {/* Header */}
          {title && (
            <View
              style={[
                styles.header,
                { borderBottomColor: theme.colors.border },
              ]}
            >
              <Text style={[styles.title, { color: theme.colors.text }]}>
                {title}
              </Text>
            </View>
          )}

          {/* Content */}
          <View
            style={[
              styles.content,
              { paddingBottom: Math.max(insets.bottom, rp(20)) },
            ]}
          >
            {children}
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    padding: 0,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999999,
    elevation: 999999,
  },
  backdropTouchable: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000000,
    elevation: 1000000,
    margin: 0,
    padding: 0,
  },
  sheet: {
    flex: 1,
    borderTopLeftRadius: rp(24),
    borderTopRightRadius: rp(24),
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 16,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: rp(12),
  },
  handle: {
    width: rp(48),
    height: rp(4),
    borderRadius: rp(2),
  },
  header: {
    paddingHorizontal: rp(20),
    paddingBottom: rp(16),
    borderBottomWidth: 1,
  },
  title: {
    fontSize: fp(18),
    fontWeight: '700',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: rp(20),
    paddingTop: rp(10),
  },
});

export default BottomSheet;
