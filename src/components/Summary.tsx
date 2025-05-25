import { MESSAGES } from "@/constants/messages";
import DoraSpeaking from "./DoraSpeaking";
import { getWeekday } from "@/lib/utils";

interface SummaryProps {
  movieTitle: string;
  day: string;
  time: string;
  room: string;
  onComplete?: () => void;
}

export function Summary({
  movieTitle,
  day,
  time,
  room,
  onComplete
}: SummaryProps) {
  // Form the message
  const message = MESSAGES.summary
    .replace("{movie}", movieTitle)
    .replace("{day}", getWeekday(day))
    .replace("{time}", time)
    .replace("{room}", room);

  // Return the component
  return (
    <div className="flex flex-col items-center gap-6">
      <DoraSpeaking
        text={message}
        onComplete={onComplete}
        className="flex-col-reverse"
        type="summary"
      />
    </div>
  );
}
