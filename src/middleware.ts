import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, redirect, locals } = context;

  // Get session
  const session = context.session;
  locals.session = session;

  const token = session ? await session.get('jwt') : null;

  const pathname = url.pathname;

  // Detect locale
  const localeMatch = pathname.match(/^\/(en|vi)/);
  const localePrefix = localeMatch ? `/${localeMatch[1]}` : '';

  const normalizedPath = pathname.replace(/^\/(en|vi)/, '');

  const isAuthPage = normalizedPath.startsWith('/login');
  const isProtectedRoute = normalizedPath.startsWith('/cart');

  // Block page access
  if (isProtectedRoute && !token) {
    return redirect(`${localePrefix}/login`);
  }

  if (isAuthPage && token) {
    return redirect(`${localePrefix}/`);
  }

  // 🔐 Protect cart APIs
  if (pathname.startsWith('/api/cart') && !token) {
    return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  }

  return next();
});
