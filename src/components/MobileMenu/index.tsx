import React, { useState } from 'react';

// Icons
import { X, ChevronLeft } from 'lucide-react';

// Data
import { megaMenuData } from '@/data/navigation';

// Components
import MenuItem from '@/components/MenuItem';

// UIs
import { Button, Icons } from '@/ui';
interface NavLink {
  label: string;
  href: string;
}

interface Props {
  data: typeof megaMenuData;
  navLinks: NavLink[];
}

const MobileMenu: React.FC<Props> = ({ data, navLinks }) => {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<(typeof megaMenuData)[0] | null>(null);

  const handleBack = () => setActiveMenu(null);

  return (
    <>
      {/* Hamburger button */}
      <Button
        data-testid="hamburger-btn"
        variant="ghost"
        className="p-2 focus:outline-none hover:bg-[none] cursor-pointer"
        onClick={() => setOpen(true)}
        aria-label="Open Menu"
      >
        <Icons.Hamburger />
      </Button>

      {/* Overlay */}
      {open && (
        <div
          data-testid="overlay"
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Menu drawer */}
      <div
        data-testid="drawer"
        className={`fixed top-0 left-0 w-full h-full bg-card z-50 transform transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-black">
          {activeMenu ? (
            <button onClick={handleBack} className="p-2" aria-label="Back">
              <ChevronLeft />
            </button>
          ) : (
            <span></span>
          )}

          <button
            onClick={() => setOpen(false)}
            className="p-2 cursor-pointer"
            aria-label="Close Menu"
          >
            <X />
          </button>
        </div>

        {/* Menu Content */}
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
                  <h4 className="font-semibold mb-2">{col.heading}</h4>
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
      </div>
    </>
  );
};

export default MobileMenu;
