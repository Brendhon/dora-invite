import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import DoraSpeaking from "./DoraSpeaking";

type DoraStepProps = {
  text: string;
  type?: 'welcome' | 'thinking' | 'select-movie' | 'select-time' | 'summary' | 'others';
  speed?: number;
  direction?: "normal" | "reverse"; // layout da imagem e fala
  children: React.ReactNode;
};

export default function DoraStep({
  text,
  type = "welcome",
  speed,
  direction = "normal",
  children,
}: DoraStepProps) {
  // Estado para controlar se a fala terminou
  const [done, setDone] = useState(false);

  // Callback para quando a fala termina
  const handleComplete = useCallback(() => setDone(true), []);

  return (
    <div className="flex flex-col items-center gap-6">
      <DoraSpeaking
        text={text}
        type={type}
        speed={speed}
        onComplete={handleComplete}
        className={direction === "reverse" ? "flex-row-reverse" : ""}
      />

      <AnimatePresence>
        {done && (
          <motion.div
            key="children"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
