import { getCinemaSessions } from '@/lib/cineart';
import { readCachedMovies } from '@/lib/movies.server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Attempt to read cached movies
    const cached = await readCachedMovies();

    // If cache is valid, return cached data
    if (cached) return NextResponse.json(cached);

    // If cache is not valid or doesn't exist, fetch fresh data
    const fresh = await getCinemaSessions();

    // Log that we are using fresh data
    console.log('Using fresh data from Cineart');

    // Return the fresh data
    return NextResponse.json(fresh);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro ao obter sessões' }, { status: 500 });
  }
}
