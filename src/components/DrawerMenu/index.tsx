import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/ui';
import MenuItem from '@/components/MenuItem';
import { DropdownMenuData } from '@/data/navigation';
import { Button, Icons } from '@/ui';

interface NavLink {
  label: string;
  href: string;
}

interface Props {
  data: typeof DropdownMenuData;
  navLinks: NavLink[];
}

const MobileMenuDrawer: React.FC<Props> = ({ data, navLinks }) => {
  const [activeMenu, setActiveMenu] = useState<(typeof DropdownMenuData)[0] | null>(null);

  const handleBack = () => setActiveMenu(null);

  return (
    <Sheet>
      {/* Hamburger button */}
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-2" aria-label="Open Menu">
          <Icons.Hamburger />
        </Button>
      </SheetTrigger>

      {/* Drawer content */}
      <SheetContent side="left" className="flex flex-col w-full max-w-full">
        {/* Header */}
        <SheetHeader className="h-10 flex items-start justify-between border-b border-black p-0 gap-0">
          {activeMenu ? (
            <Button variant="ghost" className="px-3" onClick={handleBack} aria-label="Back">
              <ChevronLeft width={18} height={18} />
            </Button>
          ) : (
            <div />
          )}
        </SheetHeader>

        {/* Menu content */}
        <div className="flex-1 overflow-y-auto">
          {!activeMenu ? (
            <ul className="divide-y">
              {data.map((menu) => (
                <MenuItem
                  key={menu.title}
                  label={menu.title}
                  onClick={() => setActiveMenu(menu)}
                  hasArrow
                />
              ))}

              {navLinks.map((link) => (
                <MenuItem key={link.label} label={link.label} href={link.href} />
              ))}
            </ul>
          ) : (
            <div className="p-4">
              {activeMenu.columns.map((col) => (
                <div key={col.heading} className="mb-6">
                  <p className="font-semibold mb-2 text-base">{col.heading}</p>
                  <ul className="flex flex-col gap-2">
                    {col.items.map((item) => (
                      <MenuItem key={item} label={item} href="#" />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuDrawer;
