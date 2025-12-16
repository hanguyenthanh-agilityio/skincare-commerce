import { useState, type ChangeEvent } from 'react';
import { cn } from '@/lib';

// Components
import { Slider, Input, Label } from '@/ui';

interface PriceRangeProps {
  title: string;
  labels: {
    from: string;
    to: string;
  };
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  className?: string;
}

const PriceRange = ({
  title,
  labels: { from, to },
  min = 0,
  max = 1000,
  step = 10,
  value = [200, 800],
  onChange,
  className,
}: PriceRangeProps) => {
  const [range, setRange] = useState<[number, number]>(value);

  const updateRange = (next: [number, number]) => {
    const clamped: [number, number] = [
      Math.max(min, Math.min(next[0], next[1])),
      Math.min(max, Math.max(next[1], next[0])),
    ];

    setRange(clamped);
    onChange?.(clamped);
  };

  const handleSliderChange = ([from, to]: number[]) => {
    updateRange([from, to]);
  };

  const handleInputChange = (index: 0 | 1) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;

    const next: [number, number] = index === 0 ? [value, range[1]] : [range[0], value];

    updateRange(next);
  };

  return (
    <div className={cn('space-y-8 max-w-sm mx-5', className)}>
      <Label className="text-xl mb-5">{title}</Label>

      {/* Slider */}
      <Slider value={range} min={min} max={max} step={step} onValueChange={handleSliderChange} />

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="min price">{from}</Label>
          <Input
            type="number"
            id="min price"
            value={range[0]}
            min={min}
            max={range[1]}
            onChange={handleInputChange(0)}
          />
        </div>

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="max price">{to}</Label>
          <Input
            type="number"
            id="max price"
            value={range[1]}
            min={range[0]}
            max={max}
            onChange={handleInputChange(1)}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
