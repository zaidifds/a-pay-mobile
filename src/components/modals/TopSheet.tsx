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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';

const { height: screenHeight } = Dimensions.get('window');

interface TopSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: number | string;
  showCloseButton?: boolean;
  enableBackdropClose?: boolean;
  enablePanGesture?: boolean;
}

const TopSheet: React.FC<TopSheetProps> = ({
  visible,
  onClose,
  title,
  children,
  height = '40%',
  showCloseButton = true,
  enableBackdropClose = true,
  enablePanGesture = true,
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Animation values
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-screenHeight)).current;

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
      if (gestureState.dy < 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      const shouldClose =
        gestureState.dy < -sheetHeight * 0.3 || gestureState.vy < -0.5;

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
        toValue: -sheetHeight,
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
      translateY.setValue(-sheetHeight);
      openSheet();
    } else {
      // Reset values for next open
      backdropOpacity.setValue(0);
      translateY.setValue(-sheetHeight);
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

      {/* Top Sheet */}
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
          {/* Header */}
          <View
            style={[
              styles.header,
              {
                borderBottomColor: theme.colors.border,
                paddingTop: Math.max(insets.top, rp(16)),
              },
            ]}
          >
            {title && (
              <Text style={[styles.title, { color: theme.colors.text }]}>
                {title}
              </Text>
            )}

            {showCloseButton && (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeSheet}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon name="close" size={rp(24)} color={theme.colors.text} />
              </TouchableOpacity>
            )}
          </View>

          {/* Content */}
          <View style={styles.content}>{children}</View>
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
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000000,
    elevation: 1000000,
    margin: 0,
    padding: 0,
  },
  sheet: {
    flex: 1,
    borderBottomLeftRadius: rp(24),
    borderBottomRightRadius: rp(24),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rp(20),
    paddingBottom: rp(16),
    borderBottomWidth: 1,
  },
  title: {
    fontSize: fp(18),
    fontWeight: '700',
    flex: 1,
  },
  closeButton: {
    padding: rp(4),
    marginLeft: rp(16),
  },
  content: {
    flex: 1,
    paddingHorizontal: rp(20),
    paddingVertical: rp(16),
  },
});

export default TopSheet;
