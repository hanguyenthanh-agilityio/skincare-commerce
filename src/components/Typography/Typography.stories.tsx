import type { Meta, StoryObj } from '@storybook/react-vite';

// Components
import { Typography } from '.';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['p', 'span'],
    },
    children: { control: 'text' },
    paragraphSize: {
      control: 'select',
      options: ['default', 'xs'],
    },
    spanSize: {
      control: 'select',
      options: ['default', 'xs'],
    },
  },
  args: {
    children: 'This is a typography text',
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ParagraphSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography>This is a paragraph with default size</Typography>
      <Typography paragraphSize="xs">This is a paragraph with xs size</Typography>
    </div>
  ),
};

export const SpanSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography variant="span" spanSize="default">
        This is a span with default size
      </Typography>
      <Typography variant="span" spanSize="xs">
        This is a span with xs size
      </Typography>
    </div>
  ),
};
