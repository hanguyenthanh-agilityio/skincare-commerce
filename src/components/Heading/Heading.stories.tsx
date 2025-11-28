import type { Meta, StoryObj } from '@storybook/react-vite';

// Components
import { Heading as Element } from '.';

const meta = {
  title: 'Components/Heading',
  component: Element,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    children: { control: 'text' },
  },
  args: {
    children: 'This is a heading',
  },
} satisfies Meta<typeof Element>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Element variant="h1">This is a heading H1</Element>
      <Element variant="h2">This is a heading H2</Element>
      <Element variant="h3">This is a heading H3</Element>
      <Element variant="h4">This is a heading H4</Element>
      <Element variant="h5">This is a heading H5</Element>
      <Element variant="h6">This is a heading H6</Element>
    </div>
  ),
};
