import type { Meta, StoryObj } from '@storybook/react-vite';
import DrawerMenuItem from '.';

const meta: Meta<typeof DrawerMenuItem> = {
  title: 'Components/DrawerMenuItem',
  component: DrawerMenuItem,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof DrawerMenuItem>;

// Default DrawerMenuItem as a link
export const LinkItem: Story = {
  args: {
    label: 'About Us',
    href: '/about',
    hasArrow: false,
  },
};

// DrawerMenuItem with arrow
export const LinkWithArrow: Story = {
  args: {
    label: 'Shop',
    href: '/shop',
    hasArrow: true,
  },
};

// DrawerMenuItem as a button
export const ButtonItem: Story = {
  args: {
    label: 'Click Me',
    onClick: () => console.log('Button clicked!'),
    hasArrow: false,
  },
};

// Button with arrow
export const ButtonWithArrow: Story = {
  args: {
    label: 'More Options',
    onClick: () => console.log('Button clicked!'),
    hasArrow: true,
  },
};
