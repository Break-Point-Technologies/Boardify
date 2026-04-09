import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Stack, router, useFocusEffect } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hapticLight } from '../src/utils/haptics';
import { BoardStyleActionButton } from '../src/components/BoardStyleActionButton';
import { useAuth } from '../src/contexts/AuthContext';
import { fetchCurrentUser, resendVerificationEmail } from '../src/api/auth';

const BELOW_HEADER_GAP = 10;
const BG = '#f5f0e8';

const cardShadow =
  Platform.OS === 'ios'
    ? {
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
      }
    : { elevation: 5 };

export default function VerifyEmailScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { user, refreshUser } = useAuth();
  const [resending, setResending] = useState(false);

  const close = useCallback(() => {
    hapticLight();
    router.back();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (user?.emailVerified) {
        router.replace('/');
      }
    }, [user?.emailVerified])
  );

  const onResend = async () => {
    hapticLight();
    setResending(true);
    try {
      const msg = await resendVerificationEmail();
      Alert.alert('Email sent', msg);
    } catch (e: unknown) {
      Alert.alert('Could not resend', e instanceof Error ? e.message : 'Try again later.');
    } finally {
      setResending(false);
    }
  };

  const onContinue = async () => {
    hapticLight();
    try {
      await refreshUser();
      const u = await fetchCurrentUser();
      if (u.emailVerified) {
        router.replace('/');
        return;
      }
      Alert.alert('Not verified yet', 'Open the link in your email, then tap Continue again.');
    } catch (e: unknown) {
      Alert.alert('Something went wrong', e instanceof Error ? e.message : 'Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen>
        <Stack.Header
          style={
            Platform.OS === 'ios'
              ? { backgroundColor: 'transparent' }
              : { backgroundColor: BG }
          }
        />
        <Stack.Screen.Title style={{ fontWeight: '800', color: '#0a0a0a' }}>
          Verify email
        </Stack.Screen.Title>
        <Stack.Toolbar placement="left">
          <Stack.Toolbar.Button icon="xmark" onPress={close} tintColor="#0a0a0a" />
        </Stack.Toolbar>
      </Stack.Screen>

      <KeyboardAvoidingView
        style={[styles.flex, styles.sheetFill]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}
      >
        <ScrollView
          style={styles.sheetFill}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: headerHeight + BELOW_HEADER_GAP,
              paddingBottom: insets.bottom + 28,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.helper}>
              We sent a verification link to{' '}
              <Text style={{ fontWeight: '800', color: '#0a0a0a' }}>{user?.email ?? 'your email'}</Text>.
              Open it on this device, then tap Continue.
            </Text>
            <View style={styles.actions}>
              <BoardStyleActionButton
                shadowColor="#e0e0e0"
                onPress={close}
                label="Close"
                labelStyle={styles.labelCancel}
              />
              <BoardStyleActionButton
                shadowColor="#a5d6a5"
                onPress={() => void onContinue()}
                label="Continue"
                labelStyle={styles.labelPrimary}
              />
            </View>
            <BoardStyleActionButton
              layout="stack"
              shadowColor={resending ? '#d0d0d0' : '#e8e8e8'}
              onPress={() => void onResend()}
              disabled={resending}
              label={resending ? 'Sending…' : 'Resend verification email'}
              labelStyle={resending ? styles.labelMuted : styles.labelPrimary}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  flex: { flex: 1 },
  sheetFill: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#000',
    padding: 24,
    ...cardShadow,
  },
  helper: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 28,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    width: '100%',
    overflow: 'hidden',
    paddingBottom: 11,
    marginBottom: 12,
  },
  labelCancel: { color: '#0a0a0a' },
  labelPrimary: { color: '#0a0a0a' },
  labelMuted: { color: '#888' },
});
