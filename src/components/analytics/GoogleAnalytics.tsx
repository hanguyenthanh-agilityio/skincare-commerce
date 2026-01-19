import { useEffect } from 'react';

// Utils
import { getClientConsent } from '@/utils';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.PUBLIC_GA_ID;

function loadGA() {
  if (document.getElementById('ga-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    anonymize_ip: true,
  });
}

const GoogleAnalytics = () => {
  useEffect(() => {
    if (getClientConsent() === 'accepted') {
      loadGA();
    }

    const handler = () => loadGA();
    window.addEventListener('cookie-consent-accepted', handler);

    return () => {
      window.removeEventListener('cookie-consent-accepted', handler);
    };
  }, []);

  return null;
};

export default GoogleAnalytics;
