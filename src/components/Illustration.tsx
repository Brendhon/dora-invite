import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  className?: string;
  src: string;
  width?: number;
}

export default ({ className = '', src, width = 400 }: Props) => {
  // Return the illustration component
  return (
    <div className={cn("flex-col items-center flex", className)}>
      <Image
        alt='Illustration'
        width={width}
        height={width}
        src={`/${src}`}
        className={cn("h-auto object-contain", `w-[${width}px]`)}
      />
    </div>
  )
};