import { MovieSession } from "@/types/movie";

// lib/movies.ts
export async function fetchMovies(): Promise<MovieSession[]> {
  const res = await fetch("/data/movies.json");
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  return data;
}
