import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface TopSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
}

const TopSheet: React.FC<TopSheetProps> = ({ visible, onClose, title }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const slideAnim = useRef(new Animated.Value(-300)).current;

  // Mock notifications
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Payment Received',
      message: 'You received £671.00 from PayPal',
      time: '2 mins ago',
      read: false,
    },
    {
      id: '2',
      title: 'Bill Paid',
      message: 'Your Netflix subscription has been renewed',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      title: 'Transaction Complete',
      message: 'Your crypto purchase is completed',
      time: '3 hours ago',
      read: true,
    },
  ];

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 10,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const renderNotification = (notification: Notification) => (
    <TouchableOpacity
      key={notification.id}
      style={[
        styles(theme, insets).notificationItem,
        !notification.read && styles(theme, insets).notificationUnread,
      ]}
    >
      <View style={styles(theme, insets).notificationIcon}>
        <Icon name="notifications" size={rp(24)} color={theme.colors.primary} />
      </View>
      <View style={styles(theme, insets).notificationContent}>
        <Text style={styles(theme, insets).notificationTitle}>
          {notification.title}
        </Text>
        <Text style={styles(theme, insets).notificationMessage}>
          {notification.message}
        </Text>
        <Text style={styles(theme, insets).notificationTime}>
          {notification.time}
        </Text>
      </View>
      {!notification.read && <View style={styles(theme, insets).unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles(theme, insets).overlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles(theme, insets).container,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles(theme, insets).handle} />
        <View style={styles(theme, insets).header}>
          <Text style={styles(theme, insets).title}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={rp(28)} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles(theme, insets).content}
          showsVerticalScrollIndicator={false}
        >
          {notifications.map(renderNotification)}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

const styles = (theme: any, insets: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    container: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: rp(24),
      borderBottomRightRadius: rp(24),
      position: 'absolute',
      top: insets.top,
      left: 0,
      right: 0,
      height: '50%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 10,
    },
    handle: {
      backgroundColor: theme.colors.border,
      width: rp(40),
      height: rp(4),
      borderRadius: rp(2),
      alignSelf: 'center',
      marginTop: rp(8),
      marginBottom: rp(12),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: rp(20),
      paddingBottom: rp(16),
    },
    title: {
      fontSize: fp(20),
      fontWeight: '700',
      color: theme.colors.text,
    },
    content: {
      flex: 1,
      paddingHorizontal: rp(20),
    },
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: rp(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    notificationUnread: {
      backgroundColor: theme.colors.backgroundSecondary,
    },
    notificationIcon: {
      width: rp(48),
      height: rp(48),
      borderRadius: rp(24),
      backgroundColor: `${theme.colors.primary}15`,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: rp(12),
    },
    notificationContent: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: fp(16),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(4),
    },
    notificationMessage: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      marginBottom: rp(4),
    },
    notificationTime: {
      fontSize: fp(12),
      color: theme.colors.textTertiary,
    },
    unreadDot: {
      width: rp(8),
      height: rp(8),
      borderRadius: rp(4),
      backgroundColor: theme.colors.primary,
      marginLeft: rp(8),
    },
  });

export default TopSheet;
