import type { Meta, StoryObj } from '@storybook/react-vite';

// Component
import { Label } from '.';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'Label text',
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

/* ---------------------------------- */
/* Default */
/* ---------------------------------- */
export const Default: Story = {
  args: {
    children: 'Default Label',
  },
};

/* ---------------------------------- */
/* With htmlFor */
/* ---------------------------------- */
export const WithHtmlFor: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email address</Label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        className="h-10 rounded-md border px-3"
      />
    </div>
  ),
};

/* ---------------------------------- */
/* Disabled (peer-disabled) */
/* ---------------------------------- */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="username">Username</Label>
      <input
        id="username"
        disabled
        placeholder="Disabled input"
        className="peer h-10 rounded-md border px-3"
      />
    </div>
  ),
};

/* ---------------------------------- */
/* With Icon */
/* ---------------------------------- */
export const WithIcon: Story = {
  render: () => (
    <Label className="gap-2">
      <span>🔒</span>
      Password
    </Label>
  ),
};

/* ---------------------------------- */
/* Custom styles */
/* ---------------------------------- */
export const CustomStyle: Story = {
  args: {
    children: 'Custom Label',
    className: 'text-primary uppercase tracking-wide',
  },
};

/* ---------------------------------- */
/* Group disabled */
/* ---------------------------------- */
export const GroupDisabled: Story = {
  render: () => (
    <div data-disabled="true" className="group">
      <Label>Email</Label>
    </div>
  ),
};
