import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LEGAL_POLICY_EFFECTIVE } from '../legal/metadata';
import { getPrivacySections, PRIVACY_DOCUMENT_TITLE } from '../legal/privacyPolicy';
import { getTermsSections, TERMS_DOCUMENT_TITLE } from '../legal/termsOfService';
import { hapticLight } from '../utils/haptics';
import { useTheme } from '../theme';
import type { ThemeColors } from '../theme/colors';
import type { LegalSection } from '../legal/types';

const BELOW_HEADER_GAP = 10;

function createStyles(colors: ThemeColors, maxReadableWidth: number) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.modalCreamCanvas,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 32,
      maxWidth: maxReadableWidth,
      width: '100%',
      alignSelf: 'center',
    },
    effective: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 20,
    },
    disclaimer: {
      fontSize: 12,
      lineHeight: 17,
      color: colors.textTertiary,
      fontWeight: '500',
      marginBottom: 24,
      padding: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceMuted,
    },
    heading: {
      fontSize: 17,
      fontWeight: '800',
      color: colors.textPrimary,
      marginTop: 20,
      marginBottom: 10,
    },
    headingFirst: {
      marginTop: 0,
    },
    paragraph: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.textSecondary,
      fontWeight: '500',
      marginBottom: 12,
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
      paddingRight: 4,
    },
    bullet: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.textSecondary,
      fontWeight: '700',
      width: 18,
      marginTop: 1,
    },
    bulletText: {
      flex: 1,
      fontSize: 15,
      lineHeight: 22,
      color: colors.textSecondary,
      fontWeight: '500',
    },
  });
}

function renderSection(section: LegalSection, index: number, styles: ReturnType<typeof createStyles>) {
  return (
    <View key={section.heading}>
      <Text style={[styles.heading, index === 0 && styles.headingFirst]}>{section.heading}</Text>
      {section.paragraphs?.map((p, i) => (
        <Text key={i} style={styles.paragraph}>
          {p}
        </Text>
      ))}
      {section.bullets?.map((b, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{b}</Text>
        </View>
      ))}
    </View>
  );
}

export type LegalDocumentVariant = 'privacy' | 'terms';

export default function LegalDocumentScreen({ variant }: { variant: LegalDocumentVariant }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const isWeb = Platform.OS === 'web';
  const maxReadableWidth = isWeb ? 720 : 560;

  const styles = useMemo(() => createStyles(colors, maxReadableWidth), [colors, maxReadableWidth]);

  const title = variant === 'privacy' ? PRIVACY_DOCUMENT_TITLE : TERMS_DOCUMENT_TITLE;
  const sections: LegalSection[] =
    variant === 'privacy' ? getPrivacySections() : getTermsSections();

  const close = () => {
    hapticLight();
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen>
        <Stack.Header
          style={
            Platform.OS === 'ios'
              ? { backgroundColor: 'transparent' }
              : { backgroundColor: colors.modalCreamCanvas }
          }
        />
        <Stack.Screen.Title style={{ fontWeight: '800', color: colors.modalCreamHeaderTint }}>
          {title}
        </Stack.Screen.Title>
        <Stack.Toolbar placement="left">
          <Stack.Toolbar.Button icon="xmark" onPress={close} tintColor={colors.modalCreamHeaderTint} />
        </Stack.Toolbar>
      </Stack.Screen>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: headerHeight + BELOW_HEADER_GAP,
            paddingBottom: insets.bottom + 28,
          },
        ]}
        showsVerticalScrollIndicator
      >
        <Text style={styles.effective}>Effective {LEGAL_POLICY_EFFECTIVE}</Text>
        <Text style={styles.disclaimer}>
          This document is provided for transparency. It is not personalized legal advice. Have qualified
          counsel review it for your jurisdiction and business.
        </Text>
        {sections.map((s, i) => renderSection(s, i, styles))}
      </ScrollView>
    </View>
  );
}
