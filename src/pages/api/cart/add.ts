import type { APIContext } from 'astro';

// Constants
import { ENDPOINT, STRAPI_BASE_URL } from '@/constants';
import type { StrapiCart } from '@/types';

export async function POST({ cookies, request }: APIContext) {
  const token = cookies.get('jwt')?.value;

  if (!token) {
    return new Response(JSON.stringify({ message: 'UNAUTHORIZED' }), {
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
  const meRes = await fetch(`${STRAPI_BASE_URL}${ENDPOINT.USER}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const me = await meRes.json();

  /* ---------------------------
   * 2. Get user's cart list
   * --------------------------- */
  const cartRes = await fetch(
    `${STRAPI_BASE_URL}${ENDPOINT.CART}?filters[user][id][$eq]=${me.id}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const cartData = await cartRes.json();
  const cartList = cartData?.data ?? [];

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

    await fetch(`${STRAPI_BASE_URL}${ENDPOINT.CART}/${existingItem.documentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          quantity: newQuantity,
        },
      }),
    });

    return new Response(JSON.stringify({ updated: true }), { status: 200 });
  }

  /* ---------------------------
   * 5. Create new cart item
   * --------------------------- */
  await fetch(`${STRAPI_BASE_URL}${ENDPOINT.CART}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        product: productDocumentId,
        quantity: 1,
        user: me.id,
      },
    }),
  });

  return new Response(JSON.stringify({ created: true }), { status: 200 });
}
