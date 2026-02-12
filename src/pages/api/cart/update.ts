import type { APIContext } from 'astro';

// Constants
import { ENDPOINT, STRAPI_BASE_URL } from '@/constants';

// Services
import { apiClient } from '@/services';

export async function PUT({ request, locals }: APIContext) {
  const session = locals.session;
  const token = session ? await session.get('jwt') : null;

  if (!token) {
    return new Response('UNAUTHORIZED', { status: 401 });
  }

  const { cartDocumentId, quantity } = await request.json();

  if (!cartDocumentId || typeof quantity !== 'number') {
    return new Response('BAD REQUEST', { status: 400 });
  }

  await apiClient.put(`${STRAPI_BASE_URL}${ENDPOINT.CART}/${cartDocumentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      data: {
        quantity,
        publishedAt: new Date().toISOString(),
      },
    },
  });

  return new Response(null, { status: 204 });
}
