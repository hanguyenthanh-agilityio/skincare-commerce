import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

// Config
import cookieConsentConfig from '@/config/cookieConsentConfig';

// Services
import { googleAnalytics } from '@/services';

// Utils
import { setClientConsent } from '@/utils';

// Contents
import en from '@/content/cookie-consent/en';
import vi from '@/content/cookie-consent/vi';

interface Props {
  locale: 'en' | 'vi';
}

const TEXT = { en, vi };

const CookieBanner = ({ locale }: Props) => {
  const GA_ID = import.meta.env.PUBLIC_GA_ID;
  const t = TEXT[locale];

  useEffect(() => {
    CookieConsent.run({
      ...cookieConsentConfig,

      language: {
        default: locale,
        translations: {
          [locale]: {
            consentModal: {
              title: t.title,
              description: t.description,
              acceptAllBtn: t.accept,
              closeIconLabel: t.reject,
            },

            preferencesModal: {
              title: t.preferencesTitle,
              acceptAllBtn: t.accept,
              acceptNecessaryBtn: t.reject,
              savePreferencesBtn: t.save,
              closeIconLabel: t.close,
              sections: [
                {
                  title: t.necessaryTitle,
                  description: t.necessaryDesc,
                  linkedCategory: 'necessary',
                },
                {
                  title: t.analyticsTitle,
                  description: t.analyticsDesc,
                  linkedCategory: 'analytics',
                },
              ],
            },
          },
        },
      },

      onConsent: ({ cookie }) => {
        const analyticsEnabled = cookie?.categories?.includes('analytics') ?? false;

        setClientConsent(analyticsEnabled ? 'accepted' : 'rejected');

        if (analyticsEnabled) {
          googleAnalytics(GA_ID);
        }
      },

      onChange: ({ cookie }) => {
        if (cookie?.categories?.includes('analytics')) {
          googleAnalytics(GA_ID);
        }
      },
    });
  }, [locale]);

  return null;
};

export default CookieBanner;
