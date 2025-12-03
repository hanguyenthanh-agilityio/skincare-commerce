import React from 'react';

// Icons
import { ChevronRight } from 'lucide-react';

// Components
import LinkWrapper from '@/components/LinkWrapper';

// UIs
import { Button } from '@/ui';

interface Props {
  label: string;
  href?: string;
  onClick?: () => void;
  hasArrow?: boolean;
}

const DrawerMenuItem: React.FC<Props> = ({ label, href, onClick, hasArrow = false }) => {
  return (
    <li className="border-b">
      {href ? (
        <LinkWrapper
          href={href}
          className="flex justify-between items-center w-full p-4 no-underline hover:underline underline-offset-2"
        >
          {label}
          {hasArrow && <ChevronRight data-testid="chevron-icon" width={18} height={18} />}
        </LinkWrapper>
      ) : (
        <Button
          variant="ghost"
          onClick={onClick}
          className="flex justify-between items-center w-full p-4 no-underline hover:underline underline-offset-2"
        >
          {label}
          {hasArrow && <ChevronRight data-testid="chevron-icon" width={18} height={18} />}
        </Button>
      )}
    </li>
  );
};

DrawerMenuItem.displayName = 'DrawerMenuItem';

export default DrawerMenuItem;
