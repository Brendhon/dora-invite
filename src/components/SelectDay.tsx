'use client';

import { MESSAGES } from "@/constants/messages";
import DoraStep from "./DoraStep";
import { motion } from "framer-motion";

type DayPickerProps = {
  days: string[];
  onSelectDay: (day: string | null) => void;
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

type CardProps = {
  title: string;
  dateStr?: string;
  index: number;
  onClick: () => void;
};

const Card = ({ title, dateStr, index, onClick }: CardProps) => (
  <motion.div
    onClick={onClick}
    className="bg-white rounded-xl border p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
    initial={{ opacity: 0, x: 100 }} // começa mais à direita
    animate={{ opacity: 1, x: 0 }}   // vai até o centro
    transition={{
      type: "spring",
      stiffness: 80,     // mais moleza
      damping: 12,       // menos "pulo"
      delay: index * 0.5 + 1 // entrada em sequência
    }}
  >
    <p className="text-lg font-semibold text-purple-700 capitalize-first">{title}</p>
    {dateStr && <p className="text-sm mt-3 text-gray-600">{dateStr}</p>}
  </motion.div>
);

export default function SelectDay({ days, onSelectDay }: DayPickerProps) {
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
    <DoraStep text={MESSAGES.choose_day} type="thinking" direction="reverse">
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {allCards.map(({ key, title, dateStr, index }) => (
          <Card
            key={key}
            title={title}
            dateStr={dateStr}
            index={index}
            onClick={() => onSelectDay(dateStr || null)}
          />
        ))}
      </div>
    </DoraStep>
  );
}
