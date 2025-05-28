'use client';

import { MESSAGES } from "@/constants/messages";
import { getDoraDayMessage, getWeekday, isFutureOrToday, parseDate } from "@/lib/utils";
import AnimatedCard from "./AnimatedCard";
import DoraStep from "./DoraStep";

type DayPickerProps = {
  days: string[];
  onSelectDay: (day: string | null) => void;
  onComplete?: () => void;
};

export default function SelectDay({ days, onSelectDay, onComplete }: DayPickerProps) {
  // Filter out days that are not today or in the future
  const validDays = days
    .filter(isFutureOrToday)
    .sort((a, b) => parseDate(a).toMillis() - parseDate(b).toMillis())

  // Filter out days that are not today or in the future
  const allCards = [
    ...validDays.map((dateStr, idx) => ({
      key: dateStr,
      value: dateStr,
      title: getWeekday(dateStr),
      description: getDoraDayMessage(dateStr),
      index: idx,
    })),
    {
      key: "outro",
      value: undefined,
      title: MESSAGES.other_day.title,
      description: MESSAGES.other_day.description,
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
        {allCards.map(({ key, title, value, description, index }) => (
          <AnimatedCard
            key={key}
            index={index}
            onClick={() => onSelectDay(value || null)}
            className="w-full p-6"
          >
            <p className="text-lg font-bold text-primary">{title}</p>
            {description && (
              <p className="text-sm mt-1 text-gray-600">
                {description}
              </p>
            )}
          </AnimatedCard>
        ))}
      </div>
    </DoraStep>

  );
}
