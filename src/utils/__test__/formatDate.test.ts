import { describe, it, expect } from 'vitest';

// Utils
import { formatDate } from '../format';

describe('formatDate util', () => {
  it('should format a Date object in English locale', () => {
    const date = new Date('2023-08-18');

    const result = formatDate(date, 'en');

    // en-GB => "18 August 2023"
    expect(result).toBe('18 August 2023');
  });

  it('should format an ISO string in English locale', () => {
    const result = formatDate('2023-12-05', 'en');

    expect(result).toBe('05 December 2023');
  });

  it('should format a Date object in Vietnamese locale', () => {
    const date = new Date('2023-08-18');

    const result = formatDate(date, 'vi');

    // vi-VN => "18 Tháng 8 2023"
    expect(result).toBe('18 tháng 8, 2023');
  });

  it('should format ISO string in Vietnamese locale', () => {
    const result = formatDate('2023-01-02', 'vi');

    expect(result).toBe('02 tháng 1, 2023');
  });

  it('should default to English when locale is not provided', () => {
    const result = formatDate('2023-08-18');

    expect(result).toBe('18 August 2023');
  });

  it('should always return two-digit day', () => {
    const result = formatDate('2023-01-02', 'en');

    expect(result.startsWith('02')).toBe(true);
  });
});
