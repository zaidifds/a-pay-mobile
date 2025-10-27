import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import SvgIcon from '@/assets/svg/SvgIcon';

interface ActionChip {
  id: string;
  label: string;
  icon: string;
  onPress: () => void;
}

interface QuickActionChipsProps {
  onAddPress?: () => void;
  onSendPress?: () => void;
  onQRPress?: () => void;
  onExchangePress?: () => void;
  onCryptoPress?: () => void;
}

const QuickActionChips: React.FC<QuickActionChipsProps> = ({
  onAddPress,
  onSendPress,
  onQRPress,
  onExchangePress,
  onCryptoPress,
}) => {
  const { theme } = useTheme();

  const actions: ActionChip[] = [
    {
      id: 'add',
      label: 'Add',
      icon: 'person-add',
      onPress: onAddPress || (() => {}),
    },
    {
      id: 'send',
      label: 'Send',
      icon: 'send',
      onPress: onSendPress || (() => {}),
    },
    {
      id: 'qr',
      label: 'QR Pay',
      icon: 'qr-code-scanner',
      onPress: onQRPress || (() => {}),
    },
    {
      id: 'exchange',
      label: 'Exchange',
      icon: 'swap-horiz',
      onPress: onExchangePress || (() => {}),
    },
    {
      id: 'crypto',
      label: 'Crypto',
      icon: 'attach-money',
      onPress: onCryptoPress || (() => {}),
    },
  ];

  const renderChip = (chip: ActionChip) => {
    const getIconComponent = () => {
      const iconSize = rp(28);

      switch (chip.id) {
        case 'add':
          return (
            <View style={styles(theme).iconSquare}>
              <SvgIcon.Add width={iconSize} height={iconSize} />
            </View>
          );
        case 'send':
          return (
            <View style={styles(theme).iconSquare}>
              <SvgIcon.Send width={iconSize} height={iconSize} />
            </View>
          );
        case 'qr':
          return (
            <View style={styles(theme).iconSquare}>
              <SvgIcon.Qr width={iconSize} height={iconSize} />
            </View>
          );
        case 'exchange':
          return (
            <View style={styles(theme).iconSquare}>
              <SvgIcon.Exchange width={iconSize} height={iconSize} />
            </View>
          );
        case 'crypto':
          return (
            <View style={styles(theme).iconSquare}>
              <SvgIcon.Crypto width={iconSize} height={iconSize} />
            </View>
          );
        default:
          return null;
      }
    };

    return (
      <TouchableOpacity
        key={chip.id}
        style={styles(theme).chip}
        onPress={chip.onPress}
      >
        <View style={styles(theme).iconContainer}>{getIconComponent()}</View>
        <Text style={styles(theme).chipLabel}>{chip.label}</Text>
      </TouchableOpacity>
    );
  };

  return <View style={styles(theme).container}>{actions.map(renderChip)}</View>;
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: rp(24),
      marginHorizontal: rp(20),
      paddingBottom: rp(6),
    },
    chip: {
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      marginBottom: rp(10),
    },
    iconSquare: {
      width: rp(56),
      height: rp(56),
      borderRadius: rp(16),
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 2,
    },
    iconCircle: {
      width: rp(56),
      height: rp(56),
      borderRadius: rp(28),
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 2,
      borderWidth: 1.5,
      borderColor: theme.colors.primaryLight,
      borderStyle: 'dashed',
    },
    chipLabel: {
      fontSize: fp(11),
      color: theme.colors.text,
      fontWeight: '500',
      marginTop: rp(4),
    },
  });

export default QuickActionChips;
