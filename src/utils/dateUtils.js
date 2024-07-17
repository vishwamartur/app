import {
  format,
  addDays,
  differenceInDays,
  isBefore,
  isAfter,
  parseISO,
} from "date-fns";

/**
 * Format a date to a readable string
 * @param {Date} date - The date to format
 * @param {string} formatString - The format string
 * @returns {string} - The formatted date string
 */
export const formatDate = (date, formatString = "yyyy-MM-dd") => {
  return format(date, formatString);
};

/**
 * Add days to a date
 * @param {Date} date - The original date
 * @param {number} days - The number of days to add
 * @returns {Date} - The new date
 */
export const addDaysToDate = (date, days) => {
  return addDays(date, days);
};

/**
 * Calculate the difference in days between two dates
 * @param {Date} date1 - The first date
 * @param {Date} date2 - The second date
 * @returns {number} - The number of days difference
 */
export const calculateDaysDifference = (date1, date2) => {
  return differenceInDays(date1, date2);
};

/**
 * Check if a date is before another date
 * @param {Date} date1 - The date to check
 * @param {Date} date2 - The date to compare against
 * @returns {boolean} - True if date1 is before date2, otherwise false
 */
export const isDateBefore = (date1, date2) => {
  return isBefore(date1, date2);
};

/**
 * Check if a date is after another date
 * @param {Date} date1 - The date to check
 * @param {Date} date2 - The date to compare against
 * @returns {boolean} - True if date1 is after date2, otherwise false
 */
export const isDateAfter = (date1, date2) => {
  return isAfter(date1, date2);
};

/**
 * Parse a date string into a Date object
 * @param {string} dateString - The date string to parse
 * @returns {Date} - The parsed Date object
 */
export const parseDateString = (dateString) => {
  return parseISO(dateString);
};
