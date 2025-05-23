"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type SpeechBubbleProps = {
  text: string;
  speed?: number; // tempo entre letras em ms
  className?: string;
};

export default function SpeechBubble({ text, speed = 40, className }: SpeechBubbleProps) {
  const [displayedText, setDisplayedText] = useState(" ");

  useEffect(() => {
    let i = 0;
    setDisplayedText(" "); // Reinicia ao mudar o texto

    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (i >= text.length) return prev;
        return prev + text[i];
      });
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div
      className={cn(
        "max-w-full bg-white text-gray-800 text-base rounded-xl p-4 shadow-md border border-gray-300",
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
