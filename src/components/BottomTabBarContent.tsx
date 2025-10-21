import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants';

const BottomTabBarContent = ({
  state: tabState,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  const getTabIcon = (routeName: string, color: string, size: number) => {
    switch (routeName) {
      case 'wallet':
        return <Icon name="account-balance-wallet" size={size} color={color} />;
      case 'send':
        return <Icon name="send" size={size} color={color} />;
      case 'history':
        return <Icon name="history" size={size} color={color} />;
      case 'profile':
        return <Icon name="person" size={size} color={color} />;
      default:
        return <Icon name="account-balance-wallet" size={size} color={color} />;
    }
  };

  const getTabLabel = (routeName: string) => {
    switch (routeName) {
      case 'wallet':
        return 'Wallet';
      case 'send':
        return 'Send';
      case 'history':
        return 'History';
      case 'profile':
        return 'Profile';
      default:
        return 'Wallet';
    }
  };

  const handleTabPress = (route: any) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {tabState.routes.map((route, index) => {
        const isFocused = tabState.index === index;
        const onPress = () => handleTabPress(route);

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
          >
            <View
              style={[
                styles.iconContainer,
                isFocused && styles.iconContainerActive,
              ]}
            >
              {getTabIcon(
                route.name,
                isFocused ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY,
                20,
              )}
            </View>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={[
                styles.label,
                {
                  color: isFocused ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY,
                },
              ]}
            >
              {getTabLabel(route.name)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.SURFACE,
    borderTopColor: '#E5E5EA',
    borderTopWidth: 1,
    height: 70,
    paddingTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 3,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 2,
    minHeight: 54,
  },
  iconContainer: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 4,
  },
  iconContainerActive: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 1,
    letterSpacing: 0.1,
    textAlign: 'center',
  },
});

export default BottomTabBarContent;
