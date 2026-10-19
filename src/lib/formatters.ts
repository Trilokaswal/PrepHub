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
 * Formats an ISO date string to a deterministic "MMM D, YYYY" format in UTC.
 * Example: "2026-10-24T09:00:00Z" -> "Oct 24, 2026"
 */
export function formatDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '';
  return DATE_FORMATTER.format(date);
}

/**
 * Formats an ISO date string to a deterministic date-time string in UTC.
 * Example: "2026-10-02T10:00:00Z" -> "Oct 2, 2026, 10:00 AM UTC"
 */
export function formatDateTime(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '';
  return `${DATE_TIME_FORMATTER.format(date)} UTC`;
}

/**
 * Formats numbers with deterministic commas (en-US locale).
 * Example: 1420 -> "1,420"
 */
export function formatNumber(num: number): string {
  return NUMBER_FORMATTER.format(num);
}
