"use client";
import React from "react";
import SpeechBubble from "@/components/SpeechBubble";
import Illustration from "@/components/Illustration";
import { cn } from "@/lib/utils";

type DoraGreetingProps = {
  text: string;
  speed?: number;
  className?: string;
  imgSize?: number;
  type?: ('welcome' | 'thinking' | 'select-movie' | 'select-time' | 'summary' | 'others');
};

export default function DoraSpeaking({ text, speed = 50, className, imgSize = 100, type = 'welcome' }: DoraGreetingProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <SpeechBubble speed={speed} text={text} className="w-[320px] text-center" />
      <Illustration src={`dora-${type}.png`} width={imgSize} />
    </div>
  );
}
