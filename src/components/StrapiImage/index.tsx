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

  const buildSrcSet = () => {
    const sep = fullUrl.includes('?') ? '&' : '?';

    // Shopify CDN
    if (fullUrl.includes('cdn.shop')) {
      return srcSetWidths.map((w) => `${fullUrl}${sep}width=${w}&quality=75 ${w}w`).join(', ');
    }

    // Wix static CDN
    if (fullUrl.includes('wixstatic.com')) {
      return srcSetWidths.map((w) => `${fullUrl}${sep}w=${w}&q=70 ${w}w`).join(', ');
    }

    // Unsplash
    if (fullUrl.includes('unsplash.com')) {
      return srcSetWidths
        .map((w) => `${fullUrl}${sep}w=${w}&auto=format&fit=crop&q=60 ${w}w`)
        .join(', ');
    }

    // Fallback for unknown hotlink
    return srcSetWidths.map((w) => `${fullUrl}${sep}w=${w} ${w}w`).join(', ');
  };

  const srcSet = buildSrcSet();

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
