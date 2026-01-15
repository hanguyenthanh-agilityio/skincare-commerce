import type { APIContext } from 'astro';

// Constants
import { STRAPI_BASE_URL } from '@/constants';

// Types
import type { LoginResponse } from '@/types';

// Services
import { apiClient } from '@/services';

export async function POST({ request, cookies }: APIContext) {
  try {
    const body = await request.json();

    const res = await apiClient.post<LoginResponse>(`${STRAPI_BASE_URL}/api/auth/local`, {
      body,
    });

    if (res.error) {
      return new Response(JSON.stringify({ message: 'INVALID_CREDENTIALS' }), { status: 401 });
    }

    const data = res.data;

    // ✅ SET COOKIE (this is where most 500s happen)
    cookies.set('jwt', data.jwt, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    cookies.set('user_document_id', data.user.documentId, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    // ✅ ALWAYS RETURN RESPONSE
    return new Response(JSON.stringify({ user: data.user }), { status: 200 });
  } catch (error) {
    console.error('LOGIN API ERROR:', error);

    return new Response(JSON.stringify({ message: 'INTERNAL_SERVER_ERROR' }), { status: 500 });
  }
}
