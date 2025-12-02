import React, { memo } from 'react';

// UI
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/ui';

// Components
import { ImageWrapper, LinkWrapper } from '@/components';

// Types
import type { HeaderMenuProps } from '@/types/navigation';

const HeaderMenu = memo(({ data }: HeaderMenuProps) => {
  return (
    <nav className="flex items-center gap-6" aria-label="Primary Mega Navigation" role="navigation">
      {data.map((menu) => (
        <HoverCard key={menu.title}>
          {/* Trigger */}
          <HoverCardTrigger asChild>
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-sm"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {menu.title}
            </button>
          </HoverCardTrigger>

          {/* Panel */}
          <HoverCardContent
            role="menu"
            aria-label={`${menu.title} submenu`}
            className="absolute top-full left-0 w-screen shadow-lg z-50 p-0"
          >
            <div className="flex justify-center items-center w-full">
              {/* Columns */}
              <div className="grid grid-cols-4 xl:gap-x-16 gap-x-10 px-8 py-6 w-3/4">
                {menu.columns.map((col) => (
                  <div key={col.heading} className="space-y-4">
                    <h4 className="font-semibold text-base">{col.heading}</h4>

                    <ul className="space-y-2">
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
                <ImageWrapper
                  src={menu.imageUrl}
                  alt={`${menu.title} preview image`}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </nav>
  );
});

HeaderMenu.displayName = 'HeaderMenu';
export default HeaderMenu;
