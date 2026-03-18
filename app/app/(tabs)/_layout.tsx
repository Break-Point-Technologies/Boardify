import React from 'react';
import { Platform, DynamicColorIOS, View, StyleSheet, StatusBar, Image, useWindowDimensions } from 'react-native';
import { Tabs } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebTopNav } from '../../src/components';
import { useAuth } from '../../src/contexts/AuthContext';

const TabIcon = NativeTabs.Trigger.Icon;
const TabLabel = NativeTabs.Trigger.Label;

const BOARDS_TAB_ICON = require('../../assets/icons/board-tab.png');
const ACCOUNT_TAB_ICON = require('../../assets/icons/account-tab.png');

const TAB_ITEMS = [
  { name: 'index', label: 'Home', iosIcon: 'house' as const, androidIcon: 'home' as const, webIcon: 'home' as const },
  { name: 'account', label: 'Account', iosIcon: 'person' as const, androidIcon: 'user' as const, webIcon: 'user' as const },
] as const;

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { user, loading } = useAuth();
  const useNativeTabs = Platform.OS === 'ios';
  const isWeb = Platform.OS === 'web';

  const tabBarTintColor = Platform.OS === 'ios'
    ? DynamicColorIOS({ dark: '#0a0a0a', light: '#0a0a0a' })
    : '#0a0a0a';
  const tabBarLabelColor = Platform.OS === 'ios'
    ? DynamicColorIOS({ dark: 'rgba(10,10,10,0.6)', light: 'rgba(10,10,10,0.6)' })
    : 'rgba(10,10,10,0.6)';

  if (isWeb) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f0e8" />
        <WebTopNav
          user={user}
          loading={loading}
          tabs={TAB_ITEMS}
        />
        <View style={[styles.contentWrapper, { paddingTop: 0 }]}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: 'none' },
            }}
          >
            {TAB_ITEMS.map((item) => (
              <Tabs.Screen
                key={item.name}
                name={item.name}
                options={{ title: item.label }}
              />
            ))}
          </Tabs>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { minHeight: height }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f0e8" />
      <View style={[styles.contentWrapper, { paddingTop: insets.top, minHeight: height - insets.top }]}>
        {useNativeTabs ? (
          <NativeTabs
            labelStyle={{ color: tabBarLabelColor }}
            tintColor={tabBarTintColor}
            blurEffect="none"
            backgroundColor="transparent"
            shadowColor="transparent"
          >
            {TAB_ITEMS.map((item) => (
              <NativeTabs.Trigger key={item.name} name={item.name}>
                <TabLabel>{item.label}</TabLabel>
                {item.name === 'index' ? (
                  <TabIcon src={BOARDS_TAB_ICON} selectedColor={tabBarTintColor} />
                ) : (
                  <TabIcon src={ACCOUNT_TAB_ICON} selectedColor={tabBarTintColor} />
                )}
              </NativeTabs.Trigger>
            ))}
          </NativeTabs>
        ) : (
          <Tabs
            detachInactiveScreens={false}
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: '#0a0a0a',
              tabBarInactiveTintColor: 'rgba(10,10,10,0.5)',
              tabBarStyle: {
                backgroundColor: '#f5f0e8',
                borderTopWidth: 1,
                borderTopColor: '#000',
                height: 60 + insets.bottom,
                paddingBottom: insets.bottom,
                paddingTop: 8,
                elevation: 8,
              },
              tabBarLabelStyle: { fontSize: 12, fontWeight: '600', marginTop: 4 },
              tabBarShowLabel: true,
              tabBarHideOnKeyboard: true,
            }}
          >
            {TAB_ITEMS.map((item) => (
              <Tabs.Screen
                key={item.name}
                name={item.name}
                options={{
                  title: item.label,
                  tabBarLabel: item.label,
                  tabBarIcon: ({ color, size }) =>
                    item.name === 'index' ? (
                      <View style={styles.tabIconWrap}>
                        <Image source={BOARDS_TAB_ICON} style={styles.tabIconBoard} resizeMode="contain" />
                      </View>
                    ) : (
                      <View style={styles.tabIconWrap}>
                        <Image source={ACCOUNT_TAB_ICON} style={styles.tabIconAccount} resizeMode="contain" />
                      </View>
                    ),
                  tabBarAccessibilityLabel: item.label,
                }}
              />
            ))}
          </Tabs>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0e8',
  },
  contentWrapper: {
    flex: 1,
  },
  tabIconWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconBoard: {
    width: 20,
    height: 20,
  },
  tabIconAccount: {
    width: 24,
    height: 24,
  },
});
