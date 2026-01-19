import { useEffect, useState } from 'react';

// UIs
import { Button } from '@/ui';

// Components
import { HeadingWrapper, TypographyWrapper } from '@/components';

// Utils
import { getClientConsent, setClientConsent, type CookieConsent } from '@/utils';

// Constants
import type { Locale } from '@/constants';

// I18n
import { loadContent } from '@/i18n';

interface Props {
  locale: Locale;
}

const CookieConsentBanner = ({ locale }: Props) => {
  const [consent, setConsent] = useState<CookieConsent>(null);

  const content = loadContent<{
    title: string;
    reject: string;
    description: string;
    accept: string;
  }>('cookie-consent', locale);

  useEffect(() => {
    setConsent(getClientConsent());
  }, []);

  if (consent !== null) return null;

  const accept = () => {
    setClientConsent('accepted');
    setConsent('accepted');
    window.dispatchEvent(new Event('cookie-consent-accepted'));
  };

  const reject = () => {
    setClientConsent('rejected');
    setConsent('rejected');
  };

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl border bg-background/95 p-6 shadow-2xl backdrop-blur supports-backdrop-filter:bg-background/80">
        {/* Title */}
        <HeadingWrapper
          level="h3"
          className="mb-2 text-lg font-semibold tracking-tight"
          title={content.title}
        />

        {/* Description */}
        <TypographyWrapper
          level="p"
          title={content.description}
          className="mb-5 text-base leading-relaxed text-muted-foreground"
        />

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="outlineSoft"
            className="rounded-xl px-6 py-2.5 text-base"
            onClick={reject}
          >
            {content.reject}
          </Button>

          <Button className="rounded-xl px-8 py-2.5 text-base" onClick={accept}>
            {content.accept}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
