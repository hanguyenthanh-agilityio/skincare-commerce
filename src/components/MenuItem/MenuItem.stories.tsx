import type { Meta, StoryObj } from '@storybook/react-vite';
import MenuItem from '.';

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof MenuItem>;

// Default MenuItem as a link
export const LinkItem: Story = {
  args: {
    label: 'About Us',
    href: '/about',
    hasArrow: false,
  },
};

// MenuItem with arrow
export const LinkWithArrow: Story = {
  args: {
    label: 'Shop',
    href: '/shop',
    hasArrow: true,
  },
};

// MenuItem as a button
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
