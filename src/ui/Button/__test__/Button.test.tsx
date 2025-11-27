import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// UI
import { Button } from '@/ui';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
