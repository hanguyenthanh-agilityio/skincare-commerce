import type { Meta, StoryObj } from '@storybook/react-vite';
import DrawerMenu from '.';
import { DropdownMenuData, navLinks } from '@/data/navigation';

const meta: Meta<typeof DrawerMenu> = {
  title: 'Components/DrawerMenu',
  component: DrawerMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DrawerMenu>;

// Default story
export const Default: Story = {
  render: () => <DrawerMenu data={DropdownMenuData} navLinks={navLinks} />,
};
