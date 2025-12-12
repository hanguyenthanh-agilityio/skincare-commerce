// UIs
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
  Icons,
} from '@/ui';

// Components
import { LinkWrapper } from '@/components';

interface Props {
  pathname: string;
}

const LanguageSwitcher = ({ pathname }: Props) => {
  const isVi = pathname.startsWith('/vi');
  const current = isVi ? 'VI' : 'EN';

  const switchToEn = isVi ? pathname.replace('/vi', '') || '/' : pathname;
  const switchToVi = isVi ? pathname : `/vi${pathname}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-destructive-foreground text-xs md:text-sm px-0 flex items-center gap-1"
        >
          {current}
          <Icons.DownArrow width={14} height={14} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[100px]">
        <DropdownMenuItem>
          <LinkWrapper href={switchToEn} className="w-full block">
            EN
          </LinkWrapper>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <LinkWrapper href={switchToVi} className="w-full block">
            VI
          </LinkWrapper>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
