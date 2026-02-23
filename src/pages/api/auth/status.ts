import { SESSION_KEYS } from '@/constants';
import type { APIContext } from 'astro';

export async function GET({ cookies }: APIContext) {
  const token = cookies.get(SESSION_KEYS.JWT)?.value;

  return new globalThis.Response(JSON.stringify({ authenticated: Boolean(token) }), {
    status: 200,
  });
}
