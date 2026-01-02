// Libs
import { cn } from '@/lib';

// UIs
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/ui';

interface Props {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const QUANTITIES = [1, 2, 3, 4, 5];

const QuantitySelect = ({ value, onChange, className }: Props) => (
  <Select value={String(value)} onValueChange={(val) => onChange(Number(val))}>
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

export default QuantitySelect;
