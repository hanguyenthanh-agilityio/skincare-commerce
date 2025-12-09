import React from 'react';
import { cn } from '@/lib';

interface HeadingProps {
  title?: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

const HeadingWrapper: React.FC<HeadingProps> = ({ title, level, className }) => {
  const defaultClasses: Record<string, string> = {
    h1: 'text-4xl/10',
    h2: 'text-3xl/10',
    h3: 'text-xl/8 font-medium',
    h4: 'text-lg',
    h5: 'text-base',
    h6: 'text-sm',
  };

  const Tag = level;

  return (
    <Tag className={cn('text-destructive-foreground', defaultClasses[level], className)}>
      {title}
    </Tag>
  );
};

export default HeadingWrapper;
