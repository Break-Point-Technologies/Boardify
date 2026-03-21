import React, { useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  useWindowDimensions,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { hapticLight } from '../utils/haptics';
import type { BoardCardData } from '../types/board';
import { TaskDetailContent } from './task/TaskDetailContent';

const CARD_SHIFT = 4;
const LIST_CARD_PAD_V = 10;

const openConfig = {
  duration: 380,
  easing: Easing.out(Easing.cubic),
};

const closeConfig = {
  duration: 420,
  easing: Easing.out(Easing.cubic),
};

export type CardLayout = { x: number; y: number; width: number; height: number };

/** Indices + layout for expand animation; live card data comes from `card` prop. */
export type ExpandedCardLayout = {
  layout: CardLayout;
  columnIndex: number;
  cardIndex: number;
  columnTitle: string;
};

type Props = {
  layoutInfo: ExpandedCardLayout;
  card: BoardCardData;
  onUpdateCard: (next: BoardCardData) => void;
  onClose: () => void;
};

export function BoardCardExpandOverlay({
  layoutInfo,
  card,
  onUpdateCard,
  onClose,
}: Props) {
  const { width: screenW, height: screenH } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const progress = useSharedValue(0);
  const ox = useSharedValue(0);
  const oy = useSharedValue(0);
  const ow = useSharedValue(0);
  const oh = useSharedValue(0);
  const tw = useSharedValue(0);
  const th = useSharedValue(0);

  useEffect(() => {
    ox.value = layoutInfo.layout.x;
    oy.value = layoutInfo.layout.y;
    ow.value = layoutInfo.layout.width;
    oh.value = layoutInfo.layout.height;
    tw.value = screenW;
    th.value = screenH;
    progress.value = 0;
    progress.value = withTiming(1, openConfig);
  }, [
    layoutInfo.layout.x,
    layoutInfo.layout.y,
    layoutInfo.layout.width,
    layoutInfo.layout.height,
    layoutInfo.columnIndex,
    layoutInfo.cardIndex,
    card.id,
    screenW,
    screenH,
    ox,
    oy,
    ow,
    oh,
    tw,
    th,
    progress,
  ]);

  const shellOuterStyle = useAnimatedStyle(() => {
    const t = progress.value;
    const left = interpolate(t, [0, 1], [ox.value, 0], Extrapolation.CLAMP);
    const top = interpolate(t, [0, 1], [oy.value, 0], Extrapolation.CLAMP);
    const width = interpolate(t, [0, 1], [ow.value, tw.value], Extrapolation.CLAMP);
    const height = interpolate(t, [0, 1], [oh.value, th.value], Extrapolation.CLAMP);
    const borderRadius = interpolate(t, [0, 1], [8, 0], Extrapolation.CLAMP);
    const neubAmount = interpolate(t, [0, 0.28, 0.62, 1], [1, 1, 0, 0], Extrapolation.CLAMP);
    const softAmt = 1 - neubAmount;
    const shadowOpacity =
      (Platform.OS === 'ios' ? 1 : 0) *
      softAmt *
      interpolate(t, [0, 0.75, 1], [0.05, 0.06, 0], Extrapolation.CLAMP);
    const elevation =
      (Platform.OS === 'android' ? 1 : 0) *
      softAmt *
      interpolate(t, [0, 0.75, 1], [10, 6, 0], Extrapolation.CLAMP);
    return {
      position: 'absolute',
      left,
      top,
      width,
      height,
      borderRadius,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity,
      shadowRadius: 16,
      elevation,
    };
  });

  const shellInnerClipStyle = useAnimatedStyle(() => {
    const t = progress.value;
    const borderRadius = interpolate(t, [0, 1], [8, 0], Extrapolation.CLAMP);
    return {
      flex: 1,
      borderRadius,
      overflow: 'hidden',
    };
  });

  const shellNeubShadowStyle = useAnimatedStyle(() => {
    const t = progress.value;
    const borderRadius = interpolate(t, [0, 1], [8, 0], Extrapolation.CLAMP);
    return {
      position: 'absolute',
      left: CARD_SHIFT,
      top: CARD_SHIFT,
      right: -CARD_SHIFT,
      bottom: -CARD_SHIFT,
      borderRadius,
      backgroundColor: '#000',
      borderWidth: 1,
      borderColor: '#000',
      opacity: interpolate(t, [0, 0.22, 0.55, 1], [1, 1, 0, 0], Extrapolation.CLAMP),
    };
  });

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0, 0.2, 0.55, 1],
      [0, 0.34, 0.44, 0.5],
      Extrapolation.CLAMP
    ),
  }));

  const headerPaddingStyle = useAnimatedStyle(() => {
    const t = progress.value;
    const topPad = Math.max(insets.top, 12);
    return {
      paddingTop: interpolate(t, [0, 1], [0, topPad], Extrapolation.CLAMP),
      paddingBottom: interpolate(t, [0, 0.18, 0.32, 1], [0, 0, 0, 10], Extrapolation.CLAMP),
      paddingHorizontal: interpolate(t, [0, 0.18, 0.32, 1], [0, 0, 0, 16], Extrapolation.CLAMP),
      maxHeight: interpolate(t, [0, 0.12, 0.28, 1], [0, 0, 88, 2000], Extrapolation.CLAMP),
      overflow: 'hidden',
      opacity: interpolate(t, [0, 0.12, 0.26, 1], [0, 0, 1, 1], Extrapolation.CLAMP),
      transform: [
        {
          translateY: interpolate(t, [0, 1], [6, 0], Extrapolation.CLAMP),
        },
      ],
      borderBottomWidth: interpolate(t, [0, 0.2, 0.34, 1], [0, 0, 1, 1], Extrapolation.CLAMP),
    };
  });

  const detailBodyStyle = useAnimatedStyle(() => {
    const t = progress.value;
    const bottomPad = Math.max(insets.bottom, 24);
    return {
      paddingHorizontal: interpolate(t, [0, 1], [12, 20], Extrapolation.CLAMP),
      paddingTop: interpolate(t, [0, 1], [10, 16], Extrapolation.CLAMP),
      paddingBottom: interpolate(t, [0, 1], [LIST_CARD_PAD_V, bottomPad], Extrapolation.CLAMP),
    };
  });

  const detailPlaceholderWrapStyle = useAnimatedStyle(() => {
    const t = progress.value;
    return {
      opacity: interpolate(t, [0, 0.52, 0.68, 1], [0, 0, 1, 1], Extrapolation.CLAMP),
      flex: 1,
      minHeight: interpolate(t, [0, 0.48, 0.62, 1], [0, 0, 200, 400], Extrapolation.CLAMP),
      marginTop: interpolate(t, [0, 0.55, 0.75, 1], [0, 0, 8, 12], Extrapolation.CLAMP),
      overflow: 'hidden',
      transform: [
        {
          translateY: interpolate(t, [0, 0.55, 1], [6, 2, 0], Extrapolation.CLAMP),
        },
      ],
    };
  });

  const cardOutlineStyle = useAnimatedStyle(() => ({
    borderWidth: interpolate(progress.value, [0, 0.45, 1], [1, 0, 0], Extrapolation.CLAMP),
    borderColor: '#000',
  }));

  const handleClose = () => {
    hapticLight();
    progress.value = withTiming(0, closeConfig, (finished) => {
      if (finished) {
        runOnJS(onClose)();
      }
    });
  };

  return (
    <Modal visible transparent animationType="none" statusBarTranslucent>
      <View style={styles.modalRoot} pointerEvents="box-none">
        <Animated.View style={[styles.backdrop, backdropStyle]} pointerEvents="auto">
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
        </Animated.View>

        <Animated.View style={shellOuterStyle} pointerEvents="box-none">
          <Animated.View style={shellNeubShadowStyle} pointerEvents="none" />
          <Animated.View style={shellInnerClipStyle}>
            <Animated.View
              style={[
                styles.cardFace,
                cardOutlineStyle,
                card.labelColor
                  ? { borderLeftWidth: 4, borderLeftColor: card.labelColor }
                  : undefined,
              ]}
            >
              <Animated.View style={[styles.cardFaceHeader, headerPaddingStyle]}>
                <Text style={styles.columnBadge} numberOfLines={1}>
                  {layoutInfo.columnTitle}
                </Text>
                <Pressable
                  onPress={handleClose}
                  hitSlop={12}
                  style={styles.closeBtn}
                  accessibilityLabel="Close"
                >
                  <Feather name="x" size={22} color="#0a0a0a" />
                </Pressable>
              </Animated.View>
              <Animated.View style={[styles.detailBody, detailBodyStyle]}>
                <Animated.View style={[styles.detailScrollWrap, detailPlaceholderWrapStyle]}>
                  <TaskDetailContent task={card} onChange={onUpdateCard} />
                </Animated.View>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0a0a0a',
  },
  cardFace: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardFaceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  columnBadge: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginRight: 8,
  },
  closeBtn: {
    padding: 4,
  },
  detailBody: {
    flex: 1,
    minHeight: 0,
  },
  detailScrollWrap: {
    flex: 1,
    minHeight: 0,
  },
});
