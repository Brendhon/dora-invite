// /components/StepWrapper.tsx
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StepWrapperProps {
  children: ReactNode;
  stepKey: string;
  className?: string;
}

export function StepWrapper({ children, stepKey, className }: StepWrapperProps) {
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
      className={cn('w-full', className)}
    >
      {children}
    </motion.div>
  );
}
