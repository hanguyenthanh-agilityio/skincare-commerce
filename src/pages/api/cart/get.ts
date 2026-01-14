import type { APIContext } from 'astro';

// Constants
import { ENDPOINT, STRAPI_BASE_URL } from '@/constants';

// Types
import type { CartItem, StrapiResponse } from '@/types';

// Services
import { strapiFetch } from '@/services';

export async function GET({ cookies }: APIContext) {
  const userId = cookies.get('user_document_id')?.value;

  if (!userId) {
    return new Response(JSON.stringify({ message: 'UNAUTHORIZED' }), { status: 401 });
  }

  const params = new URLSearchParams({
    'filters[user][documentId][$eq]': userId,
    'populate[product][populate]': '*',
  });

  try {
    const response = await strapiFetch<StrapiResponse<CartItem>>(
      `${STRAPI_BASE_URL}${ENDPOINT.CART}?${params.toString()}`,
    );

    return new Response(JSON.stringify({ data: response }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ message: 'CART_FETCH_FAILED' }), { status: 500 });
  }
}
