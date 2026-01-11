// UIs
import { cn } from '@/lib';

// UIs
import { Input } from '@/ui';

interface Props {
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  onChange: (value: number) => void;
}

const QuantityInput = ({ value, min = 1, max, className, disabled, onChange }: Props) => {
  const normalizeQuantity = (v: number) => Math.max(min, max ? Math.min(v, max) : v);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    if (Number.isNaN(next)) return;

    onChange(normalizeQuantity(next));
  };
  return (
    <div className="flex gap-2">
      <Input
        type="number"
        min={min}
        max={max}
        value={value}
        className={cn('h-10 w-14', className)}
        disabled={disabled}
        onChange={handleChange}
      />
    </div>
  );
};

export default QuantityInput;
