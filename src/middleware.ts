import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { cookies, url, redirect } = context;

  const token = cookies.get('jwt')?.value;
  const pathname = url.pathname;

  // 🌍 Detect locale
  const localeMatch = pathname.match(/^\/(en|vi)/);
  const localePrefix = localeMatch ? `/${localeMatch[1]}` : '';

  // Remove locale for route checks
  const normalizedPath = pathname.replace(/^\/(en|vi)/, '');

  const isAuthPage = normalizedPath.startsWith('/login');
  const isProtectedRoute = normalizedPath.startsWith('/cart');

  // 🔐 Block unauthenticated users
  if (isProtectedRoute && !token) {
    return redirect(`${localePrefix}/login`);
  }

  // 🚫 Block logged-in users from login
  if (isAuthPage && token) {
    return redirect(`${localePrefix}/`);
  }

  return next();
});
