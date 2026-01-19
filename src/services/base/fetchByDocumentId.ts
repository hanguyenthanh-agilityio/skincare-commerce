import { Effect, pipe, Schema } from 'effect';
import { STRAPI_BASE_URL, ERROR_MESSAGES } from '@/constants';

interface FetchByDocumentIdParams<
  TDecoded extends { readonly data: readonly unknown[] },
  TRawItem,
  TResult,
  TFetchError,
  TDecodeError,
  TNotFoundError,
> {
  endpoint: string;
  documentId: string;
  locale: string;
  schema: Schema.Schema<TDecoded>;
  fetchError: (ctx: { status: number; message: string }) => TFetchError;
  decodeError: (reason: unknown) => TDecodeError;
  notFoundError: () => TNotFoundError;
  mapItem: (item: TRawItem) => TResult;
}

export const fetchByDocumentIdEffect = <
  TDecoded extends { readonly data: readonly unknown[] },
  TRawItem,
  TResult,
  TFetchError,
  TDecodeError,
  TNotFoundError,
>({
  endpoint,
  documentId,
  locale,
  schema,
  fetchError,
  decodeError,
  notFoundError,
  mapItem,
}: FetchByDocumentIdParams<
  TDecoded,
  TRawItem,
  TResult,
  TFetchError,
  TDecodeError,
  TNotFoundError
>) =>
  pipe(
    // Fetch
    Effect.tryPromise({
      try: async () => {
        const params = new URLSearchParams({
          locale,
          'filters[documentId][$eq]': documentId,
          populate: '*',
        });

        const res = await fetch(`${STRAPI_BASE_URL}${endpoint}?${params.toString()}`);

        if (!res.ok) {
          throw fetchError({
            status: res.status,
            message: ERROR_MESSAGES.UNKNOWN,
          });
        }

        return res.json();
      },
      catch: () =>
        fetchError({
          status: 500,
          message: ERROR_MESSAGES.UNKNOWN,
        }),
    }),

    // Decode by Schema
    Effect.flatMap((json) =>
      pipe(json, Schema.decodeUnknown(schema), Effect.mapError(decodeError)),
    ),

    // Business rule + mapping
    Effect.flatMap((decoded) => {
      const item = decoded.data[0] as TRawItem | undefined;

      return item ? Effect.succeed(mapItem(item)) : Effect.fail(notFoundError());
    }),
  );
