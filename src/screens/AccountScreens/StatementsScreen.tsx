import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import useTheme from '@/hooks/useTheme';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';

type StatementsScreenNavigationProp = StackNavigationProp<AuthStackParamList>;

interface StatementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
}

const StatementsScreen: React.FC = () => {
  const navigation = useNavigation<StatementsScreenNavigationProp>();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleBack = () => {
    navigation.goBack();
  };

  const statementItems: StatementItem[] = [
    {
      id: 'monthly_statement',
      title: t('monthly_statement'),
      description: t('monthly_statement_description'),
      icon: '📅',
      onPress: () => console.log('Navigate to MonthlyStatement'),
    },
    {
      id: 'transaction_statements',
      title: t('transaction_statements'),
      description: t('transaction_statements_description'),
      icon: '🪙',
      onPress: () => console.log('Navigate to TransactionStatements'),
    },
    {
      id: 'statement_of_balances',
      title: t('statement_of_balances'),
      description: t('statement_of_balances_description'),
      icon: '📊',
      onPress: () => console.log('Navigate to StatementOfBalances'),
    },
    {
      id: 'account_confirmation',
      title: t('account_confirmation'),
      description: t('account_confirmation_description'),
      icon: '🏛️',
      onPress: () => console.log('Navigate to AccountConfirmation'),
    },
    {
      id: 'audit_confirmation',
      title: t('audit_confirmation'),
      description: t('audit_confirmation_description'),
      icon: '👥',
      onPress: () => console.log('Navigate to AuditConfirmation'),
    },
  ];

  const renderStatementItem = (item: StatementItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.statementItem,
          {
            borderBottomColor: theme.colors.border,
          },
        ]}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.statementItemContent}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{item.icon}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.statementTitle, { color: theme.colors.text }]}>
              {item.title}
            </Text>
            <Text
              style={[
                styles.statementDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              {item.description}
            </Text>
          </View>
          <Text style={[styles.chevron, { color: theme.colors.iconSecondary }]}>
            ›
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <DynamicHeader
        title={t('statements')}
        showBackButton
        backButtonIcon="←"
        onBackPress={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.statementsContainer,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          {statementItems.map(item => renderStatementItem(item))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  statementsContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  statementItem: {
    borderBottomWidth: 1,
  },
  statementItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  statementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statementDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  chevron: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default StatementsScreen;
