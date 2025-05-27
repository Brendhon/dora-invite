import { MESSAGES } from "@/constants/messages";
import Button from "./Button";
import DoraStep from "./DoraStep";

interface WelcomeProps {
  onNext: () => void;
  onComplete: () => void;
}

export default function Welcome({ onNext, onComplete }: WelcomeProps) {
  return (
    <DoraStep text={MESSAGES.greeting} type="welcome"  onComplete={onComplete} >
      <Button onClick={onNext}>🎒 Vamos lá!</Button>
    </DoraStep>
  );
}
