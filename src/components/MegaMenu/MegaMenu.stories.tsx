import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import MegaMenu from '.';
import { megaMenuData } from '@/data/navigation';

const meta: Meta<typeof MegaMenu> = {
  title: 'Components/MegaMenu',
  component: MegaMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MegaMenu>;

export const Default: Story = {
  render: () => <MegaMenu data={megaMenuData} />,
};
