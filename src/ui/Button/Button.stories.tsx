import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '.';
import { ArrowIcon } from '@/icons';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    size: 'default',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'outlineSoft',
        'dark',
        'light',
        'outlineWhite',
        'destructive',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

// Default
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default Button',
  },
};

/* --------------------------------------------
 * FULL VARIANTS SHOWCASE (YOUR UI)
 * -------------------------------------------- */
export const FullShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {/* Row 1: Outline Soft */}
      <div>
        <h3 className="font-semibold mb-3">Button “More” (outlineSoft)</h3>
        <Button variant="outlineSoft" className="gap-10">
          Read More <ArrowIcon />
        </Button>
      </div>

      {/* Row 2: Add to cart (dark) */}
      <div>
        <h3 className="font-semibold mb-3">Add to Cart (dark)</h3>
        <Button variant="dark">Add to your cart</Button>
      </div>

      {/* Row 3: Add to cart (light) */}
      <div>
        <h3 className="font-semibold mb-3">Add to Cart (light)</h3>
        <Button variant="light">Add to your cart</Button>
      </div>

      {/* Row 4: Discover More (white outline on image) */}
      <div>
        <h3 className="font-semibold mb-3">Discover More (outlineWhite)</h3>
        <div
          className="p-10 rounded-xl bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200')",
          }}
        >
          <Button variant="outlineWhite">Discover More →</Button>
        </div>
      </div>
    </div>
  ),
};

/* --------------------------------------------
 * INDIVIDUAL VARIANT GALLERY
 * -------------------------------------------- */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="outlineSoft">More →</Button>
      <Button variant="dark">Add to your cart</Button>
      <Button variant="light">Add to your cart</Button>
      <Button variant="outlineWhite">Discover More →</Button>

      {/* Default shadcn variants if you still use them */}
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

// Size
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm" variant="dark">
        Small
      </Button>
      <Button size="default" variant="dark">
        Default
      </Button>
      <Button size="lg" variant="dark">
        Large
      </Button>
      <Button size="icon" variant="dark">
        🛒
      </Button>
    </div>
  ),
};
