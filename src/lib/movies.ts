import { Movie } from '@/types/movie';
import { DateTime } from 'luxon';
import { hasValidDates } from './utils';

const CACHE_KEY = 'cineart_cache';
const CACHE_EXP_KEY = 'cineart_cache_exp';

export async function fetchMovies(): Promise<Movie[]> {
  // Check localStorage for cached data
  const cached = localStorage.getItem(CACHE_KEY);
  const exp = localStorage.getItem(CACHE_EXP_KEY);

  // Get current time in São Paulo timezone
  const now = DateTime.now().setZone('America/Sao_Paulo');

  // If cached data exists and is not expired, return it
  if (cached && exp && DateTime.fromISO(exp) > now) {
    // Parse the cached data
    const data: Movie[] = JSON.parse(cached);
    
    // Log that we are using cached data
    console.log('Using cached data');

    // Check if the cached data has valid dates
    if (hasValidDates(data)) return data;
  }

  // Fetch fresh data if cache is invalid or expired
  const res = await fetch('/api/cineart');

  // Check if the response is ok
  if (!res.ok) throw new Error('Erro ao buscar sessões');

  // Parse the response as MovieSession array
  const fresh: Movie[] = await res.json();

  // Get 1 day from now for cache expiration with time 00:00
  const expiration = now.plus({ days: 1 }).startOf('day');

  // Save fresh data to localStorage
  localStorage.setItem(CACHE_KEY, JSON.stringify(fresh));
  localStorage.setItem(CACHE_EXP_KEY, expiration.toISO() ?? '');

  // Log that we are using fresh data
  console.log('Using fresh data');

  // Return the fresh data
  return fresh;
}
