import React, { useState } from 'react';

// Icons
import { ChevronLeft } from 'lucide-react';

// UIs
import { Sheet, SheetContent, SheetHeader, SheetTrigger, Button, Icons } from '@/ui';

// Components
import DrawerMenuItem from '@/components/DrawerMenuItem';

// Types
import type { DrawerMenuProps, MenuItem, NavLink } from '@/types/navigation';

interface DrawerMenuNavProps {
  data: MenuItem[];
  navLinks: NavLink[];
  onOpenSub: (menu: MenuItem) => void;
}

interface DrawerMenuSubProps {
  menu: MenuItem;
}

// Main component
const DrawerMenu = ({ data, navLinks }: DrawerMenuProps) => {
  const [activeMenu, setActiveMenu] = useState<MenuItem | null>(null);

  const handleBack = () => setActiveMenu(null);
  return (
    <Sheet>
      {/* Hamburger button */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="p-2"
          aria-label="Open navigation drawer"
          aria-expanded={activeMenu !== null}
        >
          <Icons.Hamburger />
        </Button>
      </SheetTrigger>

      {/* Drawer content */}
      <SheetContent side="left" className="flex flex-col w-full max-w-full">
        {/* Header */}
        <SheetHeader className="h-10 flex items-start justify-between border-b border-black p-0 gap-0">
          {activeMenu && (
            <Button
              variant="ghost"
              className="px-3"
              onClick={handleBack}
              aria-label="Back to main menu"
            >
              <ChevronLeft width={18} height={18} />
            </Button>
          )}
        </SheetHeader>

        {/* Menu content */}
        <nav className="flex-1 overflow-y-auto" aria-label="Drawer navigation">
          {!activeMenu ? (
            <DrawerMenuNav data={data} navLinks={navLinks} onOpenSub={setActiveMenu} />
          ) : (
            <DrawerMenuSub menu={activeMenu} />
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default DrawerMenu;

// Sub component - nav root level
const DrawerMenuNav = ({ data, navLinks, onOpenSub }: DrawerMenuNavProps) => {
  return (
    <ul className="divide-y">
      {data.map((menu) => (
        <DrawerMenuItem
          key={menu.title}
          label={menu.title}
          onClick={() => onOpenSub(menu)}
          hasArrow
        />
      ))}

      {navLinks.map((link) => (
        <DrawerMenuItem key={link.label} label={link.label} href={link.href} />
      ))}
    </ul>
  );
};

// Sub component - sub menu
const DrawerMenuSub = ({ menu }: DrawerMenuSubProps) => (
  <div className="p-4">
    {menu.columns.map((col) => (
      <section key={col.heading} className="mb-6">
        <h3 className="font-semibold mb-2 text-base">{col.heading}</h3>

        <ul className="flex flex-col gap-2">
          {col.items.map((item) => (
            <DrawerMenuItem key={item} label={item} href="#" />
          ))}
        </ul>
      </section>
    ))}
  </div>
);
