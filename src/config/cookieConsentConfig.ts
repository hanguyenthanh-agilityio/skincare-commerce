import type { CookieConsentConfig } from 'vanilla-cookieconsent';

const cookieConsentConfig: CookieConsentConfig = {
  language: {
    default: 'en',
    translations: {},
  },
  categories: {
    necessary: {
      enabled: true,
      readOnly: true,
    },
    analytics: {
      enabled: false,
    },
  },

  guiOptions: {
    consentModal: {
      layout: 'box',
      position: 'bottom center',
      equalWeightButtons: true,
    },
  },
};

export default cookieConsentConfig;
