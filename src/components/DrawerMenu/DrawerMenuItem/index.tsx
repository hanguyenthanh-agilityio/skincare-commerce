// Icons
import { ChevronRight } from 'lucide-react';

// Components
import { LinkWrapper } from '@/components';

// UIs
import { Button } from '@/ui';

interface Props {
  label: string;
  href?: string;
  onClick?: () => void;
  hasArrow?: boolean;
  className?: string;
}

const DrawerMenuItem = ({ label, href, onClick, hasArrow = false, className = '' }: Props) => {
  const arrowIcon = hasArrow ? (
    <ChevronRight data-testid="chevron-icon" width={18} height={18} />
  ) : null;

  const baseClasses =
    'flex justify-between items-center w-full p-4 no-underline hover:underline underline-offset-2';

  return (
    <li className={`border-b list-none ${className}`}>
      {href ? (
        <LinkWrapper href={href} className={baseClasses}>
          {label}
          {arrowIcon}
        </LinkWrapper>
      ) : (
        <Button variant="ghost" onClick={onClick} className={baseClasses}>
          {label}
          {arrowIcon}
        </Button>
      )}
    </li>
  );
};

DrawerMenuItem.displayName = 'DrawerMenuItem';

export default DrawerMenuItem;
