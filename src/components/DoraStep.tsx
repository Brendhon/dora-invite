import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import DoraSpeaking from "./DoraSpeaking";
import { cn } from "@/lib/utils";

type DoraStepProps = {
  text: string;
  type?: 'welcome' | 'thinking' | 'select-movie' | 'select-time' | 'summary' | 'others';
  speed?: number;
  direction?: "row" | "row-reverse" | 'col' | 'col-reverse';
  children: React.ReactNode;
  onComplete?: () => void;
};

export default function DoraStep({
  text,
  type = "welcome",
  speed,
  direction = "col-reverse",
  children,
  onComplete,
}: DoraStepProps) {
  // Estado para controlar se a fala terminou
  const [done, setDone] = useState(false);

  // Callback para quando a fala termina
  const handleComplete = useCallback(() => {
    setDone(true)
    onComplete?.();
  }, []);

  // Form direction class
  const formDirectionClass = {
    row: "flex-row",
    "row-reverse": "flex-row-reverse",
    col: "flex-col",
    "col-reverse": "flex-col-reverse",
  };

  const className = formDirectionClass[direction];

  return (
    <div className="flex flex-col items-center gap-y-8 px-2 w-full max-w-2xl mx-auto">
      <DoraSpeaking
        text={text}
        type={type}
        speed={speed}
        onComplete={handleComplete}
        className={className}
      />

      <AnimatePresence>
        {done && (
          <motion.div
            key="children"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
