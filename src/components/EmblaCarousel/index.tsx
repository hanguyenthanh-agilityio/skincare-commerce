import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

// UIsUIs
import { Button } from '@/ui';

// Components
import { StrapiImage } from '@/components';

// Types
import type { Slide } from '@/types';

export type HeroCarouselReactProps = {
  slides: Slide[];
  onSlideChange?: (index: number) => void;
};

const EmblaCarousel = ({ slides, onSlideChange }: HeroCarouselReactProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle slide selection
  useEffect((): (() => void) | void => {
    if (!emblaApi) return;

    const handleSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);
      onSlideChange?.(index);
    };

    emblaApi.on('select', handleSelect);
    handleSelect();

    return () => emblaApi.off('select', handleSelect);
  }, [emblaApi, onSlideChange]);

  // Auto play
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => emblaApi.scrollNext(), 8000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <>
      {/* Slider container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, idx) => (
            <div key={idx} className="flex-shrink-0 w-full relative">
              <StrapiImage
                image={slide.image}
                className="w-full h-[400px] md:h-[600px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-50">
        {slides.map((_, idx) => (
          <Button
            key={idx}
            type="button"
            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            data-active={idx === selectedIndex}
            className="w-3 h-3 rounded-full bg-white/40 data-[active=true]:bg-white transition"
          />
        ))}
      </div>
    </>
  );
};

export default EmblaCarousel;
