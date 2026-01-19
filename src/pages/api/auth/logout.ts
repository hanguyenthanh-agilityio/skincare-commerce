import type { APIContext } from 'astro';

// Constants
import { ROUTER } from '@/constants';

export async function POST({ cookies, redirect }: APIContext) {
  cookies.delete('jwt', { path: '/' });
  cookies.delete('user_document_id', { path: '/' });

  return redirect(ROUTER.HOME);
}
