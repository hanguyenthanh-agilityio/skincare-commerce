import { memo } from 'react';

// Types
import type { DropdownMenuProps } from '@/types';

// shadCN
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
} from '@/ui';

// Components
import { LinkWrapper, StrapiImage } from '@/components';

// Lib
import { cn } from '@/lib';

const DropdownMenu = memo(({ data, className }: DropdownMenuProps) => {
  if (!data?.length) return null;

  return (
    <NavigationMenu className={cn('relative z-50', className)}>
      <NavigationMenuList className="flex gap-6">
        {data.map((menu) => (
          <NavigationMenuItem key={menu.title}>
            <NavigationMenuTrigger className="px-0 py-2 font-medium bg-transparent">
              {menu.title}
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <div className="dropdown-mega">
                <div className="grid grid-cols-[1fr_280px] gap-10 dropdown-mega-content">
                  {/* LEFT */}
                  <div className="grid grid-cols-4 gap-8 md:p-4 lg:p-8">
                    {menu.columns.map((col) => (
                      <div key={col.heading}>
                        <p className="font-semibold mb-4">{col.heading}</p>

                        <ul className="space-y-3">
                          {col.items.map((item) => (
                            <li key={item.href}>
                              <LinkWrapper
                                href={item.href}
                                className="text-sm hover:underline block"
                              >
                                {item.label}
                              </LinkWrapper>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="relative">
                    <StrapiImage
                      image={menu.imageUrl}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                      priority
                    />
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>

      <NavigationMenuViewport className="absolute top-full left-0 mt-2 w-full max-w-screen-lg bg-white border shadow-lg rounded-xl" />
    </NavigationMenu>
  );
});

export default DropdownMenu;
