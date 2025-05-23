"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type SpeechBubbleProps = {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
};

export default function SpeechBubble({
  text,
  speed = 100,
  className,
  onComplete,
}: SpeechBubbleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const completed = useRef(false); // controle interno

  useEffect(() => {
    let i = 1;
    setDisplayedText("");
    completed.current = false;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;

      if (i > text.length) {
        clearInterval(interval);
        if (!completed.current) {
          completed.current = true;
          onComplete?.(); // só chama se ainda não foi chamado
        }
      }
    }, speed);

    return () => {
      clearInterval(interval);
      completed.current = true; // evita chamar após desmontar/reiniciar
    };
  }, [text, speed]);

  return (
    <div
      className={cn(
        "max-w-full bg-white text-gray-800 text-base rounded-xl p-3 shadow-md border border-gray-300",
        className
      )}
    >
      <p
        className="whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: displayedText }}
      />
    </div>
  );
}
