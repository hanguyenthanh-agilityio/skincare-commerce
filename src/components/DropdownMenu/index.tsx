import { memo } from 'react';

// Types
import type { DropdownMenuProps } from '@/types';

// UI
import { HoverCard, HoverCardTrigger, HoverCardContent, Button } from '@/ui';

// Components
import { LinkWrapper, StrapiImage } from '@/components';

const DropdownMenu = memo(({ data }: DropdownMenuProps) => (
  <nav className="relative" aria-label="Primary Mega Navigation" role="navigation">
    {data.map((menu) => (
      <HoverCard key={menu.title} openDelay={0} closeDelay={50}>
        {/* Trigger */}
        <HoverCardTrigger asChild>
          <Button
            variant="ghost"
            type="button"
            role="menuitem"
            className="px-0 py-2 font-medium"
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
          className="w-screen p-0 flex gap-8 shadow-lg z-50"
        >
          {/* Left columns */}
          <div className="w-full flex items-center p-10">
            <div className="grid grid-cols-4 gap-6 flex-1">
              {menu.columns.map((col) => (
                <div key={col.heading}>
                  <p className="font-semibold mb-4 text-base ">{col.heading}</p>
                  <ul className="space-y-4">
                    {col.items.map((item) => (
                      <li key={item}>
                        <LinkWrapper
                          href="#"
                          className="text-sm hover:underline transition-colors block focus:outline-none
                            focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                        >
                          {item}
                        </LinkWrapper>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="shrink-0">
            <StrapiImage
              image={menu.imageUrl}
              className="object-cover rounded-md h-full max-h-[600px] w-auto max-w-[300px]"
              priority={true}
              fallbackAspectRatio={0}
            />
          </div>
        </HoverCardContent>
      </HoverCard>
    ))}
  </nav>
));

export default DropdownMenu;
