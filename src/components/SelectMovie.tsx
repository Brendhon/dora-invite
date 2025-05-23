import { MovieSession } from "@/types/movie";
import DoraSpeaking from "./DoraSpeaking";
import { MESSAGES } from "@/constants/messages";

interface SelectMovieProps {
  movies: MovieSession[];
  onSelect: (movie: MovieSession) => void;
  onBack?: () => void;
}

export function SelectMovie({ movies, onSelect, onBack }: SelectMovieProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <DoraSpeaking
        text={MESSAGES.cinema_invitation}
        className="flex-row-reverse"
        type="select-movie"
      />

      <div className="grid gap-4 max-w-md w-full">
        {movies.map((movie) => (
          <button
            key={movie.title}
            onClick={() => onSelect(movie)}
            className="w-full p-4 rounded-2xl border border-purple-300 shadow hover:shadow-md text-left bg-white transition"
          >
            <h3 className="text-lg font-bold text-purple-800">{movie.title}</h3>
            <p className="text-sm text-gray-500">
              {movie.genre.join(", ")} • {movie.ageRating}+ anos
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
