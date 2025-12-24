import { Schema } from 'effect';

export const StrapiImageSchema = Schema.Struct({
  url: Schema.String,
  alternativeText: Schema.NullOr(Schema.String),
  caption: Schema.optional(Schema.NullOr(Schema.String)),
  width: Schema.optional(Schema.NullOr(Schema.Number)),
  height: Schema.optional(Schema.NullOr(Schema.Number)),
});

export const BlogSchema = Schema.Struct({
  documentId: Schema.String,
  title: Schema.String,
  description: Schema.optional(Schema.String),
  images: Schema.optional(Schema.Array(StrapiImageSchema)),
});

export const BlogListResponseSchema = Schema.Struct({
  data: Schema.Array(BlogSchema),
});
