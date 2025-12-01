import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '.';
import { Icons } from '@/ui';

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

// Default Button
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default Button',
  },
};

// Outline Soft
export const OutlineSoft: Story = {
  render: () => (
    <div>
      <h3 className="font-semibold mb-3">Button “More” (outlineSoft)</h3>
      <Button variant="outlineSoft" className="gap-10">
        Read More <Icons.Arrow />
      </Button>
    </div>
  ),
};

// Dark
export const Dark: Story = {
  render: () => (
    <div>
      <h3 className="font-semibold mb-3">Add to Cart (dark)</h3>
      <Button variant="dark" className="px-10 py-6">
        Add to your cart
      </Button>
    </div>
  ),
};

// Light
export const Light: Story = {
  render: () => (
    <div>
      <h3 className="font-semibold mb-3">Add to Cart (light)</h3>
      <Button variant="light" className="px-10 py-6">
        Add to your cart
      </Button>
    </div>
  ),
};

// Outline White (on image)
export const OutlineWhite: Story = {
  render: () => (
    <div>
      <h3 className="font-semibold mb-3">Discover More (outlineWhite)</h3>
      <div className="p-10 rounded-xl bg-cover bg-black bg-center">
        <Button variant="outlineWhite" className="gap-10 py-7">
          Discover More <Icons.Arrow color="white" />
        </Button>
      </div>
    </div>
  ),
};

// Individual variant gallery
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
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
