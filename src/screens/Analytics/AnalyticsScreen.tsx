import React, { useCallback, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
  RadarChart,
} from 'react-native-gifted-charts';

import { useTheme } from '@/hooks';

const AnalyticsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { width: screenWidth } = useWindowDimensions();

  const isTablet = screenWidth >= 900;
  const chartWidth = Math.min(screenWidth - 76, 520);
  const wideChartWidth = Math.min(screenWidth - 76, 640);

  const trendData = useMemo(
    () => [
      { value: 120, label: 'Mon' },
      { value: 145, label: 'Tue' },
      { value: 132, label: 'Wed' },
      { value: 168, label: 'Thu' },
      { value: 190, label: 'Fri' },
      { value: 176, label: 'Sat' },
      { value: 210, label: 'Sun' },
    ],
    [],
  );

  const barData = useMemo(
    () => [
      { value: 38, label: 'Jan' },
      { value: 46, label: 'Feb' },
      { value: 52, label: 'Mar' },
      { value: 61, label: 'Apr' },
      { value: 58, label: 'May' },
      { value: 65, label: 'Jun' },
    ],
    [],
  );

  const pieData = useMemo(
    () => [
      { value: 46, color: '#2563EB', text: 'Cards 46%' },
      { value: 28, color: '#10B981', text: 'Mobile 28%' },
      { value: 16, color: '#F97316', text: 'Web 16%' },
      { value: 10, color: '#8B5CF6', text: 'Offline 10%' },
    ],
    [],
  );

  const funnelData = useMemo(
    () => [
      { label: 'KYC Completion', value: 0.82, color: '#2563EB' },
      { label: 'Funding Success', value: 0.68, color: '#F97316' },
      { label: 'Activation', value: 0.54, color: '#10B981' },
    ],
    [],
  );

  const stackedData = useMemo(
    () => [
      {
        label: 'North America',
        stacks: [
          { value: 42, color: '#2563EB' },
          { value: 28, color: '#22C55E' },
        ],
      },
      {
        label: 'EMEA',
        stacks: [
          { value: 38, color: '#2563EB' },
          { value: 31, color: '#22C55E' },
        ],
      },
      {
        label: 'APAC',
        stacks: [
          { value: 30, color: '#2563EB' },
          { value: 36, color: '#22C55E' },
        ],
      },
      {
        label: 'LATAM',
        stacks: [
          { value: 22, color: '#2563EB' },
          { value: 27, color: '#22C55E' },
        ],
      },
    ],
    [],
  );

  const radarConfig = useMemo(
    () => ({
      labels: ['Reliability', 'Speed', 'Security', 'UX', 'Support'],
      data: [88, 76, 92, 81, 74],
      polygon: {
        fill: 'rgba(37,99,235,0.28)',
        gradientColor: 'rgba(139,92,246,0.22)',
        showGradient: true,
        opacity: 0.75,
        gradientOpacity: 0.6,
        stroke: '#2563EB',
        strokeWidth: 2,
      },
    }),
    [],
  );

  const pyramidData = useMemo(
    () => [
      {
        left: 42,
        right: 36,
        yAxisLabel: '18 – 24',
        leftBarColor: '#2563EB',
        rightBarColor: '#F97316',
      },
      {
        left: 58,
        right: 62,
        yAxisLabel: '25 – 34',
        leftBarColor: '#2563EB',
        rightBarColor: '#F97316',
      },
      {
        left: 47,
        right: 53,
        yAxisLabel: '35 – 44',
        leftBarColor: '#2563EB',
        rightBarColor: '#F97316',
      },
      {
        left: 39,
        right: 41,
        yAxisLabel: '45 – 54',
        leftBarColor: '#2563EB',
        rightBarColor: '#F97316',
      },
      {
        left: 28,
        right: 24,
        yAxisLabel: '55 – 64',
        leftBarColor: '#2563EB',
        rightBarColor: '#F97316',
      },
    ],
    [],
  );

  const kpis = useMemo(
    () => [
      {
        title: 'Total Volume',
        value: '$1.48M',
        delta: '+8.3%',
        gradient: ['rgba(37,99,235,0.4)', 'rgba(37,99,235,0.16)'],
      },
      {
        title: 'Active Users',
        value: '82.4k',
        delta: '+5.2%',
        gradient: ['rgba(16,185,129,0.4)', 'rgba(16,185,129,0.16)'],
      },
      {
        title: 'Avg. Ticket',
        value: '$182',
        delta: '+2.1%',
        gradient: ['rgba(249,115,22,0.35)', 'rgba(249,115,22,0.14)'],
      },
    ],
    [],
  );

  const renderCenterLabel = useCallback(
    () => (
      <View style={styles.centerLabelWrapper}>
        <Text style={[styles.centerLabelTitle, { color: theme.colors.text }]}>
          100%
        </Text>
        <Text
          style={[styles.centerLabelSubtitle, { color: theme.colors.muted }]}
        >
          Volume
        </Text>
      </View>
    ),
    [theme.colors.muted, theme.colors.text],
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.screenTitle, { color: theme.colors.text }]}>
          Analytics Overview
        </Text>
        <Text style={[styles.screenSubtitle, { color: theme.colors.muted }]}>
          Real-time metrics to understand product health and customer behaviour.
        </Text>

        <View style={styles.kpiRow}>
          {kpis.map(kpi => (
            <LinearGradient
              key={kpi.title}
              colors={kpi.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.kpiCardGradient,
                isTablet ? styles.kpiCardTablet : styles.kpiCardFull,
              ]}
            >
              <View
                style={[
                  styles.kpiCard,
                  {
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.card,
                  },
                ]}
              >
                <Text style={[styles.kpiTitle, { color: theme.colors.muted }]}>
                  {kpi.title}
                </Text>
                <Text style={[styles.kpiValue, { color: theme.colors.text }]}>
                  {kpi.value}
                </Text>
                <Text
                  style={[styles.kpiDelta, { color: theme.colors.success }]}
                >
                  {kpi.delta}
                </Text>
              </View>
            </LinearGradient>
          ))}
        </View>

        <LinearGradient
          colors={['rgba(37,99,235,0.18)', 'rgba(45,212,191,0.08)']}
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
            <Text style={[styles.heroTitle, { color: theme.colors.text }]}>
              Weekly Revenue Trend
            </Text>
            <Text style={[styles.heroCaption, { color: theme.colors.muted }]}>
              +18.6% vs last week
            </Text>
            <View style={styles.chartContainer}>
              <LineChart
                areaChart
                curved
                data={trendData}
                color={theme.colors.primary}
                thickness={3}
                hideDataPoints
                hideRules
                xAxisColor={theme.colors.border}
                yAxisColor={theme.colors.border}
                startFillColor="rgba(37,99,235,0.25)"
                endFillColor="rgba(37,99,235,0.05)"
                startOpacity={0.9}
                endOpacity={0.05}
                initialSpacing={12}
                spacing={28}
                yAxisTextStyle={styles.axisLabel}
                xAxisLabelTextStyle={styles.axisLabel}
                width={wideChartWidth}
              />
            </View>
          </View>
        </LinearGradient>

        <View style={[styles.gridRow, !isTablet && styles.gridColumn]}>
          <View
            style={[
              styles.card,
              isTablet ? styles.cardHalfTablet : styles.cardHalfFull,
              {
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.card,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Monthly Transaction Volume
            </Text>
            <Text style={[styles.cardSubtitle, { color: theme.colors.muted }]}>
              Total settled payments
            </Text>
            <View style={styles.chartContainer}>
              <BarChart
                data={barData}
                frontColor={theme.colors.primary}
                barWidth={24}
                barBorderRadius={8}
                initialSpacing={16}
                hideRules
                xAxisColor={theme.colors.border}
                yAxisColor={theme.colors.border}
                xAxisLabelTextStyle={styles.axisLabel}
                yAxisTextStyle={styles.axisLabel}
                yAxisLabelSuffix="k"
                width={chartWidth}
              />
            </View>
          </View>

          <View
            style={[
              styles.card,
              isTablet ? styles.cardHalfTablet : styles.cardHalfFull,
              {
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.card,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Channel Contribution
            </Text>
            <Text style={[styles.cardSubtitle, { color: theme.colors.muted }]}>
              Share of processed volume
            </Text>
            <View style={styles.pieChartWrapper}>
              <PieChart
                data={pieData}
                donut
                innerRadius={38}
                radius={Math.min(70, chartWidth / 4)}
                sectionAutoFocus
                focusOnPress
                textColor={theme.colors.text}
                textSize={12}
                textBackgroundRadius={18}
                innerCircleColor={theme.colors.card}
                centerLabelComponent={renderCenterLabel}
              />
            </View>
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Funnel Conversion Health
          </Text>
          <Text style={[styles.cardSubtitle, { color: theme.colors.muted }]}>
            Completion rates for the past 7 days
          </Text>
          <View style={styles.progressList}>
            {funnelData.map(item => (
              <View key={item.label} style={styles.progressRow}>
                <View style={styles.progressHeader}>
                  <Text
                    style={[styles.progressLabel, { color: theme.colors.text }]}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={[styles.progressValue, { color: theme.colors.text }]}
                  >
                    {Math.round(item.value * 100)}%
                  </Text>
                </View>
                <View
                  style={[
                    styles.progressTrack,
                    { backgroundColor: theme.colors.border },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.round(item.value * 100)}%`,
                        backgroundColor: item.color,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Regional Performance Breakdown
          </Text>
          <Text style={[styles.cardSubtitle, { color: theme.colors.muted }]}>
            Settled volume split by new vs repeat customers
          </Text>
          <View style={styles.chartContainer}>
            <BarChart
              stackData={stackedData}
              barWidth={20}
              spacing={24}
              hideRules
              yAxisColor={theme.colors.border}
              xAxisColor={theme.colors.border}
              xAxisLabelTextStyle={styles.axisLabel}
              yAxisTextStyle={styles.axisLabel}
              showYAxisIndices={false}
              width={chartWidth}
            />
          </View>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.legendDotPrimary]} />
              <Text style={[styles.legendLabel, { color: theme.colors.muted }]}>
                New
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.legendDotSecondary]} />
              <Text style={[styles.legendLabel, { color: theme.colors.muted }]}>
                Repeat
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Experience Index Radar
          </Text>
          <Text style={[styles.cardSubtitle, { color: theme.colors.muted }]}>
            Composite scoring across key NPS drivers
          </Text>
          <View style={styles.radarWrapper}>
            <RadarChart
              data={radarConfig.data}
              labels={radarConfig.labels}
              maxValue={100}
              chartSize={Math.min(220, chartWidth)}
              polygonConfig={radarConfig.polygon}
              gridConfig={{ stroke: theme.colors.border, opacity: 0.35 }}
              labelConfig={{ stroke: theme.colors.muted, fontSize: 12 }}
              labelsPositionOffset={8}
              dataLabelsPositionOffset={4}
            />
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Customer Distribution Pyramid
          </Text>
          <Text style={[styles.cardSubtitle, { color: theme.colors.muted }]}>
            Volume share by age bracket
          </Text>
          <View style={styles.pyramidWrapper}>
            <PopulationPyramid
              data={pyramidData}
              height={260}
              yAxisLabelWidth={70}
              barBorderRadius={8}
              leftBarColor="#2563EB"
              rightBarColor="#F97316"
              xAxisLabelSuffix="%"
              xAxisNoOfSections={4}
              showXAxisLabelTexts
              showYAxisIndices={false}
              showVerticalLines={false}
              showMidAxis
              midAxisColor={theme.colors.border}
              yAxisLabelColor={theme.colors.muted}
              xAxisColor={theme.colors.border}
              hideRules
              width={chartWidth}
            />
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  screenSubtitle: {
    fontSize: 14,
  },
  kpiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  kpiCardGradient: {
    borderRadius: 16,
    padding: 1,
    flexGrow: 1,
  },
  kpiCardTablet: {
    flexBasis: '32%',
  },
  kpiCardFull: {
    flexBasis: '100%',
  },
  kpiCard: {
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    gap: 4,
  },
  kpiTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  kpiDelta: {
    fontSize: 13,
    fontWeight: '600',
  },
  heroGradient: {
    borderRadius: 20,
    padding: 1,
  },
  heroCard: {
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    gap: 12,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  heroCaption: {
    fontSize: 13,
  },
  chartContainer: {
    marginTop: 8,
  },
  axisLabel: {
    fontSize: 11,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridColumn: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    gap: 12,
  },
  cardHalfTablet: {
    flexBasis: '48%',
    flexGrow: 1,
  },
  cardHalfFull: {
    flexBasis: '100%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 13,
  },
  pieChartWrapper: {
    alignItems: 'center',
    marginTop: 12,
  },
  radarWrapper: {
    alignItems: 'center',
    marginTop: 16,
  },
  centerLabelWrapper: {
    alignItems: 'center',
  },
  centerLabelTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  centerLabelSubtitle: {
    fontSize: 12,
  },
  progressList: {
    gap: 14,
  },
  progressRow: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  progressValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendDotPrimary: {
    backgroundColor: '#2563EB',
  },
  legendDotSecondary: {
    backgroundColor: '#22C55E',
  },
  legendLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  pyramidWrapper: {
    marginTop: 10,
  },
});

export default AnalyticsScreen;
