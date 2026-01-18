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
  srcSetWidths = [320, 480, 640, 960, 1200],
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1200px',
}: StrapiImageProps) => {
  const imageNode: StrapiImageType | null =
    typeof image === 'string'
      ? { url: image, width, height, alternativeText: '' }
      : (image ?? null);

  if (!imageNode?.url) {
    return (
      <div
        className={cn('bg-gray-100 rounded-xl', className)}
        style={{ aspectRatio: fallbackAspectRatio }}
      />
    );
  }

  const url = imageNode.url;
  const isExternal = url.startsWith('http');

  let fullUrl = isExternal ? url : `${STRAPI_BASE_URL}${url}`;

  // Build responsive srcset for external CDNs (Shopify, Wix, Unsplash...)
  let srcSet: string | undefined = undefined;

  if (isExternal) {
    // If URL already has query params
    const sep = fullUrl.includes('?') ? '&' : '?';

    // Shopify CDN supports `width=`
    if (fullUrl.includes('cdn.shop')) {
      srcSet = srcSetWidths.map((w) => `${fullUrl}${sep}width=${w} ${w}w`).join(', ');
    }
    // Unsplash supports `w=`
    else if (fullUrl.includes('unsplash.com')) {
      srcSet = srcSetWidths.map((w) => `${fullUrl}${sep}w=${w} ${w}w`).join(', ');
    }
    // Generic fallback (browser will ignore invalid URLs)
    else {
      srcSet = srcSetWidths.map((w) => `${fullUrl}${sep}w=${w} ${w}w`).join(', ');
    }
  } else {
    // Local images (Strapi)
    srcSet = srcSetWidths.map((w) => `${fullUrl}?w=${w} ${w}w`).join(', ');
  }

  const style: React.CSSProperties = {
    aspectRatio:
      imageNode.width && imageNode.height
        ? imageNode.width / imageNode.height
        : fallbackAspectRatio,
  };

  return (
    <img
      src={fullUrl}
      srcSet={srcSet}
      sizes={sizes}
      width={imageNode.width || width}
      height={imageNode.height || height}
      alt={imageNode.alternativeText || ''}
      className={cn('w-full h-full object-cover', className)}
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      style={style}
    />
  );
};

export default StrapiImage;
