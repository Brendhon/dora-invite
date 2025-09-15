import { Movie } from '@/types/movie';

/**
 * Make web scraping to get movie sessions from Cineart Serra Sul
 * @returns {Promise<Movie[]>} - Array of movie sessions
 * @throws {Error} - If data is not found in the page
 */
export async function getCinemaSessions(): Promise<Movie[]> {
  throw new Error('Not implemented');
}
