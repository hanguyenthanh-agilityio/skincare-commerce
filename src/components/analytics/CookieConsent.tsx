import { useEffect, useState } from 'react';
import { getClientConsent, setClientConsent } from './cookie';
import type { CookieConsent } from './cookie';
import { Button } from '@/ui';

import { TypographyWrapper } from '@/components';

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState<CookieConsent>(null);

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
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-lg border bg-background p-4 shadow-lg">
      <TypographyWrapper
        level="p"
        title=" We use cookies to analyze traffic and improve your experience."
        className="mb-4 text-muted-foreground"
      />

      <div className="flex justify-end gap-2">
        <Button variant="light" className="rounded-md" onClick={reject}>
          Reject
        </Button>
        <Button onClick={accept}>Accept</Button>
      </div>
    </div>
  );
}
