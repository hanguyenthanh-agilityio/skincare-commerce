import React from 'react';
import { cn } from '@/lib/utils';

// UIs
import { Button, Icons } from '@/ui';

// Components
import { HeadingWrapper, LinkWrapper, TypographyWrapper } from '@/components';
import type { ContentBlockType } from '@/types';

const ContentBlockWrapper: React.FC<ContentBlockType> = ({
  title,
  subTitle,
  description,
  buttonText,
  buttonHref = '#',
  align = 'left',
  colorScheme = 'dark',
  variant = 'outlineSoft',
  className = '',
}) => {
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
        <LinkWrapper href={buttonHref} className="inline-flex items-center gap-2 pt-2">
          <Button variant={variant} className="gap-10 md:gap-30 py-7">
            {buttonText}
            <Icons.Arrow className={scheme.icon} />
          </Button>
        </LinkWrapper>
      )}
    </div>
  );
};

export default ContentBlockWrapper;
