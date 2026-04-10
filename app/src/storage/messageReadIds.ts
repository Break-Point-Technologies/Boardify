import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'boardify_inbox_read_ids';
const MAX_IDS = 500;

export async function loadReadMessageIds(): Promise<Set<string>> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x): x is string => typeof x === 'string'));
  } catch {
    return new Set();
  }
}

export async function markMessageIdsRead(ids: string[]): Promise<void> {
  if (!ids.length) return;
  const cur = await loadReadMessageIds();
  for (const id of ids) cur.add(id);
  const arr = [...cur].slice(-MAX_IDS);
  await AsyncStorage.setItem(KEY, JSON.stringify(arr));
}

export async function markMessageRead(id: string): Promise<void> {
  await markMessageIdsRead([id]);
}
