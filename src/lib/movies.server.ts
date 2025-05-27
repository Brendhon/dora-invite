import { MovieSession } from '@/types/movie';
import { promises as fs } from 'fs';
import path from 'path';
import { hasValidDates } from './utils';

const DATA_PATH = path.resolve('./public/data/movies.json');

export async function readCachedMovies(): Promise<MovieSession[] | null> {
  try {
    // Read the cached movie sessions from the JSON file
    const raw = await fs.readFile(DATA_PATH, 'utf-8');

    // If the file is empty or doesn't exist, return null
    if (!raw) return null;

    // Parse the JSON data
    const data: MovieSession[] = JSON.parse(raw);

    // Check if the data has valid dates
    return hasValidDates(data) ? data : null;
  } catch {
    return null;
  }
}
