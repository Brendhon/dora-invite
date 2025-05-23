import { MESSAGES } from "@/constants/messages";
import DoraSpeaking from "./DoraSpeaking";

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

export default function SelectDay({ days, onSelectDay }: DayPickerProps) {
  // Filtra apenas os dias que caem no final de semana (sábado ou domingo)
  const weekendDays = days.filter((dateStr) => {
    const [day, month, year] = dateStr.split("/");
    const dateObj = new Date(`${year}-${month}-${day}`);
    const dayOfWeek = dateObj.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  });

  // card
  type CardProps = {
    title: string;
    dateStr?: string;
  };

  const Card: React.FC<CardProps> = ({ title, dateStr }) => (
    <div
      className="bg-white rounded-xl border p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onSelectDay(dateStr || null)}
    >
      <p className="text-lg font-semibold text-purple-700 capitalize-first">{title}</p>
      {dateStr && <p className="text-sm mt-3 text-gray-600">{dateStr}</p>}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <DoraSpeaking text={MESSAGES.choose_day} className="flex-row-reverse" type="thinking" />

      <div className="grid grid-cols-1 gap-4 w-full max-w-md overflow-auto max-h-96">
        {weekendDays.map((dateStr) => <Card key={dateStr} title={getWeekday(dateStr)} dateStr={dateStr} />)}

        {/* Other weekend */}
        <Card title={'Outro final de semana'} />
      </div>
    </div>
  );
}
