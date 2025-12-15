import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

// UIs
import { Button } from '@/ui';

// Components
import { StrapiImage, ContentBlockWrapper } from '@/components';

// Types
import type { Slide } from '@/types';

interface EmblaCarouselProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

const EmblaCarousel = ({ slides, autoPlayInterval = 8000 }: EmblaCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle slide selection
  useEffect((): (() => void) | void => {
    if (!emblaApi) return;

    const handleSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on('select', handleSelect);

    // Set initial index
    handleSelect();

    return () => emblaApi.off('select', handleSelect);
  }, [emblaApi]);

  // Auto play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), autoPlayInterval);
    return () => clearInterval(interval);
  }, [emblaApi, autoPlayInterval]);

  if (!slides.length) return null;

  const currentSlide = slides[selectedIndex];

  const { subTitle, title, description, buttonText, buttonHref, align, colorScheme, variant } =
    currentSlide;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slider */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, idx) => (
            <div key={idx} className="shrink-0 w-full relative">
              {slide.image && (
                <StrapiImage
                  image={slide.image}
                  className="w-full h-highlight-lg md:h-hero-desktop object-cover"
                  priority={idx === 0}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay content */}
      {currentSlide && (
        <div className="absolute inset-0 flex flex-col justify-center items-start bg-black/30 text-white">
          <ContentBlockWrapper
            title={title}
            subTitle={subTitle}
            description={description}
            buttonText={buttonText}
            buttonHref={buttonHref}
            align={align}
            colorScheme={colorScheme}
            variant={variant}
            className="max-w-sm lg:max-w-md px-6 md:px-12"
          />
        </div>
      )}

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-50">
        {slides.map((_, idx) => (
          <Button
            key={idx}
            type="button"
            onClick={() => emblaApi?.scrollTo(idx)}
            data-active={idx === selectedIndex}
            aria-label={`Go to slide ${idx + 1}`}
            className="w-3 h-3 rounded-full bg-white/40 data-[active=true]:bg-white transition"
          />
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
