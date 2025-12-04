import type { Meta, StoryObj } from '@storybook/react-vite';

// Component
import StrapiImage from '.';

const meta: Meta<typeof StrapiImage> = {
  title: 'Components/StrapiImage',
  component: StrapiImage,
  tags: ['autodocs'],
  args: {
    image: 'https://placeholder.co/600x400',
    width: 600,
    height: 400,
    className: 'rounded-lg',
  },
};
export default meta;

type Story = StoryObj<typeof StrapiImage>;

// Default Image
export const Default: Story = {
  args: {
    image: 'https://placehold.co/600x400',
    className: 'rounded-lg',
  },
};

// Image from object
export const FromObject: Story = {
  args: {
    image: {
      url: 'https://imageskincare.com/cdn/shop/products/VITAL_C_hydrating_facial_cleanser_PDP_R01a.jpg?v=1762197992&width=800',
      width: 800,
      height: 600,
      alternativeText: 'Sample image',
    },
    className: 'rounded-xl',
  },
};

// Fallback Image
export const Fallback: Story = {
  args: {
    image: null,
    className: 'rounded-lg',
  },
};

// Responsive srcSet example
export const Responsive: Story = {
  args: {
    image:
      '//imageskincare.com/cdn/shop/files/AGELESS_total_pure_hyaluronic6_filler_PDP_R01a_6a65925b-b8c8-43a6-ab6c-d5c7486de71b.jpg?v=1762197951&width=800',
    srcSetWidths: [320, 640, 960, 1200],
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px',
    className: 'rounded-lg',
  },
};
