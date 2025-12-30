import type { Meta, StoryObj } from '@storybook/react-vite';

// Constants
import { DROPDOWN_MENU_DATA, NAV_LINKS } from '@/constants';

// Components
import DrawerMenu from '.';

const meta: Meta<typeof DrawerMenu> = {
  title: 'Components/DrawerMenu',
  component: DrawerMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DrawerMenu>;

// Default story
export const Default: Story = {
  render: () => <DrawerMenu data={DROPDOWN_MENU_DATA} navLinks={NAV_LINKS} />,
};
