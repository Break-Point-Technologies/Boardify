import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RotatingTextRing } from './RotatingTextRing';
import { ContributionGrid } from './ContributionGrid';
import type { ContributionGridTheme } from './ContributionGrid';
import { hapticLight } from '../utils/haptics';
import PlayIcon from '../../assets/icons/play.svg';
import PlusIcon from '../../assets/icons/plus.svg';

const themeStyles = {
  reading: {
    headerBg: '#FFFFFF',
    headerShadow: '#F3D9B1',
    statColor: '#b8860b',
    iconBg: '#F3D9B1',
  },
  running: {
    headerBg: '#FFFFFF',
    headerShadow: '#a5d6a5',
    statColor: '#2e7d32',
    iconBg: '#a5d6a5',
  },
} as const;

interface ActivitySectionProps {
  theme: ContributionGridTheme;
  label: string;
  stat: string;
  statSubtext?: string;
  ringLabel: string;
  icon: keyof typeof Feather.glyphMap;
  actionType: 'play' | 'plus';
  gridData?: number[];
}

export function ActivitySection({
  theme,
  label,
  stat,
  statSubtext = 'This Week',
  ringLabel,
  icon,
  actionType,
  gridData,
}: ActivitySectionProps) {
  const styles = themeStyles[theme];

  const onActionPress = () => {
    hapticLight();
    // TODO: Start session / Add tally
  };

  const centerButton = (
    <TouchableOpacity
      onPress={onActionPress}
      activeOpacity={0.8}
      style={sectionStyles.centerButton}
    >
      {actionType === 'play' ? (
        <View style={sectionStyles.centerIconPlay}>
          <PlayIcon width={48} height={55} />
        </View>
      ) : (
        <View style={sectionStyles.centerIconPlus}>
          <PlusIcon width={56} height={56} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={sectionStyles.section}>
      <View style={sectionStyles.headerCardWrap}>
        <View
          style={[
            sectionStyles.headerCardShadow,
            { backgroundColor: styles.headerShadow },
          ]}
        />
        <View
          style={[
            sectionStyles.headerCard,
            { backgroundColor: styles.headerBg },
          ]}
        >
          <View style={sectionStyles.iconCircleWrap}>
            <View
              style={[
                sectionStyles.iconCircleShadow,
                { backgroundColor: styles.headerShadow },
              ]}
            />
            <View style={[sectionStyles.iconCircle, { backgroundColor: styles.iconBg }]}>
              <Feather name={icon} size={22} color="#0a0a0a" />
            </View>
          </View>
          <Text style={sectionStyles.label}>{label}</Text>
          <View style={sectionStyles.statBlock}>
            <Text style={[sectionStyles.stat, { color: styles.statColor }]}>{stat}</Text>
            <Text style={sectionStyles.statSubtext}>{statSubtext}</Text>
          </View>
        </View>
      </View>
      <View style={sectionStyles.widgetsRow}>
        <View style={sectionStyles.ringWidget}>
          <View style={sectionStyles.centerButtonShadowWrap}>
            <RotatingTextRing label={ringLabel} centerChild={centerButton} size={150} />
          </View>
        </View>
        <View style={sectionStyles.gridWidget}>
          <ContributionGrid theme={theme} data={gridData} cellSize={10} gap={3} />
        </View>
      </View>
    </View>
  );
}

const SHIFT = 5;

const sectionStyles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  headerCardWrap: {
    position: 'relative',
    marginRight: SHIFT,
    marginBottom: 12 + SHIFT,
    overflow: 'visible',
  },
  headerCardShadow: {
    position: 'absolute',
    left: SHIFT,
    top: SHIFT,
    right: -SHIFT,
    bottom: -SHIFT,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#000',
  },
  headerCard: {
    position: 'relative',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#000',
  },
  iconCircleWrap: {
    position: 'relative',
    marginRight: 12,
  },
  iconCircleShadow: {
    position: 'absolute',
    left: SHIFT,
    top: SHIFT,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#000',
  },
  iconCircle: {
    position: 'relative',
    zIndex: 1,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  statBlock: {
    alignItems: 'flex-end',
  },
  stat: {
    fontSize: 16,
    fontWeight: '700',
  },
  statSubtext: {
    fontSize: 11,
    color: '#0a0a0a',
    opacity: 0.8,
    marginTop: 2,
  },
  widgetsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ringWidget: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButtonShadowWrap: {
    position: 'relative',
  },
  centerButton: {
    position: 'relative',
    zIndex: 1,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerIconPlay: {
    transform: [{ translateX: 5 }, { translateY: 6 }],
  },
  centerIconPlus: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
  },
  gridWidget: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
