import { MESSAGES } from "@/constants/messages";
import DoraSpeaking from "./DoraSpeaking";
import Button from "./Button";

export default function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <DoraSpeaking text={MESSAGES.greeting} />
      <Button onClick={onNext}>
        Vamos lá!
      </Button>
    </div>
  );
}
