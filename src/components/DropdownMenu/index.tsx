import { memo } from 'react';

// Types
import type { DropdownMenuProps } from '@/types';

// UI
import { HoverCard, HoverCardTrigger, HoverCardContent, Button } from '@/ui';

// Components
import LinkWrapper from '@/components/LinkWrapper';
import StrapiImage from '@/components/StrapiImage';

const DropdownMenu = memo(({ data }: DropdownMenuProps) => (
  <nav className="flex items-center gap-6" aria-label="Primary Mega Navigation" role="navigation">
    {data.map((menu) => (
      <HoverCard key={menu.title}>
        {/* Trigger */}
        <HoverCardTrigger asChild>
          <Button
            variant="ghost"
            type="button"
            role="menuitem"
            className="px-0"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {menu.title}
          </Button>
        </HoverCardTrigger>

        {/* Panel */}
        <HoverCardContent
          role="menu"
          aria-label={`${menu.title} submenu`}
          className="absolute top-full left-0 w-screen shadow-lg z-50 p-0"
        >
          <div className="flex justify-between items-center w-full">
            {/* Columns */}
            <div className="grid grid-cols-4 xl:gap-x-16 gap-x-10 px-8 py-6 w-3/4">
              {menu.columns.map((col) => (
                <div key={col.heading} className="space-y-4">
                  <p className="font-semibold text-base">{col.heading}</p>
                  <ul className="space-y-4">
                    {col.items.map((item) => (
                      <li key={item}>
                        <LinkWrapper
                          href="#"
                          className="block text-sm hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                        >
                          {item}
                        </LinkWrapper>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="w-1/4 flex items-stretch justify-end p-0">
              <StrapiImage
                image={menu.imageUrl}
                className="h-full w-full object-contain max-h-11/12 max-w-9/12"
                priority={true}
                fallbackAspectRatio={0}
              />
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    ))}
  </nav>
));

export default DropdownMenu;
