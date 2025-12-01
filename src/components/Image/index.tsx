interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => {
  const imageSrc = new URL(src, import.meta.url).href;

  return <img src={imageSrc} alt={alt} className={className} />;
};

export default Image;
