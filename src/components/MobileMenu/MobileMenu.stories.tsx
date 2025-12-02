import type { Meta, StoryObj } from '@storybook/react-vite';
import MobileMenu from '.';
import { HeaderMenuData, navLinks } from '@/data/navigation';

const meta: Meta<typeof MobileMenu> = {
  title: 'Components/MobileMenu',
  component: MobileMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MobileMenu>;

// Default story
export const Default: Story = {
  render: () => <MobileMenu data={HeaderMenuData} navLinks={navLinks} />,
};
