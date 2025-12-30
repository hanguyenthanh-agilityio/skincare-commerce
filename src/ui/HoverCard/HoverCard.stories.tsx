import type { Meta, StoryObj } from '@storybook/react-vite';

// Constants
import { DROPDOWN_MENU_DATA } from '@/constants';

// Components
import { HoverCard, HoverCardTrigger, HoverCardContent } from '.';
import { Button } from '@/ui';

const meta: Meta<typeof HoverCard> = {
  title: 'UI/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof HoverCard>;

// Default HoverCard
export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button>Hover me</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">This is the default hover card content.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

// HoverCard with custom content

export const DropdownMenu: Story = {
  render: () => (
    <nav className="flex items-center gap-6">
      {DROPDOWN_MENU_DATA.map((menu) => (
        <HoverCard key={menu.title}>
          <HoverCardTrigger asChild>
            <span className="cursor-pointer font-medium">{menu.title}</span>
          </HoverCardTrigger>

          <HoverCardContent className="w-full grid grid-cols-5 gap-6 p-6 bg-white shadow-lg">
            {/* Columns */}
            {menu.columns.map((col) => (
              <div key={col.heading} className="space-y-2">
                <h4 className="font-semibold">{col.heading}</h4>
                {col.items.map((item) => (
                  <a key={item.href} href={item.href} className="block hover:text-primary">
                    {item.label}
                  </a>
                ))}
              </div>
            ))}

            {/* Image column */}
            <div className="col-span-1 flex items-center justify-center">
              <img src={menu.imageUrl} alt="Product" className="mega-image" />
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </nav>
  ),
};

// HoverCard alignment variants
export const AlignmentVariants: Story = {
  render: () => (
    <div className="flex gap-6 flex-wrap">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button>Center</Button>
        </HoverCardTrigger>
        <HoverCardContent align="center">Aligned Center</HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button>Start</Button>
        </HoverCardTrigger>
        <HoverCardContent align="start">Aligned Start</HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button>End</Button>
        </HoverCardTrigger>
        <HoverCardContent align="end">Aligned End</HoverCardContent>
      </HoverCard>
    </div>
  ),
};
