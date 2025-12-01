import React from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/ui';
interface Column {
  heading: string;
  items: string[];
}
interface Menu {
  title: string;
  columns: Column[];
  imageUrl: string;
}
interface Props {
  data: Menu[];
}

const MegaMenu: React.FC<Props> = ({ data }) => {
  return (
    <nav className="flex items-center gap-6">
      {data.map((menu) => (
        <HoverCard key={menu.title}>
          <HoverCardTrigger asChild>
            <span className="cursor-pointer font-medium">{menu.title}</span>
          </HoverCardTrigger>

          <HoverCardContent className="absolute top-full left-0 w-screen shadow-lg z-50 p-0">
            <div className="flex justify-center items-center w-full">
              {/* Columns */}
              <div className="grid grid-cols-4 xl:gap-x-16 gap-x-10 px-8 py-6 w-3/4">
                {menu.columns.map((col) => (
                  <div key={col.heading} className="space-y-4">
                    <h4 className="font-semibold">{col.heading}</h4>
                    {col.items.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block text-sm hover:text-primary transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                ))}
              </div>

              {/* Image */}
              <div className="w-1/4 flex items-stretch justify-end p-0">
                <img src={menu.imageUrl} alt="Product" className="h-full w-full object-contain" />
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </nav>
  );
};

export default MegaMenu;
