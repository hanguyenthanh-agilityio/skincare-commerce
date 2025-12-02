import React from 'react';

// Libs
import { cn } from '@/lib/utils';

// Types
import type { StrapiImageType } from '@/types/common';

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

const StrapiImage: React.FC<StrapiImageProps> = ({
  image,
  className = '',
  width = 1200,
  height = 800,
  fallbackAspectRatio = 16 / 9,
  priority = false,
  srcSetWidths = [320, 640, 960, 1280, 1600],
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px',
}) => {
  const imageNode: StrapiImageType | null =
    typeof image === 'string' ? { url: image } : (image ?? null);

  if (!imageNode?.url) {
    return (
      <div
        data-testid="strapi-image-fallback"
        className={cn('bg-gray-100 rounded-xl', className)}
        style={{ aspectRatio: fallbackAspectRatio }}
        role="presentation"
      />
    );
  }

  const intrinsicWidth = imageNode.width || width;
  const intrinsicHeight = imageNode.height || height || width / fallbackAspectRatio;

  const srcSet = srcSetWidths.map((w) => `${imageNode.url}?w=${w} ${w}w`).join(', ');

  return (
    <img
      src={imageNode.url}
      srcSet={srcSet}
      sizes={sizes}
      width={intrinsicWidth}
      height={intrinsicHeight}
      alt={imageNode.alternativeText || ''}
      title={imageNode.alternativeText || undefined}
      className={className}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      loading={priority ? 'eager' : 'lazy'}
      style={{ aspectRatio: intrinsicWidth / intrinsicHeight }}
    />
  );
};

export default StrapiImage;
