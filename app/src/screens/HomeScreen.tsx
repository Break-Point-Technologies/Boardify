import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { hapticLight } from '../utils/haptics';
import { ActivitySection } from '../components/ActivitySection';
import { IPAD_TAB_CONTENT_TOP_PADDING } from '../config/layout';

const READING_GRID = [
  0, 1, 2, 1, 0, 1, 2, 1, 2, 3, 2, 1, 2, 1, 0, 2, 1, 2, 3, 2, 1, 0, 1, 2, 1, 0, 1, 0, 2, 1, 2, 3, 2, 1, 2,
];
const RUNNING_GRID = [
  0, 2, 1, 2, 1, 0, 1, 2, 3, 2, 1, 2, 1, 0, 1, 2, 1, 0, 2, 3, 2, 1, 2, 1, 0, 2, 1, 2, 1, 0, 1, 2, 3, 2, 1,
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { loading } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const [refreshing, setRefreshing] = useState(false);
  const isWeb = Platform.OS === 'web';

  const onRefresh = async () => {
    setRefreshing(true);
    hapticLight();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f5f0e8', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0a0a0a" />
      </View>
    );
  }

  return (
    <View className="relative flex-1" style={{ backgroundColor: '#f5f0e8' }}>
      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        contentContainerStyle={{
          paddingTop:
            (isWeb ? 24 : Math.max(insets.top / 2, 12)) +
            (Platform.OS === 'ios' && Platform.isPad ? IPAD_TAB_CONTENT_TOP_PADDING : 0),
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: isWeb ? 24 : 16,
          flexGrow: 1,
          maxWidth: isWeb ? 1200 : undefined,
          alignSelf: isWeb ? 'center' : undefined,
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}
        bounces={Platform.OS === 'ios'}
        overScrollMode={Platform.OS === 'android' ? 'never' : undefined}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#0a0a0a"
            colors={['#0a0a0a']}
            progressViewOffset={Platform.OS === 'android' ? 60 : undefined}
          />
        }
      >
        <ActivitySection
          theme="reading"
          label="Reading"
          stat="9h 13m"
          statSubtext="This Week"
          ringLabel="START SESSION 📚"
          icon="book"
          actionType="play"
          gridData={READING_GRID}
        />
        <ActivitySection
          theme="running"
          label="Running"
          stat="13 mi"
          statSubtext="This Week"
          ringLabel="ADD TALLY 👟"
          icon="activity"
          actionType="plus"
          gridData={RUNNING_GRID}
        />

        <View style={homeStyles.hintRow}>
          <View style={homeStyles.hintCardWrap}>
            <View style={homeStyles.hintCardShadow} />
            <View style={homeStyles.hintCard}>
              <Text style={homeStyles.hintEmoji}>🦊</Text>
              <Text style={homeStyles.hintText}>LONG PRESS</Text>
            </View>
          </View>
          <View style={homeStyles.hintCardWrap}>
            <View style={homeStyles.hintCardShadow} />
            <View style={homeStyles.hintCard}>
              <Text style={homeStyles.hintEmoji}>🐻</Text>
              <Text style={homeStyles.hintText}>Can also set Default Widgets</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const HINT_SHIFT = 5;

const homeStyles = StyleSheet.create({
  hintRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  hintCardWrap: {
    flex: 1,
    position: 'relative',
    marginRight: HINT_SHIFT,
    marginBottom: HINT_SHIFT,
    overflow: 'visible',
  },
  hintCardShadow: {
    position: 'absolute',
    left: HINT_SHIFT,
    top: HINT_SHIFT,
    right: -HINT_SHIFT,
    bottom: -HINT_SHIFT,
    backgroundColor: '#000',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
  },
  hintCard: {
    position: 'relative',
    zIndex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 72,
  },
  hintEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  hintText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0a0a0a',
    textAlign: 'center',
  },
});
