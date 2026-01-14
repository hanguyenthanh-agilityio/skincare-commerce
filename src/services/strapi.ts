export async function strapiFetch<T>(url: string, options?: globalThis.RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw {
      status: res.status,
      error,
    };
  }

  return res.json() as Promise<T>;
}
