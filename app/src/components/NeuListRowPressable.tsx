import React, { forwardRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { View as RNView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const SHIFT = 5;
const PRESS_DURATION = 60;
const RELEASE_DURATION = 100;

export const NEU_LIST_ROW_SHIFT = SHIFT;

type Props = {
  shadowStyle: object;
  topStyle: object;
  onPress: () => void;
  children: React.ReactNode;
};

/**
 * Neubrutalist list row with press-in shift — same interaction as home board tiles.
 */
export const NeuListRowPressable = forwardRef<RNView, Props>(function NeuListRowPressable(
  { shadowStyle, topStyle, onPress, children },
  ref
) {
  const offset = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value },
      { translateY: offset.value },
    ],
  }));

  return (
    <Pressable onPress={onPress} style={styles.wrap} onPressIn={() => {
      offset.value = withTiming(SHIFT, { duration: PRESS_DURATION });
    }} onPressOut={() => {
      offset.value = withTiming(0, { duration: RELEASE_DURATION });
    }}>
      <View style={[styles.shadow, shadowStyle]} />
      <Animated.View ref={ref} collapsable={false} style={[topStyle, animatedStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
});

export const neuListRowShadowBase = {
  position: 'absolute' as const,
  left: SHIFT,
  top: SHIFT,
  right: -SHIFT,
  bottom: -SHIFT,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: '#000' as const,
};

export const neuListRowCardBase = {
  position: 'relative' as const,
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  backgroundColor: '#fff',
  borderRadius: 14,
  borderWidth: 1,
  borderColor: '#000' as const,
  paddingVertical: 16,
  paddingHorizontal: 16,
  paddingLeft: 14,
};

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    marginRight: SHIFT,
    marginBottom: SHIFT,
  },
  shadow: neuListRowShadowBase,
});
