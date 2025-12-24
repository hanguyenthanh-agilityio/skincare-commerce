export const STRAPI_BASE_URL = import.meta.env.PUBLIC_STRAPI_URL;

if (!STRAPI_BASE_URL) {
  throw new Error('Missing PUBLIC_STRAPI_URL environment variable');
}

console.log('[ENV]', STRAPI_BASE_URL);
