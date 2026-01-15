import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

// Component
import { Slider } from '.';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [50],
    orientation: 'horizontal',
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

/* ---------------------------------- */
/* Default */
/* ---------------------------------- */
export const Default: Story = {};

/* ---------------------------------- */
/* Range Slider */
/* ---------------------------------- */
export const Range: Story = {
  args: {
    defaultValue: [25, 75],
  },
};

/* ---------------------------------- */
/* Disabled */
/* ---------------------------------- */
export const Disabled: Story = {
  args: {
    defaultValue: [40],
    disabled: true,
  },
};

/* ---------------------------------- */
/* Vertical */
/* ---------------------------------- */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    defaultValue: [60],
  },
  render: (args) => (
    <div className="h-52">
      <Slider {...args} />
    </div>
  ),
};

/* ---------------------------------- */
/* Controlled Example */
/* ---------------------------------- */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<number[]>([30]);

    return (
      <div className="space-y-4">
        <Slider value={value} onValueChange={setValue} />
        <div className="text-sm text-muted-foreground">Value: {value.join(', ')}</div>
      </div>
    );
  },
};
