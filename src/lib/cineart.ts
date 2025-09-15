import { Movie, Room } from '@/types/movie';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { DateTime } from 'luxon';

const BASE_URL = 'https://www.cineart.com.br/cinema/cineart-serra-sul';

/**
 * Make web scraping to get movie sessions from Cineart Serra Sul
 * @returns {Promise<Movie[]>} - Array of movie sessions
 * @throws {Error} - If data is not found in the page
 */
export async function getCinemaSessions(): Promise<Movie[]> {
  const { data } = await axios.get(BASE_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Cache-Control': 'max-age=0',
    },
    timeout: 15000,
    maxRedirects: 5,
  });
  const $ = cheerio.load(data);
  const rawJson = $('cinema-prog').attr(':cinemas');
  if (!rawJson) throw new Error('Data not found in the page');
  
  console.log('Scraping Cineart Serra Sul');

  const jsonData = JSON.parse(rawJson.replace(/&quot;/g, '"'));
  const [dayKey] = Object.keys(jsonData);
  const day = jsonData[dayKey];
  const filmes = day.FILMES;

  const movieSessions: Movie[] = [];

  for (const movieId in filmes) {
    const filme = filmes[movieId];
    const genres = filme.GENRES?.split(',').map((g: string) => g.trim()).filter(Boolean) || [];
    const age = parseInt(filme.AGE) || 0;
    const roomMap: Record<string, Room> = {};

    for (const salaId in filme.SALAS) {
      const sala = filme.SALAS[salaId];
      const name = sala.SALA;
      const format = sala.TIPO as '2D' | '3D';
      const language = sala.LEGENDA.includes('Dublado') ? 'Dublado' : 'Legendado';
      const horarios = sala.HORARIOS.map((h: any) => h.HORARIO.slice(0, 5));

      if (!roomMap[name]) {
        roomMap[name] = { name, format, language, sessions: [...horarios] };
      } else {
        roomMap[name].sessions.push(...horarios);
      }
    }

    const dates: string[] = [];
    const start = DateTime.fromISO(filme.DATA, { zone: 'America/Sao_Paulo' });
    const daysToWednesday = (3 - start.weekday + 7) % 7 || 7;

    for (let i = 0; i <= daysToWednesday; i++) {
      const d = start.plus({ days: i });
      dates.push(d.toFormat('dd/MM/yyyy'));
    }

    movieSessions.push({
      title: filme.TITLE,
      genre: genres,
      ageRating: age,
      dates,
      rooms: Object.values(roomMap),
    });
  }

  return movieSessions;
}
