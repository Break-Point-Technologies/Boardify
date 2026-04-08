import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  boardDropZoneChrome,
  BOARD_DROP_ZONE_CARD_RADIUS,
} from '../board/boardDropZoneStyles';
import { BOARD_CARD_ROW_HEIGHT } from '../board/boardDragUtils';

export function BoardCardPlaceholder({ height = BOARD_CARD_ROW_HEIGHT }: { height?: number }) {
  return (
    <View style={[styles.wrap, { minHeight: height }]}>
      <View style={styles.inner} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 4,
    marginRight: 4,
    borderRadius: BOARD_DROP_ZONE_CARD_RADIUS,
    ...boardDropZoneChrome,
  },
  inner: {
    minHeight: 56,
  },
});
