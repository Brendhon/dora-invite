"use client";
import React from "react";
import SpeechBubble from "@/components/SpeechBubble";
import Illustration from "@/components/Illustration";
import { cn } from "@/lib/utils";
import { TEXT_SPEED } from "@/constants/utils";

type DoraGreetingProps = {
  text: string;
  speed?: number;
  className?: string;
  imgSize?: number;
  type?: ('welcome' | 'thinking' | 'select-movie' | 'select-time' | 'summary' | 'others');
  onComplete?: () => void; // callback quando terminar o texto
};

export default function DoraSpeaking({ onComplete, text, className, imgSize = 100, type = 'welcome' }: DoraGreetingProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2 w-full", className)}>
      <SpeechBubble onComplete={onComplete} speed={TEXT_SPEED} text={text} className="w-full text-center" />
      <Illustration src={`dora-${type}.png`} width={imgSize} />
    </div>
  );
}
