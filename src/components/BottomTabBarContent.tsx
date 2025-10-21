import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants';

const BottomTabBarContent = ({
  state: tabState,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  const getTabIcon = (_routeName: string, color: string, size: number) => {
    return <Icon name="account-balance-wallet" size={size} color={color} />;
  };

  const getTabLabel = (_routeName: string) => {
    return 'Wallet';
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
            <View style={styles.iconContainer}>
              {getTabIcon(
                route.name,
                isFocused ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY,
                24,
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
    borderTopColor: '#E5E5E5',
    borderTopWidth: 1,
    height: 70,
    paddingTop: 5,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default BottomTabBarContent;
