import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Components
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/ui/HoverCard';

function setup() {
  render(
    <HoverCard>
      <HoverCardTrigger asChild>
        <button>Open card</button>
      </HoverCardTrigger>

      <HoverCardContent data-testid="hover-content">Hover content</HoverCardContent>
    </HoverCard>,
  );

  const trigger = screen.getByRole('button', { name: /open card/i });

  return { trigger };
}

describe('HoverCard component', () => {
  it('does not show content initially', () => {
    setup();
    expect(screen.queryByTestId('hover-content')).not.toBeInTheDocument();
  });

  it('shows content on hover', async () => {
    const { trigger } = setup();

    fireEvent.pointerEnter(trigger);

    const content = await screen.findByTestId('hover-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'open');
  });

  it('hides content on mouse leave', async () => {
    const { trigger } = setup();

    fireEvent.pointerEnter(trigger);
    const content = await screen.findByTestId('hover-content');

    fireEvent.pointerLeave(trigger);
    fireEvent.pointerLeave(content);

    await waitFor(
      () => {
        expect(content).toHaveAttribute('data-state', 'closed');
      },
      { timeout: 1000 },
    );
  });

  it('renders inside a portal', async () => {
    const { trigger } = setup();

    fireEvent.pointerEnter(trigger);
    const content = await screen.findByTestId('hover-content');

    const wrapper = content.closest('[data-radix-popper-content-wrapper]');
    expect(wrapper).not.toBeNull();
  });

  it('applies default alignment and offset', async () => {
    const { trigger } = setup();

    fireEvent.pointerEnter(trigger);
    const content = await screen.findByTestId('hover-content');

    // Radix inject CSS variables cho position
    expect(
      content.style.getPropertyValue('--radix-hover-card-content-transform-origin'),
    ).toBeTruthy();
  });

  it('accepts custom bgColor', async () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <button>Open</button>
        </HoverCardTrigger>

        <HoverCardContent data-testid="hover-content" bgColor="bg-red-500">
          Custom bg
        </HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole('button', { name: /open/i });
    fireEvent.pointerEnter(trigger);

    const content = await screen.findByTestId('hover-content');
    expect(content).toHaveClass('bg-red-500');
  });
});
