import { useEffect, useState } from 'react';

// Libs
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

// Handles number input correctly
const QuantityInput = ({ value, min = 1, max, disabled, className, onChange }: Props) => {
  const [inputValue, setInputValue] = useState(String(value));

  // Keep internal state in sync when the controlled value
  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const commitValue = () => {
    const next = Number(inputValue);

    if (!Number.isFinite(next)) {
      setInputValue(String(value));

      return;
    }

    if (next !== value) {
      onChange(next);
    }
  };

  return (
    <Input
      type="number"
      value={inputValue}
      min={min}
      max={max}
      disabled={disabled}
      className={cn('h-10 w-14', className)}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={commitValue}
      onKeyDown={(e) => e.key === 'Enter' && commitValue()}
    />
  );
};

export default QuantityInput;
