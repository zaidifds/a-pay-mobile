import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fp, rp } from '@/utils/responsive';

interface PromotionalSliderProps {
  data?: PromoItem[];
}

interface PromoItem {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  offer: string;
  image?: any;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PromotionalSlider: React.FC<PromotionalSliderProps> = ({ data }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const defaultData: PromoItem[] = [
    {
      id: '1',
      title: 'ethereum',
      subtitle: 'ETH',
      cta: 'Buy Now',
      offer: 'Get £10 Cashback',
      image: require('@/assets/images/etherium.png'),
    },
    {
      id: '2',
      title: 'bitcoin',
      subtitle: 'BTC',
      cta: 'Buy Now',
      offer: 'Get £20 Cashback',
      image: require('@/assets/images/etherium.png'),
    },
    {
      id: '3',
      title: 'solana',
      subtitle: 'SOL',
      cta: 'Buy Now',
      offer: 'Get £15 Cashback',
      image: require('@/assets/images/etherium.png'),
    },
  ];

  const sliderData = data || defaultData;

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (index + 1) % sliderData.length;
      scrollRef.current?.scrollTo({ x: next * SCREEN_WIDTH, animated: true });
      setIndex(next);
    }, 4000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const handleScroll = (e: any) => {
    const offset = e.nativeEvent.contentOffset.x;
    setIndex(Math.round(offset / SCREEN_WIDTH));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {sliderData.map((item, i) => (
          <View key={i} style={styles.slideWrapper}>
            <LinearGradient
              colors={['#0055FF', '#0033AA']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.slide}
            >
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <Text style={styles.cta}>{item.cta}</Text>
                <Text style={styles.offer}>{item.offer}</Text>
              </View>

              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={styles.coinImage}
                />
              </View>

              {/* Pagination Dots INSIDE the banner */}
              <View style={styles.dotsContainer}>
                {sliderData.map((_, dotIndex) => (
                  <View
                    key={dotIndex}
                    style={[styles.dot, dotIndex === index && styles.activeDot]}
                  />
                ))}
              </View>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rp(16),
  },
  slideWrapper: {
    width: SCREEN_WIDTH,
  },
  slide: {
    width: '100%',
    height: rp(130),
    borderRadius: rp(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rp(5),
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    marginLeft: rp(15),
  },
  title: {
    fontSize: fp(22),
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'lowercase',
  },
  subtitle: {
    fontSize: fp(14),
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: rp(6),
  },
  cta: {
    fontSize: fp(12),
    color: '#FFFFFF',
    fontWeight: '700',
  },
  offer: {
    fontSize: fp(11),
    color: '#FFFFFF',
    opacity: 0.9,
  },
  imageContainer: {
    width: rp(80),
    height: rp(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rp(10),
  },
  coinImage: {
    width: rp(80),
    height: rp(80),
  },
  dotsContainer: {
    position: 'absolute',
    bottom: rp(10),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: rp(6),
    height: rp(6),
    borderRadius: rp(3),
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: rp(3),
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: rp(16),
  },
});

export default PromotionalSlider;
