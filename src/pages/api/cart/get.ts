import type { APIContext } from 'astro';

// Constants
import { ENDPOINT, STRAPI_BASE_URL } from '@/constants';

// Types
import type { CartItem, StrapiCart, StrapiResponse } from '@/types';

// Services
import { apiClient } from '@/services';

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
    const res = await apiClient.get<StrapiResponse<StrapiCart>>(
      `${STRAPI_BASE_URL}${ENDPOINT.CART}?${params.toString()}`,
    );

    const { data: strapiResponse, error } = res;

    // Handle API-level error from apiClient
    if (error) {
      return Response.json({ message: 'CART_FETCH_FAILED', error: error.message }, { status: 500 });
    }

    const cartItems: CartItem[] = (strapiResponse?.data ?? []).map(mapStrapiCartToCartItem);

    return Response.json({ data: cartItems }, { status: 200 });
  } catch {
    return Response.json({ message: 'CART_FETCH_FAILED' }, { status: 500 });
  }
}
