import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  boardDropZoneChrome,
  BOARD_DROP_ZONE_COLUMN_RADIUS,
} from '../board/boardDropZoneStyles';

const PLACEHOLDER_MIN_HEIGHT = 200;

export function BoardColumnPlaceholder() {
  return (
    <View style={styles.wrap}>
      <View style={styles.inner} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 280,
    marginRight: 16,
    flexShrink: 0,
    minHeight: PLACEHOLDER_MIN_HEIGHT,
    borderRadius: BOARD_DROP_ZONE_COLUMN_RADIUS,
    ...boardDropZoneChrome,
  },
  inner: {
    flex: 1,
    minHeight: PLACEHOLDER_MIN_HEIGHT - 8,
  },
});
