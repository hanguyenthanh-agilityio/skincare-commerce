import type { APIContext } from 'astro';

// Constants
import { ENDPOINT, STRAPI_BASE_URL } from '@/constants';

export async function POST({ cookies, request }: APIContext) {
  const token = cookies.get('jwt')?.value;

  if (!token) {
    return new Response(JSON.stringify({ message: 'UNAUTHORIZED' }), {
      status: 401,
    });
  }

  const { productDocumentId, quantity = 1 } = await request.json();

  // 🔐 Get current user
  const meRes = await fetch(`${STRAPI_BASE_URL}${ENDPOINT.USER}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const me = await meRes.json();

  console.log('me:', me);

  // 🔍 Check existing cart item
  const existingRes = await fetch(
    `${STRAPI_BASE_URL}${ENDPOINT.CART}?filters[user][id][$eq]=${me.id}&filters[products][documentId][$eq]=${productDocumentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const existing = await existingRes.json();

  const cartItem = existing?.data?.[0];

  // 🔁 UPDATE quantity if exists
  if (cartItem) {
    const newQuantity = Number(cartItem.quantity) + Number(quantity);

    await fetch(`${STRAPI_BASE_URL}${ENDPOINT.CART}${cartItem.documentId}`, {
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

    return new Response(JSON.stringify({ updated: true }), {
      status: 200,
    });
  }

  // ➕ CREATE new cart item
  await fetch(`${STRAPI_BASE_URL}${ENDPOINT.CART}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        products: [productDocumentId],
        quantity: Number(quantity),
        user: me.id,
      },
    }),
  });

  return new Response(JSON.stringify({ created: true }), {
    status: 200,
  });
}
