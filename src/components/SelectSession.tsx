import { MovieSession } from "@/types/movie";
import DoraSpeaking from "./DoraSpeaking";
import { MESSAGES } from "@/constants/messages";

interface SelectSessionProps {
  movie: MovieSession;
  onSelectSession: (time: string, roomName: string) => void;
}

export function SelectSession({
  movie,
  onSelectSession,
}: SelectSessionProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <DoraSpeaking
        text={MESSAGES.choose_time}
        className="flex-row-reverse"
        type="select-time"
      />
      <div className="w-full max-w-md space-y-6">
        {movie.rooms.map((room) => (
          <div
            key={room.name + room.format}
            className="bg-white rounded-xl border p-5 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          >
            <p className="font-bold text-purple-700 mb-3">
              {room.name} • {room.format} • {room.language}
            </p>
            <div className="flex flex-wrap gap-3">
              {room.sessions.map((time) => (
                <button
                  key={time + room.name}
                  onClick={() => onSelectSession(time, room.name)}
                  className="rounded-md bg-purple-100 text-purple-800 px-3 py-1 text-sm font-medium hover:bg-purple-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
