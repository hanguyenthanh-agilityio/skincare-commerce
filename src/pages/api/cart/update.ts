import type { APIContext } from 'astro';

// Constants
import { ENDPOINT, STRAPI_BASE_URL } from '@/constants';

// Services
import { strapiFetch } from '@/services';

export async function PUT({ request, cookies }: APIContext) {
  const token = cookies.get('jwt')?.value;

  if (!token) {
    return new Response('UNAUTHORIZED', { status: 401 });
  }

  const { cartDocumentId, quantity } = await request.json();

  if (!cartDocumentId || typeof quantity !== 'number') {
    return new Response('BAD REQUEST', { status: 400 });
  }

  await strapiFetch(`${STRAPI_BASE_URL}${ENDPOINT.CART}/${cartDocumentId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        quantity,
        publishedAt: new Date().toISOString(),
      },
    }),
  });

  return new Response(null, { status: 204 });
}
