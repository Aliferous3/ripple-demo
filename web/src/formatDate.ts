const DEFAULT_LOCALE = "en-US";
const FALLBACK_DATE = "Unknown date";

export function formatDate(date: Date): string {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return FALLBACK_DATE;
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  };

  const formattedDate = date.toLocaleDateString(
    DEFAULT_LOCALE,
    options,
  );

  return formattedDate;
}
