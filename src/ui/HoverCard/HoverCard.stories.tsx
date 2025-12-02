import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '.';
import { Button } from '@/ui';

const HeaderMenuData = [
  {
    title: 'Shop',
    columns: [
      {
        heading: 'Category',
        items: [
          'Shop All',
          'Cleanse',
          'Exfoliate',
          'Treat & Masque',
          'Tone',
          'Hydrate',
          'Eyes & Lips',
          'Sun Care',
          'Shave',
        ],
      },
      {
        heading: 'Skin Type',
        items: ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive', 'Mature'],
      },
      {
        heading: 'Body',
        items: [
          'Shop All',
          'Body Cream, oils, scrubs',
          'Shower-gel, shampoo, soap',
          'Balms',
          'Hands & Feet',
          'Sun Protection',
        ],
      },
      {
        heading: 'Fragrances',
        items: ['Shop All', 'Sauna', 'Essential Oils'],
      },
    ],
    imageUrl: '/public/serum.png',
  },
];

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

export const HeaderMenu: Story = {
  render: () => (
    <nav className="flex items-center gap-6">
      {HeaderMenuData.map((menu) => (
        <HoverCard key={menu.title}>
          <HoverCardTrigger asChild>
            <span className="cursor-pointer font-medium">{menu.title}</span>
          </HoverCardTrigger>

          <HoverCardContent className="w-[700px] grid grid-cols-5 gap-6 p-6 bg-white shadow-lg">
            {/* Columns */}
            {menu.columns.map((col) => (
              <div key={col.heading} className="space-y-2">
                <h4 className="font-semibold">{col.heading}</h4>
                {col.items.map((item) => (
                  <a key={item} href="#" className="block hover:text-primary">
                    {item}
                  </a>
                ))}
              </div>
            ))}

            {/* Image column */}
            <div className="col-span-1 flex items-center justify-center">
              <img src={menu.imageUrl} alt="Product" className="max-h-64 object-contain" />
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
