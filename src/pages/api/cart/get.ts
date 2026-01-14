import type { APIContext } from 'astro';

// Constants
import { ENDPOINT, STRAPI_BASE_URL } from '@/constants';

// Types
import type { CartItem, StrapiCart, StrapiResponse } from '@/types';

// Services
import { strapiFetch } from '@/services';

export function mapStrapiCartToCartItem(cart: StrapiCart): CartItem {
  const product = cart.products?.[0];

  if (!product) {
    throw new Error(`Cart ${cart.documentId} has no product`);
  }

  return {
    id: cart.documentId,
    documentId: cart.documentId,
    quantity: Number(cart.quantity),
    name: product.name,
    price: product.price,
    volume: product.volume ?? undefined,
    image: product.thumbnail ?? undefined,
  };
}

export async function GET({ cookies }: APIContext) {
  const userId = cookies.get('user_document_id')?.value;

  if (!userId) {
    return new Response(JSON.stringify({ message: 'UNAUTHORIZED' }), { status: 401 });
  }

  const params = new URLSearchParams({
    'filters[user][documentId][$eq]': userId,
    'populate[products][populate]': '*',
  });

  try {
    const response = await strapiFetch<StrapiResponse<StrapiCart>>(
      `${STRAPI_BASE_URL}${ENDPOINT.CART}?${params.toString()}`,
    );

    const cartItems = response.data.map(mapStrapiCartToCartItem);

    return new Response(JSON.stringify({ data: cartItems }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ message: 'CART_FETCH_FAILED' }), { status: 500 });
  }
}
