import type { APIContext } from 'astro';

// Constants
import { ENDPOINT, STRAPI_BASE_URL } from '@/constants';

// Services
import { apiClient } from '@/services';

export async function DELETE({ request, cookies }: APIContext) {
  const token = cookies.get('jwt')?.value;

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
