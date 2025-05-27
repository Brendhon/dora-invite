import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "@headlessui/react";
import { Loader2 } from "lucide-react";

// Dora Button Props
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

export default ({
  className,
  children,
  loading = false,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <Button
      className={cn(
        "relative flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-medium text-white text-base bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all duration-200 shadow-md",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <span className={cn({ "opacity-0": loading })}>{children}</span>

      {loading && (
        <Loader2 className="absolute h-5 w-5 animate-spin text-white" />
      )}
    </Button>
  );
};
