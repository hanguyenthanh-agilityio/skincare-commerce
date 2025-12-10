// Libs
import { cn } from '@/lib';
import type { StrapiImageType } from '@/types';

interface StrapiImageProps {
  image: StrapiImageType | string | null | undefined;
  className?: string;
  width?: number;
  height?: number;
  fallbackAspectRatio?: number;
  loading?: 'lazy' | 'eager' | 'auto';
  priority?: boolean;
  srcSetWidths?: number[];
  sizes?: string;
}

const StrapiImage = ({
  image,
  className = '',
  width = 1200,
  height = 800,
  fallbackAspectRatio = 16 / 9,
  priority = false,
  srcSetWidths = [320, 640, 960, 1280, 1600],
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px',
}: StrapiImageProps) => {
  // Normalize input into unified object
  const normalized: StrapiImageType | null =
    typeof image === 'string' ? { url: image } : (image ?? null);

  // Fallback for missing image
  if (!normalized?.url) {
    return (
      <div
        className={cn('bg-gray-100 rounded-xl', className)}
        style={{ aspectRatio: fallbackAspectRatio }}
        role="presentation"
      />
    );
  }

  const intrinsicWidth = normalized.width || width;
  const intrinsicHeight = normalized.height || height;

  const srcSet = srcSetWidths.map((w) => `${normalized.url}?w=${w} ${w}w`).join(', ');

  return (
    <img
      src={normalized.url}
      srcSet={srcSet}
      sizes={sizes}
      width={intrinsicWidth}
      height={intrinsicHeight}
      alt={normalized.alternativeText || ''}
      className={cn('w-full h-full object-contain', className)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      style={{
        aspectRatio: intrinsicWidth / intrinsicHeight,
      }}
    />
  );
};

export default StrapiImage;
