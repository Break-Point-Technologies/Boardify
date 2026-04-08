import type { ViewStyle } from 'react-native';

/**
 * Shared dashed “drop here” chrome for card gaps, list reorder slots, and related previews.
 * Keep in sync with task placeholders so list and task drop targets feel identical.
 */
export const boardDropZoneChrome: Pick<
  ViewStyle,
  'borderWidth' | 'borderStyle' | 'borderColor' | 'backgroundColor'
> = {
  borderWidth: 2,
  borderStyle: 'dashed',
  borderColor: 'rgba(10,10,10,0.25)',
  backgroundColor: 'rgba(255,255,255,0.35)',
};

/** Matches card row placeholders inside a column. */
export const BOARD_DROP_ZONE_CARD_RADIUS = 8;

/** Outer column shape; same chrome as cards, slightly larger corner radius. */
export const BOARD_DROP_ZONE_COLUMN_RADIUS = 12;
