import { useState } from 'react';

// Components
import { TypographyWrapper } from '@/components';

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

// Libs
import { cn } from '@/lib';

// Types
import type { SortContent, SortValue } from '@/types';

// Constants
import { SORT_VALUES } from '@/constants';

interface SortDropdownProps {
  content: SortContent;
  defaultValue?: SortValue;
  value: SortValue;
  onSortChange?: (value: SortValue) => void;
  className?: string;
}

const SortDropdown = ({ content, value, className }: SortDropdownProps) => {
  const { label, options } = content;
  const [open, setOpen] = useState(false);

  const handleValueChange = (value: SortValue) => {
    const params = new URLSearchParams(window.location.search);

    params.set('sort', value);

    // Trigger Astro page reload (correct behavior)
    window.location.search = params.toString();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label={label}
          className={cn('flex items-center gap-2 p-0 md:px-3 md:py-2', className)}
        >
          <TypographyWrapper
            level="span"
            title={`${label}:`}
            className="uppercase text-xs text-muted-foreground"
          />

          <TypographyWrapper level="span" title={options[value]} className="font-semibold" />

          <Icons.DownArrow
            aria-hidden
            className={cn('size-4 transition-transform duration-200', open && 'rotate-180')}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(v) => handleValueChange(v as SortValue)}
        >
          {SORT_VALUES.map((sortValue) => (
            <DropdownMenuRadioItem key={sortValue} value={sortValue} className="cursor-pointer">
              {options[sortValue]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;
