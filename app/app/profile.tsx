import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import { Stack, router, useFocusEffect } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hapticLight } from '../src/utils/haptics';
import { useAuth } from '../src/contexts/AuthContext';
import ProfilePictureUpload from '../src/components/ProfilePictureUpload';
import { updateUserProfile } from '../src/api/user';

const BELOW_HEADER_GAP = 10;
const BG = '#f5f0e8';
const SHIFT = 5;
const PRESS_IN = 60;
const PRESS_OUT = 100;

function BoardStyleButton({
  shadowColor,
  onPress,
  disabled,
  label,
  labelStyle,
}: {
  shadowColor: string;
  onPress: () => void;
  disabled?: boolean;
  label: string;
  labelStyle: object;
}) {
  const offset = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }, { translateY: offset.value }],
  }));

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => {
        if (!disabled) {
          offset.value = withTiming(SHIFT, { duration: PRESS_IN });
        }
      }}
      onPressOut={() => {
        cancelAnimation(offset);
        offset.value = 0;
      }}
      style={styles.boardBtnWrap}
    >
      <View
        style={[styles.boardBtnShadow, { backgroundColor: shadowColor }]}
        pointerEvents="none"
      />
      <Animated.View
        style={[
          styles.boardBtnFace,
          disabled && styles.boardBtnFaceDisabled,
          animatedStyle,
        ]}
      >
        <Text style={[styles.boardBtnLabel, labelStyle]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { user, refreshUser } = useAuth();
  const [username, setUsername] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setUsername(user?.username?.trim() ?? '');
    }, [user?.username])
  );

  const initialUsername = (user?.username ?? '').trim();
  const trimmed = username.trim();
  const usernameDirty = trimmed !== initialUsername;
  const canSave = !!user && usernameDirty && trimmed.length > 0 && !saving;

  const close = () => {
    hapticLight();
    Keyboard.dismiss();
    router.back();
  };

  const save = async () => {
    if (!canSave) return;
    hapticLight();
    Keyboard.dismiss();
    setSaving(true);
    try {
      await updateUserProfile({ username: trimmed });
      await refreshUser();
      router.back();
    } catch (e) {
      Alert.alert(
        'Could not save',
        e instanceof Error ? e.message : 'Something went wrong. Try again.'
      );
    } finally {
      setSaving(false);
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
          Profile
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
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          showsVerticalScrollIndicator={false}
        >
          {!user ? (
            <View style={styles.card}>
              <Text style={styles.helper}>
                Sign in to set your name, photo, and how others see you on boards.
              </Text>
              <View style={styles.actions}>
                <BoardStyleButton
                  shadowColor="#e0e0e0"
                  onPress={close}
                  label="Close"
                  labelStyle={styles.labelCancel}
                />
                <BoardStyleButton
                  shadowColor="#a5d6a5"
                  onPress={() => {
                    hapticLight();
                    router.push('/login');
                  }}
                  label="Sign in"
                  labelStyle={styles.labelCreate}
                />
              </View>
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.helper}>
                Your profile is visible where you collaborate. You can update your photo and
                display name anytime.
              </Text>

              <View style={styles.photoBlock}>
                <ProfilePictureUpload
                  tone="light"
                  currentImageUrl={user.profilePictureUrl ?? undefined}
                  onUploadSuccess={() => {}}
                  onRemoveSuccess={() => {}}
                />
              </View>

              <Text style={styles.label}>Display name</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Your name"
                placeholderTextColor="#888"
                style={styles.input}
                returnKeyType="done"
                onSubmitEditing={() => (canSave ? save() : undefined)}
                maxLength={80}
                autoCorrect={false}
                autoCapitalize="words"
              />

              <Text style={styles.label}>Email</Text>
              <View style={styles.emailBox}>
                <Text style={styles.emailText}>{user.email}</Text>
              </View>

              <View style={styles.actions}>
                <BoardStyleButton
                  shadowColor="#e0e0e0"
                  onPress={close}
                  label="Cancel"
                  labelStyle={styles.labelCancel}
                />
                <BoardStyleButton
                  shadowColor={canSave ? '#a5d6a5' : '#d0d0d0'}
                  onPress={save}
                  disabled={!canSave}
                  label={saving ? 'Saving…' : 'Save'}
                  labelStyle={canSave ? styles.labelCreate : styles.labelCreateDisabled}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const cardShadow =
  Platform.OS === 'ios'
    ? {
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
      }
    : { elevation: 5 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  flex: {
    flex: 1,
  },
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
    marginBottom: 22,
    fontWeight: '500',
  },
  photoBlock: {
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0a0a0a',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  input: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0a0a0a',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: BG,
    marginBottom: 18,
  },
  emailBox: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: '#eee',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 28,
    gap: 12,
    width: '100%',
    overflow: 'hidden',
    paddingBottom: SHIFT + 6,
  },
  boardBtnWrap: {
    position: 'relative',
    flex: 1,
    minWidth: 0,
    marginRight: SHIFT,
    marginBottom: SHIFT,
    zIndex: 0,
  },
  boardBtnShadow: {
    position: 'absolute',
    left: SHIFT,
    top: SHIFT,
    right: -SHIFT,
    bottom: -SHIFT,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#000',
    zIndex: 0,
  },
  boardBtnFace: {
    position: 'relative',
    zIndex: 1,
    elevation: 4,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  boardBtnFaceDisabled: {
    backgroundColor: '#eee',
  },
  boardBtnLabel: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
    color: '#0a0a0a',
  },
  labelCancel: {
    color: '#0a0a0a',
  },
  labelCreate: {
    color: '#0a0a0a',
  },
  labelCreateDisabled: {
    color: '#888',
  },
});
