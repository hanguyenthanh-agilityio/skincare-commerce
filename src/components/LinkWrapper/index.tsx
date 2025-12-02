import clsx from 'clsx';

interface LinkWrapperProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const LinkWrapper: React.FC<LinkWrapperProps> = ({ href, className, children }) => {
  return (
    <a href={href} className={clsx('font-medium', className)}>
      {children}
    </a>
  );
};

export default LinkWrapper;
