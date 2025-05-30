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
    // Reset the animation
    let i = 1;
    setDisplayedText("");
    completed.current = false;

    // Set the interval
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;

      // Check if the animation has completed
      if (i > text.length) {
        clearInterval(interval);
        if (!completed.current) {
          completed.current = true;
          onComplete?.();
        }
      }
    }, speed);

    // When the component unmounts
    return () => {
      // Clear the interval
      clearInterval(interval);

      // Reset the completed state
      completed.current = true;

      // Reset the animation
      setDisplayedText("");
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
        className="whitespace-pre-line px-2 p-1"
        dangerouslySetInnerHTML={{ __html: displayedText }}
      />
    </div>
  );
}
