import { cn } from '@/lib';

interface LinkWrapperProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const LinkWrapper = ({ href, className, children }: LinkWrapperProps) => (
  <a href={href} className={cn('font-medium', className)}>
    {children}
  </a>
);

export default LinkWrapper;
