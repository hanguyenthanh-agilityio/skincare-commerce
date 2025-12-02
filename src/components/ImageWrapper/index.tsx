interface ImageWrapperProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number | string;
  height?: number | string;
}

const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width = '100%',
  height = '100%',
}) => {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default ImageWrapper;
