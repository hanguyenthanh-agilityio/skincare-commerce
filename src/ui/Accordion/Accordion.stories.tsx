import type { Meta, StoryObj } from '@storybook/react-vite';

// Components
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '.';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    type: 'single',
    collapsible: true,
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
    },
    collapsible: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

//
// ---------- BASIC SINGLE ----------
export const Single: Story = {
  render: (args) => (
    <Accordion {...args} className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>You can return any item within 30 days of purchase.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
        <AccordionContent>Yes, we ship worldwide. Shipping costs may apply.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>How can I contact support?</AccordionTrigger>
        <AccordionContent>You can contact us via email or live chat.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

//
// ---------- MULTIPLE ----------
export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
  render: (args) => (
    <Accordion {...args} className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Product information</AccordionTrigger>
        <AccordionContent>This product is made from high-quality materials.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Care instructions</AccordionTrigger>
        <AccordionContent>Hand wash only. Do not bleach.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

//
// ---------- DEFAULT OPEN ----------
export const DefaultOpen: Story = {
  args: {
    defaultValue: 'item-1',
  },
  render: (args) => (
    <Accordion {...args} className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Opened by default</AccordionTrigger>
        <AccordionContent>This accordion item is opened by default.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Closed item</AccordionTrigger>
        <AccordionContent>This one starts closed.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

//
// ---------- DISABLED ----------
export const DisabledItem: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger disabled>Disabled accordion</AccordionTrigger>
        <AccordionContent>You should not be able to open this.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Active accordion</AccordionTrigger>
        <AccordionContent>This one works normally.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
