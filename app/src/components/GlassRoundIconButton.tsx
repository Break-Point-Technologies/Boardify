import React from 'react';
import { Pressable, View, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GlassView, isLiquidGlassAvailable, isGlassEffectAPIAvailable } from 'expo-glass-effect';

const ICON_COLOR = '#0a0a0a';

export type GlassRoundIconButtonProps = {
  icon: keyof typeof Feather.glyphMap;
  size?: number;
  onPress: () => void;
  accessibilityLabel: string;
  hitSlop?: number;
  disabled?: boolean;
  embedInSwiftMenu?: boolean;
  iconOpticalNudge?: { x?: number; y?: number };
};

export function GlassRoundIconButton({
  icon,
  size = 22,
  onPress,
  accessibilityLabel,
  hitSlop = 12,
  disabled,
  embedInSwiftMenu,
  iconOpticalNudge,
}: GlassRoundIconButtonProps) {
  const isGlass =
    isLiquidGlassAvailable() &&
    isGlassEffectAPIAvailable() &&
    !(embedInSwiftMenu && Platform.OS === 'ios');
  const feather = <Feather name={icon} size={size} color={ICON_COLOR} />;
  const hasNudge =
    iconOpticalNudge != null &&
    (iconOpticalNudge.x != null || iconOpticalNudge.y != null);
  const glyph =
    embedInSwiftMenu && Platform.OS === 'ios' ? (
      <View style={styles.menuLabelGlyphNudge} collapsable={false}>
        {feather}
      </View>
    ) : hasNudge ? (
      <View
        style={[
          styles.iconOpticalWrap,
          {
            transform: [
              { translateX: iconOpticalNudge?.x ?? 0 },
              { translateY: iconOpticalNudge?.y ?? 0 },
            ],
          },
        ]}
        collapsable={false}
      >
        {feather}
      </View>
    ) : (
      feather
    );

  const face = isGlass ? (
    <GlassView
      isInteractive
      colorScheme="light"
      tintColor="rgba(255, 255, 255, 0.42)"
      style={styles.circle}
    >
      {glyph}
    </GlassView>
  ) : (
    <View
      style={[
        styles.circle,
        embedInSwiftMenu && Platform.OS === 'ios' ? styles.swiftMenuLabel : styles.fallback,
      ]}
    >
      {glyph}
    </View>
  );

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      hitSlop={hitSlop}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      style={styles.pressable}
    >
      {face}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    opacity: 1,
    overflow: 'visible',
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    zIndex: 2,
  },
  fallback: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  swiftMenuLabel: {
    backgroundColor: 'transparent',
  },
  menuLabelGlyphNudge: {
    transform: [{ translateX: -11 }, { translateY: -6 }],
  },
  iconOpticalWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
