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
  // Internal string state is required because:
  const [inputValue, setInputValue] = useState<string>(String(value));

  // Keep internal state in sync when the controlled value
  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  // Clamp the value to allowed boundaries
  const clamp = (next: number) => Math.max(min, max !== undefined ? Math.min(next, max) : next);

  // Commit the current input value
  const commitValue = () => {
    const parsed = Number(inputValue);

    // Reset to previous value if input is invalid
    if (Number.isNaN(parsed)) {
      setInputValue(String(value));
      return;
    }

    const normalized = clamp(parsed);
    setInputValue(String(normalized));

    if (normalized !== value) {
      onChange(normalized);
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
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          commitValue();
        }
      }}
    />
  );
};

export default QuantityInput;
