// Constants
import { ERROR_MESSAGES } from '@/constants';

type RequestOption<TBody = unknown> = Omit<RequestInit, 'body'> & {
  body?: TBody;
};

export type SuccessResponse<T> = { data: T; error: null };
export type FailedResponse = { data: null; error: { message: string; name?: string } };
export type APIResponse<T> = SuccessResponse<T> | FailedResponse;

class APIClient {
  private static _apiClient: APIClient;
  private constructor() {}

  static get apiClient() {
    if (!this._apiClient) {
      this._apiClient = new APIClient();
    }

    return this._apiClient;
  }

  private async apiRequest<T, TBody = unknown>(
    url: string,
    init?: RequestOption<TBody>,
  ): Promise<APIResponse<T>> {
    const { method = 'GET', body, headers, ...rest } = init || {};

    // Include DELETE in methods that can have a body
    const hasBody = method === 'POST' || method === 'PUT' || method === 'DELETE';

    const normalizedHeaders = new Headers(headers);

    if (hasBody && body && !normalizedHeaders.has('Content-Type')) {
      normalizedHeaders.set('Content-Type', 'application/json');
    }

    const options: RequestInit = {
      method,
      headers: normalizedHeaders,
      ...(hasBody && body ? { body: JSON.stringify(body) } : {}),
      ...rest,
    };

    try {
      const res = await fetch(url, options);

      if (res.status === 204) {
        return { data: null as T, error: null };
      }

      if (!res.ok) {
        const text = await res.text();

        if (!text) {
          return {
            data: null,
            error: { message: `Request failed with status ${res.status}` },
          };
        }

        try {
          const parsed = JSON.parse(text);
          return parsed;
        } catch {
          return {
            data: null,
            error: { message: text },
          };
        }
      }

      return {
        data: (await res.json()) as T,
        error: null,
      };
    } catch (error) {
      if (error instanceof Error) {
        return { error: { message: `Error : ${error.message}` }, data: null };
      }

      return {
        error: { message: ERROR_MESSAGES.ERROR_TO_FETCH_API },
        data: null,
      };
    }
  }

  get<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest<T>(url, { ...init, method: 'GET' });
  }

  post<T, TBody = unknown>(url: string, init?: Omit<RequestOption<TBody>, 'method'>) {
    return this.apiRequest<T, TBody>(url, { ...init, method: 'POST' });
  }

  put<T, TBody = unknown>(url: string, init?: Omit<RequestOption<TBody>, 'method'>) {
    return this.apiRequest<T, TBody>(url, { ...init, method: 'PUT' });
  }

  delete<T, TBody = unknown>(url: string, init?: Omit<RequestOption<TBody>, 'method'>) {
    return this.apiRequest<T, TBody>(url, { ...init, method: 'DELETE' });
  }
}

export const apiClient = APIClient.apiClient;
