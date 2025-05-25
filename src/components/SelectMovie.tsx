'use client';

import { MESSAGES } from "@/constants/messages";
import { MovieSession } from "@/types/movie";
import AnimatedCard from "./AnimatedCard";
import DoraStep from "./DoraStep";

interface SelectMovieProps {
  movies: MovieSession[];
  onSelect: (movie: MovieSession) => void;
  onComplete?: () => void;
}

export function SelectMovie({ movies, onSelect, onComplete }: SelectMovieProps) {
  return (
    <DoraStep text={MESSAGES.cinema_invitation} type="select-movie" direction="col-reverse" onComplete={onComplete}>
      <div className="grid gap-4 max-w-md w-full px-4">
        {movies.map((movie, index) => (
          <AnimatedCard
            key={movie.title}
            index={index}
            onClick={() => onSelect(movie)}
            className="min-h-[72px]"
          >
            <h3 className="text-lg font-bold text-purple-800 px-2 pt-2">{movie.title}</h3>
            <p className="text-sm text-gray-500 px-2 pb-2">
              {movie.genre.join(", ")} • {movie.ageRating}+ anos
            </p>
          </AnimatedCard>
        ))}
      </div>
    </DoraStep>
  );
}
