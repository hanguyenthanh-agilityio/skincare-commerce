import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { cn } from '@/lib';

// UI
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
  paramNames?: {
    min: string;
    max: string;
  };
  className?: string;
}

const PriceRange = ({
  title,
  labels: { from, to },
  min = 0,
  max = 2000,
  step = 100,
  paramNames = { min: 'minPrice', max: 'maxPrice' },
  className,
}: PriceRangeProps) => {
  const getInitialRange = (): [number, number] => {
    if (typeof window === 'undefined') return [min, max];

    const url = new URL(window.location.href);
    const minParam = Number(url.searchParams.get(paramNames.min));
    const maxParam = Number(url.searchParams.get(paramNames.max));

    return [
      Number.isNaN(minParam) ? min : Math.max(min, minParam),
      Number.isNaN(maxParam) ? max : Math.min(max, maxParam),
    ];
  };

  const [range, setRange] = useState<[number, number]>(getInitialRange);

  const debounceRef = useRef<number | null>(null);

  const updateUrl = (next: [number, number]) => {
    const url = new URL(window.location.href);

    url.searchParams.set(paramNames.min, String(next[0]));
    url.searchParams.set(paramNames.max, String(next[1]));

    // Reset pagination when filtering
    url.searchParams.delete('page');

    window.location.href = url.toString();
  };

  const applyChange = (next: [number, number]) => {
    setRange(next);

    window.clearTimeout(debounceRef.current!);

    debounceRef.current = window.setTimeout(() => {
      updateUrl(next);
    }, 400);
  };

  const handleSliderChange = ([fromValue, toValue]: number[]) => {
    applyChange([
      Math.max(min, Math.min(fromValue, toValue)),
      Math.min(max, Math.max(fromValue, toValue)),
    ]);
  };

  const handleInputChange = (index: 0 | 1) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;

    const next: [number, number] = index === 0 ? [value, range[1]] : [range[0], value];

    applyChange([
      Math.max(min, Math.min(next[0], next[1])),
      Math.min(max, Math.max(next[1], next[0])),
    ]);
  };

  useEffect(() => {
    return () => window.clearTimeout(debounceRef.current!);
  }, []);

  return (
    <div className={cn('space-y-8 max-w-sm', className)}>
      <Label className="text-xl">{title}</Label>

      {/* Slider */}
      <Slider value={range} min={min} max={max} step={step} onValueChange={handleSliderChange} />

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="min-price">{from}</Label>
          <Input
            id="min-price"
            type="number"
            value={range[0]}
            min={min}
            max={range[1]}
            onChange={handleInputChange(0)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="max-price">{to}</Label>
          <Input
            id="max-price"
            type="number"
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
