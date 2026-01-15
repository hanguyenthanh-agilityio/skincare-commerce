import type { Meta, StoryObj } from '@storybook/react-vite';

// Component
import { Input } from '.';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter text...',
    disabled: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'file'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

//
// Default
//
export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
  },
};

//
// Without label
//
export const WithoutLabel: Story = {
  args: {
    placeholder: 'No label input',
  },
};

//
// Disabled
//
export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@email.com',
    disabled: true,
  },
};

//
// Invalid (aria-invalid)
//
export const Invalid: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@email.com',
    'aria-invalid': true,
  },
};

//
// Password
//
export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
  },
};

//
// File input
//
export const File: Story = {
  args: {
    label: 'Upload file',
    type: 'file',
  },
};

//
// Sizes showcase (manual layout)
//
export const Variants: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <Input label="Default" placeholder="Default input" />
      <Input label="Invalid" placeholder="Invalid input" aria-invalid />
      <Input label="Disabled" placeholder="Disabled input" disabled />
      <Input label="Password" type="password" placeholder="••••••••" />
    </div>
  ),
};
