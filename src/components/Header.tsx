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
  showFilterButton?: boolean;
  onFilterPress?: () => void;
  filterActive?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  rightButton,
  showBackButton = false,
  onBackPress,
  backgroundColor = '#FFFFFF',
  titleColor = '#333333',
  showFilterButton = false,
  onFilterPress,
  filterActive = false,
}) => {
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      backgroundColor,
      paddingTop: insets.top,
      paddingBottom: rp(12),
      paddingHorizontal: rp(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 4,
      elevation: 2,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    backButton: {
      padding: rp(6),
      marginRight: rp(8),
      borderRadius: rp(8),
      backgroundColor: '#F8F9FA',
      borderWidth: 1,
      borderColor: '#E5E5EA',
    },
    title: {
      fontSize: fp(18),
      fontWeight: '600',
      color: titleColor,
      letterSpacing: 0.2,
      flex: 1,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rp(8),
    },
    rightButton: {
      padding: rp(8),
      borderRadius: rp(8),
      backgroundColor: '#F8F9FA',
      borderWidth: 1,
      borderColor: '#E5E5EA',
    },
    filterButton: {
      padding: rp(8),
      borderRadius: rp(8),
      backgroundColor: filterActive ? '#007AFF' : '#F8F9FA',
      borderWidth: 1,
      borderColor: filterActive ? '#007AFF' : '#E5E5EA',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />

      {/* Left Section - Back Button + Title */}
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Icon name="arrow-back" size={rp(20)} color="#333333" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Section - Action Buttons */}
      <View style={styles.rightSection}>
        {showFilterButton && (
          <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
            <Icon
              name="filter-list"
              size={rp(18)}
              color={filterActive ? '#FFFFFF' : '#333333'}
            />
          </TouchableOpacity>
        )}
        {rightButton && (
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
        )}
      </View>
    </View>
  );
};

export default Header;
