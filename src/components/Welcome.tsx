import { MESSAGES } from "@/constants/messages";
import DoraSpeaking from "./DoraSpeaking";
import Button from "./Button";
import DoraStep from "./DoraStep";

export default function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <DoraStep text={MESSAGES.greeting} type="welcome">
      <Button onClick={onNext}>Vamos lá!</Button>
    </DoraStep>
  );
}
