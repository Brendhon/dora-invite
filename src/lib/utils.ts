import { MESSAGES } from '@/constants/messages';
import { Movie } from '@/types/movie';
import { ClassValue, clsx } from 'clsx';
import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge class names
 * @param {ClassValue[]} inputs - Class names to be merged
 * @returns {string} - Merged class names
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

// Check if value is a number
export const isNumber = (value: any): value is number => typeof value === 'number' && !isNaN(value);

/**
 * Parse a date string in "dd/mm/yyyy" format and return a DateTime object
 * @param {string} dateStr - Date string in format "dd/mm/yyyy"
 * @returns {DateTime} - Luxon DateTime object in 'America/Sao_Paulo' timezone
 */
export function parseDate(dateStr: string): DateTime {
  const [day, month, year] = dateStr.split('/').map(Number);
  return DateTime.fromObject({ day, month, year }, { zone: 'America/Sao_Paulo' });
}

/**
 * Get the weekday name from a date string and return with the first letter in uppercase
 * @param {string} dateStr - Date string in format "dd/mm/yyyy"
 * @returns {string} - Weekday name with first letter uppercase
 */
export const getWeekday = (dateStr: string): string => {
  // Form new Date object
  const date = parseDate(dateStr).toJSDate();

  // Check if the date is valid
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);

  // Return the formatted date with the first letter capitalized
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Get a message based on the day of the week from a date string
 * @param {string} dateStr - Date string in format "dd/mm/yyyy"
 * @returns {string} - Message for the specific day of the week
 */
export const getDoraDayMessage = (dateStr: string): string => {
  const date = parseDate(dateStr).toJSDate();
  const dayOfWeek = date.getDay(); // 0 = Domingo, 6 = Sábado
  return MESSAGES.days_of_week[dayOfWeek];
};


/**
 * Check if any movie session has valid dates (i.e., dates that are today or in the future)
 * @param {Movie[]} data - Array of movie sessions
 * @returns {boolean} - True if there are valid dates, false otherwise
 */
export function hasValidDates(data: Movie[]): boolean {
  const now = DateTime.now().setZone('America/Sao_Paulo');
  return data.some(movie => movie.dates.some(d => parseDate(d) >= now.startOf('day')));
}

/**
 * Check if date is today or in the future
 * @param {string} dateStr - Date string in format "dd/mm/yyyy"
 * @return {boolean} - True if date is today or in the future, false otherwise
 */
export function isFutureOrToday(dateStr: string): boolean {
  const date = parseDate(dateStr);
  const now = DateTime.now().setZone('America/Sao_Paulo').startOf('day');
  return date >= now;
}

/**
 * Filter days to get only those that are weekends (Saturday or Sunday) if have, otherwise return normal days
 * @param {string[]} days - Array of date strings in format "dd/mm/yyyy"
 * @returns {string[]} - Array of weekend date strings
 */
export function filterWeekendDays(days: string[]): string[] {
  // Parse each date string and filter for weekends
  const weekends = days.filter(dateStr => {
    const date = parseDate(dateStr);
    const weekday = date.weekday;
    return weekday === 6 || weekday === 7; // 6 = Saturday, 7 = Sunday
  });

  // If no weekends are found, return all days
  const result = weekends.length > 0 ? weekends : days;

  // Sort the result by date
  return result.sort((a, b) => parseDate(a).toMillis() - parseDate(b).toMillis());
}