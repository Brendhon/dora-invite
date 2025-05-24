import { MESSAGES } from "@/constants/messages";
import DoraSpeaking from "./DoraSpeaking";

export function OtherDay({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <DoraSpeaking
        onComplete={onComplete}
        text={MESSAGES.other_day_message}
        className="flex-col-reverse"
        type="others"
      />
    </div>
  );
}
