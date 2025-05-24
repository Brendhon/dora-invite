"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type AnimatedCardProps = {
  index: number;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function AnimatedCard({ index, onClick, children }: AnimatedCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={cn("bg-white rounded-xl border p-4 shadow-md hover:shadow-lg transition-shadow", onClick && "cursor-pointer")}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: index * 0.5 + 1,
      }}
    >
      {children}
    </motion.div>
  );
}
