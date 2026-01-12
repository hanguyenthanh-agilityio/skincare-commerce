import { describe, it, expect } from 'vitest';

import { CreditCard, Leaf, Mail, Monitor, ShoppingBag, Truck, MapPin, Phone } from 'lucide-react';

// Utils
import { contactIcons, getContactIcon, getFaqIcon } from '../mapIcons';

describe('getFaqIcon util', () => {
  it('should return correct icon for products', () => {
    const Icon = getFaqIcon('products');

    expect(Icon).toBe(ShoppingBag);
  });

  it('should return correct icon for orders', () => {
    const Icon = getFaqIcon('orders');

    expect(Icon).toBe(Truck);
  });

  it('should return correct icon for payment', () => {
    const Icon = getFaqIcon('payment');

    expect(Icon).toBe(CreditCard);
  });

  it('should return correct icon for website', () => {
    const Icon = getFaqIcon('website');

    expect(Icon).toBe(Monitor);
  });

  it('should return correct icon for sustainability', () => {
    const Icon = getFaqIcon('sustainability');

    expect(Icon).toBe(Leaf);
  });

  it('should throw error when topicId is invalid', () => {
    expect(() => getFaqIcon('invalid-topic')).toThrowError(
      'No icon defined for topicId: invalid-topic',
    );
  });
});

describe('getContactIcon util', () => {
  it('should return Phone icon', () => {
    const Icon = getContactIcon('phone');

    expect(Icon).toBe(Phone);
  });

  it('should return Mail icon', () => {
    const Icon = getContactIcon('email');

    expect(Icon).toBe(Mail);
  });

  it('should return MapPin icon', () => {
    const Icon = getContactIcon('address');

    expect(Icon).toBe(MapPin);
  });

  it('should throw error when contactId is invalid', () => {
    expect(() => getContactIcon('fax')).toThrowError('No icon defined for contactId: fax');
  });
});

describe('contactIcons map util', () => {
  it('should contain all expected contact keys', () => {
    expect(Object.keys(contactIcons)).toEqual(
      expect.arrayContaining(['phone', 'email', 'address']),
    );
  });
});
