"use client";
import React from "react";
import SpeechBubble from "@/components/SpeechBubble";
import Illustration from "@/components/Illustration";
import { cn } from "@/lib/utils";

type DoraGreetingProps = {
  text: string;
  speed?: number;
  className?: string;
};

export default function DoraSpeaking({ text, speed, className }: DoraGreetingProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <Illustration src="dora.png" width={180} />
      <SpeechBubble speed={100} text={text} />
    </div>
  );
}
