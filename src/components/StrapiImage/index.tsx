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

  const baseUrl = imageNode.url.startsWith('http') ? '' : STRAPI_BASE_URL;

  const fullUrl = `${baseUrl}${imageNode.url}`;

  const intrinsicWidth = imageNode.width || width;
  const intrinsicHeight = imageNode.height || height || width / fallbackAspectRatio;

  const srcSet = srcSetWidths.map((w) => `${fullUrl}?w=${w} ${w}w`).join(', ');

  const style: React.CSSProperties = {};
  if (fallbackAspectRatio !== 0) {
    style.aspectRatio = intrinsicWidth / intrinsicHeight;
  }

  return (
    <img
      src={imageNode.url}
      srcSet={srcSet}
      sizes={sizes}
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
