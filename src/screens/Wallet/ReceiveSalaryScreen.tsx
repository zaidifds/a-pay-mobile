import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Clipboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fp, rp } from '@/utils/responsive';
import { useTheme } from '@/hooks';
import useTranslation from '@/localization/useTranslation';
import { DynamicHeader } from '@/components/ui';
import { RootStackParamList } from '@/navigation/navigationTypes';

type ReceiveSalaryScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

interface BankDetail {
  label: string;
  value: string;
  copyable?: boolean;
}

interface AccordionSection {
  id: string;
  title: string;
  subtitle: string;
  details: BankDetail[];
}

export default function ReceiveSalaryScreen() {
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();
  const navigation = useNavigation<ReceiveSalaryScreenNavigationProp>();

  const [expandedSection, setExpandedSection] = useState<string | null>(
    'domestic',
  );
  const animationValues = useRef({
    domestic: new Animated.Value(1),
    international: new Animated.Value(0),
  }).current;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHomePress = () => {
    navigation.goBack();
  };

  const handleCopy = (text: string, label: string) => {
    Clipboard.setString(text);
    Alert.alert(t('success'), `${label} ${t('copied_to_clipboard')}`);
  };

  const toggleAccordion = (sectionId: string) => {
    const isCurrentlyExpanded = expandedSection === sectionId;
    const newExpandedSection = isCurrentlyExpanded ? null : sectionId;

    setExpandedSection(newExpandedSection);

    // Animate both sections
    Object.keys(animationValues).forEach(key => {
      const targetValue = key === newExpandedSection ? 1 : 0;
      Animated.timing(animationValues[key as keyof typeof animationValues], {
        toValue: targetValue,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  const accordionSections: AccordionSection[] = [
    {
      id: 'domestic',
      title: t('for_faster_payments'),
      subtitle: t('faster_payments_subtitle'),
      details: [
        { label: t('name'), value: 'Digital Capital Ltd.' },
        { label: t('account_no'), value: '12345678', copyable: true },
        { label: t('sort_code'), value: '123456', copyable: true },
        {
          label: t('bank_address'),
          value: '26 - 28 Hammersmith Grove, W6 7BA, London',
        },
      ],
    },
    {
      id: 'international',
      title: t('for_international_payments'),
      subtitle: t('international_payments_subtitle'),
      details: [
        { label: t('account_name'), value: 'Cara Dune' },
        { label: t('iban'), value: 'EE297777000011614379', copyable: true },
        { label: t('bic_swift'), value: 'LHVBEE22', copyable: true },
        {
          label: t('bank_address'),
          value: '26 - 28 Hammersmith Grove, W6 7BA, London',
        },
      ],
    },
  ];

  const renderBankDetail = (detail: BankDetail, index: number) => (
    <View key={index} style={styles(theme, isRTL).detailRow}>
      <Text style={styles(theme, isRTL).detailLabel}>{detail.label}:</Text>
      <View style={styles(theme, isRTL).detailValueContainer}>
        <Text style={styles(theme, isRTL).detailValue} selectable>
          {detail.value}
        </Text>
        {detail.copyable && (
          <TouchableOpacity
            style={styles(theme, isRTL).copyButton}
            onPress={() => handleCopy(detail.value, detail.label)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon
              name="content-copy"
              size={rp(16)}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderAccordionSection = (section: AccordionSection) => {
    const animatedHeight =
      animationValues[section.id as keyof typeof animationValues];

    return (
      <View key={section.id} style={styles(theme, isRTL).accordionContainer}>
        <TouchableOpacity
          style={styles(theme, isRTL).accordionHeader}
          onPress={() => toggleAccordion(section.id)}
          activeOpacity={0.7}
        >
          <View style={styles(theme, isRTL).accordionHeaderContent}>
            <View style={styles(theme, isRTL).accordionTitleContainer}>
              <Text style={styles(theme, isRTL).accordionTitle}>
                {section.title}
              </Text>
              <Text style={styles(theme, isRTL).accordionSubtitle}>
                {section.subtitle}
              </Text>
            </View>
            <Animated.View
              style={[
                styles(theme, isRTL).accordionIcon,
                {
                  transform: [
                    {
                      rotate: animatedHeight.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Icon
                name="keyboard-arrow-up"
                size={rp(24)}
                color={theme.colors.primary}
              />
            </Animated.View>
          </View>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles(theme, isRTL).accordionContent,
            {
              maxHeight: animatedHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 400],
              }),
              opacity: animatedHeight,
            },
          ]}
        >
          <View style={styles(theme, isRTL).accordionDetails}>
            {section.details.map((detail, index) =>
              renderBankDetail(detail, index),
            )}

            {/* Copy Button */}
            <TouchableOpacity
              style={styles(theme, isRTL).mainCopyButton}
              onPress={() => {
                const allDetails = section.details
                  .map(detail => `${detail.label}: ${detail.value}`)
                  .join('\n');
                handleCopy(allDetails, t('bank_details'));
              }}
              activeOpacity={0.8}
            >
              <Icon name="content-copy" size={rp(16)} color="#FFFFFF" />
              <Text style={styles(theme, isRTL).mainCopyButtonText}>
                {t('copy')}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles(theme, isRTL).container}>
      <DynamicHeader
        titleKey="receive_salary"
        showBackButton
        onBackPress={handleBackPress}
        rightContent={
          <TouchableOpacity
            onPress={handleHomePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="home" size={rp(24)} color={theme.colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles(theme, isRTL).scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles(theme, isRTL).scrollContent}
      >
        {/* Description */}
        <View style={styles(theme, isRTL).descriptionContainer}>
          <Text style={styles(theme, isRTL).description}>
            {t('receive_salary_description')}
          </Text>
        </View>

        {/* Accordion Sections */}
        <View style={styles(theme, isRTL).accordionsContainer}>
          {accordionSections.map(renderAccordionSection)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = (theme: any, isRTL: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: rp(20),
      paddingBottom: rp(40),
    },
    descriptionContainer: {
      marginBottom: rp(24),
    },
    description: {
      fontSize: fp(16),
      lineHeight: fp(24),
      color: theme.colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
    },
    accordionsContainer: {
      gap: rp(16),
    },
    accordionContainer: {
      backgroundColor: theme.colors.surface || theme.colors.background,
      borderRadius: rp(12),
      overflow: 'hidden',
      shadowColor: theme.colors.shadowColor || '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: theme.colors.border || '#E0E0E0',
    },
    accordionHeader: {
      padding: rp(16),
    },
    accordionHeaderContent: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    accordionTitleContainer: {
      flex: 1,
      alignItems: isRTL ? 'flex-end' : 'flex-start',
    },
    accordionTitle: {
      fontSize: fp(16),
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: rp(4),
      textAlign: isRTL ? 'right' : 'left',
    },
    accordionSubtitle: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
    },
    accordionIcon: {
      marginLeft: isRTL ? 0 : rp(12),
      marginRight: isRTL ? rp(12) : 0,
    },
    accordionContent: {
      overflow: 'hidden',
    },
    accordionDetails: {
      padding: rp(16),
      paddingTop: 0,
    },
    detailRow: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: rp(12),
      paddingVertical: rp(4),
    },
    detailLabel: {
      fontSize: fp(14),
      color: theme.colors.textSecondary,
      fontWeight: '500',
      minWidth: rp(80),
      textAlign: isRTL ? 'right' : 'left',
    },
    detailValueContainer: {
      flex: 1,
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: isRTL ? 'flex-end' : 'flex-start',
      marginLeft: isRTL ? 0 : rp(12),
      marginRight: isRTL ? rp(12) : 0,
    },
    detailValue: {
      fontSize: fp(14),
      color: theme.colors.text,
      fontWeight: '600',
      flex: 1,
      textAlign: isRTL ? 'right' : 'left',
    },
    copyButton: {
      padding: rp(4),
      marginLeft: isRTL ? 0 : rp(8),
      marginRight: isRTL ? rp(8) : 0,
    },
    mainCopyButton: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      paddingVertical: rp(10),
      paddingHorizontal: rp(20),
      borderRadius: rp(8),
      marginTop: rp(16),
      alignSelf: isRTL ? 'flex-start' : 'flex-end',
    },
    mainCopyButtonText: {
      fontSize: fp(14),
      fontWeight: '600',
      color: '#FFFFFF',
      marginLeft: isRTL ? 0 : rp(8),
      marginRight: isRTL ? rp(8) : 0,
    },
  });
