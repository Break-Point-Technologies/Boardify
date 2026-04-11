import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hapticLight } from '../utils/haptics';
import { hasValidTaskIso } from '../utils/taskDateTime';
import {
  addMonths,
  dateToLocalKey,
  dueDateLocalKey,
  getCalendarMonthGrid,
  isSameLocalDay,
  monthTitle,
} from '../utils/calendarGrid';
import type { BoardCardData, BoardColumnData } from '../types/board';
import { useTheme } from '../theme';
import type { ThemeColors } from '../theme/colors';

export type CalendarTaskOpenLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const CAL_SHIFT = 5;
const EDGE_PAD_H = Platform.select({ web: 24, default: 16 }) ?? 16;

type DueTaskRef = {
  card: BoardCardData;
  columnTitle: string;
  columnIndex: number;
  cardIndex: number;
};

type Props = {
  columns: BoardColumnData[];
  bottomClearance: number;
  onOpenTask: (cardId: string, layout?: CalendarTaskOpenLayout) => void;
};

function weekdayShortLabels(): string[] {
  const d = new Date(2024, 0, 7);
  const labels: string[] = [];
  for (let i = 0; i < 7; i++) {
    labels.push(d.toLocaleDateString(undefined, { weekday: 'short' }));
    d.setDate(d.getDate() + 1);
  }
  return labels;
}

const WEEKDAY_LABELS = weekdayShortLabels();

export function BoardCalendarView({ columns, bottomClearance, onOpenTask }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createBoardCalendarStyles(colors), [colors]);
  const insets = useSafeAreaInsets();
  const { width: windowW } = useWindowDimensions();
  const taskRowHostRefs = useRef<Record<string, View | null>>({});

  const openAgendaTask = useCallback(
    (card: BoardCardData) => {
      hapticLight();
      const el = taskRowHostRefs.current[card.id];
      if (el && 'measureInWindow' in el) {
        requestAnimationFrame(() => {
          (el as View).measureInWindow((x, y, width, height) => {
            onOpenTask(card.id, {
              x: Math.round(x),
              y: Math.round(y),
              width: Math.max(1, Math.round(width)),
              height: Math.max(1, Math.round(height)),
            });
          });
        });
      } else {
        onOpenTask(card.id);
      }
    },
    [onOpenTask]
  );
  const innerMaxW = Math.min(windowW - (EDGE_PAD_H + insets.left + insets.right + CAL_SHIFT), 560);

  const now = new Date();
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(now.getFullYear(), now.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(
    () => new Date(now.getFullYear(), now.getMonth(), now.getDate())
  );

  useEffect(() => {
    const y = visibleMonth.getFullYear();
    const m = visibleMonth.getMonth();
    setSelectedDate((prev) => {
      if (prev.getFullYear() === y && prev.getMonth() === m) return prev;
      return new Date(y, m, 1);
    });
  }, [visibleMonth]);

  const dueTasksByDay = useMemo(() => {
    const m = new Map<string, DueTaskRef[]>();
    columns.forEach((col, columnIndex) => {
      col.cards.forEach((card, cardIndex) => {
        if (!hasValidTaskIso(card.dueDate)) return;
        const key = dueDateLocalKey(card.dueDate as string);
        if (!key) return;
        const list = m.get(key) ?? [];
        list.push({ card, columnTitle: col.title, columnIndex, cardIndex });
        m.set(key, list);
      });
    });
    m.forEach((arr) =>
      arr.sort(
        (a, b) =>
          new Date(a.card.dueDate as string).getTime() -
          new Date(b.card.dueDate as string).getTime()
      )
    );
    return m;
  }, [columns]);

  const hasAnyDueTasks = dueTasksByDay.size > 0;
  const grid = useMemo(() => getCalendarMonthGrid(visibleMonth), [visibleMonth]);
  const selectedKey = dateToLocalKey(selectedDate);
  const selectedTasks = dueTasksByDay.get(selectedKey) ?? [];

  const goPrevMonth = () => {
    hapticLight();
    setVisibleMonth((v) => addMonths(v, -1));
  };

  const goNextMonth = () => {
    hapticLight();
    setVisibleMonth((v) => addMonths(v, 1));
  };

  const goToday = () => {
    hapticLight();
    const t = new Date();
    setVisibleMonth(new Date(t.getFullYear(), t.getMonth(), 1));
    setSelectedDate(new Date(t.getFullYear(), t.getMonth(), t.getDate()));
  };

  const selectDay = (d: Date) => {
    hapticLight();
    setSelectedDate(d);
  };

  const isToday = (d: Date) => isSameLocalDay(d, new Date());

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingLeft: EDGE_PAD_H + insets.left,
          paddingRight: EDGE_PAD_H + insets.right,
          paddingBottom: 16 + bottomClearance + Math.max(insets.bottom, 8),
        },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {!hasAnyDueTasks ? (
        <View style={styles.emptyBanner}>
          <Text style={styles.emptyBannerTitle}>No due dates yet</Text>
          <Text style={styles.emptyBannerHint}>
            Add a due date from task details to see it here.
          </Text>
        </View>
      ) : null}

      <View style={[styles.wrapOuter, { maxWidth: innerMaxW + CAL_SHIFT, alignSelf: 'center' }]}>
        <View style={styles.shadow} pointerEvents="none" />
        <View style={[styles.face, { width: innerMaxW }]}>
          <View style={styles.monthHeader}>
            <Pressable
              onPress={goPrevMonth}
              hitSlop={12}
              style={styles.monthNavBtn}
              accessibilityRole="button"
              accessibilityLabel="Previous month"
            >
              <Feather name="chevron-left" size={22} color={colors.iconPrimary} />
            </Pressable>
            <Text style={styles.monthTitle} numberOfLines={1}>
              {monthTitle(visibleMonth)}
            </Text>
            <View style={styles.monthHeaderRight}>
              <Pressable
                onPress={goToday}
                style={styles.todayBtn}
                accessibilityRole="button"
                accessibilityLabel="Jump to today"
              >
                <Text style={styles.todayBtnText}>Today</Text>
              </Pressable>
              <Pressable
                onPress={goNextMonth}
                hitSlop={12}
                style={styles.monthNavBtn}
                accessibilityRole="button"
                accessibilityLabel="Next month"
              >
                <Feather name="chevron-right" size={22} color={colors.iconPrimary} />
              </Pressable>
            </View>
          </View>

          <View style={styles.weekdayRow}>
            {WEEKDAY_LABELS.map((label, wi) => (
              <View key={`wd-${wi}`} style={styles.weekdayCell}>
                <Text style={styles.weekdayText}>{label}</Text>
              </View>
            ))}
          </View>

          {grid.map((row, ri) => (
            <View key={`w-${ri}`} style={styles.gridRow}>
              {row.map((cell, ci) => {
                if (cell == null) {
                  return <View key={`e-${ri}-${ci}`} style={styles.dayCell} />;
                }
                const key = dateToLocalKey(cell);
                const count = dueTasksByDay.get(key)?.length ?? 0;
                const selected = key === selectedKey;
                const today = isToday(cell);
                const a11y = `${cell.toLocaleDateString(undefined, {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}, ${count} task${count === 1 ? '' : 's'} due`;
                return (
                  <Pressable
                    key={key}
                    onPress={() => selectDay(cell)}
                    style={[
                      styles.dayCell,
                      today && styles.dayCellToday,
                      selected && styles.dayCellSelectedWrap,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={a11y}
                  >
                    {selected ? (
                      <View pointerEvents="none" style={styles.dayCellSelectionRing} />
                    ) : null}
                    <Text style={[styles.dayNum, today && styles.dayNumToday]}>{cell.getDate()}</Text>
                    {count > 0 ? (
                      <View style={styles.dotsRow}>
                        {count === 1 ? (
                          <View style={styles.dot} />
                        ) : (
                          <Text style={styles.countBadge}>{count > 9 ? '9+' : count}</Text>
                        )}
                      </View>
                    ) : (
                      <View style={styles.dotsRow} />
                    )}
                  </Pressable>
                );
              })}
            </View>
          ))}

          <View style={styles.agendaSection}>
            <Text style={styles.agendaTitle}>
              Due {selectedDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </Text>
            {selectedTasks.length === 0 ? (
              <Text style={styles.agendaEmpty}>Nothing due this day.</Text>
            ) : (
              selectedTasks.map(({ card, columnTitle }) => (
                <View
                  key={card.id}
                  ref={(r) => {
                    if (r) taskRowHostRefs.current[card.id] = r;
                    else delete taskRowHostRefs.current[card.id];
                  }}
                  collapsable={false}
                  style={styles.taskRowOuter}
                >
                  <Pressable
                    onPress={() => openAgendaTask(card)}
                    style={({ pressed }) => [styles.taskRow, pressed && styles.taskRowPressed]}
                    accessibilityRole="button"
                    accessibilityLabel={`${card.title}, ${columnTitle}`}
                  >
                    <View style={styles.taskRowInner}>
                      <View
                        style={[
                          styles.taskStripe,
                          {
                            backgroundColor:
                              card.labelColor ?? card.labels?.[0]?.color ?? colors.divider,
                          },
                        ]}
                      />
                      <View style={styles.taskBody}>
                        <Text style={styles.taskTitle} numberOfLines={2}>
                          {card.title}
                        </Text>
                        <Text style={styles.taskMeta} numberOfLines={1}>
                          {columnTitle}
                        </Text>
                      </View>
                      <View style={styles.taskChevronWrap}>
                        <Feather name="chevron-right" size={18} color={colors.iconMuted} />
                      </View>
                    </View>
                  </Pressable>
                </View>
              ))
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function createBoardCalendarStyles(colors: ThemeColors) {
  return StyleSheet.create({
    scroll: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingTop: 8,
    },
    emptyBanner: {
      marginBottom: 14,
      paddingVertical: 12,
      paddingHorizontal: 14,
      backgroundColor: colors.surfaceElevated,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    emptyBannerTitle: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.textPrimary,
      marginBottom: 4,
    },
    emptyBannerHint: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.textSecondary,
      lineHeight: 18,
    },
    wrapOuter: {
      position: 'relative',
      width: '100%',
      marginBottom: CAL_SHIFT,
    },
    shadow: {
      position: 'absolute',
      left: CAL_SHIFT,
      top: CAL_SHIFT,
      right: -CAL_SHIFT,
      bottom: -CAL_SHIFT,
      backgroundColor: colors.shadowFillColumn,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    face: {
      position: 'relative',
      zIndex: 1,
      alignSelf: 'center',
      backgroundColor: colors.surfaceElevated,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    monthHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
      backgroundColor: colors.tableHeaderBg,
      gap: 6,
    },
    monthNavBtn: {
      padding: 4,
    },
    monthTitle: {
      flex: 1,
      fontSize: 17,
      fontWeight: '800',
      color: colors.textPrimary,
      textAlign: 'center',
    },
    monthHeaderRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    todayBtn: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceElevated,
    },
    todayBtnText: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    weekdayRow: {
      flexDirection: 'row',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.divider,
      backgroundColor: colors.surfaceMuted,
    },
    weekdayCell: {
      flex: 1,
      paddingVertical: 8,
      alignItems: 'center',
    },
    weekdayText: {
      fontSize: 10,
      fontWeight: '800',
      color: colors.sectionLabel,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    gridRow: {
      flexDirection: 'row',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.calendarGridLine,
    },
    dayCell: {
      flex: 1,
      minHeight: 52,
      paddingVertical: 6,
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderRightWidth: StyleSheet.hairlineWidth,
      borderRightColor: colors.calendarGridLine,
      position: 'relative',
    },
    dayCellToday: {
      backgroundColor: colors.tableRowAlt,
    },
    dayCellSelectedWrap: {
      backgroundColor: colors.cardFaceOnColumn,
      zIndex: 2,
      elevation: 3,
    },
    dayCellSelectionRing: {
      position: 'absolute',
      top: 3,
      left: 2,
      right: 2,
      bottom: 3,
      borderWidth: 2,
      borderColor: colors.textPrimary,
      borderRadius: 4,
    },
    dayNum: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    dayNumToday: {
      fontWeight: '800',
      color: colors.textPrimary,
    },
    dotsRow: {
      minHeight: 14,
      marginTop: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.textPrimary,
    },
    countBadge: {
      fontSize: 10,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    agendaSection: {
      paddingHorizontal: 12,
      paddingTop: 14,
      paddingBottom: 16,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      backgroundColor: colors.surfaceMuted,
    },
    agendaTitle: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.sectionLabel,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 10,
    },
    agendaEmpty: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textTertiary,
      paddingVertical: 8,
    },
    taskRowOuter: {
      marginBottom: 8,
    },
    taskRow: {
      backgroundColor: colors.surfaceElevated,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    taskRowPressed: {
      opacity: 0.88,
    },
    taskRowInner: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 48,
    },
    taskStripe: {
      width: 4,
      alignSelf: 'stretch',
      minHeight: 48,
    },
    taskBody: {
      flex: 1,
      paddingVertical: 10,
      paddingLeft: 8,
      paddingRight: 10,
      minWidth: 0,
    },
    taskChevronWrap: {
      alignSelf: 'stretch',
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
    },
    taskTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    taskMeta: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
      marginTop: 2,
    },
  });
}
