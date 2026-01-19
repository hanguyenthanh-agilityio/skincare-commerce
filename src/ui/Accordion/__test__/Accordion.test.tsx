import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '..';

function renderAccordion() {
  return render(
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          <p>Content 1</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          <p>Content 2</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>,
  );
}

const getContents = () => screen.getAllByRole('region', { hidden: true }) as HTMLElement[];

describe('Accordion component', () => {
  it('renders all triggers', () => {
    renderAccordion();

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('contents are closed by default', () => {
    renderAccordion();

    const [content1] = getContents();
    expect(content1).toHaveAttribute('data-state', 'closed');
  });

  it('opens accordion when trigger is clicked', () => {
    renderAccordion();

    fireEvent.click(screen.getByText('Section 1'));

    const [content1] = getContents();
    expect(content1).toHaveAttribute('data-state', 'open');

    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('closes accordion when clicking trigger again', () => {
    renderAccordion();

    const trigger = screen.getByText('Section 1');

    fireEvent.click(trigger);
    fireEvent.click(trigger);

    const [content1] = getContents();
    expect(content1).toHaveAttribute('data-state', 'closed');

    expect(screen.queryByText('Content 1')).toBeNull();
  });

  it('allows only one item open at a time', () => {
    renderAccordion();

    fireEvent.click(screen.getByText('Section 1'));
    fireEvent.click(screen.getByText('Section 2'));

    const [content1, content2] = getContents();

    expect(content1).toHaveAttribute('data-state', 'closed');
    expect(content2).toHaveAttribute('data-state', 'open');

    expect(screen.queryByText('Content 1')).toBeNull();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('renders ChevronDownIcon inside trigger', () => {
    renderAccordion();

    const trigger = screen.getByText('Section 1').closest('[data-slot="accordion-trigger"]')!;
    expect(trigger.querySelector('svg')).toBeInTheDocument();
  });

  it('rotates icon when open', () => {
    renderAccordion();

    const trigger = screen.getByText('Section 1').closest('[data-slot="accordion-trigger"]')!;
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('data-state', 'open');
  });

  it('adds correct data-slot attributes', () => {
    renderAccordion();

    const triggers = screen.getAllByRole('button');
    const contents = getContents();

    expect(triggers[0]).toHaveAttribute('data-slot', 'accordion-trigger');
    expect(contents[0]).toHaveAttribute('data-slot', 'accordion-content');
  });
});
