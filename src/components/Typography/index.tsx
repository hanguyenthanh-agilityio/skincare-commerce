import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  variant?: 'p' | 'span';
  paragraphSize?: 'default' | 'xs';
  spanSize?: 'default' | 'xs';
  className?: string;
  children: ReactNode;
}

export const Typography = ({
  variant = 'p',
  paragraphSize = 'default',
  spanSize = 'default',
  className = '',
  children,
}: TypographyProps) => {
  const paragraphSizeStyles = { default: 'text-base/7', xs: 'text-sm/6 font-bold tracking-[-2%]' };

  const spanSizeStyles = {
    default: 'text-sm/6 tracking-[-1%]',
    xs: 'text-xs leading-100 tracking-[2%]',
  };

  const baseStyles = 'text-destructive-foreground font-normal';
  const styles = variant === 'p' ? paragraphSizeStyles[paragraphSize] : spanSizeStyles[spanSize];
  const Element = variant;

  const combinedStyles = cn(baseStyles, styles, className);

  return <Element className={combinedStyles}>{children}</Element>;
};
