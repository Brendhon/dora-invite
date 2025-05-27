import { LoaderCircle } from "lucide-react";

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <LoaderCircle className={`w-6 h-6 animate-spin text-purple-500 ${className}`} />
  );
}
