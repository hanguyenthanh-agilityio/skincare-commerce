import type { StrapiImageType } from './common';

export interface CartItem {
  id: string;
  name: string;
  volume: string;
  price: number;
  image: StrapiImageType;
  quantity: number;
}
