import { format, parse } from "date-fns";

export const formatDate = (
  date: string | Date | undefined,
  dateFormat: string
) => {
  if (date === undefined) return undefined;
  if (typeof date === "string") {
    try {
      const formattedDate = format(date, dateFormat);
      return formattedDate;
    } catch {
      return undefined;
    }
  }

  return format(date, dateFormat);
};

export const parseDate = (dateString: string, dateFormat: string) => {
  try {
    const date = parse(dateString, dateFormat, new Date());
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
    return date;
  } catch {
    return undefined;
  }
};
