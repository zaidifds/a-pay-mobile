import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatListProps,
  ListRenderItem,
  ViewStyle,
  useWindowDimensions,
  FlatList,
  Platform,
} from 'react-native';
import Animated, {
  AnimatedSensor,
  Extrapolation,
  SensorType,
  SharedValue,
  ValueRotation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedSensor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { rp } from '@/utils/responsive';
import SvgIcon from '@/assets/svg/SvgIcon';

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<any>>(FlatList);

export type CardData = {
  id: string;
  balance: string;
  cardNumber: string;
  holderName: string;
  expiryDate: string;
};

export type CarouselVariation =
  | 'subtle' // Very mild effects
  | 'moderate' // Balanced effects
  | 'intense' // Strong 3D effects
  | 'classic' // Basic rotation and scale
  | 'minimal' // Almost static with slight scale
  | 'dynamic' // Fast response
  | 'smooth' // Slow, fluid animations
  | 'futuristic' // Extreme 3D effects
  | 'professional' // Subtle with good depth
  | 'luxury'; // Elegant, refined effects

interface CardCarouselProps {
  cards: CardData[];
  onCardChange?: (index: number) => void;
  variation?: CarouselVariation;
}

type AnimatedWrapperProps = {
  scrollX: SharedValue<number>;
  sensor: AnimatedSensor<ValueRotation>;
  index: number;
  style?: ViewStyle;
  children: React.ReactNode;
  variation: CarouselVariation;
};

type VariationConfig = {
  rotateYRange: [number, number];
  rotateXRange: [number, number];
  translateFactor: number;
  rotateZValues: [number, number, number];
  scaleValues: [number, number, number];
  damping: number;
};

function clamp(value: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

const getVariationConfig = (variation: CarouselVariation): VariationConfig => {
  switch (variation) {
    case 'subtle':
      return {
        rotateYRange: [-Math.PI / 12, Math.PI / 12],
        rotateXRange: [-Math.PI / 6, Math.PI / 3],
        translateFactor: 10,
        rotateZValues: [3, 0, -3],
        scaleValues: [0.96, 1, 0.96],
        damping: 400,
      };
    case 'moderate':
      return {
        rotateYRange: [-Math.PI / 8, Math.PI / 8],
        rotateXRange: [-Math.PI / 4, Math.PI / 2],
        translateFactor: 20,
        rotateZValues: [8, 0, -8],
        scaleValues: [0.92, 1, 0.92],
        damping: 300,
      };
    case 'intense':
      return {
        rotateYRange: [-Math.PI / 6, Math.PI / 6],
        rotateXRange: [-Math.PI / 3, Math.PI / 2],
        translateFactor: 40,
        rotateZValues: [15, 0, -15],
        scaleValues: [0.85, 1, 0.85],
        damping: 200,
      };
    case 'classic':
      return {
        rotateYRange: [-Math.PI / 10, Math.PI / 10],
        rotateXRange: [-Math.PI / 6, Math.PI / 3],
        translateFactor: 0,
        rotateZValues: [12, 0, -12],
        scaleValues: [0.88, 1, 0.88],
        damping: 350,
      };
    case 'minimal':
      return {
        rotateYRange: [-Math.PI / 16, Math.PI / 16],
        rotateXRange: [-Math.PI / 8, Math.PI / 4],
        translateFactor: 5,
        rotateZValues: [2, 0, -2],
        scaleValues: [0.98, 1, 0.98],
        damping: 500,
      };
    case 'dynamic':
      return {
        rotateYRange: [-Math.PI / 7, Math.PI / 7],
        rotateXRange: [-Math.PI / 3, Math.PI / 2],
        translateFactor: 25,
        rotateZValues: [10, 0, -10],
        scaleValues: [0.9, 1, 0.9],
        damping: 150,
      };
    case 'smooth':
      return {
        rotateYRange: [-Math.PI / 10, Math.PI / 10],
        rotateXRange: [-Math.PI / 5, Math.PI / 3],
        translateFactor: 15,
        rotateZValues: [5, 0, -5],
        scaleValues: [0.94, 1, 0.94],
        damping: 450,
      };
    case 'futuristic':
      return {
        rotateYRange: [-Math.PI / 4, Math.PI / 4],
        rotateXRange: [-Math.PI / 2, Math.PI],
        translateFactor: 60,
        rotateZValues: [20, 0, -20],
        scaleValues: [0.8, 1, 0.8],
        damping: 180,
      };
    case 'professional':
      return {
        rotateYRange: [-Math.PI / 9, Math.PI / 9],
        rotateXRange: [-Math.PI / 5, Math.PI / 2],
        translateFactor: 18,
        rotateZValues: [6, 0, -6],
        scaleValues: [0.93, 1, 0.93],
        damping: 320,
      };
    case 'luxury':
      return {
        rotateYRange: [-Math.PI / 11, Math.PI / 11],
        rotateXRange: [-Math.PI / 6, Math.PI / 2],
        translateFactor: 16,
        rotateZValues: [5, 0, -5],
        scaleValues: [0.94, 1, 0.94],
        damping: 400,
      };
    default:
      return getVariationConfig('moderate');
  }
};

function AnimatedWrapper({
  scrollX,
  index,
  style,
  sensor,
  children,
  variation,
}: AnimatedWrapperProps) {
  const config = getVariationConfig(variation);

  // const rotateY = useDerivedValue(() => {
  //   const { roll } = sensor.sensor.value;
  //   const angle = clamp(roll, config.rotateYRange[0], config.rotateYRange[1]);
  //   return withSpring(-angle, { damping: config.damping });
  // });

  // const rotateX = useDerivedValue(() => {
  //   const { pitch } = sensor.sensor.value;
  //   const angle =
  //     clamp(pitch, config.rotateXRange[0], config.rotateXRange[1]) -
  //     40 * (Math.PI / 180);
  //   return withSpring(-angle, { damping: config.damping });
  // });

  const rotateY = useDerivedValue(() => {
    // let { roll } = sensor.sensor.value;
    const hasSensorData = !!sensor.sensor.value;
    if (!hasSensorData) {
      console.warn('Rotation sensor not available on this device');
    }

    const rotation = sensor.sensor.value;
    if (!rotation) return withSpring(0, { damping: config.damping });
    let { roll } = rotation;

    if (Platform.OS === 'android') roll = -roll; // fix inverted axis
    const angle = clamp(roll, config.rotateYRange[0], config.rotateYRange[1]);
    return withSpring(-angle, { damping: config.damping });
  });

  const rotateX = useDerivedValue(() => {
    let { pitch } = sensor.sensor.value;
    if (Platform.OS === 'android') pitch = -pitch; // fix inversion
    const angle =
      clamp(pitch, config.rotateXRange[0], config.rotateXRange[1]) -
      40 * (Math.PI / 180);
    return withSpring(-angle, { damping: config.damping });
  });

  const translateX = useDerivedValue(() => {
    return withSpring(-rotateY.value * config.translateFactor, {
      damping: config.damping,
    });
  });

  const translateY = useDerivedValue(() => {
    return withSpring(rotateX.value * config.translateFactor, {
      damping: config.damping,
    });
  });

  const stylez = useAnimatedStyle(() => {
    return {
      overflow: 'hidden',
      zIndex: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 10000, 0],
      ),
      transform: [
        {
          perspective: 1000,
        },
        {
          rotateY: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [0, rotateY.value, 0],
            Extrapolation.CLAMP,
          )}rad`,
        },
        {
          rotateX: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [0, rotateX.value, 0],
            Extrapolation.CLAMP,
          )}rad`,
        },
        {
          translateY: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [0, translateY.value, 0],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateX: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [0, translateX.value, 0],
            Extrapolation.CLAMP,
          ),
        },
        {
          rotateZ: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            config.rotateZValues,
            Extrapolation.CLAMP,
          )}deg`,
        },
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            config.scaleValues,
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return <Animated.View style={[style, stylez]}>{children}</Animated.View>;
}

const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  onCardChange: _onCardChange,
  variation = 'moderate',
}) => {
  const { width } = useWindowDimensions();
  const itemSize = width * 0.75;

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x / itemSize;
  });

  const sensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 20,
  });

  const renderItem: ListRenderItem<CardData> = ({ item: _item }) => {
    return (
      <View style={styles().cardContainer}>
        <SvgIcon.CreditCard height={rp(220)} width={itemSize} />
      </View>
    );
  };

  const CellRendererComponent = useCallback(
    ({ children, index, style, ...props }: any) => {
      return (
        <AnimatedWrapper
          style={
            style
              ? [style, { width: itemSize, height: itemSize * 1.05 }]
              : { width: itemSize, height: itemSize * 1.05 }
          }
          {...props}
          scrollX={scrollX}
          sensor={sensor}
          index={index}
          variation={variation}
        >
          {children}
        </AnimatedWrapper>
      );
    },
    [itemSize, scrollX, sensor, variation],
  );

  return (
    <AnimatedFlatList
      horizontal
      data={cards}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onScroll={onScroll}
      scrollEventThrottle={1000 / 60}
      CellRendererComponent={CellRendererComponent}
      contentContainerStyle={{
        paddingHorizontal: (width - itemSize) / 2,
      }}
      snapToInterval={itemSize}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
    />
  );
};

const styles = () =>
  StyleSheet.create({
    cardContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default CardCarousel;
