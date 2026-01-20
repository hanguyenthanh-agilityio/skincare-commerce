// Libs
import { cn } from '@/lib';

// Constants
import { STRAPI_BASE_URL } from '@/constants';

// Types
import type { StrapiImageType } from '@/types';

interface StrapiImageProps {
  image: StrapiImageType | string | null | undefined;
  alt?: string;
  decorative?: boolean;
  className?: string;
  width?: number;
  height?: number;
  fallbackAspectRatio?: number;
  loading?: 'lazy' | 'eager' | 'auto';
  priority?: boolean;
  srcSetWidths?: number[];
  sizes?: string;
}

const DEFAULT_SRCSET = [320, 480, 640, 800];

const StrapiImage = ({
  image,
  className = '',
  alt,
  decorative,
  width = 1200,
  height = 800,
  fallbackAspectRatio = 16 / 9,
  priority = false,
  srcSetWidths = DEFAULT_SRCSET,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 700px',
}: StrapiImageProps) => {
  const imageNode: StrapiImageType | null =
    typeof image === 'string'
      ? { url: image, width, height, alternativeText: '' }
      : (image ?? null);

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

  const url = imageNode.url;

  const isCloudinary = url.includes('res.cloudinary.com') || url.includes('cloudinary.com');

  const baseUrl = isCloudinary
    ? url.replace('/upload/', '/upload/f_auto,q_auto/') // AUTO OPTIMIZED
    : url.startsWith('http')
      ? url
      : `${STRAPI_BASE_URL}${url}`;

  // srcset with Cloudinary
  const srcSet = isCloudinary
    ? srcSetWidths
        .map(
          (w) =>
            baseUrl.replace('upload/f_auto,q_auto/', `upload/f_auto,q_auto,w_${w}/`) + ` ${w}w`,
        )
        .join(', ')
    : srcSetWidths.map((w) => `${baseUrl}?w=${w} ${w}w`).join(', ');

  const style: React.CSSProperties = {
    aspectRatio:
      imageNode.width && imageNode.height
        ? imageNode.width / imageNode.height
        : fallbackAspectRatio,
  };

  const resolvedAlt = decorative ? '' : (alt ?? imageNode.alternativeText ?? '');

  return (
    <img
      src={baseUrl}
      srcSet={srcSet}
      sizes={sizes}
      width={imageNode.width || width}
      height={imageNode.height || height}
      alt={resolvedAlt}
      role={decorative ? 'presentation' : undefined}
      className={cn('w-full h-full object-cover', className)}
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      style={style}
    />
  );
};

export default StrapiImage;
