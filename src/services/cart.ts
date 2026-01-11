// Constants
import { ERROR_MESSAGES, STRAPI_BASE_URL } from '@/constants';

// Types
import {
  mapStrapiCartToCartItem,
  type CartItem,
  type StrapiCart,
  type StrapiResponse,
} from '@/types';

// Errors
import { CartFetchError } from '@/services';

interface Params {
  userDocumentId: string;
}

export async function getCartByUser({ userDocumentId }: Params): Promise<CartItem[]> {
  const params = new URLSearchParams({
    'filters[users_permissions_user][documentId][$eq]': userDocumentId,
    populate: 'products',
  });

  const res = await fetch(`${STRAPI_BASE_URL}/api/carts?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new CartFetchError({
      status: res.status,
      message: ERROR_MESSAGES.CART_FETCH_FAILED,
    });
  }

  const json = (await res.json()) as StrapiResponse<StrapiCart>;

  return json.data.map(mapStrapiCartToCartItem);
}
