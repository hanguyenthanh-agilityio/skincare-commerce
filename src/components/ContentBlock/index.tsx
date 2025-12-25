import { cn } from '@/lib';

// UIs
import { Icons } from '@/ui';

// Components
import { HeadingWrapper, LinkWrapper, TypographyWrapper } from '@/components';

// Types
import type { ContentBlockType } from '@/types';

const ContentBlockWrapper = ({
  title,
  subTitle,
  description,
  buttonText,
  buttonHref = '#',
  align = 'left',
  colorScheme = 'dark',
  className = '',
}: ContentBlockType) => {
  // Alignment styles
  const alignment = {
    left: 'text-left items-start',
    center: 'text-center items-center',
  }[align];

  // Color styling
  const colorStyles = {
    dark: {
      subTitle: 'text-primary',
      title: 'text-primary',
      description: 'text-primary',
      icon: 'text-primary',
    },
    light: {
      subTitle: 'text-white',
      title: 'text-white',
      description: 'text-white',
      icon: 'text-white',
    },
  };

  const scheme = colorStyles[colorScheme];

  return (
    <div className={cn('flex flex-col gap-4', alignment, className)}>
      {subTitle && (
        <TypographyWrapper
          level="p"
          title={subTitle}
          className={cn('text-sm tracking-wide', scheme.subTitle)}
        />
      )}

      <HeadingWrapper
        level="h2"
        title={title}
        className={cn('font-normal max-w-xl', scheme.title)}
      />

      {description && (
        <TypographyWrapper
          level="p"
          title={description}
          className={cn('max-w-lg', scheme.description)}
        />
      )}

      {buttonText && (
        <LinkWrapper
          href={buttonHref}
          className={cn(
            'flex items-center border border-white py-5 px-6 gap-10 text-sm',
            scheme.icon,
          )}
        >
          {buttonText}
          <Icons.Arrow className={`${scheme.icon} w-6 h-6`} />
        </LinkWrapper>
      )}
    </div>
  );
};

export default ContentBlockWrapper;
