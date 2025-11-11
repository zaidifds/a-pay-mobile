import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTheme } from '@/hooks';
import { useAppDispatch, useAppSelector, RootState } from '@/redux/store';
import { setUser, logoutUser, loginWithPin } from '@/redux/slices/authSlice';
import { RootStackParamList } from '@/navigation/navigationTypes';

type Navigation = StackNavigationProp<RootStackParamList>;

type FlowAction = {
  label: string;
  hint?: string;
  onPress: () => void;
  pill?: string;
  accent?: string;
  icon?: string;
  disabled?: boolean;
};

type FlowSection = {
  key: string;
  title: string;
  description: string;
  icon?: string;
  eyebrow?: string;
  accent?: string;
  actions: FlowAction[];
};

const FlowExplorerScreen: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const { isAuthenticated, isLoading } = useAppSelector(
    (state: RootState) => state.auth,
  );

  const isTablet = width >= 960;
  const columnCount = isTablet ? 2 : 1;

  const handleMockLogin = () => {
    if (isAuthenticated || isLoading) {
      return;
    }

    dispatch(loginWithPin('1234'));
  };

  const handleInstantLogin = () => {
    if (isAuthenticated) {
      return;
    }

    dispatch(
      setUser({
        id: 'dev-user',
        email: 'dev@apay.com',
        name: 'A Pay Developer',
        createdAt: new Date().toISOString(),
        avatar: 'https://via.placeholder.com/100x100/1E3A8A/FFFFFF?text=DEV',
      }),
    );
  };

  const handleLogout = () => {
    if (isLoading) {
      return;
    }

    dispatch(logoutUser());
  };

  const navigateToDefaultFlow = () => {
    navigation.navigate(isAuthenticated ? 'BottomTabs' : 'Auth');
  };

  const heroGradientColors = ['rgba(59,130,246,0.18)', 'rgba(14,165,233,0.08)'];

  const quickActions: FlowAction[] = [
    {
      label: isAuthenticated ? 'Reset Session' : 'Instant Demo Login',
      hint: isAuthenticated
        ? 'Sign out and reset the app to explore authentication again.'
        : 'Skip async flows and jump straight into the wallet experience.',
      onPress: isAuthenticated ? handleLogout : handleInstantLogin,
      pill: isAuthenticated ? 'Reset' : '1 tap',
      accent: theme.colors.primary,
      icon: '⚡️',
      disabled: isLoading,
    },
    {
      label: 'Mock PIN Login',
      hint: 'Use PIN 1234 to authenticate via reducer logic.',
      onPress: handleMockLogin,
      pill: 'Mock',
      accent: theme.colors.warning,
      icon: '🔐',
      disabled: isAuthenticated || isLoading,
    },
    {
      label: 'Open Default Flow',
      hint: isAuthenticated
        ? 'Launch the authenticated tab experience.'
        : 'Go back to onboarding and sign-in screens.',
      onPress: navigateToDefaultFlow,
      pill: isAuthenticated ? 'Wallet' : 'Auth',
      accent: theme.colors.success,
      icon: '↗',
    },
  ];

  const flows: FlowSection[] = [
    {
      key: 'authentication',
      title: 'Authentication & Onboarding',
      icon: '🛡️',
      accent: '#2563EB',
      description:
        'Navigate onboarding, sign-in, sign-up, and account recovery screens.',
      actions: [
        {
          label: 'Full Auth Navigator',
          hint: 'Walk through the complete auth stack from onboarding onwards.',
          onPress: () => navigation.navigate('Auth'),
          pill: 'Stack',
        },
        {
          label: 'Sign In Screen',
          hint: 'Jump straight into the sign-in experience.',
          onPress: () =>
            navigation.navigate('Auth', {
              screen: 'SignIn',
            }),
        },
        {
          label: 'Business Signup Intro',
          hint: 'Start the business onboarding wizard.',
          onPress: () =>
            navigation.navigate('Auth', {
              screen: 'BusinessAccountIntro',
            }),
        },
        {
          label: 'Account Recovery',
          hint: 'Preview the recovery and verification steps.',
          onPress: () =>
            navigation.navigate('Auth', {
              screen: 'RecoverAccount',
            }),
        },
      ],
    },
    {
      key: 'wallet',
      title: 'Main App & Wallet',
      icon: '💳',
      accent: '#F97316',
      description:
        'Jump into wallet dashboards, money movement flows, and confirmations.',
      actions: [
        {
          label: 'Bottom Tabs (Wallet Home)',
          hint: 'Launch the authenticated wallet experience.',
          onPress: () => {
            handleInstantLogin();
            navigation.navigate('BottomTabs');
          },
          pill: 'Dashboard',
        },
        {
          label: 'Add Money Modal',
          hint: 'Preview the quick deposit entry point.',
          onPress: () => {
            handleInstantLogin();
            navigation.navigate('AddMoney');
          },
        },
        {
          label: 'Move Money Wizard',
          hint: 'Walk through transferring funds between wallets.',
          onPress: () => {
            handleInstantLogin();
            navigation.navigate('MoveMoney');
          },
        },
        {
          label: 'Move Money Confirmation',
          hint: 'Skip directly to the authentication stage.',
          onPress: () => {
            handleInstantLogin();
            navigation.navigate('MoveMoneyAuthentication', {
              fromAmount: '250.00',
              toAmount: '250.00',
              fromCurrency: 'USD',
              toCurrency: 'EUR',
              transactionFee: '2.50',
            });
          },
        },
      ],
    },
    {
      key: 'verification',
      title: 'Identity & Verification',
      icon: '🔍',
      accent: '#8B5CF6',
      description:
        'Access biometric prompts, document uploads, and verification steps.',
      actions: [
        {
          label: 'Verification Navigator',
          hint: 'Launch the verification stack starting with biometrics.',
          onPress: () => navigation.navigate('Verification'),
          pill: 'Stepper',
        },
        {
          label: 'Identity Card Upload',
          hint: 'Go straight to capturing identity documents.',
          onPress: () =>
            navigation.navigate('Verification', {
              screen: 'IdentityCardUploadScreen',
            }),
        },
        {
          label: 'Proof Of Residency',
          hint: 'Review the address verification journey.',
          onPress: () =>
            navigation.navigate('Verification', {
              screen: 'ProofOfResidencyScreen',
            }),
        },
      ],
    },
    {
      key: 'business',
      title: 'Business Account Management',
      icon: '🏢',
      accent: '#22C55E',
      description:
        'Inspect business summaries, statements, and profile configuration.',
      actions: [
        {
          label: 'Business Account Navigator',
          hint: 'Explore the full business account stack.',
          onPress: () => navigation.navigate('BusinessAccount'),
          pill: 'Stack',
        },
        {
          label: 'Statements',
          hint: 'Review monthly statement layouts.',
          onPress: () =>
            navigation.navigate('BusinessAccount', {
              screen: 'StatementsScreen',
            }),
        },
        {
          label: 'Business Profile',
          hint: 'Open the profile overview directly.',
          onPress: () =>
            navigation.navigate('BusinessAccount', {
              screen: 'BusinessProfileScreen',
            }),
        },
      ],
    },
  ];

  const metrics = [
    {
      label: 'Auth State',
      value: isAuthenticated ? 'Authenticated' : 'Guest',
    },
    {
      label: 'Quick Actions',
      value: quickActions.length.toString(),
    },
    {
      label: 'Flow Sections',
      value: flows.length.toString(),
    },
  ];

  const flowCardWidth = columnCount > 1 ? width / columnCount - 36 : undefined;
  const flowCardWidthStyle = flowCardWidth
    ? { width: flowCardWidth }
    : styles.flowCardFullWidth;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={heroGradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <View
            style={[
              styles.heroCard,
              {
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.card,
              },
            ]}
          >
            <Text style={[styles.eyebrow, { color: theme.colors.muted }]}>
              Toolkit
            </Text>
            <Text style={[styles.heroTitle, { color: theme.colors.text }]}>
              Flow Explorer
            </Text>
            <Text style={[styles.heroSubtitle, { color: theme.colors.muted }]}>
              Jump to any in-progress journey for authentication, verification,
              and wallet features while you iterate.
            </Text>

            <View style={styles.metricsRow}>
              {metrics.map(metric => (
                <View
                  key={metric.label}
                  style={[
                    styles.metricCard,
                    { borderColor: theme.colors.border },
                  ]}
                >
                  <Text
                    style={[styles.metricLabel, { color: theme.colors.muted }]}
                  >
                    {metric.label}
                  </Text>
                  <Text
                    style={[styles.metricValue, { color: theme.colors.text }]}
                  >
                    {metric.value}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.sessionRow}>
              <View
                style={[
                  styles.sessionBadge,
                  { backgroundColor: theme.colors.card },
                ]}
              >
                <View
                  style={[
                    styles.sessionDot,
                    {
                      backgroundColor: isAuthenticated
                        ? theme.colors.success
                        : theme.colors.border,
                    },
                  ]}
                />
                <Text
                  style={[styles.sessionText, { color: theme.colors.text }]}
                >
                  {isAuthenticated ? 'Authenticated session' : 'Guest session'}
                </Text>
              </View>
              {isLoading ? (
                <Text
                  style={[styles.loadingText, { color: theme.colors.muted }]}
                >
                  Updating…
                </Text>
              ) : null}
            </View>

            <View style={styles.heroButtons}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={navigateToDefaultFlow}
                style={[
                  styles.primaryButton,
                  { backgroundColor: theme.colors.primary },
                ]}
              >
                <Text style={styles.primaryButtonLabel}>
                  {isAuthenticated
                    ? 'Open Wallet Experience'
                    : 'Launch Auth Journey'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={isAuthenticated ? handleLogout : handleMockLogin}
                disabled={isLoading}
                style={[
                  styles.secondaryButton,
                  {
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.card,
                  },
                  isLoading && styles.secondaryButtonDisabled,
                ]}
              >
                <Text
                  style={[
                    styles.secondaryButtonLabel,
                    { color: theme.colors.text },
                  ]}
                >
                  {isAuthenticated
                    ? 'Sign Out & Reset'
                    : 'Mock Login (PIN 1234)'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Quick Actions
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.muted }]}>
            Handy shortcuts for the most common flows.
          </Text>
          <View style={styles.quickActionList}>
            {quickActions.map(action => (
              <TouchableOpacity
                key={action.label}
                activeOpacity={0.85}
                onPress={action.onPress}
                disabled={action.disabled}
                style={[
                  styles.quickActionCard,
                  {
                    borderColor: action.accent ?? theme.colors.border,
                    backgroundColor: theme.colors.card,
                  },
                  action.disabled && styles.quickActionDisabled,
                ]}
              >
                <View style={styles.quickActionHeader}>
                  <Text
                    style={[
                      styles.quickActionLabel,
                      { color: theme.colors.text },
                    ]}
                  >
                    {action.icon ? `${action.icon} ` : ''}
                    {action.label}
                  </Text>
                  {action.pill ? (
                    <View
                      style={[
                        styles.quickActionBadge,
                        {
                          backgroundColor:
                            action.accent ?? theme.colors.primary,
                        },
                      ]}
                    >
                      <Text style={styles.quickActionBadgeText}>
                        {action.pill}
                      </Text>
                    </View>
                  ) : null}
                </View>
                {action.hint ? (
                  <Text
                    style={[
                      styles.quickActionHint,
                      { color: theme.colors.muted },
                    ]}
                  >
                    {action.hint}
                  </Text>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Product Areas
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.muted }]}>
            Dive into specific segments of the application.
          </Text>

          <View
            style={[styles.flowGrid, columnCount > 1 && styles.flowGridWide]}
          >
            {flows.map(section => (
              <View
                key={section.key}
                style={[
                  styles.flowCard,
                  {
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.card,
                  },
                  flowCardWidthStyle,
                ]}
              >
                <View
                  style={[
                    styles.flowAccentBar,
                    {
                      backgroundColor: section.accent ?? theme.colors.border,
                    },
                  ]}
                />
                <View style={styles.flowHeader}>
                  <View style={styles.flowTitleRow}>
                    {section.icon ? (
                      <Text style={styles.flowIcon}>{section.icon}</Text>
                    ) : null}
                    <Text
                      style={[styles.flowTitle, { color: theme.colors.text }]}
                    >
                      {section.title}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.flowDescription,
                      { color: theme.colors.muted },
                    ]}
                  >
                    {section.description}
                  </Text>
                </View>
                <View style={styles.flowActions}>
                  {section.actions.map(action => (
                    <TouchableOpacity
                      key={`${section.key}-${action.label}`}
                      onPress={action.onPress}
                      activeOpacity={0.8}
                      disabled={action.disabled}
                      style={[
                        styles.flowActionRow,
                        action.disabled && styles.flowActionDisabled,
                      ]}
                    >
                      <View style={styles.flowActionTextWrapper}>
                        <Text
                          style={[
                            styles.flowActionLabel,
                            { color: theme.colors.text },
                          ]}
                        >
                          {action.label}
                        </Text>
                        {action.hint ? (
                          <Text
                            style={[
                              styles.flowActionHint,
                              { color: theme.colors.muted },
                            ]}
                          >
                            {action.hint}
                          </Text>
                        ) : null}
                      </View>
                      <Text
                        style={[
                          styles.flowActionChevron,
                          { color: theme.colors.muted },
                        ]}
                      >
                        ›
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 48,
    gap: 28,
  },
  heroGradient: {
    borderRadius: 20,
    padding: 1,
  },
  heroCard: {
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    gap: 20,
  },
  eyebrow: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 120,
  },
  metricLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sessionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sessionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  sessionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 13,
  },
  heroButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  primaryButton: {
    flexGrow: 1,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1,
  },
  secondaryButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonDisabled: {
    opacity: 0.6,
  },
  sectionBlock: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  quickActionList: {
    gap: 12,
  },
  quickActionCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    gap: 8,
  },
  quickActionDisabled: {
    opacity: 0.55,
  },
  quickActionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  quickActionLabel: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  quickActionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  quickActionBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  quickActionHint: {
    fontSize: 13,
    lineHeight: 18,
  },
  flowGrid: {
    gap: 16,
  },
  flowGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flowCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
    overflow: 'hidden',
  },
  flowCardFullWidth: {
    width: '100%',
  },
  flowAccentBar: {
    height: 4,
    borderRadius: 999,
    marginBottom: 12,
    opacity: 0.9,
  },
  flowTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flowIcon: {
    fontSize: 16,
  },
  flowHeader: {
    gap: 6,
  },
  flowTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  flowDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  flowActions: {
    gap: 10,
  },
  flowActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  flowActionTextWrapper: {
    flex: 1,
    gap: 4,
    paddingRight: 12,
  },
  flowActionLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  flowActionHint: {
    fontSize: 13,
  },
  flowActionChevron: {
    fontSize: 22,
  },
  flowActionDisabled: {
    opacity: 0.55,
  },
});

export default FlowExplorerScreen;
