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
  return (
    <div className="flex flex-col items-center gap-6">
      <DoraSpeaking
        text={`${MESSAGES.summary_intro}
        <div class="text-justify">
          <strong>Filme:</strong> ${movieTitle}
          <strong>Dia:</strong> ${day}
          <strong>Horário:</strong> ${time}
          <strong>Sala:</strong> ${room}
        </div>
        ${MESSAGES.summary_conclusion}`}
        className="flex-col-reverse"
        type="summary"
      />
    </div>
  );
}
