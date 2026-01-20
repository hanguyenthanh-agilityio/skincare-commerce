import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Effect, Schema } from 'effect';

// Service
import { fetchByDocumentIdEffect } from '@/services';

vi.mock('@/constants', () => ({
  STRAPI_BASE_URL: 'https://api.example.com',
  ERROR_MESSAGES: {
    UNKNOWN: 'UNKNOWN_ERROR',
  },
}));

const mockFetch = <T>(value: T, ok = true) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    json: vi.fn().mockResolvedValue(value),
  } as unknown as Response);
};

const mockFetchReject = () => {
  global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
};

const expectEffectFailure = async <T>(
  effect: Effect.Effect<T, unknown>,
  expectedError: unknown,
) => {
  try {
    await Effect.runPromise(effect);
    throw new Error('Effect should have failed');
  } catch (err) {
    expect(err).toBeInstanceOf(Error);
    expect(JSON.parse((err as Error).message)).toEqual(expectedError);
  }
};

type RawItem = { id: number; name: string };
type Result = { id: number; label: string };

describe('fetchByDocumentIdEffect', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch, decode and map item successfully', async () => {
    mockFetch({
      data: [{ id: 1, name: 'Item A' }],
    });

    const schema = Schema.Struct({
      data: Schema.Array(
        Schema.Struct({
          id: Schema.Number,
          name: Schema.String,
        }),
      ),
    });

    const effect = fetchByDocumentIdEffect({
      endpoint: '/products',
      documentId: 'abc',
      locale: 'en',
      schema,
      fetchError: vi.fn(),
      decodeError: vi.fn(),
      notFoundError: vi.fn(),
      mapItem: (item: RawItem): Result => ({
        id: item.id,
        label: item.name,
      }),
    });

    const result = await Effect.runPromise(effect);

    expect(result).toEqual({
      id: 1,
      label: 'Item A',
    });

    expect(fetch).toHaveBeenCalledOnce();
  });

  it('should fail when fetch returns non-ok response', async () => {
    mockFetch({}, false);

    const fetchError = vi.fn(() => ({ type: 'FETCH_ERROR' }));

    const effect = fetchByDocumentIdEffect({
      endpoint: '/products',
      documentId: 'abc',
      locale: 'en',
      schema: Schema.Struct({
        data: Schema.Array(Schema.Unknown),
      }),
      fetchError,
      decodeError: vi.fn(),
      notFoundError: vi.fn(),
      mapItem: vi.fn(),
    });

    await expectEffectFailure(effect, {
      type: 'FETCH_ERROR',
    });

    expect(fetchError).toHaveBeenCalledWith({
      status: 500,
      message: 'UNKNOWN_ERROR',
    });
  });

  it('should fail when fetch throws exception', async () => {
    mockFetchReject();

    const fetchError = vi.fn(() => ({ type: 'FETCH_ERROR' }));

    const effect = fetchByDocumentIdEffect({
      endpoint: '/products',
      documentId: 'abc',
      locale: 'en',
      schema: Schema.Struct({
        data: Schema.Array(Schema.Unknown),
      }),
      fetchError,
      decodeError: vi.fn(),
      notFoundError: vi.fn(),
      mapItem: vi.fn(),
    });

    await expectEffectFailure(effect, {
      type: 'FETCH_ERROR',
    });

    expect(fetchError).toHaveBeenCalledWith({
      status: 500,
      message: 'UNKNOWN_ERROR',
    });
  });

  it('should fail when schema decoding fails', async () => {
    mockFetch({
      data: 'invalid',
    });

    const decodeError = vi.fn(() => ({ type: 'DECODE_ERROR' }));

    const schema = Schema.Struct({
      data: Schema.Array(Schema.String),
    });

    const effect = fetchByDocumentIdEffect({
      endpoint: '/products',
      documentId: 'abc',
      locale: 'en',
      schema,
      fetchError: vi.fn(),
      decodeError,
      notFoundError: vi.fn(),
      mapItem: vi.fn(),
    });

    await expectEffectFailure(effect, {
      type: 'DECODE_ERROR',
    });

    expect(decodeError).toHaveBeenCalled();
  });

  it('should fail with notFoundError when data is empty', async () => {
    mockFetch({
      data: [],
    });

    const notFoundError = vi.fn(() => ({ type: 'NOT_FOUND' }));

    const schema = Schema.Struct({
      data: Schema.Array(Schema.Unknown),
    });

    const effect = fetchByDocumentIdEffect({
      endpoint: '/products',
      documentId: 'abc',
      locale: 'en',
      schema,
      fetchError: vi.fn(),
      decodeError: vi.fn(),
      notFoundError,
      mapItem: vi.fn(),
    });

    await expectEffectFailure(effect, {
      type: 'NOT_FOUND',
    });

    expect(notFoundError).toHaveBeenCalled();
  });
});
