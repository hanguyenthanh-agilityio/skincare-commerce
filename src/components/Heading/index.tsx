import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode | string;
  className?: string;
}

export const Heading = ({ variant = 'h2', className, children }: HeadingProps) => {
  const headingStyles = {
    h1: 'text-4xl',
    h2: 'text-3xl/10',
    h3: 'text-xl/8 font-medium',
    h4: 'text-lg',
    h5: 'text-base',
    h6: 'text-sm',
  };

  const Element = variant;
  const baseStyles = 'font-normal text-orange-600';
  const combinedStyles = cn(baseStyles, headingStyles[variant], className);

  return <Element className={combinedStyles}>{children}</Element>;
};
