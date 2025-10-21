import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fp, rp } from '../utils/responsive';

interface HeaderProps {
  title: string;
  rightButton?: {
    icon: string;
    onPress: () => void;
    color?: string;
  };
  showBackButton?: boolean;
  onBackPress?: () => void;
  backgroundColor?: string;
  titleColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  rightButton,
  showBackButton = false,
  onBackPress,
  backgroundColor = '#FFFFFF',
  titleColor = '#333333',
}) => {
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      backgroundColor,
      paddingTop: insets.top,
      paddingBottom: rp(15),
      paddingHorizontal: rp(20),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    backButton: {
      padding: rp(8),
      marginRight: rp(12),
      borderRadius: rp(20),
      backgroundColor: '#F5F5F5',
    },
    title: {
      fontSize: fp(18),
      fontWeight: '700',
      color: titleColor,
      letterSpacing: 0.5,
      flex: 1,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightButton: {
      padding: rp(10),
      borderRadius: rp(20),
      backgroundColor: '#F5F5F5',
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />

      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Icon name="arrow-back" size={rp(20)} color="#333333" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      {rightButton && (
        <View style={styles.rightSection}>
          <TouchableOpacity
            style={styles.rightButton}
            onPress={rightButton.onPress}
          >
            <Icon
              name={rightButton.icon}
              size={rp(20)}
              color={rightButton.color || '#333333'}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;
