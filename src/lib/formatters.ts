/**
 * Deterministic formatters for dates and numbers to prevent
 * React hydration mismatches between server and client.
 */

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'UTC',
});

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US');

/**
 * Formats an ISO date string or Date object to a deterministic "MMM D, YYYY" format in UTC.
 * Example: "2026-10-24T09:00:00Z" -> "Oct 24, 2026"
 */
export function formatDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (!date || isNaN(date.getTime())) return '';
  return DATE_FORMATTER.format(date);
}

/**
 * Formats an ISO date string or Date object to a deterministic date-time string in UTC.
 * Example: "2026-10-02T10:00:00Z" -> "Oct 2, 2026, 10:00 AM UTC"
 */
export function formatDateTime(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (!date || isNaN(date.getTime())) return '';
  return `${DATE_TIME_FORMATTER.format(date)} UTC`;
}

/**
 * Formats an ISO string or Date into `YYYY-MM-DDTHH:mm` formatted in the user's local timezone.
 * Ideal for feeding into HTML `<input type="datetime-local">` value attribute without timezone offset drift.
 */
export function toLocalDatetimeString(dateInput?: string | Date | null): string {
  if (!dateInput) return '';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (!date || isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Parses a `YYYY-MM-DDTHH:mm` local datetime string from `<input type="datetime-local">`
 * and converts it to a standard UTC ISO string.
 * Ensures the date selected in the local timezone is preserved without double-conversion.
 */
export function fromLocalDatetimeString(localStr?: string | null): string | undefined {
  if (!localStr || !localStr.trim()) return undefined;

  const match = localStr.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) {
    const fallback = new Date(localStr);
    return isNaN(fallback.getTime()) ? undefined : fallback.toISOString();
  }

  const [, year, month, day, hour, min, sec] = match;
  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(min),
    sec ? Number(sec) : 0,
    0
  );

  if (isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

/**
 * Formats a duration in seconds into a friendly countdown string:
 * - "00:45" (< 1 hour)
 * - "01:15:30" (< 1 day)
 * - "2d 04h 15m 30s" (>= 1 day)
 */
export function formatCountdown(totalSeconds: number): string {
  if (totalSeconds <= 0) return '00:00';
  const days = Math.floor(totalSeconds / 86400);
  const remainingAfterDays = totalSeconds % 86400;
  const hours = Math.floor(remainingAfterDays / 3600);
  const minutes = Math.floor((remainingAfterDays % 3600) / 60);
  const seconds = remainingAfterDays % 60;

  if (days > 0) {
    return `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  }
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Formats numbers with deterministic commas (en-US locale).
 * Example: 1420 -> "1,420"
 */
export function formatNumber(num: number): string {
  return NUMBER_FORMATTER.format(num);
}
