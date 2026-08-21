/**
 * Formats an ISO date string (YYYY-MM-DD) into a human-readable display format.
 * Example: "2026-08-21" → "Thursday, August 21, 2026"
 */
export function formatDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Converts a Date object to an ISO date string (YYYY-MM-DD).
 * Uses local date to avoid timezone offset issues with date pickers.
 */
export function toISODateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns today's date as an ISO date string (YYYY-MM-DD).
 */
export function getTodayISO(): string {
  return toISODateString(new Date());
}

/**
 * Checks whether the given ISO date string is today.
 */
export function isToday(isoDate: string): boolean {
  return isoDate === getTodayISO();
}
