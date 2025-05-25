import { ClassValue, clsx } from 'clsx';
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
 * Get the weekday name from a date string and return with the first letter in uppercase
 * @param {string} dateStr - Date string in format "dd/mm/yyyy"
 * @returns {string} - Weekday name with first letter uppercase
 */
export const getWeekday = (dateStr: string): string => {
  const [day, month, year] = dateStr.split("/").map(Number);

  const date = new Date(year, month - 1, day);

  const formatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}