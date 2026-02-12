import type { APIContext } from 'astro';

// Constants
import { STRAPI_BASE_URL } from '@/constants';

// Types
import type { LoginResponse } from '@/types';

// Services
import { apiClient } from '@/services';

export async function POST({ request, locals }: APIContext) {
  const body = await request.json();

  const res = await apiClient.post<LoginResponse>(`${STRAPI_BASE_URL}/api/auth/local`, {
    body,
  });

  const data = res.data;

  if (data) {
    const session = locals.session;

    // Save auth into Astro session (stored in KV)
    await session.set('jwt', data.jwt);
    await session.set('user_document_id', data.user.documentId);
  }

  return new Response(JSON.stringify(res), { status: res.error ? 401 : 200 });
}
