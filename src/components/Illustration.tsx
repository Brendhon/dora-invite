import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  className?: string;
  src: string;
  width?: number;
}

export default function Illustration({
  className = '',
  src,
  width = 400,
}: Props) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <Image
        alt="Illustration"
        priority
        src={`/doras/${src}`}
        width={width}
        height={width}
        style={{
          width: `${width}px`,
          height: 'auto',
        }}
        className="object-contain"
      />
    </div>
  );
}
