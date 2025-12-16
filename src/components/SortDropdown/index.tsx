// Components
import { TypographyWrapper } from '@/components';

// UIs
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
  value?: SortValue;
  onChange?: (value: SortValue) => void;
  className?: string;
}

const SortDropdown = ({ content, value = 'none', onChange, className }: SortDropdownProps) => {
  const { label, options } = content;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label={label}
          className={cn('flex items-center gap-2', className)}
        >
          <TypographyWrapper
            level="span"
            title={`${label}:`}
            className="uppercase text-muted-foreground"
          />
          <TypographyWrapper level="span" title={options[value]} className="font-bold" />
          <Icons.DownArrow aria-hidden className="size-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuRadioGroup value={value} onValueChange={(v) => onChange?.(v as SortValue)}>
          {SORT_VALUES.map((sortValue) => (
            <DropdownMenuRadioItem key={sortValue} value={sortValue}>
              {options[sortValue]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;
