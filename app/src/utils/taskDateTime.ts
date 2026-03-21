export function parseTaskDateTime(iso?: string | null): Date {
  if (iso == null || iso === '') return new Date();
  const d = new Date(iso);
  if (!Number.isNaN(d.getTime())) return d;
  return new Date();
}

export function hasValidTaskIso(iso?: string | null): boolean {
  if (iso == null || iso === '') return false;
  const d = new Date(iso);
  return !Number.isNaN(d.getTime());
}

export function formatTaskDateTimeDisplay(iso?: string | null): string {
  if (!hasValidTaskIso(iso)) return '';
  const d = new Date(iso as string);
  return d.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function toIsoString(d: Date): string {
  return d.toISOString();
}

export function mergeDatePart(base: Date, dateFromPicker: Date): Date {
  const next = new Date(base);
  next.setFullYear(dateFromPicker.getFullYear());
  next.setMonth(dateFromPicker.getMonth());
  next.setDate(dateFromPicker.getDate());
  return next;
}

export function mergeTimePart(base: Date, timeFromPicker: Date): Date {
  const next = new Date(base);
  next.setHours(timeFromPicker.getHours());
  next.setMinutes(timeFromPicker.getMinutes());
  next.setSeconds(0);
  next.setMilliseconds(0);
  return next;
}

export function isoToDatetimeLocalInput(iso?: string | null): string {
  if (!hasValidTaskIso(iso)) return '';
  const d = new Date(iso as string);
  const pad = (n: number) => String(n).padStart(2, '0');
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const h = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${y}-${m}-${day}T${h}:${min}`;
}

export function datetimeLocalInputToIso(value: string): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}
