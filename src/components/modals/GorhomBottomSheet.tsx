import React, { useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';

interface GorhomBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  snapPoints?: string[];
  index?: number;
  enablePanDownToClose?: boolean;
  backdropOpacity?: number;
  style?: any;
}

const GorhomBottomSheet: React.FC<GorhomBottomSheetProps> = ({
  visible,
  onClose,
  title,
  children,
  snapPoints = ['25%', '50%', '90%'],
  index = 1,
  enablePanDownToClose = true,
  backdropOpacity = 0.5,
  style,
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Memoize snap points
  const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);

  // Handle sheet changes
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  // Render backdrop
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={backdropOpacity}
        onPress={onClose}
      />
    ),
    [backdropOpacity, onClose],
  );

  // Show/hide bottom sheet
  React.useEffect(() => {
    if (visible) {
      // Small delay to ensure smooth animation
      setTimeout(() => {
        bottomSheetRef.current?.snapToIndex(index);
      }, 100);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible, index]);

  if (!visible) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles(theme, insets).container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Start closed
        snapPoints={snapPointsMemo}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={enablePanDownToClose}
        handleIndicatorStyle={[
          styles(theme, insets).handleIndicator,
          { backgroundColor: theme.colors.border },
        ]}
        backgroundStyle={[
          styles(theme, insets).background,
          { backgroundColor: theme.colors.surface },
          style,
        ]}
        style={[
          styles(theme, insets).bottomSheet,
          {
            shadowColor: theme.colors.shadowColor,
          },
        ]}
      >
        <BottomSheetView style={styles(theme, insets).contentContainer}>
          {title && (
            <View style={styles(theme, insets).header}>
              <Text style={styles(theme, insets).title}>{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={rp(24)} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          )}
          {children}
        </BottomSheetView>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

const styles = (theme: any, insets: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    bottomSheet: {
      shadowOffset: {
        width: 0,
        height: -4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 16,
    },
    background: {
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    handleIndicator: {
      width: 48,
      height: 4,
      borderRadius: 2,
      alignSelf: 'center',
      marginVertical: 12,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: rp(20),
      paddingBottom: rp(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      fontSize: fp(18),
      fontWeight: '700',
      color: theme.colors.text,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
  });

export default GorhomBottomSheet;