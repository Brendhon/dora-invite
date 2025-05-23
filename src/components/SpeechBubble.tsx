"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type SpeechBubbleProps = {
  text: string;
  speed?: number; // tempo entre letras em ms
  className?: string;
};

export default function SpeechBubble({ text, speed = 80, className }: SpeechBubbleProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 1;                // começamos no 1 pra já fatiar ao menos 1 caractere
    setDisplayedText("");     // resetar sempre que `text` muda

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));   // slice garante que cada fatia esteja sempre correta
      i++;
      if (i > text.length) {
        clearInterval(interval);
      }
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
