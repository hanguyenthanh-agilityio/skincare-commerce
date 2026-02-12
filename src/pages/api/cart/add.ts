import type { APIContext } from 'astro';

// Constants
import { ENDPOINT, STRAPI_BASE_URL } from '@/constants';

// Types
import type { IUser, StrapiCart, StrapiResponse } from '@/types';

// Services
import { apiClient } from '@/services';

export async function POST({ locals, request }: APIContext) {
  const session = locals.session;
  const token = session ? await session.get('jwt') : null;

  if (!token) {
    return new Response(JSON.stringify({ error: { message: 'UNAUTHORIZED' } }), {
      status: 401,
    });
  }

  const { productDocumentId } = await request.json();

  if (!productDocumentId) {
    return new Response(JSON.stringify({ message: 'PRODUCT_REQUIRED' }), {
      status: 400,
    });
  }

  /* ---------------------------
   * 1. Get current user
   * --------------------------- */
  const meRes = await apiClient.get<IUser>(`${STRAPI_BASE_URL}${ENDPOINT.USER}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const me = meRes.data;

  if (!me) {
    return new Response(JSON.stringify({ error: { message: 'UNAUTHORIZED' } }), {
      status: 401,
    });
  }

  /* ---------------------------
   * 2. Get user's cart list
   * --------------------------- */
  const { data: strapiResponse } = await apiClient.get<StrapiResponse<StrapiCart>>(
    `${STRAPI_BASE_URL}${ENDPOINT.CART}?filters[user][id][$eq]=${me?.id}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const cartList = strapiResponse?.data ?? [];

  /* ---------------------------
   * 3. Check existing cart item
   * --------------------------- */
  const existingItem = cartList.find(
    (item: StrapiCart) => item.product?.documentId === productDocumentId,
  );

  /* ---------------------------
   * 4. Update quantity (+1)
   * --------------------------- */
  if (existingItem) {
    const newQuantity = Number(existingItem.quantity) + 1;

    await apiClient.put(`${STRAPI_BASE_URL}${ENDPOINT.CART}/${existingItem.documentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        data: {
          quantity: newQuantity,
        },
      },
    });

    return new Response(JSON.stringify({ updated: true }), { status: 200 });
  }

  /* ---------------------------
   * 5. Create new cart item
   * --------------------------- */
  await apiClient.post(`${STRAPI_BASE_URL}${ENDPOINT.CART}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      data: {
        product: productDocumentId,
        quantity: 1,
        user: me?.id,
      },
    },
  });

  return new Response(JSON.stringify({ created: true }), { status: 200 });
}
