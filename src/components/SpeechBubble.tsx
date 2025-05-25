"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type SpeechBubbleProps = {
  text: string;
  speed?: number;
  direction?: "top" | "bottom" | "left" | "right";
  className?: string;
  onComplete?: () => void;
};

export default function SpeechBubble({
  text,
  speed = 100,
  direction = "top",
  className,
  onComplete,
}: SpeechBubbleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const completed = useRef(false);

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
          onComplete?.();
        }
      }
    }, speed);

    return () => {
      clearInterval(interval);
      completed.current = true;
    };
  }, [text, speed]);

  return (
    <div
      className={cn(
        "speech-bubble",
        `speech-bubble-${direction}`,
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
