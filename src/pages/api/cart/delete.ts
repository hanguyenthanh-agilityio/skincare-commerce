import type { APIContext } from 'astro';

// Constants
import { ENDPOINT, SESSION_KEYS, STRAPI_BASE_URL } from '@/constants';

// Services
import { apiClient } from '@/services';

export async function DELETE({ request, locals }: APIContext) {
  const session = locals.session;
  const token = session ? await session.get(SESSION_KEYS.JWT) : null;

  if (!token) {
    return new Response('UNAUTHORIZED', { status: 401 });
  }

  const { cartDocumentId } = await request.json();

  if (!cartDocumentId) {
    return new Response('BAD REQUEST', { status: 400 });
  }

  await apiClient.delete(`${STRAPI_BASE_URL}${ENDPOINT.CART}/${cartDocumentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return new Response(null, { status: 204 });
}
