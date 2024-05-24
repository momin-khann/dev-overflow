// All helper functions

enum Number {
  MILLION = 1000000,
  LAC = 100000,
}
export const formatNumber = (num: number): string => {
  if (isNaN(num)) return "0";

  if (num >= Number.MILLION) {
    const formattedNumber = (num / Number.MILLION).toFixed(2);
    return `${formattedNumber}M`;
  } else if (num >= Number.LAC) {
    const formattedNumber = (num / Number.LAC).toFixed(2);
    return `${formattedNumber}K`;
  }

  return num.toString();
};

const formatTime = (value: number, unit: string): string => {
  return `${value} ${value > 1 ? `${unit}s ago` : `${unit} ago`}`;
};

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / 1000);
    return formatTime(seconds, "second");
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return formatTime(minutes, "minute");
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return formatTime(hours, "hour");
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return formatTime(days, "day");
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return formatTime(weeks, "week");
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return formatTime(months, "month");
  } else {
    const years = Math.floor(timeDifference / year);
    return formatTime(years, "year");
  }
};
export const capitalizeWord = (word: string) => {
  if (!word) return null;

  const firstChar = word.split("")[0].toUpperCase();

  return firstChar + word.slice(1);
};

export const caplitalizeSentence = (sentence: string) => {
  if (!sentence) return null;

  const firstChar = sentence.split("")[0].toUpperCase();

  return firstChar + sentence.slice(1);
};

export const getJoinedDate = (date: Date) => {
  const month = date.toLocaleString("default", {
    day: "numeric",
    month: "long",
  });
  const year = date.getFullYear();

  return `${month}, ${year}`;
};
