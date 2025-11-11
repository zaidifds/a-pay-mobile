import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  SharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING = width * 0.05;

interface CardItem {
  id: string;
  name: string;
  number: string;
  expiry: string;
  balance: string;
  bgColor: string[];
}

const cards: CardItem[] = [
  {
    id: '1',
    name: 'Cara Dune',
    number: '4265 8516 0480 2050',
    expiry: '03/25',
    balance: '£95,687.36',
    bgColor: ['#0052D4', '#4364F7', '#6FB1FC'],
  },
  {
    id: '2',
    name: 'Cara Dune',
    number: '5023 0412 3356 1010',
    expiry: '03/25',
    balance: '£80,120.75',
    bgColor: ['#1e3c72', '#2a5298'],
  },
  {
    id: '3',
    name: 'Cara Dune',
    number: '6012 8523 7412 1212',
    expiry: '03/25',
    balance: '£70,555.90',
    bgColor: ['#0F2027', '#203A43', '#2C5364'],
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<CardItem>);

interface AnimatedCardItemProps {
  item: CardItem;
  index: number;
  scrollX: SharedValue<number>;
  onPressCard: () => void;
}

function AnimatedCardItem({
  item,
  index,
  scrollX,
  onPressCard,
}: AnimatedCardItemProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [
        (index - 1) * (CARD_WIDTH + SPACING),
        index * (CARD_WIDTH + SPACING),
        (index + 1) * (CARD_WIDTH + SPACING),
      ],
      [0.9, 1, 0.9],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      [
        (index - 1) * (CARD_WIDTH + SPACING),
        index * (CARD_WIDTH + SPACING),
        (index + 1) * (CARD_WIDTH + SPACING),
      ],
      [0.7, 1, 0.7],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <TouchableOpacity
      style={{ width: CARD_WIDTH + SPACING }}
      activeOpacity={0.9}
      onPress={onPressCard}
    >
      <Animated.View
        style={[
          styles.card,
          animatedStyle,
          { backgroundColor: item.bgColor[1] },
        ]}
      >
        <Text style={styles.balanceLabel}>Balance:</Text>
        <Text style={styles.balance}>{item.balance}</Text>
        <View style={styles.chip} />
        <Text style={styles.cardNumber}>{item.number}</Text>
        <View style={styles.footer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.expiry}>{item.expiry}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function AnimatedCardCarousel({
  onPressCard,
}: {
  onPressCard: () => void;
}) {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const renderItem = ({ item, index }: { item: CardItem; index: number }) => {
    return (
      <AnimatedCardItem
        item={item}
        index={index}
        scrollX={scrollX}
        onPressCard={onPressCard}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={cards}
        horizontal
        bounces={false}
        keyExtractor={(item: any) => item?.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SPACING,
        }}
        renderItem={renderItem}
        scrollEventThrottle={1} // 👈 Android fix: use 1 for smoother event rate
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate={Platform.OS === 'ios' ? 'fast' : 0.98} // 👈 Android momentum fix
        onScroll={onScroll}
        overScrollMode="never" // 👈 prevents Android edge glow
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  card: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 8, // 👈 Android shadow fix
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  balance: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  chip: {
    width: 40,
    height: 30,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  cardNumber: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: '#fff',
    fontWeight: '600',
  },
  expiry: {
    color: '#fff',
    fontWeight: '600',
  },
});
