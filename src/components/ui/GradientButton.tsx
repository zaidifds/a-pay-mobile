import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface GradientButtonProps {
  colors: string[];
  style?: ViewStyle;
  children: React.ReactNode;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  colors,
  style,
  children,
}) => {
  // Create a more sophisticated gradient effect using multiple overlapping views
  const createGradientLayers = () => {
    const layers = [];
    const numLayers = 8; // More layers for smoother gradient

    for (let i = 0; i < numLayers; i++) {
      const progress = i / (numLayers - 1);
      const colorIndex = Math.floor(progress * (colors.length - 1));
      const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);

      // Interpolate between colors
      const currentColor = colors[colorIndex];
      const nextColor = colors[nextColorIndex];

      // Simple color interpolation (this is a basic implementation)
      const interpolatedColor = progress < 0.5 ? currentColor : nextColor;

      layers.push(
        <View
          key={i}
          style={[
            styles.gradientLayer,
            {
              backgroundColor: interpolatedColor,
              opacity: 0.9 - i * 0.1, // Create depth effect
              transform: [
                { scaleX: 1 + i * 0.02 }, // Slight scaling for depth
                { scaleY: 1 + i * 0.02 },
              ],
            },
          ]}
        />,
      );
    }

    return layers;
  };

  return (
    <View style={[styles.container, style]}>
      {createGradientLayers()}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 15, // Match the button border radius
  },
  gradientLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15,
  },
  content: {
    position: 'relative',
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 6,
  },
});

export default GradientButton;
