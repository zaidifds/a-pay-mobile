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
  title: string;
  children: React.ReactNode;
  snapPoints?: string[];
}

const GorhomBottomSheet: React.FC<GorhomBottomSheetProps> = ({
  visible,
  onClose,
  title,
  children,
  snapPoints = ['70%', '85%', '95%'],
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Memoize snap points to prevent unnecessary re-renders
  const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

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
        opacity={0.5}
        onPress={onClose}
      />
    ),
    [onClose],
  );

  // Show/hide bottom sheet
  React.useEffect(() => {
    if (visible) {
      // Small delay to ensure smooth animation
      setTimeout(() => {
        bottomSheetRef.current?.snapToIndex(0);
      }, 100);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: rp(20),
      paddingVertical: rp(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      fontSize: fp(18),
      fontWeight: '700',
      color: theme.colors.text,
    },
    closeButton: {
      padding: rp(8),
      borderRadius: rp(20),
      backgroundColor: theme.colors.backgroundSecondary,
    },
    content: {
      flex: 1,
      paddingHorizontal: rp(20),
      paddingBottom: insets.bottom + rp(20),
    },
    keyboardView: {
      flex: 1,
    },
    handle: {
      backgroundColor: theme.colors.border,
      width: rp(40),
      height: rp(4),
      borderRadius: rp(2),
      alignSelf: 'center',
      marginTop: rp(8),
    },
  });

  if (!visible) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={memoizedSnapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      handleIndicatorStyle={styles.handle}
      backgroundStyle={styles.container}
    >
      <BottomSheetView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon
              name="close"
              size={rp(20)}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {children}
        </KeyboardAvoidingView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default GorhomBottomSheet;
