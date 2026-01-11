// Constants
import { ERROR_MESSAGES, STRAPI_BASE_URL } from '@/constants';

// Types
import {
  mapStrapiCartToCartItem,
  type CartItem,
  type StrapiCart,
  type StrapiResponse,
} from '@/types';

// Services
import { CartAddError, CartFetchError, CartUpdateError, getAuthToken } from '@/services';

const CART_API_URL = `${STRAPI_BASE_URL}/api/carts`;

interface GetCartByUserParams {
  userDocumentId: string;
}

interface FindCartParams {
  userDocumentId: string;
  productDocumentId: string;
}

interface AddToCartParams {
  productDocumentId: string;
  userDocumentId: string;
  quantity?: number;
}

interface UpdateCartQuantityParams {
  cartDocumentId: string;
  quantity: number;
}

function createAuthJsonHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

async function fetchCartWithParams(params: URLSearchParams): Promise<StrapiResponse<StrapiCart>> {
  const res = await fetch(`${CART_API_URL}?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new CartFetchError({
      status: res.status,
      message: ERROR_MESSAGES.CART_FETCH_FAILED,
    });
  }

  return (await res.json()) as StrapiResponse<StrapiCart>;
}

interface AuthenticatedFetchOptions {
  method: 'PUT' | 'POST';
  url: string;
  body: Record<string, unknown>;
  errorClass: new (args: { status: number; message: string }) => Error;
  errorMessage: string;
}

async function authenticatedFetch({
  method,
  url,
  body,
  errorClass,
  errorMessage,
}: AuthenticatedFetchOptions): Promise<void> {
  const token = getAuthToken();
  const headers = createAuthJsonHeaders(token);

  const res = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new errorClass({
      status: res.status,
      message: errorMessage,
    });
  }
}

async function findCartItemByProduct({
  userDocumentId,
  productDocumentId,
}: FindCartParams): Promise<CartItem | null> {
  const params = new URLSearchParams({
    'filters[users_permissions_user][documentId][$eq]': userDocumentId,
    'filters[products][documentId][$eq]': productDocumentId,
    populate: '*',
  });

  const { data } = await fetchCartWithParams(params);

  return data.length ? mapStrapiCartToCartItem(data[0]) : null;
}

export async function getCartByUser({ userDocumentId }: GetCartByUserParams): Promise<CartItem[]> {
  const params = new URLSearchParams({
    'filters[users_permissions_user][documentId][$eq]': userDocumentId,
    populate: '*',
  });

  const { data } = await fetchCartWithParams(params);

  return data.map(mapStrapiCartToCartItem);
}

export async function addToCart({
  productDocumentId,
  userDocumentId,
  quantity = 1,
}: AddToCartParams): Promise<void> {
  const existing = await findCartItemByProduct({
    userDocumentId,
    productDocumentId,
  });

  if (existing) {
    await authenticatedFetch({
      method: 'PUT',
      url: `${CART_API_URL}/${existing.id}`,
      body: {
        data: {
          quantity: existing.quantity + quantity,
          publishedAt: new Date().toISOString(),
        },
      },
      errorClass: CartUpdateError,
      errorMessage: ERROR_MESSAGES.CART_UPDATE_FAILED,
    });
    return;
  }

  await authenticatedFetch({
    method: 'POST',
    url: CART_API_URL,
    body: {
      data: {
        quantity,
        users_permissions_user: {
          connect: [userDocumentId],
        },
        products: {
          connect: [productDocumentId],
        },
        publishedAt: new Date().toISOString(),
      },
    },
    errorClass: CartAddError,
    errorMessage: ERROR_MESSAGES.CART_ADD_FAILED,
  });
}

export async function updateCartQuantity({
  cartDocumentId,
  quantity,
}: UpdateCartQuantityParams): Promise<void> {
  await authenticatedFetch({
    method: 'PUT',
    url: `${CART_API_URL}/${cartDocumentId}`,
    body: {
      data: {
        quantity,
        publishedAt: new Date().toISOString(),
      },
    },
    errorClass: CartUpdateError,
    errorMessage: ERROR_MESSAGES.CART_UPDATE_FAILED,
  });
}
