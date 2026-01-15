import type { APIContext } from 'astro';

// Constants
import { ENDPOINT, STRAPI_BASE_URL } from '@/constants';

// Types
import type { CartItem, StrapiCart, StrapiResponse } from '@/types';

// Services
import { strapiFetch } from '@/services';

export const mapStrapiCartToCartItem = (cart: StrapiCart): CartItem => ({
  documentId: cart.documentId,
  name: cart.product.name,
  price: cart.product.price,
  quantity: Number(cart.quantity),
  volume: cart.product.volume ?? undefined,
  image: cart.product.images[0] ?? undefined,
});

export async function GET({ cookies }: APIContext) {
  const userId = cookies.get('user_document_id')?.value;

  if (!userId) {
    return new Response(JSON.stringify({ message: 'UNAUTHORIZED' }), {
      status: 401,
    });
  }

  const params = new URLSearchParams({
    'filters[user][documentId][$eq]': userId,
    'populate[product][populate]': '*',
  });

  try {
    const response = await strapiFetch<StrapiResponse<StrapiCart>>(
      `${STRAPI_BASE_URL}${ENDPOINT.CART}?${params.toString()}`,
    );

    // ✅ MAP Strapi → UI
    const cartItems: CartItem[] = response.data.map(mapStrapiCartToCartItem);

    return new Response(JSON.stringify({ data: cartItems }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ message: 'CART_FETCH_FAILED' }), {
      status: 500,
    });
  }
}
