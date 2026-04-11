import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme';
import type { ThemeColors } from '../theme/colors';

export function TableRowPlaceholder({ tableWidth }: { tableWidth: number }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={[styles.row, { width: tableWidth }]}>
      <View style={styles.inner} />
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    row: {
      alignSelf: 'stretch',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.divider,
      backgroundColor: colors.tableRowAlt,
    },
    inner: {
      marginVertical: 4,
      marginHorizontal: 8,
      minHeight: 52,
      borderRadius: 8,
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: colors.dropZoneBorder,
      backgroundColor: colors.dropZoneBg,
    },
  });
}
