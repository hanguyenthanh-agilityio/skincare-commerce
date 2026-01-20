/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';

// vanilla-cookieconsent
vi.mock('vanilla-cookieconsent', () => ({
  run: vi.fn(),
}));

// services
vi.mock('@/services', () => ({
  googleAnalytics: vi.fn(),
}));

// utils
vi.mock('@/utils', () => ({
  setClientConsent: vi.fn(),
}));

// config
vi.mock('@/config/cookieConsentConfig', () => ({
  default: {},
}));

// contents
vi.mock('@/content/cookie-consent/en', () => ({
  default: {
    title: 'Title EN',
    description: 'Desc EN',
    accept: 'Accept',
    reject: 'Reject',
    save: 'Save',
    close: 'Close',
    preferencesTitle: 'Preferences',
    necessaryTitle: 'Necessary',
    necessaryDesc: 'Necessary desc',
    analyticsTitle: 'Analytics',
    analyticsDesc: 'Analytics desc',
  },
}));

vi.mock('@/content/cookie-consent/vi', () => ({
  default: {
    title: 'Title VI',
    description: 'Desc VI',
    accept: 'Chấp nhận',
    reject: 'Từ chối',
    save: 'Lưu',
    close: 'Đóng',
    preferencesTitle: 'Tùy chọn',
    necessaryTitle: 'Cần thiết',
    necessaryDesc: 'Mô tả',
    analyticsTitle: 'Phân tích',
    analyticsDesc: 'Mô tả',
  },
}));

import CookieBanner from '../CookieBanner';
import * as CookieConsent from 'vanilla-cookieconsent';
import { googleAnalytics } from '@/services';
import { setClientConsent } from '@/utils';

describe('CookieBanner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should run CookieConsent on mount', () => {
    render(<CookieBanner locale="en" />);

    expect(CookieConsent.run).toHaveBeenCalledTimes(1);
  });

  it('should accept analytics and trigger GA on consent', () => {
    render(<CookieBanner locale="en" />);

    const args = vi.mocked(CookieConsent.run).mock.calls[0][0];

    expect(args.onConsent).toBeDefined();

    args.onConsent!({
      cookie: {
        categories: ['analytics'],
        revision: 0,
        data: undefined,
        consentId: '',
        consentTimestamp: '',
        lastConsentTimestamp: '',
        languageCode: '',
        services: {},
        expirationTime: 0,
      },
    });

    expect(setClientConsent).toHaveBeenCalledWith('accepted');
    expect(googleAnalytics).toHaveBeenCalledTimes(1);
  });

  it('should reject analytics when not included', () => {
    render(<CookieBanner locale="en" />);

    const args = vi.mocked(CookieConsent.run).mock.calls[0][0];

    expect(args.onConsent).toBeDefined();

    args.onConsent!({
      cookie: {
        categories: ['necessary'],
        revision: 0,
        data: undefined,
        consentId: '',
        consentTimestamp: '',
        lastConsentTimestamp: '',
        languageCode: '',
        services: {},
        expirationTime: 0,
      },
    });

    expect(setClientConsent).toHaveBeenCalledWith('rejected');
    expect(googleAnalytics).not.toHaveBeenCalled();
  });

  it('should trigger GA on change when analytics enabled', () => {
    render(<CookieBanner locale="en" />);

    const args = vi.mocked(CookieConsent.run).mock.calls[0][0];

    expect(args.onChange).toBeDefined();

    args.onChange!({
      cookie: {
        categories: ['analytics'],
        revision: 0,
        data: undefined,
        consentId: '',
        consentTimestamp: '',
        lastConsentTimestamp: '',
        languageCode: '',
        services: {},
        expirationTime: 0,
      },
      changedCategories: [],
      changedServices: {},
    });

    expect(googleAnalytics).toHaveBeenCalledTimes(1);
  });

  it('should re-run CookieConsent when locale changes', () => {
    const { rerender } = render(<CookieBanner locale="en" />);

    rerender(<CookieBanner locale="vi" />);

    expect(CookieConsent.run).toHaveBeenCalledTimes(2);
  });

  it('should treat analytics as disabled when categories is undefined', () => {
    render(<CookieBanner locale="en" />);

    const args = vi.mocked(CookieConsent.run).mock.calls[0][0];

    expect(args.onConsent).toBeDefined();

    args.onConsent!({
      cookie: {
        categories: [],
        revision: 0,
        data: undefined,
        consentId: '',
        consentTimestamp: '',
        lastConsentTimestamp: '',
        languageCode: '',
        services: {},
        expirationTime: 0,
      },
    });

    expect(setClientConsent).toHaveBeenCalledWith('rejected');
    expect(googleAnalytics).not.toHaveBeenCalled();
  });

  it('should fallback to false when cookie is undefined (hit ?? false)', () => {
    render(<CookieBanner locale="en" />);

    const args = vi.mocked(CookieConsent.run).mock.calls[0][0];

    expect(args.onConsent).toBeDefined();

    args.onConsent!({
      cookie: undefined as any,
    });

    expect(setClientConsent).toHaveBeenCalledWith('rejected');
    expect(googleAnalytics).not.toHaveBeenCalled();
  });
});
