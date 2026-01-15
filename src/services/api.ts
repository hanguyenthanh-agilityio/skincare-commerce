// Constants
import { ERROR_MESSAGES } from '@/constants';

type RequestOption = Omit<RequestInit, 'body'> & { body?: object };

export type SuccessResponse<T> = { data: T; error: null };
export type FailedResponse = { data: null; error: { message: string } };

class APIClient {
  private static _apiClient: APIClient;
  private constructor() {}

  static get apiClient() {
    if (!this._apiClient) {
      this._apiClient = new APIClient();
    }

    return this._apiClient;
  }

  private apiRequest = async <T>(
    url: string,
    init?: RequestOption,
  ): Promise<SuccessResponse<T> | FailedResponse> => {
    const { method = 'GET', body, headers, ...rest } = init || {};

    // Include DELETE in methods that can have a body
    const hasBody = method === 'POST' || method === 'PUT' || method === 'DELETE';

    const customHeader = {
      ...headers,
      ...(hasBody &&
        body && {
          'Content-Type': 'application/json',
        }),
    };

    const options = {
      method,
      headers: customHeader,
      ...(hasBody &&
        body && {
          body: JSON.stringify(body),
        }),
      ...rest,
    };

    try {
      const res = await fetch(url, options);

      // Handle 204 No Content responses
      if (res.status === 204) {
        return {
          data: null as T,
          error: null,
        };
      }

      // Get text first to check if there's content
      const text = await res.text();

      if (!res.ok) {
        return text
          ? JSON.parse(text)
          : {
              error: { message: `Request failed with status ${res.status}` },
              data: null,
            };
      }

      // If there's no content, return null
      if (!text) {
        return {
          data: null as T,
          error: null,
        };
      }

      return {
        data: JSON.parse(text) as T,
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
  };

  async get<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest<T>(url, init);
  }

  async post<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    const { ...rest } = init || {};

    return this.apiRequest<T>(url, { ...rest, method: 'POST' });
  }

  async put<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest<T>(url, { ...init, method: 'PUT' });
  }

  async delete(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest(url, { ...init, method: 'DELETE' });
  }
}

export const apiClient = APIClient.apiClient;
