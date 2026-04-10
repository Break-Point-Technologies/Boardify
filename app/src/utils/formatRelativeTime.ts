/** Short relative labels for message lists (matches common inbox UX). */
export function formatRelativeTimeShort(iso: string): string {
  const d = new Date(iso);
  const t = d.getTime();
  if (Number.isNaN(t)) return '';

  const now = Date.now();
  const diff = Math.max(0, now - t);
  const sec = Math.floor(diff / 1000);
  if (sec < 45) return 'Just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const startOfMsg = new Date(t);
  startOfMsg.setHours(0, 0, 0, 0);
  const days = Math.round((startOfToday.getTime() - startOfMsg.getTime()) / 86400000);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 14) return 'Last week';

  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
