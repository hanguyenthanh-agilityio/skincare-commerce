import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import RoutineCard from '..';
import type { JSX } from 'react';

// Mock TypographyWrapper
vi.mock('../../TypographyWrapper', () => ({
  default: ({
    title,
    level,
    className,
  }: {
    title: string;
    level: keyof JSX.IntrinsicElements;
    className?: string;
  }) => {
    const Tag = level;
    return <Tag className={className}>{title}</Tag>;
  },
}));

const MockIcon = ({ className }: { className?: string }) => (
  <svg data-testid="routine-icon" className={className} />
);

describe('RoutineCard', () => {
  it('renders index number formatted with leading zero', () => {
    render(<RoutineCard index={0} label="Cleanse" icon={MockIcon} />);
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('renders correct index when index > 9', () => {
    render(<RoutineCard index={10} label="Moisturize" icon={MockIcon} />);
    expect(screen.getByText('11')).toBeInTheDocument();
  });

  it('renders label text', () => {
    render(<RoutineCard index={1} label="Cleanse" icon={MockIcon} />);
    expect(screen.getByText('Cleanse')).toBeInTheDocument();
  });

  it('renders icon component', () => {
    render(<RoutineCard index={2} label="Tone" icon={MockIcon} />);
    expect(screen.getByTestId('routine-icon')).toBeInTheDocument();
  });

  it('passes className to icon component', () => {
    render(<RoutineCard index={3} label="Serum" icon={MockIcon} />);
    expect(screen.getByTestId('routine-icon')).toHaveClass('w-6', 'h-6');
  });

  it('renders both index and label', () => {
    render(<RoutineCard index={0} label="Cleanse" icon={MockIcon} />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('Cleanse')).toBeInTheDocument();
  });
});
