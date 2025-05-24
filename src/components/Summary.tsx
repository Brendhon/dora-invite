import { MESSAGES } from "@/constants/messages";
import DoraSpeaking from "./DoraSpeaking";

interface SummaryProps {
  movieTitle: string;
  day: string;
  time: string;
  room: string;
}

export function Summary({
  movieTitle,
  day,
  time,
  room,
}: SummaryProps) {
  // Form the message
  const message = MESSAGES.summary
    .replace("{movie}", movieTitle)
    .replace("{day}", day)
    .replace("{time}", time)
    .replace("{room}", room);

  // Return the component
  return (
    <div className="flex flex-col items-center gap-6">
      <DoraSpeaking
        text={message}
        className="flex-col-reverse"
        type="summary"
      />
    </div>
  );
}
