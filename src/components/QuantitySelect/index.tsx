import { useState } from 'react';

// Libs
import { cn } from '@/lib';

// UIs
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/ui';

interface Props {
  value: number;
  className?: string;
}

const QUANTITIES = [1, 2, 3, 4, 5];

const QuantitySelect = ({ value, className }: Props) => {
  const [quantity, setQuantity] = useState(String(value));

  return (
    <Select value={quantity} onValueChange={setQuantity}>
      <SelectTrigger className={cn('h-10 w-16', className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {QUANTITIES.map((q) => (
          <SelectItem key={q} value={String(q)}>
            {q}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default QuantitySelect;
