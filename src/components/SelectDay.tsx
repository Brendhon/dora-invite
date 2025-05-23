import { MESSAGES } from "@/constants/messages";
import Button from "./Button";
import DoraSpeaking from "./DoraSpeaking";

type DayPickerProps = {
  days: string[];
  onSelectDay: (day: string) => void;
  onBack: () => void;
};

export default function SelectDay({
  days,
  onSelectDay,
  onBack,
}: DayPickerProps) {
  return (
    <>
      <DoraSpeaking text={MESSAGES.choose_day} />
      <div className="mt-4 grid grid-cols-3 gap-4">
        {days.map((day) => (
          <Button
            key={day}
            onClick={() => onSelectDay(day)}
          >
            {day}
          </Button>
        ))}
      </div>
    </>
  );
}
