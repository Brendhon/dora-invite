import { MESSAGES } from "@/constants/messages";
import DoraSpeaking from "./DoraSpeaking";

export function Error({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <DoraSpeaking
        onComplete={onComplete}
        text={MESSAGES.error_message}
        className="flex-col-reverse"
        type="thinking"
      />
    </div>
  );
}
