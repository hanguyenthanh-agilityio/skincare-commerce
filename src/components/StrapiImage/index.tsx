// Libs
import { cn } from '@/lib';

// Constants
import { STRAPI_BASE_URL } from '@/constants';

// Types
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
  // Normalize string → StrapiImageType
  const imageNode: StrapiImageType | null =
    typeof image === 'string'
      ? {
          url: image,
          width,
          height,
          alternativeText: '',
        }
      : (image ?? null);

  // Fallback UI
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

  // Detect external URL (hotlink)
  const isExternal = imageNode.url.startsWith('http');

  // Base URL only for Strapi local images
  const baseUrl = isExternal ? '' : STRAPI_BASE_URL;

  const fullUrl = `${baseUrl}${imageNode.url}`;

  // Intrinsic sizes (fallback if Strapi does not provide)
  const intrinsicWidth = imageNode.width || width;
  const intrinsicHeight = imageNode.height || height;

  // srcSet ONLY for internal images
  const srcSet = !isExternal
    ? srcSetWidths.map((w) => `${fullUrl}?w=${w} ${w}w`).join(', ')
    : undefined;

  // Maintain aspect ratio correctly
  const style: React.CSSProperties = {};
  if (fallbackAspectRatio !== 0) {
    style.aspectRatio =
      intrinsicWidth && intrinsicHeight ? intrinsicWidth / intrinsicHeight : fallbackAspectRatio;
  }

  return (
    <img
      src={fullUrl}
      {...(srcSet ? { srcSet } : {})}
      sizes={srcSet ? sizes : undefined}
      width={intrinsicWidth}
      height={intrinsicHeight}
      alt={imageNode.alternativeText || ''}
      title={imageNode.alternativeText || undefined}
      className={cn('w-full h-full object-contain', className)}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      loading={priority ? 'eager' : 'lazy'}
      style={style}
    />
  );
};

export default StrapiImage;
