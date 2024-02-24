export const getLocaleFormattedDateTimeString = (
  dateTime: string,
  locale?: string
) =>
  new Date(dateTime).toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
