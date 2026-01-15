import type { Meta, StoryObj } from '@storybook/react-vite';

// Components
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '.';

const meta: Meta = {
  title: 'UI/Pagination',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

/* ---------------------------------- */
/* Basic */
/* ---------------------------------- */
export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

/* ---------------------------------- */
/* With Ellipsis */
/* ---------------------------------- */
export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive>
            5
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#">6</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

/* ---------------------------------- */
/* Many Pages */
/* ---------------------------------- */
export const ManyPages: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>

        {Array.from({ length: 7 }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink href="#" isActive={index === 2}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

/* ---------------------------------- */
/* Compact (icon only) */
/* ---------------------------------- */
export const Compact: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

/* ---------------------------------- */
/* Disabled (UI only) */
/* ---------------------------------- */
export const Disabled: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" aria-disabled className="pointer-events-none opacity-50" />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href="#" aria-disabled className="pointer-events-none opacity-50" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};
