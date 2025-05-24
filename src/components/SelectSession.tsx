'use client';

import { MovieSession } from "@/types/movie";
import AnimatedCard from "./AnimatedCard";
import DoraStep from "./DoraStep";
import Button from "./Button";
import { MESSAGES } from "@/constants/messages";

interface SelectSessionProps {
  movie: MovieSession;
  onSelect: (session: string) => void;
  onBack?: () => void;
}

export function SelectSession({ movie, onSelect }: SelectSessionProps) {
  return (
    <DoraStep
      text={MESSAGES.select_time.replace("{movie}", movie.title)}
      type="select-time"
      direction="col-reverse"
    >
      <div className="grid gap-4 max-w-md w-full">
        {movie.rooms.map((room, index) => (
          <AnimatedCard key={room.name + index} index={index}>
            <div>
              <h4 className="text-md font-bold text-purple-800 mb-1">
                Sala {room.name} 🎬 • {room.format} • {room.language}
              </h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {room.sessions.map((time, index) => (
                  <Button
                    key={time + index + room.name}
                    onClick={() => onSelect(time)}
                    className="px-3 py-1 text-sm rounded-lg border border-purple-300 bg-white hover:bg-purple-50 transition text-primary"
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
