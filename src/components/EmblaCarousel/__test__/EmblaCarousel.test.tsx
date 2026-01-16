import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import EmblaCarousel from '..';
import type { Slide } from '@/types';

// Mock embla-carousel-react
const scrollNext = vi.fn();
const scrollTo = vi.fn();
const on = vi.fn();
const off = vi.fn();
const selectedScrollSnap = vi.fn();

vi.mock('embla-carousel-react', () => ({
  default: () => [
    vi.fn(),
    {
      scrollNext,
      scrollTo,
      on,
      off,
      selectedScrollSnap,
    },
  ],
}));

// Mock UI Button
vi.mock('@/ui', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <button {...props}>{children}</button>
  ),
}));

// Mock shared components
vi.mock('@/components', () => ({
  StrapiImage: ({ image }: { image?: { url?: string } }) => (
    <img alt="slide-image" src={image?.url || ''} />
  ),
  ContentBlockWrapper: ({
    title,
    subTitle,
    description,
  }: {
    title?: string;
    subTitle?: string;
    description?: string;
  }) => (
    <div>
      {subTitle && <span>{subTitle}</span>}
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
    </div>
  ),
}));

const slides: Slide[] = [
  {
    title: 'Slide 1',
    subTitle: 'Sub 1',
    description: 'Description 1',
    buttonText: 'Shop now',
    buttonHref: '/shop',
    align: 'left',
    colorScheme: 'light',
    image: {
      url: '/slide-1.jpg',
      alternativeText: 'Slide 1 image',
    },
  },
  {
    title: 'Slide 2',
    subTitle: 'Sub 2',
    description: 'Description 2',
    image: {
      url: '/slide-2.jpg',
      alternativeText: 'Slide 2 image',
    },
  },
];

describe('EmblaCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    selectedScrollSnap.mockReturnValue(0);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('renders nothing when slides array is empty', () => {
    const { container } = render(<EmblaCarousel slides={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders slide images', () => {
    render(<EmblaCarousel slides={slides} />);

    const images = screen.getAllByAltText('slide-image');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/slide-1.jpg');
    expect(images[1]).toHaveAttribute('src', '/slide-2.jpg');
  });

  it('renders overlay content for selected slide', () => {
    render(<EmblaCarousel slides={slides} />);

    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Sub 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  it('renders navigation dots with correct aria-label', () => {
    render(<EmblaCarousel slides={slides} />);

    expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to slide 2')).toBeInTheDocument();
  });

  it('calls emblaApi.scrollTo when navigation dot is clicked', () => {
    render(<EmblaCarousel slides={slides} />);

    fireEvent.click(screen.getByLabelText('Go to slide 2'));

    expect(scrollTo).toHaveBeenCalledWith(1);
  });

  it('updates selectedIndex on embla select event', () => {
    render(<EmblaCarousel slides={slides} />);

    const selectHandler = on.mock.calls.find((call) => call[0] === 'select')?.[1];

    selectedScrollSnap.mockReturnValue(1);

    act(() => {
      selectHandler();
    });

    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });

  it('auto plays slides based on interval', () => {
    render(<EmblaCarousel slides={slides} autoPlayInterval={3000} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(scrollNext).toHaveBeenCalled();
  });

  it('cleans up embla select listener on unmount', () => {
    const { unmount } = render(<EmblaCarousel slides={slides} />);

    unmount();

    expect(off).toHaveBeenCalledWith('select', expect.any(Function));
  });
});
