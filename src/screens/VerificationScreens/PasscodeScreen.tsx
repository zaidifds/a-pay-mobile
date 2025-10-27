import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader, StandardButton, CodeInput } from '@/components/ui';
import { VerificationNavigatorParamList } from '@/navigation/VerificationNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

const PasscodeScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<VerificationNavigatorParamList>>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  const [passcode, setPasscode] = useState<string[]>([]);

  const handleTextChange = (text: string, index: number) => {
    const newPasscode = [...passcode];
    newPasscode[index] = text;
    setPasscode(newPasscode);
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !passcode[index] && index > 0) {
      // If current field is empty and backspace is pressed, clear previous field
      const newPasscode = [...passcode];
      newPasscode[index - 1] = '';
      setPasscode(newPasscode);
    }
  };

  const handleSave = () => {
    const fullPasscode = passcode.join('');
    if (fullPasscode.length === 6) {
      console.log('Passcode saved:', fullPasscode);
      if (fullPasscode === '123456') {
        navigation.navigate('ProofOfResidencyScreen');
      }
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const isPasscodeComplete = passcode.every(digit => digit !== '');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <DynamicHeader showBackButton onBackPress={handleBack} />

        <View style={styles.content}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.text,
                  textAlign: isRTL ? 'right' : 'left',
                },
              ]}
            >
              {t('create_passcode')}
            </Text>
          </View>
          {/* Description */}
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.description,
                {
                  color: theme.colors.textSecondary,
                  textAlign: isRTL ? 'right' : 'left',
                },
              ]}
            >
              {t('create_passcode_description')}
            </Text>
          </View>

          {/* Passcode Input Fields */}
          <View style={styles.passcodeWrapper}>
            <CodeInput
              length={6}
              value={passcode}
              onChangeText={handleTextChange}
              onKeyPress={handleKeyPress}
              autoFocus={true}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <StandardButton
            title={t('save')}
            onPress={handleSave}
            variant="primary"
            size="large"
            fullWidth
            disabled={!isPasscodeComplete}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 5,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  textContainer: {
    marginBottom: 48,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  passcodeWrapper: {
    alignItems: 'center',
    marginTop: 42,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});

export default PasscodeScreen;
