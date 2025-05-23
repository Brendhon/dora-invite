import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from '@headlessui/react';
import { Loader2 } from 'lucide-react';

// Button props
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

// Button component - A reusable button component that accepts variant and children props
export default ({
  className,
  children,
  loading = false,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <Button
      className={cn('bg-primary text-white rounded-md p-3 hover:bg-purple-800 transition mt-4', className)}
      disabled={disabled || loading}
      {...props}>
      <span className={cn({ 'opacity-0': loading })}>{children}</span>
      {loading && <Loader2 className="animate-spin text-white absolute flex items-center justify-center" />}
    </Button>
  );
}