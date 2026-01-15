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

    const hasBody = method === 'POST' || method === 'PUT';

    const customHeader = {
      ...headers,
      ...(hasBody && {
        'Content-Type': 'application/json',
      }),
    };

    const options = {
      method,
      headers: customHeader,
      ...(hasBody && {
        body: JSON.stringify(body),
      }),
      ...rest,
    };

    console.log('api common', url);

    try {
      const res = await fetch(url, options);

      if (!res.ok) return (await res.json()) as FailedResponse;

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
