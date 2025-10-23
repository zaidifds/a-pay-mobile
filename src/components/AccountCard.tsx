import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import useTranslation from '../localization/useTranslation';

interface AccountCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onGetStarted: () => void;
  onLearnMore: () => void;
  style?: any;
}

const AccountCard: React.FC<AccountCardProps> = ({
  icon,
  title,
  description,
  onGetStarted,
  onLearnMore,
  style,
}) => {
  const { theme } = useTheme();
  const { isRTL } = useTranslation();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadowColor },
        isRTL && styles.cardRTL,
        style,
      ]}
      onPress={onGetStarted}
      activeOpacity={0.8}
    >
      <View style={[styles.cardHeader, isRTL && styles.cardHeaderRTL]}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.colors.primaryLight },
          ]}
        >
          {icon}
        </View>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
          {title}
        </Text>
      </View>
      <Text style={[styles.cardDescription, { color: theme.colors.textSecondary }]}>
        {description}
      </Text>
      <View style={[styles.cardActions, isRTL && styles.cardActionsRTL]}>
        <TouchableOpacity
          style={[
            styles.primaryButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={onGetStarted}
        >
          <Text style={[styles.primaryButtonText, { color: theme.colors.buttonText }]}>
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLearnMore}>
          <Text style={[styles.learnMoreLink, { color: theme.colors.primary }]}>
            Learn more >
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardRTL: {
    // RTL specific styles if needed
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'left',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardActionsRTL: {
    flexDirection: 'row-reverse',
  },
  primaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  learnMoreLink: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AccountCard;
