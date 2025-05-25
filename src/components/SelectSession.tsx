'use client';

import { MovieSession } from "@/types/movie";
import AnimatedCard from "./AnimatedCard";
import DoraStep from "./DoraStep";
import Button from "./Button";
import { MESSAGES } from "@/constants/messages";

interface SelectSessionProps {
  movie: MovieSession;
  onSelect: (session: string) => void;
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
            <div className="p-4">
              <h4 className="text-md font-bold text-purple-800 mb-2">
                {room.name} 🎬 • {room.format} • {room.language}
              </h4>
              <div className="flex flex-wrap gap-3 mt-2">
                {room.sessions.map((time, index) => (
                  <Button
                    key={time + index + room.name}
                    onClick={() => onSelect(time)}
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
