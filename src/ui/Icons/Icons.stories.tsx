import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icons } from '@/ui';

type IconKey = keyof typeof Icons;

const meta: Meta = {
  title: 'UI/Icons',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 8, max: 128, step: 2 },
    },
    color: {
      control: 'color',
    },
  },
};

export default meta;

type Story = StoryObj<{
  size: number;
  color: string;
}>;

/* -------------------------------------------------------------------------- */
/*                                Icon Gallery                                 */
/* -------------------------------------------------------------------------- */

export const Gallery: Story = {
  args: {
    size: 24,
    color: '#000000',
  },
  render: ({ size, color }) => (
    <div className="grid grid-cols-4 gap-6">
      {(Object.keys(Icons) as IconKey[]).map((key) => {
        const Icon = Icons[key];

        return (
          <div key={key} className="flex flex-col items-center gap-2 p-3 border rounded-md">
            <Icon width={size} height={size} style={{ color }} />
            <span className="text-xs text-muted-foreground">{key}</span>
          </div>
        );
      })}
    </div>
  ),
};
