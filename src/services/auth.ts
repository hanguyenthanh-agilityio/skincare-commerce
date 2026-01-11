/**
 * Temporary auth provider
 * Later: replace with real login
 */
export function getAuthToken(): string {
  return import.meta.env.PUBLIC_STRAPI_JWT!;
}
