// Constants
import { ERROR_MESSAGES, STRAPI_BASE_URL } from '@/constants';

// Types
import {
  mapStrapiCartToCartItem,
  type CartItem,
  type StrapiCart,
  type StrapiResponse,
} from '@/types';

// Services / Errors
import {
  CartAddError,
  CartDeleteError,
  CartFetchError,
  CartUpdateError,
  getAuthToken,
} from '@/services';

// Base Strapi Cart API endpoint
const CART_API_URL = `${STRAPI_BASE_URL}/api/carts`;

// Parameters for fetching all cart items of a user
interface GetCartByUserParams {
  userDocumentId: string;
}

// Parameters for finding a cart item
interface FindCartParams {
  userDocumentId: string;
  productDocumentId: string;
}

// Parameters for adding a product to cart
interface AddToCartParams {
  productDocumentId: string;
  userDocumentId: string;
  quantity?: number;
}

// Parameters for updating cart item quantity
interface UpdateCartQuantityParams {
  cartDocumentId: string;
  quantity: number;
}

// Shared options for authenticated requests
interface AuthenticatedFetchOptions {
  method: 'PUT' | 'POST';
  url: string;
  body: Record<string, unknown>;
  errorClass: new (args: { status: number; message: string }) => Error;
  errorMessage: string;
}

// Creates standard JSON headers with Authorization
const createAuthJsonHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

// Fetch cart data from Strapi with query parameters
const fetchCartWithParams = async (
  params: URLSearchParams,
): Promise<StrapiResponse<StrapiCart>> => {
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
};

// Wrapper for authenticated POST / PUT requests
const authenticatedFetch = async ({
  method,
  url,
  body,
  errorClass,
  errorMessage,
}: AuthenticatedFetchOptions): Promise<void> => {
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
};

// Finds a cart item
const findCartItemByProduct = async ({
  userDocumentId,
  productDocumentId,
}: FindCartParams): Promise<CartItem | null> => {
  const params = new URLSearchParams({
    'filters[users_permissions_user][documentId][$eq]': userDocumentId,
    'filters[products][documentId][$eq]': productDocumentId,
    populate: '*',
  });

  const { data } = await fetchCartWithParams(params);

  return data.length ? mapStrapiCartToCartItem(data[0]) : null;
};

// Fetches all cart items of a user
export const getCartByUser = async ({
  userDocumentId,
}: GetCartByUserParams): Promise<CartItem[]> => {
  const params = new URLSearchParams({
    'filters[users_permissions_user][documentId][$eq]': userDocumentId,
    populate: '*',
  });

  const { data } = await fetchCartWithParams(params);

  return data.map(mapStrapiCartToCartItem);
};

// Adds a product to cart
export const addToCart = async ({
  productDocumentId,
  userDocumentId,
  quantity = 1,
}: AddToCartParams): Promise<void> => {
  const existing = await findCartItemByProduct({
    userDocumentId,
    productDocumentId,
  });

  // Product already exists → increase quantity
  if (existing) {
    await authenticatedFetch({
      method: 'PUT',
      url: `${CART_API_URL}/${existing.id}`,
      body: {
        data: {
          quantity: existing.quantity + quantity,
          // Required by Strapi to allow updates
          publishedAt: new Date().toISOString(),
        },
      },
      errorClass: CartUpdateError,
      errorMessage: ERROR_MESSAGES.CART_UPDATE_FAILED,
    });
    return;
  }

  // Product does not exist → create a new cart item
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
};

// Updates the quantity of a cart item
export const updateCartQuantity = async ({
  cartDocumentId,
  quantity,
}: UpdateCartQuantityParams): Promise<void> => {
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
};

export const deleteCartItem = async (cartDocumentId: string): Promise<void> => {
  const token = getAuthToken();

  const res = await fetch(`${CART_API_URL}/${cartDocumentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new CartDeleteError({
      status: res.status,
      message: ERROR_MESSAGES.CART_DELETE_FAILED,
    });
  }
};
