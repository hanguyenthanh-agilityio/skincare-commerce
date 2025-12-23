import { useState } from 'react';

// UI
import {
  Button,
  Icons,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/ui';

// Components
import { TypographyWrapper } from '@/components';

// Lib
import { cn } from '@/lib';

interface RadioDropdownProps<T extends string> {
  label?: string;
  value: T;
  emptyLabel?: string;
  options: Record<T, string>;
  values: readonly T[];
  onChange: (value: T) => void;
  className?: string;
}

const RadioDropdown = <T extends string>({
  label,
  value,
  options,
  emptyLabel,
  values,
  onChange,
  className,
}: RadioDropdownProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label={label}
          className={cn('flex justify-start items-center gap-2 p-0 md:px-3 md:py-2', className)}
        >
          {label && (
            <TypographyWrapper
              level="span"
              title={`${label}:`}
              className="uppercase text-xs text-destructive-foreground font-medium"
            />
          )}

          <TypographyWrapper
            level="span"
            title={value ? options[value] : (emptyLabel ?? '')}
            className="font-semibold"
          />

          <Icons.DownArrow
            aria-hidden
            className={cn('size-4 transition-transform duration-200', open && 'rotate-180')}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup value={value} onValueChange={(v) => onChange(v as T)}>
          {values.map((v) => (
            <DropdownMenuRadioItem key={v} value={v} className="cursor-pointer">
              {options[v]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RadioDropdown;
