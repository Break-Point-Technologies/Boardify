import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import type { Router } from 'expo-router';

const ANDROID_CHANNEL_ID = 'boardify-updates';

export async function ensureAndroidPushChannel(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
    name: 'Board updates',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF6B35',
  });
}

function openBoardFromPayload(router: Router, data: Record<string, unknown> | undefined): void {
  const boardId = typeof data?.boardId === 'string' ? data.boardId.trim() : '';
  if (!boardId) return;
  const name = typeof data?.boardName === 'string' ? data.boardName : 'Board';
  router.replace({ pathname: '/board', params: { boardId, boardName: name } });
}

export function registerPushNotificationDeepLinks(router: Router): () => void {
  void ensureAndroidPushChannel();

  void Notifications.getLastNotificationResponseAsync().then((response) => {
    if (!response?.notification) return;
    const data = response.notification.request.content.data as Record<string, unknown> | undefined;
    openBoardFromPayload(router, data);
  });

  const sub = Notifications.addNotificationResponseReceivedListener((response) => {
    const data = response.notification.request.content.data as Record<string, unknown> | undefined;
    openBoardFromPayload(router, data);
  });

  return () => sub.remove();
}
