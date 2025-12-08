import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const slides = [
  {
    image:
      'https://static.vecteezy.com/system/resources/previews/000/701/690/non_2x/abstract-polygonal-banner-background-vector.jpg',
    title: 'Highly Effective Body Care',
    description:
      'A combination of natural and advanced technology, ensures you will enjoy a healthy and effective skin care experience.',
    button: 'Discover More',
  },
  {
    image:
      'https://static.vecteezy.com/system/resources/previews/000/701/690/non_2x/abstract-polygonal-banner-background-vector.jpg',
    title: 'Gentle Skincare',
    description: 'Hydrate and nourish your skin with our gentle formulas.',
    button: 'Learn More',
  },
  {
    image:
      'https://static.vecteezy.com/system/resources/previews/000/701/690/non_2x/abstract-polygonal-banner-background-vector.jpg',
    title: 'Radiant Glow',
    description: 'Achieve a natural glow with our special skincare line.',
    button: 'Shop Now',
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Update selected slide index
  useEffect((): (() => void) | void => {
    if (!emblaApi) return;
    const handleSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', handleSelect);
    handleSelect();
    return () => emblaApi.off('select', handleSelect);
  }, [emblaApi]);

  // Auto slide every 5s
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="relative w-full overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide, idx) => (
          <div key={idx} className="flex-shrink-0 w-full relative">
            {/* Full width image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[400px] md:h-[600px] object-cover"
            />

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-24 text-white bg-black/30">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="mb-6 max-w-md">{slide.description}</p>
              <button className="px-6 py-3 bg-gray-800/80 hover:bg-gray-900 rounded transition">
                {slide.button}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-50 pointer-events-auto">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === selectedIndex ? 'bg-white' : 'bg-gray-400/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
