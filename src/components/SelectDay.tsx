'use client';

import { MESSAGES } from "@/constants/messages";
import AnimatedCard from "./AnimatedCard";
import DoraStep from "./DoraStep";

type DayPickerProps = {
  days: string[];
  onSelectDay: (day: string | null) => void;
  onComplete?: () => void;
};

function getWeekday(dateStr: string) {
  const [day, month, year] = dateStr.split("/");
  const date = new Date(`${year}-${month}-${day}`);
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default function SelectDay({ days, onSelectDay, onComplete }: DayPickerProps) {
  const weekendDays = days.filter((dateStr) => {
    const [day, month, year] = dateStr.split("/");
    const dateObj = new Date(`${year}-${month}-${day}`);
    const dayOfWeek = dateObj.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  });

  const allCards = [
    ...weekendDays.map((dateStr, idx) => ({
      key: dateStr,
      title: getWeekday(dateStr),
      dateStr,
      index: idx,
    })),
    {
      key: "outro",
      title: "Outro final de semana",
      dateStr: undefined,
      index: weekendDays.length,
    },
  ];

  return (
    <DoraStep text={MESSAGES.choose_day} type="thinking" direction="col-reverse" onComplete={onComplete}>
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {allCards.map(({ key, title, dateStr, index }) => (
          <AnimatedCard
            key={key}
            index={index}
            onClick={() => onSelectDay(dateStr || null)}
          >
            <p className="text-lg font-semibold text-purple-700 capitalize-first">{title}</p>
            {dateStr && <p className="text-sm mt-3 text-gray-600">{dateStr}</p>}
          </AnimatedCard>
        ))}
      </div>
    </DoraStep>
  );
}
