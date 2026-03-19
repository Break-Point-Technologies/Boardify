import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivitiesHeader, MOBILE_NAV_HEIGHT } from './ActivitiesHeader';

export { MOBILE_NAV_HEIGHT };

interface User {
  profilePictureUrl?: string | null;
  displayName?: string | null;
  username?: string | null;
  email?: string | null;
}

export function AppTopNav({
  user,
  loading,
}: {
  user?: User | null;
  loading?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const totalHeight = MOBILE_NAV_HEIGHT + insets.top;

  return (
    <View
      style={{
        height: totalHeight,
        paddingTop: insets.top,
        zIndex: 999,
        elevation: 10,
        overflow: 'visible',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: '#f5f0e8',
      }}
    >
      <ActivitiesHeader embeddedInLayout />
    </View>
  );
}
