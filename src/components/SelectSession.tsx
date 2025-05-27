'use client';

import { MESSAGES } from "@/constants/messages";
import { Movie, Session } from "@/types/movie";
import AnimatedCard from "./AnimatedCard";
import Button from "./Button";
import DoraStep from "./DoraStep";

interface SelectSessionProps {
  movie: Movie;
  onSelect: (session: Session) => void;
  onComplete?: () => void;
}

export function SelectSession({ movie, onSelect, onComplete }: SelectSessionProps) {
  return (
    <DoraStep
      text={MESSAGES.select_time.replace("{movie}", movie.title)}
      type="select-time"
      direction="col-reverse"
      onComplete={onComplete}
    >
      <div className="grid gap-6 sm:gap-4 max-w-md w-full">
        {movie.rooms.map((room, index) => (
          <AnimatedCard key={room.name + index} index={index}>
            <div className="p-2">
              <h4 className="text-lg font-bold text-primary mb-6">
                {room.name} 🎬 • {room.format} • {room.language}
              </h4>
              <div className="flex flex-wrap gap-4">
                {room.sessions.map((time, index) => (
                  <Button
                    key={time + index + room.name}
                    onClick={() => onSelect({ time, room: `${room.name} • ${room.format} • ${room.language}` })}
                    className="px-4 py-2 text-base rounded-xl border border-purple-300 bg-white hover:bg-purple-50 transition text-primary"
                  >
                    {time} 🕒
                  </Button>
                ))}
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </DoraStep>
  );
}
