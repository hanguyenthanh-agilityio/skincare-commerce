import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContentBlockWrapper from '..';

describe('ContentBlockWrapper', () => {
  it('renders required title', () => {
    render(<ContentBlockWrapper title="Main title" />);

    expect(screen.getByText('Main title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<ContentBlockWrapper title="Main title" subTitle="Sub title" />);

    expect(screen.getByText('Sub title')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<ContentBlockWrapper title="Main title" />);

    expect(screen.queryByText('Sub title')).not.toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<ContentBlockWrapper title="Main title" description="This is description" />);

    expect(screen.getByText('This is description')).toBeInTheDocument();
  });

  it('applies left alignment by default', () => {
    const { container } = render(<ContentBlockWrapper title="Main title" />);

    expect(container.firstChild).toHaveClass('text-left');
    expect(container.firstChild).toHaveClass('items-start');
  });

  it('applies center alignment when align="center"', () => {
    const { container } = render(<ContentBlockWrapper title="Main title" align="center" />);

    expect(container.firstChild).toHaveClass('text-center');
    expect(container.firstChild).toHaveClass('items-center');
  });

  it('applies dark color scheme by default', () => {
    render(<ContentBlockWrapper title="Main title" subTitle="Sub" description="Desc" />);

    expect(screen.getByText('Sub')).toHaveClass('text-primary');
    expect(screen.getByText('Main title')).toHaveClass('text-primary');
    expect(screen.getByText('Desc')).toHaveClass('text-primary');
  });

  it('applies light color scheme', () => {
    render(
      <ContentBlockWrapper
        title="Main title"
        subTitle="Sub"
        description="Desc"
        colorScheme="light"
      />,
    );

    expect(screen.getByText('Sub')).toHaveClass('text-white');
    expect(screen.getByText('Main title')).toHaveClass('text-white');
    expect(screen.getByText('Desc')).toHaveClass('text-white');
  });

  it('renders button when buttonText is provided', () => {
    render(<ContentBlockWrapper title="Main title" buttonText="Shop now" buttonHref="/shop" />);

    const link = screen.getByRole('link', { name: /shop now/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/shop');
  });

  it('uses default href when buttonHref is not provided', () => {
    render(<ContentBlockWrapper title="Main title" buttonText="Learn more" />);

    const link = screen.getByRole('link', { name: /learn more/i });
    expect(link).toHaveAttribute('href', '#');
  });

  it('renders arrow icon inside button', () => {
    const { container } = render(<ContentBlockWrapper title="Main title" buttonText="Explore" />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { container } = render(
      <ContentBlockWrapper title="Main title" className="custom-class" />,
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
