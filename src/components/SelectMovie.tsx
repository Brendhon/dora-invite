'use client';

import { MESSAGES } from "@/constants/messages";
import { MovieSession } from "@/types/movie";
import AnimatedCard from "./AnimatedCard";
import DoraStep from "./DoraStep";

interface SelectMovieProps {
  movies: MovieSession[];
  onSelect: (movie: MovieSession) => void;
}

export function SelectMovie({ movies, onSelect }: SelectMovieProps) {
  return (
    <DoraStep text={MESSAGES.cinema_invitation} type="select-movie" direction="col-reverse">
      <div className="grid gap-4 max-w-md w-full">
        {movies.map((movie, index) => (
          <AnimatedCard
            key={movie.title}
            index={index}
            onClick={() => onSelect(movie)}
          >
            <h3 className="text-lg font-bold text-purple-800">{movie.title}</h3>
            <p className="text-sm text-gray-500">
              {movie.genre.join(", ")} • {movie.ageRating}+ anos
            </p>
          </AnimatedCard>
        ))}
      </div>
    </DoraStep>
  );
}
