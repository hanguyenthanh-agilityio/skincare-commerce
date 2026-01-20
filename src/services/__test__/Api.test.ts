import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { apiClient } from '..';
import { ERROR_MESSAGES } from '@/constants';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe('apiClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET: returns data on success', async () => {
    const mockData = { id: 1, name: 'Test' };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    } as Response);

    const res = await apiClient.get<typeof mockData>('/api/test');

    expect(fetch).toHaveBeenCalledWith(
      '/api/test',
      expect.objectContaining({
        method: 'GET',
      }),
    );

    expect(res).toEqual({
      data: mockData,
      error: null,
    });
  });

  it('POST: sends JSON body and sets Content-Type automatically', async () => {
    const body = { name: 'John' };
    const mockData = { id: 1, name: 'John' };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    } as Response);

    await apiClient.post('/api/users', { body });

    expect(fetch).toHaveBeenCalledWith(
      '/api/users',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(body),
        headers: expect.any(Headers),
      }),
    );

    const headers = (fetch as Mock).mock.calls[0][1].headers as Headers;
    expect(headers.get('Content-Type')).toBe('application/json');
  });

  it('returns error response when API returns JSON error', async () => {
    const errorResponse = {
      data: null,
      error: { message: 'Invalid request' },
    };

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => JSON.stringify(errorResponse),
    } as Response);

    const res = await apiClient.get('/api/error');

    expect(res).toEqual(errorResponse);
  });

  it('returns text error when API returns plain text error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => 'Internal Server Error',
    } as Response);

    const res = await apiClient.get('/api/error');

    expect(res).toEqual({
      data: null,
      error: { message: 'Internal Server Error' },
    });
  });

  it('returns null data for 204 No Content', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
    } as Response);

    const res = await apiClient.delete('/api/resource');

    expect(res).toEqual({
      data: null,
      error: null,
    });
  });

  it('handles fetch throw error correctly', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const res = await apiClient.get('/api/fail');

    expect(res).toEqual({
      data: null,
      error: { message: 'Error : Network error' },
    });
  });

  it('handles non-Error thrown values', async () => {
    mockFetch.mockRejectedValueOnce('unexpected');

    const res = await apiClient.get('/api/fail');

    expect(res).toEqual({
      data: null,
      error: { message: ERROR_MESSAGES.ERROR_TO_FETCH_API },
    });
  });

  it('DELETE: supports request body', async () => {
    const body = { reason: 'remove' };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    } as Response);

    await apiClient.delete('/api/delete', { body });

    expect(fetch).toHaveBeenCalledWith(
      '/api/delete',
      expect.objectContaining({
        method: 'DELETE',
        body: JSON.stringify(body),
      }),
    );
  });
});
