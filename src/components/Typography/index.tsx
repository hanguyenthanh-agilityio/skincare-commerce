import React from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  title: string;
  level: 'p' | 'span';
  className?: string;
}

const TypographyWrapper: React.FC<TagProps> = ({ title, level, className }) => {
  const defaultClasses: Record<string, string> = {
    p: 'text-base/7',
    span: 'text-sm/6',
  };

  const TagElement = level;

  return (
    <TagElement className={cn('text-destructive-foreground', defaultClasses[level], className)}>
      {title}
    </TagElement>
  );
};

export default TypographyWrapper;
