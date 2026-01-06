// Libs
import { useRef } from 'react';
import { cn } from '@/lib';

// UIs
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/ui';

interface Props {
  value: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
}

const DEFAULT_MAX = 5;

const QuantitySelect = ({ value, onChange, className, max }: Props) => {
  const upperBoundRef = useRef(Math.max(value, max ?? DEFAULT_MAX));

  return (
    <Select value={String(value)} onValueChange={(val) => onChange(Number(val))}>
      <SelectTrigger className={cn('h-10 w-16', className)}>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {Array.from({ length: upperBoundRef.current }, (_, i) => i + 1).map((q) => (
          <SelectItem key={q} value={String(q)}>
            {q}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default QuantitySelect;
