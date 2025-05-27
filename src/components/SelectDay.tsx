'use client';

import { MESSAGES } from "@/constants/messages";
import { filterWeekendDays, getWeekday, isFutureOrToday } from "@/lib/utils";
import AnimatedCard from "./AnimatedCard";
import DoraStep from "./DoraStep";

type DayPickerProps = {
  days: string[];
  onSelectDay: (day: string | null) => void;
  onComplete?: () => void;
};

export default function SelectDay({ days, onSelectDay, onComplete }: DayPickerProps) {
  // Filter out days that are not today or in the future
  const validDays = filterWeekendDays(days.filter(isFutureOrToday));

  // Filter out days that are not today or in the future
  const allCards = [
    ...validDays.map((dateStr, idx) => ({
      key: dateStr,
      title: getWeekday(dateStr),
      dateStr,
      index: idx,
    })),
    {
      key: "outro",
      title: "Outro dia",
      dateStr: undefined,
      index: validDays.length,
    },
  ];

  return (
    <DoraStep
      text={MESSAGES.choose_day}
      type="thinking"
      direction="col-reverse"
      onComplete={onComplete}
    >
      <div className="grid grid-cols-1 gap-6 w-full max-w-md">
        {allCards.map(({ key, title, dateStr, index }) => (
          <AnimatedCard
            key={key}
            index={index}
            onClick={() => onSelectDay(dateStr || null)}
            className="w-full p-6"
          >
            <p className="text-lg font-semibold text-primary">{title}</p>
            {dateStr && <p className="text-sm mt-1 text-gray-600">{dateStr}</p>}
          </AnimatedCard>
        ))}
      </div>
    </DoraStep>

  );
}
