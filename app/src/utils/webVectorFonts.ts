import { Platform } from 'react-native';
import * as Font from 'expo-font';
import Feather from '@expo/vector-icons/Feather';

export async function preloadFeatherFontForWeb(): Promise<void> {
  if (Platform.OS !== 'web') return;
  await Font.loadAsync(Feather.font);
  if (typeof document === 'undefined' || !document.fonts?.load) return;
  try {
    await document.fonts.load("24px feather");
  } catch {
    // ignore
  }
}
